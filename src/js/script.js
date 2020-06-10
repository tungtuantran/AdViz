let map;
let markerlist = [];
let loggedInUser = null;
let key = "AIzaSyBZL09KP34CNElNufTGVtl71igrFb_abnM";


let userlist = [
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

let contactlist = [
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


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.520008, lng: 13.404954 },
    zoom: 8
  });
}

//eventListener to load map
// window.addEventListener('DOMContentLoaded', getMap, false);

//eventListener - LoginView
document.getElementById('loginButton').addEventListener('click', isValidLoginData);
document.getElementById('usernameInput').addEventListener('keyup', checkLoginInput);
document.getElementById('passwordInput').addEventListener('keyup', checkLoginInput);

//eventListener - MainView
document.getElementById('addButtonMain').addEventListener('click', function(){
    hideSection('main');
    showSection('add');
});

//eventListener - AddView
document.getElementById('nameInputAdd').addEventListener('keyup', checkAddInput);
document.getElementById('vornameInputAdd').addEventListener('keyup', checkAddInput);
document.getElementById('strasseInputAdd').addEventListener('keyup', checkAddInput);
document.getElementById('postleitzahlInputAdd').addEventListener('keyup', checkAddInput);
document.getElementById('stadtInputAdd').addEventListener('keyup', checkAddInput);
document.getElementById('landInputAdd').addEventListener('keyup', checkAddInput);

document.getElementById('backButtonAdd').addEventListener('click', function(){
    hideSection('add');
    showSection('main');
    clearAddContactInput();
});
document.getElementById('addButtonAdd').addEventListener('click', function(){
    hideSection('add');
    showSection('main');
    addContact();
});

//eventListener - updateDelete
document.getElementById('updateDelete').addEventListener('load', loadUpdateDeleteView);

document.getElementById('nameInputUpdateDelete').addEventListener('keyup', checkUpdateDeleteInput);
document.getElementById('vornameInputUpdateDelete').addEventListener('keyup', checkUpdateDeleteInput);
document.getElementById('strasseInputUpdateDelete').addEventListener('keyup', checkUpdateDeleteInput);
document.getElementById('postleitzahlInputUpdateDelete').addEventListener('keyup', checkUpdateDeleteInput);
document.getElementById('stadtInputUpdateDelete').addEventListener('keyup', checkUpdateDeleteInput);
document.getElementById('landInputUpdateDelete').addEventListener('keyup', checkUpdateDeleteInput);

document.getElementById('backButtonUpdateDelete').addEventListener('click', function(){
    hideSection('updateDelete');
    showSection('main');
});
document.getElementById('updateButton').addEventListener('click', function(){
    hideSection('updateDelete');
    showSection('main');
    updateContact();
});
document.getElementById('deleteButton').addEventListener('click', function(){
    hideSection('updateDelete');
    showSection('main');
    deleteContact();
});


function checkUpdateDeleteInput(){
    //TODO
}

function updateContact(){

    
    
    //TODO: Mit api prüfen ob gültige adressen angegeben wurden!
    //TODO
}

function deleteContact(){
    //TODO

}


function checkLoginInput() {
    let usernameInputValue = document.getElementById('usernameInput').value;
    let passwordInputValue = document.getElementById('passwordInput').value;
    let loginButton = document.getElementById('loginButton');
    
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
    let usernameInputValue = document.getElementById('usernameInput').value;
    let passwordInputValue = document.getElementById('passwordInput').value;

    if (userlist.length){
        for(let i = 0; i < userlist.length; i++) {
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
    let indexOfContact = 0; // ???
    for(let index in contactlist){
        if(loggedInUser.Usertype === 'normal' && contactlist[index].Privat === true){
            //nothing
        }else{
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(contactlist[index].Vorname));
            
            li.addEventListener("click", function() {
                loadUpdateDeleteViewInput(index); //update contact daten
                hideSection('main');
                showSection('updateDelete');
            })

            document.getElementById('contactlist').appendChild(li);
        }
    }   
}


// function getMap() {
//     if (map == null) {
//         map = new L.map('map').setView([52.520008, 13.404954], 10);
//         L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=1qtfM58qgmOj9AnhBv0N', {
//             attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//         }).addTo(map);
//     }
//     return map;

// }

// function loadMarker(){
//     //TODO: berechnung von lat und long über die adressen der kontakte (Geoserarch) -> pushen in markerList

//     markerlist.push(L.marker([52.520008, 13.404954])); 
//     for(let i = 0; i < markerlist.length; i++){
//         markerlist[i].addTo(map);
//     }
// }

function checkAddInput() {
    let nameInputValue = document.getElementById('nameInputAdd').value;
    let vornameInputValue = document.getElementById('vornameInputAdd').value;
    let strasseInputValue = document.getElementById('strasseInputAdd').value;
    let postleitzahlInputValue = document.getElementById('postleitzahlInputAdd').value;
    let stadtInputValue = document.getElementById('stadtInputAdd').value;
    let landInputValue = document.getElementById('landInputAdd').value;
    let addButton = document.getElementById('addButtonAdd');
    
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
    let nameInputValue = document.getElementById('nameInputAdd').value;
    let vornameInputValue = document.getElementById('vornameInputAdd').value;
    let strasseInputValue = document.getElementById('strasseInputAdd').value;
    let postleitzahlInputValue = document.getElementById('postleitzahlInputAdd').value;
    let stadtInputValue = document.getElementById('stadtInputAdd').value;
    let landInputValue = document.getElementById('landInputAdd').value;
    let privateCheckboxValue = document.getElementById('privateCheckboxAdd').checked;

    let address = strasseInputValue + " " + postleitzahlInputValue + " " +  stadtInputValue;
    
    // eig besser in checkAddInput Methode 
    let geocoder = new google.maps.Geocoder(); 
    geocoder.geocode({'address': address}, function(results, status) {
        
        if (status === 'OK') {
            contactlist.push({
                Name: nameInputValue,
                Vorname: vornameInputValue,
                Straße: strasseInputValue,
                Postleitzahl: postleitzahlInputValue,
                Stadt: stadtInputValue,
                Land: landInputValue,
                Privat: privateCheckboxValue
            });

            let marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
            });

        
            alert("Erfolgreich hinzugefügt!");
        } else {
            alert("Ungültige Adresse!");
        }
      });

 
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
    let section = document.getElementById(sectionName);
    section.style.display = 'block';
}

function hideSection(sectionName){
    let section = document.getElementById(sectionName);
    section.style.display = 'none';
}

function setMarker(address){
    let geocoder = new google.maps.Geocoder(); 
    
    // let address = contactlist[contactIndex].Straße + " " + contactlist[contactIndex].Postleitzahl + " " + contactlist[contactIndex].Stadt; 
   
    
    //adresse muss valide sein
    geocoder.geocode({'address': address}, function(results, status) {
        
            let marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
            });
           
         
    });
        
}