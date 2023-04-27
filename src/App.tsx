import {
	useNavigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useRefreshToken from "./hooks/useRefreshToken";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					Component={function Index() {
						const refresh = useRefreshToken();
						const navigate = useNavigate();

						refresh()
							.then((token) => {
								navigate("/todo");
							})
							.catch((error) => {
								navigate("/login");
							});

						return <div>Loading...</div>;
					}}
				/>

				<Route path="/login" Component={Login} />
				<Route path="/signup" Component={Signup} />
				<Route path="/todo" Component={Todo} />
			</Routes>
			{/* Add other routes here */}
		</Router>
	);
}

export default App;
