// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
// import countries from './public/lab_6/countries.js'
import fetch from 'node-fetch'; //lab7
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
  .get((req, res) => {
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

const DB_path = DB_settings.filename;

function databaseInitialize() {
  const DB = new sqlite3.Database(DB_path, function(err) {//open database
    if (err) {
      return console.log(err);
    }
    console.log("Connected to " + DB_path + " database.");
  });

  const schema = "CREATE TABLE IF NOT EXISTS food";
  schema.concat("(name text,");
  schema.concat("category text,");
  schema.concat("inspection_date date,");
  schema.concat("inspection_results text,");
  schema.concat("city text,");
  schema.concat("state text,");
  schema.concat("zip integer,");
  schema.concat("owner text,");
  schema.concat("type text);");
  console.log("schema created");
  return DB;
}

function databaseClose(datab) {
  const schema = "DROP TABLE IF EXISTS food";
  console.log("Drop table");
  datab.close((errr) => {
    if (errr) {
      return console.log("Close failure");
    }
    console.log("Successful DB close");
  });
}

async function foodDataFetcher(database) {
  await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
  .then((fromFetch) => fromFetch.json())
  .then((fromFetch) => dataInput(JSON.stringify(fromFetch), database))
  .catch((err) => {
    console.log(err);
  });
  console.log("foodDataFetcher complete");
}

function dataInput(jsonQ, db) {//fix how data is put into sql
  db.serialize(() => {
    db.exec("INSERT INTO food VALUES" + jsonQ);
  });
  console.log("dataInput complete");
}

function databaseRetriever(dbase) {
  const q_name = "SELECT COUNT(name) FROM food";
  const q_cat = "SELECT COUNT(category) FROM food";
  dbase.serialize(() => {
    dbase.exec(q_name);
    console.log("q_name");
    dbase.exec(q_cat);
    console.log("q_cat");
  });
  console.log("databaseRetriever complete");
}

const ddbb = databaseInitialize();
console.log("database created");
foodDataFetcher(ddbb);
console.log("enter foodDataFetcher");

app.route("/sql")
  .get((req, res) => {
    console.log('/sql GET request detected');
  })
  .post(async (req, res) => {
    console.log('/sql POST request detected');
    console.log('/sql Form data in req.body', req.body);
    await databaseRetriever(ddbb);
    // databaseClose(ddbb);
  });
