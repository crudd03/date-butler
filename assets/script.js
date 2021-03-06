
function findDrinkByName(event) {
  event.preventDefault();

  const drinkName = document.getElementById('drinkName').value;
  const drinkNameDiv = document.getElementById('drinkNameDiv');
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;

//random drink
function getCocktail() {
    fetch(apiUrl).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

getCocktail(); 



// function displayCocktail(cocktail) {
//     console.log(cocktail.drinks[0]);

//     let drinkSection = document.querySelector('#drink-section');

//     let drinkName = document.createElement('h2');
//     drinkName.innerHTML = cocktail.drinks[0].strDrink;

//     drinkSection.appendChild(drinkName);

//     let img = document.createElement('img');
//     img.src = cocktail.drinks[0].strDrinkThumb;

//     drinkSection.appendChild(img);

//     for(let i = 1; i < 16; i++) {
//         console.log(i);
        
//         if(cocktail.drinks[0] [`strIngredient${i}`] == null || cocktail.drinks[0] [`strIngredient${i}`] == null) {
//             break;
//         }

//         let ingredient = document.createElement('list-group-item');
//         ingredient.innerHTML = cocktail.drinks[0] [`strMeasure${i}`] + ': ' + cocktail.drinks[0] [`strIngredient${i}`];

//         drinkSection.appendChild(ingredient);
    
//     }

//     let card = document.createElement('card-body');
//     card.innerHTML = cocktail.drinks[0].strInstructions;

//     drinkSection.appendChild(card);

// }

// }
}document.querySelector('#drinkNameSubmit').addEventListener('click', findDrinkByName);