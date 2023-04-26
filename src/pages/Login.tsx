import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
// import axios from "axios";
import axios from "../api/axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		
		fetch("http://localhost:5000/api/users/login", {
			method: 'POST',
			mode: "cors",
			redirect: 'follow',
			credentials: 'include', // Don't forget to specify this if you need cookies
			headers: headers,
			body: JSON.stringify({
				email,
				password
			})
		}).then((response) => {
			response.json().then((data) => {
				console.log(data);
				console.log("then", response);
				setLoading(false);
	
				if (response.status === 200) {
					localStorage.setItem("accessToken", data.accessToken);
					return;
				}			
			});
	
		})
		.catch((err) => {
			console.log("catch", err);
			setLoading(false);
			setError(err.message);
		});

	};

	const onRefresh = () => {
		axios
			.get("/users/refreshaccesstoken", {withCredentials: true})
			.then((response) => {
				console.log("onRefresh", response);
				if (response.status === 200) {
					localStorage.setItem("accessToken", response.data.accessToken);
					return;
				}								
			})
			.catch((err) => {
				console.log("catch", err);
			});
	};

	const onLogout = () => {
		axios
			.get("/users/logout", {withCredentials: true})
			.then((response) => {
				console.log("onLogout", response);		
				localStorage.removeItem("accessToken");					
			})
			.catch((err) => {
				console.log("catch", err);
			});
	};	


	return (
		<Stack className="mt-5 col-md-6 mx-auto justify-content-between">
		<Button onClick={onRefresh}>Refresh</Button>
		<Button onClick={onLogout}>Logout</Button>

			<Form className="p-3" onSubmit={handleSubmit}>
				<h3>Sign In</h3>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check
						type="checkbox"
						label="Remember me"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
					/>
				</Form.Group>

				<Form.Group className="mb-2" controlId="formBasicCheckbox">
					<Button
						variant="primary"
						type="submit"
						style={{ width: "100%" }}
						disabled={loading}
					>
						{loading ? "Loading…" : "Login"}
					</Button>
				</Form.Group>

				{error && <div style={{ textAlign: "center" }}><Alert variant={"danger"}>{error}</Alert></div>}

				<div style={{ textAlign: "center" }}>
					<Form.Text className="text-muted text-center">
						Don't have account? <Link to="/signup">sign up</Link>
					</Form.Text>
				</div>
			</Form>
		</Stack>
	);
}
