
let raha = 150;
let panos = 1;
let lukitusvarasto = 5;
const maxPanos = 10;

const kuvat = [
  '<img src="img/Kello.png" alt="Kello">',
  '<img src="img/Diamond.png" alt="Timantti">',
  '<img src="img/Seiska.png" alt="7">',
  '<img src="img/Kolikko.png" alt="Kolikko">',
  '<img src="img/Omena.png" alt="Omena">'
];

let rullat = ["", "", "", ""];
let lukitut = [false, false, false, false];

function arvoRullat() {
  for (let i = 0; i < rullat.length; i++) {
    if (!lukitut[i]) {
      const satunnainen = Math.floor(Math.random() * kuvat.length);
      rullat[i] = kuvat[satunnainen];
    }
  }
}

function laskeVoitto() {
  const laskuri = {};
  rullat.forEach(k => laskuri[k] = (laskuri[k] || 0) + 1);

  if (laskuri[kuvat[2]] === 4) return 10 * panos; // seiska
  if (laskuri[kuvat[4]] === 4) return 6 * panos;  // omena
  if (laskuri[kuvat[0]] === 4) return 5 * panos;  // kello
  if (laskuri[kuvat[3]] === 4) return 4 * panos;  // kolikko
  if (laskuri[kuvat[1]] === 4) return 3 * panos;  // timantti
  if (laskuri[kuvat[2]] === 3) return 5 * panos;  // 3 seiskaa

  return 0;
}

function paivitaUI(voitto, animaatio = false) {
  document.getElementById("raha").textContent = raha;
  document.getElementById("lukituksia").textContent = lukitusvarasto;
  const viesti = document.getElementById("viesti");

  const rullaDivit = document.querySelectorAll(".rulla");
  const lukitusnapit = document.querySelectorAll(".lukitusnappi");

  rullaDivit.forEach((div, i) => {
    div.innerHTML = rullat[i];

    if (animaatio) {
      div.classList.remove("animoi");
      void div.offsetWidth;
      div.classList.add("animoi");
    }

    if (lukitut[i]) {
      div.classList.add("lukittu");
      lukitusnapit[i].textContent = "🔒";
    } else {
      div.classList.remove("lukittu");
      lukitusnapit[i].textContent = "🔓";
    }
  });

  viesti.textContent = voitto > 0 ? `Voitit ${voitto}€!` : "Ei voittoa.";
}

function pelaa() {
  panos = parseInt(document.getElementById("panos").value);

  if (isNaN(panos) || panos < 1 || panos > maxPanos) {
    alert(`Panos täytyy olla 1 - ${maxPanos}€`);
    return;
  }

  if (raha < panos) {
    alert("Ei tarpeeksi rahaa pelaamiseen!");
    return;
  }

  raha -= panos;
  arvoRullat();
  const voitto = laskeVoitto();
  raha += voitto;

  lukitut = [false, false, false, false];
  paivitaUI(voitto, true);
}

function lukitseRulla(index) {
  if (!lukitut[index] && lukitusvarasto <= 0) {
    alert("Ei lukituksia jäljellä!");
    return;
  }

  lukitut[index] = !lukitut[index];
  lukitusvarasto += lukitut[index] ? -1 : 1;

  paivitaUI(0, false);
}

function ostaLukitus() {
  if (raha < 5) {
    alert("Ei tarpeeksi rahaa lukituksen ostoon!");
    return;
  }
  raha -= 5;
  lukitusvarasto += 1;
  paivitaUI(0);
}
