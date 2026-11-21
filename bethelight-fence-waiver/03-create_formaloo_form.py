#!/usr/bin/env python3
"""Build the Be The Light "Property Access & Fence Work Waiver" form in Formaloo via its API.

Usage:
    export FORMALOO_API_KEY=...      # Formaloo > Settings > API & Integrations > API key
    export FORMALOO_API_SECRET=...   # same page, API secret
    python3 03-create_formaloo_form.py            # dry run: prints what it would send
    python3 03-create_formaloo_form.py --apply    # creates the form

The waiver text is read from 01-waiver-text.md, so edit that file (and fill in the
[BRACKETED] items) before running with --apply.

Endpoint paths and field-type names follow Formaloo's public v3 API docs
(https://docs.formaloo.com). If Formaloo rejects a field, the script prints the API's
error and stops; build the remaining fields by hand from 02-formaloo-build-sheet.md.
Conditional logic (fields 6, 7, 11) and email notifications are set in the Formaloo editor.
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://api.formaloo.me/v3.0"
HERE = Path(__file__).resolve().parent


def waiver_sections():
    """Return {section_number: markdown_text} from 01-waiver-text.md."""
    text = (HERE / "01-waiver-text.md").read_text()
    parts = re.split(r"^## (\d+)\. ", text, flags=re.M)
    return {int(parts[i]): f"{parts[i]}. " + parts[i + 1].strip() for i in range(1, len(parts), 2)}


def block(s, nums):
    return "\n\n".join(s[n] for n in nums)


def fields():
    s = waiver_sections()
    page = lambda title: {"type": "meta", "sub_type": "page_break", "title": title}
    text = lambda nums: {"type": "meta", "sub_type": "section", "title": "", "description": block(s, nums)}
    choice = lambda title, opts, req=True: {"type": "choice", "title": title, "required": req,
                                            "choice_items": [{"title": o} for o in opts]}
    multi = lambda title, opts, req=False: {"type": "multiple_select", "title": title, "required": req,
                                            "choice_items": [{"title": o} for o in opts]}
    f = lambda t, title, req=False, **kw: {"type": t, "title": title, "required": req, **kw}
    return [
        f("short_text", "Full legal name", True),
        f("phone", "Phone", True),
        f("email", "Email", True),
        f("long_text", "Property address (street, city, state, ZIP)", True),
        choice("Your relationship to the property",
               ["Owner", "Tenant/renter", "Property manager", "Authorized agent / family member"]),
        f("short_text", "Owner or landlord name and phone (if you are not the owner)"),
        f("yes_no", "If not the owner: I confirm I have the owner's/landlord's permission to grant access"),
        page("The animal and the property"),
        f("long_text", "Describe the animal (species, color, size, name if known)", True),
        f("long_text", "Where is the animal usually seen on the property?"),
        f("yes_no", "Do you have pets or livestock on the property?", True),
        f("long_text", "If yes: describe your animals and how they'll be secured during the work"),
        multi("Known hazards (check all)",
              ["Buried utilities/gas", "Irrigation lines", "Invisible/electric fence", "Pool or pond",
               "Well/septic", "Aggressive animal", "Chemicals/pesticides", "None known"]),
        f("long_text", "Gate codes, lockbox, or access instructions"),
        f("long_text", "Anything else we should know?"),
        page("Permission and authorized work"),
        text([1, 2, 3]),
        multi("Work I authorize (check all that apply)",
              ["Climb, open, lift, or remove fence panels and gates",
               "Cut, bend, or detach fence wire/chain-link/mesh if needed",
               "Install temporary fencing, catch-pens, or stakes",
               "Block gaps under fences, decks, and structures",
               "Dig or remove debris", "Trim or move vegetation",
               "Set and leave humane traps and feeding stations",
               "Place trail/security cameras", "Park and drive on the property"], True),
        text([4]),
        choice("Access allowed at any hour, day or night?",
               ["Yes, any time", "Daytime only (7am-8pm)", "Call first every time"]),
        f("date", "Authorization end date (leave blank = until the animal is secured)"),
        page("Release of liability"),
        text([5, 6, 7]),
        f("short_text", "Initials: I accept the risks and release Be The Light from all claims for property damage, present and future", True),
        f("short_text", "Initials: I agree not to sue and to indemnify Be The Light", True),
        text([8, 9, 10, 11, 12]),
        f("yes_no", "I consent to cameras and photos of the animal as described", True),
        page("Sign"),
        text([13]),
        f("yes_no", "I have read and agree to this entire Property Access, Fence Work Authorization & Release of Liability", True),
        f("yes_no", "I am 18 years of age or older", True),
        f("signature", "Signature", True),
        f("short_text", "Printed name", True),
        f("date", "Date signed", True),
    ]


def call(method, path, body=None, headers=None, form=False):
    data = None
    if body is not None:
        data = (urllib.parse.urlencode(body) if form else json.dumps(body)).encode()
    req = urllib.request.Request(API + path, data=data, method=method, headers=headers or {})
    if body is not None:
        req.add_header("Content-Type", "application/x-www-form-urlencoded" if form else "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        sys.exit(f"Formaloo API error {e.code} on {method} {path}:\n{e.read().decode()}")


def main():
    apply = "--apply" in sys.argv
    form = {"title": "Property Access & Fence Work Waiver",
            "description": ("Be The Light Rescue needs your permission to enter your property and work on "
                            "fences or gates so we can safely secure a lost or stray pet. Please read each "
                            "section and sign at the end. It takes about 5 minutes."),
            "success_message": ("Thank you! Your permission form has been received. A Be The Light "
                                "volunteer will contact you before we arrive.")}
    flds = fields()
    if not apply:
        print(json.dumps({"form": form, "fields": flds}, indent=2))
        print(f"\nDry run: {len(flds)} fields. Re-run with --apply to create the form.", file=sys.stderr)
        return

    key, secret = os.environ.get("FORMALOO_API_KEY"), os.environ.get("FORMALOO_API_SECRET")
    if not key or not secret:
        sys.exit("Set FORMALOO_API_KEY and FORMALOO_API_SECRET first.")
    tok = call("POST", "/oauth2/authorization-token/", {"grant_type": "client_credentials"},
               {"Authorization": f"Basic {secret}", "x-api-key": key}, form=True)
    token = tok.get("authorization_token") or tok.get("data", {}).get("authorization_token")
    auth = {"Authorization": f"JWT {token}", "x-api-key": key}

    created = call("POST", "/forms/", form, auth)
    slug = created.get("data", {}).get("form", {}).get("slug") or created.get("slug")
    print(f"Created form {slug}")
    for i, fld in enumerate(flds, 1):
        call("POST", "/fields/", {**fld, "form": slug, "position": i}, auth)
        print(f"  [{i}/{len(flds)}] {fld['type']}: {fld['title'][:60] or '(text block)'}")
    print(f"\nDone. Open it in Formaloo, set conditional logic and notifications, then Publish.\n"
          f"Share link will look like: https://formaloo.me/{slug}")


if __name__ == "__main__":
    main()
