


require('dotenv').config();
//let fs = require("fs");
let mykey = require('./keys.js');
var Twitter = require('twitter');
var theclient = new Twitter(mykey.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(mykey.spotify);
let request = require('request');

let [node, path, command, ...value] = process.argv;




let getSongInfo = function (song_name) {

    let query = song_name;
    spotify.search({ type: 'track', query: query }, function (error, data) {
        if (error) {

            return console.log('Error occurred: ' + error);
        } else if (query === 'The Sign') {
            let objects = data.tracks.items;
            let songItems = [];
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].artists[0].name === 'Ace of Base') {
                    let songInfo = {
                        artist: objects[i].artists[0].name,
                        title: objects[i].name,
                        link: objects[i].external_urls.spotify,
                        album: objects[i].album.name,
                    };
                    songItems.push(songInfo);
                };
            };
            console.log(songItems[1]);
            logSongResults(songItems[1]);
        } else {
            let object = data.tracks.items[0];
            let songInfo = {
                artist: object.artists[0].name,
                title: object.name,
                link: object.external_urls.spotify,
                album: object.album.name,
            };
            console.log(songInfo);
            logSongResults(songInfo);
        }
    })
}

let mytweet = function () {

    var params = { screen_name: 'a_alqazqi' };
    theclient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            var i = 0;
            while (i < 20) {
                let listing = i + 1
                let t = tweets[i]
                let twitterresults = {

                    text: t.text,
                    created: t.created_at,

                }
                console.log(twitterresults);
                i++;
            }
        }
    })
}

let getMovieInfo = function (movie_name) {
    //   logSearch();
    request('http://www.omdbapi.com/?t=' + movie_name + '&apikey=trilogy&r=json', 'utf8', function (error, response, body) {
        if (error) {
            console.log(error);
        } else if (response.statusCode !== 200) {
            console.log('statusCode:', response && response.statusCode);
        } else {
            // console.log(JSON.parse(data.body));
            let data = JSON.parse(body);
            let movieInfo = {
                title: data.Title,
                year: data.Year,
                rating: data.imdbRating,
                country: data.Country,
                language: data.Language,
                plot: data.Plot,
                actors: data.Actors,
            }
            console.log(movieInfo);
            logMovieResults(movieInfo);
        }
    });
};


let logSearch = function () {
    let c = process.argv[2]
    let search;
    if (process.argv.length === 3) {
        search = c;
        console.log(search);
    } else {
        let title = value.join(' ');
        search = c + " " + title;
    }
    fs.appendFile('./log.txt', '\n' + search + ', ', 'utf8', function (error) {
        if (error) {
            console.log(error)
            throw error;
        } else {
            console.log(`saved search '${search}' to seach log`);
        }
    })
}

let logTwit = function (output) {

    let result = " Result: " + "output.number" + "output.text" + "output.created, ";

}

let logSongResults = function (output) {
    let result = `Result: ${output.artist}, ${output.title}, ${output.link}, ${output.album} `;
    fs.appendFile('./log.txt', result + '\n', 'utf8', function (error) {
        if (error) {
            console.log(error)
            throw error;
        } else {
            console.log(`saved result to log`);
        }
    })
}

let logMovieResults = function (output) {
    let result = `  Result: ${output.title}, ${output.year}, ${output.rating}, ${output.country}, ${output.language}, ${output.plot}, ${output.actors} `;
    fs.appendFile('./log.txt', result + '\n', 'utf8', function (error) {
        if (error) {
            console.log(error)
            throw error;
        } else {
            console.log(`saved result to log`);
        }
    });
}

switch (command) {
    case "tweets":
        mytweet();
        break;
    case 'spotify-this-song':
        if (process.argv.length === 3) {
            value = 'The Sign';
        }
        getSongInfo(value);
        break;
    case 'movie-this':
        if (process.argv.length === 3) {
            value = "Mr. Nobody";
        }
        getMovieInfo(value);

        break;
    case 'do-what-it-says':
        doIt();
        break;

}
