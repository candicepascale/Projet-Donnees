class VueModifierBijou{
     constructor(){
         // Utilise le même template HTML que l'ajout
         this.html = document.getElementById("html-vue-modifier-bijou").innerHTML;
         this.actionModifierBijou = null;
         this.bijou = null;
     }

     initialiserActionModifierBijou(actionModifierBijou){
         this.actionModifierBijou = actionModifierBijou;
     }

     initialiserBijou(bijou){
         this.bijou = bijou;
     }

      afficher(){
         document.getElementsByTagName("body")[0].innerHTML = this.html;

         //  Logique de modification : Pré-remplissage et changement de titre
         document.getElementById("titre-formulaire").innerHTML = "Modifier le bijou";

         // Pré-remplir les champs avec les données du bijou
         document.getElementById("bijou-id").value = this.bijou.id;
         document.getElementById("bijou-nom").value = this.bijou.nom;
         document.getElementById("bijou-type").value = this.bijou.type;
         document.getElementById("bijou-prix").value = this.bijou.prix;
         document.getElementById("bijou-description").value = this.bijou.description;

         // Utilise l'ID de formulaire générique qui a été mis à jour dans le HTML
         document.getElementById("formulaire-bijou").addEventListener("submit",evenement =>this.enregistrer(evenement));
      }

      afficher(){
    document.getElementsByTagName("body")[0].innerHTML = this.html;

    // Mettre à jour le titre
    document.querySelector("h1").innerHTML = "Modifier le bijou";

    // Pré-remplir les champs avec les données du bijou
    document.getElementById("bijou-id-modifie").value = this.bijou.id;
    document.getElementById("bijou-nom-modifie").value = this.bijou.nom;
    document.getElementById("bijou-type-modifie").value = this.bijou.type;
    document.getElementById("bijou-prix-modifie").value = this.bijou.prix;
    document.getElementById("bijou-description-modifie").value = this.bijou.description;

    // Ajouter l'écouteur du formulaire
    document.getElementById("formulaire-modifier")
            .addEventListener("submit", evenement => this.enregistrer(evenement));
}

enregistrer(evenement){
    evenement.preventDefault();

    let id = parseInt(document.getElementById("bijou-id-modifie").value);
    let nom = document.getElementById("bijou-nom-modifie").value;
    let type = document.getElementById("bijou-type-modifie").value;
    let prix = document.getElementById("bijou-prix-modifie").value;
    let description = document.getElementById("bijou-description-modifie").value;

          // Crée un objet Bijou avec l'ID et les nouvelles valeurs
          let bijouModifie = new Bijou(nom, type, prix, description, parseInt(id));

          // Appelle l'action de modification dans l'Application
          this.actionModifierBijou(bijouModifie);
      }
}
