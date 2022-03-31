function myFunction(){
  var x= document.getElementById("delete-button");
  x.hidden = false;
}

function Delete() {
  var elem = document.getElementById('listBox');
  elem.parentNode.removeChild(elem);
  return false;
}

function newList(){
  var x= document.getElementById("newListDiv");
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

for (let i = 2; i < 11; i++){
  var hiddenid = document.getElementById('listItemlb' + i);
  var hidden = document.getElementById('listItem' + i);
  
  if (hiddenid.hidden == true)
  {
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


document.querySelector('ul');
list.addEventListener('click', function(ev) {
if (ev.target.tagName === 'LI') {
  
  ev.target.classList.toggle('checked');
  

}
}, false);

//Nav Menu
function openNav() {
  document.getElementById("nav-menu").style.width = "250px";
}

function closeNav() {
  document.getElementById("nav-menu").style.width = "0";
}