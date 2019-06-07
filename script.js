var content = document.getElementById("hiddenMenu");
var button = document.getElementById("hamburger");

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