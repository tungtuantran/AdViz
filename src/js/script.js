function login(){
    var usernameInputValue = document.getElementById('usernameInput').value;
    var passwordInputValue = document.getElementById('passwordInput').value;

    //sobald username und pw einen input haben -> erfolgreich
    if(usernameInputValue.length > 0 && passwordInputValue.length > 0){
        alert("Erfolgreich eingeloggt.");
    }else{
        alert("Einloggen fehlgeschlagen.");
    }
}

var loginButton = document.getElementById('loginButton');
if(loginButton){
    loginButton.addEventListener('click', login, true);
}
