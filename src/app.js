const express = require('express');
const bodyParser = require('body-parser');
const getDisease = require("./getDisease");
const getIssueInfo = require("./getIssueInfo");


const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');  //ejs for web template, diaplaying html content
app.use(bodyParser.urlencoded({ extended: true })); 
app.use( express.static( "public" ) );
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('');
    //res.sendFile("../public/views/index.html")
})

app.get('/select-details.html', (req, res) => {
    res.render("select-details")
})

app.post('/calculate-symptoms', (req, res) => {
    //res.send(req.body);
    var length_of_symptoms = req.body.symptoms.length; 
    
    //console.log(req.body.symptoms[0]);
    var symptoms_id = new Array();

    for(let i=0;i<length_of_symptoms;i++){
        symptoms_id.push(req.body.symptoms[i]);
    }
    console.log(symptoms_id);
    console.log(req.body.gender);
    console.log(req.body.birth_year);

    var gender = req.body.gender;
    var birth_year = req.body.birth_year;

    getDisease.calculateDisease(symptoms_id, gender, birth_year, res);
})

app.post('/get-info-of-disease', (req, res) => {
    //console.log(req.body.issueId);
    var issueId = req.body.issueId;

    getIssueInfo.getIssueInfo(issueId, res);
})


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});