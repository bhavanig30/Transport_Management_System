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
                resolve(`s${nextId}`);
            }
        );
    });
}

// Add a New Stage
app.post('/stages', async (req, res) => {
    try {
        const { stageName, arrivalTime, departureTime, fees } = req.body;
        if (!stageName || !arrivalTime || !departureTime || !fees) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const stageId = await generateStageId();
        const sql = "INSERT INTO stage (stageId, stageName, arrivalTime, departureTime, fees) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, [stageId, stageName, arrivalTime, departureTime, fees], (err, result) => {
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
app.get('/stages', (req, res) => {
    connection.query("SELECT * FROM stage", (err, results) => {
        if (err) {
            console.error("Error fetching stages:", err);
            return res.status(500).json({ message: "Failed to fetch stages" });
        }
        res.json(results);
    });
});

// Function to generate the next routeId 
async function generateRouteId() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT MAX(CAST(SUBSTRING(routeId, 2) AS UNSIGNED)) AS maxId FROM route",
            (err, result) => {
                if (err) reject(err);
                const nextId = result[0].maxId ? result[0].maxId + 1 : 1;
                resolve(`r${nextId}`);
            }
        );
    });
}

// Add a New Route
/*app.post('/routes', async (req, res) => {
    try {
        const { routeName, totalStages, startingStage, endingStage } = req.body;
        if (!routeName || !totalStages || !startingStage || !endingStage) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const routeId = await generateRouteId();
        connection.query("INSERT INTO route (routeId, routeName, totalStages, startingStage, endingStage) VALUES (?, ?, ?, ?, ?)", 
            [routeId, routeName, totalStages, startingStage, endingStage], (err, result) => {
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
app.get('/routes', (req, res) => {
    connection.query("SELECT * FROM route", (err, results) => {
        if (err) {
            console.error("Error fetching routes:", err);
            return res.status(500).json({ message: "Failed to fetch routes" });
        }
        res.json(results);
    });
});

// Function to generate the next vehicleId 
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
*/
async function generateRouteId() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT MAX(CAST(SUBSTRING(routeId, 2) AS UNSIGNED)) AS maxId FROM route",
            (err, result) => {
                if (err) return reject(err);
                const nextId = result[0].maxId ? result[0].maxId + 1 : 1;
                resolve(`R${nextId}`); // 'R' prefix for routeId
            }
        );
    });
}

// API Endpoint to Add a New Route
app.post("/addRoute", async (req, res) => {
    console.log("Received Route Data:", req.body);

    try {
        const { routeName, totalStages, startingStage, endingStage } = req.body;
        const routeId = await generateRouteId();

        const sql = "INSERT INTO route (routeId, routeName, totalStages, startingStage, endingStage) VALUES (?, ?, ?, ?, ?)";

        connection.query(sql, [routeId, routeName, totalStages, startingStage, endingStage], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Route added successfully", routeId });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// API Endpoint to Get Existing Route Names for Dropdown
app.get("/getRoutes", (req, res) => {
    const sql = "SELECT routeName FROM route";
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        const routeNames = results.map((row) => row.routeName);
        res.status(200).json(routeNames);
    });
});



// Add a New Vehicle
app.post('/addVehicle', async (req, res) => {
    console.log("Received Vehicle Data:", req.body); // Debug log
    
    try {
        const { vehicleType, seatCapacity, registrationNo, routeId, vendorId, registrationDate, purchaseDate, rcNo, registrationPlace } = req.body;
        const vehicleId = await generateVehicleId();
        const sql = "INSERT INTO vehicle (vehicleId, vehicleType, seatCapacity, registrationNo, routeId, registrationDate, purchaseDate, vendorId, rcNo, registrationPlace) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, [vehicleId, vehicleType, seatCapacity, registrationNo, routeId, registrationDate, purchaseDate, vendorId, rcNo, registrationPlace], (err, result) => {
            if (err) {
                console.log("sds");
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(200).json({ message: "Vehicle added successfully", vehicleId });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get All Vehicles
app.get('/vehicles', (req, res) => {
    connection.query("SELECT * FROM vehicle", (err, results) => {
        if (err) {
            console.error("Error fetching vehicles:", err);
            return res.status(500).json({ message: "Failed to fetch vehicles" });
        }
        res.json(results);
    });
});


app.post("/addPermit", (req, res) => {
    const { permitId, vehicleId, permitNo, issueDate, expiryDate, permitType, status } = req.body;
  
    const insertPermitQuery = 
      "INSERT INTO permit (permitId, vehicleId, permitNo, issueDate, expiryDate, permitType, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
      connection.query(insertPermitQuery, [permitId, vehicleId, permitNo, issueDate, expiryDate, permitType, status], (err, result) => {
      if (err) {
        console.error("Error inserting permit:", err);
        return res.status(500).json({ message: "Failed to add permit. Please check your input." });
      }
      res.status(200).json({ message: "Permit added successfully!" });
    });
  });
  
  app.post("/addFC", (req, res) => {
    const { fcId, vehicleId, fcNo, issueDate, expiryDate, status } = req.body;
  
    const insertFCQuery =
      "INSERT INTO FC (fcId, vehicleId, fcNo, issueDate, expiryDate, status) VALUES (?, ?, ?, ?, ?, ?)";
  
    connection.query(
      insertFCQuery,
      [fcId, vehicleId, fcNo, issueDate, expiryDate, status],
      (err, result) => {
        if (err) {
          console.error("Error inserting FC details:", err);
          return res.status(500).json({ message: "Failed to add FC. Please check your input." });
        }
        res.status(200).json({ message: "FC details added successfully!" });
      }
    );
  });

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  