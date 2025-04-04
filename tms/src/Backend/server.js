const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

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
        console.log(stageName + city + routeId + arrivalTime + departureTime + fee);

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
                console.log("DB");
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Route added successfully", routeId });
            console.log("D");
        });
    } catch (error) {
        console.log("server");
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

// Add a New Vehicle
app.post('/addVehicle', async (req, res) => {
    console.log("Received Vehicle Data:", req.body); // Debug log
    
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
        console.log("API Response Data:", results); // Debugging
        res.json(results);
    });
});

// Add a new FC record
app.post("/addFC", async (req, res) => {
   
    try {
        const { vehicleId, fcNo, issueDate, expiryDate, status } = req.body;

        // Validate required fields
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
                    console.log(req.body);
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
        console.log("Driver added successfully");
        res.status(201).json({ message: "Driver added successfully" });
    });
});



  
// Fetch all unique route IDs from the stage table
app.get('/getRoutes', (req, res) => {
    connection.query('SELECT DISTINCT routeid FROM stage', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching routes');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/getRoute', (req, res) => {
    connection.query("SELECT * FROM route", (err, results) => {
        if (err) {
            console.error("Error fetching routes:", err);
            return res.status(500).json({ message: "Failed to fetch route" });
        }
        console.log("API Response Data:", results); // Debugging
        res.json(results);
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



  app.get('/getstage', (req, res) => {
    connection.query("SELECT * FROM stage", (err, results) => {
        if (err) {
            console.error("Error fetching :", err);
            return res.status(500).json({ message: "Failed to fetch stage " });
        }
        console.log("API Response Data:", results); // Debugging
        res.json(results);
    });
});
  
  // Fetch stages based on routeId
  app.get('/getStages/:routeId', (req, res) => {
    const { routeId } = req.params;
    connection.query('SELECT stageid, stagename FROM stage WHERE routeid = ?', [routeId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching stages');
      } else {
        res.json(results);
      }
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
  
  // Add traveller to Traveller table
  app.post('/addTraveller', (req, res) => {
    const { role, routeId, stageId } = req.body;
    if (role === 'staff') {
      return res.status(400).send('Staff cannot have fees');
    }
  
    const query = 'INSERT INTO Traveller (role, routeId, stageId) VALUES (?, ?, ?)';
    db.query(query, [role, routeId, stageId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Traveller added successfully');
    });
  });
  

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  