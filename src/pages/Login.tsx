import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";


export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		axiosPrivate.post("/users/login", {
			email,
			password
		}).then((response) => {
			setLoading(false);
			setAuth?.({accessToken: response.data.accessToken});
			navigate("/todo");
		}).catch((error) => {
			console.log(error)
			setLoading(false);
			setError(error.response.data);
		});
	};

	return (
		<Stack className="mt-5 col-md-6 mx-auto justify-content-between">
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
