function Delete() {
    var elem = document.getElementById('recipeBox');
    elem.parentNode.removeChild(elem);
    return false;
}

function remove() {
    var elem = document.getElementById('recipeBox2');
    elem.parentNode.removeChild(elem);
    return false;
}

/**function myFunction() {
    var x = document.getElementById("delete-button");
    var y = document.getElementById("remove-button");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }**/

  function myFunction(){
     var x= document.getElementById("delete-button");
      x.hidden = false;
    var y=document.getElementById("remove-button");
    y.hidden = false;
  }

  //show add recipe div
  function newRecipe() {
    var x= document.getElementById("newRecipeDiv");
      x.hidden = false;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//show update buttons under recipes
//shows edit buttons
function editRecipe() {
  let x = document.querySelectorAll('.edit');

  [].forEach.call(x, function editRecipes(x) {
    x.hidden = false;
  });
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}