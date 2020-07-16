const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { response } = require('express');
const bodyParser = require('body-parser');

//Create connection
const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'Tsubasa99',
    database: 'advizdb',
    //port: 3306
});

// connect
connection.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL connected...');
});

//creating app
const app = express();
app.use('/static', express.static('src'));
app.use(bodyParser.json());


//RootPath for Application
app.get('/AdViz', function(req, res){
    res.sendFile(path.join(__dirname, '/src/index.html'));
});
app.listen(8080);


//Post validate User Endpoint
app.post('/AdViz/login', (req, res) => {
    let json = req.body;
    let user = {
        userid: json.userid,
        password: json.password
    };

    getUser(user, function(err, data){
        if(err) {
            console.error(err);
            res.status(401).send();
            return;
        }else{
            if(data){
                res.send(data);
                return;
            }else{
                res.status(401).send();
                return;
            }
        }
    });
});

function getUser(user, callback){
    connection.query('SELECT * FROM user WHERE userid = "' + user.userid + '" AND password = "' + user.password + '"', function(err, result)
    {
        if (err) 
            callback(err,null);
        else
            callback(null,result[0]);

    });
}

//Get All Contacts Endpoint
app.get('/AdViz/contacts', (req, res) => {
    let sql = 'SELECT * FROM contact';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);      
    });
});

//Post Contact Endpoint
app.post('/AdViz/contacts', (req, res) => {
    console.log(req.body);
    let json = req.body;
    let contact = {
            lastname: json.lastname,
            firstname: json.firstname,
            street: json.street,
            zipcode: json.zipcode,
            city: json.city,
            country: json.country,
            isPrivate: json.isPrivate
    };
    
    var query = connection.query('insert into contact set ?', contact, function(err, result) {
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
    });
    res.send('Added Contact');
});

//Put Contact Endpoint
app.put('/AdViz/contacts/:contactid', function (req, res) {
    //console.log(req.params.contactid);
    //console.log(req.body);

    var id = req.params.contactid;
    console.log(id);
    let json = req.body;
    let contact = {
            lastname: json.lastname,
            firstname: json.firstname,
            street: json.street,
            zipcode: json.zipcode,
            city: json.city,
            country: json.country,
            isPrivate: json.isPrivate
    };

    var query = connection.query('update contact set ? where contactid = ?', [contact, id], function(err, result) {
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
    });
    res.status(204).send();
});

//Delete Contact Endpoint
app.delete('/AdViz/contacts/:contactid', function (req, res) {
    var id = req.params.contactid;
    console.log(id);

    var query = connection.query('delete FROM contact where contactid = ?', id, function(err, result) {
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
    });
    res.status(204).send();
}); 

/*
//------------------------------------------------------- DB SETUP --------------------------------------------------------

var adminUser = {
    userid: 'admin',
    password: 'adminpw',
    firstname: 'Levi',
    lastname: 'Ackermann',
    isAdmin: 1
}

var normaloUser = {
    userid: 'normalo',
    password: 'normalopw',
    firstname: 'Eren',
    lastname: 'Jaeger',
    isAdmin: 0
}

var privateDefaultContact = {
    lastname: 'Abloh',
    firstname: 'Virgil',
    street: 'Singerstraße 19',
    zipcode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    isPrivate: 1
}


var publicDefaultContact = {
    lastname: 'Uzumaki',
    firstname: 'Naruto',
    street: 'Koppenstraße 18',
    zipcode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    isPrivate: 0
}

var publicDefaultContact2 = {
    lastname: 'Uchiha',
    firstname: 'Sasuke',
    street: 'Koppenstraße 19',
    zipcode: '10243',
    city: 'Berlin',
    country: 'Deutschland',
    isPrivate: 0
}

var query = connection.query('insert into contact set ?', publicDefaultContact2, function(err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.log(result);
});

var query1 = connection.query('insert into contact set ?', privateDefaultContact, function(err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.log(result);
});


var query2 = connection.query('insert into contact set ?', publicDefaultContact, function(err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.log(result);
});


var query3 = connection.query('insert into user set ?', normaloUser, function(err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.log(result);
});

var query4 = connection.query('insert into user set ?', adminUser, function(err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.log(result);
}); 
*/