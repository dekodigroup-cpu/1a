# Photos

Every image on the site is served from this folder. Nothing here is stock or
AI-generated — these slots are for Ross Law Office's own photography.

Drop the files in with these exact names and they appear automatically. Until a
file is present the site renders a typographic placeholder in its place, so
nothing ever breaks.

| File                    | Where it appears                          | Ideal crop            |
| ----------------------- | ----------------------------------------- | --------------------- |
| `office-exterior.jpg`   | "Where we are" panel next to the map/hours | 3:2 landscape, ≥1800px |
| `conference-room.jpg`   | Full-bleed background, "Not Just Documents" | 16:9 landscape, ≥2400px |
| `stephen-s-ross.jpg`    | Attorney card — Stephen S. Ross            | 4:5 portrait, ≥1200px  |
| `h-scott-ross.jpg`      | Attorney card — H. Scott Ross              | 4:5 portrait, ≥1200px  |
| `signing-detail.jpg`    | Parallax detail plate in the process rail  | 4:3, ≥1600px           |
| `west-point.jpg`        | Closing quote banner background            | 16:9 landscape, ≥2400px |

Notes

- Landscape shots sit behind light type, so favour frames with a darker or
  less busy half — the site lays its own gradient scrim over them regardless.
- Export as JPEG quality ~80 (or WebP) and keep each file under ~400 KB.
- To point a slot at a hosted URL instead of a local file, edit `src/lib/photos.ts`
  and replace the `src` with the full URL.
