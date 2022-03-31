//shows new notes div
function newNote() {
  var x = document.getElementById("newNoteDiv");
  x.hidden = false;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//shows edit buttons
function editNote() {
  let x = document.querySelectorAll('.edit');

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