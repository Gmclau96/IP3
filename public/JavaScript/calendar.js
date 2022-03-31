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

/* For adding new event and controlling event form */
  const newEventForm = document.querySelector(".newEvent");
  const openForm = document.querySelector("#open-form-button");
  const closeForm = document.querySelector("#close-form-button");
  const exitBtn = document.querySelector("#exit-btn");

  openForm.addEventListener("click", () => {
    newEventForm.showModal();
  })

  closeForm.addEventListener("click", () => {
    newEventForm.close();
  })

  exitBtn.addEventListener("click", () => {
        newEventForm.close();
  })


  var editBtn = document.getElementById("delete-event-button");
  var removeBtns = document.getElementsByClassName(".remove-event-buttons");
  var editComplete = document.getElementsByClassName(".edit-complete");
  
  editBtn.addEventListener("click", () => {
    if(removeBtns.style.display == "none"){
      removeBtns.style.display = "block";
      editComplete.style.display = "block";
    }
  })
  editComplete.addEventListener("click", () => {
    if(removeBtns.style.display == "block"){
      removeBtns.style.display = "none";
      editComplete.style.display = "none";
    }
  })

 
// function showRemoveBtns() {
//   let removeBtns = document.getElementsByClassName(".remove-event-buttons");
//   let editComplete = document.getElementsByClassName(".edit-complete");
//   if(removeBtns.style.display === "none"){
//     removeBtns.style.display = "block";
//     editComplete.style.display = "block";
//   }
// }

function completeEditing() {
  let removeBtns = document.getElementsByClassName(".remove-event-buttons");
  let editComplete = document.getElementsByClassName(".edit-complete");
  if(removeBtns.style.display === "block"){
    removeBtns.style.display = "none";
    editComplete.style.display = "none";
  }
}

//shows remove buttons in tables
function showRemoveButton() {
  let x = document.getElementsByClassName('removeEvent');
console.log(x);
  [].forEach.call(x, function showDelete(x) {
    x.hidden = false;
  });
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//Removes timezone from appeaing on calendar entries
let dates = document.getElementsByClassName('date');
for (let i=0; i < dates.length; i++) { 
  dates[i].innerHTML = dates[i].innerHTML.slice(0, -35);
}