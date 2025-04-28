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

/* Modification du login suivant le localStorage */
if (window.localStorage.getItem("token")) {
    const user_open = document.getElementById("user_open");
    user_open.innerHTML = "log out";
}

/* fonction d'affichage du login */
function toggleMenu() {
    const main = document.querySelector("main");
    let menu = document.getElementById("menu-login");
    
    if (!menu) {
        // Création du menu de connexion s'il n'existe pas encore
        menu = document.createElement("div");
        menu.setAttribute("id", "menu-login");
        menu.innerHTML = `
            <h2>Log in</h2>
            <form action="#" method="post" id="menu-connexion">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email">
                <label for="password">Mot de passe</label>
                <input type="password" name="password" id="password">
                <input type="submit" class="btnConnexion" value="Se connecter" >
            </form>
            <p><p>
            <p><a href="#">Mot de passe oublié</a></p>
        `;
           menu.classList.add("zone_connexion");
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
         const user_open = document.querySelector(".zone_connexion p");
         user_open.innerHTML = "Erreur de connexion, veuillez réessayer.";
         console.log("nnnooooooooo");
         
     }

}

/* fonction d'affichage des filtres */
async function filtres() {
    if (window.localStorage.getItem("token")) {
        return;
    } else {
    const titre = document.querySelector(".titre_projet");
    const zoneBtn = document.createElement("div");
    zoneBtn.classList.add("zoneBtn");
    const btnTous = document.createElement("button");
    btnTous.innerHTML = "Tous";
    btnTous.classList.add("btnTous");
    const btnObjets = document.createElement("button");
    btnObjets.classList.add("btnObjets");
    btnObjets.innerHTML = "Objets";
    const btnAppartements = document.createElement("button");
    btnAppartements.innerHTML = "Appartements";
    btnAppartements.classList.add("btnAppartements");
    const btnHotelsRestaurants = document.createElement("button");
    btnHotelsRestaurants.innerHTML = "Hôtels & restaurants";
    btnHotelsRestaurants.classList.add("btnHotelsRestaurants");

    titre.appendChild(zoneBtn);
    zoneBtn.appendChild(btnTous);
    zoneBtn.appendChild(btnObjets);
    zoneBtn.appendChild(btnAppartements);
    zoneBtn.appendChild(btnHotelsRestaurants);

     const worksData = await fetchData("http://localhost:5678/api/works");
     btnTous.addEventListener("click",  function () {
         document.getElementById("portfolio").innerHTML = "";
          projets(worksData);
          filtres();
     });
     btnObjets.addEventListener("click",  function () {
         document.getElementById("portfolio").innerHTML = "";
             const objets = worksData.filter(article => article.category.id === 1);
              projets(objets);
              filtres();
     });
     btnAppartements.addEventListener("click",  function () {
         document.getElementById("portfolio").innerHTML = "";
             const appartements = worksData.filter(article => article.category.id === 2);
              projets(appartements);
              filtres();
     });
     btnHotelsRestaurants.addEventListener("click",  function () {
         document.getElementById("portfolio").innerHTML = "";
             const hotelsRestaurants = worksData.filter(article => article.category.id === 3);
              projets(hotelsRestaurants);
              filtres();
     });
}
}
/* fonction d'affichage des projets */
async function projets(worksData) {
    const portfolio = document.getElementById("portfolio");
    const h2 = document.createElement("h2");
    h2.classList.add("titre_projet");
    h2.innerText = "Mes Projets";
    portfolio.appendChild(h2);
    const projet = document.createElement("div");
    projet.classList.add("gallery");
    portfolio.appendChild(projet);
    if (localStorage.getItem("token")) {
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
        figure.innerHTML = 
        `
        <img src="${article.imageUrl}" alt="image de ${article.title}">
        <figcaption>${article.title}</figcaption>
        `;
        projet.appendChild(figure);
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
          figure.innerHTML = 
          `
          <img src="${article.imageUrl}" alt="image de ${article.title}">
          <button class="icone_supprimer"><i class="fa-solid fa-trash-can"></i></button>
          `;
          gallery.appendChild(figure);
  });
  const modal = document.querySelector(".modal");
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    
}

/* fonction affichage de la modale d'ajout de photo */
function modalAjoutPhoto() {
      const textTitreModal = document.querySelector(".modal h2");
      const textBtn = document.querySelector(".btnp");
      const gallery = document.querySelector(".ajout_galerie");

      gallery.innerHTML = "";
      textTitreModal.innerHTML = "Ajout photo";
      textBtn.style.display = "none";


      gallery.classList.add("ajout_projet");

        gallery.innerHTML = 
          `
        <i class="fa-solid fa-arrow-left btn-retour-modal" role="button" aria-label="Retour" tabindex="0"></i>
        <form id="form-ajout-photo" enctype="multipart/form-data">
        <div class="formulaire_photo">
        <label class="custom-file-upload">
            <img src="" id="preview"style="display:none" alt="aperçu"/>
            <i class="fa-solid fa-image picture_file"></i>
            <span class="btn-text">+ Ajouter une photo</span>
            <span class="file-info">jpg, png : 4 Mo max</span>
            <input id="file-upload" name="image" type="file" onchange="previewFile()" required /> 
            </label>

            <p>
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" maxlength="32" required />
            </p>

            <p>
            <label for="category">Catégorie</label>
            <select id="category" name="category" required>
            <option value="1">Objets</option>
            <option value="2">Appartements</option>
            <option value="3">Hôtels & Restaurants</option>
            </select>
            </p>
        </div>
            <p class="btnpLine">
            <input type="submit" class="btnValiderAjout" value="Valider""/>
            </p>

            </form>

          `;
       // Fonction de validation en temps réel du formulaire
    function validatePhotoForm() {
        const titleInput = document.getElementById("title");
        const fileInput = document.getElementById("file-upload");
        const btnValidation = document.querySelector(".ajout_projet .btnValiderAjout")
        if (titleInput && fileInput) {
            if (titleInput.value.trim() !== "" && fileInput.files.length > 0) {
                btnValidation.classList.add("active")
            } else {
                btnValidation.classList.remove("active")
            }
        }
    }

    // Attacher les écouteurs sur le formulaire pour détecter les changements
    const formEl = document.getElementById("form-ajout-photo");
    if (formEl) {
        formEl.addEventListener("input", validatePhotoForm);
        formEl.addEventListener("change", validatePhotoForm);
    }
       
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
    const userOpen = document.getElementById("user_open");
    if (userOpen && e.key === "Enter") {
        toggleMenu();
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