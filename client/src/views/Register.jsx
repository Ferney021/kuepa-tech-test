import React, { useState } from "react";
import axios from "axios";

const Register = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("estudiante");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleUserTypeChange = (event) => {
		setUserType(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Aquí puede agregar la lógica para enviar los datos de registro al servidor
		console.log({
			name: name,
			username: username,
			password: password,
			userType: userType,
		});

		axios
			.post(
				"http://localhost:4000/user",
				{
					name: name,
					username: username,
					password: password,
					userType: userType,
				},
				// {
				// 	headers: {
				// 		"Content-Type": "application/json"
				// 	},
				// }
			)
			.then((response) => {
				console.log(response.data);
			});
	};

	return (
		<div>
			<h1>Página de registro</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Nombre:
					<input type="text" value={name} onChange={handleNameChange} />
				</label>
				<br />
				<label>
					Usuario:
					<input type="text" value={username} onChange={handleUsernameChange} />
				</label>
				<br />
				<label>
					Contraseña:
					<input type="password" value={password} onChange={handlePasswordChange} />
				</label>
				<br />
				<label>
					Tipo de usuario:
					<select value={userType} onChange={handleUserTypeChange}>
						<option value="estudiante">Estudiante</option>
						<option value="moderador">Moderador</option>
					</select>
				</label>
				<br />
				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
};

export default Register;
