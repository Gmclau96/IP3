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