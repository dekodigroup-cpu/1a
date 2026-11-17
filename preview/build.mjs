// Inlines logos/*.svg into hero.src.html -> hero.html (self-contained preview).
import { readFileSync, writeFileSync } from 'node:fs';
const dir = new URL('.', import.meta.url);
const src = readFileSync(new URL('hero.src.html', dir), 'utf8');
const out = src.replace(/<!--logo:([\w-]+):(mono|color)-->/g, (_, name, mode) => {
  let svg = readFileSync(new URL(`logos/${name}.svg`, dir), 'utf8');
  svg = svg.replace(/\s(height|width|style)="[^"]*"/g, '')
           .replace(/<title>.*?<\/title>/, '')
           .replace('<svg', `<svg class="${mode} ${name.replace('-color', '')}" aria-hidden="true" focusable="false"`);
  return svg;
});
writeFileSync(new URL('hero.html', dir), out);
console.log('built hero.html');
