var map = null;
var markerlist = [];
var loggedInUser = null;

var userlist = [
    {
      Username: 'admin',
      Password: 'adminpw',
      Usertype: 'admin'
     },
    {
      Username: 'normalo',
      Password: 'normalopw',
      Usertype: 'normal'
    }
]

var contactlist = [
    {
        Name: 'Abloh',
        Vorname: 'Virgil',
        Straße: 'Singerstraße 19',
        Postleitzahl: 10243,
        Stadt: 'Berlin',
        Land: 'Deutschland',
        Privat: true

    },
    {
        Name: 'Uzumaki',
        Vorname: 'Naruto',
        Straße: 'Koppenstraße 18',
        Postleitzahl: 10243,
        Stadt: 'Berlin',
        Land: 'Deutschland',
        Privat: false
    }
]

function checkLoginInput() {
    var usernameInputValue = document.getElementById('usernameInput').value;
    var passwordInputValue = document.getElementById('passwordInput').value;
    var loginButton = document.getElementById('loginButton');
    
    if (usernameInputValue.length > 0 && passwordInputValue.length > 0) {
        if (loginButton.disabled == true) {
            loginButton.disabled = false;
        }
    } else {
        if (loginButton.disabled == false) {
            loginButton.disabled = true;
        }
    }
}

function isValidLoginData() {
    var usernameInputValue = document.getElementById('usernameInput').value;
    var passwordInputValue = document.getElementById('passwordInput').value;

    if (userlist.length){
        for(var i = 0; i < userlist.length; i++) {
            if(userlist[i].Username ===usernameInputValue && userlist[i].Password === passwordInputValue){
                loggedInUser = userlist[i];
                hideSection('login')
                showSection('main');
                loadMainView();
            }
        }
    }
}

function loadMainView(){
    if(loggedInUser.Usertype === 'normal'){
        document.getElementById('addButtonMain').style.display = "none";
    }
    loadContacts();
    loadMarker();

    loadUpdateDeleteView();
}

//loading contactlist -> wait until whole html is loaded
function loadContacts(){  
    document.getElementById('contactlist').innerHTML = '';      //cleared die liste
    var indexOfContact = 0;
    for(let index in contactlist){
        if(loggedInUser.Usertype === 'normal' && contactlist[index].Privat === true){
            //nothing
        }else{
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(contactlist[index].Vorname));
            
            li.addEventListener("click", function() {
                loadUpdateDeleteViewInput(index);
                hideSection('main');
                showSection('updateDelete');
            })

            document.getElementById('contactlist').appendChild(li);
        }
    }   
}


function getMap() {
    if (map == null) {
        map = new L.map('map').setView([52.520008, 13.404954], 10);
        L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=1qtfM58qgmOj9AnhBv0N', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        }).addTo(map);
        //marker = L.marker([52.520008, 13.404954]).addTo(map);
    }
    return map;

}

function loadMarker(){
    markerlist.push(L.marker([52.520008, 13.404954]));  //berechnung von lat und long über die adressen der kontakte (Geoserarch) -> pushen

    for(var i = 0; i < markerlist.length; i++){
        markerlist[i].addTo(map);
    }
}

function checkAddInput() {
    var nameInputValue = document.getElementById('nameInputAdd').value;
    var vornameInputValue = document.getElementById('vornameInputAdd').value;
    var strasseInputValue = document.getElementById('strasseInputAdd').value;
    var postleitzahlInputValue = document.getElementById('postleitzahlInputAdd').value;
    var stadtInputValue = document.getElementById('stadtInputAdd').value;
    var landInputValue = document.getElementById('landInputAdd').value;
    var addButton = document.getElementById('addButtonAdd');
    
    if (nameInputValue.length > 0 && vornameInputValue.length > 0 && strasseInputValue.length > 0 && postleitzahlInputValue.length > 0 && stadtInputValue.length > 0 && landInputValue.length > 0) {
        if (addButton.disabled == true) {
            addButton.disabled = false;
        }
    } else {
        if (addButton.disabled == false) {
            addButton.disabled = true;
        }
    }
}

function addContact() {
    var nameInputValue = document.getElementById('nameInputAdd').value;
    var vornameInputValue = document.getElementById('vornameInputAdd').value;
    var strasseInputValue = document.getElementById('strasseInputAdd').value;
    var postleitzahlInputValue = document.getElementById('postleitzahlInputAdd').value;
    var stadtInputValue = document.getElementById('stadtInputAdd').value;
    var landInputValue = document.getElementById('landInputAdd').value;
    var privateCheckboxValue = document.getElementById('privateCheckboxAdd').checked;

    contactlist.push({
        Name: nameInputValue,
        Vorname: vornameInputValue,
        Straße: strasseInputValue,
        Postleitzahl: postleitzahlInputValue,
        Stadt: stadtInputValue,
        Land: landInputValue,
        Privat: privateCheckboxValue
    })

    clearAddContactInput();
    loadMainView();
}

function clearAddContactInput(){
    //Back to default settings
    document.getElementById('nameInputAdd').value = '';
    document.getElementById('vornameInputAdd').value = '';
    document.getElementById('strasseInputAdd').value = '';
    document.getElementById('postleitzahlInputAdd').value = '';
    document.getElementById('stadtInputAdd').value = '';
    document.getElementById('landInputAdd').value = '';
    document.getElementById('privateCheckboxAdd').checked = false;
    document.getElementById('addButtonAdd').disabled = true;
}

function loadUpdateDeleteView(){
    if(loggedInUser.Usertype === 'normal'){
        document.getElementById('nameInputUpdateDelete').disabled = true;
        document.getElementById('vornameInputUpdateDelete').disabled = true;
        document.getElementById('strasseInputUpdateDelete').disabled = true;
        document.getElementById('postleitzahlInputUpdateDelete').disabled = true;
        document.getElementById('stadtInputUpdateDelete').disabled = true;
        document.getElementById('landInputUpdateDelete').disabled = true;
        document.getElementById('privateCheckboxUpdateDelete').disabled = true;

        document.getElementById('updateButton').style.display = "none";
        document.getElementById('deleteButton').style.display = "none";
    }
}

function loadUpdateDeleteViewInput(contactIndex){
    console.log(contactlist[contactIndex].Name);
    document.getElementById('nameInputUpdateDelete').value = contactlist[contactIndex].Name;
    document.getElementById('vornameInputUpdateDelete').value = contactlist[contactIndex].Vorname;
    document.getElementById('strasseInputUpdateDelete').value = contactlist[contactIndex].Straße;
    document.getElementById('postleitzahlInputUpdateDelete').value = contactlist[contactIndex].Postleitzahl;
    document.getElementById('stadtInputUpdateDelete').value = contactlist[contactIndex].Stadt;
    document.getElementById('landInputUpdateDelete').value = contactlist[contactIndex].Land;
    document.getElementById('privateCheckboxUpdateDelete').checked = contactlist[contactIndex].Privat;
}

function showSection(sectionName){
    var section = document.getElementById(sectionName);
    section.style.display = 'block';
}

function hideSection(sectionName){
    var section = document.getElementById(sectionName);
    section.style.display = 'none';
}