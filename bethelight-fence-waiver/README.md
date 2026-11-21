# Be The Light Rescue: Fence Waiver Form

| File | What it is |
|---|---|
| `01-waiver-text.md` | Full waiver: permission to enter, fence/gate work authorization, assumption of risk, release of all present and future claims, covenant not to sue, indemnity, e-signature consent |
| `02-formaloo-build-sheet.md` | Field-by-field layout (5 pages, 30 fields) for building the form in Formaloo |
| `03-create_formaloo_form.py` | Builds the form through the Formaloo API (`--apply`); dry run by default |
| `04-website-embed.html` | Snippet to paste into the website's Forms page |

## Steps to go live
1. Fill in the `[BRACKETED]` items in `01-waiver-text.md` (legal name, state) and have a local attorney review it.
2. Build the form: run `python3 03-create_formaloo_form.py --apply` with your Formaloo API key and secret, or build it by hand from the build sheet.
3. In Formaloo: add conditional logic (fields 6, 7, 11), turn on email notifications and "send respondent a copy", then **Publish**.
4. Paste `04-website-embed.html` into the Forms page, with `FORM_URL` replaced by the form's share link.
5. Submit one test waiver and check that the notification email and the signer's copy both arrive.
