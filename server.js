// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
// import countries from './public/lab_6/countries.js'
import fetch from 'node-fetch'; //lab7

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
    const dataj = await data.json();
    console.log("fetch request data", dataj);*/
  })
  .post(async (req, res) => { //make async for lab7
    const data = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"); //lab7
    const dataj = await data.json();
    console.log('POST request detected');
    // console.log('Form data in req.body', req.body);
    // res.send("Hello World");//lab_4
    // res.json(countries); //lab6
    console.log("fetch request data", dataj);//lab7
    res.json(dataj); //lab7
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
