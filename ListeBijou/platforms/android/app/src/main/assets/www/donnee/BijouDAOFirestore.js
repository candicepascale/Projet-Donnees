class BijouDAOFirestore {
  constructor() {
    if (!window.db) {
      throw new Error("Firestore non initialisé. Vérifie firebase-init.js et l'ordre des scripts.");
    }
    this.collection = window.db.collection("bijoux");
  }

  // Retourne un tableau de Bijou
  async lister() {
    const snap = await this.collection.orderBy("nom", "asc").get();
    const liste = [];
    snap.forEach((doc) => {
      const data = doc.data();
      liste.push(new Bijou(
        data.nom ?? "",
        data.type ?? "",
        data.prix ?? "",
        data.description ?? "",
        doc.id // <-- ID Firestore
      ));
    });
    return liste;
  }

  // Ajoute et retourne l'id Firestore
  async ajouter(bijou) {
    const docRef = await this.collection.add({
      nom: bijou.nom,
      type: bijou.type,
      prix: bijou.prix,
      description: bijou.description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
  }


}
