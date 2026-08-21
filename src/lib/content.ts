/** Every word on the site lives here so the firm can edit copy in one file. */

export const FIRM = {
  name: 'Ross Law Office, PLLC',
  short: 'Ross Law',
  phone: '662-494-2593',
  phoneHref: 'tel:+16624942593',
  street: '384 Court Street',
  city: 'West Point',
  state: 'MS',
  zip: '39773',
  hours: 'Monday – Friday, 9:00 am – 5:00 pm',
  hoursClosed: 'Saturday & Sunday, closed',
  region: 'The Golden Triangle, Mississippi',
  since: '2022',
} as const

export const NAV = [
  { label: 'Plans', href: '#plans' },
  { label: 'Probate', href: '#probate' },
  { label: 'Firm', href: '#firm' },
  { label: 'Answers', href: '#answers' },
] as const

export const MARQUEE = [
  'Certified Personal Family Lawyer®',
  'Wills, Trusts & Estates',
  'Probate Avoidance',
  'Real Estate Closings',
  'Personal Injury',
  'Expungements',
  'Serving the Golden Triangle',
  'Nearly a century of combined experience',
] as const

export type Plan = {
  index: string
  name: string
  forWhom: string
  summary: string
  includes: string[]
  outcome: string
}

export const PLANS: Plan[] = [
  {
    index: '01',
    name: 'Family Plan',
    forWhom: 'Young families getting the essentials right',
    summary:
      'The documents every parent should already have signed — written so they actually work on the worst day of your life, not just on the shelf.',
    includes: [
      'Will',
      'Healthcare directive',
      'Powers of attorney',
      'Kids Protection Plan®',
      'Legacy interview',
    ],
    outcome: 'Your children are never placed with strangers, even temporarily.',
  },
  {
    index: '02',
    name: 'Trust Plan',
    forWhom: 'Families who want privacy and a clean handoff',
    summary:
      'A revocable living trust, fully funded, so what you own passes to who you chose without a courtroom, a docket number, or a public file.',
    includes: [
      'Revocable living trust',
      'Trust funding — done, not assigned to you',
      'Pour-over will',
      'Deed preparation',
      'Everything in the Family Plan',
    ],
    outcome: 'Your family stays out of probate — and out of the public record.',
  },
  {
    index: '03',
    name: 'Wealth Plan',
    forWhom: 'Larger estates with more moving parts',
    summary:
      'Complete asset transfer for land, business interests and accounts spread across more than one place, with tax exposure planned for rather than discovered.',
    includes: [
      'Full asset inventory',
      'Tax minimisation strategy',
      'Business & farmland succession',
      'Beneficiary alignment review',
      'Everything in the Trust Plan',
    ],
    outcome: 'Nothing is missed, nothing is orphaned, nothing is left to argue over.',
  },
]

export const PLAN_FEE_NOTE =
  'Plans run $2,000 – $8,000 depending on what your family actually needs. You are quoted a flat fee in your session, before any work begins. No hourly surprises.'

export const PROBATE_STATS = [
  {
    value: 5,
    prefix: '',
    suffix: '%',
    label: 'of your gross estate',
    note: 'A typical probate takes roughly five percent of everything you own — calculated on the gross value, before a single debt comes off.',
  },
  {
    value: 16,
    prefix: '8–',
    suffix: ' mo',
    label: 'before anyone inherits',
    note: 'Eight to sixteen months is normal. Accounts stay frozen, the house cannot be sold, and the bills keep arriving.',
  },
  {
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'public record',
    note: 'What you owned, what you owed and who received it becomes a file at the courthouse that anyone may read.',
  },
]

export const PROCESS = [
  {
    step: 'One',
    title: 'Family Wealth Planning Session',
    body: 'We map what you own, who depends on you, and what would actually happen tomorrow if you were gone. You leave knowing where you stand, whether or not you hire us.',
  },
  {
    step: 'Two',
    title: 'You choose the plan',
    body: 'Three plans, three flat fees, chosen by you against what your family needs. Not sold up, not padded, not billed by the six-minute increment.',
  },
  {
    step: 'Three',
    title: 'We build it and we fund it',
    body: 'Documents are drafted, deeds are prepared, and accounts are retitled into the plan. An unfunded trust is the single most common reason a plan fails. We do not leave that to you.',
  },
  {
    step: 'Four',
    title: 'It stays current',
    body: 'Lives change — births, land, marriages, businesses. Your plan is reviewed and maintained so it still matches your life on the day it is finally needed.',
  },
]

export type QA = { q: string; a: string }

export const QA_LEFT: QA[] = [
  {
    q: 'Stephen, why estate planning, and why here?',
    a: 'West Point is home. I finished at Ole Miss Law in 2021 and came straight back, and what I kept running into was families in the middle of a probate that never had to happen. Good people, sound documents, and still eight months in a courtroom. That is a preventable problem, and preventing it is more useful work than cleaning it up afterwards.',
  },
  {
    q: 'What does “Personal Family Lawyer®” actually mean for me?',
    a: 'It is a certification with a method behind it. It means the work is measured by outcomes rather than by pages delivered — a flat fee agreed before we start, a plan that gets funded rather than handed to you in a binder, and a relationship that continues after the signing instead of ending at it.',
  },
  {
    q: 'I already have a will. Is that enough?',
    a: 'A will is a set of instructions to a probate court. It is genuinely better than nothing, but it does not avoid probate — it is the thing probate reads. If your goal is for your family to skip the courthouse entirely, keep the details private, and take possession quickly, a will alone will not get you there.',
  },
]

export const QA_RIGHT: QA[] = [
  {
    q: 'Is this only for people with a lot of money?',
    a: 'No, and the opposite is closer to true. If you own a home and have children under eighteen, you have more at stake in this than someone with liquid accounts and no dependents. The Family Plan exists precisely for families who would never describe themselves as wealthy.',
  },
  {
    q: 'How long does the whole thing take?',
    a: 'Most families are signed within a few weeks of their planning session. The drafting is not the slow part — deciding is. That is what the first session is for, and it is why we go through it properly rather than handing you a questionnaire.',
  },
  {
    q: 'What else does the office handle?',
    a: 'Estate planning is the emphasis, but this is a full small-town practice — real estate closings, personal injury, civil matters and expungements. On closings we have long relationships with the lenders, appraisers, abstractors, surveyors and realtors across the Golden Triangle, which is usually what determines whether a closing is calm or not.',
  },
]

export const QUOTE = {
  lead: 'A will tells a court what you wanted.',
  emphasis: 'A plan means nobody has to ask.',
}

export const TEAM = [
  {
    key: 'stephen' as const,
    name: 'Stephen S. Ross',
    role: 'Attorney · Certified Personal Family Lawyer®',
    bio: 'A 2021 graduate of the University of Mississippi School of Law who came home to West Point to practise. Stephen leads the firm’s estate planning work — wills, trusts, probate avoidance and the Kids Protection Plan®.',
  },
  {
    key: 'scott' as const,
    name: 'H. Scott Ross',
    role: 'Attorney',
    bio: 'Decades of Mississippi practice across real estate, civil matters and personal injury, and the long local relationships that make a closing in the Golden Triangle go quietly.',
  },
]
