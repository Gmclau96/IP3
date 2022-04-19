var date = new Date();

console.log(date);

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h2").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    //monthDays.innerHTML = days;
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

//Removes timezone from appearing on calendar entries
let dates = document.getElementsByClassName('eventDate');
for (let i = 0; i < dates.length; i++) {
  dates[i].innerHTML = dates[i].innerHTML.slice(0, -34);
}

//Nav Menu
function openNav() {
  document.getElementById("nav-menu").style.width = "250px";
}

function closeNav() {
  document.getElementById("nav-menu").style.width = "0";
}

//shows edit, remove, done buttons in tables
function showEditingButtons() {
  let x = document.getElementsByClassName('removeEvent');
  let y = document.getElementsByClassName('editEvent');
  let comp = document.getElementById('editComplete');
  console.log(x);
  [].forEach.call(x, function showDelete(x) {
    x.classList.remove("hide");
  });
  [].forEach.call(y, function showEdit(y) {
    y.classList.remove("hide");
  });
  comp.classList.remove("hide");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//Hides editing buttons
function hideEditingButtons() {
  let x = document.getElementsByClassName('removeEvent');
  let y = document.getElementsByClassName('editEvent');
  let comp = document.getElementById('editComplete');

  console.log("hide editing function being called!");

  console.log(x);
  [].forEach.call(x, function showDelete(x) {
    x.classList.add("hide");
  });
  [].forEach.call(y, function showEdit(y) {
    y.classList.add("hide");
  });
  comp.classList.add("hide");
  console.log("hide");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//For adding new event and controlling event form 
const newEventForm = document.querySelector(".newEvent");

function showForm() {
  newEventForm.showModal();
}

function hideForm() {
  newEventForm.close();
}

//let role = document.getElementById("userRole");
//console.log("role" + role);