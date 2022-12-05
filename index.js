window.addEventListener("load", () => {
      boton = document.getElementsByTagName("button")[0];
      boton_pokemon = document.getElementsByTagName("button")[1];
      lista = document.getElementsByTagName("ul")[0];
      input = document.getElementById("pokemon");
      body = document.body;

      boton.addEventListener("click", lanzaPeticion);
      boton_pokemon.addEventListener("click", lanzaPeticion);
})
var http = new XMLHttpRequest();
contador = 00;

window.onscroll = function (){
      var scroll = document.documentElement.scrollTop || document.body.scrollTop;
  
      if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 400){
                  peticion= "https://pokeapi.co/api/v2/pokemon/" + contador;
                  lanzarPeticion2("https://pokeapi.co/api/v2/pokemon/" + contador)
                  contador++;
      }
  }


function trataRespuestaTodos(primera){
      if (http.status == 200 && http.readyState == 4 && primera) {
            lista.innerHTML = "";
            datos = JSON.parse(http.responseText);
            for(pokemon of datos.results){
                  lanzarPeticion2(pokemon.url)
                  contador++;
            }
      }else if(http.status == 200 && http.readyState == 4){
            datos = JSON.parse(http.responseText);
            
      }
}

function trataRespuestaTodos2(http){
      if(http.status == 200 && http.readyState == 4){
            datos = JSON.parse(http.responseText);
            crearCard(datos);
      }
}

function lanzarPeticion2(peticion){
      var http = new XMLHttpRequest();
      http.open("GET",peticion,true);
      http.onreadystatechange = () =>{
            trataRespuestaTodos2(http);
      }
      http.send();
}


function lanzaPeticion(e,peticion=null){
      primera = false;
      if(peticion==null && e.target.id == "todos"){
            primera=true
            peticion="https://pokeapi.co/api/v2/pokemon/";
      }else if(peticion==null && e.target.id == "uno") {
            peticion="https://pokeapi.co/api/v2/pokemon/" +input.value+"/";
      }
      http.open("GET",peticion,true);
      http.onreadystatechange = () =>{
            if (input.value=="")
                  trataRespuestaTodos(primera);
            else if (input.value!="")
                  trataRespuestaUno();
      }
      http.send();
}

function trataRespuestaUno(){
      lista.innerHTML = ""; 
      input.value = "";
      if(http.status == 200 && http.readyState == 4){
            datos = JSON.parse(http.responseText);
            crearCard(datos);
      }else if (http.status == 404){
            li = document.createElement("li");
            li.innerHTML = "No existe el pokemon";
            lista.appendChild(li);
      }else if (http.readyState == 3 || http.readyState == 2){
            li = document.createElement("li");
            li.innerHTML = "Cargando...";
            lista.appendChild(li);
      }
}


function crearCard(datos){
            //parte1
            div = document.createElement("div");
            div.className = "card";
            li = document.createElement("li");
            li.className = "parte parte1";
            div_contenido = document.createElement("div");
            div_contenido.className = "contenido";
            img = document.createElement("img");
            img.src = datos.sprites.back_default;
            div_contenido.appendChild(img);
            li.appendChild(div_contenido);
            div.appendChild(li);

            //parte2
            li = document.createElement("li");
            li.className = "parte parte2";
            div_contenido = document.createElement("div");
            div_contenido.className = "contenido";
            p = document.createElement("p");
            p.innerHTML = "Nombre: " + datos.name;
            p2 = document.createElement("p");
            p2.innerHTML = "Peso: " + datos.weight;
            p3 = document.createElement("p");
            p3.innerHTML = "Altura: " + datos.height;
            p4 = document.createElement("p");
            p4.innerHTML = "Experiencia base: " + datos.base_experience;
            div_contenido.appendChild(p);
            div_contenido.appendChild(p2);
            div_contenido.appendChild(p3);
            div_contenido.appendChild(p4);
            li.appendChild(div_contenido);
            div.appendChild(li);
            lista.appendChild(div);
}