class Bijou {
  constructor(nom, type, prix, description, id) {
    this.id = id; // string Firestore (ex: "aBcdE123...")
    this.nom = nom;
    this.type = type;
    this.prix = prix;
    this.description = description;
  }
}
