'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

// =================================================
// This page shows the shopping cart and it's items.
// =================================================

export default function Cart() {
	// router for sending user back to another page
	const router = useRouter();

	// database connectivity
	const[data, setData] = useState(null);
	const[weather, setWeatherData] = useState(null);

	// connecting to products page
	useEffect(() => {
			fetch('/api/getCart').then((res) => res.json()).then((data) => {setData(data)})
		},
	[])

	// weather api
	useEffect(() => {
			fetch('/api/getWeather').then((res) => res.json()).then((weather) => {setWeatherData(weather)})
		},
	[])

	// show a loading page while accessing data
	if (!data) return <p>Loading</p>

	// sends chosen product to shopping cart
	function removeFromCart(pname) {
		console.log("Item removed from cart");
		fetch("/api/removeFromCart?pname=" + pname);
	}

	// sends chosen product to shopping cart
	function orderCart(pname) {
		console.log("Checking out items");
		fetch("/api/checkout");
	}

	// return statement for returning each page
	return (
		// navigation bar at top of screen
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Krispy Kreme
					</Typography>
					    <Button color="inherit" onClick={() => router.push('/customer')}>Dashboard</Button>
				</Toolbar>
			</AppBar>
				<Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
				<div>
					{
						// shows products and add to cart button
						data.map((item, i) => (
							<div style={{padding:'20px'}} key={i}>
								Unique ID: {item._id}
								<br></br>
								{item.pname}
								<br></br>
								<Button onClick={() => {removeFromCart(item.pname); window.location.reload();}} variant="outlined">Remove from cart</Button>
							</div>
						))
					}
				</div>
				</Box>
				<Box>
				<div>
					{/* when the user checks out, send them back to the dashboard */}
					<Button onClick={() => {orderCart(); router.push('/checkout')}} variant="outlined">Checkout</Button>
				</div>
				</Box>
		</Box>
	);
}