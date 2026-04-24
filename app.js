// Setup
require("dotenv").config();
const express = require("express");
const app = express();

// Core Middleware
// ─────────────────────────────────────────────
app.use(express.json());

// Custom logger middleware
// ─────────────────────────────────────────────
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  next();
};
app.use(logger);

// Validation Middleware — Crew
// Ensures that required fields (name, role) are present in the request body before proceeding
// ─────────────────────────────────────────────
const validateCrew = (req, res, next) => {
  const { name, role } = req.body;
  const errors = [];

  if (!name) errors.push("name is required");
  if (!role) errors.push("role is required");

  if (errors.length > 0) {
    return res.status(400).json({
      Message: "Validation Error",
      errors,
    });
  }

  next();
};

// Validation Middleware — Shift
// Ensures that required fields (crewId, berth, startsAt, endsAt) are present in the request body before proceeding
// ─────────────────────────────────────────────
const validateShift = (req, res, next) => {
  const { crewId, berth, startsAt, endsAt } = req.body;
  const errors = [];

  if (!crewId) errors.push("crewId is required");
  if (!berth) errors.push("berth is required");
  if (!startsAt) errors.push("startsAt is required");
  if (!endsAt) errors.push("endsAt is required");

  if (errors.length > 0) {
    return res.status(400).json({ Message: "Validation Error", errors });
  }

  next();
};

// Validation Middleware — Crew Existence Check
// Validates that the crewId provided in the request body exists in the crews array before allowing shift creation or update
// ─────────────────────────────────────────────
const validateCrewExists = (req, res, next) => {
  const { crewId } = req.body;

  if (crewId) {
    const crewExists = crews.some((crew) => crew.id === Number(crewId));
    if (!crewExists) {
      return res
        .status(400)
        .json({ Message: "crewId does not exist", data: null });
    }
  }

  next();
};

// Database
let { crews, shifts } = require("./data");

// ═════════════════════════════════════════════
// CREWS ROUTES
// ═════════════════════════════════════════════

// Get all Crews
app.get("/api/v1/crews", (req, res) => {
  res.status(200).json({
    Message: "Get all Crewes Successfully",
    data: crews,
  });
});

// Get Crews by ID
app.get("/api/v1/crews/:id", (req, res) => {
  const id = +req.params.id;
  const crew = crews.find((e) => e.id === id);

  if (!crew) {
    return res.status(404).json({
      Message: "this crews does not exist",
      data: null,
    });
  }
  res.status(200).json({
    Message: "Get By ID Successfully",
    data: crew,
  });
});

// Create Crews
app.post("/api/v1/crews", validateCrew, (req, res) => {
  const { name, role, active = true } = req.body;

  const data = {
    id: new Date().getTime(),
    name,
    role,
    active,
  };

  crews.push(data);

  res.status(201).json({
    Message: "Add New Crew Successfully",
    data,
  });
});

// Update Crew
app.put("/api/v1/crews/:id", validateCrew, (req, res) => {
  const id = +req.params.id;
  const crew = crews.find((e) => e.id === id);

  if (!crew) {
    return res.status(404).json({
      Message: "this crews does not exist",
      data: null,
    });
  }

  const { name, role, active } = req.body;

  crew.name = name;
  crew.role = role;
  crew.active = active;

  res.status(200).json({
    Message: "Updated ID Successfully",
    data: crew,
  });
});

// Delete Crew
app.delete("/api/v1/crews/:id", (req, res) => {
  const id = +req.params.id;

  // Check if crew exists
  const exists = crews.some((e) => e.id === id);
  if (!exists) {
    return res.status(404).json({
      Message: "this crews does not exist",
      data: null,
    });
  }

  crews = crews.filter((e) => e.id !== id);

  res.status(200).json({
    Message: "Deleted Crew Successfully",
    data: null,
  });
});

// ═════════════════════════════════════════════
// SHIFTS ROUTES
// ═════════════════════════════════════════════

// Get all shifts
app.get("/api/v1/shifts", (req, res) => {
  res.status(200).json({
    Message: "Get all Shifts Successfully",
    data: shifts,
  });
});

// Get shifts by ID
app.get("/api/v1/shifts/:id", (req, res) => {
  const id = +req.params.id;
  const shift = shifts.find((e) => e.id === id);
  if (!shift) {
    return res.status(404).json({
      Message: "this shifts does not exist",
      data: null,
    });
  }
  res.status(200).json({
    Message: "Get By ID Successfully",
    data: shift,
  });
});

// Create shifts
app.post("/api/v1/shifts", validateShift, validateCrewExists, (req, res) => {
  const { crewId, berth, startsAt, endsAt } = req.body;

  const data = {
    id: new Date().getTime(),
    crewId: Number(crewId),
    berth,
    startsAt,
    endsAt,
  };

  shifts.push(data);

  res.status(201).json({
    Message: "Add New Shift Successfully",
    data,
  });
});

// Update Shift
app.put("/api/v1/shifts/:id", validateShift, validateCrewExists, (req, res) => {
  const id = +req.params.id;
  const shift = shifts.find((e) => e.id === id);

  if (!shift) {
    return res.status(404).json({
      Message: "this shifts does not exist",
      data: null,
    });
  }

  const { crewId, berth, startsAt, endsAt } = req.body;

  shift.crewId = Number(crewId);
  shift.berth = berth;
  shift.startsAt = startsAt;
  shift.endsAt = endsAt;

  res.status(200).json({
    Message: "Updated ID Successfully",
    data: shift,
  });
});

// Delete Shift
app.delete("/api/v1/shifts/:id", (req, res) => {
  const id = +req.params.id;

  // Check if shift exists
  const exists = shifts.some((e) => e.id === id);

  if (!exists) {
    return res.status(404).json({
      Message: "this shifts does not exist",
      data: null,
    });
  }

  shifts = shifts.filter((e) => e.id !== id);

  res.status(200).json({
    Message: "Deleted Shift Successfully",
    data: null,
  });
});


// ─────────────────────────────────────────────
// Server Initialization
// Start the Express server on the port defined
// ─────────────────────────────────────────────

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
