
    let urlGames ="https://api.rawg.io/api/games?key=4bcce7efdeac4a46b17f72a269bff189&dates=2022-01-01,2022-11-17&page_size=12";


    
    let urlLojas ="https://api.rawg.io/api/stores?key=4bcce7efdeac4a46b17f72a269bff189&page_size=9";

    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('id') != null) carregaMaisDetalhes();
    
   

function showGames(){
    let sectionTela = document.getElementById('divListaGames');
    let texto = '';

    let dados = JSON.parse(this.responseText);

    for(i = 0; i<dados.results.length; i++){
        let game = dados.results[i];
        let data = game.released;
        texto = texto + `
        <div class="card col-12 col-lg-3 col-md-3 col-sm-12">
                 <img src="${game.background_image}" class="card-img-top" width="200" alt="Game">
                 <div class="card-body">
                     <h5 class="card-title">${game.name}</h5>
                     <p class="card-text">Data de lançamento: ${game.released}</p>
                     <p class="card-text">Rating: ${game.rating}</p>
                     <a href="detalhes_game.html?id=${game.id}" class="btn btn-primary">Veja mais detalhes</a>
                 </div>
             </div>
        `;
    }
    sectionTela.innerHTML = texto;
}

function showLojas(){
    let sectionTela = document.getElementById('divListaLojas');
    let texto = '';

    let dados = JSON.parse(this.responseText);
    console.log(dados);
    for(i = 0; i<dados.results.length; i++){
        let loja = dados.results[i];
        let data = loja.release_date;
        texto = texto + `
        <div class="card col-12 col-lg-4 col-md-4 col-sm-12 ">
                 <img src="${loja.image_background}" class="card-img-top" width="200" alt="">
                 <div class="card-body VejaMais">
                     <h5 class="card-title">${loja.name}</h5>
                     <p class="card-text">Site: ${loja.domain}</p>  
                     <p class="card-text">Numero de jogos: ${loja.games_count}</p>
                                                            
                 </div>
             </div>
        `;
    }
    sectionTela.innerHTML = texto;
}

function getGames(url){
    let xhr = new XMLHttpRequest();

    if(url ===  urlGames){
        xhr.onload = showGames;
    }
    else if(url === urlLojas){
        xhr.onload = showLojas;
    }
    else{
        alert('url inválida!');
    }

    xhr.open('GET', url, false);
    xhr.send();
}
function carregaMaisDetalhes () {
    http = new XMLHttpRequest();
    let idJogo = parseInt(urlParams.get('id'));
    let response;
    http.onload = function () {
        response = JSON.parse(http.responseText);
        document.getElementById("imagemJogo").src = response.background_image;
        document.getElementById("nomeJogo").innerHTML = response.name_original;
        document.getElementById("lancamento").innerHTML = response.released;
        document.getElementById("avaliacao").innerHTML = response.metacritic;
        document.getElementById("descricaoJogo").innerHTML = response.description;
        document.getElementById("publisher").innerHTML = response.developers.map(i => i.name).toString();
        document.getElementById("plataformas").innerHTML = response.platforms.map(i => i.platform.name).toString();
        document.getElementById("genero").innerHTML = response.genres.map(i => i.name).toString();
        document.getElementById("avaliacao").innerHTML = response.metacritic;
        document.getElementById("lojas").innerHTML = response.stores.map(i => i.store.name).toString();
    }
  
    http.open("GET", "https://api.rawg.io/api/games/"+idJogo+'?key=4bcce7efdeac4a46b17f72a269bff189');
    http.send();
  }
  

getGames(urlGames);
getGames(urlLojas);
