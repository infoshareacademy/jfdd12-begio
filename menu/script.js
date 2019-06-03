var content = document.getElementById("hiddenMenu");
var button = document.getElementById("hamburger");

button.onclick = function () {

    if (content.className == "open") {

        //gdy jest otwarty chcemy schować
        content.className = "";
        button.innerHTML = '<img src="img/hamburger.png">'



    } else {
        //gdy zamknięty, chcemy rozwinąć: wystarczy dać class "open"
        content.className = "open"
        button.innerHTML = '<img src="img/eks.png">'
        //button.innerHTML = "show Less";
    }
};