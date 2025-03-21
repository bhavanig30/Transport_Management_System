const express = require('express');
const cors = require('cors');
const connection = require('./db');

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

async function generateVehicleId() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT MAX(CAST(SUBSTRING(vehicleId, 2) AS UNSIGNED)) AS maxId FROM vehicle",
            (err, result) => {
                if (err) reject(err);
                const nextId = result[0].maxId ? result[0].maxId + 1 : 1;
                resolve(`v${nextId}`);
            }
        );
    });
}

// Add a New Vehicle
app.post('/addVehicle', async (req, res) => {
    console.log("Received Vehicle Data:", req.body); // Debug log
    
    try {
        const { vehicleType, seatCapacity, registrationNo, routeId, vendorId, registrationDate, purchaseDate, rcNo, registrationPlace } = req.body;
        const vehicleId = await generateVehicleId();
        const sql = "INSERT INTO vehicle (vehicleId, vehicleType, seatCapacity, registrationNo, routeId, registrationDate, purchaseDate, vendorId, rcNo, registrationPlace) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

// Get All Vehicles
app.get('/getVehicle', (req, res) => {
    connection.query("SELECT * FROM vehicle", (err, results) => {
        if (err) {
            console.error("Error fetching vehicles:", err);
            return res.status(500).json({ message: "Failed to fetch vehicles" });
        }
        res.json(results);
    });
});

async function generateVehicleId() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT MAX(CAST(SUBSTRING(vehicleId, 2) AS UNSIGNED)) AS maxId FROM vehicle",
            (err, result) => {
                if (err) reject(err);
                const nextId = result[0].maxId ? result[0].maxId + 1 : 1;
                resolve(`v${nextId}`);
            }
        );
    });
}

app.get("/getVehicleIds", (req, res) => {
    const sql = "SELECT vehicleId FROM vehicle";
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching vehicle IDs:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results.map(row => row.vehicleId)); // Send only IDs
    });
});

async function generateFcId() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT MAX(CAST(SUBSTRING(fcId, 3) AS UNSIGNED)) AS maxId FROM fc",
            (err, result) => {
                if (err) return reject(err);
                
                const nextId = result[0].maxId ? result[0].maxId + 1 : 1;
                const newFcId = `FC${String(nextId).padStart(3, "0")}`; // Ensures format FC001, FC002, FC003
                console.log("Generated FC ID:", newFcId);
                resolve(newFcId);
            }
        );
    });
}

// Add a new FC record
app.post("/addFC", async (req, res) => {
    try {
        const { vehicleId, fcNo, issueDate, expiryDate, status } = req.body;

        // Validate required fields
        if (!vehicleId || !fcNo || !issueDate || !expiryDate || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const fcId = await generateFcId();
        
        connection.query(
            "INSERT INTO fc (fcId, vehicleId, fcNo, issueDate, expiryDate, status) VALUES (?, ?, ?, ?, ?, ?)",
            [fcId, vehicleId, fcNo, issueDate, expiryDate, status],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error", error: err });
                }
                res.status(200).json({ message: "FC added successfully", fcId });
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

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  