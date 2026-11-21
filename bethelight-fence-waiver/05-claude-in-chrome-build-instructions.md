# Instructions for Claude in Chrome: build the Fence Program Waiver in Formaloo

You are working in the user's own Chrome, already signed in to Formaloo (https://formaloo.com).
Build ONE new form exactly as specified below, publish it, and report back the form's share link
and its form ID (the short code at the end of the link, e.g. https://formaloo.me/AbC123xY → AbC123xY).

## Steps
1. Open Formaloo → Create new form → Start from scratch (blank form).
2. Set the title, description, and settings from **Part A** below.
3. Add the fields in order from **Part A**, using a page break between pages.
   For every "Text block" row, add a Formaloo text/description field and paste the matching
   section text from **Part B** verbatim (all of it, keeping the CAPITALS in Section 13).
4. Mark required fields. Add the conditional logic noted (fields 6, 7, 12).
5. Match the look of the user's existing Formaloo forms "Owner Consent" and "Owner Surrender"
   (same theme/colors). If those forms have email notifications/PDF to neely@bethelightrescue.org,
   set the same on this one. Turn on "send a copy to the respondent" if available.
6. Publish the form. Open the public link once to confirm it loads and all pages show.
7. Do NOT submit test responses with fake data and do NOT change or delete any other form.
8. Report: the share link, the form ID, and anything you couldn't set up.

---

# Part A: Form layout

**Title:** Fence Program Waiver

**Description:** Be The Light Rescue builds fences at no cost so dogs can live off the chain. Before we start, we need your permission to work on your property and your agreement to the terms below. It takes about 5 minutes.

**Success message:** Thank you! We've received your signed waiver. Be The Light will contact you to schedule your fence.


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

---

# Part B: Waiver text (paste into the text blocks)

## 1. Purpose

Be The Light builds fences, at no cost to the homeowner, so dogs can live safely off chains and tethers. I am asking Be The Light to build a fence, kennel, or containment area (the "**Fence**") on the Property for my dog(s) (the "**Pet**"). I am signing this agreement to give Be The Light permission to come onto the Property and do that work, and to release Be The Light from liability, as described below.

## 2. My Authority Over the Property

I confirm that I am **one** of the following:

- the owner of the Property; or
- a tenant or other occupant who has the **owner's or landlord's permission** to have the Fence built.

If I am not the owner, I have given the owner's/landlord's contact information on this form, and I accept responsibility for any claim the owner or landlord brings that results from my granting this permission.

I am responsible for knowing where my property lines are and for any HOA rules, deed restrictions, or local permit requirements that apply to the Fence. Be The Light does not survey property and is not responsible if the Fence is placed over a property line or in violation of any such rule.

## 3. Permission to Enter

I grant Be The Light and its directors, officers, employees, volunteers, contractors, and agents (together, the "**Rescue Parties**") permission to enter the outdoor areas of the Property, with their vehicles, tools, and materials, at reasonable times agreed with me, to:

- assess and measure the area;
- build, repair, or modify the Fence;
- deliver and store materials during the project; and
- make follow-up visits to check on the Pet and the Fence (Section 8).

## 4. Authorized Work

I authorize the Rescue Parties to do the work they reasonably believe is needed to build a Fence that safely contains the Pet, including:

1. **Digging** post holes and trenches, and setting posts in concrete or gravel;
2. **Driving** stakes, anchors, or posts into the ground;
3. **Clearing** brush, debris, small trees, and vegetation along the fence line;
4. **Removing** chains, tethers, cables, and stakes used to restrain the Pet;
5. **Attaching** the Fence to, or building it next to, existing fences, buildings, or structures;
6. **Installing** gates, latches, kennels, shelters, and dig guards; and
7. **Driving and parking** vehicles and equipment on the yard and driveway.

The final size, location, materials, and design of the Fence are decided by Be The Light based on the space, materials available, and the Pet's needs.

## 5. Underground Lines and Hazards

Before digging, Be The Light will request a utility locate through **Mississippi 811**. I understand that 811 marks only public utility lines and **does not mark private lines**, such as sprinkler and irrigation lines, septic systems and field lines, private water lines, wiring to outbuildings or lights, invisible/electric dog fences, or propane lines. I agree to tell Be The Light about every private line and hazard I know of on this form, and I accept the risk of damage to any private line that is not disclosed or not marked.

## 6. Assumption of Risk

I understand that building a Fence involves digging, heavy materials, tools, and vehicles, and that it can result in damage to lawns, landscaping, driveways, structures, existing fences, underground lines, and other property. I also understand that the Pet or other animals may escape, be injured, or bite while work is underway. **I knowingly and voluntarily accept all of these risks, whether known or unknown, now or in the future.**

I am responsible for keeping the Pet, my other animals, children, and guests safely away from the work area while the Rescue Parties are on the Property.

## 7. Release and Waiver of All Claims

**To the fullest extent permitted by Mississippi law**, I, for myself and for my heirs, family members, tenants, landlord, insurers, successors, and assigns, **release, waive, discharge, and forever give up all claims, demands, and causes of action** against the Rescue Parties, of any kind, **whether known or unknown, existing now or arising in the future**, for:

- damage to, destruction of, or loss of value of the Property, including land, lawns, landscaping, trees, structures, existing fences, driveways, utilities, and underground lines;
- damage to or loss of any personal property;
- the escape, loss, injury, illness, or death of the Pet or any other animal, **whether during the work or at any time after the Fence is finished**;
- injury to me, my household, or anyone else on the Property; and
- any defect, failure, wear, or deterioration of the Fence,

**arising out of or related to** the Rescue Parties' presence on the Property, the work described in this agreement, or the Fence itself, **including claims based on the ordinary negligence of the Rescue Parties**.

This release does **not** apply to claims for gross negligence or intentional misconduct, to the extent Mississippi law does not allow those claims to be waived.

## 8. My Commitments After the Fence Is Built

1. **Ownership and upkeep.** When the work is done, the Fence becomes part of the Property and is **my responsibility** to inspect, maintain, and repair. Be The Light gives **no warranty** of any kind on the Fence, its materials, or how well it contains the Pet, and has no duty to repair or replace it.
2. **No chaining.** I agree not to chain or tether the Pet once the Fence is built.
3. **Supervision.** No fence is escape-proof. I remain fully responsible for the Pet's care, supervision, and containment, and for any harm the Pet causes to people, animals, or property.
4. **Follow-up visits.** I agree that Be The Light may make reasonable follow-up visits, arranged with me, to check on the Pet and the Fence.
5. **Spay/neuter.** If Be The Light offers to arrange spay/neuter and vaccinations for the Pet at no cost, I agree to allow it.
6. **Removal.** If the Pet is chained again, or I no longer have a dog to contain, Be The Light may, but is not required to, remove reusable materials after giving me notice.

## 9. Covenant Not to Sue and Indemnification

I agree **not to sue** any of the Rescue Parties for any claim released in Section 7.

I agree to **defend, indemnify, and hold harmless** the Rescue Parties from any claim, demand, lawsuit, cost, or attorney's fees brought by **any other person**, including an owner, landlord, neighbor, HOA, guest, or my insurer, that arises from the Fence, its location, the work, or the Pet.

## 10. Photos and Stories

I consent to Be The Light photographing and filming the Pet and the Fence project and using those images in its rescue, fundraising, and outreach work. Be The Light will not publish my name, street address, or images of people on the Property without my permission.

## 11. Duration and Revocation

This agreement starts when I sign it. The release (Section 7), the commitments in Section 8, and the indemnity (Section 9) **continue after the Fence is finished**. I may withdraw permission for future visits at any time by notifying Be The Light in writing (email or text is enough). Withdrawing permission does not cancel the release for anything that happened before.

## 12. General Terms

- **No fee.** Be The Light provides this service as a nonprofit and charges no fee. Nothing in this agreement creates an employment, contractor, or agency relationship.
- **Severability.** If any part of this agreement is found unenforceable, the rest stays in effect, and the unenforceable part will be enforced to the greatest extent the law allows.
- **Governing law.** This agreement is governed by the laws of the State of Mississippi.
- **Entire agreement.** This is the full agreement on this subject and can be changed only in writing signed by both me and Be The Light.
- **Electronic signature.** My electronic signature on this form is legally binding, the same as a handwritten signature, under the federal E-SIGN Act and the Mississippi Uniform Electronic Transactions Act.

## 13. Acknowledgment

**I HAVE READ THIS ENTIRE AGREEMENT. I UNDERSTAND THAT BY SIGNING IT I AM GIVING UP SUBSTANTIAL LEGAL RIGHTS, INCLUDING THE RIGHT TO SUE BE THE LIGHT RESCUE AND ITS VOLUNTEERS FOR DAMAGE TO MY PROPERTY OR MY PET, NOW OR IN THE FUTURE. I AM AT LEAST 18 YEARS OLD, AND I SIGN THIS VOLUNTARILY.**
