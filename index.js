const generateHTML = require("./generatedHTML");
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const util = require("util");
const pdf = require('html-pdf');
const options = { format: 'Letter' };

const html = fs.readFileSync('./index.js', 'utf8');

function init() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter you GitHub username: ",
                name: "username",
            },
            {
                type: "list",
                message: "Select your preferred color: ",
                choices: ["green", "blue", "pink", "red"],
                name: "color",
            }
        ])

    .then(function({username, color}) {
        const queryURL = `https://api.github.com/users/${username}`;
        axios.get(queryURL).then(function(response) {

            let photo = response.data.avatar_url;
            let name = response.data.login;
            let company = response.data.company;
            let location = response.data.location;
            let profile = response.data.profile;
            let blog = response.data.blog;
            let bio = response.data.bio;
            let repos = response.data.public_repos;
            let followers = response.data.followers;
            let stars = response.data.stars;
            let following = response.data.following;

            console.log(photo, name, company, location, profile, blog, bio, repos, followers, stars, following);

            const html = generateHTML({color, photo, name, company, location, profile, blog, bio, repos, followers, stars, following});

            pdf.create(html, options).toFile('./index.pdf', function(err, res) {
                if (err) {
                    return console.log(err);
                }
                console.log(res);
            });
        })
    })
}

init();