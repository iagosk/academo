const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Simulação
    if (email === "admin@email.com" && senha === "123456") {

        window.location.href = "dashboard.html";

    } else {

        alert("E-mail ou senha inválidos.");

    }

});