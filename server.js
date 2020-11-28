// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
// import countries from './public/lab_6/countries.js'
import fetch from 'node-fetch'; //lab7
import { open } from "sqlite";//lab8
import sqlite3 from "sqlite3";//lab8

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
.get(async (req, res) => {
  console.log('GET request detected');
  // res.send(`Lab 5 for ${process.env.NAME}`);
  /*const data = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"); //lab7
  const dataj = await data.json();*/
  // console.log("fetch request data", dataj);//lab7
})
.post(async (req, res) => { //make async for lab7
  console.log('POST request detected');
  console.log('Form data in req.body', req.body);
  const data = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"); //lab7
  const dataj = await data.json(); //lab7
  res.json(dataj); //lab7
  // res.send("Hello World");//lab_4
  // res.json(countries); //lab6
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

//lab8
const DB_settings = {
  filename: "./public/lab_8/tmp/database.db",
  driver: sqlite3.Database,
};

function initSchema() {
  let schema = "CREATE TABLE IF NOT EXISTS food ";
  schema += "(name TEXT, ";
  schema += "category TEXT, ";
  schema += "inspection_date DATE, ";
  schema += "inspection_results TEXT, ";
  schema += "city TEXT, ";
  schema += "state TEXT, ";
  schema += "zip INTEGER, ";
  schema += "owner TEXT, ";
  schema += "type TEXT);";
  console.log(schema);
  return schema;
}

async function databaseInitialize(dbSettings) {
  try {
    const DB = await open(dbSettings);
    const dropit = "DROP TABLE IF EXISTS food";
    await DB.exec(dropit);
    console.log("Drop table");

    await DB.exec(initSchema());
    console.log("Schema created");

    const data = await foodDataFetcher();
    console.log("foodDataFetcher complete");

    data.forEach((entry) => { dataInput(entry, DB) });

    const test = await DB.get("SELECT * FROM food")
    console.log(test);
  }
  catch(e) {
    console.log("Error loading Database");
    console.log(e);
  }
}

async function databaseClose(datab) {
  datab.close((errr) => {
    if (errr) {
      return console.log("Close failure");
    }
    console.log("Successful DB close");
  });
}

async function foodDataFetcher() {
  const info = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
  return info.json();
}

async function dataInput(item, database) {
  try {
    let restaurant_name = item.name;
    let category = item.category;

    await database.exec(`INSERT INTO food (name, category) VALUES ("${restaurant_name}", "${category}")`);
    console.log(`${restaurant_name} and ${category} inserted`);
  }
  catch(e) {
    console.log('Error on insertion');
    console.log(e);
  }
}

async function databaseRetriever(dbase) {
  const qcontent = await dbase.all("SELECT category, COUNT(restaurant_name) FROM restaurants GROUP BY category;")
  console.log("databaseRetriever complete");
  return qcontent;
}

app.route("/sql")
.get((req, res) => {
  console.log('/sql GET request detected');
})
.post(async (req, res) => {
  console.log('/sql POST request detected');
  console.log('/sql Form data in req.body', req.body);
  const ddbb = databaseInitialize(DB_settings);
  const output = databaseRetriever(ddbb);
  res.json(output);
  databaseClose(ddbb);
});
