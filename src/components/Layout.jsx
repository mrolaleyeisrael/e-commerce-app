import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const theme = createTheme({
	palette: {
		mode: "light",
	},
});

function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline></CssBaseline>
			<Header />
			<main>
				<Outlet />
			</main>
			<footer></footer>
		</ThemeProvider>
	);
}

export default Layout;



	
