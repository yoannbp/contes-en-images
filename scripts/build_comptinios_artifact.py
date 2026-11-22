#!/usr/bin/env python3
"""Assemble comptinios/index.html + style.css + app.js en un seul fichier HTML pour l'outil Artifact.

Usage : python3 scripts/build_comptinios_artifact.py SORTIE.html [URL_ARTIFACT_CONTES]
(le second argument remplace le lien « Retour à Contes en images »)
"""
import os
import sys

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'comptinios')


def read(name):
    with open(os.path.join(root, name), encoding='utf-8') as f:
        return f.read()


html, css, js = read('index.html'), read('style.css'), read('app.js')
assert '</script' not in js, "app.js contient '</script'"
body = html[html.index('<main'):html.index('<script src="app.js')]
if len(sys.argv) > 2:
    body = body.replace('href="../"', 'href="%s"' % sys.argv[2])
head = '''<title>Comptinios</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800&display=swap" rel="stylesheet">
'''
out = sys.argv[1]
with open(out, 'w', encoding='utf-8') as f:
    f.write(head + '<style>' + css + '</style>\n' + body + '<script>' + js + '</script>\n<script src="https://open.spotify.com/embed/iframe-api/v1" async></script>\n')
print('écrit', out, os.path.getsize(out), 'octets')
