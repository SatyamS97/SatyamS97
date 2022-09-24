let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let recipeId=urlParams.get('id');

const showDetails=(meal)=>{
    const photo=document.getElementById("main-image");
    photo.innerHTML=`<img src=${meal.meals[0].strMealThumb}>`;
    const name=document.getElementById("meal-name");
    name.innerText=meal.meals[0].strMeal;
    const instruction=document.getElementById("instruction");
    instruction.innerText=meal.meals[0].strInstructions;
    const cat=document.getElementById('cat');
    cat.innerText=meal.meals[0].strCategory;
    const area=document.getElementById('area');
    area.innerText=meal.meals[0].strArea;

}


//getiing details from api 
const getDetails=async (recipeId)=>{
    try{
        const res=await fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data=await res.json()
        consple.log ("hellotry");
        console.log(data);
        showDetails(data);
    }catch(err){
        //console.error(err);
        console.log ("hellocatch");
    }
}

//adding details on dom

getDetails(recipeId)
