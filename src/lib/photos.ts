/**
 * Photo slots.
 *
 * Every image on this site comes from Ross Law Office's own photography — no
 * stock, no generated imagery. Drop the originals into `public/photos/` using
 * the filenames below (or point a slot at a full URL) and they appear
 * everywhere they are referenced. Until a file exists, <Photo /> renders a
 * typographic placeholder instead of a broken image.
 *
 * See public/photos/README.md for the shot list and crop guidance.
 */
export type PhotoSlot = {
  src: string
  alt: string
  /** Object-position for the crop, e.g. '50% 30%'. */
  position?: string
}

const base = import.meta.env.BASE_URL

export const PHOTOS = {
  /** Wide exterior of 384 Court Street — anchors the "where we are" section. */
  office: {
    src: `${base}photos/office-exterior.jpg`,
    alt: 'The Ross Law Office building on Court Street in West Point, Mississippi',
    position: '50% 55%',
  },
  /** Full-bleed interior/conference shot behind the "Not Just Documents" statement. */
  conference: {
    src: `${base}photos/conference-room.jpg`,
    alt: 'The conference room at Ross Law Office where planning sessions are held',
    position: '50% 50%',
  },
  /** Portrait — Stephen S. Ross. */
  stephen: {
    src: `${base}photos/stephen-s-ross.jpg`,
    alt: 'Stephen S. Ross, attorney at Ross Law Office, PLLC',
    position: '50% 25%',
  },
  /** Portrait — H. Scott Ross. */
  scott: {
    src: `${base}photos/h-scott-ross.jpg`,
    alt: 'H. Scott Ross, attorney at Ross Law Office, PLLC',
    position: '50% 25%',
  },
  /** Detail shot — signing, documents, courthouse, West Point streetscape. */
  detail: {
    src: `${base}photos/signing-detail.jpg`,
    alt: 'A signing at Ross Law Office',
    position: '50% 50%',
  },
  /** Wide West Point / Golden Triangle establishing shot for the closing banner. */
  town: {
    src: `${base}photos/west-point.jpg`,
    alt: 'Downtown West Point, Mississippi',
    position: '50% 60%',
  },
} satisfies Record<string, PhotoSlot>

export type PhotoKey = keyof typeof PHOTOS
