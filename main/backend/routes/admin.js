const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const JWT_secret = process.env.JWT_SECRET;
const { spawn } = require('child_process');
const qr = require("qrcode");
const fetchUser = require('../middleware/fetchUser');
const PoliceStation = require('../models/PoliceStation');
const Feedback = require('../models/feedback');
const { PythonShell } = require('python-shell');


let feedbacks;
dotenv.config({ path: __dirname + '/config.env' });

router.get("/", (req, res) => {
    res.send("Hello world from backend !");
})


// Route-1 login for admin and User whom he creates
router.post("/login", async (req, res) => {
    let success = false;
    const { email, password } = req.body;

    // checking whether the email and password are empty or not
    try {
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill the credentials" });
        }

        // whether the incomming email is exist or not
        // if yes, then validating the password
        const admin = await Admin.findOne({ email: email })
        // console.log(email + " " + password + " " + admin);
        if (admin) {
            const validpassword = await bcrypt.compare(password, admin.password);
            if (validpassword) {
                const data = {
                    admin: {
                        id: admin._id
                    }
                }
                const authtoken = jwt.sign(data, JWT_secret);
                success = true;
                return res.status(200).json({ success, message: "UserLogin Successfully", authtoken },)
            } else {
                return res.status(400).json({ success, error: "Wrong credentials" })
            }
        } else {
            return res.status(400).json({ error: "Wrong credentials" });
        }

    } catch (error) {
        console.log(error);
    }
})



// Route-2 creating User whom he grants

router.post('/createUser', async (req, res) => {

    let success = false;
    let admin = process.env.BOOLEAN;

    try {
        const { name, email, password } = req.body

        // if any empty property remains
        if (!name || !email || !password) {
            return res.status(404).json({ success, error: "please filled the credentials" });
        }
        // checking whether user exist
        const adminExist = await Admin.findOne({ email: email })
        if (adminExist) return res.status(422).json({ success, error: "User Already Exist" })

        // if not exist then creating new user
        const admin = new Admin({ name, email: email.toLowerCase(), password })
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        admin.password = await bcrypt.hash(admin.password, salt);

        const data = {
            admin: {
                id: admin._id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        // console.log(authtoken);
        await admin.save();
        success = true;
        res.status(201).json({ success, message: "User registered successfully" })

    } catch (error) {
        console.log(error);
    }

})

router.get("/QRGen", function (req, res) {
    res.render("qrCode")
})

router.post("/scan", function (req, res) {
    console.log("scan running")
    const url = req.body.url;
    console.log("url: " + url)
    if (url.length === 0) res.send("Empty Data!");

    const python = spawn('python', ['script.py', url]);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
    });
    python.on('close', (code) => {
        console.log('child process close all stdio with code ${code}');
    });
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
        res.render("scan", { src });
    });

})

router.post("/download", function (req, res) {
    path = "uploads/qr-img.jpg"
    filename = "QR.jpg"
    res.download(path, filename, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not find the file. " + err
            })
        }
    })
})

router.post('/loggedUser', fetchUser, async (req, res) => {
    try {
        adminID = req.admin.id;
        const admin = await User.findById(adminID).select("-password");
        res.send(admin);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})


router.post('/getPID', async (req, res) => {
    let success = false;

    try {
        console.log(req.body);
        const { name, city, district, subdivision } = req.body

        // if any empty property remains
        if (!name || !city || !district || !subdivision) {
            return res.status(404).json({ success, error: "please filled the credentials" });
        }

        console.log(name);
        // checking whether police Station exist
        const policeStation = await PoliceStation.findOne({ name: name })
        console.log(policeStation);
        if (policeStation) {
            const url = `http://10.30.64.11:8000/user/${policeStation._id}`;
            console.log("URL " + url);

            if (url.length === 0) res.send("Empty Data!");

            const python = spawn('python', ['script.py', url]);
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
            });
            python.on('close', (code) => {
                console.log('child process close all stdio with code ${code}');
            });
            qr.toDataURL(url, (err, src) => {
                if (err) res.send("Error occured");
                return res.status(201).json({ success, src, message: "PS exist" })
                //    return res.render("scan", { src });
            });
        }





        // // if not exist then creating new policestaion
        // const user = new User({ name, email: email.toLowerCase(), password, isAdmin: admin })
        // // generate salt to hash password
        // const salt = await bcrypt.genSalt(10);
        // // now we set user password to hashed password
        // user.password = await bcrypt.hash(user.password, salt);

        // const data = {
        //     user: {
        //         id: user._id
        //     }
        // }
        // const authtoken = jwt.sign(data, JWT_secret);
        // // console.log(authtoken);
        // await user.save();
        // success = true;
        // res.status(201).json({ success, message: "User registered successfully" })

    } catch (error) {
        console.log(error);
    }
})

router.get('/getFeedback', async (req, res) => {

    // console.log(req.body);
    // const { name, city, subdivision, district } = req.body;
    const ps = await Feedback.find();
    if (ps) {
        feedbacks = ps;
        res.send(ps);
    }
})

router.post('/report', async (req, res) => {
    //console.log(typeof (feedbacks));

    // let options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'], // get print results in real-time
    //     //scriptPath: '/', //If you are having python_test.py script in same folder, then it's optional.
    //     args: [feedbacks] //An argument which can be accessed in the script using sys.argv[1]
    // };


    // PythonShell.run('Q2.py', options, function (err, result) {
    //     if (err) throw err;
    //     // result is an array consisting of messages collected
    //     //during execution of script.
    //     console.log('result: ', result.toString());
    //     res.send(result.toString())
    // });
})

module.exports = router;