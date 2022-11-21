const express = require("express");
const router = express.Router();
const Feedback = require('../models/feedback');
const PoliceStation = require("../models/PoliceStation");


router.get("/", function (req, res) {
	res.send("Hii this is useless");
})


router.route("/:PID")
	.get(function (req, res) {
		const pid = req.params.PID;
		// const check = parseInt(pid);
		// console.log(check)
		// if (isNaN(parseInt(pid))) {
		// 	console.log("Hii")
		// 	if (pid === "admin")
		// 		res.render("admin") // admin login using admin.ejs
		// 	else
		// 		res.send("Error 500")
		// }
		// else {
		let PSname = "";
		PoliceStation.findById(pid, function (err, result) {
			if (err) {
				console.log("ERR " + err);
			} else {
				console.log(result)
				res.render("auth", {
					name: result.name,
					PID: pid
				});
			}
		})
		console.log(PSname)

		// }
	})
	.post(function (req, res) {
		const pid = req.params.PID;
		res.render("form", {
			PID: pid
		})
	})


router.route("/:PID/form")
	.get(function (req, res) {
		const PID = req.params.PID;
		res.render("form", {
			PID: PID
		})
	})
	.post(async function (req, res) {
		console.log(req.body);
		const PID = req.params.PID;
		const experience = req.body.experience;
		const Q1 = checker(req.body.gridRadios);
		const Q2 = checker(req.body.gridRadios2);

		console.log(PID);
		const ps = await PoliceStation.findOne({ _id: PID })
		console.log("PS " + ps);

		const feedback = await new Feedback({
			question1: Q1,
			question2: Q2,
			question3: experience,
			fbcity: ps.city,
			fbdistrict: ps.district,
			fbsubdivision: ps.subdivision,
			fbpoliceStation: ps.name
		})
		feedback.save();
		//res.send("Hii datbase updated: " + experience + "\n" + Q1 + "\n" + Q2)
		//TODO update databse
		res.render("thanks")
	});

function checker(str) {
	switch (str) {
		case "option1":
			return 1;
		case "option2":
			return 2;
		case "option3":
			return 3
		case "option4":
			return 4
		case "option5":
			return 5
		default:
			return 0;
	}
}

module.exports = router;