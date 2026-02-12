class BijouDAO{
    constructor()
    {
         /*this.listeBijou = [
            { id: 0, nom: "Collier Émeraude", type: "Collier", description: "Collier avec pierre précieuse verte." },
            { id: 1, nom: "Bague Diamant", type: "Bague", description: "Bague en or avec diamant." },
            { id: 2, nom: "Bracelet Perles", type: "Bracelet", description: "Bracelet élégant de perles blanches." },
            { id: 3, nom: "Boucles d'Oreilles Rubis", type: "Boucles d'Oreilles", description: "Boucles d'oreilles avec rubis rouge." },
            { id: 4, nom: "Montre Classique", type: "Montre", description: "Montre en acier inoxydable avec bracelet cuir." }
        ];*/
         this.listeBijou = [];
    }

    lister(){

        if(localStorage['bijou']){
            this.listeBijou = JSON.parse(localStorage['bijou'])
        }

        for(let position in this.listeBijou){
            let bijou = new Bijou(this.listeBijou[position].nom,
                                  this.listeBijou[position].type,
                                  this.listeBijou[position].prix,
                                  this.listeBijou[position].description,
                                  this.listeBijou[position].id);
            this.listeBijou[bijou.id] = bijou;
        }
        return this.listeBijou;
    }

    ajouter(bijou){
        if(this.listeBijou.length > 0)
           bijou.id = this.listeBijou[this.listeBijou.length-1].id + 1;
        else
            bijou.id = 0;

        this.listeBijou[bijou.id] = bijou;

        localStorage['bijou'] = JSON.stringify(this.listeBijou);
        console.log("JSON.stringify(this.listeBijou) : " + JSON.stringify(this.listeBijou));
    }

    modifier(bijouModifie) {
        //  Recharger la liste depuis le localStorage pour s'assurer d'avoir les données à jour
        if (localStorage['bijou']) {
            this.listeBijou = JSON.parse(localStorage['bijou']);
        }

        //  Parcourir la liste pour trouver le bijou à modifier par son ID
        // On utilise l'ID comme index ou clé de recherche
        let found = false;
        for (let i in this.listeBijou) {
            // L'ID du bijou dans la liste doit correspondre à l'ID du bijou modifié
            if (this.listeBijou[i].id == bijouModifie.id) {
                this.listeBijou[i].nom = bijouModifie.nom;
                this.listeBijou[i].type = bijouModifie.type;
                this.listeBijou[i].prix = bijouModifie.prix;
                this.listeBijou[i].description = bijouModifie.description;
                found = true;
                break;
            }
        }

        // 3. Sauvegarder la liste mise à jour dans le localStorage
        if (found) {
            localStorage['bijou'] = JSON.stringify(this.listeBijou);
            console.log("Bijou modifié et sauvegardé :", bijouModifie);
        } else {
            console.error("Erreur: Bijou avec ID " + bijouModifie.id + " non trouvé pour modification.");
        }
    }
}

