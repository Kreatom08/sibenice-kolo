const hadanaSlova = [
    "BRZDA",
    "TLUMIC",
    "PREHAZOVACKA",
    "PLAST",
    "PEDAL"
];

let vybraneSlovo = "";
let uhodnutaPismena = [];
let pocetChyb = 0;
const maximalniPocetChyb = 6;

function startHry() {
    vybraneSlovo = hadanaSlova[Math.floor(Math.random() * hadanaSlova.length)];
    uhodnutaPismena = [];
    pocetChyb = 0;

    document.getElementById("obrazek-kola").src = "kolo0.png";
    vykresliSlovo();
    vykresliKlavesnici();
}

function vykresliSlovo() {
    let zobrazenyText = "";
    for (let pismeno of vybraneSlovo) {
        if (uhodnutaPismena.includes(pismeno)) {
            zobrazenyText += pismeno + " ";
        } else {
            zobrazenyText += "_ ";
        }
    }
    document.getElementById("slovo-container").innerHTML = zobrazenyText;
}

function vykresliKlavesnici() {
    const abeceda = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let klavesniceHTML = "";

    for (let pismeno of abeceda) {
        klavesniceHTML += `<button onclick="hadejPismeno('${pismeno}')" id="btn-${pismeno}">${pismeno}</button> `;
    }

    document.getElementById("klavesnice").innerHTML = klavesniceHTML;
}

function hadejPismeno(pismeno) {
    if (!uhodnutaPismena.includes(pismeno)) {
        uhodnutaPismena.push(pismeno);
        document.getElementById(`btn-${pismeno}`).disabled = true;

        if (!vybraneSlovo.includes(pismeno)) {
            pocetChyb++;
            console.log("Počet chyb: " + pocetChyb);
            document.getElementById("obrazek-kola").src = "kolo" + pocetChyb + ".png";
        }

        vykresliSlovo();
        kontrolaKonceHry();
    }
}

function kontrolaKonceHry() {
    const aktualniStav = document.getElementById("slovo-container").innerText;

    if (!aktualniStav.includes("_")) {
        setTimeout(() => alert("Dobrá práce, uhodl jsi!"), 100);
    }
    else if (pocetChyb >= maximalniPocetChyb) {
        setTimeout(() => alert("Konec hry! Zbyl ti jen rám. Slovo bylo: " + vybraneSlovo), 100);
    }
}

startHry();