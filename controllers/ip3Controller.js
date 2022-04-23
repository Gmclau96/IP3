const userDao = require("../models/userModel.js");
const notesDao = require("../models/notesModel.js");
const recipesDao = require("../models/recipesModel.js");
const listsDao = require("../models/listsModel.js");
const calendarDao = require("../models/calendarModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

//sets maxAge for jwt and cookies to 1 day
const timeLimit = 24 * 60 * 60;

//create jwt Token
const makeToken = function (_id) {
  return jwt.sign({ _id }, process.env.Secret, { expiresIn: timeLimit });
};

//shows the any errors
function showErrors(error, res) {
  if (error.code == "11000") {
    res.send(
      "The email address entered is already tied to another account, please enter another email address."
    );
  } else {
    res.send(error.message);
  }
}

exports.get_login = function (req, res) {
  res.render("index");
};

//handle login & go to landing
exports.post_landing = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await userDao.login(email, password);
    const token = makeToken(user._id);
    //sets cookie to store jwt with length of 1 day
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * timeLimit });
    res.redirect("/");
  } catch (error) {
    showErrors(error, res);
    console.log("Error logging in!");
  }
};

//Gets landing page with added elements
exports.get_landing = async function (req, res, next) {
  const _email = res.locals.user.email;
  const dateString = Date.now();
  const date = new Date(dateString);
  const iso = date.toISOString();
  //gets 5 closest calender entires from todays date
  const events = await calendarDao
    .find({ date: { $gt: iso } })
    .where({ _email: _email })
    .sort({ date: 1 })
    .limit(5);
  const notes = await notesDao
    .where({ _email: _email })
    .sort({ _id: -1 })
    .limit(1);
  const lists = await listsDao
    .where({ _email: _email })
    .sort({ _id: -1 })
    .limit(1);
  res.render("landing", { notes, lists, events });
};

exports.get_signup = function (req, res) {
  res.render("signup");
};

//post sign up
exports.post_signup = async function (req, res) {
  const forename = req.body.fname;
  const surname = req.body.sname;
  const email = req.body.email;
  const password = req.body.password;
  //uses jwt and stores to cookie
  try {
    const user = await userDao.create({ forename, surname, email, password });
    const token = makeToken(user._id);
    //sets cookie to store jwt with length of 1 day
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * timeLimit });
    res.render("index");
  } catch (error) {
    showErrors(error, res);
    console.log("Error in creating user!");
  }
};

exports.get_password = function (req, res) {
  res.render("password");
};

exports.get_account = async function (req, res) {
  const _email = res.locals.user.email;
  let account = await userDao.where({ email: _email }).select("");
  res.render("account", { account });
};

exports.updateAccount = async function (req, res) {
  const id = req.params.id;
  let account = await userDao.findById(id).select("");
  res.render("updateAccount", { account });
};

//updates account to db
exports.updateAccountDetails = async function (req, res) {
  const id = req.params.id;
  const forename = req.body.fname;
  const surname = req.body.sname;
  const email = req.body.email;
  const currentEmail = res.locals.user.email;
  let newpassword = req.body.password;
  let saveChanges = req.body.save;
  const currentpassword = res.locals.user.password;
  console.log(newpassword + " " + currentpassword);
  saveChanges = await bcrypt.compare(saveChanges, currentpassword);
  if (saveChanges) {
    if (newpassword !== currentpassword) {
      try {
        newpassword = await bcrypt.hash(newpassword, 10);
        await userDao.findByIdAndUpdate(
          id,
          {
            forename: forename,
            surname: surname,
            email: email,
            password: newpassword,
          },
          { new: true, runValidators: true }
        );
        await calendarDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        await notesDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        await listsDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        await recipesDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        res.redirect("/account");
      } catch (error) {
        showErrors(error, res);
        console.log("Error in updating!");
      }
    } else {
      try {
        await userDao.findByIdAndUpdate(
          id,
          {
            forename: forename,
            surname: surname,
            email: email,
          },
          { new: true, runValidators: true }
        );
        await calendarDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        await notesDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        await listsDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        await recipesDao.findOneAndUpdate(
          { _email: currentEmail },
          {
            _email: email,
          },
          { new: true }
        );
        res.redirect("/account");
      } catch (error) {
        showErrors(error, res);
        console.log("Error in updating!");
      }
    }
  } else {
    res.send("Wrong current password entered, try again!");
  }
};

exports.deleteAccount = async function (req, res) {
  const id = req.params.id;
  const _email = res.locals.user.email;
  let deleteAccount = req.body.save;
  const currentpassword = res.locals.user.password;
  deleteAccount = await bcrypt.compare(deleteAccount, currentpassword);
  if (deleteAccount) {
    await userDao.deleteOne({ _id: id });
    await calendarDao.deleteMany({ _email: _email });
    await notesDao.deleteMany({ _email: _email });
    await listsDao.deleteMany({ _email: _email });
    await recipesDao.deleteMany({ _email: _email });
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } else {
    res.send("Wrong current password entered, try again!");
  }
};

exports.get_admin = async function (req, res) {
  const admin = res.locals.user.admin;
  let account = await userDao.find().select("email");
  if (admin == true) {
    res.render("admin", { account });
  } else {
    res.redirect("/");
  }
};

exports.adminDisplayUser = async function (req, res) {
  const id = req.params.id;
  let account = await userDao.findById(id).select("");
  res.render("updateAdmin", { account });
};

exports.adminUpdate = async function (req, res) {
  const id = req.params.id;
  let currentEmail = await userDao.findById(id).select("email -_id");
  const forename = req.body.fname;
  const surname = req.body.sname;
  const email = req.body.email;
  let newpassword = req.body.password;
  try {
    newpassword = await bcrypt.hash(newpassword, 10);
    await userDao.findByIdAndUpdate(
      id,
      {
        forename: forename,
        surname: surname,
        email: email,
        password: newpassword,
      },
      { new: true, runValidators: true }
    );
    await calendarDao.findOneAndUpdate(
      { _email: currentEmail },
      {
        _email: email,
      },
      { new: true }
    );
    await notesDao.findOneAndUpdate(
      { _email: currentEmail },
      {
        _email: email,
      },
      { new: true }
    );
    await listsDao.findOneAndUpdate(
      { _email: currentEmail },
      {
        _email: email,
      },
      { new: true }
    );
    await recipesDao.findOneAndUpdate(
      { _email: currentEmail },
      {
        _email: email,
      },
      { new: true }
    );
    res.redirect("/admin");
  } catch (error) {
    showErrors(error, res);
    console.log("Error in updating!");
  }
};

exports.adminDelete = async function (req, res) {
  const id = req.params.id;
  const _email = req.body.email;
  await calendarDao.deleteMany({ _email: _email });
  await userDao.deleteOne({ _id: id });
  await notesDao.deleteMany({ _email: _email });
  await listsDao.deleteMany({ _email: _email });
  await recipesDao.deleteMany({ _email: _email });
  res.redirect("/admin");
};

exports.get_lists = async function (req, res) {
  const _email = res.locals.user.email;
  let lists = await listsDao.where({ _email: _email });
  res.render("lists", { lists });
};

exports.post_lists = async function (req, res) {
  const title = req.body.listTitle;
  const item1 = req.body.listItem1;
  const item2 = req.body.listItem2;
  const item3 = req.body.listItem3;
  const item4 = req.body.listItem4;
  const item5 = req.body.listItem5;
  const item6 = req.body.listItem6;
  const item7 = req.body.listItem7;
  const item8 = req.body.listItem8;
  const item9 = req.body.listItem9;
  const item10 = req.body.listItem10;
  const _email = res.locals.user.email;
  try {
    const list = await listsDao.create({
      title,
      item1,
      item2,
      item3,
      item4,
      item5,
      item5,
      item6,
      item7,
      item8,
      item9,
      item10,
      _email,
    });
    console.log(list);
    let lists = await listsDao.where({ _email: _email });
    res.redirect("/lists");
  } catch (error) {
    showErrors(error, res);
    console.log("Error in creating list!");
  }
};

//shows update lists page
exports.updateList = async function (req, res) {
  const id = req.params.id;
  let lists = await listsDao.findById(id).select("");
  res.render("updateList", { lists });
};

//updates lists to db
exports.updateLists = async function (req, res) {
  const id = req.params.id;
  const title = req.body.listTitle;
  const item1 = req.body.item1;
  const box1 = req.body.box1;
  const item2 = req.body.item2;
  const box2 = req.body.box2;
  const item3 = req.body.item3;
  const box3 = req.body.box3;
  const item4 = req.body.item4;
  const box4 = req.body.box4;
  const item5 = req.body.item5;
  const box5 = req.body.box5;
  const item6 = req.body.item6;
  const box6 = req.body.box6;
  const item7 = req.body.item7;
  const box7 = req.body.box7;
  const item8 = req.body.item8;
  const box8 = req.body.box8;
  const item9 = req.body.item9;
  const box9 = req.body.box9;
  const item10 = req.body.item10;
  const box10 = req.body.box10;
  let lists = await listsDao.findByIdAndUpdate(
    id,
    {
      title: title,
      item1: item1,
      box1: box1 ? true : false,
      item2: item2,
      box2: box2 ? true : false,
      item3: item3,
      box3: box3 ? true : false,
      item4: item4,
      box4: box4 ? true : false,
      item5: item5,
      box5: box5 ? true : false,
      item6: item6,
      box6: box6 ? true : false,
      item7: item7,
      box7: box7 ? true : false,
      item8: item8,
      box8: box8 ? true : false,
      item9: item9,
      box9: box9 ? true : false,
      item10: item10,
      box10: box10 ? true : false,
    },
    { new: true }
  );
  res.redirect("/lists");
};

//deletes note from db
exports.deleteLists = async function (req, res) {
  const id = req.params.id;
  await listsDao.deleteOne({ _id: id });
  res.redirect("/lists");
};

exports.get_calendar = async function (req, res) {
  const _email = res.locals.user.email;
  //variables for converting todays date to an ISO time
  const dateString = Date.now();
  const date = new Date(dateString);
  const iso = date.toISOString();
  const events = await calendarDao
    .find({ date: { $gt: iso } })
    .where({ _email: _email })
    .sort({ date: 1 });
  res.render("calendar", { events });
};

exports.post_calendar = async function (req, res) {
  const id = res.locals.user.id;
  const eventName = req.body.eventName;
  const datetime = req.body.datetime;
  const eventType = req.body.eventType;
  const note = req.body.EvtNote;
  const _email = res.locals.user.email;
  try {
    const event = await calendarDao.create({
      eventName,
      date: datetime,
      note,
      eventType,
      _email,
    });
    console.log(event);
    res.redirect("calendar");
  } catch (error) {
    showErrors(error, res);
    console.log("Error in creating calendar entry!");
  }
};

//shows update event page
exports.updateEvent = async function (req, res) {
  const id = req.params.id;
  let event = await calendarDao.findById(id).select("");
  res.render("updateEvent", { event });
};

//updates events to db
exports.updateEvents = async function (req, res) {
  const id = req.params.id;
  const eventName = req.body.eventTitle;
  const date = req.body.datetime;
  const notes = req.body.eventNote;
  const eventType = req.body.eventType;
  let events = await calendarDao.findByIdAndUpdate(
    id,
    {
      eventName: eventName,
      date: date,
      note: notes,
      eventType: eventType,
    },
    { new: true }
  );
  res.redirect("/calendar");
};

//deletes events from db
exports.deleteEvents = async function (req, res) {
  const id = req.params.id;
  await calendarDao.deleteOne({ _id: id });
  res.redirect("/calendar");
};

exports.get_notes = async function (req, res) {
  const _email = res.locals.user.email;
  let notes = await notesDao.where({ _email: _email });
  res.render("notes", { notes });
};

exports.post_notes = async function (req, res) {
  const title = req.body.noteTitle;
  const content = req.body.noteContent;
  const _email = res.locals.user.email;
  try {
    const note = await notesDao.create({ title, content, _email });
    console.log(note);
    let notes = await notesDao.where({ _email: _email });
    res.render("notes", { notes });
  } catch (error) {
    showErrors(error, res);
    console.log("Error in creating note!");
  }
};

//shows update notes page
exports.updateNote = async function (req, res) {
  const id = req.params.id;
  let notes = await notesDao.findById(id).select("title content");
  res.render("updateNote", { notes });
};

//updates notes to db
exports.updateNotes = async function (req, res) {
  const id = req.params.id;
  const title = req.body.noteTitle;
  const content = req.body.noteContent;
  let notes = await notesDao.findByIdAndUpdate(
    id,
    {
      title: title,
      content: content,
    },
    { new: true }
  );
  res.redirect("/notes");
};

//deletes note from db
exports.deleteNotes = async function (req, res) {
  const id = req.params.id;
  await notesDao.deleteOne({ _id: id });
  res.redirect("/notes");
};

exports.get_recipes = async function (req, res) {
  const _email = res.locals.user.email;
  let recipes = await recipesDao.where({ _email: _email }).select("");
  res.render("recipes", { recipes });
};

exports.post_recipes = async function (req, res) {
  const title = req.body.recipeTitle;
  const ingredients = req.body.recipeIngredients;
  const method = req.body.recipeMethod;
  const _email = res.locals.user.email;
  try {
    const recipe = await recipesDao.create({
      title,
      ingredients,
      method,
      _email,
    });
    console.log(recipe);
    res.redirect("recipes");
  } catch (error) {
    showErrors(error, res);
    console.log("Error in creating recipe!");
  }
};

//shows update recipes page
exports.updateRecipe = async function (req, res) {
  const id = req.params.id;
  let recipes = await recipesDao.findById(id).select("");
  res.render("updateRecipe", { recipes });
};

//updates recipes to db
exports.updateRecipes = async function (req, res) {
  const id = req.params.id;
  const title = req.body.recipeTitle;
  const ingredients = req.body.recipeIngredients;
  const method = req.body.recipeMethod;
  let recipes = await recipesDao.findByIdAndUpdate(
    id,
    {
      title: title,
      ingredients: ingredients,
      method: method,
    },
    { new: true }
  );
  res.redirect("/recipes");
};

//deletes recipe from db
exports.deleteRecipes = async function (req, res) {
  const id = req.params.id;
  await recipesDao.deleteOne({ _id: id });
  res.redirect("/recipes");
};

//sets jwt cookie to blank with a time of 1ms
exports.get_logout = function (req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
