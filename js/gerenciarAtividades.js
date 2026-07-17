const form = document.getElementById("atividadeForm");

const container = document.getElementById("atividadesContainer");



// Buscar atividades

async function listarAtividades(){


    const resposta = await fetch(`${API_URL}/atividades`);

    const atividades = await resposta.json();


    container.innerHTML = "";


    atividades.forEach(atividade => {


        container.innerHTML += `


        <div class="card-atividade">


            <h3>
                ${atividade.titulo}
            </h3>


            <p>
                ${atividade.descricao}
            </p>


            <p>
                Tipo:
                ${atividade.tipo_atividade}
            </p>


            <p>
                Data:
                ${atividade.data_hora}
            </p>


            <p>
                Vagas:
                ${atividade.vagas_totais}
            </p>


            <p>
                Local:
                ${atividade.local_especifico}
            </p>



            <button onclick="editarAtividade(${atividade.id})">
                Editar
            </button>


            <button onclick="deletarAtividade(${atividade.id})">
                Excluir
            </button>



        </div>


        `;


    });


}





// Criar atividade


form.addEventListener("submit", async(event)=>{


    event.preventDefault();



    const atividade = {


        titulo:
        document.getElementById("titulo").value,


        descricao:
        document.getElementById("descricao").value,


        tipo_atividade:
        document.getElementById("tipo_atividade").value,


        data_hora:
        document.getElementById("data_hora").value,


        vagas_totais:
        Number(document.getElementById("vagas_totais").value),


        local_especifico:
        document.getElementById("local_especifico").value


    };



    await fetch(`${API_URL}/atividades`,{


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify(atividade)


    });



    alert("Atividade criada!");


    form.reset();


    listarAtividades();


});






// Deletar atividade


async function deletarAtividade(id){


    await fetch(`${API_URL}/atividades/${id}`,{


        method:"DELETE"


    });



    listarAtividades();


}






// Editar atividade


async function editarAtividade(id){


    const novoTitulo = prompt(
        "Digite o novo título:"
    );


    await fetch(`${API_URL}/atividades/${id}`,{


        method:"PATCH",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            titulo:novoTitulo

        })


    });



    listarAtividades();


}





listarAtividades();