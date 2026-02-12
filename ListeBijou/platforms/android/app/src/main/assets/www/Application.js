class Application{
    constructor(window, bijouDAO, vueListeBijou, vueBijou, vueAjouterBijou, vueModifierBijou) {
        this.window = window;
        this.bijouDAO = bijouDAO;

        this.vueListeBijou = vueListeBijou;

        this.vueAjouterBijou = vueAjouterBijou;

        this.vueAjouterBijou.initialiserActionAjouterBijou(bijou =>this.actionAjouterBijou(bijou));

        this.vueModifierBijou = vueModifierBijou;

        this.vueModifierBijou.initialiserActionModifierBijou(bijou =>this.actionModifierBijou(bijou));

        this.vueBijou = vueBijou;

        document.addEventListener('deviceready', () =>this.initialiserNavigation(), false);

  }

  initialiserNavigation(){
    console.log("Application-->initialiserNavigation");
    // C'est l'équivalent de function(){this.naviguer()}
    this.window.addEventListener("hashchange", () =>this.naviguer());

    setTimeout(() =>this.naviguer(), 3000);
    //this.naviguer();
  }

   naviguer(){
        let hash = window.location.hash;
        if(!hash){
            this.vueListeBijou.initialiserListeBijou(this.bijouDAO.lister());
            this.vueListeBijou.afficher();
        }else if(hash.match(/^#ajouter-bijou/)){
            this.vueAjouterBijou.afficher();

        }else if(hash.match(/^#modifier-bijou\/([0-9]+)/)){
            let navigation = hash.match(/^#modifier-bijou\/([0-9]+)/);
            let idBijou = navigation[1];
            let bijou = this.bijouDAO.lister()[idBijou];
            this.vueModifierBijou.initialiserBijou(bijou);
            this.vueModifierBijou.afficher();
        } else {
            // Section corrigée : Vérifier si la navigation détaillée est valide
            let navigation = hash.match(/^#bijou\/([0-9]+)/);


            if (navigation) {
                 let idBijou = navigation[1];
                 this.vueBijou.initialiserBijou(this.bijouDAO.lister()[idBijou]);
                 this.vueBijou.afficher();
            } else {
                 // Gérer les routes inconnues (par exemple, revenir à la liste)
                 console.error("Route non reconnue : " + hash);
                 this.window.location.hash = ""; // Rediriger vers la page d'accueil/liste
            }
        }
    }

     actionAjouterBijou(bijou) {
        this.bijouDAO.ajouter(bijou);
        window.location.hash = ""; // revenir à la liste après ajout
    }

    // 🔹 Méthode pour modifier un bijou
    actionModifierBijou(bijouModifie) {
        this.bijouDAO.modifier(bijouModifie);
        window.location.hash = ""; // revenir à la liste après modification
    }
}

new Application(window, new BijouDAO(), new VueListeBijou(), new VueBijou(), new VueAjouterBijou(), new VueModifierBijou());


