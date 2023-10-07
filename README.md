[Class Diagram Modeling Tool](https://simple-class-diagram-modeling-tool.netlify.app)

# TOC
- [Diagramme de classes](#diagramme-de-classes)
- sequence
- use case
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

#### Diagramme de classes
![Capture](https://github.com/IMAD-Majid/UML-modeling-tool/assets/137281672/ea9c508e-dd35-4b23-8903-c9dc379fd0b3)

JSON:
```
{"Troupe":{"name":"Troupe","attributes":["region","cavallers : list","chevaux : list"],"methods":[],"inheritances":[],"x":18.34375,"y":430,"width":180,"height":112},"Region":{"name":"Region","attributes":["nom"],"methods":[],"inheritances":[],"x":777.34375,"y":23,"width":180,"height":80},"Race":{"name":"Race","attributes":["nom"],"methods":[],"inheritances":[],"x":778.34375,"y":120,"width":180,"height":80},"Plan":{"name":"Plan","attributes":["cavalier","monture : Cheval","journee"],"methods":[],"inheritances":[],"x":34.34375,"y":207,"width":180,"height":112},"Cheval":{"name":"Cheval","attributes":["race","age","nombre"],"methods":[],"inheritances":[],"x":438.34375,"y":433,"width":180,"height":112},"Cavalier":{"name":"Cavalier","attributes":["nom","prenom","date de naissance","sexe"],"methods":["changeMonture"],"inheritances":[],"x":238.34375,"y":405,"width":180,"height":144},"User":{"name":"User","attributes":["email","password","role"],"methods":[],"inheritances":[],"x":396.34375,"y":14,"width":180,"height":112},"Internaut":{"name":"Internaut","attributes":[],"methods":["afficheInfoDeTroupe","affichePlanning"],"inheritances":["User"],"x":527.34375,"y":243,"width":180,"height":96},"responsableInscription":{"name":"responsableInscription","attributes":[],"methods":["introduitTroupe"],"inheritances":["User"],"x":119.34375,"y":48,"width":180,"height":80},"Admin":{"name":"Admin","attributes":[],"methods":["gererUtilisateurs","gererRaces","gererRegions","gererRoles"],"inheritances":["User"],"x":783.34375,"y":247,"width":180,"height":128},"responsableProgrammation":{"name":"responsableProgrammation","attributes":[],"methods":["gererPlanning"],"inheritances":["User"],"x":279.34375,"y":181,"width":180,"height":80}}
```
