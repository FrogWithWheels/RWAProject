export async function GET(req, res) {
	console.log("API Page Reached");

	const { MongoClient } = require('mongodb');

	const url = 'mongodb+srv://admin:PorygonBeepBoop42@cluster0.patyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

	const client = new MongoClient(url);

	const dbName = 'app';

	await client.connect();

	console.log("Connected to server");

	const db = client.db(dbName);

	const collection = db.collection('products');

	const findResult = await collection.find({}).toArray();

	console.log("Found documents: ", findResult);

	return Response.json(findResult);
}