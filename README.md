# Healven
## Objectif du projet
Healven est une application mobile qui permet de garder un suivi de vos entrainements de course pour pouvoir visualiser vos performances, de différentes façons, dans le temps pour permettre de vous améliorer. Elle vous permet d'enregistrer vos courses et d'accéder aux informations facilement par la suite.

##### Mesure:
- Distance (tracé sur carte)
- Temps
- Vitesse
- Calorie

## Suivi de développement:
Méthodologie agile (non-indiqué mais je suis revenu très souvent sur des points précédents)
> #1 - Création de l'API et de la base de donnée.  
Mise en place de 2 types de requêtes: une pour gérer l'utilisateur et une seconde pour gérer les enregistrements.  
Mise en place d'une authentification sécurisé (hash et salt).  

> #2 - Création de l'application  
Création de l'interface d'authentification et de configuration d'utilisateur.  
Relier l'application à l'API.  
Création de l'interface principal et d'enregistrement.  
Mise en place du système de localisation.  
Mise en place de la carte.  
Mise en place de l'affichage des enregistrements déjà réalisés.  
Intégration d'un design.  
Animation des différents composants.  
Correction des bugs.  
Optimisation du code.  


## Point de vue technique
#### Front-End:
> Utilisation de React Native pour réaliser l'application car il est l'outil le plus mature dans le développement mobile cross-platform.

> Utilisation d'Expo simplifiant le build de l'application et l'importation de librairies. Expo est aujourd'hui plus que complet et est une solution plus que viable.

> Utilisation de Google Maps pour l'affichage de la carte. Google Maps est une solution très efficace, assez simple à mettre en place, et personnalisable. Elle est de plus gratuite pour un simple affichage de carte.
#### Back-End:
> Création d'une API à l'aide d'Express JS. Une solution très interessante et efficace, avec plus de liberté que Firebase.

> Utilisation de MongoDB pour stocker les données.
