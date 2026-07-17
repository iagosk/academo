async function login(email, senha){

    const resposta = await fetch(`${API_URL}/login`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email,
            senha

        })

    });

    if(!resposta.ok){

        throw new Error("E-mail ou senha inválidos.");

    }

    return await resposta.json();

}