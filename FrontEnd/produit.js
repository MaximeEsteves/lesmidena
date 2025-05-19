import stockArticles from './stock-article.js';

// Récupère la référence produit depuis l'URL
function getProduitDepuisURL() {
const params = new URLSearchParams(window.location.search);
return params.get('ref');
}

// Variables globales
let produit, parentArticle;
let currentImageIndex = 0;

// Sélecteurs DOM
const thumbsContainer       = document.querySelector(".thumbs");
const prevBtn               = document.getElementById("prev-btn");
const nextBtn               = document.getElementById("next-btn");
const mainImage             = document.getElementById("image-principale");
const fullscreenModal       = document.getElementById("fullscreen-modal");
const fullscreenImage       = document.getElementById("fullscreen-image");
const closeFullscreenBtn    = document.getElementById("close-fullscreen");
const fullscreenPrev        = document.getElementById("fullscreen-prev");
const fullscreenNext        = document.getElementById("fullscreen-next");
const modalImageContainer   = document.querySelector('.contenair-image-modal');
const formAvis              = document.getElementById('form-avis');
const messageAvis           = document.getElementById('avis-message');
const listeAvisBloc         = document.getElementById('liste-avis');
const btnPartager           = document.getElementById('btn-partager');

// Données de partage
const shareData = {
title: document.querySelector('.titre-produit').textContent,
text:  document.getElementById('desc-produit').textContent.slice(0, 100) + '…',
url:   window.location.href
};

// Met à jour l'image principale et la modale
function updateMainImage(index) {
currentImageIndex = index;
mainImage.src = produit.image[index];
fullscreenImage.src = produit.image[index];
document.querySelectorAll(".thumbnail").forEach((img, i) => img.classList.toggle("active", i === index));
}

// Initialisation de la galerie d'images
function initImageGallery() {
updateMainImage(0);
thumbsContainer.innerHTML = '';
produit.image.forEach((src, idx) => {
const thumb = document.createElement('img');
thumb.src = src;
thumb.classList.add('thumbnail');
if (idx === 0) thumb.classList.add('active');
thumb.addEventListener('click', () => updateMainImage(idx));
thumbsContainer.appendChild(thumb);
});
prevBtn.addEventListener('click', () => updateMainImage((currentImageIndex - 1 + produit.image.length) % produit.image.length));
nextBtn.addEventListener('click', () => updateMainImage((currentImageIndex + 1) % produit.image.length));
}

// Configuration de la modale plein écran et zoom
function initFullScreenModal() {
mainImage.addEventListener('click', () => fullscreenModal.classList.add('show'));
closeFullscreenBtn.addEventListener('click', () => fullscreenModal.classList.remove('show'));
fullscreenModal.addEventListener('click', e => { if (e.target === fullscreenModal) fullscreenModal.classList.remove('show'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fullscreenModal.classList.remove('show'); });
fullscreenPrev.addEventListener('click', () => updateMainImage((currentImageIndex - 1 + produit.image.length) % produit.image.length));
fullscreenNext.addEventListener('click', () => updateMainImage((currentImageIndex + 1) % produit.image.length));
modalImageContainer.style.overflow = 'hidden';
fullscreenImage.style.transition = 'transform 0.2s ease-out';
fullscreenImage.style.transformOrigin = 'center center';
modalImageContainer.addEventListener('mousemove', e => {
const rect = fullscreenImage.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width * 100;
const y = (e.clientY - rect.top) / rect.height * 100;
fullscreenImage.style.transformOrigin = `${x}% ${y}%`;
fullscreenImage.style.transform = 'scale(2)';
});
modalImageContainer.addEventListener('mouseleave', () => fullscreenImage.style.transform = 'scale(1)');
}

// Affichage des détails produit
function displayProductDetails() {
document.querySelector('.titre-produit-boutique').textContent = parentArticle.categorie;
document.querySelector('.titre-produit').textContent = produit.nom;
document.getElementById('prix-produit').textContent = `${produit.prix} €`;
document.getElementById('ref-produit').textContent = `Référence : ${produit.reference}`;
document.getElementById('titre-produit-description').textContent = produit.titreDescription;
document.getElementById('desc-produit').textContent = produit.descriptionComplete;
document.getElementById('materiaux-produit').textContent = produit.materiaux;
if (parentArticle.imageCouverture) document.getElementById('image-couverture-boutique').src = parentArticle.imageCouverture;
}

// Sélecteur de quantité en stock
function initStockSelector() {
const select = document.getElementById('stock-produit');
select.innerHTML = '';
for (let i = 1; i <= produit.stock; i++) {
const opt = document.createElement('option'); opt.value = i; opt.textContent = i;
select.appendChild(opt);
}
}

// Gestion du formulaire d'avis
function initReviewForm() {
let avisList = JSON.parse(localStorage.getItem(`avis_${produit.reference}`)) || [];
renderAvis(avisList);
formAvis.addEventListener('submit', e => {
e.preventDefault();
const nom = document.getElementById('avis-nom').value.trim();
const note = +document.getElementById('avis-note').value;
const com = document.getElementById('avis-commentaire').value.trim();
if (!nom || !note || !com) return;
const nouvel = { nom, note, commentaire: com, date: new Date().toISOString() };
avisList.unshift(nouvel);
localStorage.setItem(`avis_${produit.reference}`, JSON.stringify(avisList));
renderAvis(avisList);
formAvis.reset();
messageAvis.textContent = 'Merci pour votre avis !';
setTimeout(() => messageAvis.textContent = '', 3000);
});
}

function renderAvis(list) {
listeAvisBloc.innerHTML = '';
if (list.length === 0) return listeAvisBloc.innerHTML = '<p>Aucun avis pour le moment.</p>';
list.forEach(av => {
const div = document.createElement('div'); div.classList.add('avis');
div.innerHTML = `<h4>${av.nom} <span class="note">${'★'.repeat(av.note)}${'☆'.repeat(5-av.note)}</span></h4><p>${av.commentaire}</p><small>${new Date(av.date).toLocaleDateString()}</small>`;
listeAvisBloc.appendChild(div);
});
}

// Suggestion de produits similaires
function produitSupplementaire() {
  const titreProduitSupp = document.getElementById('titre-produit-similaire');
  titreProduitSupp.textContent = `Découvre d'autres ${parentArticle.categorie} qui vont te faire craquer !`;

  // Créer un conteneur pour les cartes
  const container = document.createElement("div");
  container.classList.add("produits-similaire-container");

  // Sélectionne les 5 premiers produits, ou moins si la catégorie en contient moins
  const produitsAShow = parentArticle.produits.slice(0, 5);

  produitsAShow.forEach(produit => {
    const carte = document.createElement("div");
    carte.classList.add("carte-produit");

    carte.innerHTML = `
      <img src="${produit.image[0]}" alt="${produit.nom}">
      <h3>${produit.nom}</h3>
      <p>${produit.prix.toFixed(2)} €</p>
    `;

    // Si vous voulez rendre la carte cliquable vers la fiche produit :
    carte.addEventListener('click', () => {
      window.location.href = `produit.html?ref=${encodeURIComponent(produit.reference)}`;
    });

    container.appendChild(carte);
  });

  titreProduitSupp.appendChild(container);
}


// Suggestion d'autres catégories
function shuffle(a) { for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function produitSupplementaireAutres() {
const cont = document.createElement('div'); cont.classList.add('produits-similaire-container-autres');
const titre = document.getElementById('titre-produit-similaire-autres');
titre.textContent = 'Encore plus de mignonneries !';
const all = stockArticles.filter(a=>a.categorie!==parentArticle.categorie).flatMap(a=>a.produits);
shuffle(all).slice(0,12).forEach(p=>{
const c = document.createElement('div'); c.classList.add('carte-produit-autres');
c.innerHTML = `<img src="${Array.isArray(p.image)?p.image[0]:p.image}" alt="${p.nom}"><h3>${p.nom}</h3><p>${p.prix.toFixed(2)} €</p>`;
c.addEventListener('click',()=>window.location.href=`produit.html?ref=${p.reference}`);
cont.appendChild(c);
});
titre.appendChild(cont);
}

// Initialisation de l'ensemble
function init() {
const ref = getProduitDepuisURL();
produit = stockArticles.flatMap(a=>a.produits).find(p=>p.reference===ref);
parentArticle = stockArticles.find(a=>a.produits.some(p=>p.reference===ref));
initImageGallery();
initFullScreenModal();
displayProductDetails();
initStockSelector();
initReviewForm();
produitSupplementaire();
produitSupplementaireAutres();
// Partage
btnPartager.addEventListener('click', async () => {
if (navigator.share) {
try { await navigator.share(shareData); } catch (err) { console.error(err); }
} else {
alert("Votre navigateur ne supporte pas le partage direct.");
}
});
}

document.addEventListener('DOMContentLoaded', init);
