

let raha = 150;
let panos = 1;
let lukitusvarasto = 5;
const maxPanos = 10;

const kuvat = ['🍎', '🍐', '🍒', '🍉', '7️⃣'];
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

  if (laskuri['7️⃣'] === 4) return 10 * panos;
  if (laskuri['🍎'] === 4) return 6 * panos;
  if (laskuri['🍉'] === 4) return 5 * panos;
  if (laskuri['🍐'] === 4) return 4 * panos;
  if (laskuri['🍒'] === 4) return 3 * panos;
  if (laskuri['7️⃣'] === 3) return 5 * panos;

  return 0;
}

function paivitaUI(voitto, animaatio = false) {
    document.getElementById("raha").textContent = raha;
    document.getElementById("lukituksia").textContent = lukitusvarasto;
    const viesti = document.getElementById("viesti");
  
    const rullaDivit = document.querySelectorAll(".rulla");
    rullaDivit.forEach((div, i) => {
      div.textContent = rullat[i];
      
      // Vain jos pyöritys halutaan (animaatio true)
      if (animaatio) {
        div.classList.remove("animoi");
        void div.offsetWidth; // resetoi animaation
        div.classList.add("animoi");
      }
  
      if (lukitut[i]) {
        div.style.backgroundColor = "#ffd700";
      } else {
        div.style.backgroundColor = "";
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

  // Toggle lukitus
  lukitut[index] = !lukitut[index];

  if (lukitut[index]) {
    lukitusvarasto--;
  } else {
    lukitusvarasto++;
  }

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
