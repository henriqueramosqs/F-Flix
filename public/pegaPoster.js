const main = document.querySelector("main");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");

const urlInicial =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";
const urlFilmes =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=2";

const urlAnimes =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

const urlSeries =
  "https://api.themoviedb.org/3/tv/popular?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

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

// Só a section da pagina inicial recebe titulo
const createCards = (array, titulo) => {
  let section = document.createElement("section");
  if (titulo) {
    let h1 = document.createElement("h1");
    h1.textContent = titulo;
    section.appendChild(h1);
  }

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

const clearPage = () => {
  main.innerHTML = "";
};

const createPage = (filmes) => {
  clearPage();
  createCards(filmes);
};

// Pagina inicial tem uma funcao propria, pq o array é dividido nela
const createInicialPage = async (url) => {
  clearPage();

  const filmes = await getDados(url);

  let list1 = filmes.slice(0, 10);
  let list2 = filmes.slice(10, 20);

  createCards(list1, "Em alta");
  createCards(list2, "Populares");
};

const getDados = async (url, fn) => {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const { results } = response;
      return results;
    })
    .catch((e) => console.log(e));
};

window.addEventListener("load", () => {
  getMovie(urlInicial, createInicialPage);
});

menu.addEventListener("click", (e) => {
  console.log(e.target);
  let categoria = e.target.id;
  let url;
  let func = createPage;

  if (categoria === "inicio") {
    url = urlInicial;
    func = createInicialPage;
  } else if (categoria === "filmes") {
    url = urlFilmes;
  } else if (categoria === "series") {
    url = urlSeries;
  } else if (categoria === "animes") {
    url = urlAnimes;
  }

  getMovie(url, func);
});

logo.addEventListener("click", () => {
  getMovie(urlInicial, createInicialPage);
});
