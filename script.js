// UNIQUE KEY = apiKey=2dd86708834a48b8b90ee3b687038a25
// UNIQUE KEY 2 = apiKey=90edaf4613584af6a5651894feb4ce99
// UNIQUE KEY 3 = apiKey=3e55c57d41b04ecd9354ee0b5095685b

const input = document.querySelector(".input");
const clickBtn = document.querySelector(".click-btn");
const searchResult = document.querySelector(".search-result");
const result = document.querySelector(".result");
const resultContainer = document.querySelectorAll(".result-container") 
const detailedView = document.querySelector(".detailed-view");
const goBack = document.querySelector(".goBack");
const loaderContainer = document.querySelector(".loader-container");

/* RANDOM FOOD IN POPULAR SECTION */

const popuFood = fetch(
        "https://api.spoonacular.com/recipes/random?number=6&apiKey=90edaf4613584af6a5651894feb4ce99"
    )
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const finalData = data;
        console.log(finalData);
        if(finalData.status === "failure"){
           alert("TODAY'S LIMIT REACHED")
        }
        for (i = 0; i < 6; i++) {
            let sourceUrl = finalData.recipes[i].sourceUrl;
            document.getElementById(
                "img" + (i + 1)
            ).innerHTML = `  <a href= "${sourceUrl}" target ="tab"> <img src="${finalData.recipes[i].image}"></img>  </a>`;
        }
        for (i = 0; i < 6; i++) {
            document.getElementById("d" + (i + 1)).innerText =
                finalData.recipes[i].title;
        }
    });

/* SEARCH RESULT  */
/* MAIN CODE FROM HERE */
/* SUBMIT BUTTON CODE */

clickBtn.addEventListener("click", () => {
    // console.log("click")

    if (input.value) {
        resultFound();
        input.value = "";
    } else {
        alert("ENTER A  DISH ");
        input.value = "";
    }
});

//RESULT OF SEARCH ITEM

function resultFound() {
    fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${input.value}&number=100&apiKey=90edaf4613584af6a5651894feb4ce99`
        )
        .then((response) => {
            return response.json();
            const recipeData = response.json();
        })
        .then((data) => {
            const recipeData = data;
            console.log(recipeData);
            let l = recipeData.results.length;
            if (recipeData.totalResults === 0) {
                alert("NO MEALS FOUND");
            } else {
                searchResult.style.display = "flex";
                result.style.display = "flex";

                result.innerHTML = recipeData.results
                    .map(
                        (
                            results
                        ) => `<div class = "result-container" data-mealID= "${results.id}"  >
                    <img src = "${results.image}">
                    <h2>"${results.title}"</h2>
                     </div>`
                    )
                    .join("");
            }
        })
        .catch((err) => alert("SOMETHING WENT WRONG"));
}

// GET DETAILS OF CLICKED CARD-CONTAINER DISH


result.addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains("result-container")){
        console.log("yes")
        const mealID = e.target.parentElement.getAttribute("data-mealid")
        console.log(mealID)
        result.style.display = "none";
        detailedView.style.display = "flex";
        getMealById(mealID)
    }
   
});



//MEAL BY ID FOR DETAILED VIEW

function getMealById(mealID) {
    fetch(
            `https://api.spoonacular.com/recipes/${mealID}/information?apiKey=90edaf4613584af6a5651894feb4ce99`
        )
        .then((res) => res.json())
        .then((data) => {
            const mealData = data;
            console.log(mealData);

            detailedView.innerHTML = `
                      <div class="headline">
                       <a href = "#" onclick='window.open("${mealData.sourceUrl}");return false;'><h1>${mealData.title}</h1></a>
                     <img src = "./cross.png" onClick = back()>
                      </div>
           
            <div class="top">
                <img src="${mealData.image}" alt="">
                <p>${mealData.summary}</p>
            </div>
            <div class="bottom">
                 <h2>Procedure:</h2>
                <p>${mealData.instructions}</p>
            </div>`;
        });
}

function back() {
    console.log("han");
    detailedView.style.display = "none";
    result.style.display = "flex";
}

window.addEventListener("load", () => {
    loaderContainer.style.display = "none";
});

const displayLoading = () => {
    loaderContainer.style.display = "block";
};

const hideLoading = () => {
    loaderContainer.style.display = "none";
};