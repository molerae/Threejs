## But du projet

L'objectif principal de ce projet est de développer une scène 3D immersive, intégrant des éléments scientifiques et artistiques, afin de montrer des objets réalistes dans un environnement expérimental. Ce projet explore l'interaction entre des modèles 3D, des textures réalistes et des effets d'éclairage avancés.

Ce projet reflète également une démarche personnelle dans la conception et la visualisation 3D, en s'appuyant sur des outils modernes et des ressources externes.

## Ce que le projet montre

- *Une scène inspirée d'un laboratoire* : Mise en avant d'objets comme des béchers, des couteaux ou des boîtes de Pétri, souvent associés à un environnement de recherche scientifique.
- *Rendu réaliste* : Utilisation de textures comme le cuir, le bois, et des images HDR pour simuler un éclairage réaliste.
- *Exploration de la 3D interactive* : Possibilité d'interagir avec les objets et d'explorer les détails de leur rendu.

## Fonctionnalités

- Affichage de modèles 3D tels que des béchers, des couteaux et des champignons.
- Application de textures variées.
- Utilisation d'images HDR pour l'éclairage de la scène.
- Chargement et affichage de modèles glTF et STL directement dans le navigateur.

## Installation

1. Clonez le dépôt :

   bash
   git clone https://github.com/molerae/Threejs.git
   

2. Accédez au répertoire du projet :

   bash
   cd Threejs
   

3. Installez les dépendances :

   bash
   npm install
   

4. Lancez l'application :

   bash
   npm start
   

5. Ouvrez votre navigateur et accédez à http://localhost:3000 pour voir l'application en action.

## Contenu du projet

Le projet comprend les fichiers et répertoires suivants :

- .vscode/ : Paramètres de l'éditeur Visual Studio Code.
- fonts/ : Polices utilisées dans la scène.
- node_modules/ : Dépendances du projet.
- background.png, backgroundbis.png : Images de fond pour la scène.
- becher.stl, knife.stl, mushroom.stl, petri.stl, petribis.stl : Modèles 3D au format STL.
- cuir.jpg, cuirbis.jpg, leather.jpg, leatherbis.jpg, wood_texture.jpg : Textures appliquées aux objets.
- glass_texture.jpg, liquid_texture.jpg, texture1.jpg, texture2.jpg, texture3.jpg : Autres textures utilisées.
- lab_background.jpg : Image de fond représentant un laboratoire.
- medical.hdr, room.hdr, studio.hdr : Images HDR pour l'éclairage.
- scene.bin, scene.gltf : Fichiers de la scène 3D au format glTF.
- table.glb, table.gltf, tablebis.glb, tablebis.gltf : Modèles 3D de tables au format glTF.
- index.html : Fichier HTML principal.
- script.js : Script JavaScript contrôlant la scène.
- style.css : Feuille de style pour l'application.
- package.json, package-lock.json : Fichiers de configuration du projet.

## Contributions

Ce projet a été développé en combinant des créations personnelles et des ressources externes :

- *Travail personnel* :
  - Développement du script script.js pour gérer la scène 3D.
  - Conception du fichier style.css pour le style de l'application.
  - Création du fichier index.html structurant la page web.

- *Ressources externes* :
  - Modèles 3D (.stl, .glb, .gltf) provenant de sources en ligne.
  - Textures et images HDR téléchargées depuis des bibliothèques gratuites.
  - Utilisation de la bibliothèque [Three.js](https://threejs.org/) pour le rendu 3D.

Chaque ressource externe utilisée respecte les licences associées et a été intégrée conformément à leurs conditions d'utilisation.
