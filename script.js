var content = document.getElementById("hiddenMenu");
var button = document.getElementById("hamburger");

button.addEventListener('click', function (event) {
    event.stopPropagation();

    if (content.className == "open") {

        //gdy jest otwarty chcemy schować
        content.className = "";
        button.innerHTML = '<img src="img/hamburger.png">'
        // document.body.style.background = "rgba(255, 255, 255, 0)"


    } else {
        //gdy zamknięty, chcemy rozwinąć: wystarczy dać class "open"
        content.className = "open"
        button.innerHTML = '<img src="img/eks.png">'

        // document.body.style.background = "rgba(0,0,0,0.3)"
    }
})


var body = document.getElementById("body")
body.addEventListener('click', function () {

    content.className = "";
    button.innerHTML = '<img src="img/hamburger.png">'
})