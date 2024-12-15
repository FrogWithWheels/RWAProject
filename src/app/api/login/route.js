// ===================================================================
// This function handles the customer or manager being able to log in.
// ===================================================================

export async function GET(req, res) {
  // send a message in console that api was accessed
  console.log("Login API accessed");

  // storing variables
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const pass = searchParams.get('pass')

  // showing the email and password in console
  console.log(username);
  console.log(pass);

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
  const findResult = await collection.find({"username": username}).toArray();

  // confirming entry found
  console.log('Found documents =>', findResult);

  let valid = false;

  const bcrypt = require('bcrypt');
  let hashResult = bcrypt.compareSync(pass, findResult[0].pass);

  console.log("Checking " + findResult[0].pass);
  console.log("Hash Comparison Result " + hashResult);

  // if result found
  if(findResult.length >0 ) {
    // valid login is true
    valid = true;

    // print to console
    console.log("Login valid");
  }
  else {
    // valid login is false
    valid = false;

    // print to console
    console.log("Login invalid");
  }

  // returning the login entry
  return Response.json({ "data":"" + valid + ""})
}