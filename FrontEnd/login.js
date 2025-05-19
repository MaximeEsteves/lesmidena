 const fetchData = async (url, options = {}) => {
    try {
        const res = await fetch(url, options);
		if (res.ok) {
			const data = await res.json()
			return data
		}
	} catch (error) {
        return error
	}
}
 /* fonction connexion utilisateur */   
async function login() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const data = await fetchData("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
});
     if (data && data.token) {
         window.localStorage.setItem("token", data.token);
         const userOpen = document.getElementById("user-open");
         userOpen.innerHTML = "log out";
         window.location.href = "index.html";
     } else {
         const userOpen = document.querySelector(".text-error-connexion");
         userOpen.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
     }

}

// eventListener "submit"
document.addEventListener("submit", function (e) {
    if(e.target.closest("#menu-connexion")){
        e.preventDefault();
        login();
    }
});
