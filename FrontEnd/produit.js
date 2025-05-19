import stockArticles from './stock-article.js';

function getProduitDepuisURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}
  let currentImageIndex = 0;
function updateMainImage(index) {
    currentImageIndex = index;
    mainImage.src = produit.image[currentImageIndex];
    fullscreenImage.src = produit.image[currentImageIndex];
    // Met à jour les miniatures actives
    document.querySelectorAll(".thumbnail").forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }
const thumbsContainer = document.querySelector(".thumbs");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const mainImage = document.getElementById("image-principale");

// Modale plein écran
const fullscreenModal = document.getElementById("fullscreen-modal");
const fullscreenImage = document.getElementById("fullscreen-image");
const closeFullscreenBtn = document.getElementById("close-fullscreen");
const fullscreenPrev = document.getElementById("fullscreen-prev");
const fullscreenNext = document.getElementById("fullscreen-next");
const modalImageContainer = document.querySelector('.contenair-image-modal');

const ref = getProduitDepuisURL();
const produit = stockArticles
  .flatMap(article => article.produits)
  .find(p => p.reference === ref);
  // Récupérer l'article parent qui contient le produit courant selon sa référence
const parentArticle = stockArticles.find(article =>
  article.produits.some(p => p.reference === ref)
);
function afficherProduit() {

    // Element principaux

  if (!produit) {
    document.body.innerHTML = '<p style="text-align:center;">Produit non trouvé.</p>';
    return;
  }
  // Initialisation
  updateMainImage(0);

  // Générer les miniatures
  thumbsContainer.innerHTML = "";
  produit.image.forEach((imgSrc, index) => {
    const thumb = document.createElement("img");
    thumb.src = imgSrc;
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      updateMainImage(index);
    });

    thumbsContainer.appendChild(thumb);
  });

  // Navigation avec les boutons
  prevBtn.addEventListener("click", () => {
    const newIndex = (currentImageIndex - 1 + produit.image.length) % produit.image.length;
    updateMainImage(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentImageIndex + 1) % produit.image.length;
    updateMainImage(newIndex);
  });


// Si l'article est trouvé et possède une imageCouverture, l'afficher
if (parentArticle && parentArticle.imageCouverture) {
  document.getElementById("image-couverture-boutique").src = parentArticle.imageCouverture;
}
  // Détails du produit
  document.querySelector('.titre-produit-boutique').textContent = parentArticle.categorie;
  document.querySelector('.titre-produit').textContent = produit.nom;
  document.getElementById('prix-produit').textContent = `${produit.prix} €`;
  document.getElementById('ref-produit').textContent = `Référence : ${produit.reference}`;
  document.getElementById('titre-produit-description').textContent = produit.titreDescription;
  document.getElementById('desc-produit').textContent = produit.descriptionComplete;
  document.getElementById('materiaux-produit').textContent = produit.materiaux;


  // Sélecteur de stock
  const selectStock = document.getElementById("stock-produit");
  selectStock.innerHTML = "";
  for (let i = 1; i <= produit.stock; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectStock.appendChild(option);
  }

  // Clic sur l'image principale pour ouvrir le plein écran
  mainImage.addEventListener("click", () => {
    fullscreenImage.src = produit.image[currentImageIndex];
    fullscreenModal.classList.add("show");
    
  });

  // Fermer la vue plein écran
  closeFullscreenBtn.addEventListener("click", () => {
    fullscreenModal.classList.remove("show");
  });
  fullscreenModal.addEventListener("click", (e) => {
  if (e.target === fullscreenModal) {
    fullscreenModal.classList.remove("show");
    resetZoom();
  }
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      fullscreenModal.classList.remove("show");
      resetZoom();
    }
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });

  // Navigation dans la modale plein écran
  fullscreenPrev.addEventListener("click", () => {
    const newIndex = (currentImageIndex - 1 + produit.image.length) % produit.image.length;
    updateMainImage(newIndex);
  });

  fullscreenNext.addEventListener("click", () => {
    const newIndex = (currentImageIndex + 1) % produit.image.length;
    updateMainImage(newIndex);
  });
    /**
   * ZOOM ON HOVER
   * Appliquer un zoom 2x, en fonction de la position de la souris,
   * sans agrandir le conteneur.
   */
  modalImageContainer.style.overflow = 'hidden';
  fullscreenImage.style.transition = 'transform 0.2s ease-out';
  fullscreenImage.style.transformOrigin = 'center center';

  modalImageContainer.addEventListener('mousemove', e => {
    const rect = fullscreenImage.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    fullscreenImage.style.transformOrigin = `${originX}% ${originY}%`;
    fullscreenImage.style.transform = 'scale(2)';
  });

  modalImageContainer.addEventListener('mouseleave', () => {
    fullscreenImage.style.transform = 'scale(1)';
    fullscreenImage.style.transformOrigin = 'center center';
  });
}

afficherProduit();

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

produitSupplementaire();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function produitSupplementaireAutres() {
  // Filtrer les catégories autres que celle du produit affiché
  const filteredArticles = stockArticles.filter(article => article.categorie !== parentArticle.categorie);
  
  // Regrouper tous les produits de ces catégories
  const allProducts = filteredArticles.flatMap(article => article.produits);
  
  // Mélanger le tableau et récupérer les 10 premiers (ou moins s'il n'y en a pas assez)
  const produitsAShow = shuffle(allProducts).slice(0, 12);

  const titreProduitSupp = document.getElementById('titre-produit-similaire-autres');
  titreProduitSupp.textContent = `Encore plus de mignonneries !`;

  // Créer le conteneur pour les cartes
  const container = document.createElement("div");
  container.classList.add("produits-similaire-container-autres");

  produitsAShow.forEach(produit => {
    const carte = document.createElement("div");
    carte.classList.add("carte-produit-autres");

    carte.innerHTML = `
      <img src="${Array.isArray(produit.image) ? produit.image[0] : produit.image}" alt="${produit.nom}">
      <h3>${produit.nom}</h3>
      <p>${produit.prix.toFixed(2)} €</p>
    `;

    // Rendre la carte cliquable vers la fiche produit
    carte.addEventListener('click', () => {
      window.location.href = `produit.html?ref=${encodeURIComponent(produit.reference)}`;
    });

    container.appendChild(carte);
  });

  titreProduitSupp.appendChild(container);
}

produitSupplementaireAutres();

// --- Après avoir appelé afficherProduit() et produitSupplementaire(...)
const formAvis       = document.getElementById('form-avis');
const messageAvis    = document.getElementById('avis-message');
const listeAvisBloc  = document.getElementById('liste-avis');

// Charge les avis existants (si tu stockes en LocalStorage)
let avisList = JSON.parse(localStorage.getItem(`avis_${produit.reference}`)) || [];
renderAvis();

// Gestion de la soumission du formulaire
formAvis.addEventListener('submit', e => {
  e.preventDefault();
  const nom         = document.getElementById('avis-nom').value.trim();
  const note        = document.getElementById('avis-note').value;
  const commentaire = document.getElementById('avis-commentaire').value.trim();

  if (!nom || !note || !commentaire) return;

  const nouvelAvis = {
    nom,
    note: parseInt(note),
    commentaire,
    date: new Date().toISOString()
  };

  // Si tu as une API pour stocker : 
  // fetch(`http://localhost:3000/api/articles/${produit.reference}/reviews`, {
  //   method: 'POST',
  //   headers: {'Content-Type':'application/json'},
  //   body: JSON.stringify(nouvelAvis)
  // }).then(...)

  // Pour l'instant on stocke en LocalStorage
  avisList.unshift(nouvelAvis);
  localStorage.setItem(`avis_${produit.reference}`, JSON.stringify(avisList));

  renderAvis();
  formAvis.reset();
  messageAvis.textContent = 'Merci pour votre avis !';  
  setTimeout(() => messageAvis.textContent = '', 3000);
});

// Fonction pour afficher les avis
function renderAvis() {
  listeAvisBloc.innerHTML = '';
  if (avisList.length === 0) {
    listeAvisBloc.innerHTML = '<p>Aucun avis pour le moment.</p>';
    return;
  }
  avisList.forEach(av => {
    const div = document.createElement('div');
    div.classList.add('avis');
    div.innerHTML = `
      <h4>${av.nom} <span class="note">${'★'.repeat(av.note)}${'☆'.repeat(5-av.note)}</span></h4>
      <p>${av.commentaire}</p>
      <small>${new Date(av.date).toLocaleDateString()}</small>
    `;
    listeAvisBloc.appendChild(div);
  });
}

// partager le produit
// Récupère uniquement le bouton
const btnPartager = document.getElementById('btn-partager');

// Prépare les données à partager
const shareData = {
  title: document.querySelector('.titre-produit').textContent,
  text:  document.getElementById('desc-produit').textContent.slice(0, 100) + '…',
  url:   window.location.href
};

btnPartager.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log('Partage réussi !');
    } catch (err) {
      console.error('Partage annulé ou échoué :', err);
    }
  } else {
    // Optionnel : prévenir l’utilisateur que son navigateur ne supporte pas
    alert("Votre navigateur ne supporte pas le partage direct. Copiez simplement l'URL pour la partager !");
  }
});
