class VueBijou{
    constructor(){
        this.html = document.getElementById("html-vue-bijou").innerHTML;
        this.bijou = null;
    }

    initialiserBijou(bijou){
        this.bijou = bijou;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        document.getElementById("bijou-nom").innerHTML = this.bijou.nom;
        document.getElementById("bijou-type").innerHTML = this.bijou.type;
        document.getElementById("bijou-prix").innerHTML = this.bijou.prix;
        document.getElementById("bijou-description").innerHTML = this.bijou.description;
    }
}


