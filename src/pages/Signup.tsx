import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== password2) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		setError("");
		axios.post("/users", {
			email,
			password,
		}).then((res) => {
			setLoading(false);
			if (res.status === 201) {					
				navigate("/login");
				return;
			}
			setError(res.data);
		}).catch((err) => {
			console.log("catch", err);
			setLoading(false);
			setError(err.response.data);
		});
	};

	return (
		<Stack className="mt-5 col-md-6 mx-auto justify-content-between">
			<Form className="p-3" onSubmit={handleSubmit}>
				<h3>Sign Up</h3>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Repeat Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-2" controlId="formBasicCheckbox">
					<Button
						variant="primary"
						type="submit"
						style={{ width: "100%" }}
						disabled={loading}
					>
						{loading ? "Loading…" : "Sign Up"}
					</Button>
				</Form.Group>

				{error && <div style={{ textAlign: "center" }}><Alert variant={"danger"}>{error}</Alert></div>}

				<div style={{ textAlign: "center" }}>
					<Form.Text className="text-muted">
						Already have an account? <Link to="/login">Login</Link>
					</Form.Text>
				</div>
			</Form>
		</Stack>
	);
}
