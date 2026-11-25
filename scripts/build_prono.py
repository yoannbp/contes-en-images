#!/usr/bin/env python3
"""Génère prono.html : page d'écoute et de validation des prononciations (PRONO de app.js).

Usage : python3 scripts/build_prono.py
À relancer après chaque changement de PRONO (la page contient une copie de la liste).
"""
import json
import os
import re

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
js = open(os.path.join(root, 'app.js'), encoding='utf-8').read()
block = re.search(r'var PRONO = \{(.*?)\n?\};', js, re.S).group(1)
pairs = re.findall(r"'([^']+)':\s*'([^']*)'", block)
data = json.dumps([[k, v] for k, v in pairs], ensure_ascii=False)

PAGE = r'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Prononciations</title>
<style>
:root { --bg:#E6F3FB; --card:#fff; --ink:#14284B; --muted:#47608A; --line:#C5D6E8; --ok:#1F8A4C; --ko:#C8372D; --accent:#FF6B4A; }
@media (prefers-color-scheme: dark) { :root { --bg:#0E1A33; --card:#172647; --ink:#F1F5FF; --muted:#A8B8D8; --line:#2B3F6B; --ok:#4CC27F; --ko:#FF7A6E; } }
* { box-sizing:border-box; }
body { margin:0; padding:20px 16px 60px; background:var(--bg); color:var(--ink); font:16px/1.4 system-ui, sans-serif; }
.wrap { max-width:860px; margin:0 auto; }
h1 { margin:0 0 4px; font-size:1.6rem; }
p.sub { margin:0 0 14px; color:var(--muted); }
.bar { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:14px; }
button, select, input { font:inherit; color:inherit; }
button { cursor:pointer; border:2px solid var(--ink); background:var(--card); border-radius:999px; padding:6px 14px; font-weight:700; }
button.main { background:var(--accent); color:#14284B; }
button:focus-visible, input:focus-visible, select:focus-visible { outline:3px solid var(--accent); outline-offset:2px; }
.row { display:grid; grid-template-columns: minmax(110px,1fr) minmax(130px,1.3fr) auto auto; gap:8px; align-items:center;
  background:var(--card); border:2px solid var(--line); border-radius:14px; padding:8px 10px; margin-bottom:8px; }
.row.ok { border-color:var(--ok); } .row.ko { border-color:var(--ko); }
.name { font-weight:700; }
.row input { width:100%; border:2px solid var(--line); border-radius:8px; padding:6px 8px; background:transparent; }
.row.changed input { border-color:var(--accent); }
.acts { display:flex; gap:6px; }
.acts button { padding:4px 11px; }
.v-ok.on { background:var(--ok); color:#fff; border-color:var(--ok); }
.v-ko.on { background:var(--ko); color:#fff; border-color:var(--ko); }
@media (max-width:560px) { .row { grid-template-columns:1fr 1fr; } }
textarea { width:100%; min-height:130px; border:2px solid var(--line); border-radius:12px; padding:10px; background:var(--card); font:13px/1.4 ui-monospace, monospace; }
.msg { color:var(--muted); font-size:.9rem; }
</style></head><body><div class="wrap">
<h1>Prononciations</h1>
<p class="sub">Écoute chaque mot « tel qu’écrit » puis avec la prononciation ; modifie l’écriture si besoin ; valide ✓ ou marque à revoir ✗. Les choix restent dans ce navigateur.</p>
<div class="bar">
  <label>Voix <select id="voice"></select></label>
  <button class="main" id="all" type="button">▶ Tout écouter</button>
  <button id="stop" type="button">■ Stop</button>
  <span class="msg" id="count"></span>
</div>
<div id="list"></div>
<h2 style="font-size:1.1rem;margin:22px 0 6px">Résultat à me renvoyer</h2>
<p class="sub">Les prononciations modifiées et celles à revoir. Copie ce texte dans le chat.</p>
<textarea id="out" readonly></textarea>
<div class="bar" style="margin-top:8px"><button id="copy" type="button">Copier</button><button id="reset" type="button">Tout remettre à zéro</button><span class="msg" id="cm"></span></div>
</div>
<script>
var DATA = __DATA__;
var KEY = 'prono-v1', st = {};
try { st = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { st = {}; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
var tts = 'speechSynthesis' in window;
var vs = document.getElementById('voice'), list = document.getElementById('list'), out = document.getElementById('out');
var voices = [];
function loadVoices() {
  if (!tts) return;
  voices = speechSynthesis.getVoices().filter(function (v) { return /^fr/i.test(v.lang); });
  var cur = vs.value;
  vs.innerHTML = '';
  voices.forEach(function (v, i) { var o = document.createElement('option'); o.value = i; o.textContent = v.name + ' (' + v.lang + ')'; vs.appendChild(o); });
  var def = voices.findIndex(function (v) { return /google.*fran/i.test(v.name); });
  if (def < 0) def = voices.findIndex(function (v) { return /^fr[-_]FR/i.test(v.lang); });
  vs.value = cur || (def >= 0 ? def : 0);
}
if (tts) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
var queue = 0;
function say(text, done) {
  if (!tts) { alert('Synthèse vocale indisponible sur ce navigateur.'); return; }
  speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(text);
  u.lang = 'fr-FR'; u.rate = .86; u.pitch = 1.12;
  if (voices[vs.value]) u.voice = voices[vs.value];
  u.onend = function () { if (done) done(); };
  u.onerror = function () { if (done) done(); };
  speechSynthesis.speak(u);
}
function cur(k, orig) { return st[k] && st[k].t !== undefined ? st[k].t : orig; }
function render() {
  list.innerHTML = '';
  DATA.forEach(function (p, i) {
    var k = p[0], orig = p[1], s = st[k] || {};
    var row = document.createElement('div');
    row.className = 'row' + (s.v ? ' ' + s.v : '') + (cur(k, orig) !== orig ? ' changed' : '');
    row.innerHTML = '<div class="name"></div><input type="text" aria-label="Prononciation de ' + k.replace(/"/g, '&quot;') + '">' +
      '<div class="acts"><button type="button" class="w" title="Écouter tel qu’écrit">▶ écrit</button><button type="button" class="p main" title="Écouter la prononciation">▶ prono</button></div>' +
      '<div class="acts"><button type="button" class="v-ok' + (s.v === 'ok' ? ' on' : '') + '" title="Valider">✓</button><button type="button" class="v-ko' + (s.v === 'ko' ? ' on' : '') + '" title="À revoir">✗</button></div>';
    row.querySelector('.name').textContent = k;
    var inp = row.querySelector('input'); inp.value = cur(k, orig);
    inp.addEventListener('input', function () { st[k] = st[k] || {}; st[k].t = inp.value; save(); row.classList.toggle('changed', inp.value !== orig); summary(); });
    row.querySelector('.w').addEventListener('click', function () { say(k); });
    row.querySelector('.p').addEventListener('click', function () { say(inp.value); });
    function setV(v) { st[k] = st[k] || {}; st[k].v = st[k].v === v ? undefined : v; save(); render(); }
    row.querySelector('.v-ok').addEventListener('click', function () { setV('ok'); });
    row.querySelector('.v-ko').addEventListener('click', function () { setV('ko'); });
    list.appendChild(row);
  });
  summary();
}
function summary() {
  var ch = [], ko = [], ok = 0;
  DATA.forEach(function (p) {
    var k = p[0], s = st[k] || {}, t = cur(k, p[1]);
    if (t !== p[1]) ch.push("  '" + k + "': '" + t + "',");
    if (s.v === 'ko') ko.push(k + ' (actuel : ' + t + ')');
    if (s.v === 'ok') ok++;
  });
  document.getElementById('count').textContent = ok + ' validée(s) sur ' + DATA.length;
  out.value = (ch.length ? 'Modifiées :\n' + ch.join('\n') + '\n\n' : '') + (ko.length ? 'À revoir :\n- ' + ko.join('\n- ') + '\n\n' : '') +
    (ch.length || ko.length ? '' : 'Aucune modification, rien à revoir.\n') + 'Validées : ' + ok + '/' + DATA.length;
}
document.getElementById('all').addEventListener('click', function () {
  var n = ++queue, i = 0, rows = list.querySelectorAll('.row');
  (function next() {
    if (n !== queue || i >= rows.length) return;
    var r = rows[i++]; r.scrollIntoView({ block: 'center', behavior: 'smooth' });
    say(r.querySelector('input').value, function () { setTimeout(next, 500); });
  })();
});
document.getElementById('stop').addEventListener('click', function () { queue++; if (tts) speechSynthesis.cancel(); });
document.getElementById('copy').addEventListener('click', function () {
  var m = document.getElementById('cm');
  out.select();
  (navigator.clipboard ? navigator.clipboard.writeText(out.value) : Promise.reject()).then(function () { m.textContent = 'Copié.'; }, function () { try { document.execCommand('copy'); m.textContent = 'Copié.'; } catch (e) { m.textContent = 'Copie manuelle : sélectionne le texte.'; } });
});
document.getElementById('reset').addEventListener('click', function () { if (confirm('Effacer toutes les validations et modifications ?')) { st = {}; save(); render(); } });
render();
</script></body></html>
'''
assert '</script' not in data
page = PAGE.replace('__DATA__', data)
with open(os.path.join(root, 'prono.html'), 'w', encoding='utf-8') as f:
    f.write(page)
print('prono.html :', len(pairs), 'entrées')
