
let map;
//let markerlist = [];
let loggedInUser = null;
let IdOfContactToUpdateDelete;
let key = "AIzaSyBZL09KP34CNElNufTGVtl71igrFb_abnM";

const host = 'localhost';
const port = '8080';

//SQL: userid (=username), password, firstname, lastname, isAdmin (TINYINT (= boolean)) (=Usertype)
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

function fillContactListWithDBData() {
    console.log("got in fill");

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://' + host + ':' + port + '/AdViz/contacts');
    console.log("open get request");
    xhr.onload = () => {
        const data = xhr.response;
        console.log("the data: " + data);

        jsonData = JSON.parse(data);
        console.log(jsonData);

        //clear list first
        contactlist = [];

        for(let i = 0; i < jsonData.length; i++){
            let isPrivate = false;
            if(jsonData[i].isPrivate == 1){
                isPrivate = true;
            }
            contactlist.push(
                {
                    KontaktId: jsonData[i].contactid,
                    Name: jsonData[i].lastname,
                    Vorname: jsonData[i].firstname,
                    Strasse: jsonData[i].street,
                    Postleitzahl: jsonData[i].zipcode,
                    Stadt: jsonData[i].city,
                    Land: jsonData[i].country,
                    Privat: isPrivate               
                }
            );
            if(loggedInUser.Usertype === 'normal' && contactlist[i].Privat === true){
                //nothing
            }else{
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(contactlist[i].Vorname));
                console.log("created textnode of " + contactlist[i].Vorname);
                li.addEventListener("click", function() {
                    loadUpdateDeleteViewInput(i); //update contact daten
                    hideSection('main');
                    showSection('updateDelete');
                })

                document.getElementById('contactlist').appendChild(li);
                console.log("appendes textnode of " + contactlist[i].Vorname);

            loadMarker(i);
            }
        }
    }
    console.log("finish loading and all contacts added");
    
    xhr.send(); 
}


//SQL: contactid, lastname, firstname, street, zipcode, city, country, isPrivate
let contactlist = [];

function fillContactListWithDBData() {
    console.log("got in fill");

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://' + host + ':' + port + '/AdViz/contacts');
    console.log("open get request");
    xhr.onload = () => {
        const data = xhr.response;
        console.log("the data: " + data);

        jsonData = JSON.parse(data);
        console.log(jsonData);

        //clear list first
        contactlist = [];

        for(let i = 0; i < jsonData.length; i++){
            let isPrivate = false;
            if(jsonData[i].isPrivate == 1){
                isPrivate = true;
            }
            contactlist.push(
                {
                    KontaktId: jsonData[i].contactid,
                    Name: jsonData[i].lastname,
                    Vorname: jsonData[i].firstname,
                    Strasse: jsonData[i].street,
                    Postleitzahl: jsonData[i].zipcode,
                    Stadt: jsonData[i].city,
                    Land: jsonData[i].country,
                    Privat: isPrivate               
                }
            );
            if(loggedInUser.Usertype === 'normal' && contactlist[i].Privat === true){
                //nothing
            }else{
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(contactlist[i].Vorname));
                console.log("created textnode of " + contactlist[i].Vorname);
                li.addEventListener("click", function() {
                    loadUpdateDeleteViewInput(i); //update contact daten
                    hideSection('main');
                    showSection('updateDelete');
                })

                document.getElementById('contactlist').appendChild(li);
                console.log("appendes textnode of " + contactlist[i].Vorname);

            loadMarker(i);
            }
        }
    }
    console.log("finish loading and all contacts added");
    
    xhr.send(); 
}

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
document.getElementById('logoutButtonMain').addEventListener('click', function(){
    loggedInUser = null;
    hideSection('main');
    showSection('login');
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
                let isPrivate = true;
                if(!privateCheckboxValue){
                    isPrivate = false;
                }

                let xmlhttp = new XMLHttpRequest(); 
                xmlhttp.open("PUT", 'http://' + host + ':' + port + '/AdViz/contacts/' + IdOfContactToUpdateDelete);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({ 
                    "lastname": nameInputValue,
                    "firstname": vornameInputValue,
                    "street": strasseInputValue,
                    "zipcode": postleitzahlInputValue,
                    "city": stadtInputValue,
                    "country": landInputValue,
                    "isPrivate": isPrivate
                }));

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
    let xmlhttp = new XMLHttpRequest(); 
    xmlhttp.open("DELETE", 'http://' + host + ':' + port + '/AdViz/contacts/' + IdOfContactToUpdateDelete);
    xmlhttp.send();

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
    
    let xmlhttp = new XMLHttpRequest(); 
    xmlhttp.open("POST", 'http://' + host + ':' + port + '/AdViz/login');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            
    xmlhttp.send(JSON.stringify({ 
        "userid": usernameInputValue,
        "password": passwordInputValue
    }));

    xmlhttp.onload = () => {
        const data = xmlhttp.response;
        console.log("the data: " + data);
        
        if(data.length > 0){
            jsonData = JSON.parse(data);
            console.log(jsonData);

            let usertype = 'normal';
            if(jsonData.isAdmin == 1){
                usertype = 'admin'
            }

            loggedInUser = {
                Username: jsonData.userid,
                Name: jsonData.lastname,
                Vorname: jsonData.firstname,
                Usertype: usertype
            }

            if(xmlhttp.status === 200){
                hideSection('login')
                showSection('main');
                loadMainView();
                alert("Willkommen " + loggedInUser.Vorname + " " + loggedInUser.Name +"! Eingeloggt als " + loggedInUser.Usertype + ".");
                
                //clear login input
                document.getElementById('usernameInput').value = "";
                document.getElementById('passwordInput').value = "";
                return;
            }
        } else {
            alert("Falsche Nutzername/Passwort-Kombination!");
            return;
        }
        /*
        if(xmlhttp.status === 200){
            hideSection('login')
            showSection('main');
            loadMainView();
            alert("Willkommen " + loggedInUser.Vorname + " " + loggedInUser.Name +"!");
            return;
        }else{
            alert("Falsche Nutzername/Passwort-Kombination!");
            return;
        }
        */
    }
    /*
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.status === 200){
            hideSection('login')
            showSection('main');
            loadMainView();
            alert("Willkommen " + loggedInUser.Vorname + " " + loggedInUser.Name +"!");
            return;
        }else{
            alert("Falsche Nutzername/Passwort-Kombination!");
            return;
        }
    }
    */
            
}

function loadMainView(){

    if(loggedInUser.Usertype === 'normal'){
        document.getElementById('addButtonMain').style.display = "none";
    }else{
        document.getElementById('addButtonMain').style.display = "inline-block";
    }
    console.log("im about to load the main");

    loadContacts();
    console.log("finish loading contacts");

    loadUpdateDeleteView();
}

//loading contactlist -> wait until whole html is loaded
function loadContacts(){  
    //clear list in view and clear the actually list
    document.getElementById('contactlist').innerHTML = '';      //cleared die liste

    //fill the list again with data from DB
    fillContactListWithDBData();
  
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

    //seperate streetadress from streetnumber
    let splittedStreetAddress = strasseInputValue.split(" ");
    console.log(splittedStreetAddress);

    let streetNumber = "";
    for(let i = 0; i < splittedStreetAddress.length; i++){
        //includes number
        if(/\d/.test(splittedStreetAddress[i])){
            streetNumber = splittedStreetAddress[i];
            splittedStreetAddress.splice(splittedStreetAddress.indexOf(i), 1);
        }
    }
    console.log(streetNumber);
    console.log(splittedStreetAddress);

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
                            console.log(component.long_name + " " + component.short_name + " " + splittedStreetAddress.toString().replace(","," ") );
                            if(component.long_name !== splittedStreetAddress.toString().replace(","," ") && component.short_name !== splittedStreetAddress.toString().replace(","," ")) {
                                validAddress = false;
                            }
                            break;
                        case 'street_number':
                            componentCounter++;
                            console.log(component.long_name + " " + component.short_name + " " + streetNumber);
                            if(component.long_name !== streetNumber && component.short_name !== streetNumber) {
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
                let isPrivate = 1;
                if(!privateCheckboxValue){
                    isPrivate = 0;
                }

                let xmlhttp = new XMLHttpRequest(); 
                xmlhttp.open("POST", 'http://' + host + ':' + port + '/AdViz/contacts');
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({ 
                    "lastname": nameInputValue,
                    "firstname": vornameInputValue,
                    "street": strasseInputValue,
                    "zipcode": postleitzahlInputValue,
                    "city": stadtInputValue,
                    "country": landInputValue,
                    "isPrivate": isPrivate
                }));

                clearAddContactInput();
                loadMainView();
                hideSection('add');
                showSection('main'); 
                alert("Erfolgreich Kontakt hinzugefügt!");
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
    }else{
        document.getElementById('nameInputUpdateDelete').disabled = false;
        document.getElementById('vornameInputUpdateDelete').disabled = false;
        document.getElementById('strasseInputUpdateDelete').disabled = false;
        document.getElementById('postleitzahlInputUpdateDelete').disabled = false;
        document.getElementById('stadtInputUpdateDelete').disabled = false;
        document.getElementById('landInputUpdateDelete').disabled = false;
        document.getElementById('privateCheckboxUpdateDelete').disabled = false;

        document.getElementById('updateButton').style.display = "inline-block";
        document.getElementById('deleteButton').style.display = "inline-block";
    }
}

function loadUpdateDeleteViewInput(contactIndex){ 
    IdOfContactToUpdateDelete = contactlist[contactIndex].KontaktId;
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


function jsonToObjectContact(row){
    return {
        Name: row.lastname,
        Vorname: row.firstname,
        Strasse: row.street,
        Postleitzahl: row.zipcode,
        Stadt: row.city,
        Land: row.country,
        Privat: row.isPrivate
    };
}