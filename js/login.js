const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch("http://localhost:3030/usuarios/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        const dados = await resposta.json();

        if (resposta.ok) {

            alert(dados.mensagem);

            window.location.href = "dashboard.html";

        } else {

            alert(dados.message || dados.mensagem);

        }

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível conectar ao servidor.");

    }

});