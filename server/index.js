// ? Required modules to real time connect between client and server
import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
// ? Required to connect to a database
import mysql from "mysql";
// ? Global variables to config the server setup
import { PORT } from "./config.js";

// ? Make connection with a local mysql database
const connection = mysql.createConnection({
	host: "localhost",
	user: "kuepaUser",
	password: "kuepatt",
	database: "kuepa",
});

connection.connect((error) => {
	if (error) throw error;
	console.log("Conexión exitosa a la base de datos MySQL");
});

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
	cors: {
	  origin: "http://localhost:5173",
	},
});
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "../client/build")));

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("message", (body) => {
		socket.broadcast.emit("message", {
			body,
			from: socket.id.slice(8),
		});
	});
});

server.listen(PORT);
console.log(`server on port ${PORT}`);
app.post("/user", (req, res) => {
	console.log(req);
	let nombre = req.body.name;
	let usuario = req.body.username;
	let contrasenia = req.body.password;
	let tipoUsuario = req.body.userType;
	connection.query(
		"INSERT INTO usuarios (nombre, usuario, contrasenia, tipo_usuario) VALUES (?, ?, ?, ?)",
		[nombre, usuario, contrasenia, tipoUsuario],
		(error, results) => {
			if (error) {
				console.error(error);
				alert("Error al registrar el usuario");
			} else {
				console.log(results);
				alert("Usuario registrado correctamente");
			}
		}
	);
});
