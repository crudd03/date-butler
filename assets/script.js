let movieGenre = $('#movieGenres');
let movieType = $('#movieType');
let rating = $('#rating')
let releaseDate = $('#releaseDate');
let movieButton = $('#movieButton');
let title = $('#title');
let overview = $('#overview');
let poster = $('#poster');
let saveMovieButton = $('#saveMovie');
let loadMovieButton = $('#loadMovie');
let randomMovie;
let storedMovieObject;


let movieAPIKey = "50c12291de6c61f2b38b94e827184d47";

function getMovieResults(event) {
    event.preventDefault();

    let movieGenreValue = movieGenre.val();
    let movieTypeValue = movieType.val();
    let ratingValue = rating.val();
    let releaseDateValue = releaseDate.val();

    let testMovieURL = ("https://api.themoviedb.org/3/discover/movie?api_key=" + movieAPIKey + "&with_genres=" + movieGenreValue + "&sort_by=" + movieTypeValue + "&primary_release_year=" + releaseDateValue + "&certification_country=US&certification=" + ratingValue);

    fetch(testMovieURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            let posterSource = "https://image.tmdb.org/t/p/original" + randomMovie.poster_path;
            console.log(randomMovie);
            poster.attr("src", posterSource);
            poster.attr("height", "200px");
            poster.attr("width", "150px");
            title.text(randomMovie.title);
            overview.text(randomMovie.overview);

        });
}

function saveMovieResult(event) {
    event.preventDefault();
    let savedMovie = localStorage.setItem("savedMovie", JSON.stringify(randomMovie));
    savedMovieObject = savedMovie;
}

function loadMovieResult(event) {
    event.preventDefault();
    let loadedMovie = JSON.parse(localStorage.getItem("savedMovie"));
    console.log(loadedMovie);
    let loadedPoster = "https://image.tmdb.org/t/p/original" + loadedMovie.poster_path;
    poster.attr("src", loadedPoster);
    poster.attr("height", "200px");
    poster.attr("width", "150px");
    title.text(loadedMovie.title);
    overview.text(loadedMovie.overview);
}

movieButton.on('click', getMovieResults);
saveMovieButton.on('click', saveMovieResult);
loadMovieButton.on('click', loadMovieResult);