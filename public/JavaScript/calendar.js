const date = new Date();

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
    monthDays.innerHTML = days;
  }
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



/* for changing view //////////////////////// NOT FULLY FUNCTIONING


var checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener('change', function() {
  //let monthView = document.getElementById("calendar");
  let dayView = document.getElementById("day-view");
  if (this.checked) {
    console.log("Checkbox is checked..");
    //monthView.style.display = "none";
    dayView.style.display = "block";
  } else {
    console.log("Checkbox is not checked..");
    //monthView.style.display = "block";
    dayView.style.display = "none";
  }
});

checkbox.addEventListener('change', function() {
  let monthView = document.getElementById("calendar");
  if (monthView.style.display === "block") {
    console.log("Checkbox is checked..");
    monthView.style.display = "none";
  } else {
    console.log("Checkbox is not checked..");
    monthView.style.display = "block";
  }
});

*/

var monthBtn = document.querySelector("monthBtn");
var dayBtn = document.querySelector("dayBtn");
/*
monthBtn.addEventListener('click', function() {
  let monthView = document.getElementById("calendar");

  if (monthView.style.display === "block") {
    monthView.style.display = "none";
  } else {
    monthView.style.display = "block";
  }
})
*/
// dayBtn.addEventListener('click', function() {
//   let dayView = document.getElementById("day-view");
// })

// ////////////////////////////////////////////


/* For adding new event and controlling event form */
  const newEventForm = document.querySelector("#newEvent");
  const openForm = document.querySelector(".open-form-button");
  const closeForm = document.querySelector(".close-form-button");
  const exitBtn = document.querySelector("#exit-btn");

  openForm.addEventListener("click", () => {
    newEventForm.showModal();
  })

  closeForm.addEventListener("click", () => {
    newEventForm.close();
  })

