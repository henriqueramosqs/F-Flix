const time = document.querySelector(".team");
const main = document.querySelector("main");

//não consegui usar os imports sem ser bloqueado

const clearPage = () => {
  main.innerHTML = "";
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



//pro squad
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



console.log(time);

time.addEventListener("click", (e) => {
  clearPage();
  //let section = document.createElement("section");
  let div = document.createElement("div");
  div.classList.add("nossocontainer");
  //div.classList.add("s-container");
  let filme = [1, "Squad 4", "nope.jpg", "5 pessoas, uma hackton."];
  let card = createCard(filme);
  image = card.querySelector("img").src = "public/cartazSquad4.jpg";
  //card.querySelector('.poster').classList.add("nossoCartaz");
  //card.querySelector('.poster').classList.remove("poster");
  //console.log(image);
  div.appendChild(card);
  //section.appendChild(div);
  main.appendChild(div);
  participantes();
});
