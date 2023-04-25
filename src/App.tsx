import { useEffect, useState } from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

	return (
		<Router>
			<Routes>
				{/* <Route
					path="/"
					Component={function Index() {
						const nextPage = useAuthToken((x) => x.isLoggedIn)
							? "/todo"
							: "/login";
						return <Navigate to={nextPage} replace />;
					}}
				/> */}

				<Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/todo" Component={Todo} />
			</Routes>
			{/* Add other routes here */}
		</Router>
	);
}

export default App;
