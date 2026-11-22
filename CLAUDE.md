# Contes en images

Site web pour enfants (lecture seule, sans serveur ni build) : l'enfant touche une image, une histoire est lue à voix haute
et des dessins SVG apparaissent au fil de la narration. Projet personnel de Paul, en français.

## Fichiers
- `index.html` : structure de la page (étagère de cartes, lecteur plein écran, une balise `<audio>` (voix)).
- `style.css` : styles.
- `app.js` : tout le reste, en un seul script classique (pas de module, pas de bibliothèque, pas de build).
- `prono.html` : page à part pour écouter, modifier et valider les prononciations (`PRONO`). Générée par `python3 scripts/build_prono.py` :
  la relancer après chaque changement de `PRONO` et commiter le résultat.
- `comptinios/` : second site « Comptinios » (`index.html`, `style.css`, `app.js`), servi à `/comptinios/`. Lien « Comptinios ♪ » dans l'en-tête de
  `index.html` (`target="_blank"` : il s'ouvre dans un nouvel onglet juste à droite de Contes en images ; le navigateur choisit la place, pas le site).
- `scripts/check.py` : vérifie que toutes les scènes s'affichent (voir « Vérifier »).

## Structure de `app.js` (dans l'ordre, repérer les commentaires `/* ---------- … ---------- */`)
1. **Petite boîte à dessins** : `grad`, `it`, `scene`, `sparkle`, `cloud`, `sun`, `waves`, `fir`, `label`, `person`, `pin`…
   Un dessin = une fonction qui renvoie un `<svg viewBox="0 0 400 300">` via `scene(titre, fond, [parties])`.
   Chaque `it(...)` est un élément qui « surgit » à son tour (ordre d'apparition = ordre dans le tableau).
2. **Drapeaux** : objet `FL` (`FL.code = [largeur, hauteur, svg]`), `flagArt`, `flagScene`, `flagSceneA`, `flagTile`.
3. **Histoires** : tableau `STORIES` (3 contes d'origine), puis un bloc par voyage qui s'insère avec
   `STORIES.unshift(...)` / `STORIES.splice(i, 0, ...)`. Ordre final affiché : Europe, Afrique, Asie, Amérique du Nord, Amérique du Sud, Océanie, puis les 3 contes.
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

## Comptinios
- Une comptine = une entrée de `COMPTINES` (`comptinios/app.js`) : `title`, `uri` (`spotify:track:ID`), `art` (fonction qui renvoie un SVG 4:3).
- Musique : lecteur intégré Spotify (iFrame API), visible en bas de l'écran. Non connecté à Spotify : aperçu de 30 s seulement. Pas de fichier audio dans le dépôt.
- Dans le lecteur : image en grand, trait blanc en bas qui se remplit d'orange, temps écoulé à gauche, temps restant à droite.
- Les identifiants Spotify viennent d'une recherche web (open.spotify.com) : non écoutés ni vérifiés par Claude.
- Comptinios a aussi un artifact séparé (`https://claude.ai/artifact/EfQCPK6Zmq3CMwJpeC34vS`, construit par `scripts/build_comptinios_artifact.py`).
  Dans l'artifact, le lecteur Spotify est bloqué (la sécurité des artifacts refuse le script de open.spotify.com) : on y voit les images et la barre, mais pas de musique.
  La musique ne marche que sur le site GitHub Pages. L'artifact de Contes en images mène à cet artifact (`build_artifact.py` prend son URL en second argument).

## Vérifier
- `python3 scripts/check.py` : rend toutes les scènes, cases et couvertures et signale les erreurs JavaScript.
- Ouvrir `index.html` dans un navigateur pour l'affichage ; la voix dépend de l'appareil (non testable en ligne de commande).
- Syntaxe seule : `node --check app.js`.

## Points de fait connus (à vérifier / corriger si Paul le demande)
- Amérique du Nord : « Mexico est la plus grande ville du monde » (inexact : l'une des plus grandes).
  (Le jaguar est désormais au Costa Rica ; la Jamaïque a des crocodiles.)
- Amérique du Sud : Équateur « Monnaie : le peso » (inexact : l'Équateur utilise le dollar américain) ;
  « dans l’Équateur » (plutôt « en Équateur »).
- Asie : « Capitale : Jérusalem » (statut contesté ; la plupart des ambassades sont à Tel-Aviv) ;
  Arménie « frontalière avec la Géorgie, l’Azerbaïdjan et la Turquie » (oubli de l’Iran, aussi frontalier) ;
  Ebla « 1 800 tablettes » (à vérifier : les fouilles ont livré environ 17 000 tablettes et fragments) ;
  mont Fuji « 3 kilomètres » (3 776 m, soit environ 3,8 km) ; « 828 m, la plus grande construction du monde » (plus haute tour) ;
  graphies corrigées : « Cahabas » en « Kaaba », « Mumbaï » en « Mumbai », « backlava » en « baklava ».
- Afrique : Afrique du Sud, « capitale : Pretoria » (3 capitales) ;
  « le Kilimandjaro, point culminant du Kenya » (inexact : il est en Tanzanie, scène du Kenya) ;
  « le fleuve Niger commence au Mali » (inexact : il prend sa source en Guinée) ;
  « le Nil, le plus grand fleuve du monde » (discuté : Nil ou Amazone) ;
  « le Tchad a le même drapeau que la Roumanie » (presque : nuances de bleu et de rouge légèrement différentes) ;
  graphie « Nigéria » (le français écrit plutôt « Nigeria »).
- Océanie : « Bienvenue dans l’Australie » (plutôt « en Australie ») ; « les Tongas » (on dit « le Tonga ») ;
  « fidjien (hindi des îles Fidji) » (le hindi fidjien est une langue distincte du fidjien) ;
  danse de guerre fidjienne : « simbé » (le nom usuel est « cibi », prononcé « thimbi ») ;
  « Bienvenue en Vanuatu » / « Les Vanuatu » (le Vanuatu est un seul pays).
- Hauteurs vérifiées en nov. 2026 : Mont-Blanc 4 807 m, tour Eiffel 330 m.

## Hébergement
Site statique hébergé sur **GitHub Pages** (aucune étape de build : le dossier est servi tel quel ; déploiement à chaque commit sur `main`).
Ouvrir via http(s) ou directement `index.html` ; les polices Google (Fredoka, Nunito) nécessitent une connexion.

## « Publie » (quand Paul dit « publie »)
1. Forcer la mise à jour de GitHub Pages : changer le commentaire daté en bas de `index.html` (`<!-- maj : AAAA-MM-JJ HH:MM -->`,
   obtenir l’heure avec `date '+%Y-%m-%d %H:%M'`) et changer le `?v=AAAAMMJJHHMM` des liens `style.css` et `app.js` de `index.html` et de `comptinios/index.html`
   (contourne le cache de Safari). Puis commiter et pousser directement sur `main` (voir « Process Git »).
2. Artifacts : `python3 scripts/build_comptinios_artifact.py <dossier-temporaire>/comptinios.html https://claude.ai/artifact/HdLRtKmshTXRq7rwKNtuDm`, publié sur
   `https://claude.ai/artifact/EfQCPK6Zmq3CMwJpeC34vS`. Puis `python3 scripts/build_artifact.py <dossier-temporaire>/contes.html https://claude.ai/artifact/EfQCPK6Zmq3CMwJpeC34vS`, puis publier ce fichier avec l’outil Artifact
   sur l’URL existante `https://claude.ai/artifact/HdLRtKmshTXRq7rwKNtuDm` (même lien, pas de nouvel artifact).
   Si la publication est refusée, lire la version en ligne, vérifier qu’elle n’a pas d’autres changements, puis republier.
3. Répondre avec le lien de l’artifact.

## Process Git
- On ne passe plus par des pull requests : on pousse directement sur `main`. Ne pas en créer ni en mettre à jour.
