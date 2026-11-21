# Formaloo Build Sheet — "Fence Program Waiver"

Build by hand in Formaloo (**Create form → Start from scratch**), or run
`03-create_formaloo_form.py --apply` to create the same fields through the API.

**Form title:** Fence Program Waiver
**Description:** Be The Light Rescue builds fences at no cost so dogs can live off the chain. Before we start, we need your permission to work on your property and your agreement to the terms below. It takes about 5 minutes.

**Match the existing site forms (Owner Consent / Owner Surrender):**
- Same theme as those forms. The site embeds with a transparent background and hides the title and cover.
- Notification + PDF of each submission to **neely@bethelightrescue.org** (same as the other forms).
- Turn on **send respondent a copy**, so the signer keeps a copy of what they signed (good practice for waivers).
- Success message: "Thank you! We've received your signed waiver. Be The Light will contact you to schedule your fence."

Field types use Formaloo's names. "Text block" = a **Description/Text** field (it shows text and collects nothing).

## Page 1 — About you

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 1 | Full legal name | Short text | Req | |
| 2 | Phone | Phone | Req | |
| 3 | Email | Email | Req | Used to send their copy |
| 4 | Property address (street, city, ZIP) | Long text | Req | |
| 5 | Your relationship to the property | Choice | Req | Owner · Renter/tenant · Family member living there · Other occupant |
| 6 | Owner or landlord name and phone | Short text | — | Logic: show if #5 ≠ Owner |
| 7 | I have the owner's/landlord's permission to have a fence built | Yes/No | — | Logic: show if #5 ≠ Owner |

## Page 2 — Your dog and your yard

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 8 | How many dogs will the fence be for? | Number | Req | |
| 9 | Describe each dog (name, breed/size, age, spayed/neutered?) | Long text | Req | |
| 10 | Is the dog currently chained or tethered? | Yes/No | Req | |
| 11 | Private underground lines or hazards you know of (check all) | Multiple select | Req | Sprinkler/irrigation · Septic tank or field lines · Private water line · Wiring to a shed, pump, or lights · Invisible/electric dog fence · Propane line · None that I know of |
| 12 | Where are they? | Long text | — | Logic: show if #11 ≠ None |
| 13 | Are you in an HOA, or do you know of any permit or deed rule about fences? | Choice | Req | No · Yes · Not sure |
| 14 | Best days and times for us to work | Short text | — | |
| 15 | Anything else we should know? (gate codes, other animals, where you'd like the fence) | Long text | — | |

## Page 3 — Permission and the work

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 16 | Text block | Description | | Paste waiver **Sections 1–3** |
| 17 | Text block | Description | | Paste waiver **Sections 4–5** |
| 18 | I authorize Be The Light to do the work described above, including digging, clearing the fence line, and removing chains and tethers | Yes/No | Req | Must be Yes |

## Page 4 — Release of liability and your commitments

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 19 | Text block | Description | | Paste waiver **Sections 6–7** |
| 20 | Initials: I accept the risks and release Be The Light from all claims for damage to my property or pet, now or in the future | Short text | Req | |
| 21 | Text block | Description | | Paste waiver **Section 8** |
| 22 | Initials: I agree to my commitments, including no chaining and maintaining the fence | Short text | Req | |
| 23 | Text block | Description | | Paste waiver **Sections 9–12** |
| 24 | Initials: I agree not to sue and to indemnify Be The Light | Short text | Req | |
| 25 | I consent to photos and video of my dog and the fence project | Yes/No | Req | |

## Page 5 — Sign

| # | Label | Type | Req | Notes |
|---|---|---|---|---|
| 26 | Text block | Description | | Paste waiver **Section 13** (keep it in capitals) |
| 27 | I have read and agree to the entire Fence Program Property Access, Work Authorization & Release of Liability | Yes/No | Req | Must be Yes |
| 28 | I am 18 years of age or older | Yes/No | Req | Must be Yes |
| 29 | Signature | Signature | Req | |
| 30 | Printed name | Short text | Req | |
| 31 | Date signed | Date | Req | Default to today |
