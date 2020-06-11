let map;
//let markerlist = [];
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
        Strasse: 'Singerstraße 19',
        Postleitzahl: 10243,
        Stadt: 'Berlin',
        Land: 'Deutschland',
        Privat: true

    },
    {
        Name: 'Uzumaki',
        Vorname: 'Naruto',
        Strasse: 'Koppenstraße 18',
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
    //hideSection('add');
    //showSection('main');
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
    //hideSection('updateDelete');
    //showSection('main');
    updateContact();
});
document.getElementById('deleteButton').addEventListener('click', function(){
    //hideSection('updateDelete');
    //showSection('main');
    deleteContact();
});


function checkUpdateDeleteInput(){
    let nameInputValue = document.getElementById('nameInputUpdateDelete').value;
    let vornameInputValue = document.getElementById('vornameInputUpdateDelete').value;
    let strasseInputValue = document.getElementById('strasseInputUpdateDelete').value;
    let postleitzahlInputValue = document.getElementById('postleitzahlInputUpdateDelete').value;
    let stadtInputValue = document.getElementById('stadtInputUpdateDelete').value;
    let landInputValue = document.getElementById('landInputUpdateDelete').value;
    let updateButton = document.getElementById('updateButton');
    
    if (nameInputValue.length > 0 && vornameInputValue.length > 0 && strasseInputValue.length > 0 && postleitzahlInputValue.length > 0 && stadtInputValue.length > 0 && landInputValue.length > 0) {
        if (updateButton.disabled == true) {
            updateButton.disabled = false;
        }
    } else {
        if (updateButton.disabled == false) {
            updateButton.disabled = true;
        }
    }
}

function updateContact(){
    let nameInputValue = document.getElementById('nameInputUpdateDelete').value;
    let vornameInputValue = document.getElementById('vornameInputUpdateDelete').value;
    let strasseInputValue = document.getElementById('strasseInputUpdateDelete').value;           
    let postleitzahlInputValue = document.getElementById('postleitzahlInputUpdateDelete').value;
    let stadtInputValue = document.getElementById('stadtInputUpdateDelete').value;
    let landInputValue = document.getElementById('landInputUpdateDelete').value;
    let privateCheckboxValue = document.getElementById('privateCheckboxUpdateDelete').checked;

    let address = strasseInputValue + " " + postleitzahlInputValue + " " + stadtInputValue;

    let geocoder = new google.maps.Geocoder(); 
    geocoder.geocode({'address': address}, function(results, status) {     
        if (status === 'OK') {

            let componentCounter = 0; 
            let validAddress = true;

            for(let i in results[0].address_components){
                let component = results[0].address_components[i];
                for(typeIndex in component.types) {
                    switch(component.types[typeIndex]){
                        case 'route':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== strasseInputValue.split(" ")[0] && component.short_name !== strasseInputValue.split(" ")[0]) {
                                validAddress = false;
                            }
                            break;
                        case 'street_number':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== strasseInputValue.split(" ")[1] && component.short_name !== strasseInputValue.split(" ")[1]) {
                                validAddress = false;
                            }
                            break;
                        case 'postal_code':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== postleitzahlInputValue && component.short_name !== postleitzahlInputValue) {
                                validAddress = false;
                            }
                            break;
                        case 'administrative_area_level_1':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== stadtInputValue && component.short_name !== stadtInputValue) {
                                validAddress = false;
                                componentCounter++;
                            }
                            break;
                        case 'country':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== landInputValue && component.short_name !== landInputValue) {
                                validAddress = false;
                            }
                            break;
                        default:
                            break;
                    }
                }                
            }
        
            //for case that no streetnumber is given
            if((componentCounter === 4 || componentCounter === 5) && validAddress === true){
                
                //TODO: UPDATE
                alert("Erfolgreich geupdated!");

                loadMainView();
                hideSection('updateDelete');
                showSection('main'); 
            }else{
                alert("Ungültige Adresse!");
            }
        } else {
            alert("Ungültige Adresse!");
        }
    });
}

function deleteContact(){
    //TODO: DELETE
    loadMainView();
    hideSection('updateDelete');
    showSection('main'); 
    alert("Erfolgreich gelöscht!");
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
    loadUpdateDeleteView();
}

//loading contactlist -> wait until whole html is loaded
function loadContacts(){  
    document.getElementById('contactlist').innerHTML = '';      //cleared die liste
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

            loadMarker(index);
        }
    }   
}
function loadMarker(contactIndex){
    let address = contactlist[contactIndex].Strasse + " " + contactlist[contactIndex].Postleitzahl + " " + contactlist[contactIndex].Stadt;
    let geocoder = new google.maps.Geocoder(); 
    geocoder.geocode({'address': address}, function(results, status) {
            let marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
            });
            
            //markerlist.push(marker);
    });
}


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
   
    let geocoder = new google.maps.Geocoder(); 
    geocoder.geocode({'address': address}, function(results, status) {     
        if (status === 'OK') {

            let componentCounter = 0; 
            let validAddress = true;

            for(let i in results[0].address_components){
                let component = results[0].address_components[i];
                for(typeIndex in component.types) {
                    switch(component.types[typeIndex]){
                        case 'route':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== strasseInputValue.split(" ")[0] && component.short_name !== strasseInputValue.split(" ")[0]) {
                                validAddress = false;
                            }
                            break;
                        case 'street_number':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== strasseInputValue.split(" ")[1] && component.short_name !== strasseInputValue.split(" ")[1]) {
                                validAddress = false;
                            }
                            break;
                        case 'postal_code':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== postleitzahlInputValue && component.short_name !== postleitzahlInputValue) {
                                validAddress = false;
                            }
                            break;
                        case 'administrative_area_level_1':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== stadtInputValue && component.short_name !== stadtInputValue) {
                                validAddress = false;
                                componentCounter++;
                            }
                            break;
                        case 'country':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name);
                            if(component.long_name !== landInputValue && component.short_name !== landInputValue) {
                                validAddress = false;
                            }
                            break;
                        default:
                            break;
                    }
                }                
            }
        
            //for case that no streetnumber is given
            if((componentCounter === 4 || componentCounter === 5) && validAddress === true){
                contactlist.push({
                    Name: nameInputValue,
                    Vorname: vornameInputValue,
                    Strasse: strasseInputValue,
                    Postleitzahl: postleitzahlInputValue,
                    Stadt: stadtInputValue,
                    Land: landInputValue,
                    Privat: privateCheckboxValue
                });
                clearAddContactInput();
                loadMainView();
                hideSection('add');
                showSection('main'); 
            }else{
                alert("Ungültige Adresse!");
            }
        } else {
            alert("Ungültige Adresse!");
        }
    });

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
    document.getElementById('nameInputUpdateDelete').value = contactlist[contactIndex].Name;
    document.getElementById('vornameInputUpdateDelete').value = contactlist[contactIndex].Vorname;
    document.getElementById('strasseInputUpdateDelete').value = contactlist[contactIndex].Strasse;
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