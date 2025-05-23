//  import stockArticles from './stock-article.js';
  const focusableSelector = 'a, textarea, button, i[tabindex], input, select';
  let focusables = [];
  let previousActiveElement = null;
// Fonction utilitaire fetchData
async function fetchData(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }
  } catch (error) {
    console.error("fetchData error:", error);
    throw error;
  }
}
 document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('file-upload-couverture')
      .addEventListener('change', previewFileCouverture);

    // document
    //   .getElementById('file-upload-images')
    //   .addEventListener('change', previewFilesProduit);
  });
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const productsData = await fetchData("http://localhost:3000/api/produits");

    // Appeler projets() et filtres() avec les données récupérées
    projets(productsData);
    filtres(productsData);

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
});

// Fonction d'affichage des filtres (adaptée pour recevoir les données)
 function filtres(worksData) {

  const titre = document.querySelector(".titre-projet");
  let zoneBtn = document.querySelector(".zone-btn");
  if (zoneBtn) zoneBtn.remove();

  zoneBtn = document.createElement("div");
  zoneBtn.classList.add("zone-btn");

  // Récupérer les catégories uniques
  const categoriesSet = new Set();
  worksData.forEach(article => {
    categoriesSet.add(article.categorie);
  });

  // Bouton "Tous"
  const btnTous = document.createElement("button");
  btnTous.innerText = "Tous";
  btnTous.classList.add("btn-categorie", "click-btn");
  btnTous.addEventListener("click", function () {
    const allBtns = document.querySelectorAll(".btn-categorie");
    allBtns.forEach(b => b.classList.remove("click-btn"));

    document.getElementById("portfolio").innerHTML = "";
    projets(worksData);

    btnTous.classList.add("click-btn");
  });
  zoneBtn.appendChild(btnTous);

  // Création dynamique des boutons de filtre
  categoriesSet.forEach(category => {
    const btn = document.createElement("button");
    btn.innerText = category;
    btn.classList.add("btn-categorie");
    btn.addEventListener("click", function () {
      const allBtns = document.querySelectorAll(".btn-categorie");
      allBtns.forEach(b => b.classList.remove("click-btn"));

      document.getElementById("portfolio").innerHTML = "";
      const filtered = worksData.filter(article => article.categorie === category);
      projets(filtered);

      btn.classList.add("click-btn");
    });
    zoneBtn.appendChild(btn);
  });

  titre.appendChild(zoneBtn);
}

// Fonction d'affichage des projets avec lazy loading
 function projets(worksData) {
  const portfolio = document.getElementById("portfolio");
  portfolio.classList.add("gallery");
   portfolio.innerHTML = ""; // Nettoyer le conteneur avant d'ajouter les projets

  // Si l'utilisateur est connecté, ajouter le bouton "Modifier" une seule fois
  if (localStorage.getItem("token")) {
    const h2 = document.querySelector(".titre-projet");
    // Vérifie si le bouton modifier existe déjà
    if (!h2.querySelector(".div-modification")) {
      const divModification = document.createElement("button");
      const pModification = document.createElement("span");
      const iModification = document.createElement("i");
      
      pModification.innerHTML = "Ajouter un produit";
      iModification.classList.add("fa-solid", "fa-pen-to-square");
      divModification.classList.add("div-modification");
      
      divModification.appendChild(iModification);
      divModification.appendChild(pModification);
      h2.appendChild(divModification);
    }
  }

  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  worksData.forEach(produit => {
    const figure = document.createElement("figure");
  figure.dataset.id = produit._id;
    const img = document.createElement("img");
  const baseURL = "http://localhost:3000/";
    const raw = Array.isArray(produit.image) 
      ? produit.image[0] 
      : produit.image || "";
      
    img.dataset.src = baseURL + raw;
    img.alt = `image de ${produit.nom}`;

    console.log(baseURL + raw)
    const figcaption = document.createElement("h3");
    figcaption.textContent = produit.nom;

    const description = document.createElement("p");
    description.classList.add("description-carte");
    description.textContent = produit.description;

    const prix = document.createElement("p");
    prix.textContent = `${produit.prix}€`;

    const bouton = document.createElement("button");
    bouton.textContent = "Acheter";
    bouton.classList.add("btn-acheter");

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(description);
    figure.appendChild(prix);
    figure.appendChild(bouton);
    portfolio.appendChild(figure);

  // Boutons pour utilisateur connecté
  if (localStorage.getItem("token")) {
    // Bouton supprimer déjà présent...
    const btnSupprimer = document.createElement("button");
    btnSupprimer.classList.add("icone-supprimer");
    const iconSupprimer = document.createElement("i");
    iconSupprimer.classList.add("fa-solid", "fa-trash-can");
    btnSupprimer.appendChild(iconSupprimer);
    btnSupprimer.addEventListener("click", () => {
      deletePhoto(figure);
    });
    figure.appendChild(btnSupprimer);
    
    // Bouton modifier : ouvre la modale de modification
    const btnModifier = document.createElement("button");
    btnModifier.classList.add("icone-modifier");
    const iconModifier = document.createElement("i");
    iconModifier.classList.add("fa-solid", "fa-pen-to-square");
    btnModifier.appendChild(iconModifier);
    btnModifier.addEventListener("click", () => {
      initProductModal('edit', produit)
    });
    figure.appendChild(btnModifier);
  }

    portfolio.appendChild(figure);
    imgObserver.observe(img);

    imgObserver.observe(img);

    img.addEventListener("click", () => {
      window.location.href = `produit.html?ref=${produit.reference}`;
    });
  });
}
// 1) Initialiser Quill (à faire une seule fois)
const editorDescriptionComplete = new Quill('#editor-descriptionComplete', { theme: 'snow' });

// 2) Fonction commune
async function initProductModal(mode, produit = {}) {
  const baseURL         = "http://localhost:3000/";
  const overlay         = document.querySelector('.modal-content');
  const modal           = document.querySelector('.modal');
  const titreModal      = modal.querySelector('.titre-modal');
  const form            = modal.querySelector('#product-form');
  const btnSubmit       = form.querySelector('button[type=submit]');
  const couvertureInput = document.getElementById('file-upload-couverture');
  const multiInput      = document.getElementById('file-upload-images');
  const previewCover    = document.getElementById('preview-couverture');
  const gallery         = document.getElementById('preview-multi-images');
  const hiddenDescInput = document.getElementById('input-descriptionComplete');

  // --- 0) Normalisation à la volée (strip baseURL si présent) ---
  if (produit.imageCouverture) {
    produit.imageCouverture = produit.imageCouverture.replace(/^https?:\/\/[^/]+\//, '');
  }
  if (Array.isArray(produit.image)) {
    produit.image = produit.image.map(img =>
      img.replace(/^https?:\/\/[^/]+\//, '')
    );
  }

  // --- 1) Titre & bouton ---
  if (mode === 'add') {
    titreModal.textContent = 'Ajouter un produit';
    btnSubmit.textContent  = 'Créer';
  } else {
    titreModal.textContent = 'Modifier le produit';
    btnSubmit.textContent  = 'Mettre à jour';
  }

  // --- 2) Texeuils ---
  if (mode === 'edit') {
    form.elements['categorie'].value        = produit.categorie || '';
    form.elements['nom'].value              = produit.nom || '';
    form.elements['titreDescription'].value = produit.titreDescription || '';
    form.elements['description'].value      = produit.description || '';
    form.elements['materiaux'].value        = produit.materiaux || '';
    form.elements['prix'].value             = produit.prix || '';
    form.elements['reference'].value        = produit.reference || '';
    form.elements['stock'].value            = produit.stock || '';
    editorDescriptionComplete.clipboard.dangerouslyPasteHTML(
      produit.descriptionComplete || ''
    );
  } else {
    form.reset();
    editorDescriptionComplete.setContents([]);
  }

  // --- 3) Preview image de couverture ---
  // Reset input
  couvertureInput.value = '';
  // Clear preview
  previewCover.style.display = 'none';
  if (mode === 'edit' && produit.imageCouverture) {
    previewCover.src         = baseURL + produit.imageCouverture;
    previewCover.alt         = 'Image de couverture';
    previewCover.style.display = 'block';
  }
  // Wiring preview on new selection
  couvertureInput.onchange = () => {
    const file = couvertureInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      previewCover.src = reader.result;
      previewCover.alt = file.name;
      previewCover.style.display = 'block';
    };
    reader.readAsDataURL(file);
  };

  // --- 4) Preview & gestion images multiples ---
  // Clear gallery
  gallery.innerHTML = '';
  // Track old images to delete
  const imagesASupprimer = [];
  // Existing images
  if (mode === 'edit' && Array.isArray(produit.image)) {
    produit.image.forEach((relPath, idx) => {
      const figure = document.createElement('figure');
      figure.classList.add('image-wrapper');

      const img = document.createElement('img');
      img.src = baseURL + relPath;
      img.alt = `Image ${idx+1}`;
      img.classList.add('image-preview');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.classList.add('icone-supprimer-modal');
      btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      btn.addEventListener('click', e => {
        imagesASupprimer.push(relPath);
        e.currentTarget.closest('figure').remove();
      });

      figure.append(btn, img);
      gallery.appendChild(figure);
    });
  }

  // New image inputs
  multiInput.value = '';
  multiInput.onchange = () => {
    Array.from(multiInput.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const figure = document.createElement('figure');
        figure.classList.add('image-wrapper');

        const img = document.createElement('img');
        img.src = reader.result;
        img.alt = file.name;
        img.classList.add('image-preview');

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('icone-supprimer-modal');
        btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        btn.addEventListener('click', e => {
          e.currentTarget.closest('figure').remove();
        });

        figure.append(btn, img);
        gallery.appendChild(figure);
      };
      reader.readAsDataURL(file);
    });
  };

  // --- 5) Afficher la modale ---
  overlay.style.display = 'flex';
  modal.style.display   = 'flex';

  // --- 6) Soumission ---
  form.onsubmit = async e => {
    e.preventDefault();
    const token   = localStorage.getItem('token');
    // Hidden Quill
    hiddenDescInput.value = editorDescriptionComplete.root.innerHTML;

    // Build FormData
    const formData = new FormData(form);
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
    // Append old images to delete
    imagesASupprimer.forEach(path => {
      formData.append('imagesASupprimer', path);
    });

    // Determine endpoint & method
    const url    = mode === 'add'
      ? `${baseURL}api/produits`
      : `${baseURL}api/produits/${produit._id}`;
    const method = mode === 'add' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) {
        console.error('Erreur', res.status, await res.text());
        return;
      }
      // Fermer + rafraîchir
      overlay.style.display = 'none';
      modal.style.display   = 'none';
      const data = await fetchData(`${baseURL}api/produits`);
      projets(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
}



// Preview image de couverture
function previewFileCouverture() {
  const input = document.getElementById("file-upload-couverture");
  const file = input.files[0];
  const preview = document.getElementById("preview-couverture");
  const error = input.closest(".custom-file-upload").querySelector(".text-error-add-photo");

  if (!file) return;

  if (file.size > 4 * 1024 * 1024) {
    error.textContent = "Le fichier dépasse 4 Mo.";
    error.style.color = "red";
    return;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    error.textContent = "Seuls JPG, WEBP et PNG sont autorisés.";
    error.style.color = "red";
    return;
  }

  error.textContent = "";

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}


// Preview images produit multiples
// function previewFilesProduit() {
//   const input = document.getElementById("file-upload-images");
//   const files = input.files;
//   const gallery = document.getElementById("preview-multi-images");
//   const error = input.closest(".custom-file-upload").querySelector(".text-error-add-photo");

//   if (!files.length) return;

//   [...files].forEach(file => {
//     if (file.size > 4 * 1024 * 1024) {
//       error.textContent = "Un fichier dépasse 4 Mo.";
//       error.style.color = "red";
//       return;
//     }

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
//     if (!allowedTypes.includes(file.type)) {
//       error.textContent = "Seuls JPG, WEBP et PNG sont autorisés.";
//       error.style.color = "red";
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       const figure = document.createElement("figure");
//       figure.classList.add("image-wrapper");

//       const img = document.createElement("img");
//       img.src = reader.result;
//       img.classList.add("image-preview");
//       img.alt = "Nouvelle image";

//       const btnSupprimer = document.createElement("button");
//       btnSupprimer.classList.add("icone-supprimer");
//       btnSupprimer.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
//       btnSupprimer.style.cssText = "width: 25px; height: 25px; font-size: 15px; opacity: 1";
//       btnSupprimer.onclick = () => figure.remove();

//       figure.appendChild(btnSupprimer);
//       figure.appendChild(img);
//       gallery.appendChild(figure);
//     };
//     reader.readAsDataURL(file);
//   });
// input.value = "";
// }





// //* Fonction fermeture de la modale */
 function closeModal() {
         const modal = document.querySelector(".modal");
         const modalContent = document.querySelector(".modal-content");
         modal.style.display = "none";
         modalContent.style.display = "none";
 }
 
// /* fonction de suppression de la photo, reçoit la figure à supprimer */
async function deletePhoto(figure) {
  const id = figure.dataset.id;
  if (!id) {
    console.error("Aucun ID n'est associé à ce produit.");
    return;
  }
  
  const token = window.localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:3000/api/produits/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      // Supprimez seulement l'élément du DOM
      figure.remove();
    } else {
      console.error("Erreur lors de la suppression, statut:", response.status);
    }
  } catch (error) {
    console.error("Erreur pendant la suppression :", error);
  }
  
  updateFocusables();
}


 // eventListener "click"
 document.body.addEventListener("click", function(e) {
     if (e.target.closest("#user-open")) {
         if (window.localStorage.getItem("token")) {
             const userOpen = document.querySelector("#user-open")
             userOpen.innerHTML = "login"
             window.localStorage.clear()
             window.location.href = "index.html";
         } else {
             const userOpen = document.querySelector("#user-open")
             userOpen.classList.toggle("click");
         }
     }
     if (e.target.closest(".btn-close")) {
         closeModal();
     }
     const modalContent = document.querySelector(".modal-content");
     if (e.target === modalContent) {
         // au clic en dehors de la modale, ferme la modale
       closeModal();
     }
     if (e.target.closest(".icone-supprimer")) {
         const figure = e.target.closest("figure");
         // Suppression d'une photo 
         deletePhoto(figure);
     }
     if (e.target.closest(".div-modification")) {
         initProductModal('add');
     }
 });

 /* eventListener "keydown" */
 window.addEventListener("keydown", function(e) {
     const modal = document.querySelector(".modal");
     if (e.key === "Escape" || e.key === "Esc") {
         closeModal();
     }
     // Exécuter le focus trap uniquement si la modale est visible
     if (e.key === "Tab") {
         // Vérifier si la modale est ouverte (par exemple, mode flex ou autre)
         if (window.getComputedStyle(modal).display !== "none") {
             e.preventDefault();
             focusInModal(e);
         }
     }
 });

 
 if (window.localStorage.getItem("token")) {
     const userOpen = document.getElementById("user-open");
     userOpen.innerHTML = "log out";
     userOpen.style.fontWeight = "700"
     const modeEdition = document.createElement("div");
     const iconeEdition = document.createElement("i");
     const texteEdition = document.createElement("p");
     const body = document.querySelector("body");
     modeEdition.classList.add("mode-edition");
     iconeEdition.classList.add("fa-solid", "fa-pen-to-square");
     texteEdition.textContent = "Mode édition";
     body.style.marginTop = "59px";
     modeEdition.appendChild(iconeEdition);
     modeEdition.appendChild(texteEdition);
     body.appendChild(modeEdition);
 }

window.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  const parallaxImage = document.querySelector('.parallax-wrapper img');
  // Ajuster ce coefficient pour modifier l'intensité du décalage
  parallaxImage.style.transform = "translateY(" + (scrollPosition * 0.5) + "px)";
});