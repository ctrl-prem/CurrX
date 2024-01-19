// api link to get the exchange rate of one to other.
const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; // "/eur/jpy" means euro to japaneese yen. will change and get for others too.

let dropdowns = document.querySelectorAll(".dropdown select");

let bnt = document.querySelector("#btn");
let amt = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    makeUpdation();
})

bnt.addEventListener("click", (evt) => {
    evt.preventDefault();
    makeUpdation();
})

const makeUpdation = async () => {
    let newUrl = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let api = await fetch(newUrl);
    let data = await api.json();
    let rate = data[toCurr.value.toLowerCase()];
    updateMsg(rate);
}

const updateMsg = (rate) => {
    let amtVal = amt.value;
    if(amtVal === "" || amtVal < 0){
        amtVal = 1;
        amt.value = 1;
    }
    let newMsg = `${amtVal}${fromCurr.value} = ${amtVal*rate}${toCurr.value}`;
    msg.innerText = newMsg;
};

for(drop of dropdowns){
    for(code in countryList){
        let create = document.createElement("option");
        create.value = code;
        create.innerText = code;
        drop.append(create); // putting options to the select using countryList from codes.js(file that also linked with HTML file).
        // making "USD" and "INR" as default selected.
        if(drop.name === "from" && code === "USD"){
            create.selected = "true";
        }
        else if(drop.name === "to" && code === "INR"){
            create.selected = "true";
        }
    }
    drop.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    });
}

function changeFlag (element){
    let key = element.value;
    let newSrc = `https://flagsapi.com/${countryList[key]}/flat/64.png`; // api is use to get flags dynamically.
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}




