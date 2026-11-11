# Contes en images

Site web pour enfants (lecture seule, sans serveur ni build) : l'enfant touche une image, une histoire est lue à voix haute
et des dessins SVG apparaissent au fil de la narration. Projet personnel de Yoann, en français.

## Fichiers
- `index.html` : structure de la page (étagère de cartes, lecteur plein écran, deux balises `<audio>`).
- `style.css` : styles.
- `app.js` : tout le reste, en un seul script classique (pas de module, pas de bibliothèque, pas de build).
- `bed.mp3` : musique douce de fond (volume bas pendant la lecture).
- `scripts/check.py` : vérifie que toutes les scènes s'affichent (voir « Vérifier »).

## Structure de `app.js` (dans l'ordre, repérer les commentaires `/* ---------- … ---------- */`)
1. **Petite boîte à dessins** : `grad`, `it`, `scene`, `sparkle`, `cloud`, `sun`, `waves`, `fir`, `label`, `person`, `pin`…
   Un dessin = une fonction qui renvoie un `<svg viewBox="0 0 400 300">` via `scene(titre, fond, [parties])`.
   Chaque `it(...)` est un élément qui « surgit » à son tour (ordre d'apparition = ordre dans le tableau).
2. **Drapeaux** : objet `FL` (`FL.code = [largeur, hauteur, svg]`), `flagArt`, `flagScene`, `flagSceneA`, `flagTile`.
3. **Histoires** : tableau `STORIES` (3 contes d'origine), puis un bloc par voyage qui s'insère avec
   `STORIES.unshift(...)` / `STORIES.splice(i, 0, ...)`. Ordre final affiché : Europe, Afrique, Asie, Amérique du Nord, puis les 3 contes.
4. **Étagère** : construit les cartes (durée estimée = nombre de caractères / 14).
5. **Lecteur** : `openStory`, `start`, synthèse vocale du navigateur (`speechSynthesis`, voix française de l'appareil), bande de cases en bas.

## Format d'une histoire
```js
STORIES.splice(3, 0, {
  title: 'Voyage en …', coverArt: maFonctionCouverture, mark: '?',
  tiles: ['us', 'ca'].map(flagTile),            // une case (drapeau) par pays, dans l'ordre
  scenes: [
    { tile: -1, text: 'Intro…', art: monDessinIntro },            // tile -1 = aucune case
    { tile: 0, text: 'Texte lu à voix haute.', art: flagSceneA('us', 'États-Unis', '#fond1', '#fond2') },
    { tile: 1, text: 'Fin', art: maFinArt }
  ]
});
```
`tile` = index dans `tiles` de la case à remplir ; une scène = une phrase ou un petit groupe de phrases + un dessin.

## Règles d'écriture du texte (la voix lit tel quel)
- Apostrophes et guillemets typographiques : `’`, jamais `'` dans le texte français (le texte est entre quotes simples en JS).
- Écrire les nombres comme ils doivent être lus : « 1,4 milliard » (virgule collée), « moins 25 degrés », « 4 807 mètres ».
- Garder le texte de Yoann ; corriger seulement l'orthographe. Signaler les erreurs de fait à Yoann, ne pas les corriger sans accord.
- Dessins : respecter le texte (un chiffre dans un dessin doit être le même que dans la phrase).

## Vérifier
- `python3 scripts/check.py` : rend toutes les scènes, cases et couvertures et signale les erreurs JavaScript.
- Ouvrir `index.html` dans un navigateur pour l'affichage ; la voix dépend de l'appareil (non testable en ligne de commande).
- Syntaxe seule : `node --check app.js`.

## Points de fait connus (à vérifier / corriger si Yoann le demande)
- Amérique du Nord : « Mexico est la plus grande ville du monde » (inexact : l'une des plus grandes) ;
  « un jaguar » en Jamaïque (il n'y en a pas ; plutôt Costa Rica / Panama).
- Asie : Chypre, « ligne Verte » décrite comme une route (c'est une zone tampon de l'ONU).
- Afrique : Afrique du Sud, « capitale : Pretoria » (3 capitales) ; détails de la Voie de Dégagement Nord à Dakar non vérifiés.
- Hauteurs vérifiées en nov. 2026 : Mont-Blanc 4 807 m, tour Eiffel 330 m.

## Hébergement
Site statique : déposer le dossier tel quel sur Netlify, GitHub Pages, OVH… (aucune étape de build).
Ouvrir via http(s) ou directement `index.html` ; les polices Google (Fredoka, Nunito) nécessitent une connexion.

## Process Git
- Toujours travailler sur une branche dédiée et ouvrir une pull request vers `main` ; ne jamais pousser directement sur `main`.
- Une fois la PR fusionnée, repartir de `main` à jour pour la suite (nouvelle branche ou branche réinitialisée), sans empiler de commits sur l'historique déjà fusionné.
