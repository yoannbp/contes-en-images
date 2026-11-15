#!/usr/bin/env python3
"""Assemble index.html + style.css + app.js en un seul fichier HTML pour l'outil Artifact.

Usage : python3 scripts/build_artifact.py SORTIE.html
(la sortie doit être hors du dépôt, par ex. dans le dossier temporaire de la session)
"""
import os
import sys

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')


def read(name):
    with open(os.path.join(root, name), encoding='utf-8') as f:
        return f.read()


html, css, js = read('index.html'), read('style.css'), read('app.js')
assert '</script' not in js, "app.js contient '</script'"
body = html[html.index('<main'):html.index('<script src')]
head = '''<title>Contes en images</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800&display=swap" rel="stylesheet">
'''
out = sys.argv[1]
with open(out, 'w', encoding='utf-8') as f:
    f.write(head + '<style>' + css + '</style>\n' + body + '<script>' + js + '</script>\n')
print('écrit', out, os.path.getsize(out), 'octets')
