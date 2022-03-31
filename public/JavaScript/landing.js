let dates = document.getElementsByClassName('date');
for (let i=0; i < dates.length; i++) { 
  dates[i].innerHTML = dates[i].innerHTML.slice(0, -35);
}