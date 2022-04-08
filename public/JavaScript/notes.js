//shows new notes div
function newNote() {
  var x = document.getElementById("newNote");
  x.hidden = false;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//shows edit buttons
function editNote() {
  let x = document.querySelectorAll('.anchorButton');

  [].forEach.call(x, function editNotes(x) {
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

//allows user to cancel an new entry
function hideAddForm() {
  document.getElementById('newNote').hidden = true;
}