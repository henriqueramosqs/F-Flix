// var listaFilmesEmAlta = [];
// function criarFilme(titulo, poster, index) {
//   var filme = {};
//   filme.titulo = titulo;
//   filme.poster = poster;
//   filme.index = index;
//   listaFilmesEmAlta.push(filme);
//   trocaImagem(filme);
// }

// function trocaImagem(filme) {
//   var capaCSS = document.getElementsByClassName("video");
//   capaCSS[filme.index].style.background = 'url("' + filme.poster + '")';
//   capaCSS[filme.index].style.backgroundSize = "cover";
//   capaCSS[filme.index].style.backgroundPosition = "center";
// }

// //Request para em alta
// const options = {
//   method: "GET",
//   url:
//     " https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1",
// };
// axios.request(options).then(function (response) {
//   for (var i = 0; i < 6; i++) {
//     //console.log(response.data.results[i].original_title);
//     //console.log(response.data.results[i].poster_path);
//     criarFilme(
//       response.data.results[i].original_title,
//       "https://image.tmdb.org/t/p/w500/" + response.data.results[i].poster_path,
//       i
//     );
//   }
// });
// //Request para em popular
// const options2 = {
//   method: "GET",
//   url:
//     " https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1",
// };
// axios.request(options2).then(function (response2) {
//   for (var i = 6; i < 12; i++) {
//     //console.log(response.data.results[i].original_title);
//     //console.log(response.data.results[i].poster_path);
//     criarFilme(
//       response2.data.results[i].original_title,
//       "https://image.tmdb.org/t/p/w500/" +
//         response2.data.results[i].poster_path,
//       i
//     );
//   }
// });
const main = document.querySelector("main");
const url =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

const createCard = (filme) => {
  let card = document.createElement("div");
  card.classList.add("video");
  card.id = filme[0];

  let info = document.createElement("div");
  info.classList.add("info-hidden");
  let title = document.createElement("h1");
  let sinopse = document.createElement("p");

  sinopse.textContent = filme[3];
  title.textContent = filme[1];

  info.appendChild(title);
  info.appendChild(sinopse);

  let divPoster = document.createElement("div");
  divPoster.classList.add("poster");
  const url = `https://image.tmdb.org/t/p/w500/${filme[2]}`;
  let poster = document.createElement("img");
  poster.src = url;

  divPoster.appendChild(poster);

  card.appendChild(divPoster);
  card.appendChild(info);

  return card;
};

const createCards = (array, titulo) => {
  let section = document.createElement("section");
  let h1 = document.createElement("h1");
  h1.textContent = titulo;

  section.appendChild(h1);

  let div = document.createElement("div");
  div.classList.add("movie-container");

  array.forEach((obj) => {
    const { id, title, poster_path, overview } = obj;
    let filme = [id, title, poster_path, overview];
    let card = createCard(filme);

    div.appendChild(card);
  });

  section.appendChild(div);

  main.appendChild(section);
};

//
const getMovie = () => {
  return fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1"
  )
    .then((response) => response.json())
    .then((response) => {
      const { results } = response;
      let list1 = results.slice(0, 10);
      let list2 = results.slice(10, 20);
      createCards(list1, "Em alta");
      createCards(list2, "Polupares");
    });
};

getMovie();
