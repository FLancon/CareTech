const bdd = require("../domain/data/dbconnect");
const { crypt, cryptCompare } = require("../config/bcrypt");
const bcrypt = require("bcrypt");
const UserModel = require("../domain/schemas/userSchema");
const { transporter } = require("../config/nodemailer");
const nodemailer = require("nodemailer");


module.exports = {
	// Method: Create a User in DB + Send a validation email
	// Paramaters: Object User Model
	// Return: Status(200) || error

	async createUser(req, res) {
		const userexist = await UserModel.findOne({ email: req.body.email });
		// Async+Await car 'email: req.body.email' n'est pas encore définit dans la fonction 'New UserModel'
		if (userexist != null) {
			res.status(400).send("Utilisateur déjà enregistré");
		} else {
			const newUser = new UserModel({
				name: req.body.name,
				firstname: req.body.firstname,
				email: req.body.email,
				password: await crypt(req.body.password),
			});

			if (req.body.confPassword != req.body.password) {
				console.log("Mots de passe differents");
			} else {
				newUser.save(async (err, user) => {
					if (err) {
						console.log(err);
					} else {
						res.status(200).send(
							"Utilisateur enregistré: " + newUser
						);

						async function mailing() {
							let transporter = nodemailer.createTransport({
								host: "ssl0.ovh.net",
								port: 587,
								secure: false,
								auth: {
									user: process.env.MAILING_ADRESS,
									pass: process.env.PASSWORD_MAIL,
								},
							});

							let info = await transporter.sendMail({
								from: '"Jean Michel Michel" <espoir@orchidee-du-desert.com>',
								to: `${newUser.email}`,
								// bcc: "kemaillard@gmail.com",
								subject: "Test",
								// text: "Hello World!!!",
								html: `Bonjour ${newUser.name}, bienvenue à la charité de l'<b>Orchidée de l'Éthiopie</b> 😎
								Veuillez cliquer sur ce lien pour être prélevé de Une Million d'euros: <a href='http://localhost:3000/verifymail/${newUser._id}'> le lien</a></b>`,
								// attachments: [
								// 	{
								// 		filename: "Parrot.png",
								// 		path: "./test/Parrot.png",
								// 	},
								// ],
							});

							console.log("Message envoyé :", info.messageId);
						}

						mailing();
					}
				});
			}
		}
	},
};
