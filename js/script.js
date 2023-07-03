const wbhook = "https://discord.com/api/webhooks/1097589837600665730/lWDZ8m-j9SgjBtwnPXvbDhOrQZ4RJJC7clWmlwZREGBQVm8Bhc1WRQyW0lB5cm0qeNVj"

const formRef = document.querySelector("form");

const buyInputRef = document.getElementById("buyInput");
const sellInputRef = document.getElementById("sellInput");

const modelInputRef = document.getElementById("modelInput");
const colorwayInputRef = document.getElementById("colorwayInput");
const sizeInputRef = document.getElementById("sizeInput");

const buyRef = document.querySelector(".buy");
const storeInputRef = document.getElementById("storeInput");
const condInputRef = document.getElementById("condInput");
const priceInputRef = document.getElementById("priceInput");
const buyDateInputRef = document.getElementById("buyDateInput");
const paymentInputRef = document.getElementById("paymentInput");
const cardInputRef = document.getElementById("cardInput");
const parcInputRef = document.getElementById("parcInput");


const sellRef = document.querySelector(".sell");
const platInputRef = document.getElementById("platInput");
const saleInputRef = document.getElementById("saleInput");
const saleDateInputRef = document.getElementById("saleDateInput");
const taxesInputRef = document.getElementById("taxesInput");

const cardInfoRefs = document.querySelectorAll(".cardInfo");

const toastRef = document.querySelector(".toast");

buyDateInputRef.valueAsDate = new Date();
saleDateInputRef.valueAsDate = new Date();

sellInputRef.addEventListener("click", (e) =>{
    addRequiredSell();
    removeRequiredBuy();
    sellRef.style.display = "flex";
    buyRef.style.display = "none";
})

buyInputRef.addEventListener("click", (e) =>{
    addRequiredBuy();
    removeRequiredSell();
    buyRef.style.display = "flex";
    sellRef.style.display = "none";
})

paymentInputRef.addEventListener("change", (e) =>{
    e.preventDefault();
    if(e.target.value == "PIX"){
        cardInfoRefs.forEach(i => i.style.display = "none");
    } else {
        cardInfoRefs.forEach(i => i.style.display = "flex");
    }
})


formRef.addEventListener("submit", (e) => {
     e.preventDefault();

     if(buyInputRef.checked){

        buyDate = buyDateInputRef.value;
        buyYear = buyDate.slice(0,4);
        buyMonth = buyDate.slice(5,7);
        buyDay = buyDate.slice(8,10);

        buyDateFormatted = buyDay + "/" + buyMonth + "/" + buyYear

        const buyMsg = getBuyMsg();
        addField(buyMsg, "Modelo:", modelInputRef.value)
        addField(buyMsg, "Colorway:", colorwayInputRef.value)
        addField(buyMsg, "Tamanho:", sizeInputRef.value)
        addField(buyMsg, "Loja:", storeInputRef.value)
        addField(buyMsg, "Condição:", condInputRef.value)
        addField(buyMsg, "Preço:", "R$ " + priceInputRef.value)
        addField(buyMsg, "Data Compra:", buyDateFormatted)
        addField(buyMsg, "Forma Pagamento:", paymentInputRef.value)
        if(paymentInputRef.value == "Cartão"){
            addField(buyMsg, "Cartão:", cardInputRef.value) 
            addField(buyMsg, "Parcelas", parcInputRef.value)
        }
        fetch(wbhook + "?wait=true", 
        {"method":"POST", "headers": {"content-type": "application/json"},
        "body": JSON.stringify(buyMsg)})
        .then(a=>a.json()).then(console.log)

     } else if(sellInputRef.checked){

        saleDate = saleDateInputRef.value;
        saleYear = saleDate.slice(0,4);
        saleMonth = saleDate.slice(5,7);
        saleDay = saleDate.slice(8,10);

        saleDateFormatted = saleDay + "/" + saleMonth + "/" + saleYear

         const sellMsg = getSellMsg();
         addField(sellMsg, "Modelo:", modelInputRef.value)
         addField(sellMsg, "Colorway:", colorwayInputRef.value)
         addField(sellMsg, "Tamanho:", sizeInputRef.value)
         addField(sellMsg, "Plataforma", platInputRef.value)
         addField(sellMsg, "Venda", "R$ " + saleInputRef.value)
         addField(sellMsg, "Data Venda", saleDateFormatted)
         if(platInputRef.value == "Droper"){
             addField(sellMsg, "Taxas/Envios", "R$ " + taxesInputRef.value + " | Taxa Droper: R$ " + (saleInputRef.value * 0.08).toFixed(2))
         } else {
            addField(sellMsg, "Taxas/Envios", "R$ " + taxesInputRef.value)
         }
    
         fetch(wbhook + "?wait=true", 
         {"method":"POST", "headers": {"content-type": "application/json"},
         "body": JSON.stringify(sellMsg)})
         .then(a=>a.json()).then(console.log)
     }

     toast("Registrado com sucesso!!")
})

function getSellMsg(){
    return {
        "embeds": [
          {
            "title": ":money_with_wings: VENDA REALIZADA!",
            "color": 2938144,
            "description": "Reagir com :outbox_tray: quando a venda for cadastrada na STASHY\n\nReagir com :ok: quando for removido do site/plataformas\n\n Reagir com :pencil: quando for registado na planilha",
            "timestamp": new Date(),
            "thumbnail": {
              "url": "https://marcelominuto.github.io/encomenda-npv/images/logo%20npv%20transparente.png"
            },
            "footer": {
              "text": "NPV Sneakers",
              "icon_url": "https://marcelominuto.github.io/encomenda-npv/images/logo%20npv%20transparente.png"
            },
            "fields": []
          }
        ],
    }
}

function getBuyMsg(){
    return {
        "embeds": [
          {
            "title": ":shopping_cart: COMPRA REALIZADA!",
            "color": 8604568,
            "description": "Reagir com :inbox_tray: quando for cadastrado na STASHY\n\nReagir com :new: quando for adicionado no site/plataformas\n\n Reagir com :pencil: quando for registado na planilha",
            "timestamp": new Date(),
            "thumbnail": {
              "url": "https://marcelominuto.github.io/encomenda-npv/images/logo%20npv%20transparente.png"
            },
            "footer": {
              "text": "NPV Sneakers",
              "icon_url": "https://marcelominuto.github.io/encomenda-npv/images/logo%20npv%20transparente.png"
            },
            "fields": []
          }
        ],
    }
}

function addField(msg, name, value){
    msg.embeds[0].fields.push({
        name, 
        value
    })
}

function addRequiredBuy(){
    storeInputRef.setAttribute("required", "true");
    priceInputRef.setAttribute("required", "true");
    buyDateInputRef.setAttribute("required", "true");
}

function removeRequiredBuy(){
    storeInputRef.removeAttribute("required");
    priceInputRef.removeAttribute("required");
    buyDateInputRef.removeAttribute("required");
}

function addRequiredSell(){
    saleInputRef.setAttribute("required", "true");
    saleDateInputRef.setAttribute("required", "true");
    taxesInputRef.setAttribute("required", "true");
}

function removeRequiredSell(){
    saleInputRef.removeAttribute("required");
    saleDateInputRef.removeAttribute("required");
    taxesInputRef.removeAttribute("required");
}

function toast(message){
    toastRef.textContent = message;

    toastRef.style.opacity = 1
    toastRef.style.visibility = 'visible'
    setTimeout(() => {
        toastRef.style.opacity = 0
        setTimeout(() => {
            toastRef.style.visibility = 'hidden'
            toastRef.textContent = ""
        }, 500)
    }, 3000) 
}

