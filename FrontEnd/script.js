const focusableSelector = 'a, textarea, button, i[tabindex], input, select';
let focusables = [];
let previousActiveElement = null;
/* appel de l'API pour récupérer les projets */
const fetchData = async (url, options = {}) => {
    try {
        const res = await fetch(url, options);
		if (res.ok) {
			const data = await res.json()
			//console.log(data)
			return data
		}
	} catch (error) {
        console.error("error", error.message)
        return error
	}
}
projets();
filtres();
modal();



/* fonction d'affichage du login */
function toggleMenu() {
    const main = document.querySelector("main");
    let menu = document.getElementById("menu-login");

    if (!menu) {
        // Création du menu de connexion s'il n'existe pas encore
        menu = document.createElement("div");
        menu.setAttribute("id", "menu-login");
        menu.classList.add("zone_connexion");

        // Titre
        const h2 = document.createElement("h2");
        h2.textContent = "Log in";
        menu.appendChild(h2);

        // Formulaire
        const form = document.createElement("form");
        form.setAttribute("action", "#");
        form.setAttribute("method", "post");
        form.setAttribute("id", "menu-connexion");

        // Label Email
        const labelEmail = document.createElement("label");
        labelEmail.setAttribute("for", "email");
        labelEmail.textContent = "E-mail";
        form.appendChild(labelEmail);

        // Input Email
        const inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.name = "email";
        inputEmail.id = "email";
        form.appendChild(inputEmail);

        // Label Password
        const labelPassword = document.createElement("label");
        labelPassword.setAttribute("for", "password");
        labelPassword.textContent = "Mot de passe";
        form.appendChild(labelPassword);

        // Input Password
        const inputPassword = document.createElement("input");
        inputPassword.type = "password";
        inputPassword.name = "password";
        inputPassword.id = "password";
        form.appendChild(inputPassword);

        // Bouton Connexion
        const inputSubmit = document.createElement("input");
        inputSubmit.type = "submit";
        inputSubmit.classList.add("btnConnexion");
        inputSubmit.value = "Se connecter";
        form.appendChild(inputSubmit);

        menu.appendChild(form);

        // Error connexion
        const textError = document.createElement("p");
        textError.classList.add("text_error_connexion");
        textError.textContent = "";
        textError.style.color = "red"

        menu.appendChild(textError);

        // Lien mot de passe oublié
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = "Mot de passe oublié";
        p.appendChild(a);
        menu.appendChild(p);

        // Masquer le contenu de base au lieu de le supprimer
        const baseContent = document.getElementById("base-content");
        if (baseContent) {
            baseContent.classList.add("hidden");
        }
        // Afficher le menu
        main.appendChild(menu);
    } else {
        // Masquer le menu et réafficher le contenu de base
        menu.remove();
        const baseContent = document.getElementById("base-content");
        if (baseContent) {
            baseContent.classList.remove("hidden");
        }
    }
}

 /* fonction connexion utilisateur */   
async function login() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const data = await fetchData("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
});
     if (data && data.token) {
         window.localStorage.setItem("token", data.token);
         const user_open = document.getElementById("user_open");
         user_open.innerHTML = "log out";
         window.location.reload();
     } else {
         const user_open = document.querySelector(".text_error_connexion");
         user_open.innerHTML = "Erreur de connexion, veuillez réessayer.";
     }

}

/* fonction d'affichage des filtres */
async function filtres() {
    if (window.localStorage.getItem("token")) {
        return;
    }
    const titre = document.querySelector(".titre_projet");
    let zoneBtn = document.querySelector(".zoneBtn");
    if (zoneBtn) {
        zoneBtn.remove(); // Pour éviter les doublons si filtres() est rappelée
    }
    zoneBtn = document.createElement("div");
    zoneBtn.classList.add("zoneBtn");

    // Récupération des projets
    const worksData = await fetchData("http://localhost:5678/api/works");

    // Création d'un Set pour stocker les catégories uniques
    const categoriesSet = new Set();
    worksData.forEach(article => {
        categoriesSet.add(article.category.name);
    });

    // Bouton "Tous"
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.classList.add("btnCategorie");
    btnTous.classList.add("clickBtn");
    btnTous.addEventListener("click", function () {
        const allBtns = document.querySelectorAll(".btnCategorie");
            allBtns.forEach(b => b.classList.remove("clickBtn"));

        const portfolio = document.getElementById("portfolio");
        portfolio.innerHTML = "";
        projets(worksData);

        btnTous.classList.add("clickBtn");
    });
    zoneBtn.appendChild(btnTous);

    // Création dynamique des boutons de filtre
    categoriesSet.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category;
        btn.classList.add("btnCategorie");
        btn.addEventListener("click", function () {
            const allBtns = document.querySelectorAll(".btnCategorie");
            allBtns.forEach(b => b.classList.remove("clickBtn"));

            const portfolio = document.getElementById("portfolio");
            portfolio.innerHTML = "";
            const filtered = worksData.filter(article => article.category.name === category);
            projets(filtered);

            btn.classList.add("clickBtn");
        });
        zoneBtn.appendChild(btn);
    });
    titre.appendChild(zoneBtn);
}
/* fonction d'affichage des projets */
async function projets(worksData) {
    const portfolio = document.getElementById("portfolio");
    portfolio.classList.add("gallery");
    if (localStorage.getItem("token")) {
        const h2 = document.querySelector(".titre_projet")
        const divModification = document.createElement("button");
        const pModification = document.createElement("p");
        const iModification = document.createElement("i");

        h2.style.marginBottom = "80px";
        pModification.innerHTML = "Modifier";
        iModification.classList.add("fa-solid", "fa-pen-to-square");
        divModification.classList.add("div_modification");

        divModification.appendChild(iModification);
        divModification.appendChild(pModification);
        h2.appendChild(divModification);
    }
 
    try {
        const works = worksData || await fetchData("http://localhost:5678/api/works");
        works.forEach(article => {
            const figure = document.createElement("figure");
            figure.dataset.id = article.id;

            const img = document.createElement("img");
            img.src = article.imageUrl;
            img.alt = `image de ${article.title}`;
            figure.appendChild(img);

            const figcaption = document.createElement("figcaption");
            figcaption.textContent = article.title;
            figure.appendChild(figcaption);

            portfolio.appendChild(figure);
        });
} catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);

}
}

//* fonction contenu de la modale Galarie Photo */
async function modal(){
    const gallery = document.querySelector(".ajout_galerie");
    const worksData = await fetchData("http://localhost:5678/api/works");

    worksData.forEach(article => {
        const figure = document.createElement("figure");
        figure.dataset.id = article.id;

        const img = document.createElement("img");
        img.src = article.imageUrl;
        img.alt = `image de ${article.title}`;
        figure.appendChild(img);

        const btnSupprimer = document.createElement("button");
        btnSupprimer.classList.add("icone_supprimer");

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");

        btnSupprimer.appendChild(icon);
        figure.appendChild(btnSupprimer);

        gallery.appendChild(figure);
    });
    
    // Mise à jour de la liste des éléments focusables dans la modale
    const modal = document.querySelector(".modal");
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    
}

/* fonction affichage de la modale d'ajout de photo */
async function modalAjoutPhoto() {
    const textTitreModal = document.querySelector(".modal h2");
    const textBtn = document.querySelector(".btnp");
    const gallery = document.querySelector(".ajout_galerie");

    // Nettoyage et configuration
    gallery.innerHTML = "";
    textTitreModal.innerHTML = "Ajout photo";
    textBtn.style.display = "none";
    gallery.classList.add("ajout_projet");

    // Bouton retour
    const btnRetour = document.createElement("i");
    btnRetour.classList.add("fa-solid", "fa-arrow-left", "btn-retour-modal");
    btnRetour.setAttribute("role", "button");
    btnRetour.setAttribute("aria-label", "Retour");
    btnRetour.setAttribute("tabindex", "0");
    gallery.appendChild(btnRetour);

    // Formulaire
    const form = document.createElement("form");
    form.setAttribute("id", "form-ajout-photo");
    form.setAttribute("enctype", "multipart/form-data");

    // Conteneur du formulaire
    const divForm = document.createElement("div");
    divForm.classList.add("formulaire_photo");

    // Label custom file upload
    const labelFile = document.createElement("label");
    labelFile.classList.add("custom-file-upload");

    // Image preview
    const imgPreview = document.createElement("img");
    imgPreview.id = "preview";
    imgPreview.style.display = "none";
    imgPreview.alt = "aperçu";
    labelFile.appendChild(imgPreview);

    // Icône image
    const icone = document.createElement("i");
    icone.classList.add("fa-solid", "fa-image", "picture_file");
    labelFile.appendChild(icone);

    // Texte bouton
    const spanBtnText = document.createElement("span");
    spanBtnText.classList.add("btn-text");
    spanBtnText.textContent = "+ Ajouter une photo";
    labelFile.appendChild(spanBtnText);

    // Infos fichier
    const spanFileInfo = document.createElement("span");
    spanFileInfo.classList.add("file-info");
    spanFileInfo.textContent = "jpg, png : 4 Mo max";
    labelFile.appendChild(spanFileInfo);

    // Input file
    const inputFile = document.createElement("input");
    inputFile.id = "file-upload";
    inputFile.name = "image";
    inputFile.type = "file";
    inputFile.required = true;
    inputFile.onchange = previewFile;
    labelFile.appendChild(inputFile);

    divForm.appendChild(labelFile);

    // Titre
    const pTitle = document.createElement("p");
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title");
    labelTitle.textContent = "Titre";
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.id = "title";
    inputTitle.name = "title";
    inputTitle.maxLength = 32;
    inputTitle.required = true;
    labelTitle.appendChild(inputTitle);
    pTitle.appendChild(labelTitle);
    divForm.appendChild(pTitle);

    // Catégorie
    const pCategory = document.createElement("p");
    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "category");
    labelCategory.textContent = "Catégorie";
    const selectCategory = document.createElement("select");
    selectCategory.id = "category";
    selectCategory.name = "category";
    selectCategory.required = true;
    labelCategory.appendChild(selectCategory);
    pCategory.appendChild(labelCategory);
    divForm.appendChild(pCategory);

    form.appendChild(divForm);

    // Ligne bouton valider
    const pBtnLine = document.createElement("p");
    pBtnLine.classList.add("btnpLine");
    const inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.classList.add("btnValiderAjout");
    inputSubmit.value = "Valider";
    pBtnLine.appendChild(inputSubmit);
    textError = document.createElement("p")
    pBtnLine.appendChild(textError);
    form.appendChild(pBtnLine);

    gallery.appendChild(form);

    // Remplir les catégories
    try {
        const response = await fetchData("http://localhost:5678/api/categories");
        response.forEach(categories => {
            const option = document.createElement("option");
            option.value = categories.id;
            option.textContent = categories.name;
            selectCategory.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
    }

    // Validation en temps réel du formulaire
    function validatePhotoForm() {
        if ( inputTitle.value.trim() !== "" && inputFile.files.length > 0 && selectCategory.value !== "") {
            inputSubmit.classList.add("active");
            textError.textContent = ""
        } else {
            inputSubmit.classList.remove("active");
        }
    }

    form.addEventListener("input", validatePhotoForm);
    form.addEventListener("change", validatePhotoForm);
    inputSubmit.addEventListener("click",() => {
        if ( inputTitle.value.trim() !== "" && inputFile.files.length > 0 && selectCategory.value !== "") {
            return
        } else{
            textError.textContent = "Veuillez remplir tout les champs"
            textError.style.color = "red"
        }
        });

    updateFocusables();
}

//* Fonction retour de la modale */
function retourModal() {
            const textTitreModal = document.querySelector(".modal h2");
            const textBtn = document.querySelector(".btnp");
            const gallery = document.querySelector(".ajout_galerie");

            gallery.innerHTML = "";
            textTitreModal.innerHTML = "Galerie photo";
            textBtn.style.display = "flex";
            gallery.classList.remove("ajout_projet");
            modal();
}

//* Fonction fermeture de la modale */
function closeModal() {
        const modal = document.querySelector(".modal");
        const modalContent = document.querySelector(".modal_content");
        modal.style.display = "none";
        modalContent.style.display = "none";
}
 
/* fonction de suppression de la photo, reçoit la figure à supprimer */
async function deletePhoto(figure) {
    const id = figure.getAttribute("data-id");
    const token = window.localStorage.getItem("token");
  
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      if (response) {
        figure.remove();
        const portfolio = document.getElementById("portfolio");
        portfolio.innerHTML = ""
        projets();
    } 
    updateFocusables()
}

// fonction ajout d'un nouveau projet
async function addPhoto(){
    const formEl = document.querySelector('#form-ajout-photo');
    const token = window.localStorage.getItem("token");
    // Construction du FormData à partir du <form> (formEl) (prend en compte tous les name=... du form)
    const formData = new FormData(formEl);

    const response = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        if (response) {
        // retirer si on souhaite réouvrir la modale sur 'ajout photo'
        retourModal();
        //
        closeModal();
        const portfolio = document.getElementById("portfolio");
        portfolio.innerHTML = ""
        projets();
        // ajouter si on souhaite réouvrir la modale sur 'ajout photo'
        //modalAjoutPhoto()
        } 

}

// fonction modification du 'File' dans la modale 'ajoutPhotos'
function previewFile() {
        const icone = document.querySelector(".picture_file");
        const preview = document.querySelector("#preview");
        const fileInfo = document.querySelector(".file-info");
        const btnText = document.querySelector(".btn-text");
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();
        preview.style.display = "block";
        icone.style.display = "none";
        fileInfo.style.display = "none";
        btnText.style.display = "none";
        reader.addEventListener(
          "load",
          () => {
            preview.src = reader.result;
          },
          false,
        );
      
        if (file) {
          reader.readAsDataURL(file);
        }
}

// eventListener "click"
document.body.addEventListener("click", function(e) {
    if (e.target.closest("#user_open")) {
        if (window.localStorage.getItem("token")) {
            const userOpen = document.querySelector("#user_open")
            userOpen.innerHTML = "login"
            window.localStorage.clear()
            window.location.reload();
        } else {
            const userOpen = document.querySelector("#user_open")
            userOpen.classList.toggle("click");
            // Afficher la modale de connexion
            toggleMenu()
        }
    }
    if (e.target.closest(".btn_ajout")) {
        // Afficher la modale ajout photo
        modalAjoutPhoto();
    }
    if (e.target.closest(".btn-retour-modal")) {
        // Retour : Ajouter une photo de la modale 
        retourModal();
    }
    if (e.target.closest(".btn_close")) {
        // Fermeture de la modale 
        retourModal();
        closeModal();
    }
    const modalContent = document.querySelector(".modal_content");
    if (e.target === modalContent) {
        // au clic en dehors de la modale, ferme la modale
      closeModal();
    }
    if (e.target.closest(".icone_supprimer")) {
        const figure = e.target.closest("figure");
        // Suppression d'une photo 
        deletePhoto(figure);
    }
    if (e.target.closest(".div_modification")) {
        // Affichage de la modale de la galerie photo
        const modal = document.querySelector(".modal");
        const modalContent = document.querySelector(".modal_content");
        modal.style.display = "flex";
        modalContent.style.display = "flex";
    }
});

// eventListener "submit"
document.addEventListener("submit", function (e) {
    if(e.target.closest("#menu-connexion")){
        e.preventDefault();
        login();
    }
    if(e.target.closest("#form-ajout-photo")){
        e.preventDefault();
        addPhoto();
    }
});

/* eventListener "keydown" */
window.addEventListener("keydown", function(e) {
    const modal = document.querySelector(".modal");
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal();
    }
    const target = e.target.closest(".btn-retour-modal");
    if (target && e.key === "Enter") {
        retourModal();
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

/* focus tab */
const focusInModal = function (e) {
    const modal = document.querySelector(".modal");
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey) {
        index--;
    }
    else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }

    focusables[index].focus();
    
}

function updateFocusables() {
    const modal = document.querySelector(".modal");
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
        .filter(el => !el.disabled && el.offsetParent !== null);
}

/* Modification du login suivant le localStorage */
if (window.localStorage.getItem("token")) {
    const user_open = document.getElementById("user_open");
    user_open.innerHTML = "log out";
    const modeEdition = document.createElement("div");
    const iconeEdition = document.createElement("i");
    const texteEdition = document.createElement("p");
    const body = document.querySelector("body");
    modeEdition.classList.add("mode_edition");
    iconeEdition.classList.add("fa-solid", "fa-pen-to-square");
    texteEdition.textContent = "Mode édition";
    body.style.marginTop = "59px";
    modeEdition.appendChild(iconeEdition);
    modeEdition.appendChild(texteEdition);
    body.appendChild(modeEdition);
}