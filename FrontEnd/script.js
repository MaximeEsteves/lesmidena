 import stockArticles from './stock-article.js';
//  const focusableSelector = 'a, textarea, button, i[tabindex], input, select';
//  let focusables = [];
//  let previousActiveElement = null;
//  const fetchData = async (url, options = {}) => {
//      try {
//          const res = await fetch(url, options);
//  		if (res.ok) {
//  			const data = await res.json()
//  			return data
//  		}
//  	} catch (error) {
//          return error
//  	}
//  }
 projets(stockArticles);
 filtres();
//  modal();

  // On attend que le DOM soit chargé
  document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  });

/* fonction d'affichage des filtres */
function filtres() {
    if (window.localStorage.getItem("token")) {
        return;
    }
    const titre = document.querySelector(".titre-projet");
    let zoneBtn = document.querySelector(".zone-btn");
    if (zoneBtn) {
        zoneBtn.remove(); // Pour éviter les doublons si filtres() est rappelée
    }
    zoneBtn = document.createElement("div");
    zoneBtn.classList.add("zone-btn");

    // Récupération des projets
    const worksData = stockArticles;

    // Création d'un Set pour stocker les catégories uniques
    const categoriesSet = new Set();
    worksData.forEach(article => {
        categoriesSet.add(article.categorie);
    });

    // Bouton "Tous"
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.classList.add("btn-categorie");
    btnTous.classList.add("click-btn");
    btnTous.addEventListener("click", function () {
        const allBtns = document.querySelectorAll(".btn-categorie");
            allBtns.forEach(b => b.classList.remove("click-btn"));

        const portfolio = document.getElementById("portfolio");
        portfolio.innerHTML = "";
        projets(stockArticles);

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

            const portfolio = document.getElementById("portfolio");
            portfolio.innerHTML = "";
            const filtered = worksData.filter(article => article.categorie === category);
            projets(filtered);

            btn.classList.add("click-btn");
        });
        zoneBtn.appendChild(btn);
    });
    titre.appendChild(zoneBtn);
}
// /* fonction d'affichage des projets */
function projets(stockArticles) {
  const portfolio = document.getElementById("portfolio");
  portfolio.classList.add("gallery");
  portfolio.innerHTML = ""; // On vide le conteneur

  // Création de l'observer pour le lazy loading des images
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // On charge l'image réelle
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  // Parcours de tous les produits de stockArticles
  stockArticles.forEach(produit => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      // Stocker l'URL réelle dans data-src
      img.dataset.src = Array.isArray(produit.image) ? produit.image[0] : produit.image;
      // Laisser src vide ou pointer vers une image placeholder
      img.src = "";
      img.alt = `image de ${produit.nom}`;

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

      // Observer l'image pour charger celle-ci quand elle sera visible
      imgObserver.observe(img);

      // Redirection vers la fiche produit au clic sur l'image
      img.addEventListener("click", () => {
        window.location.href = `produit.html?ref=${produit.reference}`;
      });
  });
}

//* fonction contenu de la modale Galarie Photo */
// async function modal(){
//     const gallery = document.querySelector(".ajout-galerie");
//     const worksData = await fetchData("http://localhost:3000/api/articles");

//     worksData.forEach(article => {
//         const figure = document.createElement("figure");
//         figure.dataset.id = article.id;

//         const img = document.createElement("img");
//         img.src = article.imageUrl;
//         img.alt = `image de ${article.title}`;
//         figure.appendChild(img);

//         const btnSupprimer = document.createElement("button");
//         btnSupprimer.classList.add("icone-supprimer");

//         const icon = document.createElement("i");
//         icon.classList.add("fa-solid", "fa-trash-can");

//         btnSupprimer.appendChild(icon);
//         figure.appendChild(btnSupprimer);

//         gallery.appendChild(figure);
//     });
    
//     // Mise à jour de la liste des éléments focusables dans la modale
//     const modal = document.querySelector(".modal");
//     focusables = Array.from(modal.querySelectorAll(focusableSelector));
    
// }

// /* fonction affichage de la modale d'ajout de photo */
// async function modalAjoutPhoto() {
//     const textTitreModal = document.querySelector(".modal h2");
//     const textBtn = document.querySelector(".btnp");
//     const gallery = document.querySelector(".ajout-galerie");

//     // Nettoyage et configuration
//     gallery.innerHTML = "";
//     textTitreModal.innerHTML = "Ajout photo";
//     textBtn.style.display = "none";
//     gallery.classList.add("ajout-projet");

//     // Bouton retour
//     const btnRetour = document.createElement("i");
//     btnRetour.classList.add("fa-solid", "fa-arrow-left", "btn-retour-modal");
//     btnRetour.setAttribute("role", "button");
//     btnRetour.setAttribute("aria-label", "Retour");
//     btnRetour.setAttribute("tabindex", "0");
//     gallery.appendChild(btnRetour);

//     // Formulaire
//     const form = document.createElement("form");
//     form.setAttribute("id", "form-ajout-photo");
//     form.setAttribute("enctype", "multipart/form-data");

//     // Conteneur du formulaire
//     const divForm = document.createElement("div");
//     divForm.classList.add("formulaire-photo");

//     // Label custom file upload
//     const labelFile = document.createElement("label");
//     labelFile.classList.add("custom-file-upload");

//     // Image preview
//     const imgPreview = document.createElement("img");
//     imgPreview.id = "preview";
//     imgPreview.style.display = "none";
//     imgPreview.alt = "aperçu";
//     labelFile.appendChild(imgPreview);

//     // Icône image
//     const icone = document.createElement("i");
//     icone.classList.add("fa-solid", "fa-image", "picture-file");
//     labelFile.appendChild(icone);

//     // Texte bouton
//     const spanBtnText = document.createElement("span");
//     spanBtnText.classList.add("btn-text");
//     spanBtnText.textContent = "+ Ajouter une photo";
//     labelFile.appendChild(spanBtnText);

//     // Infos fichier
//     const spanFileInfo = document.createElement("span");
//     spanFileInfo.classList.add("file-info");
//     spanFileInfo.textContent = "jpg, png : 4 Mo max";
//     labelFile.appendChild(spanFileInfo);

//     // Input file
//     const inputFile = document.createElement("input");
//     inputFile.id = "file-upload";
//     inputFile.name = "image";
//     inputFile.type = "file";
//     inputFile.required = true;
//     inputFile.onchange = previewFile;
//     labelFile.appendChild(inputFile);

//     divForm.appendChild(labelFile);

//     // Titre
//     const pTitle = document.createElement("p");
//     const labelTitle = document.createElement("label");
//     labelTitle.setAttribute("for", "title");
//     labelTitle.textContent = "Titre";
//     const inputTitle = document.createElement("input");
//     inputTitle.type = "text";
//     inputTitle.id = "title";
//     inputTitle.name = "title";
//     inputTitle.maxLength = 32;
//     inputTitle.required = true;
//     labelTitle.appendChild(inputTitle);
//     pTitle.appendChild(labelTitle);
//     divForm.appendChild(pTitle);

//     // Catégorie
//     const pCategory = document.createElement("p");
//     const labelCategory = document.createElement("label");
//     labelCategory.setAttribute("for", "category");
//     labelCategory.textContent = "Catégorie";
//     const selectCategory = document.createElement("select");
//     selectCategory.id = "category";
//     selectCategory.name = "category";
//     selectCategory.required = true;
//     labelCategory.appendChild(selectCategory);
//     pCategory.appendChild(labelCategory);
//     divForm.appendChild(pCategory);

//     form.appendChild(divForm);

//     // Ligne bouton valider
//     const pBtnLine = document.createElement("p");
//     pBtnLine.classList.add("btnp-line");
//     const inputSubmit = document.createElement("input");
//     inputSubmit.type = "submit";
//     inputSubmit.classList.add("btn-valider-ajout");
//     inputSubmit.value = "Valider";
//     pBtnLine.appendChild(inputSubmit);
//     textError = document.createElement("span")
//     textError.classList.add("text-error-add-photo")
//     pBtnLine.appendChild(textError);
//     form.appendChild(pBtnLine);

//     gallery.appendChild(form);

//     // Remplir les catégories
//     try {
//         const response = await fetchData("http://localhost:5678/api/categories");
//         response.forEach(categories => {
//             const option = document.createElement("option");
//             option.value = categories.id;
//             option.textContent = categories.name;
//             selectCategory.appendChild(option);
//         });
//     } catch (error) {
//     }

//     // Validation en temps réel du formulaire
//     function validatePhotoForm() {
//         if ( inputTitle.value.trim() !== "" && inputFile.files.length > 0 && selectCategory.value !== "") {
//             inputSubmit.classList.add("active");
//             textError.textContent = ""
//         } else {
//             inputSubmit.classList.remove("active");
//         }
//     }

//     form.addEventListener("input", validatePhotoForm);
//     form.addEventListener("change", validatePhotoForm);
//     inputSubmit.addEventListener("click",() => {
//         if ( inputTitle.value.trim() !== "" && inputFile.files.length > 0 && selectCategory.value !== "") {
//             return
//         } else{
//             textError.textContent = "Veuillez remplir tout les champs"
//             textError.style.color = "red"
//         }
//         });

//     updateFocusables();
// }

// //* Fonction retour de la modale */
// function retourModal() {
//             const textTitreModal = document.querySelector(".modal h2");
//             const textBtn = document.querySelector(".btnp");
//             const gallery = document.querySelector(".ajout-galerie");

//             gallery.innerHTML = "";
//             textTitreModal.innerHTML = "Galerie photo";
//             textBtn.style.display = "flex";
//             gallery.classList.remove("ajout-projet");
//             modal();
// }

// //* Fonction fermeture de la modale */
// function closeModal() {
//         const modal = document.querySelector(".modal");
//         const modalContent = document.querySelector(".modal-content");
//         modal.style.display = "none";
//         modalContent.style.display = "none";
// }
 
// /* fonction de suppression de la photo, reçoit la figure à supprimer */
// async function deletePhoto(figure) {
//     const id = figure.getAttribute("data-id");
//     const token = window.localStorage.getItem("token");
  
//     const response = await fetch(`http://localhost:5678/api/works/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       if (response) {
//         figure.remove();
//         const portfolio = document.getElementById("portfolio");
//         portfolio.innerHTML = ""
//         projets();
//     } 
//     updateFocusables()
// }

// // fonction ajout d'un nouveau projet
// async function addPhoto(){
//     const formEl = document.querySelector('#form-ajout-photo');
//     const token = window.localStorage.getItem("token");
//     const formData = new FormData(formEl);

//     const response = await fetch('http://localhost:5678/api/works/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//     })
//         if (response) {
//         // retirer si on souhaite réouvrir la modale sur 'ajout photo'
//         retourModal();
//         //
//         closeModal();
//         const portfolio = document.getElementById("portfolio");
//         portfolio.innerHTML = ""
//         projets();
//         // ajouter si on souhaite réouvrir la modale sur 'ajout photo'
//         //modalAjoutPhoto()
//         } 

// }

// // fonction modification du 'File' dans la modale 'ajoutPhotos'
// function previewFile() {
//     const file = document.querySelector("input[type=file]").files[0];
//     const textError = document.querySelector(".text-error-add-photo");

//     if (file) {
//         if (file.size > 4 * 1024 * 1024) {
//             textError.innerText = "Le fichier dépasse la limite de 4 Mo."
//             textError.style.color = "red"
//             return;
//         } else {
//             textError.innerText = ""
//         }

//         const allowedTypes = ["image/jpeg", "image/png"];
//         if (!allowedTypes.includes(file.type)) {
//             textError.innerText = "Seuls les fichiers JPG et PNG sont autorisés."
//             textError.style.color = "red"
//             return;
//         } else {
//             textError.innerText = ""
//         }
//     }

//         const icone = document.querySelector(".picture-file");
//         const preview = document.querySelector("#preview");
//         const fileInfo = document.querySelector(".file-info");
//         const btnText = document.querySelector(".btn-text");
//         const reader = new FileReader();

//         preview.style.display = "block";
//         icone.style.display = "none";
//         fileInfo.style.display = "none";
//         btnText.style.display = "none";
//         reader.addEventListener(
//           "load",
//           () => {
//             preview.src = reader.result;
//           },
//           false,
//         );
      
//         if (file) {
//           reader.readAsDataURL(file);
//         }
// }

// // eventListener "click"
// document.body.addEventListener("click", function(e) {
//     if (e.target.closest("#user-open")) {
//         if (window.localStorage.getItem("token")) {
//             const userOpen = document.querySelector("#user-open")
//             userOpen.innerHTML = "login"
//             window.localStorage.clear()
//             window.location.href = "index.html";
//         } else {
//             const userOpen = document.querySelector("#user-open")
//             userOpen.classList.toggle("click");
//         }
//     }
//     if (e.target.closest(".btn-ajout")) {
//         // Afficher la modale ajout photo
//         modalAjoutPhoto();
//     }
//     if (e.target.closest(".btn-retour-modal")) {
//         // Retour : Ajouter une photo de la modale 
//         retourModal();
//     }
//     if (e.target.closest(".btn-close")) {
//         // Fermeture de la modale 
//         retourModal();
//         closeModal();
//     }
//     const modalContent = document.querySelector(".modal-content");
//     if (e.target === modalContent) {
//         // au clic en dehors de la modale, ferme la modale
//       closeModal();
//     }
//     if (e.target.closest(".icone-supprimer")) {
//         const figure = e.target.closest("figure");
//         // Suppression d'une photo 
//         deletePhoto(figure);
//     }
//     if (e.target.closest(".div-modification")) {
//         // Affichage de la modale de la galerie photo
//         const modal = document.querySelector(".modal");
//         const modalContent = document.querySelector(".modal-content");
//         modal.style.display = "flex";
//         modalContent.style.display = "flex";
//     }
// });

// // eventListener "submit"
// document.addEventListener("submit", function (e) {
//     if(e.target.closest("#form-ajout-photo")){
//         e.preventDefault();
//         addPhoto();
//     }
// });

// /* eventListener "keydown" */
// window.addEventListener("keydown", function(e) {
//     const modal = document.querySelector(".modal");
//     if (e.key === "Escape" || e.key === "Esc") {
//         closeModal();
//     }
//     const target = e.target.closest(".btn-retour-modal");
//     if (target && e.key === "Enter") {
//         retourModal();
//     }
//     // Exécuter le focus trap uniquement si la modale est visible
//     if (e.key === "Tab") {
//         // Vérifier si la modale est ouverte (par exemple, mode flex ou autre)
//         if (window.getComputedStyle(modal).display !== "none") {
//             e.preventDefault();
//             focusInModal(e);
//         }
//     }
// });

// /* focus tab */
// const focusInModal = function (e) {
//     const modal = document.querySelector(".modal");
//     e.preventDefault();
//     let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
//     if (e.shiftKey) {
//         index--;
//     }
//     else {
//         index++;
//     }
//     if (index >= focusables.length) {
//         index = 0;
//     }
//     if (index < 0) {
//         index = focusables.length - 1;
//     }

//     focusables[index].focus();
    
// }

// function updateFocusables() {
//     const modal = document.querySelector(".modal");
//     focusables = Array.from(modal.querySelectorAll(focusableSelector))
//         .filter(el => !el.disabled && el.offsetParent !== null);
// }

// /* Modification du login suivant le localStorage */
// if (window.localStorage.getItem("token")) {
//     const userOpen = document.getElementById("user-open");
//     userOpen.innerHTML = "log out";
//     userOpen.style.fontWeight = "700"
//     const modeEdition = document.createElement("div");
//     const iconeEdition = document.createElement("i");
//     const texteEdition = document.createElement("p");
//     const body = document.querySelector("body");
//     modeEdition.classList.add("mode-edition");
//     iconeEdition.classList.add("fa-solid", "fa-pen-to-square");
//     texteEdition.textContent = "Mode édition";
//     body.style.marginTop = "59px";
//     modeEdition.appendChild(iconeEdition);
//     modeEdition.appendChild(texteEdition);
//     body.appendChild(modeEdition);
// }

// function survolNav() {
//     const btnNav = document.querySelectorAll(".btn-nav li")
//     btnNav.forEach(btn => {
//         if (btn) {
//             btn.style.color = "", "important"
            
//         }

//     })
// }
// survolNav()

