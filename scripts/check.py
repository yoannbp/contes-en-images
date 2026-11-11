#!/usr/bin/env python3
"""Vérifie que chaque scène, chaque case de drapeau et chaque couverture s'affichent sans erreur.
Usage : python3 scripts/check.py   (nécessite : pip install playwright && playwright install chromium)"""
import pathlib, sys
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
errors, bad = [], []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.goto((root / 'index.html').as_uri())
    pg.wait_for_timeout(300)
    res = pg.evaluate("""() => STORIES.map(s => {
      const bad = [];
      s.scenes.forEach((sc, i) => { try { render(sc.art); } catch (e) { bad.push('scène ' + i + ' : ' + e.message); } });
      (s.tiles || []).forEach((t, i) => { try { t(); } catch (e) { bad.push('case ' + i + ' : ' + e.message); } });
      try { render(s.coverArt || s.scenes[s.cover].art); } catch (e) { bad.push('couverture : ' + e.message); }
      return { title: s.title, scenes: s.scenes.length, bad };
    })""")
    b.close()
for r in res:
    print(f"{r['title']:<32} {r['scenes']:>3} scènes", '  OK' if not r['bad'] else '  ERREURS')
    bad += [f"{r['title']} – {m}" for m in r['bad']]
for m in bad + errors:
    print('!!', m)
sys.exit(1 if (bad or errors) else 0)
