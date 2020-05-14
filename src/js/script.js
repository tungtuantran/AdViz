var map = null;
var marker = null;

function getMap(){
    if(map == null){
        map = new L.map('map').setView([52.520008,13.404954],10);
        L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=1qtfM58qgmOj9AnhBv0N', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        }).addTo(map);
        marker = L.marker([52.520008,13.404954]).addTo(map);  
    }
    return map;

}

function checkLoginInput(){
    var usernameInputValue = document.getElementById('usernameInput').value;
    var passwordInputValue = document.getElementById('passwordInput').value;
    var loginButton = document.getElementById('loginButton');

    if(usernameInputValue.length > 0 && passwordInputValue.length > 0) {
        if(loginButton.disabled == true){
            loginButton.disabled = false;
        }
    } else {
        if(loginButton.disabled == false){
            loginButton.disabled = true;
        }
    }
}

function isValidLoginData(){
    //prüfen
}