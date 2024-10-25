//Cette fonction permet de récupérer les avis depuis l'API-HTTP grâce à FETCH et au verbe GET
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
           /* ... */
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();

            const pieceElement = event.target.parentElement;

            const avisElement = document.createElement("p");
            for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
            }
            pieceElement.appendChild(avisElement);
      });
    }
}

//Cette fonction permet de d'ajouter les avis depuis l'API-HTTP grâce à FETCH et au verbe POST
export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    // Désactivation du comportement par défaut du navigateur
        event.preventDefault();

    //Création de l'objet du nouvel avis
    const avis  = {
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur: event.target.querySelector("[name=utilisateur]").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: parseInt(event.target.querySelector("[name=nombre-etoiles]").value) ,

    }
    //Création de la charge utile au format JSON (stringify converti en JSON)
    const chargeUtile = JSON.stringify(avis);
    
    //Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: chargeUtile
    })
});

}
 
