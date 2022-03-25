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



/* for changing view *///////////////////////// NOT FULLY FUNCTIONING


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
  if (monthView.styledisplay === "block") {
    console.log("Checkbox is checked..");
    monthView.style.display = "none";
  } else {
    console.log("Checkbox is not checked..");
    monthView.style.display = "block";
  }
});

////////////////////////////////////////////

/*
document.querySelector("#view-button").addEventListener("onclick", () => {
  var check = document.getElementById("view-choice");
  console.log(check);
});

function changeView(){
  console.log();
  var check = document.getElementById("view-choice");
  var monthView = document.getElementById("calendar");
  var dayView = document.getElementById("day-view");
  if (check.checked == true) {
    monthView.style.display = "none";
    dayView.style.display = "block";
  } 
  else {
    monthView.style.display = "flex";
    dayView.style.display = "none";
  }
}*/


  /*
  let db = new sqlite3.Database('./database/organiser.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else
    console.log('Connected to the organiser database.');
  });

db.run('CREATE TABLE IF NOT EXISTS calEvents(id TEXT, name TEXT, date DATETIME, notes TEXT)');
//Display interface
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
  });

  
// Insert
app.post('/add', function(req,res){
    db.serialize(()=>{
      db.run('INSERT INTO calEvents(id,name,date,notes) VALUES(?,?,?,?)', [req.body.id, req.body.name, req.body.date, req.body.notes], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New event has been added");
        res.sendFile(path.join(__dirname,'./public/index.html'));
      });
  });
  }); 
  
  // View
  app.post('/view', function(req,res){
    db.serialize(()=>{
      db.each('SELECT id ID, name NAME, date DATE, notes NOTES FROM calEvent WHERE id =?', [req.body.id], function(err,row){     
        if(err){
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        res.send(` ID: ${row.ID},    Name: ${row.NAME},     Date: ${row.DATE},      Notes: ${row.NOTES}`);
        console.log("Entry displayed successfully");
      });
    });
  });

//Update
app.post('/update', function(req,res){
    db.serialize(()=>{
      db.run('UPDATE calEvent SET name = ?, notes =? WHERE id = ?', [req.body.name,req.body.id], function(err){
        if(err){
          res.send("Error encountered while updating");
          return console.error(err.message);
        }
        res.send("Entry updated successfully");
        console.log("Entry updated successfully");
      });
    });
  });

//Delete
app.post('/delete', function(req,res){
    db.serialize(()=>{
      db.run('DELETE FROM calEvent WHERE id = ?', req.body.id, function(err) {
        if (err) {
          res.send("Error encountered while deleting");
          return console.error(err.message);
        }
        res.send("Entry deleted");
        console.log("Entry deleted");
      });
    });
  });
  
  //Close
  app.get('/close', function(req,res){
    db.close((err) => {
      if (err) {
        res.send('There is some error in closing the database');
        return console.error(err.message);
      }
      console.log('Closing the database connection.');
      res.send('Database connection successfully closed');
    });
  });*/


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

  exitBtn.addEventListener("click", () => {
    newEventForm.close();
  })