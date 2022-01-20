const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();

dotenvExpand.expand(myEnv);

mongoose.Promise = global.Promise;

const bdd = process.env.CONNECTION_STRING

mongoose
	.connect(
		`${bdd}`
        // ,
		// {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
		// }
	)
	.then(() => console.log("Connecting MongoDB"))
	.catch((err) => console.log("Fail to connect to MongoDB", err));
