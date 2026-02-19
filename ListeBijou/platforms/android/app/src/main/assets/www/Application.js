class Application {
  constructor(window, bijouDAO, vueListeBijou, vueBijou, vueAjouterBijou, vueModifierBijou) {
    this.window = window;
    this.bijouDAO = bijouDAO;

    this.vueListeBijou = vueListeBijou;
    this.vueAjouterBijou = vueAjouterBijou;
    this.vueModifierBijou = vueModifierBijou;
    this.vueBijou = vueBijou;

    this.vueAjouterBijou.initialiserActionAjouterBijou((bijou) => this.actionAjouterBijou(bijou));
    this.vueModifierBijou.initialiserActionModifierBijou((bijou) => this.actionModifierBijou(bijou));

    document.addEventListener("deviceready", () => this.initialiserNavigation(), false);
  }

  initialiserNavigation() {
    console.log("Application-->initialiserNavigation");
    this.window.addEventListener("hashchange", () => this.naviguer());

    // ton délai de 3s, on le garde
    setTimeout(() => this.naviguer(), 3000);
  }

  naviguer() {
    const hash = this.window.location.hash;

    try {
      if (!hash || hash === "#") {
        const liste = await this.bijouDAO.lister();
        this.vueListeBijou.initialiserListeBijou(liste);
        this.vueListeBijou.afficher();
        return;
      }

      if (hash.match(/^#ajouter-bijou/)) {
        this.vueAjouterBijou.afficher();
        return;
      }

      // ID Firestore = string => ([^/]+)
      let matchModifier = hash.match(/^#modifier-bijou\/([^/]+)$/);
      if (matchModifier) {
        const idBijou = matchModifier[1];
        const bijou = await this.bijouDAO.chercher(idBijou);

        if (!bijou) {
          console.error("Bijou introuvable pour modification, id =", idBijou);
          this.window.location.hash = "";
          return;
        }

        this.vueModifierBijou.initialiserBijou(bijou);
        this.vueModifierBijou.afficher();
        return;
      }

      let matchDetail = hash.match(/^#bijou\/([^/]+)$/);
      if (matchDetail) {
        const idBijou = matchDetail[1];
        const bijou = await this.bijouDAO.chercher(idBijou);

        if (!bijou) {
          console.error("Bijou introuvable, id =", idBijou);
          this.window.location.hash = "";
          return;
        }

        this.vueBijou.initialiserBijou(bijou);
        this.vueBijou.afficher();
        return;
      }

      console.error("Route non reconnue :", hash);
      this.window.location.hash = "";
    } catch (err) {
      console.error("Erreur navigation Firestore:", err);
      this.window.location.hash = "";
    }
  }

   actionAjouterBijou(bijou) {
    try {
      await this.bijouDAO.ajouter(bijou);
      this.window.location.hash = "";
    } catch (err) {
      console.error("Erreur ajout Firestore:", err);
      alert("Erreur lors de l'ajout du bijou.");
    }
  }

  actionModifierBijou(bijouModifie) {
    try {
      await this.bijouDAO.modifier(bijouModifie);
      this.window.location.hash = "";
    } catch (err) {
      console.error("Erreur modification Firestore:", err);
      alert("Erreur lors de la modification du bijou.");
    }
  }
}

// IMPORTANT : on instancie le DAO Firestore, pas l'ancien BijouDAO localStorage
new Application(
  window,
  new VueListeBijou(),
  new VueBijou(),
  new VueAjouterBijou(),
  new VueModifierBijou()
);
