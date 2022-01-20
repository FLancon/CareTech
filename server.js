const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();

dotenvExpand.expand(myEnv);

const port = process.env.PORT || 3000;


server.listen(port, () => {
	console.log(`listen on ${port}`);
});