function myFunction() {
  var x = document.getElementById("delete-button");
  x.hidden = false;
}

function hideAddForm() {
  document.getElementById('newListDiv').hidden = true;
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
  let x = document.querySelectorAll('.anchorButton');

  [].forEach.call(x, function editLists(x) {
    x.hidden = false;
  });
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// Add Line to Add List Page
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




  for (let i = 2; i < 11; i++) {
    var itemlb = document.getElementById('itemlb' + i);
    var item = document.getElementById('item' + i);
    var checkboxlb = document.getElementById('checkboxlb' + i);
    var checkbox = document.getElementById('checkbox' + i);
    
    if (item.value  === '') {
     
      itemlb.hidden = true;
      item.hidden = true;
      checkboxlb.hidden = true;
      checkbox.hidden = true;
      
    
  }
}

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



//only show div section if there is an existing list item
/*
let present =  document.getElementsByClassName('listGroup');
for (let i = 0; i < present.length; i++) {
  if (itemLabel[i].innerHTML.length == 0) {
    present[i].style.display = 'none';
  }
}*/

//hides unused list divs
for (let i = 0; i < itemLabel.length; i++) {
  if (itemLabel[i].hidden == true) {
    let parentDiv = itemLabel[i].parentNode;
    parentDiv.style.display = "none";
    if(parentDiv.style.display == "none"){
      parentDiv.parentNode.style.display = "none";
    }
  }
}
//FOR UPDATING LISTS PAGE//
function expandEditList() {

  for (let i = 1; i < 11; i++) {
    var itemlb = document.getElementById('itemlb' + i);
    var item = document.getElementById('item' + i);
    var checkboxlb = document.getElementById('checkboxlb' + i);
    var checkbox = document.getElementById('checkbox' + i);
    if (item.hidden == true) {
      let parentDiv = itemlb.parentNode;
      let checkDiv = checkbox.parentNode;
      parentDiv.parentElement.style.display = "flex";
      parentDiv.style.display = "flex";
      checkDiv.style.display = "block";
      itemlb.hidden = false;
      item.hidden = false;
      checkboxlb.hidden = false;
      checkbox.hidden = false;
      checkbox.checked = false;
      i = 99;
    }
  }
}