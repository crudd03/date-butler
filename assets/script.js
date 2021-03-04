//Kayte's Cocktail API Work

$("#userSearchBtn").on("click", function() {
    event.preventDefault();
    userInput = $("#serSearch").val()

    appendRecipe();
    storeRecipes();
})


function appendRecipe() {
    let queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

    $.ajax9({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        // randomly select recipe by ID; then do an API call to get the source URL of that recipe
        if (response.reasults.length === 0) {
            alert("uh oh!");
            return false;
        }

        let recipeIndex = Math.floor(Math.random() * (response.results.length - 0) + 0);
        let recipeID = response.results[recipeIndex].id;

        let newQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"

        $.ajax({
            url: newQueryURL,
            method: "GET"
        }).then(function(response){

            let recipeURL = response.sourceURL;
            
            
            

        })
    })
}