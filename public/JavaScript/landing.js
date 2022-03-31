//Removes timezone from appearing on calendar entries
let dates = document.getElementsByClassName('date');
for (let i=0; i < dates.length; i++) { 
  dates[i].innerHTML = dates[i].innerHTML.slice(0, -35);
}

//Nav Menu
function openNav() {
  document.getElementById("nav-menu").style.width = "250px";
}

function closeNav() {
  document.getElementById("nav-menu").style.width = "0";
}