
searchBar=document.getElementById("search-bar");
mealsList=document.getElementById("meals-list");
container=document.getElementById("container");
searchBtn=document.getElementById("search-btn");
let isFav='fas';
let notFav='far';
let meals=[];
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

//adding eventListner on keyup in searchBar
searchBar.addEventListener('keyup',(e)=>{
    const searchString=e.target.value.toLowerCase();
    getResults(searchString);
})

//added eventlistner to searchButton
searchBtn.addEventListener('click',()=>{
    const searchString=searchBar.value.toLowerCase();
    getResults(searchString);
})


//making api call and getting results on the basis of key tapped
const getResults=async (searchString)=>{
    try{
        const res= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`);
        //console.log(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`);
        meals=await res.json();
         if(searchString.length<2){
            meals.meals=1;
        }
        displayResults(meals.meals);
    } catch(err){
        console.error(err);
    }
}


//displaying results on the basis of searchresults from an API Call and adding it to the DOM
const displayResults=(meals)=>{
    let localArray = JSON.parse(localStorage.getItem('favMeals'));
    if(meals===null){
        mealsList.innerHTML='<h1> No Meal Availaible With This Name</h1>'
    }else if(meals===1){
         mealsList.innerHTML='<h1 style="color:red;"></h1>'
        //alert("!Please Enter Atleast 2 Characters")
    }
    
    else{
        const mealString=meals.map((meal)=>{
            let recipeId=meal.idMeal;
            let isFav=false;
            if(localArray.indexOf(recipeId) !=-1 ){
                isFav=true;
            }
            return `<li class="meal">
            <img src="${meal.strMealThumb}" /img>
             <div class="meal-name" id="${meal.idMeal}">
             <h2 class="recipe-name">${meal.strMeal}</h2> 
             <i class="${ isFav ? 'fas' : 'far' } fa-heart fav-btn"></i>
             </div>
             </li>`;
     
         }).join('');
         mealsList.innerHTML=mealString;
    }
   
}

//initializing localStorage
function initializeLocalstorage(){
    let localArray = [];
    if(localStorage.getItem('favMeals') == null){
        //create a new localStorage
        localStorage.setItem('favMeals',JSON.stringify(localArray));
    }
}

//adding event listner on the meal items present in the DOM
let searchList = document.getElementById('meals-list');
searchList.addEventListener('click',(e)=>{ 
    if(e.target.className == 'recipe-name'){
        let recipeId= e.target.parentNode.id;
        window.open(`recipe.html?id=${recipeId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let recipeId=e.target.parentNode.id;
        console.log(recipeId);
        let localArray = JSON.parse(localStorage.getItem('favMeals'));
        if(localArray.indexOf(recipeId) != -1 ){
            localArray=localArray.filter((item)=> item != recipeId)
            localStorage.setItem('favMeals',JSON.stringify(localArray));
            e.target.classList.remove('fas');
            e.target.classList.add('far');
            console.log(localStorage);
        }else{
            localArray.push(recipeId);
            localStorage.setItem('favMeals',JSON.stringify(localArray));
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            alert('Added to Favourites')
            console.log(localStorage);
        }
    }
})


//calling initializelocalStorage when DOM is Loaded
document.addEventListener('DOMContentLoaded',initializeLocalstorage);