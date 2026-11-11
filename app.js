/* ---------- Petite boîte à dessins ---------- */
var gid = 0, pop = 0;
function render(a) { pop = 0; return a(); }
var P = {
  play: '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 1 L13 7 L2 13Z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.6" height="12" rx="1" fill="currentColor"/><rect x="8.4" y="1" width="3.6" height="12" rx="1" fill="currentColor"/></svg>',
  redo: '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M12 7a5 5 0 1 1-1.6-3.7M12 1.5V4.5H9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
function grad(c1, c2) {
  var id = 'g' + (++gid);
  return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs><rect width="400" height="300" fill="url(#' + id + ')"/>';
}
function it(inner) { return '<g class="it" style="--i:' + (pop++) + '">' + inner + '</g>'; }
function scene(label, bg, parts) {
  pop = 0;
  return '<svg viewBox="0 0 400 300" role="img" aria-label="' + label + '">' + bg + parts.join('') + '</svg>';
}
/* éléments */
function sparkle(x, y, r) { return '<path d="M' + x + ' ' + (y - 2 * r) + 'Q' + x + ' ' + y + ' ' + (x + 2 * r) + ' ' + y + 'Q' + x + ' ' + y + ' ' + x + ' ' + (y + 2 * r) + 'Q' + x + ' ' + y + ' ' + (x - 2 * r) + ' ' + y + 'Q' + x + ' ' + y + ' ' + x + ' ' + (y - 2 * r) + 'Z" fill="#FFF3B0"/>'; }
function stars(list) { return it(list.map(function (s) { return sparkle(s[0], s[1], s[2]); }).join('')); }
function moon(x, y, r) {
  return it('<circle cx="' + x + '" cy="' + y + '" r="' + (r * 1.35) + '" fill="#FFF1B8" opacity=".16"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FFF1B8"/>' +
    '<circle cx="' + (x - r * .3) + '" cy="' + (y - r * .25) + '" r="' + (r * .2) + '" fill="#F2DC8F"/><circle cx="' + (x + r * .35) + '" cy="' + (y + r * .2) + '" r="' + (r * .26) + '" fill="#F2DC8F"/><circle cx="' + (x - r * .1) + '" cy="' + (y + r * .5) + '" r="' + (r * .12) + '" fill="#F2DC8F"/>');
}
function hills(c1, c2) {
  return '<path d="M0 235 Q90 175 200 215 T400 205 V300 H0Z" fill="' + c1 + '"/><path d="M0 262 Q120 220 230 252 T400 240 V300 H0Z" fill="' + c2 + '"/>';
}
function fox(x, y, s, rot) {
  return it('<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')">' +
    '<path d="M-36 -2 Q-82 -4 -70 -48 Q-48 -34 -30 -18Z" fill="#E8702A"/><path d="M-70 -48 Q-60 -52 -57 -40 Q-64 -38 -70 -48Z" fill="#fff"/>' +
    '<rect x="-24" y="4" width="9" height="22" rx="4" fill="#7A3A12"/><rect x="14" y="4" width="9" height="22" rx="4" fill="#7A3A12"/>' +
    '<ellipse cx="0" cy="-4" rx="40" ry="25" fill="#E8702A"/><ellipse cx="4" cy="6" rx="26" ry="12" fill="#FFE9D0"/>' +
    '<path d="M26 -40 L30 -66 L44 -42Z" fill="#E8702A"/><path d="M30 -44 L32 -58 L38 -44Z" fill="#7A3A12"/><path d="M46 -42 L58 -62 L60 -34Z" fill="#E8702A"/>' +
    '<circle cx="42" cy="-26" r="21" fill="#E8702A"/><path d="M32 -16 Q48 -2 66 -16 Q56 -20 52 -28 Q42 -20 32 -16Z" fill="#fff"/>' +
    '<circle cx="64" cy="-17" r="4" fill="#2A1608"/><circle cx="44" cy="-30" r="3" fill="#2A1608"/><circle cx="45" cy="-31" r="1" fill="#fff"/></g>');
}
function whale(x, y, s, open) {
  var mouth = open ? '<ellipse cx="168" cy="12" rx="11" ry="9" fill="#14284B"/><ellipse cx="168" cy="17" rx="7" ry="4" fill="#FF8FA3"/>' : '<path d="M146 8 Q162 20 174 6" fill="none" stroke="#14284B" stroke-width="3" stroke-linecap="round"/>';
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<path d="M4 8 C-22 0 -40 -22 -36 -52 C-18 -42 -2 -38 10 -22Z" fill="#7FA6F5"/>' +
    '<path d="M0 0 C0 -55 50 -75 110 -62 C165 -50 190 -10 174 26 C152 64 60 72 20 42 C5 30 0 15 0 0Z" fill="#7FA6F5"/>' +
    '<path d="M28 40 C70 62 140 58 170 24 C150 44 70 50 28 40Z" fill="#DCEBFF"/>' +
    '<circle cx="124" cy="-14" r="6" fill="#14284B"/><circle cx="126" cy="-16" r="2" fill="#fff"/><circle cx="138" cy="4" r="9" fill="#FF9FB5" opacity=".6"/>' + mouth + '</g>');
}
function fish(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-18 0 L-38 -14 L-38 14Z" fill="#FF9F1C"/><path d="M-6 -12 Q2 -26 12 -12Z" fill="#FF9F1C"/><ellipse rx="24" ry="14" fill="#FFC93C"/><circle cx="12" cy="-3" r="3.5" fill="#14284B"/><path d="M14 6 Q19 8 21 4" fill="none" stroke="#14284B" stroke-width="2" stroke-linecap="round"/></g>');
}
function starfish(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 -18 L5 -6 L18 -6 L8 2 L12 15 L0 8 L-12 15 L-8 2 L-18 -6 L-5 -6Z" fill="#FF7A6B" stroke="#E5584A" stroke-width="2" stroke-linejoin="round"/><circle cx="-3" cy="-2" r="1.6" fill="#14284B"/><circle cx="3" cy="-2" r="1.6" fill="#14284B"/></g>');
}
function bubbles(list) {
  return it(list.map(function (b) { return '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="#fff" fill-opacity=".18" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>'; }).join(''));
}
function note(x, y, c) { return '<g transform="translate(' + x + ' ' + y + ')" fill="' + c + '" stroke="' + c + '"><ellipse rx="7" ry="5" transform="rotate(-20)" stroke="none"/><path d="M6 -2 V-26 Q16 -22 15 -12" fill="none" stroke-width="3" stroke-linecap="round"/></g>'; }
function weed(x, y, c) { return '<path d="M' + x + ' ' + y + ' C' + (x - 14) + ' ' + (y - 22) + ' ' + (x + 14) + ' ' + (y - 40) + ' ' + x + ' ' + (y - 62) + ' C' + (x - 10) + ' ' + (y - 78) + ' ' + (x + 8) + ' ' + (y - 88) + ' ' + x + ' ' + (y - 100) + '" fill="none" stroke="' + c + '" stroke-width="9" stroke-linecap="round"/>'; }
function snail(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<path d="M-58 0 Q-30 -16 40 -14 Q62 -14 66 -30 Q68 -42 78 -40 Q84 -20 76 -6 Q72 0 56 0Z" fill="#B9CC5C"/>' +
    '<path d="M68 -34 L63 -58 M77 -34 L84 -56" stroke="#B9CC5C" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="63" cy="-60" r="5.5" fill="#fff"/><circle cx="85" cy="-58" r="5.5" fill="#fff"/><circle cx="64" cy="-60" r="2.6" fill="#14284B"/><circle cx="86" cy="-58" r="2.6" fill="#14284B"/>' +
    '<path d="M70 -18 Q76 -13 82 -19" fill="none" stroke="#5E6D1E" stroke-width="2.5" stroke-linecap="round"/>' +
    '<circle cx="-8" cy="-34" r="28" fill="#E08E4F"/><path d="M-8 -34 a4 4 0 1 1 8 0 a9 9 0 1 1 -18 0 a15 15 0 1 1 30 0 a21 21 0 1 1 -42 0" fill="none" stroke="#A85E2C" stroke-width="3.5" stroke-linecap="round"/></g>');
}
function ladybug(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse rx="16" ry="12" fill="#E63946"/><path d="M-1 -12 V12" stroke="#222" stroke-width="2"/><circle cx="-7" cy="-4" r="3" fill="#222"/><circle cx="-6" cy="6" r="2.6" fill="#222"/><circle cx="6" cy="-3" r="3" fill="#222"/><circle cx="6" cy="6" r="2.6" fill="#222"/><circle cx="17" cy="0" r="7" fill="#222"/><circle cx="19" cy="-3" r="1.6" fill="#fff"/><path d="M20 -6 L26 -13 M22 -3 L29 -8" stroke="#222" stroke-width="1.8" stroke-linecap="round"/></g>');
}
function sunflower(x, y, s, face) {
  var petals = '';
  for (var k = 0; k < 12; k++) petals += '<ellipse cx="0" cy="-27" rx="8.5" ry="17" fill="#FFC93C" transform="rotate(' + (k * 30) + ')"/>';
  var f = face ? '<circle cx="-7" cy="-4" r="2.6" fill="#FFE9B0"/><circle cx="7" cy="-4" r="2.6" fill="#FFE9B0"/><path d="M-9 5 Q0 14 9 5" fill="none" stroke="#FFE9B0" stroke-width="2.6" stroke-linecap="round"/>' : '';
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 V-118" stroke="#3C9A4A" stroke-width="8" stroke-linecap="round"/>' +
    '<ellipse cx="-16" cy="-40" rx="16" ry="7" fill="#3C9A4A" transform="rotate(-25 -16 -40)"/><ellipse cx="16" cy="-62" rx="16" ry="7" fill="#3C9A4A" transform="rotate(25 16 -62)"/>' +
    '<g transform="translate(0 -128)">' + petals + '<circle r="21" fill="#8B5A2B"/>' + f + '</g></g>');
}
function cloud(x, y, s) { return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="#fff" opacity=".92"><circle cx="0" cy="0" r="18"/><circle cx="22" cy="-8" r="22"/><circle cx="48" cy="2" r="16"/><rect x="-18" y="0" width="82" height="18" rx="9"/></g>'); }
function sun(x, y, r, c) { return it('<circle cx="' + x + '" cy="' + y + '" r="' + (r * 1.5) + '" fill="' + c + '" opacity=".25"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>'); }
function rainbow(x, y) {
  var cols = ['#FF6B6B', '#FFC93C', '#5CC8A0', '#5B9BF0'], out = '';
  for (var k = 0; k < cols.length; k++) { var r = 80 - k * 9; out += '<path d="M' + (x - r) + ' ' + y + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + '" fill="none" stroke="' + cols[k] + '" stroke-width="9"/>'; }
  return it(out);
}
function grass(c) { return '<path d="M0 255 Q100 235 200 252 T400 245 V300 H0Z" fill="' + c + '"/>'; }
function tufts(list, c) { return it(list.map(function (t) { return '<path d="M' + t[0] + ' ' + t[1] + ' l-5 -16 M' + t[0] + ' ' + t[1] + ' l1 -20 M' + t[0] + ' ' + t[1] + ' l7 -15" stroke="' + c + '" stroke-width="3.5" stroke-linecap="round"/>'; }).join('')); }
function plop(x, y) { return it('<circle cx="' + x + '" cy="' + y + '" r="30" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-width="3"/><text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-weight="700" font-size="17" fill="#fff">plop</text>'); }

/* ---------- Les histoires ----------
   Pour utiliser un vrai fichier audio (ta propre voix, par exemple), ajoute à une histoire :
   audio: "mon-fichier.mp3"   puis, dans chaque scène, at: (seconde où le dessin doit apparaître)  */
var NIGHT = ['#17284F', '#3B3F7E'], SEA = ['#35B0E6', '#0B3A66'], DAY = ['#BFE8FF', '#EAF8D7'];
var STARS = [[40, 40, 3], [110, 70, 2.5], [180, 30, 3.5], [350, 50, 3], [260, 25, 2.5], [60, 110, 2]];
var STORIES = [
  {
    title: 'Le petit renard et la lune', cover: 1,
    scenes: [
      { text: "Il était une fois un petit renard roux qui regardait le ciel, un soir d'automne.", art: function () { return scene('Un renard sur une colline la nuit', grad(NIGHT[0], NIGHT[1]), [stars(STARS), moon(320, 70, 24), it(hills('#2B3A6E', '#1E2B57')), fox(170, 232, 1)]); } },
      { text: "Au-dessus de la colline, la lune brillait, ronde comme une grosse pièce d'argent.", art: function () { return scene('Une grosse lune au-dessus du renard', grad(NIGHT[0], NIGHT[1]), [stars(STARS), moon(255, 100, 62), it(hills('#2B3A6E', '#1E2B57')), fox(120, 232, 1)]); } },
      { text: "Le renard sauta, sauta, sauta, mais il n'arriva pas à toucher la lune.", art: function () { return scene('Le renard saute vers la lune', grad(NIGHT[0], NIGHT[1]), [stars(STARS), moon(265, 90, 62), it(hills('#2B3A6E', '#1E2B57')), it('<path d="M110 220 Q150 90 205 95" fill="none" stroke="#FFF3B0" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>'), fox(185, 150, 1, -28)]); } },
      { text: "Alors la lune se reflèta dans la mare, et le renard put enfin la caresser du bout de la patte. Bonne nuit, petit renard !", art: function () { return scene('La lune dans la mare', grad(NIGHT[0], NIGHT[1]), [stars(STARS), moon(310, 65, 26), it(hills('#2B3A6E', '#1E2B57')), it('<ellipse cx="225" cy="252" rx="112" ry="28" fill="#2F5C9E"/><ellipse cx="225" cy="252" rx="46" ry="9" fill="#FFF1B8"/><ellipse cx="225" cy="252" rx="70" ry="15" fill="none" stroke="#FFF1B8" stroke-opacity=".6" stroke-width="2"/>'), fox(95, 238, 1)]); } }
    ]
  },
  {
    title: 'La baleine qui voulait chanter', cover: 3,
    scenes: [
      { text: "Au fond de l'océan vivait une grande baleine bleue qui rêvait de chanter.", art: function () { return scene('Une baleine au fond de la mer', grad(SEA[0], SEA[1]), [it('<path d="M0 262 Q120 240 240 258 T400 250 V300 H0Z" fill="#E9CF94"/>'), it(weed(40, 262, '#2E9E6A') + weed(360, 258, '#2E9E6A')), whale(105, 150, .95), bubbles([[300, 90, 8], [320, 60, 5], [285, 55, 4]])]); } },
      { text: "Mais quand elle ouvrait la bouche, il ne sortait qu'une toute petite bulle : plop !", art: function () { return scene('Une bulle qui fait plop', grad(SEA[0], SEA[1]), [it('<path d="M0 262 Q120 240 240 258 T400 250 V300 H0Z" fill="#E9CF94"/>'), it(weed(40, 262, '#2E9E6A') + weed(360, 258, '#2E9E6A')), whale(60, 160, .95, true), bubbles([[285, 140, 5], [300, 120, 7]]), plop(335, 90)]); } },
      { text: "Un petit poisson jaune lui dit : respire un grand coup, et laisse sortir ta joie !", art: function () { return scene('Un poisson jaune parle à la baleine', grad(SEA[0], SEA[1]), [it('<path d="M0 262 Q120 240 240 258 T400 250 V300 H0Z" fill="#E9CF94"/>'), it(weed(40, 262, '#2E9E6A') + weed(360, 258, '#2E9E6A')), whale(40, 170, .9), fish(300, 95, 1.2), bubbles([[250, 70, 6], [268, 52, 4], [340, 60, 7]])]); } },
      { text: "La baleine chanta si fort que toutes les étoiles de mer se mirent à danser.", art: function () { return scene('La baleine chante, les étoiles de mer dansent', grad(SEA[0], SEA[1]), [it('<path d="M0 262 Q120 240 240 258 T400 250 V300 H0Z" fill="#E9CF94"/>'), it(weed(30, 262, '#2E9E6A') + weed(372, 258, '#2E9E6A')), whale(30, 170, .9, true), it(note(250, 100, '#FFF3B0') + note(285, 70, '#FFC93C') + note(320, 105, '#fff') + note(355, 60, '#FF9FB5')), starfish(255, 250, 1.1), starfish(305, 238, .9), starfish(350, 252, 1.2)]); } }
    ]
  },
  {
    title: 'Le jardin des escargots', cover: 3,
    scenes: [
      { text: "Dans le jardin, après la pluie, un petit escargot sortit de sa coquille.", art: function () { return scene('Un escargot après la pluie', grad(DAY[0], DAY[1]), [sun(60, 55, 24, '#FFD23F'), rainbow(300, 150), cloud(120, 60, 1), it(grass('#7CC36A')), it('<ellipse cx="150" cy="268" rx="70" ry="10" fill="#8FD0F0"/>'), tufts([[40, 262], [360, 255], [250, 270]], '#4E9E50'), snail(170, 258, 1)]); } },
      { text: "Il rencontra une coccinelle qui lui demanda : où vas-tu si doucement ?", art: function () { return scene('Une coccinelle parle à l’escargot', grad(DAY[0], DAY[1]), [sun(60, 55, 24, '#FFD23F'), cloud(240, 50, .9), it(grass('#7CC36A')), tufts([[40, 262], [360, 255]], '#4E9E50'), it('<ellipse cx="290" cy="215" rx="62" ry="22" fill="#3C9A4A" transform="rotate(-12 290 215)"/><path d="M235 224 Q290 205 345 200" stroke="#2C7A3A" stroke-width="3" fill="none"/>'), ladybug(285, 188, 1.2), snail(130, 258, 1)]); } },
      { text: "Je vais voir le grand tournesol, répondit l'escargot. Il me faudra toute la journée !", art: function () { return scene('Le grand tournesol au loin', grad(DAY[0], DAY[1]), [sun(60, 55, 24, '#FFD23F'), cloud(180, 60, 1), it(grass('#7CC36A')), tufts([[40, 265], [190, 270]], '#4E9E50'), it('<path d="M80 262 Q150 245 230 258 T310 255" fill="none" stroke="#5D8F44" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>'), sunflower(335, 256, 1), snail(70, 258, .85)]); } },
      { text: "Au coucher du soleil, il arriva enfin, et le tournesol lui fit un grand sourire.", art: function () { return scene('L’escargot arrive devant le tournesol qui sourit', grad('#FFB36B', '#FFE7A8'), [sun(60, 215, 44, '#FF8A3D'), cloud(250, 50, .9), it(grass('#6FB25F')), tufts([[40, 265], [200, 272]], '#3F8A45'), sunflower(285, 262, 1.15, true), snail(120, 262, .95)]); } }
    ]
  }
];

/* ---------- Histoire : l'Europe ---------- */
var FL = {
  uk: [90, 60, '<rect width="90" height="60" fill="#012169"/><path d="M0 0L90 60M90 0L0 60" stroke="#fff" stroke-width="12"/><path d="M0 0L90 60M90 0L0 60" stroke="#C8102E" stroke-width="4"/><path d="M45 0V60M0 30H90" stroke="#fff" stroke-width="20"/><path d="M45 0V60M0 30H90" stroke="#C8102E" stroke-width="12"/>'],
  ie: [90, 60, '<rect width="30" height="60" fill="#169B62"/><rect x="30" width="30" height="60" fill="#fff"/><rect x="60" width="30" height="60" fill="#FF883E"/>'],
  is: [90, 60, '<rect width="90" height="60" fill="#02529C"/><path d="M30 0V60M0 30H90" stroke="#fff" stroke-width="16"/><path d="M30 0V60M0 30H90" stroke="#DC1E35" stroke-width="8"/>'],
  no: [90, 60, '<rect width="90" height="60" fill="#BA0C2F"/><path d="M30 0V60M0 30H90" stroke="#fff" stroke-width="18"/><path d="M30 0V60M0 30H90" stroke="#00205B" stroke-width="9"/>'],
  dk: [90, 60, '<rect width="90" height="60" fill="#C8102E"/><path d="M30 0V60M0 30H90" stroke="#fff" stroke-width="10"/>'],
  se: [90, 60, '<rect width="90" height="60" fill="#006AA7"/><path d="M30 0V60M0 30H90" stroke="#FECC02" stroke-width="10"/>'],
  fi: [90, 60, '<rect width="90" height="60" fill="#fff"/><path d="M30 0V60M0 30H90" stroke="#003580" stroke-width="14"/>'],
  de: [90, 60, '<rect width="90" height="20" fill="#000"/><rect y="20" width="90" height="20" fill="#DD0000"/><rect y="40" width="90" height="20" fill="#FFCE00"/>'],
  ch: [60, 60, '<rect width="60" height="60" fill="#DA291C"/><path d="M30 12V48M12 30H48" stroke="#fff" stroke-width="12"/>'],
  fr: [90, 60, '<rect width="30" height="60" fill="#0055A4"/><rect x="30" width="30" height="60" fill="#fff"/><rect x="60" width="30" height="60" fill="#EF4135"/>'],
  it: [90, 60, '<rect width="30" height="60" fill="#009246"/><rect x="30" width="30" height="60" fill="#fff"/><rect x="60" width="30" height="60" fill="#CE2B37"/>']
};
FL.pl = [90, 60, '<rect width="90" height="30" fill="#fff"/><rect y="30" width="90" height="30" fill="#DC143C"/>'];
FL.be = [90, 60, '<rect width="30" height="60" fill="#000"/><rect x="30" width="30" height="60" fill="#FDDA24"/><rect x="60" width="30" height="60" fill="#EF3340"/>'];
FL.es = [90, 60, '<rect width="90" height="60" fill="#AA151B"/><rect y="15" width="90" height="30" fill="#F1BF00"/><rect x="22" y="23" width="9" height="14" rx="2" fill="#AA151B" opacity=".85"/>'];
FL.gr = [90, 60, (function () { var t = ''; for (var i = 0; i < 9; i++) t += '<rect y="' + (i * 60 / 9).toFixed(2) + '" width="90" height="' + (60 / 9 + .05).toFixed(2) + '" fill="' + (i % 2 ? '#fff' : '#0D5EAF') + '"/>'; return t + '<rect width="33.4" height="33.4" fill="#0D5EAF"/><rect x="13.3" width="6.7" height="33.4" fill="#fff"/><rect y="13.3" width="33.4" height="6.7" fill="#fff"/>'; })()];
function flagArt(code, x, y, w) {
  var f = FL[code], h = w * f[1] / f[0];
  return '<g transform="translate(' + x + ' ' + y + ')"><rect x="6" y="7" width="' + w + '" height="' + h + '" rx="6" fill="#14284B" opacity=".22"/>' +
    '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + f[0] + ' ' + f[1] + '">' + f[2] + '</svg>' +
    '<rect width="' + w + '" height="' + h + '" rx="3" fill="none" stroke="#14284B" stroke-width="3"/></g>';
}
var FONT = 'font-family="Fredoka, Trebuchet MS, sans-serif" font-weight="700"';
function label(x, y, txt, size, fill) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" ' + FONT + ' font-size="' + size + '" fill="' + (fill || '#14284B') + '">' + txt + '</text>'; }
function flagScene(code, name, c1, c2) {
  var w = code === 'ch' ? 160 : 240;
  return function () {
    return scene('Drapeau : ' + name, grad(c1, c2), [
      it('<path d="M0 262 Q110 236 220 256 T400 246 V300 H0Z" fill="#fff" opacity=".5"/>'),
      it('<rect x="58" y="36" width="8" height="206" rx="4" fill="#8A6B4A"/><circle cx="62" cy="34" r="7" fill="#FFC93C"/>'),
      it(flagArt(code, 66, 46, w)),
      it('<rect x="90" y="238" width="220" height="44" rx="22" fill="#14284B"/>' + label(200, 269, name, 24, '#fff'))
    ]);
  };
}
function flagTile(code) {
  return function () {
    var w = code === 'ch' ? 190 : 300, x = code === 'ch' ? 105 : 50, y = code === 'ch' ? 50 : 40;
    return '<svg viewBox="0 0 400 300" role="img" aria-label="Drapeau"><rect width="400" height="300" fill="#DCEBFA"/>' + flagArt(code, x, y, w) + '</svg>';
  };
}
var SKY = ['#A9D6F5', '#EAF4FB'], WARM = ['#FFE8B8', '#FFF6DC'];
var FONTLESS = '';
function waves(y, c, o) { return '<path d="M0 ' + y + ' q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="' + c + '" stroke-opacity="' + (o || .6) + '" stroke-width="3"/>'; }
function house(x, y, w, h, c, roof) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + c + '"/><path d="M' + (x - 4) + ' ' + y + ' L' + (x + w / 2) + ' ' + (y - w * .5) + ' L' + (x + w + 4) + ' ' + y + 'Z" fill="' + (roof || '#5A3B2E') + '"/>' +
    '<rect x="' + (x + w * .2) + '" y="' + (y + h * .2) + '" width="' + (w * .22) + '" height="' + (h * .22) + '" fill="#FFF8E1"/><rect x="' + (x + w * .58) + '" y="' + (y + h * .2) + '" width="' + (w * .22) + '" height="' + (h * .22) + '" fill="#FFF8E1"/>' +
    '<rect x="' + (x + w * .4) + '" y="' + (y + h * .6) + '" width="' + (w * .2) + '" height="' + (h * .4) + '" fill="#5A3B2E"/>';
}
function fir(x, y, s, c) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-4" y="-6" width="8" height="12" fill="#5A3B2E"/><path d="M-22 -4 L0 -40 L22 -4Z" fill="' + c + '"/><path d="M-18 -26 L0 -62 L18 -26Z" fill="' + c + '"/><path d="M-13 -48 L0 -80 L13 -48Z" fill="' + c + '"/></g>';
}
function bike(x, y, s, c) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><circle cx="-26" cy="0" r="16" fill="none" stroke="#14284B" stroke-width="4"/><circle cx="26" cy="0" r="16" fill="none" stroke="#14284B" stroke-width="4"/>' +
    '<path d="M-26 0 L-4 -26 L22 -26 L26 0 M-4 -26 L-8 0 L10 0 L22 -26" fill="none" stroke="#14284B" stroke-width="3.5" stroke-linejoin="round"/><path d="M22 -26 L20 -38 H30" fill="none" stroke="#14284B" stroke-width="3.5" stroke-linecap="round"/>' +
    '<path d="M-8 -30 L4 -58 M6 -54 L28 -40 M-8 -30 L8 -10 L4 0" fill="none" stroke="' + c + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="-70" r="10" fill="#F2C9A0"/><path d="M-4 -74 Q6 -88 16 -74Z" fill="#14284B"/></g>';
}

/* Royaume-Uni */
function bigBenArt() {
  var win = ''; for (var i = 0; i < 11; i++) win += '<rect x="' + (46 + i * 29) + '" y="242" width="13" height="24" rx="6.5" fill="#8A6B3A"/>';
  return scene('Big Ben', grad(SKY[0], SKY[1]), [
    cloud(40, 60, .9), cloud(290, 50, .8),
    it('<rect x="30" y="228" width="340" height="52" fill="#C9A56A"/>' + win),
    it('<path d="M166 92 L200 20 L234 92Z" fill="#5F7A8A"/><circle cx="200" cy="16" r="5" fill="#FFC93C"/><rect x="164" y="90" width="72" height="14" fill="#B8923F"/><rect x="170" y="104" width="60" height="126" fill="#D9B26F"/><rect x="172" y="104" width="56" height="56" fill="#E6C487"/><circle cx="200" cy="132" r="23" fill="#FFF8E1" stroke="#8A6B3A" stroke-width="4"/><path d="M200 132 V116 M200 132 L212 138" stroke="#14284B" stroke-width="3.5" stroke-linecap="round"/><path d="M184 176 V226 M200 176 V226 M216 176 V226" stroke="#B8923F" stroke-width="3"/>'),
    it('<g fill="none" stroke="#14284B" stroke-width="4" stroke-linecap="round"><path d="M244 112 q14 20 0 40"/><path d="M258 100 q26 32 0 64"/><path d="M156 112 q-14 20 0 40"/><path d="M142 100 q-26 32 0 64"/></g>' + label(320, 140, '6 km', 30))
  ]);
}
function thamesArt() {
  return scene('La Tamise et un grand pont', grad('#BFE0F7', '#F3F8FB'), [
    cloud(300, 50, .8),
    it('<rect x="0" y="212" width="400" height="88" fill="#4FA3D6"/>' + waves(232, '#fff', .6) + waves(262, '#fff', .4)),
    it('<rect x="106" y="86" width="44" height="130" fill="#8FA3B8"/><path d="M104 88 L128 52 L152 88Z" fill="#5F7A8A"/><rect x="250" y="86" width="44" height="130" fill="#8FA3B8"/><path d="M248 88 L272 52 L296 88Z" fill="#5F7A8A"/><rect x="150" y="118" width="100" height="12" fill="#4D6E96"/><rect x="0" y="186" width="400" height="14" fill="#4D6E96"/><rect x="118" y="106" width="8" height="14" fill="#FFE08A"/><rect x="132" y="106" width="8" height="14" fill="#FFE08A"/><rect x="262" y="106" width="8" height="14" fill="#FFE08A"/><rect x="276" y="106" width="8" height="14" fill="#FFE08A"/><path d="M106 150 Q60 186 0 186 M294 150 Q340 186 400 186" fill="none" stroke="#4D6E96" stroke-width="4"/>'),
    it('<path d="M170 240 h70 l-10 18 h-50Z" fill="#E63946"/><rect x="198" y="216" width="6" height="24" fill="#14284B"/><path d="M204 218 l24 14 h-24Z" fill="#fff"/>'),
    it(label(200, 291, 'La Tamise', 22, '#fff'))
  ]);
}
function nationsArt() {
  function card(x, y, name, icon) { return it('<rect x="' + x + '" y="' + y + '" width="160" height="112" rx="18" fill="#fff" stroke="#14284B" stroke-width="3"/><g transform="translate(' + (x + 80) + ' ' + (y + 46) + ')">' + icon + '</g>' + label(x + 80, y + 100, name, 18)); }
  var rose = '<circle r="26" fill="#E63946"/><circle r="17" fill="none" stroke="#9E1B25" stroke-width="3"/><circle r="8" fill="none" stroke="#9E1B25" stroke-width="3"/>';
  var thistle = '<path d="M-18 -8 L-12 -30 L-6 -12 L0 -34 L6 -12 L12 -30 L18 -8Z" fill="#B565D8"/><path d="M-20 -8 H20 Q18 12 0 18 Q-18 12 -20 -8Z" fill="#6FB25F"/>';
  var daff = ''; for (var k = 0; k < 6; k++) daff += '<ellipse cx="0" cy="-16" rx="8" ry="13" fill="#FFD23F" transform="rotate(' + (k * 60) + ')"/>';
  daff += '<circle r="10" fill="#FF9F1C"/>';
  var clover = '<circle cx="-10" cy="-6" r="11" fill="#2FA84F"/><circle cx="10" cy="-6" r="11" fill="#2FA84F"/><circle cx="0" cy="-18" r="11" fill="#2FA84F"/><path d="M0 -4 Q4 14 12 22" fill="none" stroke="#2FA84F" stroke-width="5" stroke-linecap="round"/>';
  return scene('Les 4 pays du Royaume-Uni', grad('#CFE8FF', '#EAF5FF'), [
    card(30, 24, 'Angleterre', rose), card(210, 24, 'Écosse', thistle), card(30, 156, 'Pays de Galles', daff), card(210, 156, 'Irlande du Nord', clover)
  ]);
}
function palaceArt() {
  var win = ''; for (var r = 0; r < 2; r++) for (var i = 0; i < 9; i++) win += '<rect x="' + (62 + i * 30) + '" y="' + (150 + r * 42) + '" width="14" height="24" rx="2" fill="#7A8CA8"/>';
  return scene('Buckingham Palace', grad('#BFE0F7', '#F3F8FB'), [
    cloud(40, 60, .8), cloud(300, 50, .7),
    it('<rect y="262" width="400" height="38" fill="#7CC36A"/><rect x="40" y="130" width="320" height="132" fill="#E9DCC0"/>' + win + '<rect x="160" y="110" width="80" height="152" fill="#F2E8D0"/><path d="M152 112 L200 78 L248 112Z" fill="#D8C9A6"/><rect x="176" y="150" width="48" height="30" rx="2" fill="#C9B88F"/><rect x="170" y="190" width="60" height="8" fill="#C9B88F"/><path d="M178 262 V214 a22 22 0 0 1 44 0 V262Z" fill="#7A8CA8"/>'),
    it('<g transform="translate(200 44)"><path d="M-22 18 L-26 -8 L-12 4 L0 -14 L12 4 L26 -8 L22 18Z" fill="#FFC93C" stroke="#C9971A" stroke-width="2.5" stroke-linejoin="round"/><rect x="-22" y="18" width="44" height="8" rx="3" fill="#E63946"/></g>'),
    it('<g transform="translate(335 270)"><rect x="-13" y="-62" width="26" height="46" rx="6" fill="#D62828"/><rect x="-11" y="-16" width="9" height="16" fill="#14284B"/><rect x="2" y="-16" width="9" height="16" fill="#14284B"/><circle cx="0" cy="-74" r="11" fill="#F2C9A0"/><path d="M-13 -78 Q-13 -102 0 -102 Q13 -102 13 -78Z" fill="#222"/></g>')
  ]);
}
function fishChipsArt() {
  var fries = '', cols = ['#FFD23F', '#F7C531', '#FFDE63'], ang = [-24, -14, -5, 5, 14, 24, -9, 11];
  for (var i = 0; i < 8; i++) { var x = 132 + i * 19; fries += '<rect x="' + x + '" y="96" width="15" height="84" rx="6" fill="' + cols[i % 3] + '" transform="rotate(' + ang[i] + ' ' + (x + 7) + ' 180)"/>'; }
  return scene('Du fish and chips', grad(WARM[0], WARM[1]), [
    it(fries),
    it('<path d="M120 172 H280 L262 276 H138Z" fill="#F4EFE0" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M146 198 H254 M150 216 H246 M154 234 H240" stroke="#B9B2A0" stroke-width="5" stroke-linecap="round"/>'),
    it('<g transform="translate(200 160) rotate(-8)"><path d="M-66 0 L-96 -22 L-96 22Z" fill="#D88A24"/><ellipse rx="74" ry="26" fill="#E3A13C"/><path d="M-40 -10 q10 10 0 20 M-20 -14 q10 14 0 28 M0 -14 q10 14 0 28" fill="none" stroke="#C07A1E" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="-6" r="5" fill="#14284B"/><circle cx="48" cy="-8" r="1.8" fill="#fff"/><path d="M54 8 q8 4 14 -2" fill="none" stroke="#7A4A12" stroke-width="3" stroke-linecap="round"/></g>'),
    it('<g transform="translate(318 252)"><path d="M-26 0 A26 26 0 0 1 26 0Z" fill="#FFE45C"/><path d="M-26 0 A26 26 0 0 1 26 0" fill="none" stroke="#E6C418" stroke-width="4"/><path d="M0 0 V-24 M-14 0 L-12 -20 M14 0 L12 -20" stroke="#E6C418" stroke-width="2"/></g>')
  ]);
}
/* Irlande */
function irelandArt() {
  return scene('L’Irlande, à l’ouest de la Grande-Bretagne', grad('#7CC4F0', '#CDEBFA'), [
    it('<path d="M270 36 C300 46 312 90 296 120 C322 142 332 182 302 216 C282 250 240 262 214 246 C236 226 226 206 242 186 C226 160 246 140 250 120 C244 90 250 52 270 36Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3"/>' + waves(280, '#fff', .5)),
    it('<path d="M118 100 C150 94 172 122 166 154 C172 186 152 216 120 224 C88 228 72 196 78 166 C66 134 92 106 118 100Z" fill="#4FA848" stroke="#2F7A32" stroke-width="3"/><g transform="translate(122 164) scale(.9)"><circle cx="-10" cy="-6" r="11" fill="#fff"/><circle cx="10" cy="-6" r="11" fill="#fff"/><circle cx="0" cy="-18" r="11" fill="#fff"/><path d="M0 -4 Q4 14 12 22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>'),
    it('<path d="M246 64 H168" stroke="#14284B" stroke-width="5" stroke-linecap="round"/><path d="M180 52 L166 64 L180 76" fill="none" stroke="#14284B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' + label(206, 46, 'Ouest', 22)),
    it(label(122, 252, 'Irlande', 20) + label(276, 288, 'Grande-Bretagne', 18))
  ]);
}
/* Islande */
function icelandArt() {
  var fl = [[40, 40, 3], [100, 100, 2.5], [330, 30, 3], [370, 110, 2.5], [260, 150, 2], [60, 170, 2.5], [300, 200, 2]];
  return scene('Un volcan en Islande', grad('#9CC7EE', '#E8F3FB'), [
    it('<path d="M0 100 Q60 40 140 90" fill="none" stroke="#6EE7B7" stroke-width="10" stroke-opacity=".6" stroke-linecap="round"/><path d="M220 70 Q300 10 400 76" fill="none" stroke="#A78BFA" stroke-width="10" stroke-opacity=".5" stroke-linecap="round"/>'),
    it('<path d="M90 252 L186 84 L222 84 L330 252Z" fill="#5A4A5E"/><path d="M174 108 L186 84 L222 84 L234 110 L218 100 L206 114 L192 100Z" fill="#fff"/><path d="M204 86 q-8 40 -28 70 q14 -6 20 20 q10 -40 8 -90Z" fill="#FF6B35"/><path d="M214 86 q10 30 24 62 q-12 -6 -14 14 q-14 -40 -10 -76Z" fill="#FF9F1C"/>'),
    it('<g fill="#B8B8C8" opacity=".9"><circle cx="206" cy="64" r="16"/><circle cx="228" cy="50" r="20"/><circle cx="198" cy="42" r="12"/></g>'),
    it('<path d="M0 252 Q120 228 220 250 T400 240 V300 H0Z" fill="#fff"/><path d="M0 278 Q140 260 260 276 T400 270 V300 H0Z" fill="#E1EEF8"/>'),
    it(fl.map(function (s) { return sparkle(s[0], s[1], s[2]).replace('#FFF3B0', '#fff'); }).join('')),
    it('<rect x="344" y="168" width="14" height="66" rx="7" fill="#fff" stroke="#14284B" stroke-width="3"/><circle cx="351" cy="240" r="12" fill="#4D96FF" stroke="#14284B" stroke-width="3"/><rect x="348" y="208" width="6" height="30" fill="#4D96FF"/>')
  ]);
}
/* Norvège */
function norwayHousesArt() {
  var cols = ['#E63946', '#F4A261', '#FFD23F', '#2A9D8F', '#4D96FF'], hs = '', xs = [24, 88, 152, 218, 284], hh = [70, 84, 66, 78, 72];
  for (var i = 0; i < 5; i++) hs += house(xs[i], 222 - hh[i], 58, hh[i], cols[i]);
  return scene('Des maisons colorées en Norvège', grad('#BFE3FF', '#F2F9FF'), [
    cloud(40, 50, .8), cloud(300, 40, .7),
    it('<path d="M0 150 L70 80 L130 140 L200 70 L270 140 L330 90 L400 150V230H0Z" fill="#8FA7C2"/><path d="M70 80 L84 94 L70 90 L58 96Z M200 70 L214 84 L200 80 L186 86Z M330 90 L344 104 L330 100 L318 106Z" fill="#fff"/>'),
    it('<rect y="222" width="400" height="78" fill="#3E9BD8"/>' + waves(244, '#fff', .55) + waves(272, '#fff', .35)),
    it(hs)
  ]);
}
function fjordArt() {
  return scene('Un fjord norvégien', grad('#CFE9FF', '#EAF6FF'), [
    sun(330, 52, 20, '#FFD23F'),
    it('<path d="M120 150 L170 104 L200 128 L240 98 L290 150Z" fill="#A9BED2"/>'),
    it('<path d="M150 150 L250 150 L400 300 L0 300Z" fill="#3E9BD8"/>' + '<path d="M170 170 H230 M150 200 H250 M120 236 H280 M80 270 H320" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>'),
    it('<path d="M0 20 L40 60 L80 44 L150 150 L30 300 L0 300Z" fill="#5C6B7A"/><path d="M22 40 L40 60 L60 52 L52 38Z" fill="#fff"/><path d="M0 214 L70 190 L40 260Z" fill="#2F6B4A"/>'),
    it('<path d="M400 10 L350 56 L320 40 L250 150 L370 300 L400 300Z" fill="#4E5E6E"/><path d="M372 30 L350 56 L322 42 L338 24Z" fill="#fff"/><path d="M400 214 L330 190 L360 260Z" fill="#2F6B4A"/>'),
    it('<path d="M170 232 h60 l-8 16 h-44Z" fill="#E63946"/><rect x="198" y="210" width="5" height="22" fill="#14284B"/><path d="M203 212 l22 12 h-22Z" fill="#fff"/>')
  ]);
}
/* Danemark */
function cyclistsArt() {
  var cols = ['#E63946', '#F4A261', '#FFD23F', '#2A9D8F', '#4D96FF'], hs = '', xs = [10, 78, 146, 214, 282], hh = [60, 74, 56, 68, 62];
  for (var i = 0; i < 5; i++) hs += house(xs[i], 186 - hh[i], 56, hh[i], cols[i]);
  return scene('Des cyclistes au Danemark', grad('#BFE3FF', '#F2F9FF'), [
    cloud(300, 40, .8),
    it(hs + '<rect x="338" y="124" width="56" height="62" fill="#4D96FF"/>'),
    it('<rect y="190" width="400" height="110" fill="#8E9AAF"/><path d="M0 245 H400" stroke="#fff" stroke-width="4" stroke-dasharray="26 18"/>'),
    it(bike(80, 262, 1, '#E63946')), it(bike(200, 270, 1.05, '#4D96FF')), it(bike(320, 258, .95, '#FFC93C'))
  ]);
}
function copenhagenArt() {
  return scene('Copenhague sur une petite île', grad('#7CC4F0', '#BFE3F7'), [
    it(waves(60, '#fff', .5) + waves(270, '#fff', .5)),
    it('<path d="M100 160 C110 108 200 86 270 106 C330 126 322 196 280 226 C228 256 124 246 100 196Z" fill="#E9D8A6" stroke="#B89B5E" stroke-width="3"/>'),
    it(house(130, 170, 36, 34, '#E63946') + house(176, 160, 40, 44, '#FFD23F') + house(226, 168, 36, 36, '#4D96FF') + house(268, 176, 30, 28, '#2A9D8F')),
    it('<path d="M200 118 V150 M196 134 L200 106 L204 134" stroke="#5F7A8A" stroke-width="4" fill="none"/>' + fir(150, 150, .45, '#2F7A32') + fir(260, 150, .45, '#2F7A32')),
    it('<path d="M320 70 h50 l-8 14 h-34Z" fill="#E63946"/><rect x="343" y="46" width="5" height="24" fill="#14284B"/><path d="M348 48 l20 10 h-20Z" fill="#fff"/>'),
    it(label(200, 288, 'Copenhague', 22))
  ]);
}
/* Suède */
function balticArt() {
  return scene('De la Suède à la mer Baltique', grad('#5FB3E8', '#BFE3F7'), [
    it('<path d="M30 10 C80 0 120 30 130 70 C140 110 120 140 130 180 C140 215 120 240 90 262 C60 270 40 230 50 190 C40 150 20 120 30 80Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3"/>'),
    it('<path d="M262 220 C280 205 320 208 340 225 C350 245 320 265 290 262 C265 258 252 240 262 220Z" fill="#E9D8A6" stroke="#B89B5E" stroke-width="3"/>' + flagArt('dk', 280, 226, 40)),
    it(flagArt('se', 40, 26, 64)),
    it(waves(130, '#fff', .55) + label(260, 120, 'Mer Baltique', 22, '#fff')),
    it('<path d="M140 190 Q200 180 252 226" fill="none" stroke="#14284B" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round"/><path d="M180 176 h50 l-8 14 h-34Z" fill="#E63946"/><rect x="202" y="152" width="5" height="24" fill="#14284B"/><path d="M207 154 l22 12 h-22Z" fill="#fff"/>'),
    it('<path d="M360 100 V50" stroke="#14284B" stroke-width="5" stroke-linecap="round"/><path d="M348 62 L360 46 L372 62" fill="none" stroke="#14284B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' + label(360, 124, 'Nord', 20))
  ]);
}
/* Finlande */
function laplandArt() {
  var tr = fir(40, 262, 1.1, '#1F6B4A') + fir(96, 270, .9, '#2A7F58') + fir(350, 266, 1.2, '#1F6B4A') + fir(310, 274, .8, '#2A7F58');
  return scene('Le père Noël en Laponie', grad('#16284F', '#3B3F7E'), [
    it('<path d="M0 90 Q90 30 190 80" fill="none" stroke="#6EE7B7" stroke-width="12" stroke-opacity=".55" stroke-linecap="round"/><path d="M180 50 Q290 0 400 70" fill="none" stroke="#C4A8FF" stroke-width="12" stroke-opacity=".5" stroke-linecap="round"/>'),
    stars([[60, 130, 2.5], [150, 40, 3], [330, 120, 2.5], [380, 40, 3], [250, 110, 2]]),
    it('<path d="M0 252 Q130 226 240 250 T400 240 V300 H0Z" fill="#fff"/>'),
    it(tr),
    it('<rect x="96" y="196" width="76" height="56" fill="#9A5B34"/><path d="M88 198 L134 160 L180 198Z" fill="#fff" stroke="#DDE8F2" stroke-width="3"/><rect x="108" y="212" width="20" height="20" fill="#FFD23F"/><rect x="144" y="222" width="16" height="30" fill="#5A3B2E"/>'),
    it('<g transform="translate(262 252)"><rect x="-26" y="-16" width="52" height="18" rx="6" fill="#14284B"/><ellipse cx="0" cy="-48" rx="26" ry="34" fill="#D62828"/><rect x="-26" y="-34" width="52" height="7" fill="#14284B"/><circle cx="0" cy="-92" r="15" fill="#F2C9A0"/><path d="M-17 -88 Q0 -62 17 -88 L17 -78 Q0 -50 -17 -78Z" fill="#fff"/><path d="M-17 -98 Q-14 -126 6 -118 L20 -98Z" fill="#D62828"/><circle cx="8" cy="-120" r="5" fill="#fff"/><circle cx="-5" cy="-94" r="2" fill="#14284B"/><circle cx="6" cy="-94" r="2" fill="#14284B"/><rect x="-44" y="-52" width="20" height="26" rx="5" fill="#FFC93C"/></g>')
  ]);
}
function tampereArt() {
  var win = ''; for (var r = 0; r < 3; r++) for (var i = 0; i < 6; i++) win += '<rect x="' + (50 + i * 34) + '" y="' + (150 + r * 30) + '" width="16" height="20" fill="#FFF3C4"/>';
  return scene('La ville de Tampere et son lac', grad('#BFE3FF', '#F6FBFF'), [
    cloud(290, 46, .8),
    it('<rect x="40" y="130" width="220" height="104" fill="#B5523B"/><rect x="40" y="124" width="220" height="10" fill="#8F3C2B"/>' + win),
    it('<rect x="290" y="60" width="26" height="176" fill="#A2472F"/><rect x="286" y="54" width="34" height="10" fill="#8F3C2B"/><rect x="332" y="100" width="22" height="136" fill="#A2472F"/><rect x="328" y="94" width="30" height="10" fill="#8F3C2B"/>'),
    it('<rect y="234" width="400" height="66" fill="#4FA3D6"/>' + waves(254, '#fff', .6) + waves(280, '#fff', .4)),
    it(fir(18, 236, .6, '#2F7A32') + fir(268, 236, .6, '#2F7A32')),
    it('<path d="M120 262 h60 l-8 14 h-44Z" fill="#E63946"/><rect x="146" y="240" width="5" height="22" fill="#14284B"/><path d="M151 242 l20 11 h-20Z" fill="#fff"/>'),
    it(label(330, 284, 'Tampere', 22, '#fff'))
  ]);
}
/* Allemagne */
function coasterArt() {
  var path = 'M0 230 C60 120 100 120 140 230 S220 60 260 200 S340 100 400 180';
  return scene('Des montagnes russes', grad('#7FC8F8', '#F3F9E2'), [
    cloud(40, 50, .8), cloud(290, 40, .7),
    it('<rect y="262" width="400" height="38" fill="#7CC36A"/>'),
    it('<path d="' + path + '" fill="none" stroke="#5B3A29" stroke-width="12" stroke-dasharray="2 9"/><path d="' + path + '" fill="none" stroke="#E63946" stroke-width="5" stroke-linecap="round"/>'),
    it('<g transform="translate(78 138)"><rect x="-26" y="-6" width="52" height="18" rx="7" fill="#FFC93C"/><circle cx="-10" cy="-18" r="9" fill="#F2C9A0"/><circle cx="12" cy="-18" r="9" fill="#F2C9A0"/><path d="M-18 -8 L-24 -34 M20 -8 L26 -34" stroke="#4D96FF" stroke-width="5" stroke-linecap="round"/></g>'),
    it('<ellipse cx="190" cy="52" rx="64" ry="24" fill="#fff" stroke="#14284B" stroke-width="3"/><path d="M160 72 l-6 14 l18 -10Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>' + label(190, 60, 'Wouhou !', 22))
  ]);
}
function blackForestArt() {
  var t = '', xs = [20, 70, 120, 170, 225, 280, 335, 380], ys = [250, 270, 246, 274, 252, 272, 248, 268], cs = ['#0F3B2A', '#145238', '#0F3B2A', '#1A6445'];
  for (var i = 0; i < 8; i++) t += fir(xs[i], ys[i], 1.5 + (i % 3) * .2, cs[i % 4]);
  return scene('La Forêt-Noire et un soldat romain qui a peur', grad('#0B1F1A', '#1F4D3A'), [
    moon(330, 50, 22),
    it('<path d="M0 200 Q100 170 200 195 T400 185 V300 H0Z" fill="#0A2A20" opacity=".8"/>'),
    it(t),
    it('<g fill="#FFE08A"><circle cx="110" cy="150" r="6"/><circle cx="126" cy="150" r="6"/><circle cx="276" cy="130" r="6"/><circle cx="292" cy="130" r="6"/></g><g fill="#14284B"><circle cx="110" cy="150" r="2.6"/><circle cx="126" cy="150" r="2.6"/><circle cx="276" cy="130" r="2.6"/><circle cx="292" cy="130" r="2.6"/></g>'),
    it('<g transform="translate(200 270)"><rect x="-18" y="-58" width="36" height="48" rx="8" fill="#B5523B"/><rect x="-14" y="-12" width="10" height="16" fill="#8A6B4A"/><rect x="4" y="-12" width="10" height="16" fill="#8A6B4A"/><circle cx="0" cy="-74" r="16" fill="#F2C9A0"/><path d="M-17 -76 Q-17 -98 0 -98 Q17 -98 17 -76Z" fill="#C0C7D0"/><path d="M-4 -98 Q0 -112 4 -98Z M-8 -112 H8" fill="#D62828" stroke="#D62828" stroke-width="3" stroke-linejoin="round"/><circle cx="-6" cy="-72" r="4" fill="#fff"/><circle cx="6" cy="-72" r="4" fill="#fff"/><circle cx="-6" cy="-72" r="1.8" fill="#14284B"/><circle cx="6" cy="-72" r="1.8" fill="#14284B"/><ellipse cx="0" cy="-62" rx="3.5" ry="4.5" fill="#14284B"/><rect x="-44" y="-62" width="22" height="34" rx="6" fill="#D62828" stroke="#FFC93C" stroke-width="3"/></g>')
  ]);
}
/* Suisse */
function lemanArt() {
  return scene('Le lac Léman et les Alpes', grad('#BFE3FF', '#F2F9FF'), [
    sun(60, 50, 20, '#FFD23F'),
    it('<path d="M0 170 L70 70 L110 120 L180 40 L250 130 L300 80 L400 170Z" fill="#8FA7C2"/><path d="M70 70 L88 96 L72 92 L58 98Z M180 40 L204 78 L186 72 L172 82 L158 70Z M300 80 L316 100 L300 96 L288 102Z" fill="#fff"/>'),
    it('<rect y="170" width="400" height="130" fill="#3E9BD8"/>' + waves(205, '#fff', .55) + waves(240, '#fff', .4)),
    it(house(250, 150, 24, 20, '#F4A261') + house(280, 146, 26, 24, '#E63946') + house(312, 152, 22, 18, '#FFD23F') + '<rect x="212" y="120" width="14" height="50" fill="#B5A58A"/><path d="M210 122 L219 100 L228 122Z" fill="#5F7A8A"/>'),
    it('<path d="M110 250 h90 l-14 20 h-62Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><rect x="154" y="190" width="5" height="60" fill="#14284B"/><path d="M158 192 L196 244 H158Z" fill="#FF6B6B"/><path d="M154 200 L120 244 H154Z" fill="#fff" stroke="#14284B" stroke-width="2"/>'),
    it(label(300, 288, 'Lac Léman', 22, '#fff'))
  ]);
}
/* France */
function chamonixArt() {
  return scene('Chamonix et sa télécabine', grad('#BFE3FF', '#F2F9FF'), [
    sun(340, 50, 20, '#FFD23F'),
    it('<path d="M0 230 L90 90 L140 150 L210 60 L290 170 L340 120 L400 230Z" fill="#8FA7C2"/><path d="M90 90 L110 122 L92 116 L76 124Z M210 60 L234 100 L214 94 L196 104Z" fill="#fff"/>'),
    it('<path d="M0 232 Q120 208 240 230 T400 222 V300 H0Z" fill="#6FB25F"/>'),
    it('<path d="M0 50 L400 150" stroke="#14284B" stroke-width="3"/><path d="M200 100 V116" stroke="#14284B" stroke-width="3"/><rect x="180" y="116" width="40" height="30" rx="6" fill="#E63946" stroke="#14284B" stroke-width="3"/><rect x="186" y="122" width="12" height="14" fill="#FFF3C4"/><rect x="202" y="122" width="12" height="14" fill="#FFF3C4"/>'),
    it(fir(40, 262, 1.1, '#1F6B4A') + fir(90, 270, .9, '#2A7F58') + fir(330, 266, 1.2, '#1F6B4A') + fir(372, 274, .9, '#2A7F58'))
  ]);
}
function montBlancArt() {
  return scene('Le Mont Blanc', grad('#9CC7EE', '#EAF4FB'), [
    sun(70, 56, 22, '#FFD23F'), cloud(280, 40, .6),
    it('<path d="M50 270 L150 150 L190 160 L240 52 L300 140 L330 156 L390 270Z" fill="#6F86A8"/><path d="M240 52 L220 96 L238 90 L252 106 L268 90 L284 112 L300 140 L276 126 L260 134 L244 120 L226 130 L212 110Z" fill="#fff"/>'),
    it('<path d="M0 262 Q120 238 240 258 T400 250 V300 H0Z" fill="#6FB25F"/>'),
    it('<path d="M350 56 V262" stroke="#14284B" stroke-width="4" stroke-linecap="round"/><path d="M340 70 L350 54 L360 70 M340 248 L350 264 L360 248" fill="none" stroke="#14284B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' + label(350, 170, '4 807 m', 22).replace('text-anchor="middle"', 'text-anchor="end" transform="translate(-14 0)"'))
  ]);
}
function eiffelArt() {
  return scene('La tour Eiffel', grad('#FFC8A8', '#FFEBD6'), [
    cloud(40, 70, .8), cloud(300, 60, .7),
    it('<rect y="268" width="400" height="32" fill="#8FBF7A"/>'),
    it('<path d="M200 36 L192 96 L180 170 L160 270 L178 270 L190 208 Q200 192 210 208 L222 270 L240 270 L220 170 L208 96Z" fill="#5C4A3A"/><rect x="174" y="166" width="52" height="8" fill="#5C4A3A"/><rect x="186" y="92" width="28" height="6" fill="#5C4A3A"/><path d="M200 36 V18" stroke="#5C4A3A" stroke-width="3"/><path d="M186 120 L214 150 M214 120 L186 150 M178 190 L222 230 M222 190 L178 230" stroke="#7A6652" stroke-width="2.5"/>'),
    it(label(300, 150, '330 m', 28)),
    it('<g transform="translate(86 112) scale(1.2)"><ellipse rx="34" ry="9" fill="#fff" stroke="#14284B" stroke-width="3"/><path d="M-6 -2 L-20 -22 H-6 L12 -2Z" fill="#E63946" stroke="#14284B" stroke-width="2.5" stroke-linejoin="round"/><path d="M-26 -4 L-34 -16 H-24 L-18 -4Z" fill="#E63946" stroke="#14284B" stroke-width="2.5" stroke-linejoin="round"/><circle cx="18" cy="-1" r="2.5" fill="#14284B"/><circle cx="8" cy="-1" r="2.5" fill="#14284B"/></g>')
  ]);
}
/* Italie */
function italyFoodArt() {
  var pasta = '<path d="M-34 0 A34 26 0 0 0 34 0Z" fill="#fff" stroke="#14284B" stroke-width="3"/><path d="M-26 -2 q6 -22 12 -2 q6 -22 12 -2 q6 -22 12 -2 q6 -22 12 -2" fill="none" stroke="#F4C95D" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-14" r="8" fill="#D62828"/>';
  var pep = [[178, 138], [210, 134], [194, 166], [190, 196]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="#C8302B"/>'; }).join('');
  return scene('Des pâtes, une pizza et une glace', grad('#FFE9C7', '#FFF6E4'), [
    it('<g transform="translate(78 216)">' + pasta + '</g>'),
    it('<path d="M150 120 Q200 96 250 120 L200 252Z" fill="#FFD27A" stroke="#E3A857" stroke-width="3"/><path d="M148 120 Q200 94 252 120" fill="none" stroke="#E3A857" stroke-width="12" stroke-linecap="round"/>' + pep),
    it('<path d="M286 196 H334 L310 262Z" fill="#E0A458"/><path d="M294 210 L316 204 M300 228 L322 220" stroke="#B87A32" stroke-width="3"/><circle cx="310" cy="186" r="24" fill="#FF9FB5"/><circle cx="310" cy="160" r="21" fill="#8FE3C0"/><circle cx="310" cy="140" r="6" fill="#D62828"/>'),
    it('<rect y="262" width="400" height="38" fill="#F4D9A6"/>')
  ]);
}
function pizzaArt() {
  var moz = [[160, 130, 18], [226, 120, 18], [250, 170, 17], [196, 190, 19], [150, 190, 16], [208, 156, 14]].map(function (m) { return '<circle cx="' + m[0] + '" cy="' + m[1] + '" r="' + m[2] + '" fill="#FFF8EA"/>'; }).join('');
  var leaf = [[180, 156], [236, 144], [168, 214], [238, 200]].map(function (l) { return '<ellipse cx="' + l[0] + '" cy="' + l[1] + '" rx="10" ry="6" fill="#2FA84F" transform="rotate(-30 ' + l[0] + ' ' + l[1] + ')"/>'; }).join('');
  return scene('La pizza Margherita', grad('#FFE9C7', '#FFF6E4'), [
    it('<circle cx="200" cy="158" r="104" fill="#E3A857"/><circle cx="200" cy="158" r="90" fill="#D62828"/>'),
    it(moz), it(leaf),
    it('<g transform="translate(60 52)"><path d="M-22 18 L-26 -8 L-12 4 L0 -14 L12 4 L26 -8 L22 18Z" fill="#FFC93C" stroke="#C9971A" stroke-width="2.5" stroke-linejoin="round"/><rect x="-22" y="18" width="44" height="8" rx="3" fill="#E63946"/></g>'),
    it('<rect x="296" y="220" width="30" height="48" fill="#009246"/><rect x="326" y="220" width="30" height="48" fill="#fff" stroke="#14284B" stroke-width="2"/><rect x="356" y="220" width="30" height="48" fill="#CE2B37"/><rect x="296" y="220" width="90" height="48" fill="none" stroke="#14284B" stroke-width="3"/>')
  ]);
}
function colosseumArt() {
  var arches = '';
  for (var r = 0; r < 3; r++) for (var i = 0; i < 9; i++) arches += '<rect x="' + (62 + i * 31) + '" y="' + (112 + r * 46) + '" width="17" height="34" rx="8.5" fill="#8F6B3E"/>';
  return scene('Le Colisée', grad('#FFD8A8', '#FFE9CC'), [
    sun(340, 56, 20, '#FF9F1C'),
    it('<rect x="40" y="96" width="320" height="168" fill="#D9B88A"/><rect x="40" y="96" width="320" height="8" fill="#C79E68"/>' + arches),
    it('<path d="M270 86 L360 86 L360 140 L340 124 L322 134 L300 110 L280 114Z" fill="#FFD8A8"/>'),
    it('<rect y="262" width="400" height="38" fill="#CDB88E"/><g transform="translate(200 284)"><rect x="-12" y="-26" width="24" height="24" rx="6" fill="#B5523B"/><circle cx="0" cy="-36" r="11" fill="#F2C9A0"/><path d="M-12 -38 Q-12 -54 0 -54 Q12 -54 12 -38Z" fill="#C0C7D0"/><path d="M-3 -54 L0 -64 L3 -54Z" fill="#D62828"/></g>')
  ]);
}
/* Fin */
function finArt() {
  var codes = ['uk', 'is', 'dk', 'no', 'pl', 'de', 'be', 'fr', 'es', 'it', 'gr'], out = [];
  codes.forEach(function (c, i) {
    var row = i < 6 ? 0 : 1, col = i < 6 ? i : i - 6, w = 56;
    var x = (row ? 44 : 12) + col * 64, y = row ? 196 : 112;
    out.push(it('<rect x="' + (x + w / 2 - 2) + '" y="' + (y - 14) + '" width="4" height="14" fill="#8A6B4A"/>' + flagArt(c, x, y, w)));
  });
  return scene('Tous les drapeaux visités', grad('#BFE3F7', '#EAF6FB'), [
    it(label(200, 84, 'Fin', 64)),
    it('<path d="M0 98 H400 M0 182 H400" stroke="#14284B" stroke-width="3"/>')
  ].concat(out));
}
function coverArt() {
  var cs = [['uk', 30, 36, -8], ['fr', 150, 28, 5], ['de', 270, 40, -5], ['it', 36, 150, 6], ['no', 156, 160, -6], ['dk', 276, 148, 8]], g = '';
  cs.forEach(function (c) { g += '<g transform="rotate(' + c[3] + ' ' + (c[1] + 50) + ' ' + (c[2] + 33) + ')">' + flagArt(c[0], c[1], c[2], 100) + '</g>'; });
  return scene('Plein de drapeaux d’Europe', grad('#4D96FF', '#1F5FBF'), [sparkle(20, 20, 3), sparkle(380, 270, 3), sparkle(350, 20, 2.5), it(g)]);
}


/* nouveaux dessins : Europe */
function europeIntroArt() {
  return scene('La Terre et ses 7 continents', grad('#0B1F4D', '#1F3F8F'), [
    stars([[40, 40, 3], [350, 50, 3], [60, 250, 2.5], [340, 240, 3], [200, 24, 2]]),
    it('<circle cx="200" cy="146" r="98" fill="#3E9BD8" stroke="#14284B" stroke-width="4"/>'),
    it('<path d="M150 88 q30 -22 62 -8 q20 22 -6 42 q-30 14 -58 -4Z M214 150 q42 -10 58 22 q-4 42 -38 52 q-28 -32 -20 -74Z M134 164 q22 -6 36 10 q-6 28 -28 32 q-16 -18 -8 -42Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3"/>'),
    it(label(182, 112, 'Europe', 22, '#fff')),
    it(label(200, 280, '7 continents', 30, '#fff'))
  ]);
}
function saltMineArt(withLabels) {
  var parts = [
    it('<path d="M0 0 H400 V74 Q200 24 0 74Z" fill="#DDE5EE" stroke="#14284B" stroke-width="3"/><path d="M60 40 l14 24 l14 -24 M300 36 l12 22 l12 -22" fill="none" stroke="#B9C7D8" stroke-width="3" stroke-linejoin="round"/>'),
    it('<path d="M0 74 V250 M400 74 V250" stroke="#14284B" stroke-width="3"/><path d="M0 250 H400 V300 H0Z" fill="#F4F7FB" stroke="#14284B" stroke-width="3"/>'),
    it('<path d="M30 250 l18 -44 l16 44Z M330 250 l16 -52 l20 52Z M70 250 l14 -26 l12 26Z" fill="#fff" stroke="#9FB3CC" stroke-width="3" stroke-linejoin="round"/>'),
    it('<path d="M200 38 V92" stroke="#14284B" stroke-width="3"/><g fill="#FFF3B0" stroke="#C9971A" stroke-width="3"><circle cx="200" cy="102" r="12"/><circle cx="170" cy="118" r="9"/><circle cx="230" cy="118" r="9"/></g>'),
    it(person(150, 214, '#E63946', '#F2C9A0') + person(250, 214, '#3A6FDB', '#C98E62'))
  ];
  if (withLabels) {
    parts.push(it(label(200, 40, 'Plafond', 22, '#14284B')), it(label(60, 150, 'Mur', 22, '#14284B')), it(label(340, 150, 'Mur', 22, '#14284B')), it(label(200, 282, 'Sol', 22, '#14284B')));
  } else {
    parts.push(it(label(200, 178, 'Tout est blanc !', 26, '#14284B')));
  }
  return scene('Une mine de sel toute blanche', grad('#EEF2F8', '#FFFFFF'), parts);
}
function concertArt() {
  var notes = '<g fill="#14284B"><circle cx="70" cy="64" r="6"/><rect x="74" y="34" width="3" height="30"/><circle cx="330" cy="80" r="6"/><rect x="334" y="50" width="3" height="30"/><circle cx="130" cy="40" r="5"/><rect x="134" y="14" width="3" height="26"/></g>';
  return scene('Un concert de musique classique', grad('#3B1F3A', '#7A3B4E'), [
    it('<rect x="0" y="236" width="400" height="64" fill="#5A3B1E"/><path d="M0 236 H400" stroke="#14284B" stroke-width="3"/>'),
    it('<path d="M20 0 H70 V200 H20Z M330 0 H380 V200 H330Z" fill="#A82A3C" stroke="#14284B" stroke-width="3"/>'),
    it('<g transform="translate(200 220)"><circle cx="0" cy="-60" r="12" fill="#F2C9A0"/><rect x="-14" y="-48" width="28" height="44" rx="8" fill="#14284B"/><path d="M14 -40 L46 -62" stroke="#F2F2F2" stroke-width="4" stroke-linecap="round"/></g>'),
    it(person(120, 222, '#FFD23F', '#F2C9A0') + person(150, 226, '#FF6B6B', '#C98E62') + person(250, 226, '#4D96FF', '#F2C9A0') + person(280, 222, '#6DBB5A', '#C98E62')),
    it(notes)
  ]);
}
function pianoArt() {
  var keys = '';
  for (var i = 0; i < 10; i++) keys += '<rect x="' + (110 + i * 18) + '" y="170" width="18" height="60" fill="#fff" stroke="#14284B" stroke-width="2"/>';
  for (var j = 0; j < 9; j++) if (j !== 2 && j !== 6) keys += '<rect x="' + (110 + j * 18 + 12) + '" y="170" width="12" height="36" fill="#14284B"/>';
  return scene('Beethoven au piano', grad('#E3D7F5', '#F7F1FD'), [
    it('<rect x="90" y="120" width="220" height="110" rx="10" fill="#3B2A3A" stroke="#14284B" stroke-width="3"/>'),
    it(keys),
    it('<g transform="translate(200 120)"><circle cx="0" cy="-24" r="20" fill="#F2C9A0" stroke="#14284B" stroke-width="3"/><path d="M-24 -30 q-10 -28 14 -30 q10 -16 26 -2 q22 4 8 30 q-8 -14 -22 -12 q-14 -2 -26 14Z" fill="#8A8A8A"/><circle cx="-7" cy="-24" r="2.6" fill="#14284B"/><circle cx="9" cy="-24" r="2.6" fill="#14284B"/></g>'),
    it(label(200, 275, 'Beethoven', 30, '#14284B')),
    it('<g fill="#14284B"><circle cx="50" cy="90" r="6"/><rect x="54" y="60" width="3" height="30"/><circle cx="350" cy="100" r="6"/><rect x="354" y="70" width="3" height="30"/></g>')
  ]);
}
function belgiumArt() {
  function house(x, w, h, c) {
    return '<rect x="' + x + '" y="' + (250 - h) + '" width="' + w + '" height="' + h + '" fill="' + c + '" stroke="#14284B" stroke-width="3"/><path d="M' + (x - 4) + ' ' + (250 - h) + ' L' + (x + w / 2) + ' ' + (250 - h - 36) + ' L' + (x + w + 4) + ' ' + (250 - h) + 'Z" fill="#FFD23F" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><rect x="' + (x + w / 2 - 7) + '" y="' + (250 - h + 14) + '" width="14" height="18" fill="#14284B" opacity=".5"/>';
  }
  return scene('Des belles maisons dorées en Belgique', grad('#FFE9A8', '#FFF8DC'), [
    sun(340, 56, 22, '#FFD23F'), cloud(60, 60, 1),
    it('<rect y="250" width="400" height="50" fill="#CFC3A6" stroke="#14284B" stroke-width="3"/>'),
    it(house(24, 70, 120, '#F2B8B8')), it(house(106, 84, 150, '#B8D4F2')), it(house(202, 70, 118, '#C6E8B8')), it(house(284, 84, 140, '#F2D49B')),
    it(label(200, 285, 'Bruxelles', 22))
  ]);
}
function sagradaArt() {
  function tower(x, h) {
    return '<path d="M' + (x - 12) + ' 250 L' + (x - 9) + ' ' + (250 - h) + ' L' + x + ' ' + (250 - h - 34) + ' L' + (x + 9) + ' ' + (250 - h) + ' L' + (x + 12) + ' 250Z" fill="#E3C79A" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><circle cx="' + x + '" cy="' + (250 - h - 40) + '" r="4" fill="#E63946"/>';
  }
  return scene('La Sagrada Familia à Barcelone', grad('#FFD6A8', '#FFF1DA'), [
    sun(60, 56, 22, '#FFC93C'), cloud(320, 60, .9),
    it('<rect y="250" width="400" height="50" fill="#D9C9A8" stroke="#14284B" stroke-width="3"/>'),
    it('<rect x="90" y="190" width="220" height="60" fill="#EBD5AA" stroke="#14284B" stroke-width="3"/><rect x="180" y="206" width="40" height="44" rx="20" fill="#8A6B4A"/>'),
    it(tower(110, 120) + tower(150, 150) + tower(200, 170) + tower(250, 150) + tower(290, 120)),
    it(label(200, 285, 'Barcelone', 22))
  ]);
}
function tomatinaArt() {
  function tom(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#E63946" stroke="#9B1C28" stroke-width="2.5"/><path d="M' + (x - r / 2) + ' ' + (y - r * .8) + ' l' + (r / 2) + ' ' + (r * .4) + ' l' + (r / 2) + ' ' + (-r * .4) + '" fill="none" stroke="#3C9A4A" stroke-width="3" stroke-linecap="round"/>'; }
  return scene('La Tomatina : un lancer de tomates', grad('#FFE3C2', '#FFF6E8'), [
    it('<rect y="240" width="400" height="60" fill="#E9A0A0" stroke="#14284B" stroke-width="3"/>'),
    it(person(80, 210, '#3A6FDB', '#F2C9A0') + person(130, 216, '#FFD23F', '#C98E62') + person(270, 212, '#6DBB5A', '#F2C9A0') + person(320, 218, '#FF8FA3', '#C98E62')),
    it(tom(150, 120, 16) + tom(210, 80, 18) + tom(260, 130, 14) + tom(110, 70, 12)),
    it(tom(60, 262, 14) + tom(200, 268, 16) + tom(340, 262, 14)),
    it(label(200, 40, 'Splash !', 30, '#B3242C'))
  ]);
}
function italyBootArt() {
  return scene('L’Italie, un pays en forme de botte', grad('#BFE3F7', '#EAF6FB'), [
    it(waves(40, '#fff', .5) + waves(280, '#fff', .5)),
    it('<path d="M150 30 L214 38 L240 84 L226 120 L252 150 L300 190 L330 224 L300 240 L276 214 L244 220 L246 186 L220 150 L200 176 L216 222 L226 262 L198 272 L176 224 L172 166 L150 116 L120 90Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="4" stroke-linejoin="round"/>'),
    it(label(100, 150, 'Italie', 30, '#14284B'))
  ]);
}
function pisaArt() {
  var rows = '';
  for (var i = 0; i < 6; i++) rows += '<rect x="-24" y="' + (-150 + i * 24) + '" width="48" height="4" fill="#C9BFAE"/>';
  return scene('La tour de Pise est penchée', grad('#BFE3F7', '#EAF6FB'), [
    sun(330, 56, 22, '#FFD23F'),
    it('<rect y="262" width="400" height="38" fill="#7CC36A" stroke="#14284B" stroke-width="3"/>'),
    it('<g transform="translate(190 262) rotate(8)"><rect x="-24" y="-150" width="48" height="150" fill="#F6F1E6" stroke="#14284B" stroke-width="3"/>' + rows + '<rect x="-18" y="-174" width="36" height="24" fill="#F6F1E6" stroke="#14284B" stroke-width="3"/></g>'),
    it(label(290, 150, 'Pise', 30, '#14284B'))
  ]);
}
function parthenonArt() {
  var cols = '';
  for (var i = 0; i < 6; i++) cols += '<rect x="' + (92 + i * 40) + '" y="124" width="16" height="104" fill="#F6F1E6" stroke="#14284B" stroke-width="3"/>';
  return scene('Le Parthénon à Athènes', grad('#9FD4F2', '#E3F3FD'), [
    sun(340, 54, 22, '#FFD23F'), cloud(60, 56, 1),
    it('<path d="M0 300 V250 Q100 226 200 236 T400 232 V300Z" fill="#C9B98E" stroke="#14284B" stroke-width="3"/>'),
    it('<rect x="70" y="228" width="260" height="16" fill="#F6F1E6" stroke="#14284B" stroke-width="3"/>'),
    it(cols),
    it('<path d="M72 124 L200 76 L328 124Z" fill="#F6F1E6" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><rect x="72" y="124" width="256" height="10" fill="#E3D9BF" stroke="#14284B" stroke-width="3"/>'),
    it(label(200, 280, 'Athènes', 22))
  ]);
}

STORIES.unshift({
  title: 'Voyage en Europe', coverArt: coverArt, mark: '?',
  tiles: ['uk', 'is', 'dk', 'no', 'pl', 'de', 'be', 'fr', 'es', 'it', 'gr'].map(flagTile),
  scenes: [
    { tile: -1, text: 'Salut ! On va faire un voyage extraordinaire à travers les 7 continents de la planète Terre. On va commencer en Europe. Let’s go !', art: europeIntroArt },

    { tile: 0, text: 'Voici le Royaume-Uni. Capitale : Londres. Langue principale : anglais. Monnaie : la livre.', art: flagScene('uk', 'Royaume-Uni', '#BFE0F7', '#EAF4FB') },
    { tile: 0, text: 'Voici Big Ben. C’est le nom de la grosse cloche de la tour de l’horloge, sur le palais de Westminster.', art: bigBenArt },
    { tile: 0, text: 'Le Royaume-Uni est divisé en 4 pays : l’Irlande du Nord, le Pays de Galles, l’Écosse et l’Angleterre.', art: nationsArt },
    { tile: 0, text: 'Voici du fish and chips, ou poisson et frites. Direction l’Islande.', art: fishChipsArt },

    { tile: 1, text: 'Bienvenue en Islande. Capitale : Reykjavik.', art: flagScene('is', 'Islande', '#C7DFF5', '#EEF6FC') },
    { tile: 1, text: 'L’Islande est une île avec plein de volcans. Direction : le Danemark.', art: icelandArt },

    { tile: 2, text: 'Voici le Danemark. Capitale : Copenhague. Langue principale : danois.', art: flagScene('dk', 'Danemark', '#F8D5D5', '#FDF1F1') },
    { tile: 2, text: 'Il y a des cyclistes ! Et les maisons sont colorées !', art: cyclistsArt },
    { tile: 2, text: 'Il y a des montagnes russes ! Ce sont les jardins de Tivoli. 2 billets, s’il vous plaît. Wah ! Youpi ! Trop bien. On va en Norvège.', art: coasterArt },

    { tile: 3, text: 'Nous voici maintenant en Norvège. Capitale : Oslo.', art: flagScene('no', 'Norvège', '#D3E6F8', '#F1F7FD') },
    { tile: 3, text: 'Voici un fjord norvégien. Un lac entouré de rochers.', art: fjordArt },
    { tile: 3, text: 'Les maisons sont colorées ! Direction : la Pologne.', art: norwayHousesArt },

    { tile: 4, text: 'Voici la Pologne. Capitale : Varsovie. Langue principale : polonais.', art: flagScene('pl', 'Pologne', '#F8D5D5', '#FDF1F1') },
    { tile: 4, text: 'Oh ! Tout est blanc ! Tout ici est en sel.', art: function () { return saltMineArt(false); } },
    { tile: 4, text: 'En sel ? Oui. Le plafond ? Oui. Le sol ? Oui. Les murs ? Oui. Direction l’Allemagne.', art: function () { return saltMineArt(true); } },

    { tile: 5, text: 'Bienvenue en Allemagne. Population : 83 millions d’habitants. Capitale : Berlin. Langue principale : allemand.', art: flagScene('de', 'Allemagne', '#FFE9A8', '#FFF8DC') },
    { tile: 5, text: 'C’est beau. On va voir de la musique ? Oui ! Regarde ! Voici un concert de musique classique.', art: concertArt },
    { tile: 5, text: 'C’est d’Allemagne que vient Beethoven. Chut ! C’était beau !!! Allons à la Forêt-Noire.', art: pianoArt },
    { tile: 5, text: 'Voici la Forêt-Noire. Autrefois, les Romains avaient peur parce qu’il y fait sombre.', art: blackForestArt },
    { tile: 5, text: 'Ah, ben ils avaient vraiment la frousse, ces Romains ! Hahahaha ! Direction : la Belgique.', art: blackForestArt },

    { tile: 6, text: 'Nous voici en Belgique. Capitale : Bruxelles. Langues principales : français, néerlandais et allemand.', art: flagScene('be', 'Belgique', '#FFF1B8', '#FFFBE6') },
    { tile: 6, text: 'C’est super beau, la Belgique ! Allons maintenant en France.', art: belgiumArt },

    { tile: 7, text: 'Voici la France. Capitale : Paris. Langue principale : français. Monnaie : l’euro.', art: flagScene('fr', 'France', '#D3E2F8', '#FBEDEE') },
    { tile: 7, text: 'Voici le Mont-Blanc. Avec 4 807 mètres d’altitude, c’est le plus haut sommet d’Europe de l’Ouest. On va voir la tour Eiffel.', art: montBlancArt },
    { tile: 7, text: 'Regarde ! C’est la tour Eiffel. Construite par Gustave Eiffel, elle mesure 330 mètres de haut. Direction : l’Espagne.', art: eiffelArt },

    { tile: 8, text: 'Bienvenue en Espagne. Capitale : Madrid. Langue principale : espagnol.', art: flagScene('es', 'Espagne', '#FFE9C7', '#FDF1F1') },
    { tile: 8, text: 'Nous voici à côté de la Sagrada Familia, à Barcelone. C’est beau, la Sagrada Familia.', art: sagradaArt },
    { tile: 8, text: 'J’ai un endroit à vous faire découvrir. Voici la tomatina, qui est un lancer de tomates. Direction : l’Italie.', art: tomatinaArt },

    { tile: 9, text: 'Bienvenue en Italie. Capitale : Rome. Langue principale : italien.', art: flagScene('it', 'Italie', '#D6EFD6', '#FBEDEE') },
    { tile: 9, text: 'L’Italie est un pays en forme de botte.', art: italyBootArt },
    { tile: 9, text: 'Regarde ! Une tour penchée ! C’est la tour de Pise. Elle est penchée parce que pendant sa construction, le sol a bougé.', art: pisaArt },
    { tile: 9, text: 'On a plein de choses à manger venant d’Italie : des pâtes, des glaces et des pizzas.', art: italyFoodArt },
    { tile: 9, text: 'On a inventé la pizza à Naples.', art: pizzaArt },
    { tile: 9, text: 'Voici le Colisée : un amphithéâtre. Direction : la Grèce.', art: colosseumArt },

    { tile: 10, text: 'Bienvenue en Grèce. Capitale : Athènes. Langue principale : grec.', art: flagScene('gr', 'Grèce', '#D3E2F8', '#F1F7FD') },
    { tile: 10, text: 'Voici le Parthénon. Un monument.', art: parthenonArt },
    { tile: 10, text: 'Fin', art: finArt }
  ]
});

/* ---------- Histoire : l'Afrique ---------- */
function starP(cx, cy, R, fill) {
  var pts = [];
  for (var i = 0; i < 10; i++) { var r = i % 2 ? R * 0.382 : R, a = -Math.PI / 2 + i * Math.PI / 5; pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)); }
  return '<polygon points="' + pts.join(' ') + '" fill="' + fill + '"/>';
}
function pentagram(cx, cy, R, stroke, w) {
  var p = [];
  [0, 2, 4, 1, 3].forEach(function (k) { var a = -Math.PI / 2 + k * 2 * Math.PI / 5; p.push((cx + R * Math.cos(a)).toFixed(1) + ',' + (cy + R * Math.sin(a)).toFixed(1)); });
  return '<polygon points="' + p.join(' ') + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '" stroke-linejoin="miter"/>';
}
/* croissant : disque (cx,cy,R) moins disque (cx+d,cy,r), pointes tournées vers la droite */
function crescent(cx, cy, R, d, r, fill) {
  var a = (R * R - r * r + d * d) / (2 * d), h = Math.sqrt(R * R - a * a), large = a > d ? 1 : 0;
  var x = (cx + a).toFixed(2);
  return '<path d="M' + x + ' ' + (cy - h).toFixed(2) + ' A' + R + ' ' + R + ' 0 1 0 ' + x + ' ' + (cy + h).toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x + ' ' + (cy - h).toFixed(2) + 'Z" fill="' + fill + '"/>';
}

FL.tn = [90, 60, '<rect width="90" height="60" fill="#E70013"/><circle cx="45" cy="30" r="17" fill="#fff"/>' + crescent(43, 30, 11, 4, 9, '#E70013') + starP(48.5, 30, 6, '#E70013')];
FL.dz = [90, 60, '<rect width="45" height="60" fill="#006233"/><rect x="45" width="45" height="60" fill="#fff"/>' + crescent(41, 30, 16, 5, 12.8, '#D21034') + starP(51, 30, 8, '#D21034')];
FL.ly = [90, 60, '<rect width="90" height="15" fill="#E70013"/><rect y="15" width="90" height="30" fill="#000"/><rect y="45" width="90" height="15" fill="#239E46"/>' + crescent(42, 30, 9, 3, 7.4, '#fff') + starP(51, 30, 4.6, '#fff')];
FL.lyOld = [90, 60, '<rect width="90" height="60" fill="#006233"/>'];
FL.ma = [90, 60, '<rect width="90" height="60" fill="#C1272D"/>' + pentagram(45, 31, 15, '#006233', 2.6)];
FL.eg = [90, 60, '<rect width="90" height="20" fill="#CE1126"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#000"/>' +
  '<path d="M31 27 Q39 22 45 28 Q51 22 59 27 L57 33 Q51 29 45 34 Q39 29 33 33Z" fill="#C09300"/><rect x="41" y="28" width="8" height="10" rx="1.5" fill="#fff" stroke="#C09300" stroke-width="1.5"/><path d="M41 31 H49 M41 34 H49" stroke="#CE1126" stroke-width="1"/><path d="M42 40 H48" stroke="#C09300" stroke-width="2"/>'];
FL.et = [90, 60, '<rect width="90" height="20" fill="#078930"/><rect y="20" width="90" height="20" fill="#FCDD09"/><rect y="40" width="90" height="20" fill="#DA121A"/><circle cx="45" cy="30" r="12" fill="#0F47AF"/>' + starP(45, 30, 9, '#FCDD09')];
FL.gm = [90, 60, '<rect width="90" height="20" fill="#CE1126"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="23.3" width="90" height="13.4" fill="#0C1C8C"/><rect y="40" width="90" height="20" fill="#3A7728"/>'];
FL.sn = [90, 60, '<rect width="30" height="60" fill="#00853F"/><rect x="30" width="30" height="60" fill="#FDEF42"/><rect x="60" width="30" height="60" fill="#E31B23"/>' + starP(45, 31, 10, '#00853F')];
FL.lr = [90, 60, (function () { var s = ''; for (var i = 0; i < 11; i++) s += '<rect y="' + (i * 60 / 11).toFixed(2) + '" width="90" height="' + (60 / 11 + .05).toFixed(2) + '" fill="' + (i % 2 ? '#fff' : '#BF0A30') + '"/>'; return s; })() + '<rect width="30" height="27.3" fill="#002868"/>' + starP(15, 14, 9, '#fff')];
FL.bf = [90, 60, '<rect width="90" height="30" fill="#EF2B2D"/><rect y="30" width="90" height="30" fill="#009E49"/>' + starP(45, 31, 13, '#FCD116')];
FL.za = [90, 60, '<rect width="90" height="30" fill="#E03C31"/><rect y="30" width="90" height="30" fill="#001489"/>' +
  '<path d="M0 0 L38 30 L0 60 M38 30 H90" fill="none" stroke="#fff" stroke-width="22"/><path d="M0 0 L38 30 L0 60 M38 30 H90" fill="none" stroke="#007749" stroke-width="12"/>' +
  '<path d="M0 0 L33 30 L0 60Z" fill="#FFB81C"/><path d="M0 7 L22 30 L0 53Z" fill="#000"/>'];

/* éléments Afrique */
var AFR_D = 'M128 62 L170 52 L215 46 L252 62 L290 68 L320 74 L336 100 L350 128 L384 158 L362 182 L346 214 L322 250 L292 276 L262 288 L236 266 L226 232 L214 200 L198 176 L160 168 L122 156 L90 134 L76 104 L96 76Z';
function pin(x, y, txt, tx, ty) {
  return it('<path d="M' + x + ' ' + y + ' q-12 -17 -12 -28 a12 12 0 1 1 24 0 q0 11 -12 28z" fill="#E63946" stroke="#fff" stroke-width="2.5"/><circle cx="' + x + '" cy="' + (y - 28) + '" r="4.6" fill="#fff"/>' +
    '<rect x="' + (tx - 40) + '" y="' + (ty - 20) + '" width="80" height="28" rx="14" fill="#14284B"/>' + label(tx, ty, txt, 18, '#fff'));
}
function africaBase(extra) {
  return [it(waves(30, '#fff', .45) + waves(285, '#fff', .45)), it('<path d="' + AFR_D + '" fill="#F4C76A" stroke="#C99A3A" stroke-width="4" stroke-linejoin="round"/>')].concat(extra || []);
}
function introArt() {
  return scene('L’Europe au nord, l’Afrique au sud', grad('#5FB3E8', '#BFE3F7'), africaBase([
    it('<path d="M18 8 Q80 -2 170 12 L214 20 L196 36 L100 38 Q40 40 18 26Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3"/>' + label(100, 30, 'Europe', 16, '#fff')),
    it(label(230, 140, 'Afrique', 40, '#7A4A12')),
    stars([[330, 30, 3], [60, 90, 2.5], [40, 220, 2.5], [360, 260, 3]]).replace(/#FFF3B0/g, '#fff')
  ]));
}
function tunisiaMapArt() {
  return scene('Tunis, au nord de l’Afrique', grad('#5FB3E8', '#BFE3F7'), africaBase([pin(226, 58, 'Tunis', 300, 40)]));
}
function mosqueNightArt() {
  var lit = ''; for (var i = 0; i < 6; i++) lit += '<rect x="' + (84 + i * 36) + '" y="236" width="12" height="22" rx="6" fill="#FFE08A"/>';
  return scene('Une lune et une étoile au-dessus d’une mosquée', grad('#17284F', '#3B3F7E'), [
    stars([[40, 40, 3], [120, 90, 2.5], [200, 30, 3], [60, 150, 2], [380, 150, 2.5]]),
    it(crescent(300, 86, 40, 13, 33, '#FFF1B8')),
    it(starP(362, 70, 16, '#FFF1B8')),
    it('<rect x="50" y="130" width="22" height="140" fill="#0E1A33"/><path d="M46 132 Q61 96 76 132Z" fill="#0E1A33"/><rect x="58" y="86" width="6" height="14" fill="#0E1A33"/>' +
      '<rect x="40" y="226" width="270" height="44" fill="#0E1A33"/><path d="M100 226 A50 50 0 0 1 200 226Z" fill="#0E1A33"/><rect x="146" y="164" width="8" height="14" fill="#0E1A33"/><path d="M110 226 A40 40 0 0 1 190 226" fill="none" stroke="#243A6B" stroke-width="3"/>' +
      '<path d="M222 226 A24 24 0 0 1 270 226Z" fill="#0E1A33"/>'),
    it(lit)
  ]);
}
function libyaFlagsArt() {
  return scene('Le drapeau libyen avant et maintenant', grad('#FFF1CC', '#FFFAEB'), [
    it(flagArt('lyOld', 24, 62, 160)), it(label(104, 214, 'Avant', 30)),
    it('<path d="M190 116 H212 M204 108 L212 116 L204 124" fill="none" stroke="#14284B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'),
    it(flagArt('ly', 216, 62, 160)), it(label(296, 214, 'Maintenant', 30))
  ]);
}
function camel(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-36 -46 Q-54 -42 -52 -22" fill="none" stroke="#B97F3C" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="-30" y="-30" width="8" height="30" rx="3" fill="#B97F3C"/><rect x="-12" y="-30" width="8" height="30" rx="3" fill="#C98D45"/><rect x="14" y="-30" width="8" height="30" rx="3" fill="#B97F3C"/><rect x="28" y="-30" width="8" height="30" rx="3" fill="#C98D45"/>' +
    '<ellipse cx="0" cy="-46" rx="40" ry="19" fill="#D9A25B"/><path d="M-16 -58 Q-6 -88 10 -58Z" fill="#D9A25B"/>' +
    '<path d="M30 -52 Q44 -66 46 -88" fill="none" stroke="#D9A25B" stroke-width="12" stroke-linecap="round"/>' +
    '<ellipse cx="53" cy="-92" rx="15" ry="8.5" fill="#D9A25B" transform="rotate(-8 53 -92)"/><circle cx="50" cy="-96" r="2.6" fill="#14284B"/><path d="M60 -88 q4 2 8 -1" fill="none" stroke="#7A4A12" stroke-width="2" stroke-linecap="round"/><ellipse cx="42" cy="-100" rx="3" ry="5" fill="#B97F3C"/></g>';
}
function penguin(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse cx="-9" cy="-1" rx="8" ry="3.5" fill="#FF9F1C"/><ellipse cx="9" cy="-1" rx="8" ry="3.5" fill="#FF9F1C"/>' +
    '<ellipse cx="0" cy="-26" rx="17" ry="26" fill="#14284B"/><ellipse cx="0" cy="-22" rx="10.5" ry="19" fill="#fff"/><path d="M-17 -30 Q-26 -20 -20 -10Z M17 -30 Q26 -20 20 -10Z" fill="#14284B"/>' +
    '<circle cx="-5.5" cy="-42" r="3.4" fill="#fff"/><circle cx="5.5" cy="-42" r="3.4" fill="#fff"/><circle cx="-5" cy="-42" r="1.6" fill="#14284B"/><circle cx="6" cy="-42" r="1.6" fill="#14284B"/><path d="M-4 -37 L4 -37 L0 -31Z" fill="#FF9F1C"/></g>';
}
function dunes() {
  return '<path d="M0 214 Q90 160 190 210 T400 190 V300 H0Z" fill="#F2B867"/><path d="M0 250 Q110 206 230 246 T400 232 V300 H0Z" fill="#E8A24F"/><path d="M0 282 Q130 256 250 280 T400 270 V300 H0Z" fill="#D98F3E"/>';
}
function saharaArt() {
  return scene('Le désert du Sahara', grad('#FFD8A8', '#FFF0D2'), [
    sun(320, 70, 30, '#FF9F1C'), it(label(120, 52, 'Sahara', 38, '#8A4B12')),
    it(dunes()), camel(112, 252, 1.05), camel(250, 266, .8)
  ]);
}
function podiumArt() {
  return scene('Le Sahara est le plus grand désert chaud', grad('#BFE3F7', '#EAF6FB'), [
    it('<rect x="20" y="110" width="110" height="150" rx="10" fill="#CFE8FA" stroke="#14284B" stroke-width="3"/>' + label(75, 190, '1', 64)),
    it('<rect x="145" y="135" width="110" height="125" rx="10" fill="#E6F3FB" stroke="#14284B" stroke-width="3"/>' + label(200, 210, '2', 56)),
    it('<rect x="270" y="160" width="110" height="100" rx="10" fill="#F2C27A" stroke="#14284B" stroke-width="3"/>' + label(325, 232, '3', 52)),
    it(penguin(75, 112, 1)), it('<path d="M170 135 L200 92 L230 135Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>'), it(camel(325, 162, .56)),
    it(label(75, 288, 'Antarctique', 17)), it(label(200, 288, 'Arctique', 17)), it(label(325, 288, 'Sahara', 17))
  ]);
}
function palm(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 Q6 -40 -2 -80" fill="none" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><g transform="translate(-2 -80)" fill="#2F9E4F"><path d="M0 0 Q-30 -26 -54 -8 Q-28 -12 0 0Z"/><path d="M0 0 Q30 -26 54 -8 Q28 -12 0 0Z"/><path d="M0 0 Q-24 -40 -42 -34 Q-18 -28 0 0Z"/><path d="M0 0 Q24 -40 42 -34 Q18 -28 0 0Z"/><path d="M0 0 Q0 -36 6 -46 Q8 -22 0 0Z"/></g></g>');
}
function pyramid(ax, ay, w, h) {
  var by = ay + h, l = ax - w / 2, r = ax + w / 2, m = ax + w * .14;
  return '<path d="M' + ax + ' ' + ay + ' L' + l + ' ' + by + ' L' + m + ' ' + by + 'Z" fill="#EBC477"/><path d="M' + ax + ' ' + ay + ' L' + m + ' ' + by + ' L' + r + ' ' + by + 'Z" fill="#C99A47"/>';
}
function felucca(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-44 0 Q0 16 44 0 L36 -10 Q0 2 -36 -10Z" fill="#8A5A2B"/><rect x="-2" y="-62" width="4" height="54" fill="#5A3B1E"/><path d="M2 -62 L40 -14 H2Z" fill="#fff" stroke="#14284B" stroke-width="2.5" stroke-linejoin="round"/></g>');
}
function pyramidsArt() {
  return scene('Les pyramides de Gizeh au bord du Nil', grad('#9ED8F5', '#FFE9C7'), [
    sun(60, 56, 24, '#FFD23F'),
    it('<rect y="196" width="400" height="104" fill="#F2D08A"/>'),
    it(pyramid(236, 60, 190, 140) + pyramid(130, 112, 120, 88) + pyramid(330, 130, 100, 70)),
    it('<path d="M0 238 Q100 220 200 242 T400 236 V300 H0Z" fill="#3E9BD8"/>' + waves(262, '#fff', .6) + waves(286, '#fff', .4)),
    palm(34, 250, .8), palm(372, 246, .7), felucca(190, 266, 1)
  ]);
}
function croc(x, y, s) {
  var teeth = '';
  for (var i = 0; i < 6; i++) teeth += '<path d="M' + (56 + i * 10) + ' -4 l4 8 l4 -8Z" fill="#fff"/><path d="M' + (56 + i * 10) + ' 8 l4 -8 l4 8Z" fill="#fff"/>';
  var bumps = ''; for (var j = 0; j < 7; j++) bumps += '<path d="M' + (-50 + j * 14) + ' -22 l6 -10 l6 10Z" fill="#3F7A2A"/>';
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-100 6 Q-70 -20 -40 -14 L-40 6Z" fill="#5E9B3A"/><ellipse cx="-8" cy="-8" rx="58" ry="17" fill="#5E9B3A"/>' + bumps +
    '<path d="M36 -16 L118 -12 Q124 -6 118 -2 L40 -2Z" fill="#6DAE45"/><path d="M40 4 L116 8 Q122 14 116 20 L42 16Z" fill="#6DAE45"/><path d="M42 -2 L118 -2 L116 8 L40 4Z" fill="#B3242C"/>' + teeth +
    '<circle cx="48" cy="-22" r="7" fill="#fff"/><circle cx="50" cy="-22" r="3" fill="#14284B"/></g>');
}
function nileCrocArt() {
  return scene('Un crocodile dans le Nil', grad('#BFE3F7', '#F3F9E2'), [
    sun(330, 50, 22, '#FFD23F'),
    it('<rect y="120" width="400" height="180" fill="#3E9BD8"/>' + waves(150, '#fff', .5) + waves(290, '#fff', .3)),
    it('<path d="M30 180 V110 M44 182 V92 M58 180 V118 M352 190 V116 M366 192 V98" stroke="#5D8F44" stroke-width="6" stroke-linecap="round"/>'),
    croc(190, 220, 1.25),
    it('<ellipse cx="86" cy="62" rx="52" ry="24" fill="#fff" stroke="#14284B" stroke-width="3"/><path d="M110 82 l10 14 l-2 -18Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>' + label(86, 70, 'Aaah !', 24))
  ]);
}
function tombArt() {
  return scene('À l’intérieur d’une pyramide', grad('#9ED8F5', '#FFE9C7'), [
    it('<rect y="262" width="400" height="38" fill="#F2D08A"/>'),
    it('<path d="M200 28 L48 262 L352 262Z" fill="#EBC477" stroke="#B88A3C" stroke-width="4" stroke-linejoin="round"/><path d="M200 28 L248 262 L352 262Z" fill="#C99A47" opacity=".55"/>'),
    it('<rect x="132" y="170" width="136" height="72" rx="14" fill="#3B2A1A"/>'),
    it('<g transform="translate(200 206)"><rect x="-44" y="-18" width="88" height="34" rx="14" fill="#FFC93C" stroke="#C9971A" stroke-width="3"/><path d="M-30 -18 V16 M-14 -18 V16 M2 -18 V16 M18 -18 V16" stroke="#2E5EAA" stroke-width="4"/><circle cx="-30" cy="-2" r="12" fill="#FFD966" stroke="#C9971A" stroke-width="3"/><circle cx="-33" cy="-5" r="2" fill="#14284B"/><circle cx="-27" cy="-5" r="2" fill="#14284B"/></g>'),
    it(label(200, 142, 'Pharaon', 26, '#14284B')),
    stars([[96, 60, 3], [310, 80, 3], [60, 130, 2.5]])
  ]);
}
function calendarArt() {
  var cells = [], cols = ['#078930', '#FCDD09', '#DA121A'];
  for (var i = 0; i < 13; i++) {
    var row = i < 7 ? 0 : 1, col = i < 7 ? i : i - 7, x = 38 + col * 48, y = 100 + row * 80, c = i === 12 ? '#4D96FF' : cols[i % 3], tc = (c === '#FCDD09') ? '#14284B' : '#fff';
    cells.push(it('<rect x="' + x + '" y="' + y + '" width="42" height="64" rx="9" fill="' + c + '" stroke="#14284B" stroke-width="2.5"/>' + label(x + 21, y + 42, String(i + 1), 26, tc)));
  }
  return scene('Treize mois dans le calendrier éthiopien', grad('#FFF1CC', '#FFFAEB'), [
    it('<rect x="22" y="22" width="356" height="256" rx="22" fill="#fff" stroke="#14284B" stroke-width="3"/><rect x="22" y="22" width="356" height="56" rx="22" fill="#FCDD09" stroke="#14284B" stroke-width="3"/>' + label(200, 62, '13 mois', 32))
  ].concat(cells));
}
function yearsArt() {
  function card(x, code, name, year, sub) {
    return it('<rect x="' + x + '" y="40" width="160" height="218" rx="20" fill="#fff" stroke="#14284B" stroke-width="3"/>' + flagArt(code, x + 34, 58, 84) + label(x + 80, 168, year, 54) + label(x + 80, 214, name, 26));
  }
  return scene('2026 en France, 2019 en Éthiopie', grad('#D9ECFA', '#F2F9FE'), [
    card(24, 'fr', 'France', '2026', 'calendrier de chez nous'), card(216, 'et', 'Éthiopie', '2019', 'calendrier éthiopien'),
    it('<path d="M188 150 H212" stroke="#14284B" stroke-width="5" stroke-linecap="round"/><path d="M188 138 H212" stroke="#14284B" stroke-width="5" stroke-linecap="round"/>')
  ]);
}
function senegalLand() { return 'M96 60 Q200 36 330 66 Q392 140 352 232 Q222 262 112 242 Q76 152 96 60Z'; }
function gambiaStrip() { return 'M88 150 Q130 138 172 152 T262 150 T346 156'; }
function gambiaMapArt() {
  return scene('La Gambie, un petit trait entouré par le Sénégal', grad('#5FB3E8', '#9FD4F2'), [
    it(waves(40, '#fff', .5) + waves(270, '#fff', .5)),
    it('<path d="' + senegalLand() + '" fill="#CBE79A" stroke="#6FA33A" stroke-width="4" stroke-linejoin="round"/>'),
    it(label(220, 108, 'Sénégal', 30, '#3E6B1E') + label(220, 222, 'Sénégal', 30, '#3E6B1E')),
    it('<path d="' + gambiaStrip() + '" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round"/><path d="' + gambiaStrip() + '" fill="none" stroke="#E63946" stroke-width="11" stroke-linecap="round"/>'),
    it('<rect x="150" y="164" width="140" height="28" rx="14" fill="#E63946"/>' + label(220, 184, 'Gambie', 20, '#fff'))
  ]);
}
function pirogue(x, y, s, c1, c2) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-54 -10 Q0 20 54 -10 L48 -24 Q0 -2 -48 -24Z" fill="' + c1 + '" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M-46 -14 Q0 8 46 -14" fill="none" stroke="' + c2 + '" stroke-width="6"/><rect x="-1" y="-60" width="3" height="40" fill="#14284B"/><path d="M2 -60 l22 8 l-22 8Z" fill="' + c2 + '"/></g>');
}
function pirogueArt() {
  return scene('Des pirogues colorées sur la mer', grad('#FFD8A8', '#FFF0D2'), [
    sun(70, 70, 28, '#FF9F1C'),
    it('<rect y="130" width="400" height="110" fill="#3E9BD8"/>' + waves(160, '#fff', .55) + waves(200, '#fff', .4)),
    it('<path d="M0 232 Q120 214 240 234 T400 226 V300 H0Z" fill="#F2D08A"/>'),
    pirogue(110, 238, 1, '#E63946', '#FFD23F'), pirogue(250, 258, 1.05, '#2A9D8F', '#FF9F1C'), pirogue(330, 196, .7, '#FFD23F', '#E63946'),
    palm(372, 262, .85)
  ]);
}
function dakarRoadArt() {
  var hw = 'M104 146 Q150 108 212 122 Q270 136 306 166';
  function city(x, y, name, tx, ty, anchor) { return it('<circle cx="' + x + '" cy="' + y + '" r="8" fill="#E63946" stroke="#fff" stroke-width="3"/><text x="' + tx + '" y="' + ty + '" text-anchor="' + (anchor || 'middle') + '" ' + FONT + ' font-size="17" fill="#14284B">' + name + '</text>'); }
  return scene('Une autoroute entre Dakar, Pikine, Guédiawaye et Rufisque', grad('#5FB3E8', '#9FD4F2'), [
    it(waves(40, '#fff', .45) + waves(280, '#fff', .45)),
    it('<path d="M70 150 Q80 108 130 98 L400 76 V250 L140 220 Q80 204 70 150Z" fill="#CBE79A" stroke="#6FA33A" stroke-width="4" stroke-linejoin="round"/>'),
    it('<path d="' + hw + '" fill="none" stroke="#5B6472" stroke-width="12" stroke-linecap="round"/><path d="' + hw + '" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="8 8"/>'),
    city(104, 146, 'Dakar', 104, 182), city(172, 168, 'Pikine', 172, 202), city(208, 124, 'Guédiawaye', 208, 98), city(306, 166, 'Rufisque', 306, 200)
  ]);
}
function dakarWestArt() {
  return scene('Dakar, sur la côte du Sénégal, presque sur la mer', grad('#5FB3E8', '#9FD4F2'), [
    it(waves(40, '#fff', .5) + waves(270, '#fff', .5)),
    it('<path d="' + senegalLand() + '" fill="#CBE79A" stroke="#6FA33A" stroke-width="4" stroke-linejoin="round"/>'),
    it(label(240, 150, 'Sénégal', 32, '#3E6B1E')),
    pin(108, 136, 'Dakar', 176, 96),
    it(label(46, 150, 'Mer', 20, '#fff'))
  ]);
}
function capVertArt() {
  var isl = [[60, 90, 18], [112, 124, 22], [170, 86, 14], [226, 140, 20], [280, 100, 16], [84, 196, 24], [160, 218, 18], [236, 230, 22], [310, 190, 16], [340, 262, 14]], g = '';
  isl.forEach(function (o) { g += '<ellipse cx="' + o[0] + '" cy="' + o[1] + '" rx="' + o[2] + '" ry="' + (o[2] * .7).toFixed(1) + '" fill="#C99A5B" stroke="#8A6B3A" stroke-width="3"/><ellipse cx="' + o[0] + '" cy="' + (o[1] - 3) + '" rx="' + (o[2] * .6).toFixed(1) + '" ry="' + (o[2] * .35).toFixed(1) + '" fill="#6DBB5A"/>'; });
  return scene('Les îles du Cap-Vert dans l’océan', grad('#35B0E6', '#0B6AA8'), [
    it(waves(60, '#fff', .45) + waves(160, '#fff', .35) + waves(260, '#fff', .35)),
    it(g), it(label(330, 52, 'Cap-Vert', 30, '#fff')),
    it('<g transform="translate(300 142)"><path d="M-30 0 Q0 14 30 0 L24 -10 Q0 2 -24 -10Z" fill="#E63946"/><rect x="-1" y="-40" width="3" height="32" fill="#14284B"/><path d="M2 -40 l20 8 l-20 8Z" fill="#fff"/></g>')
  ]);
}
function liberiaArt() {
  function blob(x, y, w, h, c, name, fs) { return it('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="26" fill="' + c + '" stroke="#14284B" stroke-width="3"/>' + label(x + w / 2, y + h / 2 + 7, name, fs || 20)); }
  return scene('Le Libéria et ses voisins', grad('#5FB3E8', '#9FD4F2'), [
    it(waves(268, '#fff', .5) + waves(40, '#fff', .35)),
    blob(24, 52, 130, 90, '#F4A261', 'Sierra Leone', 19), blob(168, 24, 170, 86, '#9BD38A', 'Guinée', 24),
    blob(284, 124, 112, 130, '#FFD23F', 'Côte d’Ivoire', 15),
    it('<rect x="130" y="140" width="150" height="104" rx="26" fill="#fff" stroke="#BF0A30" stroke-width="5"/><rect x="146" y="156" width="118" height="12" rx="6" fill="#BF0A30"/><rect x="146" y="216" width="118" height="12" rx="6" fill="#BF0A30"/>' + label(205, 200, 'Libéria', 26, '#002868'))
  ]);
}
function baobab(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-30 0 Q-22 -50 -14 -88 L14 -88 Q22 -50 30 0Z" fill="#9A6B42"/><path d="M-12 -86 L-34 -112 M12 -86 L34 -112 M0 -88 V-118" stroke="#9A6B42" stroke-width="7" stroke-linecap="round"/><g fill="#4C9A3F"><circle cx="-36" cy="-118" r="17"/><circle cx="0" cy="-130" r="21"/><circle cx="36" cy="-118" r="17"/><circle cx="-14" cy="-110" r="14"/><circle cx="16" cy="-110" r="14"/></g></g>');
}
function burkinaArt() {
  return scene('Burkina Faso, ou simplement Burkina', grad('#FFD8A8', '#FFF0D2'), [
    sun(330, 62, 26, '#FF9F1C'),
    it('<path d="M0 240 Q120 220 240 240 T400 232 V300 H0Z" fill="#E5B466"/>'),
    baobab(72, 252, 1),
    it('<rect x="214" y="124" width="12" height="140" rx="4" fill="#8A5A2B"/>'),
    it('<rect x="150" y="96" width="196" height="40" rx="10" fill="#FFD23F" stroke="#14284B" stroke-width="3" transform="rotate(-3 248 116)"/><g transform="rotate(-3 248 116)">' + label(248, 124, 'Burkina Faso', 23) + '</g>'),
    it('<rect x="160" y="150" width="150" height="40" rx="10" fill="#fff" stroke="#14284B" stroke-width="3" transform="rotate(3 235 170)"/><g transform="rotate(3 235 170)">' + label(235, 178, 'Burkina', 24) + '</g>'),
    it(flagArt('bf', 262, 196, 70))
  ]);
}
function acacia(x, y, s) {
  return it('<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 Q-4 -40 -16 -70 M-2 -36 Q10 -56 26 -76" fill="none" stroke="#6B4A2B" stroke-width="8" stroke-linecap="round"/><ellipse cx="4" cy="-84" rx="58" ry="18" fill="#3C9A4A"/><ellipse cx="24" cy="-98" rx="36" ry="14" fill="#4FB35A"/></g>');
}
function lion(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-44 -36 Q-68 -40 -64 -14" fill="none" stroke="#D9A25B" stroke-width="5" stroke-linecap="round"/><circle cx="-64" cy="-12" r="6" fill="#8A4B12"/>' +
    '<rect x="-34" y="-28" width="10" height="28" rx="4" fill="#E0A95A"/><rect x="-14" y="-28" width="10" height="28" rx="4" fill="#D29A4C"/><rect x="14" y="-28" width="10" height="28" rx="4" fill="#E0A95A"/><rect x="30" y="-28" width="10" height="28" rx="4" fill="#D29A4C"/>' +
    '<ellipse cx="-4" cy="-38" rx="42" ry="22" fill="#E8B060"/><circle cx="40" cy="-52" r="28" fill="#A9621F"/><circle cx="30" cy="-74" r="7" fill="#F0C070"/><circle cx="58" cy="-74" r="7" fill="#F0C070"/><circle cx="44" cy="-50" r="18" fill="#F0C070"/>' +
    '<circle cx="38" cy="-54" r="2.8" fill="#14284B"/><circle cx="52" cy="-54" r="2.8" fill="#14284B"/><path d="M41 -48 H49 L45 -43Z" fill="#5A2D0C"/><path d="M45 -43 v5 M45 -38 q-5 4 -9 1 M45 -38 q5 4 9 1" fill="none" stroke="#14284B" stroke-width="2" stroke-linecap="round"/></g>';
}
function elephant(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-54 -64 Q-68 -54 -62 -30" fill="none" stroke="#8994A1" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="-42" y="-36" width="16" height="36" rx="6" fill="#8994A1"/><rect x="-20" y="-36" width="16" height="36" rx="6" fill="#7F8995"/><rect x="8" y="-36" width="16" height="36" rx="6" fill="#8994A1"/><rect x="28" y="-36" width="16" height="36" rx="6" fill="#7F8995"/>' +
    '<ellipse cx="-6" cy="-56" rx="50" ry="36" fill="#9AA5B1"/><circle cx="50" cy="-66" r="26" fill="#9AA5B1"/><ellipse cx="32" cy="-62" rx="16" ry="24" fill="#8994A1"/><ellipse cx="32" cy="-62" rx="9" ry="16" fill="#C9AFAF"/>' +
    '<path d="M66 -58 Q88 -50 85 -18 Q84 -8 74 -10" fill="none" stroke="#9AA5B1" stroke-width="13" stroke-linecap="round"/><path d="M64 -48 q14 4 20 16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="58" cy="-74" r="3.2" fill="#14284B"/></g>';
}
function rhino(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-48 -46 Q-60 -42 -58 -26" fill="none" stroke="#7C8491" stroke-width="4" stroke-linecap="round"/>' +
    '<rect x="-34" y="-26" width="14" height="26" rx="5" fill="#7C8491"/><rect x="-14" y="-26" width="14" height="26" rx="5" fill="#6E7683"/><rect x="14" y="-26" width="14" height="26" rx="5" fill="#7C8491"/><rect x="30" y="-26" width="14" height="26" rx="5" fill="#6E7683"/>' +
    '<ellipse cx="-4" cy="-42" rx="46" ry="28" fill="#8E96A3"/><ellipse cx="56" cy="-44" rx="26" ry="18" fill="#8E96A3" transform="rotate(20 56 -44)"/>' +
    '<path d="M66 -58 L80 -90 L84 -54Z" fill="#EADBC0"/><path d="M50 -60 L55 -76 L61 -58Z" fill="#EADBC0"/><ellipse cx="36" cy="-68" rx="6" ry="9" fill="#7C8491"/><circle cx="64" cy="-46" r="2.8" fill="#14284B"/></g>';
}
function buffalo(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-44 -46 Q-56 -40 -54 -24" fill="none" stroke="#3F2A1D" stroke-width="4" stroke-linecap="round"/>' +
    '<rect x="-30" y="-26" width="12" height="26" rx="4" fill="#3F2A1D"/><rect x="-12" y="-26" width="12" height="26" rx="4" fill="#33211A"/><rect x="14" y="-26" width="12" height="26" rx="4" fill="#3F2A1D"/><rect x="28" y="-26" width="12" height="26" rx="4" fill="#33211A"/>' +
    '<ellipse cx="0" cy="-42" rx="44" ry="28" fill="#5A3E2B"/><ellipse cx="46" cy="-30" rx="20" ry="16" fill="#3F2A1D"/><ellipse cx="62" cy="-22" rx="10" ry="9" fill="#6B4A33"/>' +
    '<path d="M36 -40 Q18 -66 42 -62 Q56 -58 60 -44" fill="none" stroke="#EADBC0" stroke-width="6" stroke-linecap="round"/><circle cx="52" cy="-34" r="2.6" fill="#fff"/></g>';
}
function lionArt() {
  return scene('Un lion dans la savane sud-africaine', grad('#FFD8A8', '#FFF0D2'), [
    sun(330, 66, 28, '#FF9F1C'),
    it('<path d="M0 232 Q120 212 240 234 T400 226 V300 H0Z" fill="#E5B466"/><path d="M0 268 Q140 248 260 268 T400 262 V300 H0Z" fill="#D49A48"/>'),
    acacia(80, 244, 1), it(lion(236, 262, 1.4))
  ]);
}
function safariArt() {
  return scene('Lions, buffles, éléphants et rhinocéros', grad('#FFD8A8', '#FFF0D2'), [
    sun(344, 56, 24, '#FF9F1C'),
    it('<path d="M0 214 Q120 196 240 216 T400 208 V300 H0Z" fill="#E5B466"/><path d="M0 258 Q140 240 260 258 T400 252 V300 H0Z" fill="#D49A48"/>'),
    it(buffalo(150, 238, .66)), it(rhino(336, 242, .66)),
    it(lion(72, 290, .8)), it(elephant(236, 292, .8))
  ]);
}
function finAfArt() {
  var codes = ['tn', 'dz', 'ly', 'ma', 'eg', 'et', 'gm', 'sn', 'lr', 'bf', 'za'], out = [];
  codes.forEach(function (c, i) {
    var row = i < 6 ? 0 : 1, col = i < 6 ? i : i - 6, w = 56;
    var x = (row ? 44 : 12) + col * 64, y = row ? 196 : 112;
    out.push(it('<rect x="' + (x + w / 2 - 2) + '" y="' + (y - 14) + '" width="4" height="14" fill="#8A6B4A"/>' + flagArt(c, x, y, w)));
  });
  return scene('Tous les drapeaux visités', grad('#FFE3B0', '#FFF5DC'), [it(label(200, 84, 'Fin', 64)), it('<path d="M0 98 H400 M0 182 H400" stroke="#14284B" stroke-width="3"/>')].concat(out));
}
function coverAfArt() {
  var cs = [['tn', 30, 36, -8], ['eg', 150, 28, 5], ['za', 270, 40, -5], ['ma', 36, 150, 6], ['sn', 156, 160, -6], ['et', 276, 148, 8]], g = '';
  cs.forEach(function (c) { g += '<g transform="rotate(' + c[3] + ' ' + (c[1] + 50) + ' ' + (c[2] + 33) + ')">' + flagArt(c[0], c[1], c[2], 100) + '</g>'; });
  return scene('Plein de drapeaux d’Afrique', grad('#FF9F1C', '#E8590C'), [sparkle(20, 20, 3), sparkle(380, 270, 3), sparkle(350, 20, 2.5), it(g)]);
}

STORIES.splice(1, 0, {
  title: 'Voyage en Afrique', coverArt: coverAfArt, mark: '?',
  tiles: ['tn', 'dz', 'ly', 'ma', 'eg', 'et', 'gm', 'sn', 'lr', 'bf', 'za'].map(flagTile),
  scenes: [
    { tile: -1, text: 'C’était bien, l’Europe, hein ? Oh oui, mais maintenant, c’est l’Afrique !!!', art: introArt },

    { tile: 0, text: 'Bienvenue en Tunisie. Capitale : Tunis.', art: flagScene('tn', 'Tunisie', '#F8D5D5', '#FDF1F1') },
    { tile: 0, text: 'Tunis, la capitale, est située au nord de la Tunisie, ce petit pays en Afrique. Prochain pays : l’Algérie.', art: tunisiaMapArt },

    { tile: 1, text: 'Voici l’Algérie. Capitale : Alger.', art: flagScene('dz', 'Algérie', '#D6EFD6', '#F4FBF4') },
    { tile: 1, text: 'L’Algérie a un drapeau avec une lune et une étoile, qui sont les symboles de l’islam. Prochain pays : la Libye.', art: mosqueNightArt },

    { tile: 2, text: 'Ici la Libye. Capitale : Tripoli.', art: flagScene('ly', 'Libye', '#E3E3E8', '#F6F6F9') },
    { tile: 2, text: 'À l’origine, le drapeau libyen était rempli de vert, mais maintenant, il a changé. Prochaine destination : le Maroc.', art: libyaFlagsArt },

    { tile: 3, text: 'Bienvenue au Maroc. Capitale : Rabat.', art: flagScene('ma', 'Maroc', '#F8D5D5', '#FDF1F1') },
    { tile: 3, text: 'On file au Sahara occidental ? D’accord. Regarde ! C’est le désert du Sahara.', art: saharaArt },
    { tile: 3, text: 'Le Sahara est le plus grand désert chaud du monde. Seuls les déserts glacés, l’Antarctique et l’Arctique, sont plus grands. Prochain pays : l’Égypte.', art: podiumArt },

    { tile: 4, text: 'Nous voici en Égypte. Capitale : Le Caire.', art: flagScene('eg', 'Égypte', '#FFE9C7', '#FFF6E4') },
    { tile: 4, text: 'En suivant le Nil, il y a Gizeh. Trop cool ! On va regarder les pyramides de Gizeh, l’une des 7 merveilles du monde.', art: pyramidsArt },
    { tile: 4, text: 'Dans le Nil, on trouve certains crocodiles. Ah… J’ai trop peur…', art: nileCrocArt },
    { tile: 4, text: 'Wow ! Elles servaient à quoi ? À enterrer les pharaons, ou rois d’Égypte, morts. Prochain pays : l’Éthiopie.', art: tombArt },

    { tile: 5, text: 'Voici l’Éthiopie. Capitale : Addis-Abeba.', art: flagScene('et', 'Éthiopie', '#E3F2D3', '#FFF9D6') },
    { tile: 5, text: 'L’Éthiopie a treize mois dans son calendrier.', art: calendarArt },
    { tile: 5, text: 'Ça veut dire que si en France on est en l’année 2026, en Éthiopie il y a environ 7 ans de retard et on est en l’année 2019. Prochain pays : la Gambie.', art: yearsArt },

    { tile: 6, text: 'Ici la Gambie. Capitale : Banjul.', art: flagScene('gm', 'Gambie', '#F8D5D5', '#E4F5E0') },
    { tile: 6, text: 'La Gambie est un petit pays en forme de trait. Ce petit trait est entouré par le Sénégal.', art: gambiaMapArt },
    { tile: 6, text: 'Mais la Gambie touche la mer. Et si on allait… au Sénégal !', art: pirogueArt },

    { tile: 7, text: 'Voici le Sénégal. Capitale : Dakar.', art: flagScene('sn', 'Sénégal', '#D6EFD6', '#FFF6C9') },
    { tile: 7, text: 'Au nord de Dakar, une autoroute appelée Voie de Dégagement Nord prend la sortie de Dakar vers Pikine et Guédiawaye. Elle se termine à Rufisque.', art: dakarRoadArt },
    { tile: 7, text: 'Dakar est située à l’ouest du Sénégal, presque sur la mer.', art: dakarWestArt },
    { tile: 7, text: 'En mer, 10 îles forment le Cap-Vert. On va au Libéria ? Let’s go !', art: capVertArt },

    { tile: 8, text: 'Ici le Libéria. Capitale : Monrovia.', art: flagScene('lr', 'Libéria', '#D3E2F8', '#FBEDEE') },
    { tile: 8, text: 'Le Libéria est à côté de la Sierra Leone, de la Guinée et de la Côte d’Ivoire. Prochain pays : le Burkina Faso.', art: liberiaArt },

    { tile: 9, text: 'Voici le Burkina Faso. Capitale : Ouagadougou.', art: flagScene('bf', 'Burkina Faso', '#F8D5D5', '#D6EFD6') },
    { tile: 9, text: 'Le Burkina Faso est aussi connu sous le nom de Burkina. Prochain pays : l’Afrique du Sud.', art: burkinaArt },

    { tile: 10, text: 'Voici l’Afrique du Sud. Capitale : Pretoria.', art: flagScene('za', 'Afrique du Sud', '#FFE9C7', '#D6EFD6') },
    { tile: 10, text: 'Eh ! Des lions !', art: lionArt },
    { tile: 10, text: 'Lions, buffles, éléphants et rhinocéros y vivent.', art: safariArt },
    { tile: 10, text: 'Fin', art: finAfArt }
  ]
});

/* ---------- Histoire : l'Asie ---------- */
function starRot(cx, cy, R, fill, deg) { return '<g transform="rotate(' + deg.toFixed(1) + ' ' + cx + ' ' + cy + ')">' + starP(cx, cy, R, fill) + '</g>'; }
function branchLeaves(x0, y0, cx, cy, x1, y1, n, color, rx, ry) {
  var s = '';
  for (var i = 1; i < n; i++) {
    var t = i / n, u = 1 - t;
    var x = u * u * x0 + 2 * u * t * cx + t * t * x1, y = u * u * y0 + 2 * u * t * cy + t * t * y1;
    var dx = 2 * u * (cx - x0) + 2 * t * (x1 - cx), dy = 2 * u * (cy - y0) + 2 * t * (y1 - cy);
    var ang = Math.atan2(dy, dx) * 180 / Math.PI, side = i % 2 ? 1 : -1;
    var nx = -dy, ny = dx, len = Math.sqrt(nx * nx + ny * ny) || 1;
    var lx = x + side * ry * nx / len, ly = y + side * ry * ny / len;
    s += '<ellipse cx="' + lx.toFixed(2) + '" cy="' + ly.toFixed(2) + '" rx="' + rx + '" ry="' + ry + '" fill="' + color + '" transform="rotate(' + (ang + side * 35).toFixed(1) + ' ' + lx.toFixed(2) + ' ' + ly.toFixed(2) + ')"/>';
  }
  return s;
}
var CY_ISLAND = 'M18 34 Q20 26 30 24 Q40 20 48 22 Q57 25 63 22 L72 14 L76 16 L70 25 Q67 31 59 33 Q51 37 42 41 Q32 46 24 43 Q17 41 18 34Z';
function cyBranches() {
  return '<path d="M24 42 Q32 54 46 54" fill="none" stroke="#4E5B31" stroke-width="1.5" stroke-linecap="round"/><path d="M66 42 Q58 54 44 54" fill="none" stroke="#4E5B31" stroke-width="1.5" stroke-linecap="round"/>' +
    branchLeaves(24, 42, 32, 54, 46, 54, 7, '#4E5B31', 2.6, 1.1) + branchLeaves(66, 42, 58, 54, 44, 54, 7, '#4E5B31', 2.6, 1.1);
}
FL.cy = [90, 60, '<rect width="90" height="60" fill="#fff"/><path d="' + CY_ISLAND + '" fill="#D57800"/>' + cyBranches()];
FL.tr = [90, 60, '<rect width="90" height="60" fill="#E30A17"/>' + crescent(34, 30, 15, 5, 12, '#fff') + starP(53, 30, 7.5, '#fff')];
FL.ae = [90, 60, '<rect width="90" height="20" fill="#00732F"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#000"/><rect width="22" height="60" fill="#FF0000"/>'];
FL['in'] = [90, 60, '<rect width="90" height="20" fill="#FF9933"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#138808"/><g stroke="#000080" stroke-width=".9">' +
  (function () { var s = ''; for (var i = 0; i < 12; i++) { var a = i * Math.PI / 12; s += '<line x1="' + (45 - 8 * Math.cos(a)).toFixed(2) + '" y1="' + (30 - 8 * Math.sin(a)).toFixed(2) + '" x2="' + (45 + 8 * Math.cos(a)).toFixed(2) + '" y2="' + (30 + 8 * Math.sin(a)).toFixed(2) + '"/>'; } return s; })() +
  '</g><circle cx="45" cy="30" r="8" fill="none" stroke="#000080" stroke-width="1.6"/><circle cx="45" cy="30" r="1.6" fill="#000080"/>'];
FL.np = [60, 72, ''];
FL.cn = [90, 60, '<rect width="90" height="60" fill="#DE2910"/>' + starP(15, 15, 9, '#FFDE00') +
  [[30, 6], [36, 12], [36, 21], [30, 27]].map(function (p) { return starRot(p[0], p[1], 3, '#FFDE00', Math.atan2(15 - p[1], 15 - p[0]) * 180 / Math.PI + 90); }).join('')];
FL.jp = [90, 60, '<rect width="90" height="60" fill="#fff"/><circle cx="45" cy="30" r="18" fill="#BC002D"/>'];
FL.mn = [90, 60, '<rect width="30" height="60" fill="#C4272F"/><rect x="30" width="30" height="60" fill="#015197"/><rect x="60" width="30" height="60" fill="#C4272F"/><g fill="#F9CF02"><path d="M15 6 q-4 5 0 9 q4 -4 0 -9z"/><circle cx="15" cy="20" r="2.6"/><path d="M10.5 26 L19.5 26 L15 34Z"/><path d="M10.5 38 L19.5 38 L15 30Z"/><circle cx="15" cy="45" r="4"/><rect x="5.5" y="8" width="2.4" height="44"/><rect x="22.1" y="8" width="2.4" height="44"/></g>'];
FL.th = [90, 60, '<rect width="90" height="60" fill="#A51931"/><rect y="10" width="90" height="40" fill="#F4F5F8"/><rect y="20" width="90" height="20" fill="#2D2A4A"/>'];
FL.id = [90, 60, '<rect width="90" height="30" fill="#CE1126"/><rect y="30" width="90" height="30" fill="#fff"/>'];
FL.eu = [90, 60, '<rect width="90" height="60" fill="#003399"/>' + (function () { var s = ''; for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; s += starP(45 + 19 * Math.sin(a), 30 - 19 * Math.cos(a), 3.4, '#FFCC00'); } return s; })()];

/* le drapeau du Népal n'est ni carré ni rectangulaire */
var _flagArtBase = flagArt;
flagArt = function (code, x, y, w) {
  if (code !== 'np') return _flagArtBase(code, x, y, w);
  var s = w / 100, d = 'M2 2 L78 58 L36 58 L98 119 L2 119Z', rays = '';
  for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; rays += '<line x1="' + (30 + 9.5 * Math.cos(a)).toFixed(1) + '" y1="' + (92 + 9.5 * Math.sin(a)).toFixed(1) + '" x2="' + (30 + 13.5 * Math.cos(a)).toFixed(1) + '" y2="' + (92 + 13.5 * Math.sin(a)).toFixed(1) + '"/>'; }
  return '<g transform="translate(' + x + ' ' + y + ')"><path transform="translate(6 6) scale(' + s + ')" d="' + d + '" fill="#14284B" opacity=".22"/><g transform="scale(' + s + ')">' +
    '<path d="' + d + '" fill="#DC143C" stroke="#003893" stroke-width="4" stroke-linejoin="miter"/>' +
    '<g transform="rotate(-90 28 40)">' + crescent(28, 40, 9, 3.2, 7.4, '#fff') + '</g><circle cx="28" cy="35" r="2.8" fill="#fff"/>' +
    '<circle cx="30" cy="92" r="7" fill="#fff"/><g stroke="#fff" stroke-width="2.4" stroke-linecap="round">' + rays + '</g></g></g>';
};
function flagSceneA(code, name, c1, c2, fs, pw) {
  var w = code === 'np' ? 140 : 240;
  pw = pw || 220;
  return function () {
    return scene('Drapeau : ' + name, grad(c1, c2), [
      it('<path d="M0 262 Q110 236 220 256 T400 246 V300 H0Z" fill="#fff" opacity=".5"/>'),
      it('<rect x="58" y="36" width="8" height="206" rx="4" fill="#8A6B4A"/><circle cx="62" cy="34" r="7" fill="#FFC93C"/>'),
      it(flagArt(code, 66, 46, w)),
      it('<rect x="' + (200 - pw / 2) + '" y="238" width="' + pw + '" height="44" rx="22" fill="#14284B"/>' + label(200, 269, name, fs || 24, '#fff'))
    ]);
  };
}
function flagTileA(code) {
  if (code !== 'np') return flagTile(code);
  return function () { return '<svg viewBox="0 0 400 300" role="img" aria-label="Drapeau"><rect width="400" height="300" fill="#DCEBFA"/>' + flagArt('np', 146, 34, 112) + '</svg>'; };
}

/* éléments Asie */
var ASIA_D = 'M100 112 L130 84 L170 62 L220 40 L285 44 L340 72 L352 104 L326 128 L304 148 L296 186 L274 218 L256 190 L240 160 L226 190 L208 236 L190 190 L174 162 L140 158 L116 150 L100 138Z';
function asiaBase(extra) {
  return [it(waves(24, '#fff', .45) + waves(288, '#fff', .45)),
    it('<path d="M0 36 L70 28 L92 58 L66 104 L0 112Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3" stroke-linejoin="round"/>' + label(34, 76, 'Europe', 15, '#fff')),
    it('<path d="M0 204 L74 192 L112 232 L88 300 L0 300Z" fill="#E9CF94" stroke="#C99A3A" stroke-width="3" stroke-linejoin="round"/>' + label(46, 266, 'Afrique', 15, '#7A4A12')),
    it('<path d="' + ASIA_D + '" fill="#F28C60" stroke="#C25A2B" stroke-width="4" stroke-linejoin="round"/><ellipse cx="372" cy="98" rx="9" ry="22" fill="#F28C60" stroke="#C25A2B" stroke-width="3" transform="rotate(20 372 98)"/><ellipse cx="270" cy="258" rx="26" ry="9" fill="#F28C60" stroke="#C25A2B" stroke-width="3"/><ellipse cx="318" cy="268" rx="20" ry="8" fill="#F28C60" stroke="#C25A2B" stroke-width="3"/><ellipse cx="354" cy="256" rx="14" ry="8" fill="#F28C60" stroke="#C25A2B" stroke-width="3"/>')].concat(extra || []);
}
function asiaIntroArt() {
  return scene('Après l’Afrique, l’Asie', grad('#5FB3E8', '#BFE3F7'), asiaBase([it(label(222, 118, 'Asie', 46, '#fff')), stars([[330, 20, 3], [60, 150, 2.5], [150, 276, 2.5], [380, 200, 3]]).replace(/#FFF3B0/g, '#fff')]));
}
function cyprusMapArt() {
  return scene('L’île de Chypre, couleur cuivre, au-dessus de branches d’olivier', grad('#CFEAF7', '#F4FAFD'), [
    it('<g transform="translate(-24 -14) scale(4.2)"><path d="' + CY_ISLAND + '" fill="#D57800"/></g>'),
    it('<g transform="translate(-24 6) scale(4.2)">' + cyBranches() + '</g>'),
    it('<circle cx="262" cy="196" r="9" fill="#2F3B1C"/><circle cx="296" cy="214" r="9" fill="#2F3B1C"/><circle cx="104" cy="214" r="9" fill="#2F3B1C"/>'),
    it(waves(26, '#fff', .8) + waves(282, '#fff', .8))
  ]);
}
function nicosiaArt() {
  return scene('Nicosie, entre l’Europe et l’Asie, séparée par la ligne Verte', grad('#8EC5F0', '#F4C76A'), [
    it('<rect width="190" height="300" fill="#8EC5F0"/><rect x="210" width="190" height="300" fill="#F4C76A"/><rect x="190" width="20" height="300" fill="#3FA34D"/><path d="M200 0 V300" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>'),
    it(label(95, 170, 'Europe', 34) + label(305, 170, 'Asie', 34)),
    it('<g transform="rotate(-90 200 236)">' + label(200, 241, 'ligne Verte', 15, '#fff') + '</g>'),
    pin(200, 122, 'Nicosie', 200, 150)
  ]);
}
function chimney(x, y, w, h, c, d) {
  return '<path d="M' + (x - w / 2) + ' ' + y + ' L' + (x - w * .16) + ' ' + (y - h) + ' Q' + x + ' ' + (y - h - 10) + ' ' + (x + w * .16) + ' ' + (y - h) + ' L' + (x + w / 2) + ' ' + y + 'Z" fill="' + c + '"/><path d="M' + (x - w * .16) + ' ' + (y - h) + ' Q' + x + ' ' + (y - h - 10) + ' ' + (x + w * .16) + ' ' + (y - h) + ' L' + (x + w * .1) + ' ' + (y - h + 12) + ' L' + (x - w * .1) + ' ' + (y - h + 12) + 'Z" fill="' + d + '"/>';
}
function balloon(x, y, s, c1, c2) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 C-36 -10 -44 -66 0 -94 C44 -66 36 -10 0 0Z" fill="' + c1 + '"/><path d="M0 0 C-12 -18 -17 -64 0 -94 C17 -64 12 -18 0 0Z" fill="' + c2 + '"/>' +
    '<path d="M-18 -6 L-8 12 M18 -6 L8 12" stroke="#5A3B1E" stroke-width="2"/><rect x="-9" y="12" width="18" height="12" rx="2" fill="#8A5A2B"/></g>';
}
function cappadociaArt() {
  return scene('Des montagnes de montgolfières au-dessus de la Cappadoce', grad('#FFB48A', '#FFE9C7'), [
    sun(70, 120, 30, '#FFE08A'),
    it(balloon(120, 118, 1.1, '#E63946', '#FFD23F') + balloon(250, 80, .9, '#4D96FF', '#fff') + balloon(330, 150, 1, '#2A9D8F', '#FFD23F') + balloon(190, 190, .7, '#FF9F1C', '#E63946')),
    it('<path d="M0 230 Q100 200 200 226 T400 214 V300 H0Z" fill="#D9A57A"/>'),
    it(chimney(60, 262, 44, 70, '#E3B88C', '#B98A5B') + chimney(130, 270, 36, 56, '#E3B88C', '#B98A5B') + chimney(280, 264, 46, 74, '#E3B88C', '#B98A5B') + chimney(350, 272, 36, 52, '#E3B88C', '#B98A5B'))
  ]);
}
function balloonBigArt() {
  return scene('Une montgolfière avec des touristes, en Cappadoce', grad('#FFB48A', '#FFE9C7'), [
    sun(330, 70, 28, '#FFE08A'),
    it('<path d="M0 252 Q100 226 200 250 T400 240 V300 H0Z" fill="#D9A57A"/>' + chimney(60, 280, 44, 60, '#E3B88C', '#B98A5B') + chimney(340, 282, 40, 54, '#E3B88C', '#B98A5B')),
    it(balloon(200, 190, 1.7, '#E63946', '#FFD23F')),
    it('<g transform="translate(200 190) scale(1.7)"><circle cx="-4" cy="8" r="4" fill="#F2C9A0"/><circle cx="5" cy="8" r="4" fill="#C98B5B"/></g>'),
    it('<rect x="116" y="14" width="168" height="38" rx="19" fill="#14284B"/>' + label(200, 41, 'Cappadoce', 24, '#fff'))
  ]);
}
function kebabArt() {
  return scene('Un kebab', grad('#FFE9C7', '#FFF6E4'), [
    it('<rect y="262" width="400" height="38" fill="#E8C898"/>'),
    it('<path d="M104 130 Q190 70 276 130 L252 262 Q190 282 128 262Z" fill="#F2D49B" stroke="#C99A47" stroke-width="3"/><path d="M118 200 Q190 224 266 200 L252 262 Q190 282 128 262Z" fill="#fff" stroke="#14284B" stroke-width="2.5"/><path d="M146 226 L152 262 M178 232 L180 270 M212 232 L212 270 M246 226 L242 262" stroke="#E63946" stroke-width="5" stroke-linecap="round"/>'),
    it('<path d="M118 130 Q130 100 160 108 Q176 90 200 106 Q226 94 246 112 Q268 112 266 134 Q190 150 118 130Z" fill="#6DBB5A"/><path d="M130 142 Q190 162 258 142 L254 170 Q190 190 134 170Z" fill="#8A4B2A"/><circle cx="160" cy="120" r="10" fill="#E63946"/><circle cx="222" cy="120" r="10" fill="#E63946"/>'),
    it('<path d="M326 70 V270" stroke="#9AA5B1" stroke-width="5" stroke-linecap="round"/><g fill="#8A4B2A"><rect x="308" y="96" width="36" height="34" rx="14"/><rect x="308" y="136" width="36" height="34" rx="14" fill="#A8603A"/><rect x="308" y="176" width="36" height="34" rx="14"/></g><circle cx="326" cy="66" r="7" fill="#9AA5B1"/>'),
    it(sparkle(60, 60, 4).replace('#FFF3B0', '#FFC93C') + sparkle(360, 40, 3).replace('#FFF3B0', '#FFC93C'))
  ]);
}
function fullPlateArt() {
  return scene('Une assiette vide et un visage content', grad('#FFE9C7', '#FFF6E4'), [
    it('<rect y="262" width="400" height="38" fill="#E8C898"/>'),
    it('<ellipse cx="120" cy="226" rx="86" ry="26" fill="#fff" stroke="#14284B" stroke-width="3"/><ellipse cx="120" cy="226" rx="56" ry="14" fill="#EEE8DA"/><circle cx="96" cy="224" r="3" fill="#C99A47"/><circle cx="130" cy="230" r="3" fill="#C99A47"/><circle cx="148" cy="222" r="2.5" fill="#8A4B2A"/>'),
    it('<circle cx="272" cy="150" r="76" fill="#FFD23F" stroke="#14284B" stroke-width="3.5"/><path d="M236 138 Q246 124 258 138 M286 138 Q298 124 308 138" fill="none" stroke="#14284B" stroke-width="5" stroke-linecap="round"/><path d="M236 170 Q272 212 308 170Z" fill="#14284B"/><path d="M252 188 Q272 204 292 188 Q272 180 252 188Z" fill="#FF8FA3"/><circle cx="228" cy="164" r="12" fill="#FF8FA3" opacity=".6"/><circle cx="316" cy="164" r="12" fill="#FF8FA3" opacity=".6"/>'),
    it('<ellipse cx="116" cy="70" rx="64" ry="26" fill="#fff" stroke="#14284B" stroke-width="3"/><path d="M146 90 l10 14 l-2 -18Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>' + label(116, 79, 'Miam !', 26))
  ]);
}
function burjArt() {
  var win = '';
  for (var i = 0; i < 9; i++) { var x = 14 + i * 28, h = 40 + (i * 37) % 70; win += '<rect x="' + x + '" y="' + (268 - h) + '" width="22" height="' + h + '" fill="' + (i % 2 ? '#A9BED2' : '#8FA7C2') + '"/>'; }
  return scene('Le Burj Khalifa, la plus haute tour du monde', grad('#7CC4F0', '#FFE9C7'), [
    sun(70, 70, 24, '#FFE08A'), cloud(290, 56, .8),
    it(win),
    it('<path d="M178 270 L186 206 L190 176 L194 140 L197 96 L199 54 L200 14 L201 54 L203 96 L206 140 L210 176 L214 206 L222 270Z" fill="#C9D6E4"/><path d="M200 14 L201 54 L203 96 L206 140 L210 176 L214 206 L222 270 L200 270Z" fill="#A9BED2"/><path d="M188 206 H212 M192 176 H208 M195 140 H205 M197 96 H203" stroke="#fff" stroke-width="3"/>'),
    it('<path d="M246 14 V270" stroke="#14284B" stroke-width="3"/><path d="M238 24 L246 12 L254 24 M238 260 L246 272 L254 260" fill="none" stroke="#14284B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="262" y="120" width="104" height="40" rx="20" fill="#14284B"/>' + label(314, 149, '828 m', 24, '#fff')),
    it('<rect y="268" width="400" height="32" fill="#E9CF94"/>')
  ]);
}
function elevatorArt(num, up) {
  var arrow = up ? 'M200 118 L224 148 H176Z' : 'M200 148 L224 118 H176Z';
  return scene('Un ascenseur : étage ' + num, grad('#D9ECFA', '#F2F9FE'), [
    it('<rect x="96" y="20" width="208" height="262" rx="20" fill="#C8CED6" stroke="#14284B" stroke-width="4"/><rect x="136" y="40" width="128" height="64" rx="10" fill="#14284B"/>' + label(200, 90, num, 48, '#FFD23F')),
    it('<path d="' + arrow + '" fill="#E63946" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>'),
    it('<rect x="122" y="162" width="72" height="104" fill="#EEF1F5" stroke="#14284B" stroke-width="3"/><rect x="206" y="162" width="72" height="104" fill="#EEF1F5" stroke="#14284B" stroke-width="3"/>'),
    it(label(330, 140, 'Dong !', 26).replace('text-anchor="middle"', 'text-anchor="middle" transform="rotate(8 330 140)"'))
  ]);
}
function skyViewArt() {
  var b = '', cs = ['#8FA7C2', '#6F86A8', '#A9BED2'], hs = [120, 80, 150, 100, 70, 140, 90, 110, 60, 130];
  for (var i = 0; i < 10; i++) { var x = 8 + i * 39, h = hs[i]; b += '<rect x="' + x + '" y="' + (290 - h) + '" width="34" height="' + h + '" fill="' + cs[i % 3] + '"/><path d="M' + (x + 8) + ' ' + (290 - h + 8) + ' V288 M' + (x + 18) + ' ' + (290 - h + 8) + ' V288 M' + (x + 28) + ' ' + (290 - h + 8) + ' V288" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="4 6"/>'; }
  return scene('Vue sur les gratte-ciel de Dubaï', grad('#7CC4F0', '#FFE9C7'), [
    sun(330, 60, 26, '#FFE08A'), cloud(40, 70, 1), cloud(200, 110, .8),
    it(b),
    it('<path d="M0 262 Q100 236 200 262 T400 256 V300 H0Z" fill="#fff" opacity=".8"/>'),
    it('<rect x="8" y="8" width="384" height="284" rx="26" fill="none" stroke="#3B4252" stroke-width="16"/><path d="M200 8 V292" stroke="#3B4252" stroke-width="8"/>')
  ]);
}
function person(x, y, c, sk) { return '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + sk + '"/><rect x="' + (x - 6) + '" y="' + (y + 7) + '" width="12" height="16" rx="5" fill="' + c + '"/>'; }
function crowdArt() {
  var cols = ['#E63946', '#4D96FF', '#FFC93C', '#2A9D8F', '#FF9F1C', '#9B5DE5'], sks = ['#F2C9A0', '#C98B5B', '#9A6B42'], g = '';
  for (var j = 0; j < 5; j++) for (var i = 0; i < 9; i++) g += person(40 + i * 40 + (j % 2) * 10, 30 + j * 36, cols[(i + j * 2) % 6], sks[(i * 2 + j) % 3]);
  return scene('Une foule immense : 1,4 milliard d’habitants', grad('#FFE3B0', '#FFF5DC'), [
    it(g), it('<rect x="80" y="226" width="240" height="56" rx="28" fill="#14284B"/>' + label(200, 266, '1,4 milliard', 34, '#fff'))
  ]);
}
function dancer(x, y, s, c1, c2) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-6 -30 L-9 0 M6 -30 L9 0" stroke="#7A4A12" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M-24 -24 Q0 -40 24 -24 L32 -4 Q0 8 -32 -4Z" fill="' + c1 + '"/><rect x="-10" y="-64" width="20" height="40" rx="8" fill="' + c2 + '"/>' +
    '<path d="M-10 -58 L-28 -92 M10 -58 L28 -92" stroke="#C98B5B" stroke-width="5" stroke-linecap="round"/><circle cx="-28" cy="-94" r="4.5" fill="#C98B5B"/><circle cx="28" cy="-94" r="4.5" fill="#C98B5B"/>' +
    '<circle cx="0" cy="-76" r="12" fill="#C98B5B"/><path d="M-13 -78 Q-12 -92 0 -92 Q12 -92 13 -78 Q6 -86 0 -86 Q-6 -86 -13 -78Z" fill="#14284B"/><circle cx="0" cy="-82" r="1.8" fill="#E63946"/></g>';
}
function bollywoodArt() {
  return scene('Des danseurs de Bollywood', grad('#4B1D7A', '#C2185B'), [
    it('<path d="M70 0 L20 260 L120 260Z M200 0 L150 260 L250 260Z M330 0 L280 260 L380 260Z" fill="#FFF3B0" opacity=".18"/>'),
    it('<ellipse cx="200" cy="272" rx="210" ry="30" fill="#2B0F4A"/>'),
    it('<rect x="86" y="14" width="228" height="52" rx="16" fill="#FFD23F" stroke="#14284B" stroke-width="3"/>' + label(200, 51, 'Bollywood', 32)),
    it(dancer(90, 262, 1.2, '#FF9F1C', '#E63946') + dancer(200, 262, 1.3, '#2A9D8F', '#FFD23F') + dancer(310, 262, 1.2, '#4D96FF', '#FF8FA3')),
    stars([[40, 90, 3], [360, 100, 3], [150, 120, 2.5], [260, 100, 2.5]])
  ]);
}
function tajBuilding() {
  return '<rect x="60" y="206" width="280" height="30" fill="#F2EEE3"/><rect x="140" y="140" width="120" height="66" fill="#FBF8F0"/><path d="M186 206 V168 Q200 150 214 168 V206Z" fill="#C9BFAE"/>' +
    '<path d="M104 190 Q104 158 120 154 Q136 158 136 190Z M264 190 Q264 158 280 154 Q296 158 296 190Z" fill="#FBF8F0" stroke="#D9D2C2" stroke-width="2"/>' +
    '<path d="M158 140 Q158 80 200 70 Q242 80 242 140Z" fill="#FBF8F0" stroke="#D9D2C2" stroke-width="3"/><path d="M200 70 V46" stroke="#C9971A" stroke-width="4"/><circle cx="200" cy="44" r="4" fill="#C9971A"/>' +
    '<rect x="62" y="98" width="14" height="108" fill="#FBF8F0" stroke="#D9D2C2" stroke-width="2"/><path d="M60 98 Q69 80 78 98Z" fill="#FBF8F0" stroke="#D9D2C2" stroke-width="2"/><rect x="324" y="98" width="14" height="108" fill="#FBF8F0" stroke="#D9D2C2" stroke-width="2"/><path d="M322 98 Q331 80 340 98Z" fill="#FBF8F0" stroke="#D9D2C2" stroke-width="2"/>';
}
function heart(x, y, s, c) { return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0 14 C-26 -2 -16 -26 0 -10 C16 -26 26 -2 0 14Z" fill="' + c + '"/>'; }
function tajArt(withHeart) {
  var parts = [
    sun(330, 56, 22, '#FFE08A'),
    it('<rect y="236" width="400" height="64" fill="#5FB3E8"/>'),
    it(tajBuilding()),
    it('<g transform="translate(0 472) scale(1 -1)" opacity=".3">' + tajBuilding() + '</g>' + waves(262, '#fff', .6) + waves(286, '#fff', .45))
  ];
  if (withHeart) parts.push(it(heart(60, 60, 1.8, '#E63946') + heart(112, 36, 1, '#FF8FA3') + heart(340, 120, 1.2, '#E63946')), it('<g transform="translate(200 20)"><path d="M-22 12 L-26 -10 L-12 0 L0 -16 L12 0 L26 -10 L22 12Z" fill="#FFC93C" stroke="#C9971A" stroke-width="2.5" stroke-linejoin="round"/></g>'));
  return scene(withHeart ? 'Le Taj Mahal, construit par amour' : 'Le Taj Mahal', grad('#FFC2A0', '#FFF1DA'), parts);
}
function prayerFlags(y0, y1) {
  var cols = ['#3A6FDB', '#fff', '#E63946', '#3C9A4A', '#FFD23F'], s = '<path d="M0 ' + y0 + ' Q200 ' + (y1 + 70) + ' 400 ' + y0 + '" fill="none" stroke="#14284B" stroke-width="2.5"/>';
  for (var i = 1; i < 14; i++) { var t = i / 14, u = 1 - t, x = t * 400, y = u * u * y0 + 2 * u * t * (y1 + 70) + t * t * y0; s += '<rect x="' + (x - 8) + '" y="' + (y + 1) + '" width="16" height="18" fill="' + cols[i % 5] + '" stroke="#14284B" stroke-width="1.2"/>'; }
  return s;
}
function himalayaArt() {
  return scene('Les montagnes de l’Himalaya', grad('#9CC7EE', '#EAF4FB'), [
    sun(330, 80, 24, '#FFE08A'),
    it('<path d="M0 250 L60 130 L110 180 L180 70 L250 170 L300 110 L400 250V300H0Z" fill="#8FA7C2"/><path d="M180 70 L204 106 L186 100 L170 112 L156 96Z M60 130 L78 156 L62 150 L46 158Z M300 110 L318 136 L302 130 L286 138Z" fill="#fff"/>'),
    it('<path d="M0 270 L90 190 L150 232 L230 160 L310 238 L400 190 V300 H0Z" fill="#6F86A8"/><path d="M230 160 L250 186 L234 182 L218 190Z" fill="#fff"/>'),
    it(prayerFlags(40, 30))
  ]);
}
function tenPeaksArt() {
  var g = '', hs = [150, 142, 134, 128, 122, 114, 108, 102, 96, 90];
  for (var i = 0; i < 10; i++) {
    var x0 = 20 + i * 36, h = hs[i], c = (i === 1 || i === 8) ? '#9AA5B1' : '#DC143C';
    g += it('<path d="M' + x0 + ' 236 L' + (x0 + 18) + ' ' + (236 - h) + ' L' + (x0 + 36) + ' 236Z" fill="' + c + '" stroke="#14284B" stroke-width="2.5" stroke-linejoin="round"/><path d="M' + (x0 + 18) + ' ' + (236 - h) + ' L' + (x0 + 26) + ' ' + (236 - h + 22) + ' L' + (x0 + 10) + ' ' + (236 - h + 22) + 'Z" fill="#fff"/>');
  }
  return scene('Dix sommets, huit au Népal', grad('#D9ECFA', '#F2F9FE'), [
    it('<rect y="236" width="400" height="64" fill="#E3EAF1"/>'), g,
    it('<rect x="70" y="252" width="260" height="38" rx="19" fill="#14284B"/>' + label(200, 279, '8 sur 10 au Népal', 22, '#fff'))
  ]);
}
function notRectArt() {
  function card(x, shape, name, ok) {
    var mark = ok ? '<path d="M-14 0 L-4 10 L16 -12" fill="none" stroke="#2FA84F" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' : '<path d="M-12 -12 L12 12 M12 -12 L-12 12" fill="none" stroke="#E63946" stroke-width="8" stroke-linecap="round"/>';
    return it('<rect x="' + x + '" y="30" width="112" height="240" rx="18" fill="#fff" stroke="#14284B" stroke-width="3"/>' + shape + label(x + 56, 168, name, 19) + '<g transform="translate(' + (x + 56) + ' 222)">' + mark + '</g>');
  }
  return scene('Le drapeau du Népal n’est ni carré ni rectangle', grad('#D9ECFA', '#F2F9FE'), [
    card(14, '<rect x="42" y="62" width="56" height="56" fill="#C9D3DE" stroke="#14284B" stroke-width="3"/>', 'carré', false),
    card(144, '<rect x="30" y="72" width="80" height="48" fill="#C9D3DE" stroke="#14284B" stroke-width="3"/>', 'rectangle', false),
    card(274, flagArt('np', 24, 50, 44).replace('<g transform="translate(24 50)">', '<g transform="translate(' + (274 + 34) + ' 50)">'), 'Népal', true)
  ]);
}
function climbArt() {
  function climber(x, y, c) { return '<circle cx="' + x + '" cy="' + (y - 14) + '" r="6" fill="#F2C9A0"/><rect x="' + (x - 7) + '" y="' + (y - 8) + '" width="14" height="18" rx="5" fill="' + c + '"/><path d="M' + (x + 9) + ' ' + (y - 6) + ' L' + (x + 14) + ' ' + (y + 14) + '" stroke="#5A3B1E" stroke-width="3" stroke-linecap="round"/>'; }
  return scene('Des alpinistes montent vers le sommet', grad('#9CC7EE', '#EAF4FB'), [
    cloud(40, 60, .8), cloud(300, 90, .7),
    it('<path d="M10 280 L200 36 L390 280Z" fill="#8FA7C2"/><path d="M200 36 L240 96 L218 90 L200 110 L182 90 L160 96Z" fill="#fff"/>'),
    it('<path d="M70 268 L160 222 L112 198 L196 156 L162 132 L198 100" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"/>'),
    it(climber(112, 198, '#E63946') + climber(162, 132, '#FFC93C'))
  ]);
}
function summitArt() {
  return scene('Au sommet du monde', grad('#7CC4F0', '#EAF4FB'), [
    sun(70, 70, 30, '#FFE08A'),
    it('<path d="M40 300 L200 134 L360 300Z" fill="#8FA7C2"/><path d="M200 134 L238 178 L216 172 L200 190 L180 172 L162 178Z" fill="#fff"/>'),
    it('<rect x="198" y="58" width="4" height="82" fill="#8A6B4A"/>' + flagArt('np', 204, 58, 40)),
    it('<g transform="translate(160 140)"><circle cx="0" cy="-16" r="6" fill="#F2C9A0"/><rect x="-7" y="-10" width="14" height="18" rx="5" fill="#E63946"/><path d="M-6 -6 L-14 -22 M6 -6 L14 -22" stroke="#E63946" stroke-width="4" stroke-linecap="round"/></g>'),
    cloud(20, 230, 1.1), cloud(280, 250, 1),
    stars([[330, 60, 3], [110, 130, 2.5], [350, 160, 2]])
  ]);
}
function populationArt() {
  function bar(x, h, code, name) { return it('<rect x="' + x + '" y="' + (250 - h) + '" width="100" height="' + h + '" rx="12" fill="#FFC93C" stroke="#14284B" stroke-width="3"/>' + flagArt(code, x + 16, 250 - h - 56, 68) + label(x + 50, 280, name, 22)); }
  return scene('L’Inde a une légère avance sur la Chine', grad('#FFE9C7', '#FFF6E4'), [
    it('<rect y="252" width="400" height="48" fill="#EEDCB6"/>'),
    bar(80, 150, 'in', 'Inde'), bar(220, 142, 'cn', 'Chine'),
    it('<g transform="translate(200 150)"><path d="M-14 -6 H14 M-14 6 H14" stroke="#14284B" stroke-width="5" stroke-linecap="round"/></g>')
  ]);
}
function asiaPeopleArt() {
  var dots = '', pts = [[170, 90], [210, 80], [250, 84], [290, 100], [200, 120], [240, 126], [280, 134], [160, 130], [230, 160], [260, 170], [200, 64], [300, 70]], cols = ['#E63946', '#4D96FF', '#FFC93C', '#2A9D8F', '#9B5DE5', '#fff'];
  pts.forEach(function (p, i) { dots += person(p[0], p[1], cols[i % 6], '#F2C9A0'); });
  return scene('L’Asie, le continent le plus peuplé', grad('#5FB3E8', '#BFE3F7'), asiaBase([it(dots), it('<rect x="116" y="256" width="236" height="34" rx="17" fill="#14284B"/>' + label(234, 280, 'Le plus peuplé', 20, '#fff'))]));
}
function greatWallArt() {
  var d = 'M-10 262 Q40 214 84 222 T164 178 T244 156 T324 116 T410 92';
  function tower(x, y) { return '<rect x="' + (x - 11) + '" y="' + (y - 34) + '" width="22" height="34" fill="#B98A5B" stroke="#14284B" stroke-width="2"/><path d="M' + (x - 15) + ' ' + (y - 34) + ' L' + x + ' ' + (y - 50) + ' L' + (x + 15) + ' ' + (y - 34) + 'Z" fill="#B5523B" stroke="#14284B" stroke-width="2" stroke-linejoin="round"/><rect x="' + (x - 4) + '" y="' + (y - 26) + '" width="8" height="10" fill="#5A3B1E"/>'; }
  return scene('La Grande Muraille de Chine', grad('#BFE3FF', '#F2F9FF'), [
    sun(340, 50, 20, '#FFD23F'), cloud(40, 54, .8),
    it('<path d="M0 220 L60 140 L120 200 L190 110 L270 200 L330 150 L400 220V300H0Z" fill="#7FB07A"/><path d="M0 264 L80 200 L160 250 L260 190 L400 262V300H0Z" fill="#5E9B5A"/>'),
    it('<path d="' + d + '" fill="none" stroke="#14284B" stroke-width="18" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#C9A06B" stroke-width="14" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#8A6A3E" stroke-width="3" stroke-dasharray="7 7"/>'),
    it(tower(84, 222) + tower(164, 178) + tower(244, 156) + tower(324, 116)),
    it('<rect x="112" y="252" width="176" height="38" rx="19" fill="#14284B"/>' + label(200, 279, '2 000 ans', 24, '#fff'))
  ]);
}
function rabbit(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><circle cx="-18" cy="-12" r="7" fill="#fff"/><ellipse cx="0" cy="-16" rx="22" ry="15" fill="#fff" stroke="#C9D3DE" stroke-width="2"/><circle cx="20" cy="-26" r="12" fill="#fff" stroke="#C9D3DE" stroke-width="2"/>' +
    '<ellipse cx="17" cy="-48" rx="4.5" ry="14" fill="#fff" stroke="#C9D3DE" stroke-width="2"/><ellipse cx="27" cy="-47" rx="4.5" ry="14" fill="#fff" stroke="#C9D3DE" stroke-width="2" transform="rotate(10 27 -47)"/><ellipse cx="17" cy="-47" rx="2" ry="9" fill="#FFB8C8"/>' +
    '<circle cx="25" cy="-28" r="2.2" fill="#14284B"/><circle cx="31" cy="-23" r="2" fill="#FF8FA3"/></g>';
}
function okunoshimaArt() {
  return scene('Une île pleine de lapins', grad('#5FB3E8', '#BFE3F7'), [
    it(waves(40, '#fff', .5) + waves(276, '#fff', .5)),
    it('<ellipse cx="200" cy="200" rx="170" ry="70" fill="#E9CF94"/><ellipse cx="200" cy="190" rx="150" ry="56" fill="#7CC36A"/>'),
    it(rabbit(80, 200, 1.1)), it(rabbit(160, 226, 1)), it(rabbit(250, 206, 1.2)), it(rabbit(320, 232, .9)), it(rabbit(200, 170, .8)), it(rabbit(120, 160, .8)),
    it('<rect x="104" y="14" width="192" height="40" rx="20" fill="#14284B"/>' + label(200, 42, 'Okunoshima', 24, '#fff'))
  ]);
}
function quakeArt() {
  return scene('Un tremblement de terre', grad('#BFE3FF', '#F2F9FF'), [
    cloud(40, 54, .8),
    it('<path d="M0 220 H400 V300 H0Z" fill="#9A7B52"/><path d="M0 220 H400" stroke="#6F5A3A" stroke-width="5"/><path d="M180 220 L196 244 L176 262 L200 284 L188 300" fill="none" stroke="#14284B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'),
    it('<g transform="rotate(-9 130 222)"><rect x="80" y="150" width="100" height="72" fill="#F2D49B" stroke="#14284B" stroke-width="3"/><path d="M68 152 L130 100 L192 152Z" fill="#B5523B" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><rect x="118" y="178" width="26" height="44" fill="#5A3B1E"/></g>'),
    it('<g fill="none" stroke="#14284B" stroke-width="4" stroke-linecap="round"><path d="M40 170 q-10 20 0 40"/><path d="M24 160 q-20 30 0 60"/><path d="M220 170 q10 20 0 40"/><path d="M236 160 q20 30 0 60"/></g>'),
    it(rabbit(300, 218, 1.1)),
    it('<rect x="124" y="16" width="190" height="44" rx="22" fill="#E63946"/>' + label(219, 46, 'Boum !', 28, '#fff'))
  ]);
}
function sakura(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 Q-4 -40 -14 -64 M-2 -40 Q16 -56 30 -80" fill="none" stroke="#6B4A2B" stroke-width="8" stroke-linecap="round"/><g fill="#FFB8D0"><circle cx="-20" cy="-74" r="22"/><circle cx="8" cy="-90" r="26"/><circle cx="34" cy="-80" r="20"/><circle cx="-4" cy="-62" r="18"/></g><g fill="#FF8FB5"><circle cx="-14" cy="-80" r="5"/><circle cx="14" cy="-96" r="5"/><circle cx="32" cy="-78" r="5"/></g></g>';
}
function fujiArt() {
  return scene('Le mont Fuji', grad('#FFC8D8', '#FFEFE0'), [
    sun(70, 70, 26, '#FF9F8A'), cloud(290, 50, .8),
    it('<path d="M20 240 L160 76 Q200 64 240 76 L380 240Z" fill="#6F86C2"/><path d="M160 76 Q200 64 240 76 L262 104 L240 98 L222 116 L200 96 L178 116 L160 98 L138 104Z" fill="#fff"/>'),
    it('<rect y="236" width="400" height="64" fill="#5FB3E8"/>' + waves(258, '#fff', .55) + waves(284, '#fff', .4)),
    sakura(70, 262, 1.2), sakura(350, 266, 1)
  ]);
}
function sushiArt() {
  return scene('Des sushis et des boulettes de riz', grad('#FFE9C7', '#FFF6E4'), [
    it('<ellipse cx="200" cy="200" rx="180" ry="80" fill="#5A3B1E"/><ellipse cx="200" cy="196" rx="170" ry="72" fill="#8A5A2B"/>'),
    it('<g transform="translate(86 196)"><path d="M-34 24 L0 -36 L34 24Z" fill="#fff" stroke="#C9D3DE" stroke-width="2.5" stroke-linejoin="round"/><path d="M-22 24 L-16 6 H16 L22 24Z" fill="#14284B"/></g><g transform="translate(160 214)"><path d="M-34 24 L0 -36 L34 24Z" fill="#fff" stroke="#C9D3DE" stroke-width="2.5" stroke-linejoin="round"/><path d="M-22 24 L-16 6 H16 L22 24Z" fill="#14284B"/></g>'),
    it('<g transform="translate(240 190)"><ellipse rx="34" ry="16" fill="#fff" stroke="#C9D3DE" stroke-width="2"/><path d="M-36 -2 Q0 -26 36 -2 Q0 8 -36 -2Z" fill="#FF8A5B"/><path d="M-20 -8 q10 -6 22 0 M0 -12 q10 -4 20 2" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/></g><g transform="translate(296 214)"><ellipse rx="30" ry="14" fill="#fff" stroke="#C9D3DE" stroke-width="2"/><path d="M-32 -2 Q0 -22 32 -2 Q0 8 -32 -2Z" fill="#D62839"/></g>'),
    it('<g transform="translate(206 236)"><circle r="20" fill="#14284B"/><circle r="13" fill="#fff"/><circle r="5" fill="#FF8A5B"/></g>'),
    it('<ellipse cx="318" cy="170" rx="18" ry="12" fill="#7CC36A" stroke="#4E9A43" stroke-width="2"/>'),
    sparkle(40, 50, 4).replace('#FFF3B0', '#FFC93C')
  ]);
}
function wasabiArt() {
  return scene('Du wasabi très épicé', grad('#FFE9C7', '#FFF6E4'), [
    it('<circle cx="220" cy="150" r="90" fill="#F4B183" stroke="#14284B" stroke-width="3.5"/><circle cx="168" cy="178" r="16" fill="#FF6B6B" opacity=".6"/><circle cx="272" cy="178" r="16" fill="#FF6B6B" opacity=".6"/>'),
    it('<path d="M176 118 L200 130 L176 142 M264 118 L240 130 L264 142" fill="none" stroke="#14284B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'),
    it('<ellipse cx="220" cy="188" rx="30" ry="24" fill="#14284B"/><path d="M200 196 Q220 218 240 196Z" fill="#FF6B8A"/><path d="M178 132 q-6 22 0 40 M262 132 q6 22 0 40" fill="none" stroke="#4D96FF" stroke-width="5" stroke-linecap="round"/>'),
    it('<path d="M166 214 Q148 244 168 262 Q160 232 186 222Z M274 214 Q292 244 272 262 Q280 232 254 222Z" fill="#FF6B35"/><path d="M200 232 Q196 262 210 276 Q206 252 224 240Z M244 232 Q250 258 238 274 Q240 252 224 240Z" fill="#FF9F1C"/>'),
    it('<ellipse cx="62" cy="214" rx="46" ry="30" fill="#7CC36A" stroke="#4E9A43" stroke-width="3"/><path d="M30 190 L96 90 M44 196 L108 100" stroke="#8A5A2B" stroke-width="5" stroke-linecap="round"/>'),
    it('<ellipse cx="116" cy="70" rx="64" ry="26" fill="#fff" stroke="#14284B" stroke-width="3"/>' + label(116, 79, 'Aïe !', 26))
  ]);
}
function yurt(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-46" y="-40" width="92" height="40" fill="#F4EFE0" stroke="#14284B" stroke-width="3"/><path d="M-56 -40 L0 -90 L56 -40Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M-46 -40 H46" stroke="#E63946" stroke-width="6"/><rect x="-12" y="-30" width="24" height="30" rx="3" fill="#C2410C" stroke="#14284B" stroke-width="2.5"/><circle cx="0" cy="-88" r="5" fill="#14284B"/></g>';
}
function sheep(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-10" y="-4" width="4" height="10" fill="#14284B"/><rect x="6" y="-4" width="4" height="10" fill="#14284B"/><circle cx="-8" cy="-12" r="9" fill="#fff" stroke="#C9D3DE" stroke-width="2"/><circle cx="6" cy="-14" r="10" fill="#fff" stroke="#C9D3DE" stroke-width="2"/><circle cx="-2" cy="-18" r="9" fill="#fff"/><ellipse cx="18" cy="-12" rx="7" ry="6" fill="#3A3A4A"/></g>'; }
function yurtArt() {
  return scene('Des yourtes dans la steppe mongole', grad('#9CC7EE', '#EAF4FB'), [
    sun(330, 56, 22, '#FFE08A'), cloud(60, 60, .9),
    it('<path d="M0 190 L70 130 L140 180 L220 120 L300 180 L360 140 L400 190V300H0Z" fill="#A9BED2"/>'),
    it('<path d="M0 218 Q120 196 240 216 T400 208 V300 H0Z" fill="#9CCB6A"/><path d="M0 262 Q130 242 260 262 T400 254 V300 H0Z" fill="#7CB454"/>'),
    it(yurt(110, 250, 1.3)), it(yurt(290, 262, 1.1)), it(sheep(210, 276, 1)), it(sheep(350, 288, .9)), it(sheep(40, 288, .9))
  ]);
}
function tukTuk(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-50 -30 H20 L40 -10 V6 H-50Z" fill="#2A9D8F" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M-46 -30 L-40 -62 H18 L22 -30" fill="#FFD23F" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><rect x="-30" y="-52" width="34" height="18" fill="#BFE3F7" stroke="#14284B" stroke-width="2"/><circle cx="-34" cy="8" r="10" fill="#14284B"/><circle cx="-34" cy="8" r="4" fill="#C9D3DE"/><circle cx="30" cy="8" r="10" fill="#14284B"/><circle cx="30" cy="8" r="4" fill="#C9D3DE"/></g>';
}
function bangkokArt() {
  return scene('Un temple et un tuk-tuk à Bangkok', grad('#FFD8A8', '#FFF0D2'), [
    sun(330, 60, 24, '#FF9F1C'),
    it('<rect y="262" width="400" height="38" fill="#E8C898"/>'),
    it('<rect x="100" y="224" width="140" height="40" fill="#F2D49B" stroke="#14284B" stroke-width="3"/><path d="M110 224 L170 168 L230 224Z" fill="#E63946" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M128 168 L170 120 L212 168Z" fill="#FFC93C" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M146 120 L170 78 L194 120Z" fill="#2A9D8F" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M170 78 V40" stroke="#C9971A" stroke-width="5"/><circle cx="170" cy="38" r="5" fill="#C9971A"/><rect x="156" y="238" width="28" height="26" rx="4" fill="#5A3B1E"/>'),
    it(tukTuk(320, 262, 1.4)),
    it('<rect x="86" y="276" width="168" height="1" fill="none"/>')
  ]);
}
function islandsArt() {
  return scene('Sumatra, Bornéo, Java : les îles d’Indonésie', grad('#35B0E6', '#0B6AA8'), [
    it(waves(30, '#fff', .4) + waves(280, '#fff', .4)),
    it('<path d="M20 120 L150 170 L140 190 L10 140Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3" stroke-linejoin="round"/>' + label(70, 208, 'Sumatra', 17, '#fff') + '<path d="M80 224 L250 218 L254 236 L84 242Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3" stroke-linejoin="round"/>' + label(168, 236, 'Java', 17, '#fff')),
    it('<path d="M231 118 L262 128 L305 120 L345 112 L335 165 L300 190 L260 185 L235 150Z" fill="#E63946"/><path d="M250 70 L290 60 L330 80 L345 112 L305 120 L262 128 L231 118 L230 105Z" fill="#4D96FF"/><circle cx="278" cy="96" r="8" fill="#FFD23F"/><path d="M230 105 L250 70 L290 60 L330 80 L345 112 L335 165 L300 190 L260 185 L235 150 L231 118Z" fill="none" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>'),
    it(label(288, 218, 'Bornéo', 20, '#fff')),
    it('<g transform="translate(24 278)"><rect width="12" height="12" fill="#E63946"/><text x="18" y="11" ' + FONT + ' font-size="13" fill="#fff">Indonésie</text></g><g transform="translate(130 278)"><rect width="12" height="12" fill="#4D96FF"/><text x="148" y="11" ' + FONT + ' font-size="1" fill="none"></text><text x="18" y="11" ' + FONT + ' font-size="13" fill="#fff">Malaisie</text></g><g transform="translate(236 278)"><rect width="12" height="12" fill="#FFD23F"/><text x="18" y="11" ' + FONT + ' font-size="13" fill="#fff">Brunei</text></g>')
  ]);
}
function tiger(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-44 -34 Q-70 -40 -64 -10" fill="none" stroke="#F28C28" stroke-width="7" stroke-linecap="round"/><path d="M-60 -22 l8 -3 M-64 -12 l8 -2" stroke="#14284B" stroke-width="3"/>' +
    '<rect x="-32" y="-26" width="11" height="26" rx="4" fill="#F28C28"/><rect x="-12" y="-26" width="11" height="26" rx="4" fill="#E07A18"/><rect x="14" y="-26" width="11" height="26" rx="4" fill="#F28C28"/><rect x="30" y="-26" width="11" height="26" rx="4" fill="#E07A18"/>' +
    '<ellipse cx="-2" cy="-38" rx="42" ry="22" fill="#F28C28"/><path d="M-26 -58 l6 18 M-10 -60 l4 20 M6 -60 l2 20 M22 -56 l-2 18" stroke="#14284B" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="42" cy="-50" r="19" fill="#F28C28"/><path d="M30 -66 L28 -80 L40 -70Z M54 -66 L60 -80 L62 -64Z" fill="#F28C28"/><ellipse cx="46" cy="-42" rx="11" ry="8" fill="#FFF3DC"/><circle cx="36" cy="-54" r="2.8" fill="#14284B"/><circle cx="50" cy="-54" r="2.8" fill="#14284B"/><path d="M42 -46 h8 l-4 4Z" fill="#14284B"/><path d="M28 -50 l7 2 M60 -50 l-7 2" stroke="#14284B" stroke-width="3" stroke-linecap="round"/></g>';
}
function jungleBg() {
  return it('<path d="M0 224 Q120 206 240 226 T400 216 V300 H0Z" fill="#2F8F46"/><path d="M0 266 Q140 250 260 266 T400 258 V300 H0Z" fill="#1F7A3A"/>') +
    it('<g fill="#1F7A3A"><ellipse cx="30" cy="190" rx="34" ry="14" transform="rotate(-30 30 190)"/><ellipse cx="60" cy="204" rx="30" ry="12" transform="rotate(20 60 204)"/><ellipse cx="370" cy="186" rx="34" ry="14" transform="rotate(30 370 186)"/><ellipse cx="344" cy="206" rx="30" ry="12" transform="rotate(-20 344 206)"/></g>');
}
function wildlifeArt() {
  return scene('Éléphants, rhinocéros et tigres dans la forêt tropicale', grad('#BDE9B0', '#F0FADD'), [
    jungleBg(), it(rhino(78, 262, .72)), it(tiger(332, 260, .9)), it(elephant(206, 276, .78))
  ]);
}
function mango(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse rx="22" ry="17" fill="#FFB703" transform="rotate(-20)"/><path d="M-8 -16 Q14 -20 20 0 Q14 -6 -8 -16Z" fill="#EF476F" opacity=".7"/><path d="M-4 -18 Q4 -30 14 -24 Q8 -16 -4 -18Z" fill="#3C9A4A"/></g>'; }
function mangoArt() {
  return scene('Des mangues pour attirer les orangs-outans', grad('#BDE9B0', '#F0FADD'), [
    jungleBg(),
    it('<path d="M0 74 Q120 46 250 64 T400 50" fill="none" stroke="#6B4A2B" stroke-width="14" stroke-linecap="round"/><path d="M60 70 Q50 100 70 118 M150 62 Q142 96 160 112 M250 66 Q244 100 262 118 M330 56 Q324 90 342 106" fill="none" stroke="#3C9A4A" stroke-width="5"/>'),
    it(mango(70, 130, .9) + mango(160, 122, 1) + mango(262, 130, .95) + mango(342, 118, .9)),
    it('<ellipse cx="200" cy="262" rx="110" ry="22" fill="#8A5A2B"/><ellipse cx="200" cy="250" rx="100" ry="18" fill="#A8703A"/>'),
    it(mango(150, 238, 1.1) + mango(200, 232, 1.2) + mango(250, 240, 1.1) + mango(176, 220, 1) + mango(226, 218, 1))
  ]);
}
function orangutan(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<path d="M-24 -30 Q-52 -30 -56 -78" fill="none" stroke="#C1561B" stroke-width="12" stroke-linecap="round"/><path d="M24 -30 Q50 -22 70 -52" fill="none" stroke="#C1561B" stroke-width="12" stroke-linecap="round"/>' +
    '<rect x="-24" y="-8" width="14" height="26" rx="6" fill="#C1561B"/><rect x="10" y="-8" width="14" height="26" rx="6" fill="#C1561B"/>' +
    '<ellipse cx="0" cy="-34" rx="30" ry="32" fill="#D9682A"/><circle cx="0" cy="-86" r="26" fill="#C1561B"/><ellipse cx="0" cy="-82" rx="17" ry="16" fill="#E8A87C"/>' +
    '<circle cx="-7" cy="-86" r="2.8" fill="#14284B"/><circle cx="7" cy="-86" r="2.8" fill="#14284B"/><circle cx="-2" cy="-78" r="1.4" fill="#14284B"/><circle cx="2" cy="-78" r="1.4" fill="#14284B"/><path d="M-6 -73 Q0 -68 6 -73" fill="none" stroke="#14284B" stroke-width="2.2" stroke-linecap="round"/>' +
    '<g transform="translate(72 -56)"><ellipse rx="14" ry="11" fill="#FFB703" transform="rotate(-20)"/></g></g>';
}
function orangutanArt() {
  return scene('Un orang-outan', grad('#BDE9B0', '#F0FADD'), [
    jungleBg(),
    it('<path d="M0 190 Q100 170 220 184 T400 170" fill="none" stroke="#6B4A2B" stroke-width="16" stroke-linecap="round"/><path d="M280 170 q20 -30 50 -26 q-10 20 -50 26Z M60 184 q-20 -26 -50 -22 q8 20 50 22Z" fill="#3C9A4A"/>'),
    it(orangutan(180, 190, 1.6)), it(sparkle(330, 90, 4).replace('#FFF3B0', '#FFC93C') + sparkle(60, 80, 3).replace('#FFF3B0', '#FFC93C'))
  ]);
}
function finAsiaArt() {
  var codes = ['cy', 'tr', 'ae', 'in', 'np', 'cn', 'jp', 'mn', 'th', 'id'], out = [];
  codes.forEach(function (c, i) {
    var row = i < 5 ? 0 : 1, col = i % 5, w = c === 'np' ? 30 : 56, x = 32 + col * 70 + (c === 'np' ? 13 : 0), y = row ? 196 : 112;
    out.push(it('<rect x="' + (x + w / 2 - 2) + '" y="' + (y - 14) + '" width="4" height="14" fill="#8A6B4A"/>' + flagArt(c, x, y, w)));
  });
  return scene('Tous les drapeaux visités', grad('#FFD6E8', '#FFF1F7'), [it(label(200, 84, 'Fin', 64)), it('<path d="M0 98 H400 M0 182 H400" stroke="#14284B" stroke-width="3"/>')].concat(out));
}
function coverAsiaArt() {
  var cs = [['jp', 30, 36, -8], ['in', 150, 28, 5], ['cn', 270, 40, -5], ['tr', 36, 150, 6], ['th', 156, 160, -6], ['id', 276, 148, 8]], g = '';
  cs.forEach(function (c) { g += '<g transform="rotate(' + c[3] + ' ' + (c[1] + 50) + ' ' + (c[2] + 33) + ')">' + flagArt(c[0], c[1], c[2], 100) + '</g>'; });
  return scene('Plein de drapeaux d’Asie', grad('#FF5D8F', '#B0124F'), [sparkle(20, 20, 3), sparkle(380, 270, 3), sparkle(350, 20, 2.5), it(g)]);
}

STORIES.splice(2, 0, {
  title: 'Voyage en Asie', coverArt: coverAsiaArt, mark: '?',
  tiles: ['cy', 'tr', 'ae', 'in', 'np', 'cn', 'jp', 'mn', 'th', 'id'].map(flagTileA),
  scenes: [
    { tile: -1, text: 'C’était super, l’Afrique ! Oui, mais c’est l’Asie maintenant !', art: asiaIntroArt },

    { tile: 0, text: 'Bienvenue en Chypre. Capitale : Nicosie. Langues principales : grec et turc.', art: flagSceneA('cy', 'Chypre', '#FFF1D6', '#FFFAEF', 26, 200) },
    { tile: 0, text: 'Wow ! Le drapeau de Chypre est la carte du pays, couleur cuivrée, au-dessus de branches d’olivier.', art: cyprusMapArt },
    { tile: 0, text: 'Chypre est un pays européen et asiatique. La capitale, Nicosie, est située entre l’Europe et l’Asie, avec une route séparant l’Asie et l’Europe, appelée la ligne Verte.', art: nicosiaArt },
    { tile: 0, text: 'Chypre fait même partie de l’Union européenne. Prochain pays : la Turquie.', art: flagSceneA('eu', 'Union européenne', '#D6E4F8', '#F1F6FD', 20, 260) },

    { tile: 1, text: 'Voici la Turquie. Capitale : Ankara. Langue principale : le turc.', art: flagSceneA('tr', 'Turquie', '#F8D5D5', '#FDF1F1') },
    { tile: 1, text: 'Hé ! Il y a une montgolfière ! Pourquoi il y a des montgolfières partout ?', art: cappadociaArt },
    { tile: 1, text: 'On est dans une région de Turquie appelée la Cappadoce. Les touristes adorent y faire des tours de montgolfière pour admirer les vues superbes.', art: balloonBigArt },
    { tile: 1, text: 'Hé ! J’ai faim ! Le kebab est une nourriture turque très bonne, qui signifie viande grillée. On y va ! Mmmmmmm ! Miam ! Miam !', art: kebabArt },
    { tile: 1, text: 'Ah, c’était trop bon ! On va aux Émirats arabes unis.', art: fullPlateArt },

    { tile: 2, text: 'Bienvenue aux Émirats arabes unis. Capitale : Abou Dhabi.', art: flagSceneA('ae', 'Émirats arabes unis', '#D6EFD6', '#F4FBF4', 19, 270) },
    { tile: 2, text: 'Voici Dubaï. Regarde, c’est le Burj Khalifa. Le Burj Khalifa est la plus haute tour du monde, avec ses 828 mètres de haut.', art: burjArt },
    { tile: 2, text: 'On peut aller au cent-quarante-huitième étage avec l’ascenseur. On y va ! Dong !', art: function () { return elevatorArt('148', true); } },
    { tile: 2, text: 'Wah, on a une superbe vue ! Il y a tellement de gratte-ciel à Dubaï !', art: skyViewArt },
    { tile: 2, text: 'On redescend ? D’accord ! Dong ! Direction : l’Inde.', art: function () { return elevatorArt('0', false); } },

    { tile: 3, text: 'Voici l’Inde. Population : 1,4 milliard d’habitants. Capitale : New Delhi. Langues principales : hindi et anglais. Monnaie : la roupie.', art: flagSceneA('in', 'Inde', '#FFE9C7', '#E4F5E0') },
    { tile: 3, text: 'Attends… Tu as bien dit 1,4 milliard ? Correct. L’Inde est le pays le plus peuplé au monde.', art: crowdArt },
    { tile: 3, text: 'Il y a des gens qui dansent là-bas ! Voici Mumbai. Ce que vous voyez, c’est Bollywood.', art: bollywoodArt },
    { tile: 3, text: 'On va voir le Taj Mahal ? Correct. Le Taj Mahal est l’une des 7 merveilles du monde.', art: function () { return tajArt(false); } },
    { tile: 3, text: 'Voici le Taj Mahal, construit par l’empereur Shah Jahan en souvenir de son épouse, Mumtaz Mahal. Direction le Népal, pour voir l’Everest.', art: function () { return tajArt(true); } },

    { tile: 4, text: 'Bienvenue au Népal. Capitale : Katmandou.', art: flagSceneA('np', 'Népal', '#D3E2F8', '#FBEDEE', 26, 200) },
    { tile: 4, text: 'Voici les montagnes de l’Himalaya.', art: himalayaArt },
    { tile: 4, text: 'Parmi les 10 montagnes les plus hautes du monde, c’est-à-dire celles qui dépassent les 8 000 mètres d’altitude, 8 se trouvent au Népal.', art: tenPeaksArt },
    { tile: 4, text: 'Il faut aussi savoir que le Népal est le seul pays au monde à posséder un drapeau ni carré, ni rectangle.', art: notRectArt },
    { tile: 4, text: 'On va au sommet ? Oui !', art: climbArt },
    { tile: 4, text: 'Nous voici au sommet du monde, à 8 849 mètres d’altitude. On redescend. On va en Chine.', art: summitArt },

    { tile: 5, text: 'Bienvenue en Chine. Population : 1,4 milliard d’habitants. Capitale : Pékin. Langue principale : mandarin.', art: flagSceneA('cn', 'Chine', '#F8D5D5', '#FFF6C9') },
    { tile: 5, text: 'Encore 1,4 milliard ! Comme l’Inde ! Correct. L’Inde et la Chine ont des populations similaires, mais l’Inde a une légère avance sur la Chine.', art: populationArt },
    { tile: 5, text: 'C’est pour ça que l’Asie est le continent le plus peuplé au monde.', art: asiaPeopleArt },
    { tile: 5, text: 'OK, on va voir la Grande Muraille de Chine ? Oui. Wow ! C’est ça ? Correct. Il a fallu 2 000 ans pour construire tout le mur. Prochain pays : le Japon.', art: greatWallArt },

    { tile: 6, text: 'Voici le Japon. Capitale : Tokyo. Langue principale : le japonais. Monnaie : le yen.', art: flagSceneA('jp', 'Japon', '#F8D5E0', '#FDF1F5') },
    { tile: 6, text: 'On est où exactement au Japon ? Au-dessus de l’île d’Okunoshima, une île pleine de 1 000 lapins. Hihi !', art: okunoshimaArt },
    { tile: 6, text: 'Oh ! Le sol vient juste de… bouger ? Correct. Il y a environ 1 500 tremblements de terre ressentis chaque année au Japon, soit quelques-uns par jour, parce que le pays est situé sur la ceinture de feu du Pacifique.', art: quakeArt },
    { tile: 6, text: 'On va à Tokyo ? Oui ! Regarde ! C’est le mont Fuji.', art: fujiArt },
    { tile: 6, text: 'Mmmm ! Des sushis ! Je vais commencer par des boulettes de riz…', art: sushiArt },
    { tile: 6, text: 'C’est quoi ce truc vert ? Je vais goûter. Euh… Oh, oh, pétard ! C’est du wasabi, une sorte de moutarde japonaise très épicée. Direction : la Mongolie.', art: wasabiArt },

    { tile: 7, text: 'Bienvenue en Mongolie. Capitale : Oulan-Bator.', art: flagSceneA('mn', 'Mongolie', '#F8D5D5', '#D3E2F8') },
    { tile: 7, text: 'Oh, regarde ! C’est quoi, ces maisons ? C’est la yourte mongole, faite avec de la laine. On va maintenant en Thaïlande.', art: yurtArt },

    { tile: 8, text: 'Voici la Thaïlande. Capitale : Bangkok.', art: flagSceneA('th', 'Thaïlande', '#F8D5D5', '#D3E2F8') },
    { tile: 8, text: 'Regarde ! Il s’agit de la capitale : Bangkok. Destination : l’Indonésie.', art: bangkokArt },

    { tile: 9, text: 'Voici l’Indonésie. Capitale : Jakarta. Langue nationale : l’indonésien.', art: flagSceneA('id', 'Indonésie', '#F8D5D5', '#FDF1F1') },
    { tile: 9, text: 'Il y a des orangs-outans sur les îles de Sumatra et de Bornéo. Bornéo est une île où se trouvent l’Indonésie, la Malaisie et tout le pays de Brunei.', art: islandsArt },
    { tile: 9, text: 'Dans la forêt tropicale, on voit aussi des éléphants, des rhinocéros et des tigres.', art: wildlifeArt },
    { tile: 9, text: 'Voici des mangues pour attirer les orangs-outans. Miam !', art: mangoArt },
    { tile: 9, text: 'En voilà un ! Il est trop beau !', art: orangutanArt },
    { tile: 9, text: 'Fin', art: finAsiaArt }
  ]
});

/* ---------- Histoire : l'Amérique du Nord ---------- */
FL.us = [90, 60, (function () { var t = '<rect width="90" height="60" fill="#fff"/>'; for (var i = 0; i < 13; i += 2) t += '<rect y="' + (i * 60 / 13).toFixed(2) + '" width="90" height="' + (60 / 13 + .05).toFixed(2) + '" fill="#B22234"/>'; t += '<rect width="36" height="' + (7 * 60 / 13).toFixed(2) + '" fill="#3C3B6E"/>'; for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) t += '<circle cx="' + (4.5 + c * 6.8).toFixed(1) + '" cy="' + (4.5 + r * 7.4).toFixed(1) + '" r="1.5" fill="#fff"/>'; return t; })()];
FL.ca = [90, 60, '<rect width="90" height="60" fill="#fff"/><rect width="22.5" height="60" fill="#D80621"/><rect x="67.5" width="22.5" height="60" fill="#D80621"/><path d="M45 10 L49 20 L56 17 L54 28 L62 24 L59 33 L64 36 L47 43 L47 52 L43 52 L43 43 L26 36 L31 33 L28 24 L36 28 L34 17 L41 20Z" fill="#D80621"/>'];
FL.mx = [90, 60, '<rect width="30" height="60" fill="#006847"/><rect x="30" width="30" height="60" fill="#fff"/><rect x="60" width="30" height="60" fill="#CE1126"/><circle cx="45" cy="30" r="7" fill="#8C6B2F"/><path d="M39 33 q6 6 12 0" fill="none" stroke="#006847" stroke-width="2"/>'];
FL.pa = [90, 60, '<rect width="90" height="60" fill="#fff"/><rect x="45" width="45" height="30" fill="#D21034"/><rect y="30" width="45" height="30" fill="#005293"/>' + starP(22.5, 15, 9, '#005293') + starP(67.5, 45, 9, '#D21034')];
FL.jm = [90, 60, '<rect width="90" height="60" fill="#009B3A"/><path d="M0 0 L45 30 L0 60Z M90 0 L45 30 L90 60Z" fill="#000"/><path d="M0 0 L90 60 M90 0 L0 60" stroke="#FED100" stroke-width="9"/>'];
FL.cu = [90, 60, '<rect width="90" height="60" fill="#002A8F"/><rect y="12" width="90" height="12" fill="#fff"/><rect y="36" width="90" height="12" fill="#fff"/><path d="M0 0 L52 30 L0 60Z" fill="#CF142B"/>' + starP(17, 30, 10, '#fff')];
FL.bs = [90, 60, '<rect width="90" height="60" fill="#00ABC9"/><rect y="20" width="90" height="20" fill="#FAE042"/><path d="M0 0 L38 30 L0 60Z" fill="#000"/>'];
FL.tt = [90, 60, '<rect width="90" height="60" fill="#CE1126"/><path d="M0 0 L90 60" stroke="#fff" stroke-width="22"/><path d="M0 0 L90 60" stroke="#000" stroke-width="12"/>'];
FL.cr = [90, 60, '<rect width="90" height="60" fill="#002B7F"/><rect y="10" width="90" height="40" fill="#fff"/><rect y="20" width="90" height="20" fill="#CE1126"/>'];

function naPalm(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 Q-8 -50 4 -96" fill="none" stroke="#8A5A2B" stroke-width="9" stroke-linecap="round"/><g fill="#3C9A4A" stroke="#2F7A32" stroke-width="2"><path d="M4 -96 q-40 -14 -62 14 q36 -6 62 -14Z"/><path d="M4 -96 q40 -14 62 14 q-36 -6 -62 -14Z"/><path d="M4 -96 q-26 -36 -58 -30 q30 6 58 30Z"/><path d="M4 -96 q26 -36 58 -30 q-30 6 -58 30Z"/><path d="M4 -96 q0 -40 6 -50 q-4 24 -6 50Z"/></g><circle cx="2" cy="-92" r="4" fill="#6B4A2B"/></g>';
}
function naIntroArt() {
  return scene('L’Amérique du Nord', grad('#5FB3E8', '#BFE3F7'), [
    it(waves(30, '#fff', .45) + waves(285, '#fff', .45)),
    it('<path d="M60 70 L130 46 L200 54 L270 40 L338 64 L320 108 L296 132 L262 160 L252 190 L270 226 L246 236 L222 206 L190 176 L146 156 L104 130 L74 100Z" fill="#F4C76A" stroke="#C99A3A" stroke-width="4" stroke-linejoin="round"/>'),
    it(label(190, 112, 'Amérique du Nord', 26, '#7A4A12')),
    stars([[340, 200, 3], [60, 220, 2.5], [340, 260, 2.5]]).replace(/#FFF3B0/g, '#fff')
  ]);
}
function naFlagBigArt() {
  return scene('Le drapeau des États-Unis', grad('#D3E2F8', '#FBEDEE'), [
    it('<rect x="50" y="26" width="8" height="250" rx="4" fill="#8A6B4A"/><circle cx="54" cy="24" r="7" fill="#FFC93C"/>'),
    it(flagArt('us', 62, 34, 280)),
    it('<rect x="66" y="240" width="130" height="38" rx="19" fill="#B22234"/>' + label(131, 267, '13 bandes', 22, '#fff')),
    it('<rect x="206" y="240" width="130" height="38" rx="19" fill="#3C3B6E"/>' + label(271, 267, '50 étoiles', 22, '#fff'))
  ]);
}
function naLibertyArt() {
  return scene('La Statue de la Liberté à New York', grad('#BFE3F7', '#EAF6FB'), [
    sun(60, 56, 22, '#FFD23F'), cloud(320, 54, 1),
    it('<rect y="252" width="400" height="48" fill="#3E9BD8"/>' + waves(270, '#fff', .5)),
    it('<rect x="162" y="196" width="76" height="58" fill="#D9D2C2" stroke="#14284B" stroke-width="3"/><rect x="150" y="244" width="100" height="14" fill="#C9BFAE" stroke="#14284B" stroke-width="3"/>'),
    it('<path d="M176 196 L184 124 L216 124 L224 196Z" fill="#7FC8A9" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><circle cx="200" cy="110" r="15" fill="#7FC8A9" stroke="#14284B" stroke-width="3"/><path d="M186 100 L176 86 M193 96 L189 80 M200 94 V76 M207 96 L211 80 M214 100 L224 86" stroke="#14284B" stroke-width="4" stroke-linecap="round"/>'),
    it('<path d="M212 130 L240 94 L246 66" fill="none" stroke="#7FC8A9" stroke-width="11" stroke-linecap="round"/><path d="M246 62 q-12 -18 0 -34 q12 16 0 34Z" fill="#FFC93C" stroke="#E8923A" stroke-width="3"/><rect x="236" y="62" width="20" height="8" rx="3" fill="#C9971A"/><rect x="178" y="136" width="14" height="22" rx="2" fill="#5FA88A" stroke="#14284B" stroke-width="2"/>'),
    it('<rect x="120" y="14" width="160" height="38" rx="19" fill="#14284B"/>' + label(200, 41, 'New York', 22, '#fff'))
  ]);
}
function naCanadaNorthArt() {
  return scene('Le nord du Canada sous la neige', grad('#6E9FD8', '#DDEBFA'), [
    it('<path d="M0 70 Q100 20 200 60 T400 40 V100 Q300 70 200 100 T0 110Z" fill="#6DE0A8" opacity=".5"/>'),
    stars([[60, 40, 2.5], [330, 30, 3], [200, 24, 2]]),
    it('<path d="M0 170 L70 100 L120 150 L190 80 L260 160 L320 110 L400 170 V300 H0Z" fill="#8FA7C2"/><path d="M70 100 L88 122 L72 118 L58 126Z M190 80 L212 112 L194 106 L178 118Z M320 110 L336 132 L320 128 L306 134Z" fill="#fff"/>'),
    it('<path d="M0 230 Q120 200 240 226 T400 214 V300 H0Z" fill="#fff" stroke="#B9C7D8" stroke-width="3"/>'),
    it(fir(60, 236, 1, '#2F7A32') + fir(110, 244, .8, '#2A7F58') + fir(340, 240, 1, '#2F7A32')),
    it('<path d="M190 262 A40 34 0 0 1 270 262Z" fill="#fff" stroke="#14284B" stroke-width="3"/><path d="M218 262 A12 14 0 0 1 242 262Z" fill="#14284B"/>'),
    it(label(200, 292, 'Nord du Canada', 20, '#14284B'))
  ]);
}
function naMontrealArt() {
  var flakes = '';
  [[40, 40], [110, 70], [180, 30], [260, 60], [330, 36], [370, 90], [70, 120], [300, 120]].forEach(function (p) { flakes += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#fff"/>'; });
  return scene('Montréal sous la neige', grad('#9FB7D8', '#E3EDF8'), [
    it('<rect y="250" width="400" height="50" fill="#fff" stroke="#B9C7D8" stroke-width="3"/>'),
    it('<rect x="20" y="120" width="70" height="130" fill="#A9BED2" stroke="#14284B" stroke-width="3"/><rect x="100" y="80" width="80" height="170" fill="#8FA7C2" stroke="#14284B" stroke-width="3"/><rect x="190" y="140" width="70" height="110" fill="#B7C6D8" stroke="#14284B" stroke-width="3"/><path d="M16 120 H94 L55 96Z M96 80 H184 L140 54Z M186 140 H264 L225 116Z" fill="#fff" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/>'),
    it('<g fill="#FFD23F"><rect x="34" y="144" width="14" height="14"/><rect x="62" y="144" width="14" height="14"/><rect x="114" y="104" width="14" height="14"/><rect x="146" y="104" width="14" height="14"/><rect x="114" y="150" width="14" height="14"/><rect x="146" y="150" width="14" height="14"/><rect x="204" y="164" width="14" height="14"/><rect x="232" y="164" width="14" height="14"/></g>'),
    it('<rect x="300" y="70" width="26" height="150" rx="13" fill="#fff" stroke="#14284B" stroke-width="3"/><circle cx="313" cy="232" r="22" fill="#E63946" stroke="#14284B" stroke-width="3"/><rect x="309" y="150" width="8" height="80" fill="#E63946"/>'),
    it(label(358, 160, '−25 °C', 24, '#14284B')),
    it(flakes)
  ]);
}
function naMuertosArt() {
  var flags = '', cols = ['#E63946', '#FFD23F', '#4D96FF', '#6DBB5A', '#FF8FA3', '#F28C28'];
  for (var i = 0; i < 8; i++) { var x = 10 + i * 50; flags += '<path d="M' + x + ' 20 h40 v26 l-8 -8 l-8 8 l-8 -8 l-8 8 l-8 -8Z" fill="' + cols[i % 6] + '" stroke="#14284B" stroke-width="2"/>'; }
  function mg(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#F28C28" stroke="#C9640A" stroke-width="2"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * .45) + '" fill="#FFD23F"/>'; }
  return scene('La fête des Morts au Mexique', grad('#3B1F5A', '#7A3B8E'), [
    it('<path d="M0 20 H400" stroke="#FFD23F" stroke-width="3"/>' + flags),
    it('<ellipse cx="200" cy="170" rx="70" ry="80" fill="#fff" stroke="#14284B" stroke-width="4"/>'),
    it('<circle cx="170" cy="152" r="20" fill="#14284B"/><circle cx="230" cy="152" r="20" fill="#14284B"/><circle cx="170" cy="152" r="9" fill="#FF8FA3"/><circle cx="230" cy="152" r="9" fill="#4D96FF"/><path d="M200 174 L190 194 L210 194Z" fill="#14284B"/><path d="M160 208 H240 M172 200 V224 M186 204 V226 M200 205 V227 M214 204 V226 M228 200 V224" stroke="#14284B" stroke-width="3" fill="none" stroke-linecap="round"/>'),
    it(mg(150, 104, 14) + mg(200, 92, 16) + mg(250, 104, 14) + mg(122, 134, 10) + mg(278, 134, 10)),
    it(mg(60, 250, 16) + mg(340, 250, 16) + mg(100, 272, 12) + mg(300, 272, 12)),
    stars([[50, 90, 3], [350, 90, 3], [30, 180, 2.5], [370, 180, 2.5]])
  ]);
}
function naTacosArt() {
  function taco(x, y) {
    return '<g transform="translate(' + x + ' ' + y + ')"><path d="M-46 0 A46 46 0 0 1 46 0Z" fill="#F2C56B" stroke="#14284B" stroke-width="3"/><path d="M-38 -4 q8 -20 15 -2 q8 -20 15 -2 q8 -20 15 -2 q8 -20 15 -2" fill="none" stroke="#3C9A4A" stroke-width="7" stroke-linecap="round"/><circle cx="-14" cy="-16" r="6" fill="#E63946"/><circle cx="12" cy="-18" r="6" fill="#E63946"/><circle cx="28" cy="-10" r="5" fill="#FFD23F"/></g>';
  }
  return scene('Des tacos', grad('#FFE3C2', '#FFF6E8'), [
    it('<ellipse cx="200" cy="232" rx="170" ry="40" fill="#fff" stroke="#14284B" stroke-width="3"/>'),
    it(taco(110, 220)), it(taco(200, 190)), it(taco(290, 220)),
    it(label(200, 70, 'Tacos !', 40, '#B3242C'))
  ]);
}
function naCanalArt() {
  return scene('Le canal de Panama', grad('#BFE3F7', '#EAF6FB'), [
    sun(340, 50, 22, '#FFD23F'), cloud(60, 56, 1),
    it('<rect y="130" width="400" height="170" fill="#3C9A4A"/><path d="M165 130 L235 130 L330 300 L70 300Z" fill="#3E9BD8" stroke="#14284B" stroke-width="3"/>'),
    it('<rect x="146" y="186" width="108" height="10" rx="3" fill="#8E9AAF" stroke="#14284B" stroke-width="3"/><rect x="126" y="226" width="148" height="10" rx="3" fill="#8E9AAF" stroke="#14284B" stroke-width="3"/>'),
    it('<g transform="translate(200 270)"><path d="M-64 0 L64 0 L50 22 L-50 22Z" fill="#14284B"/><rect x="-48" y="-18" width="22" height="18" fill="#E63946" stroke="#14284B" stroke-width="2"/><rect x="-24" y="-18" width="22" height="18" fill="#FFD23F" stroke="#14284B" stroke-width="2"/><rect x="0" y="-18" width="22" height="18" fill="#4D96FF" stroke="#14284B" stroke-width="2"/><rect x="26" y="-30" width="22" height="30" fill="#fff" stroke="#14284B" stroke-width="2"/></g>'),
    it('<rect x="110" y="14" width="180" height="38" rx="19" fill="#14284B"/>' + label(200, 41, 'Canal de Panama', 20, '#fff'))
  ]);
}
function naShortcutArt() {
  return scene('Le canal : un grand raccourci', grad('#5FB3E8', '#9FD4F2'), [
    it('<path d="M120 20 L290 20 L290 70 L240 100 L214 108 L214 130 L262 150 L268 205 L220 268 L196 285 L190 205 L176 140 L150 116 L150 100 L120 80Z" fill="#6DBB5A" stroke="#3E8E3E" stroke-width="3" stroke-linejoin="round"/>'),
    it('<path d="M120 112 Q50 200 100 280 Q190 312 300 250 Q336 190 300 120" fill="none" stroke="#FF8A5D" stroke-width="5" stroke-dasharray="12 9" stroke-linecap="round"/>'),
    it('<path d="M112 118 H312" stroke="#fff" stroke-width="6" stroke-linecap="round"/>'),
    it('<g transform="translate(112 118)"><path d="M-14 -2 L14 -2 L9 8 L-9 8Z" fill="#14284B"/><rect x="-4" y="-12" width="10" height="10" fill="#E63946"/></g>'),
    it('<rect x="20" y="226" width="100" height="36" rx="18" fill="#FF8A5D"/>' + label(70, 252, 'Long !', 22, '#fff')),
    it('<rect x="296" y="86" width="96" height="36" rx="18" fill="#14284B"/>' + label(344, 112, 'Court !', 22, '#fff'))
  ]);
}
function naForestArt() {
  return scene('Une forêt en Jamaïque', grad('#BDE9B0', '#F0FADD'), [
    jungleBg(),
    it(naPalm(90, 230, 1.2) + naPalm(310, 236, 1.4)),
    it('<g transform="translate(200 60)"><ellipse cx="0" cy="0" rx="26" ry="20" fill="#fff" stroke="#14284B" stroke-width="3"/></g>' + label(200, 70, '?', 30, '#14284B'))
  ]);
}
function naJaguarArt() {
  return scene('Un jaguar dans la forêt', grad('#BDE9B0', '#F0FADD'), [
    jungleBg(),
    it('<circle cx="140" cy="108" r="22" fill="#F2B544" stroke="#14284B" stroke-width="4"/><circle cx="260" cy="108" r="22" fill="#F2B544" stroke="#14284B" stroke-width="4"/><circle cx="140" cy="108" r="10" fill="#8A5A2B"/><circle cx="260" cy="108" r="10" fill="#8A5A2B"/>'),
    it('<circle cx="200" cy="172" r="80" fill="#F2B544" stroke="#14284B" stroke-width="4"/>'),
    it('<g fill="#14284B"><circle cx="150" cy="134" r="6"/><circle cx="172" cy="120" r="5"/><circle cx="228" cy="120" r="5"/><circle cx="250" cy="134" r="6"/><circle cx="138" cy="172" r="6"/><circle cx="262" cy="172" r="6"/><circle cx="160" cy="206" r="5"/><circle cx="240" cy="206" r="5"/></g>'),
    it('<ellipse cx="170" cy="160" rx="16" ry="14" fill="#fff" stroke="#14284B" stroke-width="3"/><ellipse cx="230" cy="160" rx="16" ry="14" fill="#fff" stroke="#14284B" stroke-width="3"/><circle cx="172" cy="162" r="6" fill="#14284B"/><circle cx="228" cy="162" r="6" fill="#14284B"/>'),
    it('<path d="M190 184 L210 184 L200 196Z" fill="#E8798F" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M168 210 Q200 252 232 210 Q200 222 168 210Z" fill="#8F1D2C" stroke="#14284B" stroke-width="3"/><path d="M180 216 l5 10 l5 -8 M210 216 l5 8 l5 -10" fill="#fff" stroke="#14284B" stroke-width="2"/>'),
    it('<rect x="132" y="22" width="136" height="42" rx="21" fill="#E63946"/>' + label(200, 53, 'Grrr !', 28, '#fff'))
  ]);
}
function naCubaArt() {
  return scene('Cuba et ses voitures colorées', grad('#FFD6A8', '#9FD4F2'), [
    sun(60, 56, 24, '#FFC93C'),
    it('<rect x="20" y="120" width="90" height="116" fill="#FFB3C1" stroke="#14284B" stroke-width="3"/><rect x="120" y="96" width="100" height="140" fill="#B8E0F2" stroke="#14284B" stroke-width="3"/><rect x="230" y="130" width="90" height="106" fill="#FFE29A" stroke="#14284B" stroke-width="3"/><g fill="#14284B" opacity=".55"><rect x="36" y="140" width="16" height="22"/><rect x="70" y="140" width="16" height="22"/><rect x="138" y="116" width="16" height="22"/><rect x="186" y="116" width="16" height="22"/><rect x="250" y="150" width="16" height="22"/><rect x="284" y="150" width="16" height="22"/></g>'),
    it('<rect y="232" width="400" height="68" fill="#CFC3A6"/><path d="M0 232 H400" stroke="#14284B" stroke-width="3"/>'),
    it(naPalm(356, 240, 1.1)),
    it('<g transform="translate(180 262)"><path d="M-80 0 L-80 -26 Q-70 -34 -50 -34 L-34 -56 Q-30 -62 -20 -62 L30 -62 Q40 -62 46 -54 L62 -34 Q82 -32 84 -20 L84 0Z" fill="#1FB5A8" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M-28 -54 L-40 -34 H-4 V-54Z M6 -54 V-34 H52 L38 -54Z" fill="#D6F0FA" stroke="#14284B" stroke-width="2"/><rect x="-84" y="-8" width="170" height="6" fill="#E8E8EE" stroke="#14284B" stroke-width="2"/><circle cx="-48" cy="2" r="15" fill="#14284B"/><circle cx="-48" cy="2" r="6" fill="#C9D0DA"/><circle cx="56" cy="2" r="15" fill="#14284B"/><circle cx="56" cy="2" r="6" fill="#C9D0DA"/></g>')
  ]);
}
function naPigsArt() {
  function pig(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse cx="0" cy="0" rx="34" ry="22" fill="#FFB3C1" stroke="#14284B" stroke-width="3"/><path d="M-22 -16 L-30 -34 L-12 -22Z M6 -20 L16 -36 L22 -16Z" fill="#FFB3C1" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><ellipse cx="34" cy="4" rx="14" ry="11" fill="#FF8FA3" stroke="#14284B" stroke-width="3"/><circle cx="30" cy="4" r="2.4" fill="#14284B"/><circle cx="38" cy="4" r="2.4" fill="#14284B"/><circle cx="14" cy="-8" r="3" fill="#14284B"/></g>'; }
  return scene('Des gens nagent avec des cochons aux Bahamas', grad('#7FE0F0', '#2FB5D8'), [
    it('<path d="M250 130 Q300 96 372 108 L400 120 V170 Q330 186 270 168Z" fill="#F2D49B" stroke="#14284B" stroke-width="3"/>' + naPalm(340, 120, .8)),
    it(pig(100, 178, 1)), it(pig(220, 206, .9)), it(pig(300, 190, .8)),
    it('<circle cx="170" cy="150" r="11" fill="#F2C9A0" stroke="#14284B" stroke-width="3"/><path d="M158 148 q12 -12 24 0" fill="#6B4A2B" stroke="#14284B" stroke-width="2"/>'),
    it('<path d="M0 190 q25 -12 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V300 H0Z" fill="#2FB5D8" opacity=".78"/>' + waves(240, '#fff', .55) + waves(276, '#fff', .45)),
    it('<rect x="120" y="22" width="160" height="42" rx="21" fill="#14284B"/>' + label(200, 53, 'Plouf !', 28, '#fff'))
  ]);
}
function naIslandsArt() {
  return scene('Les deux îles de Trinité-et-Tobago', grad('#7FE0F0', '#2FB5D8'), [
    it(waves(40, '#fff', .5) + waves(274, '#fff', .5)),
    it('<path d="M34 176 Q54 134 130 144 Q196 142 216 176 Q226 226 164 244 Q80 258 44 220Z" fill="#F2D49B" stroke="#14284B" stroke-width="3"/><path d="M58 178 Q78 154 130 158 Q180 158 194 180 Q200 214 156 226 Q92 238 62 210Z" fill="#6DBB5A"/>'),
    it('<path d="M262 66 Q292 46 342 58 Q374 86 342 120 Q298 136 264 108Z" fill="#F2D49B" stroke="#14284B" stroke-width="3"/><path d="M280 76 Q300 62 334 70 Q352 88 332 104 Q304 112 284 98Z" fill="#6DBB5A"/>'),
    it(label(126, 200, 'Trinité', 28, '#14284B')),
    it(label(308, 94, 'Tobago', 22, '#14284B'))
  ]);
}
function naToucanArt() {
  return scene('Un toucan dans la forêt du Costa Rica', grad('#BDE9B0', '#F0FADD'), [
    jungleBg(),
    it('<path d="M0 190 Q100 170 220 184 T400 170" fill="none" stroke="#6B4A2B" stroke-width="16" stroke-linecap="round"/>'),
    it('<g transform="translate(200 160)"><path d="M-8 24 l-4 24 M8 24 l4 24" stroke="#F28C28" stroke-width="5" stroke-linecap="round"/><ellipse cx="0" cy="-20" rx="34" ry="46" fill="#14284B"/><ellipse cx="6" cy="-14" rx="18" ry="28" fill="#FFF3B0"/><circle cx="12" cy="-70" r="22" fill="#14284B"/><circle cx="18" cy="-74" r="6" fill="#fff"/><circle cx="20" cy="-74" r="3" fill="#14284B"/><path d="M26 -78 Q80 -86 84 -60 Q70 -54 28 -58Z" fill="#F28C28" stroke="#14284B" stroke-width="3" stroke-linejoin="round"/><path d="M62 -80 Q84 -78 84 -60 Q76 -57 66 -58Z" fill="#E63946"/></g>'),
    it(naPalm(340, 250, 1.1))
  ]);
}
function naFinArt() {
  var codes = ['us', 'ca', 'mx', 'pa', 'jm', 'cu', 'bs', 'tt', 'cr'], out = [];
  codes.forEach(function (c, i) {
    var row = i < 5 ? 0 : 1, col = i % 5, w = 56, x = 32 + col * 70 + (row ? 35 : 0), y = row ? 196 : 112;
    out.push(it('<rect x="' + (x + w / 2 - 2) + '" y="' + (y - 14) + '" width="4" height="14" fill="#8A6B4A"/>' + flagArt(c, x, y, w)));
  });
  return scene('Tous les drapeaux visités', grad('#FFE3C2', '#FFF6E8'), [it(label(200, 84, 'Fin', 64)), it('<path d="M0 98 H400 M0 182 H400" stroke="#14284B" stroke-width="3"/>')].concat(out));
}
function naCoverArt() {
  var cs = [['us', 30, 36, -8], ['ca', 150, 28, 5], ['mx', 270, 40, -5], ['cu', 36, 150, 6], ['jm', 156, 160, -6], ['cr', 276, 148, 8]], g = '';
  cs.forEach(function (c) { g += '<g transform="rotate(' + c[3] + ' ' + (c[1] + 50) + ' ' + (c[2] + 33) + ')">' + flagArt(c[0], c[1], c[2], 100) + '</g>'; });
  return scene('Plein de drapeaux d’Amérique du Nord', grad('#2EC4B6', '#0B7A75'), [sparkle(20, 20, 3), sparkle(380, 270, 3), sparkle(350, 20, 2.5), it(g)]);
}

STORIES.splice(3, 0, {
  title: 'Voyage en Amérique du Nord', coverArt: naCoverArt, mark: '?',
  tiles: ['us', 'ca', 'mx', 'pa', 'jm', 'cu', 'bs', 'tt', 'cr'].map(flagTile),
  scenes: [
    { tile: -1, text: 'Asie, puis Amérique du Nord !', art: naIntroArt },

    { tile: 0, text: 'Voici les États-Unis d’Amérique. Capitale : Washington D.C. Langue principale : anglais.', art: flagSceneA('us', 'États-Unis', '#D3E2F8', '#FBEDEE', 24, 200) },
    { tile: 0, text: 'Regarde ! Le drapeau des États-Unis a 13 bandes blanches et rouges, symbolisant les 13 premiers États. Les 50 étoiles représentent les 50 États d’aujourd’hui.', art: naFlagBigArt },
    { tile: 0, text: 'On est au-dessus de New York. Voici l’élégante Statue de la Liberté. Direction : le Canada.', art: naLibertyArt },

    { tile: 1, text: 'Bienvenue au Canada. Capitale : Ottawa. Langues principales : anglais et français.', art: flagSceneA('ca', 'Canada', '#F8D5D5', '#FDF1F1') },
    { tile: 1, text: 'On est au nord du Canada. Le Canada est aussi le deuxième plus grand pays du monde, après la Russie.', art: naCanadaNorthArt },
    { tile: 1, text: 'Direction la ville de Montréal. Montréal est une ville froide et, dehors, des fois, il fait moins 25 degrés. Prochain pays : le Mexique.', art: naMontrealArt },

    { tile: 2, text: 'Voici le Mexique. Capitale : Mexico. Mexico est la plus grande ville du monde.', art: flagSceneA('mx', 'Mexique', '#D6EFD6', '#FBEDEE') },
    { tile: 2, text: 'Regarde ! Il y a une fête là-bas ! C’est la fête des Morts. On y va ? Oui ! C’est beau ! Lalalalalalalalalalalala !', art: naMuertosArt },
    { tile: 2, text: 'Oh ! Des tacos ! Miam ! Miam ! Allons au Panama.', art: naTacosArt },

    { tile: 3, text: 'Voici Panama. Capitale : Panama City.', art: flagSceneA('pa', 'Panama', '#D3E2F8', '#FBEDEE') },
    { tile: 3, text: 'Regarde ! C’est le canal de Panama.', art: naCanalArt },
    { tile: 3, text: 'Avant, les bateaux devaient faire un tour par le sud de l’Amérique du Sud, ce qui était long. Après l’ouverture du canal de Panama, le canal ouvre ses grandes portes pour laisser passer les bateaux. Direction suivante : la Jamaïque.', art: naShortcutArt },

    { tile: 4, text: 'Bienvenue en Jamaïque. Capitale : Kingston.', art: flagSceneA('jm', 'Jamaïque', '#D6EFD6', '#FFF6C9') },
    { tile: 4, text: 'Voici une forêt. C’est quoi, ce qu’on entend ?', art: naForestArt },
    { tile: 4, text: 'C’est… C’est un jaguar. Au secours !!! Direction : Cuba. On va où tu veux, du moment qu’on quitte cet endroit !', art: naJaguarArt },

    { tile: 5, text: 'Voici Cuba. Capitale : La Havane.', art: flagSceneA('cu', 'Cuba', '#D3E2F8', '#FBEDEE') },
    { tile: 5, text: 'C’est tellement, tellement beau, Cuba ! Direction suivante : les Bahamas.', art: naCubaArt },

    { tile: 6, text: 'Bienvenue aux Bahamas. Capitale : Nassau.', art: flagSceneA('bs', 'Bahamas', '#C7F0F5', '#FFF6C9') },
    { tile: 6, text: 'Oh ! Voici une île des Bahamas où des gens nagent avec des cochons. Allons-y ! Plouf ! Bllll ! Plouf ! Direction : Trinité-et-Tobago.', art: naPigsArt },

    { tile: 7, text: 'Voici Trinité-et-Tobago. Capitale : Port d’Espagne.', art: flagSceneA('tt', 'Trinité-et-Tobago', '#F8D5D5', '#FDF1F1', 19, 270) },
    { tile: 7, text: 'Trinité-et-Tobago est fait de deux îles : l’île de Trinité et l’île de Tobago. Prochaine destination : Costa Rica. Let’s go !', art: naIslandsArt },

    { tile: 8, text: 'Bienvenue au Costa Rica. Capitale : San José.', art: flagSceneA('cr', 'Costa Rica', '#D3E2F8', '#FBEDEE') },
    { tile: 8, text: 'Regarde ! Une forêt. C’est une forêt. C’est ce que je viens de dire !', art: naToucanArt },
    { tile: 8, text: 'Fin', art: naFinArt }
  ]
});

/* ---------- Étagère ---------- */
var shelf = document.getElementById('shelf');
STORIES.forEach(function (s, i) {
  var secs = Math.round(s.scenes.reduce(function (a, c) { return a + c.text.length; }, 0) / 14);
  var li = document.createElement('li');
  li.innerHTML = '<button class="card" type="button" data-i="' + i + '" aria-label="Écouter : ' + s.title + '"><span class="pic">' + render(s.coverArt || s.scenes[s.cover].art) + '</span>' +
    '<span class="meta"><h2>' + s.title + '</h2><span class="chip">' + P.play + 'Écouter · ' + secs + ' s</span></span></button>';
  shelf.appendChild(li);
});

/* ---------- Lecteur ---------- */
var $ = function (id) { return document.getElementById(id); };
var stage = $('stage'), frame = $('frame'), strip = $('strip'), caption = $('caption'), toggle = $('toggle');
var bed = $('bed'), voice = $('voice');
var story = null, scenes = [], tiles = [], idx = -1, token = 0, state = 'idle', lastCard = null, guard = null;
var tts = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
var frVoice = null;
function pickVoice() {
  if (!tts) return;
  var vs = speechSynthesis.getVoices();
  frVoice = vs.filter(function (v) { return /^fr[-_]FR/i.test(v.lang); })[0] || vs.filter(function (v) { return /^fr/i.test(v.lang); })[0] || null;
}
if (tts) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function setToggle(s) {
  state = s;
  toggle.innerHTML = s === 'playing' ? P.pause + 'Pause' : s === 'paused' ? P.play + 'Reprendre' : P.redo + 'Réécouter';
}
function stopAll() {
  token++; clearTimeout(guard);
  if (tts) speechSynthesis.cancel();
  voice.pause(); bed.pause();
}
function openStory(i) {
  story = STORIES[i];
  $('stTitle').textContent = story.title;
  frame.innerHTML = ''; strip.innerHTML = ''; scenes = []; tiles = [];
  story.scenes.forEach(function (sc) {
    var d = document.createElement('div'); d.className = 'scene'; d.innerHTML = render(sc.art); frame.appendChild(d); scenes.push(d);
  });
  var tl = story.tiles || story.scenes.map(function (s) { return s.art; });
  tl.forEach(function (a, k) {
    var li = document.createElement('li'); li.className = 'tile'; li.innerHTML = '<b>' + (story.mark || (k + 1)) + '</b>' + render(a); strip.appendChild(li); tiles.push(li);
  });
  strip.style.gridTemplateColumns = tl.length > 6 ? 'repeat(auto-fill, minmax(72px, 1fr))' : 'repeat(' + tl.length + ', 1fr)';
  stage.hidden = false; document.body.style.overflow = 'hidden'; stage.scrollTop = 0;
  start();
  toggle.focus();
}
function closeStory() {
  stopAll(); stage.hidden = true; document.body.style.overflow = '';
  if (lastCard) lastCard.focus();
}
function show(n) {
  idx = n;
  scenes.forEach(function (s, k) { if (k !== n) s.classList.remove('on'); });
  void scenes[n].offsetWidth;
  scenes[n].classList.add('on');
  var ti = story.scenes[n].tile; if (ti === undefined) ti = n;
  tiles.forEach(function (t, k) { t.classList.toggle('got', k <= ti); t.classList.toggle('now', k === ti); });
}
function setCaption(text) {
  caption.innerHTML = '';
  caption.className = 'caption' + (text.length > 140 ? ' long' : '');
  var re = /\S+/g, m;
  while ((m = re.exec(text))) {
    var w = document.createElement('span'); w.className = 'w'; w.dataset.s = m.index; w.textContent = m[0];
    caption.appendChild(w); caption.appendChild(document.createTextNode(' '));
  }
}
function light(charIndex) {
  var cur = null;
  caption.querySelectorAll('.w').forEach(function (w) { w.classList.remove('now'); if (+w.dataset.s <= charIndex) cur = w; });
  if (cur) cur.classList.add('now');
}
function start() {
  stopAll();
  var t = ++token;
  idx = -1;
  tiles.forEach(function (x) { x.classList.remove('got', 'now'); });
  scenes.forEach(function (x) { x.classList.remove('on'); });
  bed.currentTime = 0; bed.volume = .16;
  var p = bed.play(); if (p && p.catch) p.catch(function () {});
  setToggle('playing');
  if (story.audio) return playFile(t);
  go(0, t);
}
function resume() {
  var t = ++token;
  var p = bed.play(); if (p && p.catch) p.catch(function () {});
  setToggle('playing');
  if (story.audio) { voice.play(); return; }
  go(Math.max(idx, 0), t);
}
function pauseIt() {
  token++; clearTimeout(guard);
  if (tts) speechSynthesis.cancel();
  voice.pause(); bed.pause();
  setToggle('paused');
}
function go(n, t) {
  if (t !== token) return;
  if (n >= story.scenes.length) return finish(t);
  show(n);
  say(story.scenes[n].text, t, function () { guard = setTimeout(function () { go(n + 1, t); }, 900); });
}
function say(text, t, done) {
  setCaption(text);
  var over = false;
  function fin() { if (over || t !== token) return; over = true; clearTimeout(guard); done(); }
  var est = Math.max(3500, text.length * 85);
  if (!tts) { guard = setTimeout(fin, est); return; }
  var u = new SpeechSynthesisUtterance(text);
  u.lang = 'fr-FR'; u.rate = .86; u.pitch = 1.12;
  if (frVoice) u.voice = frVoice;
  u.onboundary = function (e) { if (t === token) light(e.charIndex || 0); };
  u.onend = fin;
  u.onerror = function () { clearTimeout(guard); guard = setTimeout(fin, est); };
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
  guard = setTimeout(fin, est * 2.5 + 2500);
}
function playFile(t) {
  voice.src = story.audio; voice.currentTime = 0;
  voice.ontimeupdate = function () {
    if (t !== token) return;
    var n = -1;
    story.scenes.forEach(function (s, k) { if (voice.currentTime >= (s.at || 0)) n = k; });
    if (n >= 0 && n !== idx) { show(n); setCaption(story.scenes[n].text); }
  };
  voice.onended = function () { finish(t); };
  voice.play().catch(function () { setToggle('paused'); });
}
function finish(t) {
  if (t !== token) return;
  clearTimeout(guard);
  caption.querySelectorAll('.w').forEach(function (w) { w.classList.remove('now'); });
  var v = 16, fade = setInterval(function () {
    v--; bed.volume = Math.max(0, v / 100);
    if (v <= 0) { clearInterval(fade); bed.pause(); }
  }, 120);
  setToggle('done');
}

$('shelf').addEventListener('click', function (e) {
  var b = e.target.closest('.card'); if (!b) return;
  lastCard = b; openStory(+b.dataset.i);
});
$('close').addEventListener('click', closeStory);
$('again').addEventListener('click', start);
toggle.addEventListener('click', function () {
  if (state === 'playing') pauseIt();
  else if (state === 'paused') resume();
  else start();
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !stage.hidden) closeStory(); });
