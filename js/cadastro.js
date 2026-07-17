const form = document.getElementById("cadastroForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const instituicao = document.getElementById("instituicao").value.trim();

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const usuario = {
        nome,
        email,
        senha,
        instituicao
    };

    try {

        const resposta = await fetch(`${API_URL}/usuarios`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)

        });

        if (!resposta.ok) {
            alert("Erro ao cadastrar usuário.");
            return;
        }

        alert("Usuário cadastrado com sucesso!");

        window.location.href = "dashboard.html";

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível conectar ao servidor.");

    }

});