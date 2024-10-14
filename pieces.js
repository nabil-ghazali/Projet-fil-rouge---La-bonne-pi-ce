// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// Création des éléments à afficher
const articles = pieces [0]

const nomElement = document.createElement("h2")
nomElement.innerText = articles.nom;

const imageElement = document.createElement("img")
imageElement.src = articles.image;

const prixElement = document.createElement("p")
prixElement.innerText = `Prix : ${articles.prix}`;

const categorieElement = document.createElement("p")
categorieElement.innerText = articles.categorie ?? "pas de categorie";

const descriptionElement = document.createElement("p")
descriptionElement.innerText = articles.description ?? "Pas de description pour le moment.";

const disponibiliteElement = document.createElement("p")
disponibiliteElement.innerText = articles.disponibilite ? "En stock" : "Rupture de stock"

// Rattachement des balises au DOM
const sectionFiches = document.querySelector(".fiches")
sectionFiches.appendChild(nomElement)
sectionFiches.appendChild(imageElement)
sectionFiches.appendChild(prixElement)
sectionFiches.appendChild(categorieElement)
sectionFiches.appendChild(descriptionElement)
sectionFiches.appendChild(disponibiliteElement)
