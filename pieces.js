// Récupération des pièces depuis le fichier JSON
// const reponse = await fetch('pieces-autos.json');
// const pieces = await reponse.json();

/*Chaînage de promesses : Ici, fetch retourne une promesse, et la méthode then est utilisée pour chaîner la promesse. Une fois que la réponse est disponible, pieces.json() est appelé dans le bloc then.*/
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());


function genererPieces(pieces) {
for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // Création des balises 
    const imageElement = document.createElement("img");
          imageElement.src = article.image;
    const nomElement = document.createElement("h2");
          nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
          prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
          categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
          descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
          stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);

    //Ajout des éléments au DOM 
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

 }
}

genererPieces(pieces);


//Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier");
    boutonTrier.addEventListener("click",function(){
const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix
    }); //console.log(piecesOrdonnées);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
 });


  /**
  * Cette function filtre les pièces non abordables 
  * 
  */
const boutonFiltrer = document.querySelector(".btn-filtrer")
    boutonFiltrer.addEventListener("click", function(){
const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix >= 35
    }); //console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
 })

   /**
  * Cette function filtre seulement les pièces sans description 
  * 
  */
const boutonNoDescription = document.querySelector(".btn-nodesc");
   boutonNoDescription.addEventListener("click", function () {
const piecesFiltrees = pieces.filter(function (piece) {
        return !piece.description
    });
        //console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

    
   
   /**
  * Cette function trie le prix dans l'ordre décroissant croissant
  * 
  */
    const boutonDecroissant = document.querySelector(".btn-decroissant");
    boutonDecroissant.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort(function (a, b) {
            return b.prix - a.prix;
         });
        //console.log(piecesOrdonnees);
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesOrdonnees);
    });

//On crée un tableau noms contenant les noms des pièces, puis supprime les noms de toutes les pièces dont le prix est supérieur à 35    
const nomsPieces = pieces.map((piece) => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       nomsPieces.splice(i,1);
       //console.log(pieces[i].prix);
   }
}
//console.log(nomsPieces)

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsPieces.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = nomsPieces[i];
    abordablesElements.appendChild(nomElement)
}
//Ajout  de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".abordables").appendChild(abordablesElements);

// Ce code affiche seulement la liste des produits disponibles 
// const piecesDisponible = pieces.map((piece) => piece.disponibilite)
// const elementsDisponible = document.createElement('ul');
//     for(let i = pieces.length -1 ; i >= 0; i--) {
//     if(pieces[i].disponibilite === true) {
//         const nomElementDisponible = document.createElement('li');
//         nomElementDisponible.innerText = `${pieces[i].nom} - ${pieces[i].prix} €`;
//         elementsDisponible.appendChild(nomElementDisponible)
//         console.log(pieces[i].nom);
//     }
//  }

//  document.querySelector(".disponibles").appendChild(elementsDisponible)

// Mappage de la liste pour obtenir seulement les noms et les prix
const nomsDisponibles = pieces.map(piece => piece.nom); console.log(nomsDisponibles);
const prixDisponibles = pieces.map(piece => piece.prix);console.log(prixDisponibles);
// On efface le nom et le prix d'un élement qui a la valeur de la disponibilité à false
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);console.log(nomsDisponibles);
        prixDisponibles.splice(i,1);console.log(prixDisponibles);
    }
}
// On crée la balise 'ul'
const disponiblesElement = document.createElement('ul');
// Avec la boucle for on attribut une balise 'li' à chaque élement et on affiche le nom et prix
for(let i=0 ; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);

// Efface le contenu de la balise body et donc l’écran
//document.querySelector(".fiches").innerHTML = '';