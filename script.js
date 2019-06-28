var content = document.getElementById("hiddenMenu");
var button = document.getElementById("hamburger");

let sendButton = document.getElementById("send_email")
let email =  document.getElementById("emailInput")
let exitPopupButton = document.getElementById("exitGameButton1")
let exitPopupButton2 = document.getElementById("exitGameButton2")



sendButton.addEventListener('click',addEmailToLocalStorage)
email.addEventListener('click', hidePopup)
exitPopupButton.addEventListener('click', hidePopup)
exitPopupButton2.addEventListener('click', hidePopup)

function showPopup(popupName) {
    var popup = document.getElementById(popupName);
    popup.classList.add("show")
  }

function hidePopup() {
    let popupInvalid = document.getElementById('invalidEmail')
    popupInvalid.classList.remove("show")
    let popupEmpty = document.getElementById('emptyEmail')
    popupEmpty.classList.remove("show")
    let popupExist = document.getElementById('emailExist')
    popupExist.classList.remove("show")
    let popupGood = document.getElementById('goodEmail')
    popupGood.classList.remove("show")
 }


function saveEmailInLocalStorage(inputEmail){
        localStorage.setItem("userEmail", inputEmail.value)
        console.log(inputEmail.value)
        inputEmail.value = ""
}
function checkIsEmailExist(){
    if (localStorage.getItem("userEmail") !== null) {
        return true
      }
}
function validateEmail(userEmail) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return  re.test(String(userEmail).toLowerCase())
}

function addEmailToLocalStorage(){
    let inputEmail = document.getElementById("emailInput")
    let userEmail = (inputEmail.value).toString()
    if(userEmail === ""){
        showPopup('emptyEmail')
    }
    else if(!(validateEmail(userEmail))){
        showPopup('invalidEmail')
    }
    else if(checkIsEmailExist()){
        showPopup("emailExist")
    }
    else{
        saveEmailInLocalStorage(inputEmail)
        showPopup('goodEmail')
    }
}

button.addEventListener('click', function (event) {
    event.stopPropagation();

    if (content.className == "open") {

        //gdy jest otwarty chcemy schować
        content.className = "";
        button.innerHTML = '<img src="img/hamburger.png">'
        var menu = document.getElementById('menu');
        menu.style.backgroundColor = 'rgba(74, 65, 110, 0.671)';

    } else {
        //gdy zamknięty, chcemy rozwinąć: wystarczy dać class "open"
        content.className = "open"
        button.innerHTML = '<img src="img/eks.png">'
        var menu = document.getElementById('menu');
        menu.style.backgroundColor = 'rgba(74, 65, 110)';
        // document.body.style.background = "rgba(0,0,0,0.3)"
    }
})


var body = document.getElementById("body")
body.addEventListener('click', function () {
    menu.style.backgroundColor = 'rgba(74, 65, 110, 0.671)'
    content.className = "";
    button.innerHTML = '<img src="img/hamburger.png">'
})