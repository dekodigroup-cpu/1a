# Formaloo Build Sheet — "Property Access & Fence Work Waiver"

Use this to build the form by hand in Formaloo (**Create form → Start from scratch**), or run
`03-create_formaloo_form.py` to build it through the API (it creates the same fields).

**Form title:** Property Access & Fence Work Waiver
**Form description:** Be The Light Rescue needs your permission to enter your property and work on fences or gates so we can safely secure a lost or stray pet. Please read each section and sign at the end. It takes about 5 minutes.

**Settings to turn on**
- Settings → *Required* on every field marked **Req** below
- Settings → *Send email notification* to the rescue's inbox on each submission
- Settings → *Send respondent a copy* (gives the signer a PDF/email copy of what they signed: good practice for waivers)
- Success message: "Thank you! Your permission form has been received. A Be The Light volunteer will contact you before we arrive."

Field types are Formaloo's names. "Text block" = a **Description / Text** (meta) field, which shows text and collects nothing.

---

## Page 1 — About you and the property

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 1 | Full legal name | Short text | Req | |
| 2 | Phone | Phone | Req | |
| 3 | Email | Email | Req | Used to send their copy |
| 4 | Property address (street, city, state, ZIP) | Long text | Req | |
| 5 | Your relationship to the property | Choice (single) | Req | Owner · Tenant/renter · Property manager · Authorized agent / family member |
| 6 | Owner or landlord name and phone | Short text | — | Logic: show only if #5 is not "Owner" |
| 7 | I confirm I have the owner's/landlord's permission to grant access | Yes/No | — | Logic: show only if #5 is not "Owner"; must be Yes |

## Page 2 — The animal and the property

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 8 | Describe the animal (species, color, size, name if known) | Long text | Req | |
| 9 | Where is the animal usually seen on the property? | Long text | — | |
| 10 | Do you have pets or livestock on the property? | Yes/No | Req | |
| 11 | Describe your animals and how they'll be secured during the work | Long text | — | Logic: show if #10 = Yes |
| 12 | Known hazards (check all) | Multiple select | — | Buried utilities/gas · Irrigation lines · Invisible/electric fence · Pool or pond · Well/septic · Aggressive animal · Chemicals/pesticides · None known |
| 13 | Gate codes, lockbox, or access instructions | Long text | — | |
| 14 | Anything else we should know? | Long text | — | |

## Page 3 — Permission and authorized work

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 15 | Text block | Description | | Paste waiver **Sections 1–3** |
| 16 | Work I authorize (check all that apply) | Multiple select | Req | Climb, open, lift, or remove fence panels and gates · Cut, bend, or detach fence wire/chain-link/mesh if needed · Install temporary fencing, catch-pens, or stakes · Block gaps under fences, decks, and structures · Dig or remove debris · Trim or move vegetation · Set and leave humane traps and feeding stations · Place trail/security cameras · Park and drive on the property |
| 17 | Text block | Description | | Paste waiver **Section 4** |
| 18 | Access allowed at any hour, day or night? | Choice (single) | Req | Yes, any time · Daytime only (7am–8pm) · Call first every time |
| 19 | Authorization end date (leave blank = until the animal is secured) | Date | — | |

## Page 4 — Release of liability

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 20 | Text block | Description | | Paste waiver **Sections 5–7** |
| 21 | Initials: I accept the risks and release Be The Light from all claims for property damage, present and future | Short text | Req | 2–4 characters |
| 22 | Initials: I agree not to sue and to indemnify Be The Light | Short text | Req | |
| 23 | Text block | Description | | Paste waiver **Sections 8–12** |
| 24 | I consent to cameras and photos of the animal as described | Yes/No | Req | |

## Page 5 — Sign

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 25 | Text block | Description | | Paste waiver **Section 13** (keep it in capitals) |
| 26 | I have read and agree to this entire Property Access, Fence Work Authorization & Release of Liability | Yes/No | Req | Must be Yes |
| 27 | I am 18 years of age or older | Yes/No | Req | Must be Yes |
| 28 | Signature | Signature | Req | |
| 29 | Printed name | Short text | Req | |
| 30 | Date signed | Date | Req | Default to today |

**Hidden fields (optional):** `volunteer_name`, `case_id` (Formaloo → Hidden field). You can then send links like
`…?case_id=2026-114` so each signed waiver ties back to a rescue case.
