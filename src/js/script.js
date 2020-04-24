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