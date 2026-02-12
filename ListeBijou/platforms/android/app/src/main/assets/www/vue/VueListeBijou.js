 class VueListeBijou{
     constructor(){
         this.html = document.getElementById("html-vue-liste-bijou").innerHTML;
         this.listeBijouDonnee = null;
     }

     initialiserListeBijou(listeBijouDonnee){
         this.listeBijouDonnee = listeBijouDonnee;
     }

     afficher(){
         document.getElementsByTagName("body")[0].innerHTML = this.html;

         let listeBijou = document.getElementById("liste-bijou");
         const listeBijouItemHTML = listeBijou.innerHTML;
         let listeBijouHTMLRemplacement = "";

         for (var numeroBijou in this.listeBijouDonnee){
             let listeBijouItemHTMLRemplacement = listeBijouItemHTML;
             listeBijouItemHTMLRemplacement = listeBijouItemHTMLRemplacement.replace(/{Bijou.id}/g,this.listeBijouDonnee[numeroBijou].id);
             listeBijouItemHTMLRemplacement = listeBijouItemHTMLRemplacement.replace("{Bijou.nom}",this.listeBijouDonnee[numeroBijou].nom);
             listeBijouHTMLRemplacement += listeBijouItemHTMLRemplacement
        }

        listeBijou.innerHTML = listeBijouHTMLRemplacement;
     }
 }
