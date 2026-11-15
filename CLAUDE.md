# Contes en images

Site web pour enfants (lecture seule, sans serveur ni build) : l'enfant touche une image, une histoire est lue à voix haute
et des dessins SVG apparaissent au fil de la narration. Projet personnel de Paul, en français.

## Fichiers
- `index.html` : structure de la page (étagère de cartes, lecteur plein écran, une balise `<audio>` (voix)).
- `style.css` : styles.
- `app.js` : tout le reste, en un seul script classique (pas de module, pas de bibliothèque, pas de build).
- `scripts/check.py` : vérifie que toutes les scènes s'affichent (voir « Vérifier »).

## Structure de `app.js` (dans l'ordre, repérer les commentaires `/* ---------- … ---------- */`)
1. **Petite boîte à dessins** : `grad`, `it`, `scene`, `sparkle`, `cloud`, `sun`, `waves`, `fir`, `label`, `person`, `pin`…
   Un dessin = une fonction qui renvoie un `<svg viewBox="0 0 400 300">` via `scene(titre, fond, [parties])`.
   Chaque `it(...)` est un élément qui « surgit » à son tour (ordre d'apparition = ordre dans le tableau).
2. **Drapeaux** : objet `FL` (`FL.code = [largeur, hauteur, svg]`), `flagArt`, `flagScene`, `flagSceneA`, `flagTile`.
3. **Histoires** : tableau `STORIES` (3 contes d'origine), puis un bloc par voyage qui s'insère avec
   `STORIES.unshift(...)` / `STORIES.splice(i, 0, ...)`. Ordre final affiché : Europe, Afrique, Asie, Amérique du Nord, Amérique du Sud, puis les 3 contes.
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
- Garder le texte de Paul ; corriger seulement l'orthographe. Signaler les erreurs de fait à Paul, ne pas les corriger sans accord.
- Dessins : respecter le texte (un chiffre dans un dessin doit être le même que dans la phrase).
- Prononciation : chaque nom propre (lieu, monument, personne…) qui n’est pas évident doit avoir sa propre entrée dans `PRONO` (`app.js`),
  avec une écriture phonétique **à la française** (ex. `'Mumbai': 'Moumbaï'`, `'Gizeh': 'Guizé'`). Le texte affiché reste inchangé ; seule la voix utilise `PRONO`.
  La voix n’est pas testable en ligne de commande : Paul écoute sur l’appareil et ajuste.

## Vérifier
- `python3 scripts/check.py` : rend toutes les scènes, cases et couvertures et signale les erreurs JavaScript.
- Ouvrir `index.html` dans un navigateur pour l'affichage ; la voix dépend de l'appareil (non testable en ligne de commande).
- Syntaxe seule : `node --check app.js`.

## Points de fait connus (à vérifier / corriger si Paul le demande)
- Amérique du Nord : « Mexico est la plus grande ville du monde » (inexact : l'une des plus grandes) ;
  « un jaguar » en Jamaïque (il n'y en a pas ; plutôt Costa Rica / Panama).
- Amérique du Sud : Équateur « Monnaie : le peso » (inexact : l'Équateur utilise le dollar américain) ;
  « dans l’Équateur » (plutôt « en Équateur »).
- Asie : Chypre, « ligne Verte » décrite comme une route (c'est une zone tampon de l'ONU).
- Afrique : Afrique du Sud, « capitale : Pretoria » (3 capitales) ; détails de la Voie de Dégagement Nord à Dakar non vérifiés.
- Hauteurs vérifiées en nov. 2026 : Mont-Blanc 4 807 m, tour Eiffel 330 m.

## Hébergement
Site statique hébergé sur **GitLab Pages** (aucune étape de build : le dossier est servi tel quel).
Ouvrir via http(s) ou directement `index.html` ; les polices Google (Fredoka, Nunito) nécessitent une connexion.

## « Publie » (quand Paul dit « publie »)
1. Commiter et pousser directement sur `main` (voir « Process Git »).
2. Artifact : `python3 scripts/build_artifact.py <dossier-temporaire>/contes.html`, puis publier ce fichier avec l’outil Artifact
   sur l’URL existante `https://claude.ai/artifact/HdLRtKmshTXRq7rwKNtuDm` (même lien, pas de nouvel artifact).
   Si la publication est refusée, lire la version en ligne, vérifier qu’elle n’a pas d’autres changements, puis republier.
3. Répondre avec le lien de l’artifact.

## Process Git
- On ne passe plus par des pull requests : on pousse directement sur `main`. Ne pas en créer ni en mettre à jour.
