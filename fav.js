let favMeals=JSON.parse(localStorage.getItem('favMeals'));
mealsList=document.getElementById("meals-list");
let url='https://www.themealdb.com/api/json/v1/1/lookup.php?i=';


//fetching meals present in Local storage from api
const fetchData=async (mealId)=>{
    try {
        let res=await fetch(url+mealId);
        let data=await res.json();
        displayResults(data.meals[0]);
    } catch (error) {
        console.error(error);
    }
}


//showing favourite meals present in local Storage
const showFav=()=>{
    
    if(favMeals.length===0){
        console.log('favMeals');
        mealsList.innerHTML='<h1>Favourite Meals list Empty!</h1>'
    }else{
        mealsList.innerHTML='';
        console.log(favMeals);
        favMeals.map((mealId)=>{
            const mealData=fetchData(mealId);
        })
    }
}

//displaying fav meals in dom
const displayResults=(meal)=>{
    let isFav=true;
    mealsList.innerHTML +=`<li class="meal">
    <img src="${meal.strMealThumb}" /img>
     <div class="meal-name" id="${meal.idMeal}">
     <h2 class="recipe-name">${meal.strMeal}</h2> 
     <i class="${ isFav ? 'fas' : 'far' } fa-heart fav-btn"></i>
     </div>
     </li>`;
}


//adding evenlistner click on heart button and recipe name
mealsList.addEventListener('click',(e)=>{
    if(e.target.className == 'recipe-name'){
        let recipeId=e.target.parentNode.id;
        window.open(`recipe.html?id=${recipeId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let recipeId=e.target.parentNode.id;
        let localArray=JSON.parse(localStorage.getItem('favMeals'));
        localArray=localArray.filter((item)=> item != recipeId);
        localStorage.setItem('favMeals',JSON.stringify(localArray));
        favMeals=JSON.parse(localStorage.getItem('favMeals'));
        alert('Removed From Favourites');
        showFav();
    }
})


showFav();