  //show add recipe div
  function newRecipe() {
    var x= document.getElementById("newRecipe");
      x.hidden = false;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//show update buttons under recipes
function editRecipe() {
  let x = document.querySelectorAll('.anchorButton');

  [].forEach.call(x, function editRecipes(x) {
    x.hidden = false;
  });
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//Nav Menu
function openNav() {
  document.getElementById("nav-menu").style.width = "250px";
}

function closeNav() {
  document.getElementById("nav-menu").style.width = "0";
}

//Seperates each ingredient onto a new line
let ingredients = document.getElementsByClassName('recipeIngredients');
for (let i=0; i < ingredients.length; i++) { 
  ingredients[i].innerHTML = ingredients[i].innerHTML.split(",").join("<br />")
}

//Seperates steps onto new lines by .
//Seperates each ingredient onto a new line
let steps = document.getElementsByClassName('recipeMethod');
for (let i=0; i < steps.length; i++) { 
  steps[i].innerHTML = steps[i].innerHTML.split(".").join("<br />")
}

//allows user to cancel an new entry
function hideAddForm() {
  document.getElementById('newRecipe').hidden = true;
}