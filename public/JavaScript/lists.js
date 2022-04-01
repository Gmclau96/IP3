function myFunction() {
  var x = document.getElementById("delete-button");
  x.hidden = false;
}

function Delete() {
  var elem = document.getElementById('listBox');
  elem.parentNode.removeChild(elem);
  return false;
}

function newList() {
  var x = document.getElementById("newListDiv");
  x.hidden = false;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//shows edit buttons
function editList() {
  let x = document.querySelectorAll('.edit');

  [].forEach.call(x, function editLists(x) {
    x.hidden = false;
  });
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function expandList() {

  for (let i = 2; i < 11; i++) {
    var hiddenid = document.getElementById('listItemlb' + i);
    var hidden = document.getElementById('listItem' + i);

    if (hiddenid.hidden == true) {
      hiddenid.hidden = false;
      hidden.hidden = false;

      i = 99;
    }
  }
}

/** 
function toggleList(){
document.querySelector('ul');
for (let i = 1; i < 11; i++){
var completed = document.getElementsByClassName('box' + i)
var task = document.getElementsByClassName('item' + i)
if (completed = true){
getElementById('li').toggle('checked');
}
}
}*/


// document.querySelector('ul');
// list.addEventListener('click', function (ev) {
//   if (ev.target.tagName === 'LI') {

//     ev.target.classList.toggle('checked');


//   }
// }, false);

//Nav Menu
function openNav() {
  document.getElementById("nav-menu").style.width = "250px";
}

function closeNav() {
  document.getElementById("nav-menu").style.width = "0";
}

//removes horizontal scrolling
document.documentElement.style.overflowX = 'hidden';

//remembers checkbox state
let itemBox = document.getElementsByClassName('itemBox');
let itemLabel = document.getElementsByClassName('itemLabel');
for (let i = 0; i < itemBox.length; i++) {
  if (itemLabel[i].innerHTML.charAt(1) == "t") {
    itemBox[i].checked = true;
  } else {
    itemBox[i].checked = false;
  }
}


//slices boolean state from output
for (let i = 0; i < itemLabel.length; i++) {
  if (itemLabel[i].innerHTML.charAt(1) == "t") {
    itemLabel[i].innerHTML = itemLabel[i].innerHTML.slice(6);
  } else {
    itemLabel[i].innerHTML = itemLabel[i].innerHTML.slice(8);
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