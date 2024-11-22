// ===============================================================
// This function gets the full list of products from the database.
// ===============================================================

export async function GET(req, res) {
	// sending a message to the console
	console.log("API Page Reached");

	// mongo client connection and url storage
	const { MongoClient } = require('mongodb');
	const url = process.env.DB_ADDRESS;
	const client = new MongoClient(url);
	const dbName = 'app';

	// connecting to the database
	await client.connect();

	// logging the connection
	console.log("Connected to server");

	// connecting to the products collection
	const db = client.db(dbName);
	const collection = db.collection('products');

	// storing the list of products
	const findResult = await collection.find({}).toArray();

	// printing the products found to the console
	console.log("Found documents: ", findResult);

	// returning the products in json format
	return Response.json(findResult);
}