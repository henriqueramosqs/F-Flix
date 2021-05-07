const main = document.querySelector("main");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const time = document.querySelector(".team");
const aleatorio = document.querySelector("#random");
let marginLAlta = 0;
let marginLPopulares = 0;

const urlInicial =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=1";

const urlFilmes =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=904500eca10a6afd9905c36e0430cf63&language=en-US&page=2";

const createIframe = (urlTrailer) => {
  const iframe = `<iframe src="${urlTrailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  return iframe;
};

const verifTrailer = async (id) => {
  const respost = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=6ac040cdb08ce2085e436dba651a25aa&language=en-US`
  ).then(async (r) => {
    let t = await getTrailer(id);
    if (r.ok && t !== false) {
      return true;
    }
  });
  return respost;
};

const getTrailer = (idFilme) => {
  const url = `https://api.themoviedb.org/3/movie/${idFilme}/videos?api_key=6ac040cdb08ce2085e436dba651a25aa&language=en-US`;
  const resposta = fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      let { results } = response;
      return results[0];
    })
    .then((results) => {
      const { key } = results;
      return key ? `https://www.youtube.com/embed/${key}` : false;
    })
    .catch((e) => console.log(e.message));
  return resposta;
};

const getFilme = (idFilme) => {
  const url = `https://api.themoviedb.org/3/movie/${idFilme}?api_key=6ac040cdb08ce2085e436dba651a25aa&language=en-US`;

  const res = fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const { title, overview, release_date } = response;

      return [title, overview, release_date];
    });

  return res;
};

const pageTrailer = async (id) => {
  const section = document.createElement("section");
  section.classList.add("trailer-container");

  const divIframe = document.createElement("div");
  divIframe.classList.add("iframe-container");

  const divInfo = document.createElement("div");
  divInfo.classList.add("info-container");

  const urlTrailer = await getTrailer(id);
  console.log(urlTrailer);
  const [title, overview, release_date] = await getFilme(id);

  if (urlTrailer) {
    clearPage();

    const ti = document.createElement("h3");
    const data = document.createElement("p");
    const sinopse = document.createElement("p");

    ti.textContent = `Título: ${title}`;
    data.textContent = `Data de lançamento: ${release_date}`;
    sinopse.textContent = `Sinopse: ${overview}`;

    divInfo.appendChild(ti);
    divInfo.appendChild(data);
    divInfo.appendChild(sinopse);

    const iFrame = createIframe(urlTrailer);

    divIframe.innerHTML = iFrame;

    section.appendChild(divIframe);
    section.appendChild(divInfo);

    main.appendChild(section);
  }
};

const createCard = (filme) => {
  let card = document.createElement("div");
  card.classList.add("video");
  card.id = filme[0];

  let divPoster = document.createElement("div");
  divPoster.classList.add("poster");
  const url = `https://image.tmdb.org/t/p/w500/${filme[1]}`;
  let poster = document.createElement("img");
  poster.src = url;

  divPoster.appendChild(poster);

  card.appendChild(divPoster);

  return card;
};

// Só a section da pagina inicial recebe titulo
const createCards = (array, titulo) => {
  let section = document.createElement("section");

  let div = document.createElement("div");

  if (titulo) {
    let h2 = document.createElement("h2");
    h2.textContent = titulo;
    section.appendChild(h2);
    const btnL = document.createElement("button");
    btnL.classList.add("btnL");
    btnL.classList.add("btn");
    const btnR = document.createElement("button");
    btnR.classList.add("btnR");
    btnR.classList.add("btn");

    btnR.addEventListener("click", () => {
      let marginEmAlta = titulo === "Em alta";
      if (marginEmAlta) {
        if (marginLAlta * -1 < 900) {
          marginLAlta = marginLAlta - 300;
          div.style.marginLeft = `${marginLAlta}px`;
        }
      } else {
        if (marginLPopulares * -1 < 900) {
          marginLPopulares = marginLPopulares - 300;
          div.style.marginLeft = `${marginLPopulares}px`;
        }
      }
    });

    btnL.addEventListener("click", () => {
      let marginEmAlta = titulo === "Em alta";
      if (marginEmAlta) {
        if (marginLAlta * -1 > 0) {
          marginLAlta = marginLAlta + 300;
          div.style.marginLeft = `${marginLAlta}px`;
        }
      } else {
        if (marginLPopulares * -1 > 0) {
          marginLPopulares = marginLPopulares + 300;
          div.style.marginLeft = `${marginLPopulares}px`;
        }
      }
    });

    section.appendChild(btnL);
    section.appendChild(btnR);
  }
  if (titulo) {
    div.classList.add("movie-container");
    main.classList.remove("containerF");
    main.classList.add("container");
  } else {
    div.classList.add("movie-containerF");
    main.classList.remove("container");
    main.classList.add("containerF");
  }

  array.forEach((obj) => {
    const { id, poster_path } = obj;
    verifTrailer(id).then((res) => {
      if (res) {
        let filme = [id, poster_path];
        let card = createCard(filme);
        card.addEventListener("click", (e) => {
          let movieId = e.target;
          movieId = movieId.parentNode.parentNode.id;
          pageTrailer(movieId);
        });
        div.appendChild(card);
      }
    });
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
  createCards(filmes);
};

// Pagina inicial tem uma funcao propria, pq o array é dividido nela
const createInicialPage = async (url) => {
  clearPage();
  try {
    const filmes = await getDados(url);
    let list1 = filmes.slice(0, 10);
    let list2 = filmes.slice(10, 20);

    createCards(list1, "Em alta");
    createCards(list2, "Populares");
  } catch (e) {
    const h1 = document.createElement(h2);
    h1.textContent = e.sta;
  }
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

const random = (min, max) => {
  const num = Math.round(Math.random() * (max - min)) + min;
  return num;
};

// Função escolhe aleatoriamente, algo dentro do catalago da aplicação, algo para ser assistido
const randomFilme = async () => {
  try {
    const indiceUrl = random(0, 1);
    const indiceResultado = random(0, 19);

    const url = [urlInicial, urlFilmes];

    const filmeEscolhido = await getDados(url[indiceUrl]).then(
      (resultado) => resultado[indiceResultado]
    );
    const { id } = filmeEscolhido;

    pageTrailer(id);
  } catch {
    console.log("erro");
    randomFilme();
  }
};

const Init = () => {
  window.addEventListener("load", () => {
    createInicialPage(urlInicial);
  });

  menu.addEventListener("click", (e) => {
    //console.log(e.target);
    let categoria = e.target.id;
    let url;

    if (categoria === "inicio") {
      url = urlInicial;
      createInicialPage(url);
    } else {
      if (categoria === "filmes") {
        url = urlFilmes;
      }
      createPage(url);
    }
  });

  aleatorio.addEventListener("click", () => {
    randomFilme();
  });

  logo.addEventListener("click", () => {
    createInicialPage(urlInicial);
  });
};

window.addEventListener("resize", () => {
  if (main.clientWidth < 768) {
    let divs = document.querySelectorAll(".movie-container");
    divs.forEach((div) => {
      div.style.marginLeft = "0px";
    });
  }
});
Init();

//pro squad

const createNossoCard = (filme) => {
  let card = document.createElement("div");
  //card.classList.add("video");
  card.id = filme[0];

  let divPoster = document.createElement("div");
  divPoster.classList.add("poster");
  const url = `https://image.tmdb.org/t/p/w500/${filme[1]}`;
  let poster = document.createElement("img");
  poster.src = url;

  divPoster.appendChild(poster);

  card.appendChild(divPoster);

  return card;
};



const membro1 = {
  nome: "Matheus de Gondra",
  linkedin: "https://www.linkedin.com/mwlite/in/matheus-gondra-a187a81a3",
  github: "https://github.com/Matheus-Gondra",
};
const membro2 = {
  nome: "Renan Loureiro",
  //linkedin: "https://github.com/renanloureiroo",
  github: "https://github.com/renanloureiroo",
};
const membro3 = {
  nome: "Henrique Ramos",
  linkedin: "https://www.linkedin.com/in/henrique-ramos-02b4151b0",
  github: "https://github.com/henriqueramosqs",
};
const membro4 = {
  nome: "Gabriel Pires",
  linkedin: "https://www.linkedin.com/in/gabriel-r-pires/",
  github: "https://github.com/DevGabrielPires",
};
const membro5 = {
  nome: "Renan Tomazini",
  linkedin: "https://www.linkedin.com/in/renan-tomazini-b9a75263/",
  github: "https://github.com/rtomazini42",
};

const membros = [membro1, membro2, membro3, membro4, membro5];

function participantes() {
  //let section = document.createElement("section");
  let div = document.createElement("div");
  div.classList.add("participantescontainer");
  let h1 = document.createElement("h1");
  h1.textContent = "O Squad:";
  div.appendChild(h1);
  for (var i in membros) {
    let divt = document.createElement("div");
    divt.classList.add("membro");
    let h2 = document.createElement("h2");
    h2.textContent = membros[i].nome;
    divt.appendChild(h2);
    if (membros[i].linkedin) {
      let a = document.createElement("a");
      a.textContent = "Linkedin";
      a.href = `${membros[i].linkedin}`;
      divt.appendChild(a);
      let br = document.createElement("br");
      divt.appendChild(br);
    }
    let a2 = document.createElement("a");
    a2.textContent = "Github";
    a2.href = `${membros[i].github}`;
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
  let card = createNossoCard(filme);
  image = card.querySelector("img").src = "public/PosterSquad4.gif";
  //video = card.querySelector("img")classList.remove(".video");
  //card.querySelector('.poster').classList.add("nossoCartaz");
  //console.log(image);
  div.appendChild(card);
  //section.appendChild(div);
  main.appendChild(div);
  participantes();
  //console.log(a);
});
