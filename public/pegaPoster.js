const main = document.querySelector("main");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const time = document.querySelector(".team");



const urlInicial =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

const urlFilmes =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=2";

const urlAnimes =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

const urlSeries =
  "https://api.themoviedb.org/3/tv/popular?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

const createCard = (filme) => {
  //console.log(filme);
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
  //console.log(array);
  //console.log(titulo);
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

const createPage = async (url) => {
  clearPage();
  const filmes = await getDados(url);

  console.log(filmes);
  createCards(filmes);
};

// Pagina inicial tem uma funcao propria, pq o array é dividido nela
const createInicialPage = async (url) => {
  clearPage();

  const filmes = await getDados(url);
  //console.log(filmes);
  let list1 = filmes.slice(0, 10);
  let list2 = filmes.slice(10, 20);

  createCards(list1, "Em alta");
  createCards(list2, "Populares");
};

const getDados = async (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const { results } = response;
      return results;
    })
    .catch((e) => console.log(e));
};

window.addEventListener("load", () => {
  createInicialPage(urlInicial);
});
logo.addEventListener("click", () => {
  createInicialPage(urlInicial);
});

menu.addEventListener("click", (e) => {
  //console.log(e.target);
  let categoria = e.target.id;
  let url;
  let func = createPage;

  if (categoria === "inicio") {
    url = urlInicial;
    createInicialPage(url);
  } else {
    if (categoria === "filmes") {
      url = urlFilmes;
    } else if (categoria === "series") {
      url = urlSeries;
    } else if (categoria === "animes") {
      url = urlAnimes;
    }
    createPage(url);
  }
});

//pro squad
const membro1 ={
    nome: "Matheus de Gondra",
    linkedin: "https://github.com/Matheus-Gondra",
    github: "https://www.linkedin.com/mwlite/in/matheus-gondra-a187a81a3"

};
const membro2 ={
    nome: "Renan Loureiro",
    linkedin: "https://github.com/renanloureiroo",
    github: "https://github.com/renanloureiroo"
};
const membro3 ={
    nome: "Henrique Ramos",
    linkedin: "https://www.linkedin.com/in/henrique-ramos-02b4151b0",
    github: "https://github.com/henriqueramosqs"
};
const membro4 ={
    nome: "Gabriel Pires",
    linkedin: "https://www.linkedin.com/in/gabriel-r-pires/",
    github: "https://github.com/DevGabrielPires"
};
const membro5 ={
    nome: "Renan Tomazini",
    linkedin: "https://www.linkedin.com/in/renan-tomazini-b9a75263/",
    github: "https://github.com/rtomazini42"
};

const membros = [membro1,membro2,membro3,membro4,membro5];

function participantes(){
  //let section = document.createElement("section");
  let div = document.createElement("div");
  div.classList.add("participantescontainer");
  let h1 = document.createElement("h1");
  h1.textContent = "O Squad:"
  div.appendChild(h1);
  for (var i in membros){
    let divt = document.createElement("div");
    divt.classList.add("membro");
    let h2 = document.createElement("h2");
    h2.textContent = membros[i].nome;
    divt.appendChild(h2);
    let a = document.createElement("a");
    a.textContent = "Linkedin";
    a.href=`${membros[i].linkedin}`;
    divt.appendChild(a);
    let br = document.createElement("br");
    divt.appendChild(br);
    let a2 = document.createElement("a");
    a2.textContent = "Github";
    a2.href="public/cartazSquad4.jpg";
    divt.appendChild(a2);
    div.appendChild(divt);
  }
  //section.appendChild(div);
  main.appendChild(div);



}


time.addEventListener("click", (e) => {
  clearPage();
  //let section = document.createElement("section");
  let div = document.createElement("div");
  div.classList.add("nossocontainer");
  //div.classList.add("s-container");
  let filme = [1, "Squad 4", "nope.jpg", "5 pessoas, uma hackton."];
  let card = createCard(filme);
  image = card.querySelector('img').src="public/cartazSquad4.jpg";
  //card.querySelector('.poster').classList.add("nossoCartaz");
  //card.querySelector('.poster').classList.remove("poster");
  //console.log(image);
  div.appendChild(card);
  //section.appendChild(div);
  main.appendChild(div);
  participantes();

});
