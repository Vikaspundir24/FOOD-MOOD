// Fetch for random image in middle part\\

//  //

/* RANDOM FOOD IN POPULAR SECTION */
const popuFood = fetch("https://api.spoonacular.com/recipes/random?number=6&apiKey=2dd86708834a48b8b90ee3b687038a25")
    .then(response => {
        return response.json()
    })
    .then(data => {
        const finalData = data
        console.log(finalData)

        for (i = 0; i < 6; i++) {
            let sourceUrl = finalData.recipes[i].sourceUrl;
            document.getElementById("img" + (i + 1)).innerHTML = `  <a href= "${sourceUrl}" target ="tab"> <img src="${finalData.recipes[i].image}"></img>  </a>`;
        }
        for (i = 0; i < 6; i++) {
            document.getElementById("d" + (i + 1)).innerText = finalData.recipes[i].title;
        }
    })


/* SEARCH RESULT  */
/* MAIN CODE FROM HERE */


const input = document.querySelector(".input");
const clickBtn = document.querySelector(".click-btn");
const searchResult = document.querySelector(".search-result")
const result = document.querySelector(".result")
// const resultContainer = document.querySelectorAll(".result-container")


/* SUBMIT BUTTON CODE */

clickBtn.addEventListener("click", () => {
    console.log("click")

    if (input.value) {
        resultFound();
        input.value = "";
    } else {
        alert("ENTER A  DISH ")
        input.value = "";
    }


})

function resultFound() {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input.value}&number=8&apiKey=2dd86708834a48b8b90ee3b687038a25`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const recipeData = data
            console.log(recipeData);
            let l = recipeData.results.length;
 if (recipeData.totalResults === 0) {
    alert("NO MEALS FOUND")
 }
 else{
    searchResult.style.display = "flex";
    result.style.display = "grid";

    result.innerHTML = recipeData.results.map(
        results => `
        <div class = result-container>
        <img src = "${results.image}">
        </div>
        `
    )
 }
            
        
           

           
           


        })

        .catch(err => alert("SOMETHING WENT WRONG"))

}