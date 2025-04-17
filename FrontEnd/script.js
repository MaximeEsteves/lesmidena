/* appel de l'API pour récupérer les projets */
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
        projets(works);
        filtres(works);
    })

/* fonction d'affichage des filtres */
function filtres(works) {
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


    btnTous.addEventListener("click", function () {
        console.log("affichage de tous les projets");
        document.getElementById("portfolio").innerHTML = "";
        projets(works)
        filtres(works);
    });
    btnObjets.addEventListener("click", function () {
        console.log("affichage des objets");
        document.getElementById("portfolio").innerHTML = "";
        if (works) {
            const objets = works.filter(article => article.category.id === 1);
            projets(objets);
        }
        filtres(works);
    });
    btnAppartements.addEventListener("click", function () {
        console.log("affichage des appartements");
        document.getElementById("portfolio").innerHTML = "";
        if (works) {
            const objets = works.filter(article => article.category.id === 2);
            projets(objets);
        }
        filtres(works);
    });
    btnHotelsRestaurants.addEventListener("click", function () {
        console.log("affichage des hôtels et restaurants");
        document.getElementById("portfolio").innerHTML = "";
        if (works) {
            const objets = works.filter(article => article.category.id === 3);
            projets(objets);
        }
        filtres(works);
    });
}

/* fonction d'affichage des projets */
function projets(works) {
    const portfolio = document.getElementById("portfolio");
    const h2 = document.createElement("h2");
    h2.classList.add("titre_projet");
    h2.innerText = "Mes Projets";
    portfolio.appendChild(h2);
    const projet = document.createElement("div");
    projet.classList.add("gallery");
    portfolio.appendChild(projet);

    works.forEach(article => {
        const figure = document.createElement("figure");
        h2.classList.add("figure");
        projet.appendChild(figure);
    
    figure.innerHTML = 
    `
        <img src="${article.imageUrl}" alt="image de ${article.title}">
        <figcaption>${article.title}</figcaption>
    `;
    
});
}


/* bouton de connexion */
document.getElementById("user_open").addEventListener("click", () => toggleMenu());

/* fonction d'affichage du login */
function toggleMenu() {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>Log in</h2>
        <form action="#" method="post">
            <label for="email">E-mail</label>
            <input type="text" name="email" id="email">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" id="password">
            <input type="submit" value="Se connecter" id="submit">
        </form>
        <p id="text_connexion></p>
        <p><a href="#">Mot de passe oublié</a></p>
    `;
    
    // Ajouter une classe à la div
    div.classList.add("zone_connexion");
    
    // Ajouter la div au contenu principal
    main.innerHTML = ""; // Efface le contenu précédent
    main.appendChild(div);


    div.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const text_connexion = document.querySelector(".div #text_connexion");
        console.log(email, password);
        
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.reload(); // Recharge la page pour afficher les projets
                
            } else {
                text_connexion.textContent = "Identifiants incorrects";
            }
        })
        .catch(error => console.error('Erreur:', error));
    });
}

