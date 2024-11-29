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

// ======================================================
// This page shows all of the orders placed by customers.
// ======================================================

export default function Cart() {
	const router = useRouter();

	// database connectivity
	const[data, setData] = useState(null);
	const[weather, setWeatherData] = useState(null);

	// connecting to products page
	useEffect(() => {
			fetch('/api/getOrders').then((res) => res.json()).then((data) => {setData(data)})
		},
	[])

	// weather api
	useEffect(() => {
			fetch('/api/getWeather').then((res) => res.json()).then((weather) => {setWeatherData(weather)})
		},
	[])

	// show a loading page while accessing data
	if (!data) return <p>Loading</p>

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
							<Box>
							<div style={{padding:'20px'}} key={i}>
								Order ID: {item.orderDetails[i]._id}
								<br></br>
								{
									item.orderDetails.forEach((item, index) =>
										<div style={{padding:'20px'}} key={index}>
											Product ID: {item.orderDetails[index]._id}
											<br></br>
											Name: {item.orderDetails[index].pname}
											<br></br>
											User: {item.orderDetails[index].username}
										</div>
									)
								}
								<br></br>
							</div>
							</Box>
						))
					}
				</div>
				</Box>
		</Box>
	);
}