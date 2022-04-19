//Removes timezone from appearing on calendar entries
let dates = document.getElementsByClassName('date');
for (let i=0; i < dates.length; i++) { 
  dates[i].innerHTML = dates[i].innerHTML.slice(0, -34);
}

//Nav Menu
function openNav() {
  document.getElementById("nav-menu").style.width = "250px";
}

function closeNav() {
  document.getElementById("nav-menu").style.width = "0";
}

/*
function openNav() {
  let role = document.getElementById("userRole"); 
  let value = role.textContent;  //gets text contents of span
  console.log("result = " + value); //check
  if (value === true) {
    role.hidden = false;
  }
  document.getElementById("nav-menu").style.width = "250px";
}*/

//remembers checkbox state
let itemBox = document.getElementsByClassName('itemBox');
let itemLabel = document.getElementsByClassName('itemLabel');
for (let i = 0; i < itemBox.length; i++) {
  if (itemLabel[i].innerHTML.charAt(0) === "t") {
    itemBox[i].checked = true;
  } 
}


//slices boolean state from output
for (let i = 0; i < itemLabel.length; i++) {
  if (itemLabel[i].innerHTML.charAt(0) == "t") {
    itemLabel[i].innerHTML = itemLabel[i].innerHTML.slice(4);
  } else {
    itemLabel[i].innerHTML = itemLabel[i].innerHTML.slice(5);
  }
}

//only shows chekboxes if there is an item attached to it
for (let i = 0; i < itemBox.length; i++) {
  if (itemLabel[i].innerHTML.length == 0) {
    itemBox[i].style.opacity = 0;
    itemBox[i].style.position = "absolute";
    itemBox[i].style.left = "9999999px";
  } 
}