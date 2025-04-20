const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const connection = require("./db");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cron = require("node-cron");


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Hardcoded Admin Credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Add a New Route
app.post('/addRoute', async (req, res) => {
    try {
        const { routeId, routeName, city, totalStages, totalDistance } = req.body;
        if (!routeId || !routeName || !city || !totalStages || !totalDistance) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        connection.query("INSERT INTO Route (routeid, routename, city, totalstages, totaldistance) VALUES (?, ?, ?, ?, ?)", 
            [routeId, routeName, city, totalStages, totalDistance], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Route added successfully", routeId });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get All Routes
app.get('/getRoute', (req, res) => {
    connection.query("SELECT * FROM route", (err, results) => {
        if (err) {
            console.error("Error fetching routes:", err);
            return res.status(500).json({ message: "Failed to fetch routes" });
        }
        res.json(results);
    });
});

app.get('/getRouteByCity', (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: "City is required" });
    }

    const query = "SELECT routeid FROM route WHERE city = ?";
    
    connection.query(query, [city], (err, results) => {
        if (err) {
            console.error("Error fetching routes:", err);
            return res.status(500).json({ message: "Failed to fetch routes" });
        }

        const routeIds = results.map(route => route.routeid);
        res.json({ routes: routeIds });
    });
});
app.get('/getStagesByRouteId', (req, res) => {
    const { routeid } = req.query;

    if (!routeid) {
        return res.status(400).json({ message: "Route ID is required" });
    }

    const query = "SELECT stagename FROM stage WHERE routeid = ?";

    connection.query(query, [routeid], (err, results) => {
        if (err) {
            console.error("Error fetching stages:", err);
            return res.status(500).json({ message: "Failed to fetch stages" });
        }

        const stages = results.map(row => row.stagename);
        res.json({ stages });
    });
});

// Function to generate the next stageId 
async function generateStageId() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT MAX(CAST(SUBSTRING(stageId, 2) AS UNSIGNED)) AS maxId FROM stage",
            (err, result) => {
                if (err) reject(err);
                const nextId = result[0].maxId ? result[0].maxId + 1 : 1;
                resolve(`S${nextId}`);
            }
        );
    });
}

// Add a New Stage
app.post('/addStage', async (req, res) => {
    try {
        const { stageName, city, routeId, arrivalTime, departureTime, fee } = req.body;

        if (!stageName || !city || !routeId || !arrivalTime || !departureTime || !fee) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const stageId = await generateStageId();
        const sql = "INSERT INTO stage (stageid, stagename, city, routeid, arrivaltime, departureTime, fee) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, [stageId, stageName, city, routeId, arrivalTime, departureTime, fee], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Stage added successfully", stageId });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get All Stages
app.get('/getStage', (req, res) => {
    connection.query("SELECT * FROM stage", (err, results) => {
        if (err) {
            console.error("Error fetching stages:", err);
            return res.status(500).json({ message: "Failed to fetch stages" });
        }
        res.json(results);
    });
});

// Add a New Vehicle
app.post('/addVehicle', async (req, res) => {
    
    try {
        const {vehicleId, vehicleType, seatCapacity, registrationNo, routeId, registrationDate, purchaseDate, vendorId, rcNo, registrationPlace } = req.body;
        const sql = "INSERT INTO vehicle (vehicleid, vehicletype, seatcapacity, registrationno, routeid, registrationdate, purchasedate, vendorid, rcno, registrationplace) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, [vehicleId, vehicleType, seatCapacity, registrationNo, routeId, registrationDate, purchaseDate, vendorId, rcNo, registrationPlace], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Vehicle added successfully", vehicleId });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


app.get('/getVehicle', (req, res) => {
    connection.query("SELECT * FROM vehicle", (err, results) => {
        if (err) {
            console.error("Error fetching vehicles:", err);
            return res.status(500).json({ message: "Failed to fetch vehicles" });
        }
        res.json(results);
    });
});


app.post("/addFC", async (req, res) => {
   
    try {
        const { vehicleId, fcNo, issueDate, expiryDate, status } = req.body;
        if (!vehicleId || !fcNo || !issueDate || !expiryDate || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
       
        connection.query(
            "INSERT INTO fc (vehicleid, fcno, issuedate, expirydate, status) VALUES (?, ?, ?, ?, ?)",
            [vehicleId, fcNo, issueDate, expiryDate, status],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error", error: err });
                }
                res.status(200).json({ message: "FC added successfully"});
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Get all FC records
app.get("/getFC", (req, res) => {
    connection.query("SELECT * FROM fc", (err, results) => {
        if (err) {
            console.error("Error fetching FC records:", err);
            return res.status(500).json({ message: "Failed to fetch FC records" });
        }
        res.json(results);
    });
});

app.put('/updateFC/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { vehicleid, fcno, issuedate, expirydate, status } = req.body;

        if (!vehicleid || !fcno || !issuedate || !expirydate || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const sql = "UPDATE fc SET vehicleid = ?, fcno = ?, issuedate = ?, expirydate = ?, status = ? WHERE fcid = ?";
        
        connection.query(sql, [vehicleid, fcno, issuedate, expirydate, status, id], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "FC not found" });
            }
            res.status(200).json({ message: "FC details updated successfully" });
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


app.post("/addInsurance", (req, res) => {
    try {
        const { vehicleId, policyNo, companyName, issueDate, expiryDate, premiumAmount } = req.body;

        // Validate required fields
        if (!vehicleId || !policyNo || !companyName || !issueDate || !expiryDate || !premiumAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        connection.query(
            "INSERT INTO insurance (vehicleid, policyno, companyname, issuedate, expirydate, premiumamount) VALUES (?, ?, ?, ?, ?, ?)",
            [vehicleId, policyNo, companyName, issueDate, expiryDate, premiumAmount],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error", error: err });
                }
                res.status(200).json({ message: "Insurance record added successfully" });
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


app.get("/getInsurance", (req, res) => {
    connection.query("SELECT * FROM insurance", (err, results) => {
        if (err) {
            console.error("Error fetching insurance records:", err);
            return res.status(500).json({ message: "Failed to fetch insurance records" });
        }
        res.json(results);
    });
});


app.post("/addPermit", (req, res) => {
    try {
        const { vehicleId, permitNo, permitType, issueDate, expiryDate, status } = req.body;

        // Validate required fields
        if (!vehicleId || !permitNo || !permitType || !issueDate || !expiryDate || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        connection.query(
            "INSERT INTO permit (vehicleid, permitno, permittype, issuedate, expirydate, status) VALUES (?, ?, ?, ?, ?, ?)",
            [vehicleId, permitNo, permitType, issueDate, expiryDate, status],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error", error: err });
                }
                res.status(200).json({ message: "Permit record added successfully" });
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

app.get("/getPermit", (req, res) => {
    connection.query("SELECT * FROM permit", (err, results) => {
        if (err) {
            console.error("Error fetching permit records:", err);
            return res.status(500).json({ message: "Failed to fetch permit records" });
        }
        res.json(results);
    });
});
// Update Permit Endpoint
app.post("/updatePermit", (req, res) => {
    try {
      const { id, vehicleId, permitNo, permitType, issueDate, expiryDate, status } = req.body;
  
      if (!id || !vehicleId || !permitNo || !permitType || !issueDate || !expiryDate || !status) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      connection.query(
        "UPDATE permit SET vehicleid=?, permitno=?, permittype=?, issuedate=?, expirydate=?, status=? WHERE id=?",
        [vehicleId, permitNo, permitType, issueDate, expiryDate, status, id],
        (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error", error: err });
          }
          res.status(200).json({ message: "Permit updated successfully" });
        }
      );
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  
  // Delete Permit Endpoint
  app.delete("/deletePermit/:id", (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM permit WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Permit deleted successfully" });
    });
  });
  
// Multer Setup for File Upload (stores image as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to Add Driver
app.post("/addDriver", upload.single("photo"), (req, res) => {
    const { staffcode, staffname, vehicleid, doorno, streetname, city, state, pincode, mobileno } = req.body;
    const photo = req.file ? req.file.buffer : null;

    const sql = "INSERT INTO driver (staffcode, staffname, vehicleid, doorno, streetname, city, state, pincode, mobileno, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    connection.query(sql, [staffcode, staffname, vehicleid, doorno, streetname, city, state, pincode, mobileno, photo], (err, result) => {
        if (err) {
            console.error("Error inserting driver:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Driver added successfully" });
    });
});


app.get('/getdrivers', (req, res) => {
    const sql = "SELECT staffcode, staffname, vehicleid, doorno, streetname, city, state, pincode, mobileno, photo FROM driver";
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching drivers:", err);
            return res.status(500).json({ message: "Failed to fetch drivers" });
        }

        // Convert photos to Base64 format
        const driversWithImages = results.map(driver => ({
            ...driver,
            imageUrl: driver.photo ? `data:image/jpeg;base64,${driver.photo.toString("base64")}` : null
        }));

        res.json(driversWithImages);
    });
});

  // Add traveller to Traveller table
  
  app.post('/addTraveller', (req, res) => {
    try {
        const {
            name, rollno, role, branch,
            doorno, street, place,
            point, routeid
        } = req.body;

        // ✅ Validate required fields
        if (!name || !rollno || !role || !branch || !doorno || !street || !place || !point || !routeid) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const sql = `
            INSERT INTO traveller 
            (name, rollno, role, branch, doorno, street, place, point, routeid)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [name, rollno, role, branch, doorno, street, place, point, routeid],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error", error: err });
                }

                res.status(200).json({ 
                    message: "Traveller added successfully", 
                    travellerId: result.insertId 
                });
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


app.get("/getTraveller", (req, res) => {
    connection.query("SELECT * from traveller", (err, results) => {
        if (err) {
            console.error("Error fetching traveller records:", err);
            return res.status(500).json({ message: "Failed to fetch traveller records" });
        }
        else {
            console.log("Traveller data:", results); // ✅ Add this for debugging
            res.json(results);
          }
          
        res.json(results);
    });
});


  // Fetch fee based on routeId and stageId
  app.get('/getFees/:routeId/:stageId', (req, res) => {
    const { routeId, stageId } = req.params;
    connection.query('SELECT fee FROM stage WHERE routeid = ? AND stageid = ?', [routeId, stageId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching fee');
      } else if (results.length === 0) {
        res.status(404).send('No fee found for the given route and stage');
      } else {
        res.json(results[0]);
      }
    });
  });
  
// // FC Expiry Reminder (1 Day Before Expiry)
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Cron job - runs daily at 9 AM
// cron.schedule('* * * * *', () => {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const formattedTomorrow = tomorrow.toISOString().split('T')[0];

//     const query = `
//         SELECT vehicleid, fcno, expirydate 
//         FROM fc 
//         WHERE status = 'Active' AND expirydate = ?
//     `;

//     connection.query(query, [formattedTomorrow], (err, results) => {
//         if (err) {
//             console.error("Error fetching FC expiry data:", err);
//             return;
//         }

//         if (results.length === 0) {
//             console.log("No FC expiring tomorrow.");
//             return;
//         }

//         results.forEach((fc) => {
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: "2212080@nec.edu.in", // You can make this dynamic later
//                 subject: "⚠️ FC Expiry Reminder - 1 Day Left",
//                 html: `
//                     <h3>FC Expiry Reminder</h3>
//                     <p><strong>Vehicle ID:</strong> ${fc.vehicleid}</p>
//                     <p><strong>FC Number:</strong> ${fc.fcno}</p>
//                     <p><strong>Expiry Date:</strong> ${fc.expirydate}</p>
//                     <p>Your Fitness Certificate will expire <b>tomorrow</b>. Please renew it soon.</p>
//                 `
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error("Mail send error:", error);
//                 } else {
//                     console.log(`Reminder sent for Vehicle ID ${fc.vehicleid}`);
//                 }
//             });
//         });
//     });
// });

// FC Expiry Reminder (1 Day Before Expiry)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
console.log("Email setup:", {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? "****" : "Not Provided"
});
// Cron job - runs daily at 9 AM
cron.schedule('0 9 * * *', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formattedTomorrow = tomorrow.toISOString().split('T')[0]; // Format date as 'yyyy-mm-dd'

    console.log("Checking FC expiry for date:", formattedTomorrow);  // Debugging statement to check formatted date

    // SQL query to fetch FCs expiring tomorrow
    const query = `
        SELECT vehicleid, fcno, expirydate 
        FROM fc 
        WHERE status = 'Active' AND DATE(expirydate) = ?
    `;

    // Run the query with the formatted date
    connection.query(query, [formattedTomorrow], (err, results) => {
        if (err) {
            console.error("Error fetching FC expiry data:", err);  // Debugging: Log the error if there's one
            return;
        }

        // Check if any records are returned
        if (results.length === 0) {
            console.log("No FC expiring tomorrow.");
            return;
        }

        console.log("Found the following FCs expiring tomorrow:", results);  // Debugging: Log the result to see what was fetched

        // Send an email reminder for each vehicle expiring tomorrow
        results.forEach((fc) => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: "2212080@nec.edu.in", // Make this dynamic if needed
                subject: "⚠️ FC Expiry Reminder - 1 Day Left",
                html: `
                    <h3>FC Expiry Reminder</h3>
                    <p><strong>Vehicle ID:</strong> ${fc.vehicleid}</p>
                    <p><strong>FC Number:</strong> ${fc.fcno}</p>
                    <p><strong>Expiry Date:</strong> ${fc.expirydate}</p>
                    <p>Your Fitness Certificate will expire <b>tomorrow</b>. Please renew it soon.</p>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Mail send error:", error);  // Debugging: Log the mail send error if any
                } else {
                    console.log(`Reminder sent for Vehicle ID ${fc.vehicleid}`);  // Debugging: Log when email is successfully sent
                }
            });
        });
    });
});
// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  