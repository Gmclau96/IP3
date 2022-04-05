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