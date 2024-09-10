const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const billRouter = require("./routes/billRoute");
const doctorRouter = require("./routes/doctorsRoute");
const userRouter = require("./routes/userRoute");
// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URI =
	"mongodb+srv://annasahmed1609:mongopassword123@cluster0.qqwb0od.mongodb.net/";
// "mongodb+srv://annasahmed1609:zBu6kqbVUy8BPS2h@cluster0.qqwb0od.mongodb.net/";

app.use(express.json());

mongoose
	.connect(BASE_URI)
	.then((response) => {
		console.log("mongodb running");
	})
	.catch((error) => {
		console.log("error in mongodb", error);
	});
app.get("/", (req, res) => res.send("Hello World!"));
app.use(cors());

app.use("/api/bill", billRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
// app.use("/api", router);

// app.get("/api/test", (req, res) => {

//   res.send("test api");
// });

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
