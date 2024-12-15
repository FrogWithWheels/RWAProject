import getCustomSession from "../sessionCode.js";

// ===================================================================
// This function handles the customer or manager being able to log in.
// ===================================================================

export async function GET(req, res) {
  // send a message in console that api was accessed
  console.log("Login API accessed");

  // storing variables
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const pass = searchParams.get('pass');

  // showing the email and password in console
  console.log(username);
  console.log(pass);

  const bcrypt = require('bycrypt');
  const saltRounds = 10;

  const hash = bcrypt.hashSync(pass, saltRounds);

  // database connection variables
  const { MongoClient } = require('mongodb');
  const url = process.env.DB_ADDRESS;
  const client = new MongoClient(url);
  const dbName = 'app'; // database name

  // connecting to the app
  await client.connect();

  // logging the successful connection
  console.log('Connected successfully to server');

  // connecting to the collection
  const db = client.db(dbName);
  const collection = db.collection('login');
  const insertResult = collection.insertOne({"username": username, "pass": hash});

  // confirming entry found
  console.log('Found documents =>', findResult);

  let session = await getCustomSession();
  session.username = username;
  session.pass = pass;
  await session.save();

  // returning the login entry
  return Response.json({ "data":"" + valid + ""})
}