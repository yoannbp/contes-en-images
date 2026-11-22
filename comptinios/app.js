/* ---------- Comptinios ---------- */
/* Une comptine = un titre, un morceau Spotify (uri), une image (art). Pour en ajouter : une entrée dans COMPTINES. */
var gid = 0;
function crocArt() {
  var id = 'cg' + (++gid);
  return '<svg viewBox="0 0 400 300" role="img" aria-label="Un crocodile souriant dans l’eau">' +
    '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE8FF"/><stop offset="1" stop-color="#EAF8D7"/></linearGradient></defs>' +
    '<rect width="400" height="300" fill="url(#' + id + ')"/>' +
    '<circle cx="330" cy="58" r="40" fill="#FFD23F" opacity=".25"/><circle cx="330" cy="58" r="26" fill="#FFD23F"/>' +
    '<g fill="#fff" opacity=".92"><circle cx="70" cy="56" r="16"/><circle cx="92" cy="48" r="20"/><circle cx="118" cy="58" r="14"/><rect x="54" y="58" width="76" height="14" rx="7"/></g>' +
    '<rect y="170" width="400" height="130" fill="#3E9BD8"/>' +
    '<path d="M30 182 V126 M44 184 V104 M58 182 V132 M350 186 V120 M364 188 V100" stroke="#5D8F44" stroke-width="6" stroke-linecap="round"/>' +
    '<g transform="translate(196 184)">' +
      '<path d="M-176 22 Q-136 -22 -96 -8 L-96 32Z" fill="#5E9B3A"/>' +
      '<ellipse cx="-30" cy="6" rx="112" ry="40" fill="#5E9B3A"/>' +
      '<g fill="#3F7A2A"><path d="M-110 -30 l8 -14 l8 14Z"/><path d="M-84 -34 l8 -14 l8 14Z"/><path d="M-58 -36 l8 -14 l8 14Z"/><path d="M-32 -36 l8 -14 l8 14Z"/><path d="M-6 -34 l8 -14 l8 14Z"/><path d="M18 -30 l8 -14 l8 14Z"/></g>' +
      '<path d="M54 -20 L186 -8 Q202 6 186 14 L58 14Z" fill="#6DAE45"/>' +
      '<path d="M58 16 L184 20 Q194 30 178 40 L66 42Z" fill="#6DAE45"/>' +
      '<path d="M58 14 L186 14 L184 20 L58 16Z" fill="#B3242C"/>' +
      '<path d="M70 14 l6 -10 l6 10Z M92 14 l6 -10 l6 10Z M114 14 l6 -10 l6 10Z M136 14 l6 -10 l6 10Z M158 14 l6 -10 l6 10Z" fill="#fff"/>' +
      '<path d="M82 16 l6 10 l6 -10Z M104 17 l6 10 l6 -10Z M126 18 l6 10 l6 -10Z M148 19 l6 10 l6 -10Z" fill="#fff"/>' +
      '<circle cx="78" cy="-30" r="16" fill="#fff"/><circle cx="82" cy="-30" r="7" fill="#14284B"/><circle cx="84" cy="-33" r="2.4" fill="#fff"/>' +
      '<circle cx="124" cy="-22" r="14" fill="#fff"/><circle cx="128" cy="-22" r="6" fill="#14284B"/><circle cx="130" cy="-25" r="2" fill="#fff"/>' +
      '<circle cx="176" cy="-2" r="3" fill="#3F7A2A"/>' +
    '</g>' +
    '<path d="M0 214 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V300 H0Z" fill="#3E9BD8" opacity=".9"/>' +
    '<path d="M0 232 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>' +
    '<path d="M0 270 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>' +
  '</svg>';
}
function candyArt() {
  var id = 'cc' + (++gid), bg = 'cb' + gid;
  return '<svg viewBox="0 0 400 300" role="img" aria-label="Un gros bonbon rayé avec son papier">' +
    '<defs><linearGradient id="' + bg + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD6E8"/><stop offset="1" stop-color="#FFF3DC"/></linearGradient>' +
    '<clipPath id="' + id + '"><circle cx="200" cy="150" r="64"/></clipPath></defs>' +
    '<rect width="400" height="300" fill="url(#' + bg + ')"/>' +
    '<g fill="#fff" opacity=".9"><path d="M60 60 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5Z"/><path d="M340 70 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4Z"/><path d="M330 236 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5Z"/><path d="M70 232 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4Z"/></g>' +
    '<ellipse cx="200" cy="246" rx="96" ry="12" fill="#14284B" opacity=".12"/>' +
    '<path d="M138 150 L72 108 Q60 150 72 192Z" fill="#FF8FB8" stroke="#14284B" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M262 150 L328 108 Q340 150 328 192Z" fill="#FF8FB8" stroke="#14284B" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M110 140 L82 124 M110 150 L78 150 M110 160 L82 176 M290 140 L318 124 M290 150 L322 150 M290 160 L318 176" stroke="#14284B" stroke-width="3" stroke-linecap="round" opacity=".55"/>' +
    '<circle cx="200" cy="150" r="64" fill="#FF5D8F"/>' +
    '<g clip-path="url(#' + id + ')"><g stroke="#fff" stroke-width="14" stroke-linecap="round">' +
      '<path d="M120 80 L280 220"/><path d="M96 118 L238 250"/><path d="M150 62 L300 192"/><path d="M104 178 L196 266"/><path d="M200 50 L304 150"/></g></g>' +
    '<circle cx="200" cy="150" r="64" fill="none" stroke="#14284B" stroke-width="4"/>' +
    '<path d="M162 112 Q176 96 196 92" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85"/>' +
    '<circle cx="58" cy="196" r="16" fill="#8FD0F0" stroke="#14284B" stroke-width="3"/><circle cx="330" cy="40" r="14" fill="#FFD23F" stroke="#14284B" stroke-width="3"/>' +
  '</svg>';
}
var COMPTINES = [
  { title: 'Ah ! les crocodiles', uri: 'spotify:track:5jjltOC5Jzto54fcojObdK', art: crocArt },
  { title: 'Ah ! vous dirai-je, maman', uri: 'spotify:track:79dF82cCKxxrO7I05CykxP', art: candyArt }
];

var $ = function (id) { return document.getElementById(id); };
var shelf = $('shelf'), stage = $('stage'), art = $('art'), fill = $('fill'), bar = $('bar'), note = $('note'), toggle = $('toggle');
var ctrl = null, current = -1, dur = 0, pos = 0, paused = true, stamp = 0, lastCard = null;

COMPTINES.forEach(function (c, i) {
  var li = document.createElement('li');
  li.innerHTML = '<button class="card" type="button" data-i="' + i + '"><span class="pic">' + c.art() + '</span>' +
    '<span class="meta"><h2></h2><span class="chip">Écouter</span></span></button>';
  li.querySelector('h2').textContent = c.title;
  shelf.appendChild(li);
});

function fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
function render() {
  var p = pos;
  if (!paused && stamp) p = Math.min(dur || pos, pos + (performance.now() - stamp) / 1000);
  var ratio = dur > 0 ? Math.min(1, p / dur) : 0;
  fill.style.width = (ratio * 100).toFixed(2) + '%';
  bar.setAttribute('aria-valuenow', Math.round(ratio * 100));
  $('elapsed').textContent = fmt(p);
  $('remain').textContent = '−' + fmt(dur - p);
}
function setLabel() {
  var done = dur > 0 && pos >= dur - 0.5;
  toggle.textContent = !paused ? 'Pause' : done ? 'Réécouter' : pos > 0 ? 'Reprendre' : 'Écouter';
}
(function loop() { if (current >= 0 && !paused) render(); requestAnimationFrame(loop); })();

function onUpdate(e) {
  if (current < 0 || !e || !e.data) return;
  var d = e.data;
  dur = (d.duration || 0) / 1000; pos = (d.position || 0) / 1000; paused = !!d.isPaused; stamp = performance.now();
  note.textContent = dur > 0 && dur <= 31 ? 'Aperçu de 30 secondes. Connecte-toi à Spotify dans le lecteur en bas de l’écran pour entendre la comptine en entier.' : '';
  render(); setLabel();
}

window.onSpotifyIframeApiReady = function (IFrameAPI) {
  IFrameAPI.createController($('embed'), { uri: COMPTINES[0].uri, width: '100%', height: 80 }, function (c) {
    ctrl = c;
    c.addListener('playback_update', onUpdate);
  });
};

function openComptine(i) {
  current = i; dur = 0; pos = 0; paused = true; stamp = 0;
  $('stTitle').textContent = COMPTINES[i].title;
  art.innerHTML = COMPTINES[i].art();
  note.textContent = ctrl ? '' : 'Le lecteur Spotify se charge… Touche « Écouter » dans un instant.';
  render(); setLabel();
  stage.hidden = false; document.body.style.overflow = 'hidden'; stage.scrollTop = 0;
  if (ctrl) { ctrl.loadUri(COMPTINES[i].uri); ctrl.play(); }
  toggle.focus();
}
function closeComptine() {
  if (ctrl) ctrl.pause();
  current = -1; stage.hidden = true; document.body.style.overflow = '';
  if (lastCard) lastCard.focus();
}
shelf.addEventListener('click', function (e) {
  var b = e.target.closest('.card'); if (!b) return;
  lastCard = b; openComptine(+b.dataset.i);
});
toggle.addEventListener('click', function () {
  if (!ctrl) { note.textContent = 'Le lecteur Spotify n’est pas encore prêt. Vérifie la connexion internet.'; return; }
  if (paused && dur > 0 && pos >= dur - 0.5) { ctrl.seek(0); }
  ctrl.togglePlay();
});
$('close').addEventListener('click', closeComptine);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !stage.hidden) closeComptine(); });
setTimeout(function () { if (!ctrl) { $('embed').textContent = 'Le lecteur Spotify ne s’est pas chargé. Vérifie la connexion internet.'; } }, 8000);
