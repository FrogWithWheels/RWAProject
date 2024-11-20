export async function GET(req, res) {
	console.log("Cart API accessed");
	const {searchParams} = new URL(req.url);
	const pname = searchParams.get('pname');

	console.log(pname);

	const {MongoClient} = require('mongodb');

	const url = 'mongodb+srv://admin:PorygonBeepBoop42@cluster0.patyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
	const client = new MongoClient(url);

	const dbName = 'app';

	await client.connect();

	console.log("Connection successful");
	const db = client.db(dbName);
	const collection = db.collection('shopping_cart');

	var myobj = {pname: pname, username: "sample@test.com"};
	const insertResult = await collection.insertOne(myobj);

	return Response.json({"data":"" + "inserted" + ""});
}