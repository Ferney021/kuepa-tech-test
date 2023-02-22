import React, { useState } from "react";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			username: username,
			password: password,
		};
		fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Nombre de usuario:
				<input
					type="text"
					name="username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
			</label>
			<br />
			<label>
				Contraseña:
				<input
					type="password"
					name="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</label>
			<br />
			<button type="submit">Iniciar sesión</button>
		</form>
	);
};

export default LoginForm;
