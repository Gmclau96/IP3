function myFunction(){
    var x= document.getElementById("delete-button");
    x.hidden = false;
 }

 function Delete() {
    var elem = document.getElementById('listBox');
    elem.parentNode.removeChild(elem);
    return false;
}


