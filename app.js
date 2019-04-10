const express = require("express");
const app = express();
const PORT = 5001;
const faker = require("faker");
const bodyParser = require("body-parser");
const axios = require('axios');

const mongoose = require('mongoose');
mongoose.connect('mongodb://agguser:123asd@ds133875.mlab.com:33875/searchaggregate');

const User = require('./models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//routes for test

app.get('/', (req, res)=> {
   res.render('search', {
       pageTitle: 'Search page'
   });
});

app.post('/add', (req, res) => {
   // add data to database
    let newUser = new User({
        name: faker.name.Name(),
        username: faker.name.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        bio: faker.lorem.sentence(),
        image: faker.image.avatar(),
        website: 'www.arif.com',
        phone: faker.phone.phoneNumber(),
        salary: faker.random.number(),
        job_title: faker.name.jobTitle(),
    });

    newUser.save(err => {
        if(err) throw err;
        res.json(newUser);
    });
});

app.post('/search', (req, res)=> {
    console.log(req.body);
    axios.get('https://jsonplaceholder.typicode.com')
    .then(response=> {
        console.log(response.data.Search)
        res.render('search', {
            user: response.data.Search
        })
    })
    .catch(error=> console.log(error));
});

app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});



