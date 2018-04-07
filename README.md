# LIRI-node-API V001
by Amjad Alqazqi

command instruction ***********************

1> `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
2> `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.


3> 1. `node liri.js tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.


package required :

npm i twitter
npm i node-spotify-api
npm i request
npm i dotenv
