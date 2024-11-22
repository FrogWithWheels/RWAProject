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

// ======================================================
// This is where my main page and subpages are being ran.
// ======================================================

export default function MyApp() {
	// subpages and setting first page to default
	const [showLogin, setShowLogin] = useState(false);
	const [showDash, setShowDash] = useState(false);
	const [showFirstPage, setShowFirstPage] = useState(true);

	// database connectivity
	const[data, setData] = useState(null);

	// connecting to products page
	useEffect(() => {
			fetch('/api/getProducts').then((res) => res.json()).then((data) => {setData(data)})
		},
	[])

	// show a loading page while accessing data
	if (!data) return <p>Loading</p>

	// sends chosen product to shopping cart
	function putInCart(pname) {
		console.log("Item placed in cart");
		fetch("/api/putInCart?pname=" + pname);
	}

	// function for login page
	function runShowLogin() {
		setShowLogin(true);
		setShowDash(false);
		setShowFirstPage(false);
	}

	// function for dashboard page
	function runShowDash() {
		setShowLogin(false);
		setShowDash(true);
		setShowFirstPage(false);
	}

	// function for default page
	function runShowFirstPage() {
		setShowLogin(false);
		setShowDash(false);
		setShowFirstPage(true);
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
						MyApp
					</Typography>
					<Button color="inherit" onClick={runShowFirstPage}>First</Button>
					<Button color="inherit" onClick={runShowLogin}>Login</Button>
					<Button color="inherit" onClick={runShowDash}>Dash</Button>
				</Toolbar>
			</AppBar>
			{showFirstPage && 
				<Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
				This is a very basic application. This has a bar cross the top and this box!
				How this app works is by creating two boxes. They are hidden in the background of this page.
				It is only when a user clicks one of the buttons that we change the "state" from hidden (false) to show (true)
				</Box>
			}
			{showLogin && 
				<Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
				This box is hidden until you click the button! Imagine this is one page in your app!
				</Box>
			}
			{showDash && 
				<Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
				Let's pretend this is the dashboard!
				<div>
					{
						// shows products and add to cart button
						data.map((item, i) => (
							<div style={{padding:'20px'}} key={i}>
								Unique ID: {item._id}
								<br></br>
								{item.pname}
								-
								{item.price}
								<br></br>
								<Button onClick={() => putInCart(item.pname)} variant="outlined">Add to cart</Button>
							</div>
						))
					}
				</div>
				</Box>
			}
		</Box>
	);
}