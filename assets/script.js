
//random drink
function getRandomCocktail() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        displayRandomCocktail(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

getRandomCocktail(); 

function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0]);

    let drinkSection = document.querySelector('#drink-section');

    let drinkName = document.createElement('h2');
    drinkName.innerHTML = cocktail.drinks[0].strDrink;

    drinkSection.appendChild(drinkName);

    let img = document.createElement('img');
    img.src = cocktail.drinks[0].strDrinkThumb;

    drinkSection.appendChild(img);

    for(let i = 1; i < 16; i++) {
        console.log(i);
        
        if(cocktail.drinks[0] [`strIngredient${i}`] == null || cocktail.drinks[0] [`strIngredient${i}`] == '') {
            break;
        }

        let ingredient = document.createElement('list-group-item');
        ingredient.innerHTML = cocktail.drinks[0] [`strMeasure${i}`] + ': ' + cocktail.drinks[0] [`strIngredient${i}`];

        drinkSection.appendChild(ingredient);
    
    }

    let card = document.createElement('card-body');
    card.innerHTML = cocktail.drinks[0].strInstructions;

    drinkSection.appendChild(card);

}



// $("#userSearchBtn").on("click", function() {
//     event.preventDefault();
//     userInput = $("#serSearch").val()

//     appendRecipe();
//     storeRecipes();
// })


// function appendRecipe() {
//     let queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

//     $.ajax9({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response)
//         // randomly select recipe by ID; then do an API call to get the source URL of that recipe
//         if (response.reasults.length === 0) {
//             alert("uh oh!");
//             return false;
//         }

//         let recipeIndex = Math.floor(Math.random() * (response.results.length - 0) + 0);
//         let recipeID = response.results[recipeIndex].id;

//         let newQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"

//         $.ajax({
//             url: newQueryURL,
//             method: "GET"
//         }).then(function(response){

//             let recipeURL = response.sourceURL;
            

            

//         })
//     })
// }