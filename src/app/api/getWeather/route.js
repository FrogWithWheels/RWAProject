export async function GET(req, res) {
	console.log("Weather API accessed.");

	revalidatePath("http://api.weatherapi.com/v1/current.json?key=7aa17f02465349f7ac4160217242611&q=Dublin&aqi=no");
	const weather = await fetch('http://api.weatherapi.com/v1/current.json?key=7aa17f02465349f7ac4160217242611&q=Dublin&aqi=no');
	const data = await weather.json();

	console.log(data.current.temp_c);

	let currentTemp = data.current.temp_c;

	return Response.json({"temp:": currentTemp});
}