import { useState } from "react";

import "./App.css";
;

import io from "socket.io-client";
const socket = io("http://localhost:4000");

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<h1>Aplicación</h1>
		</div>
	);
}

export default App;
