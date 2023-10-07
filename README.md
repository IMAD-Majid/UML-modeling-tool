[Class Diagram Modeling Tool](https://simple-class-diagram-modeling-tool.netlify.app)
[Use Case Diagram Modeling Tool](https://simple-use-case-diagram-modeling-tool.netlify.app)

# TOC
- [Diagramme des cas d'utilisation](#diagramme-des-cas-dutilisation)
- [Diagramme de classes](#diagramme-de-classes)
- sequence
- Python GUI
- HTML GUI

## Exercice
### Dossier 2 : Modélisation orientée objet (14 pts)

La TBOURIDA ou Fantasia est un art équestre traditionnel et fait partie de l’identité culturelle Marocaine. Elle se pratique, en général, pour célébrer certaines fêtes nationales ou religieuses annuelles.

On vous propose de développer une application orientée objet permettant de gérer les compétitions qui se déroulent au cours de ce type de manifestation. Une première analyse a permit de dégager ce qui suit :

- Plusieurs troupes participent à une manifestation et proviennent des différentes régions du Maroc qui sont au nombre de seize. Chaque troupe se compose de plusieurs cavaliers et possède un certain nombre de chevaux.
- Les organisateurs des manifestations de la TBOURIDA s’intéressent particulièrement aux races et âges des chevaux montés par les cavaliers. En plus des noms, prénoms et dates de naissance, on s’intéresse également au sexe des cavaliers puisque qu’on assiste, ces dernières années, à de plus de plus de participations féminines.

L’application sera exploitée par plusieurs types d’utilisateurs :

- L’administrateur s’occupera de la mise à jour des régions, des races des chevaux, des utilisateurs et de leurs rôles.
- Le responsable des inscriptions introduit les troupes, leurs cavaliers et leurs chevaux.
- La manifestation se déroule sur plusieurs journées et le responsable de la programmation dresse le planning de la manifestation en spécifiant pour chaque troupe, les cavaliers et leurs montures. Il faut noter que les cavaliers peuvent changer de monture d’une journée à une autre.
- Les internautes peuvent consulter toutes les informations relatives aux troupes et au planning de déroulement de la manifestation.

**Travail à faire** :

1. Donner le diagramme des cas d’utilisation. (5 pts)
2. Développer le diagramme de séquence du cas d’utilisation « saisir le planning ». (4pts)
3. Construire le diagramme de classes. (5 pts)

#### Diagramme des cas d'utilisation
- Red : include
- Blue: extend

![Capture](https://github.com/IMAD-Majid/UML-modeling-tool/assets/137281672/8f2c000e-75ad-4e21-8ca7-326a97b7b7ee)

**JSON**:
```
{"systemName":"Tbourida","actors":[{"name":"Internaut","usecases":["affiche info de Troupe","affiche Planning"],"x":2,"y":32,"width":160,"height":96},{"name":"responsable Inscription","usecases":["introduit Troupe"],"x":27,"y":121,"width":160,"height":96},{"name":"responsable Programmation","usecases":["gerer Planning"],"x":26,"y":223,"width":160,"height":96},{"name":"Cavalier","usecases":["change Monture"],"x":-35,"y":405,"width":160,"height":96},{"name":"Admin","usecases":["gerer Races","gerer Regions","gerer Utilisateurs"],"x":79,"y":472,"width":160,"height":96}],"cases":[{"name":"gerer Races","inclusions":[],"extensions":[],"x":720,"y":451,"width":160,"height":32},{"name":"gerer Regions","inclusions":[],"extensions":[],"x":809,"y":353,"width":160,"height":32},{"name":"gerer Utilisateurs","inclusions":[],"extensions":[],"x":374,"y":502,"width":160,"height":32},{"name":"gerer Roles","inclusions":["gerer Utilisateurs"],"extensions":[],"x":531,"y":299,"width":160,"height":32},{"name":"change Monture","inclusions":["introduit Troupe"],"extensions":[],"x":291,"y":328,"width":160,"height":32},{"name":"affiche info de Troupe","inclusions":["introduit Troupe"],"extensions":[],"x":589,"y":46,"width":160,"height":32},{"name":"affiche Planning","inclusions":["gerer Planning"],"extensions":[],"x":317,"y":71,"width":160,"height":32},{"name":"gerer Planning","inclusions":["gerer Roles"],"extensions":[],"x":306,"y":226,"width":160,"height":32},{"name":"introduit Troupe","inclusions":["gerer Roles","gerer Regions","gerer Races"],"extensions":[],"x":591,"y":182,"width":160,"height":32}]}
```

#### Diagramme de classes
![Capture](https://github.com/IMAD-Majid/UML-modeling-tool/assets/137281672/ea9c508e-dd35-4b23-8903-c9dc379fd0b3)

**JSON**:
```
{"Troupe":{"name":"Troupe","attributes":["region","cavallers : list","chevaux : list"],"methods":[],"inheritances":[],"x":18.34375,"y":430,"width":180,"height":112},"Region":{"name":"Region","attributes":["nom"],"methods":[],"inheritances":[],"x":777.34375,"y":23,"width":180,"height":80},"Race":{"name":"Race","attributes":["nom"],"methods":[],"inheritances":[],"x":778.34375,"y":120,"width":180,"height":80},"Plan":{"name":"Plan","attributes":["cavalier","monture : Cheval","journee"],"methods":[],"inheritances":[],"x":34.34375,"y":207,"width":180,"height":112},"Cheval":{"name":"Cheval","attributes":["race","age","nombre"],"methods":[],"inheritances":[],"x":438.34375,"y":433,"width":180,"height":112},"Cavalier":{"name":"Cavalier","attributes":["nom","prenom","date de naissance","sexe"],"methods":["changeMonture"],"inheritances":[],"x":238.34375,"y":405,"width":180,"height":144},"User":{"name":"User","attributes":["email","password","role"],"methods":[],"inheritances":[],"x":396.34375,"y":14,"width":180,"height":112},"Internaut":{"name":"Internaut","attributes":[],"methods":["afficheInfoDeTroupe","affichePlanning"],"inheritances":["User"],"x":527.34375,"y":243,"width":180,"height":96},"responsableInscription":{"name":"responsableInscription","attributes":[],"methods":["introduitTroupe"],"inheritances":["User"],"x":119.34375,"y":48,"width":180,"height":80},"Admin":{"name":"Admin","attributes":[],"methods":["gererUtilisateurs","gererRaces","gererRegions","gererRoles"],"inheritances":["User"],"x":783.34375,"y":247,"width":180,"height":128},"responsableProgrammation":{"name":"responsableProgrammation","attributes":[],"methods":["gererPlanning"],"inheritances":["User"],"x":279.34375,"y":181,"width":180,"height":80}}
```
