
let raha = 100;
let panos = 1;
const maxPanos = 10;

const kuvat = ['🍎', '🍐', '🍒', '🍉', "7️⃣"];
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
    if (laskuri['7️⃣'] === 4) return 5 * panos;
}