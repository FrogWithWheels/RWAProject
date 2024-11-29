// ===================================================
// This function saves the shopping cart to the order.
// ===================================================

export async function GET(req, res) {
	// printing a message that page was accessed
	console.log("Cart API accessed");

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
	const collection1 = db.collection('orders');
	const collection2 = db.collection('shopping_cart');

	const findResult = await collection2.find({}).toArray();

	// adding the product to shopping cart and linking to user
	var myobj = {orderDetails: findResult};
	const insertResult = await collection1.insertOne(myobj);
	const removeResult = await collection2.clear();

	// returning the data
	return Response.json({"data":"" + "inserted" + ""});
}