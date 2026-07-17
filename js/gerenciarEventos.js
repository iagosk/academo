const container = document.getElementById("eventosContainer");

const form = document.getElementById("eventoForm");


// carregar eventos

async function listarEventos(){


const resposta = await fetch(`${API_URL}/eventos`);

const eventos = await resposta.json();



container.innerHTML = "";



eventos.forEach(evento => {


container.innerHTML += `

<div class="card-evento">

<h3>${evento.titulo}</h3>

<p>${evento.descricao}</p>

<p>
${evento.data_inicio}
até
${evento.data_fim}
</p>

<p>${evento.local}</p>


<button onclick="editarEvento(${evento.id})">
Editar
</button>


<button onclick="deletarEvento(${evento.id})">
Excluir
</button>


</div>

`;

});


}




// criar evento


form.addEventListener("submit", async(e)=>{


e.preventDefault();


const evento = {


titulo:
document.getElementById("titulo").value,


descricao:
document.getElementById("descricao").value,


data_inicio:
document.getElementById("data_inicio").value,


data_fim:
document.getElementById("data_fim").value,


local:
document.getElementById("local").value


};



await fetch(`${API_URL}/eventos`,{


method:"POST",


headers:{
"Content-Type":"application/json"
},


body:JSON.stringify(evento)


});



alert("Evento criado!");



form.reset();


listarEventos();



});





// deletar evento


async function deletarEvento(id){


await fetch(`${API_URL}/eventos/${id}`,{


method:"DELETE"


});


listarEventos();


}




// editar evento


async function editarEvento(id){


const novoTitulo = prompt("Novo título:");



await fetch(`${API_URL}/eventos/${id}`,{


method:"PATCH",


headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

titulo:novoTitulo

})


});


listarEventos();


}



listarEventos();