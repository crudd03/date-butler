// Movie variables
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
let saveMovieFeedback = $('#saveMovieFeedback');
let randomMovie;

let movieAPIKey = "50c12291de6c61f2b38b94e827184d47";

// Function for geting movie results from API
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
            poster.attr("height", "300px");
            poster.attr("width", "200px");
            title.text(randomMovie.title);
            overview.text(randomMovie.overview);
            saveMovieFeedback.text("");
        });
}

// Saving latest movie to local storage
function saveMovieResult(event) {
    event.preventDefault();
    let savedMovie = localStorage.setItem("savedMovie", JSON.stringify(randomMovie));
    saveMovieFeedback.text("Movie Saved!");
    // saveMovieFeedback.attr("class", "fade-out-save");
}

// Loading latest movie from local storage
function loadMovieResult(event) {
    event.preventDefault();
    let loadedMovie = JSON.parse(localStorage.getItem("savedMovie"));
    console.log(loadedMovie);
    let loadedPoster = "https://image.tmdb.org/t/p/original" + loadedMovie.poster_path;
    poster.attr("src", loadedPoster);
    poster.attr("height", "300px");
    poster.attr("width", "200px");
    title.text(loadedMovie.title);
    overview.text(loadedMovie.overview);
    saveMovieFeedback.text("Movie Loaded!");
    // saveMovieFeedback.attr("class", "fade-out-load");
}

// Button event listeners
movieButton.on('click', getMovieResults);
saveMovieButton.on('click', saveMovieResult);
loadMovieButton.on('click', loadMovieResult);

// Drink variables
let drinkPoster = $('#drinkImg');
let drinkTitle = $('#drinkTitle');
let drinkRecipeInfo = $('#drinkRecipeInfo');
let drinkIngredients = $('#drinkIngredients');
let drinkRecipe = $('#drinkRecipe');
let saveDrinkButton = $('#saveDrink');
let loadDrinkButton = $('#loadDrink');
let randomDrink;

// Function for getting drink results from API
function findDrinkByName(event) {
    event.preventDefault();
  
    let drinkName = document.getElementById('drinkName').value;
    let drinkNameDiv = document.getElementById('drinkNameDiv');
    let apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
  
    function getCocktail() {
        fetch(apiUrl).then(function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          
          response.json().then(function(data) {
            
            randomDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
            console.log(randomDrink);

            drinkPoster.attr("src", randomDrink.strDrinkThumb);
            drinkPoster.attr("height", "300px");
            drinkPoster.attr("width", "300px");
            drinkTitle.text(randomDrink.strDrink);
            const ingredientList = [];
            
            for (let i = 1; i < 16; i++) {
              // Address null values for drinkMeasure
              let drinkIngredient = randomDrink['strIngredient' + i];
              let drinkMeasure = randomDrink['strMeasure' + i];
              if(drinkIngredient === null) {
          
                break;
              }
              console.log(drinkIngredient);
              console.log(drinkMeasure);
              let ingredients = drinkMeasure + ": " + drinkIngredient;
              ingredientsOl = $("<ol>");
              ingredientsOl.text(ingredients);
              drinkIngredients.append(ingredientsOl);
            }
            drinkRecipeInfo.text(randomDrink.strInstructions);

          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }
    
      getCocktail(); 
  
}

// Button listener for drink button
document.querySelector('#drinkNameSubmit').addEventListener('click', findDrinkByName);
  
// Dinner Variables
let mealPicture = $('#mealPicture');
let mealTitle = $('#mealTitle');
let randomMeal;
let saveMeal = $('#saveMeal');
let loadMeal = $('#loadMeal');
let mealRecipe = $('#mealRecipe');

// Function for getting meal results from API
function findDinnerByMainIngredient(e) {
  e.preventDefault();

  let mealName = document.getElementById('mealName').value;

  console.log(mealName);
  let mealNameDiv = document.getElementById('mealNameDiv');
  let newAPIURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
  // let newAPIURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + mealName;

  // TODO: Sometimes a search doesn't return anything, or user input is faulty, fix this 
  function getMeal() {
    fetch(newAPIURL).then(function(response) {
      if (response.status !== 200) {
        console.log('We have an issue' + response.status);
        return;
      }
      // Add a link out to the site
      response.json().then(function(data){
        console.log(data);
        randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
        console.log(randomMeal);
        let mealPictureURL = randomMeal.strMealThumb;
        mealPicture.attr("src", mealPictureURL);
        mealPicture.attr("height", "300px");
        mealPicture.attr("width", "300px");
        mealTitle.text(randomMeal.strMeal);
        mealRecipe.attr("href", randomMeal.strYoutube);
        mealRecipe.attr("target", "_blank");
        mealRecipe.text("YouTube recipe");
      });
    })
  }

getMeal();


}
  
  function saveMealResult(event) {
    event.preventDefault();
    let savedMeal = localStorage.setItem("savedMeal", JSON.stringify(randomMeal));
}

  function loadMealResult(event) {
    event.preventDefault();
    let loadedMeal = JSON.parse(localStorage.getItem("savedMeal"));
    console.log(loadedMeal);
    let loadedMealImg = loadedMeal.strMealThumb;
    mealPicture.attr("src", loadedMealImg);
    mealPicture.attr("height", "300px");
    mealPicture.attr("width", "300px");
    mealTitle.text(loadedMeal.strMeal);
    mealRecipe.attr("href", loadedMeal.strYoutube);
    mealRecipe.attr("target", "_blank");
  }

  document.querySelector("#mealNameSubmit").addEventListener('click', findDinnerByMainIngredient);
  saveMeal.on('click', saveMealResult);
  loadMeal.on('click', loadMealResult);
  