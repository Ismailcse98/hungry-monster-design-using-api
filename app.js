const searchBtn=document.getElementById("search-btn");
const mealList=document.getElementById("meal");
const mealDetailsContent=document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", removeModal);

function getMealList(){
    let searchInputText=document.getElementById("search-input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response=> response.json())
    .then(data=>{
        let html='';
        if(searchInputText.length==0){
            html="<span class='not-found'> Sorry!  Please search egg or beef or onion etc </span>";
        }else if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Food Details</a>
                    </div>
                </div>
                `;
            });
        }else{
            html="<span class='not-found'>Sorry! we didn't find any meal. Please search egg or beef or onion etc</span>";
        }
        mealList.innerHTML=html;
    });
}
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=>mealRecipeModal(data.meals))
    }
}
function mealRecipeModal(meal){
    meal=meal[0];
    let html=`
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <ul class="show-item">
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            <li>${meal.strIngredient6}</li>
            <li>${meal.strIngredient7}</li>
            <li>${meal.strIngredient8}</li>
            <li>${meal.strIngredient9}</li>
        </ul>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
function removeModal(){
    mealDetailsContent.parentElement.classList.remove('showRecipe');
}