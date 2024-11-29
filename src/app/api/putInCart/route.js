// =======================================================================
// This function places chosen products into the shopping cart collection.
// =======================================================================

export async function GET(req, res) {
	// printing a message that page was accessed
	console.log("Cart API accessed");

	// getting the sent product
	const {searchParams} = new URL(req.url);
	const pname = searchParams.get('pname');

	// printing the product to console
	console.log(pname);

	// connecting to the database
	const {MongoClient} = require('mongodb');
	const url = process.env.DB_ADDRESS;
	const client = new MongoClient(url);
	const dbName = 'app';

	// awaiting connection
	await client.connect();

	// printing successful connection
	console.log("Connection successful");

	// connecting to collection
	const db = client.db(dbName);
	const collection = db.collection('shopping_cart');

	// adding the product to shopping cart and linking to user
	var myobj = {pname: pname, price: price, username: "sample@test.com"};
	const insertResult = await collection.insertOne(myobj);

	// returning the data
	return Response.json({"data":"" + "inserted" + ""});
}