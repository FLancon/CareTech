const bdd = require("../data/dbconnect")
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
	{
		name: { type: String, required: true },
		firstname: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
