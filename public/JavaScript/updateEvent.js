//removes timezone from appearing
let dates = document.getElementsByClassName('eventDate');
for (let i = 0; i < dates.length; i++) {
    dates[i].innerHTML = dates[i].innerHTML.slice(0, -34);
}


//changes the format of the calendar event to one that is readable for the dateTime input
let date = dates[0].innerHTML.split(" ");
console.log(date);

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
for (var i = 0; i < months.length; i++) {
    if (date[1] == months[i]) {
        date[1] = months.indexOf(months[i]) + 1;
    }
}
if (date[1] < 10) {
    date[1] = '0' + date[1];
}
var eventDate = date[3] + "-" + date[1] + "-" + date[2] + "T" + date[4];
console.log(eventDate);

document.getElementById('dateTime').value = eventDate;