var listaFilmesEmAlta = []
function criarFilme(titulo, poster, index){
    var filme = {};
    filme.titulo = titulo;
    filme.poster = poster;
    filme.index = index;
    listaFilmesEmAlta.push(filme);
    trocaImagem(filme);
}

function trocaImagem(filme){
  var capaCSS = document.getElementsByClassName("video");
  capaCSS[filme.index].style.background = 'url("' + filme.poster+ '")';
  capaCSS[filme.index].style.backgroundSize = "cover";
  capaCSS[filme.index].style.backgroundPosition= "center";
}

//Request para em alta
const options ={
  method: 'GET',
  url: ' https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1'}
  axios.request(options).then(function(response){
    for(var i=0; i < 6; i++){
      //console.log(response.data.results[i].original_title);
      //console.log(response.data.results[i].poster_path);
      criarFilme(response.data.results[i].original_title,"https://image.tmdb.org/t/p/w500/" + response.data.results[i].poster_path, i)
    }


  });
  //Request para em popular
  const options2 ={
    method: 'GET',
    url: ' https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1'}
    axios.request(options2).then(function(response2){
      for(var i=6; i < 12; i++){
        //console.log(response.data.results[i].original_title);
        //console.log(response.data.results[i].poster_path);
        criarFilme(response2.data.results[i].original_title,"https://image.tmdb.org/t/p/w500/" + response2.data.results[i].poster_path, i)
      }


    });
