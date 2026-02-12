class VueAjouterBijou{
     constructor(){
         this.html = document.getElementById("html-vue-ajouter-bijou").innerHTML;
         this.actionAjouterBijou = null;
     }

     initialiserActionAjouterBijou(actionAjouterBijou){
         this.actionAjouterBijou = actionAjouterBijou;
     }

      afficher(){
         document.getElementsByTagName("body")[0].innerHTML = this.html;
         document.getElementById("formulaire-ajouter").addEventListener("submit",evenement =>this.enregistrer(evenement));
      }

      enregistrer(evenement){
          evenement.preventDefault();

          let nom = document.getElementById("bijou-nom").value;
          let type = document.getElementById("bijou-type").value;
          let prix = document.getElementById("bijou-prix").value;
          let description = document.getElementById("bijou-description").value;

          this.actionAjouterBijou(new Bijou(nom, type, prix, description, null));
      }
}
