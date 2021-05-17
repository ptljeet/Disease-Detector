const fetch = require('node-fetch');
const hash = require('./generateHash');
const config = require('./config');

const username = config.username;
const password = config.password;
const login_url = 'https://authservice.priaid.ch/login';
const url = "https://healthservice.priaid.ch/diagnosis";
var auth = "Bearer " +  `${username}:${hash}`;



module.exports.getIssueInfo = function getIssueDetails(issueId, res_of_parent){

    fetch(login_url, {
        method: 'post',
        headers: { "Authorization": auth },
    })
    .then(res => res.json())
    .then(json => {

        var token = json.Token;

        fetch(`https://healthservice.priaid.ch/issues/${issueId}/info?token=${token}&language=en-gb`)
            .then(res => res.text())
            .then(json => {
                var result = JSON.parse(json)
                var length_of_result = result.length;
                console.log(result.Description);
                res_of_parent.render("disease-info", {diseaseInfo: result});
            })

        
    })

}