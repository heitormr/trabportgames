function apiProcura(){
    let query=document.getElementById('texto_pesquisado').value
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeResultados;
    xhr.onerror = exibeErro;
    xhr.open('GET',`https://api.rawg.io/api/games?key=4bcce7efdeac4a46b17f72a269bff189&search=${query}`, false)
    xhr.send();
}

function exibeErro(){
    alert('Houve um erro com a requisição');
}

function exibeResultados(){
    let sectionTelaPesquisa = document.getElementById('dadosRetornados');
    let textoPesquisa = '';

    let dadosPesquisa = JSON.parse(this.responseText);
    console.log(dadosPesquisa);

    if(dadosPesquisa.results.length === 0){
        textoPesquisa = textoPesquisa + `
            <div class="itens-pesquisados">
                <p>Não foram encontrado resultados para a pesquisa feita!</p>
            </div>`
        ;
    }
    else{
        for(i = 0; i<dadosPesquisa.results.length; i++){
            let retornoPesquisa = dadosPesquisa.results[i];
            textoPesquisa = textoPesquisa + `
            <div class="box-cartaz card col-12 col-lg-3 col-md-4 col-sm-12">
                    <a href="detalhes_game.html?id=${retornoPesquisa.id}">
                        <img src="${retornoPesquisa.background_image}" class="imagempesquisa">
                    </a>
                    <span class="titulo"><b>${retornoPesquisa.name}</b></span>
                    <span class="data"><br><b>Data de Lançamento: </b>${retornoPesquisa.released}</span>
                    <span class="popularidade"><br><b>Rating: </b>${retornoPesquisa.rating}</span>
                    
                    <br>
                    <a href="detalhes_game.html?id=${retornoPesquisa.id}">
                        <button id="vejamais">VEJA MAIS</button>
                    </a>
            </div>`
            
        }
    }
    sectionTelaPesquisa.innerHTML=textoPesquisa;
}

document.getElementById('pesq').addEventListener('click', apiProcura);