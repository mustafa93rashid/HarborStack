⚓ Harbor Crew & Shift Management API 🚢

A RESTful API built with Node.js and Express.js to manage harbor crew members and their assigned shifts.
Designed with clean architecture, validation, and scalable structure in mind.

- 📋 Table of Contents
- 📖 Overview
- 🛠️ Tech Stack
- 📂 Project Structure
- 🚀 Getting Started
- ⚙️ Environment Variables
- 📡 API Reference
- 👷 Crews
- ⏱️ Shifts
- 🧩 Middleware
- ❗ Error Handling
- 📖 Overview

This API acts as a backend system for harbor operations, allowing you to:

-👷 Manage crew members (Create, Read, Update, Delete)
-⏱️ Assign and manage shifts
-✅ Validate all incoming data
-📊 Log every request (method, URL, IP, timestamp)
-🛠️ Tech Stack

Technology	Purpose
-🟢 Node.js	Runtime Environment
-🔐 dotenv	Environment Variables
-📂 Project Structure

project-root/
├── index.js        # 🚀 Main server entry point
├── data.js         # 📦 Mock database (crews & shifts)
├── .env            # 🔐 Environment variables
└── README.md       # 📄 Documentation
🚀 Getting Started
🔧 Prerequisites
Node.js v14+
npm

📥 Installation
# 1. Clone the repository
git clone <your-repo-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Run the server
node index.js

📍 Server will run at:

http://localhost:<PORT>
⚙️ Environment Variables

Create .env file:

PORT=3000
Variable	Description	Required
PORT	Server port	✅ Yes
📡 API Reference
🔗 Base URL
http://localhost:<PORT>/api/v1
👷 Crews
📥 Get All Crews
GET /api/v1/crews
{
  "Message": "Get all Crews Successfully",
  "data": [...]
}
🔍 Get Crew by ID
GET /api/v1/crews/:id
{
  "Message": "Get By ID Successfully",
  "data": { "id": 1, "name": "John Doe", "role": "Captain", "active": true }
}
➕ Create Crew
POST /api/v1/crews
{
  "name": "John Doe",
  "role": "Captain",
  "active": true
}
✏️ Update Crew
PUT /api/v1/crews/:id
❌ Delete Crew
DELETE /api/v1/crews/:id
⏱️ Shifts
📥 Get All Shifts
GET /api/v1/shifts
🔍 Get Shift by ID
GET /api/v1/shifts/:id
➕ Create Shift
POST /api/v1/shifts
{
  "crewId": 2,
  "berth": "B-12",
  "startsAt": "2025-01-01T08:00:00Z",
  "endsAt": "2025-01-01T16:00:00Z"
}

⚠️ Note: crewId must reference an existing crew.

✏️ Update Shift
PUT /api/v1/shifts/:id
❌ Delete Shift
DELETE /api/v1/shifts/:id
🧩 Middleware
Middleware	Description
express.json()	Parses JSON body
logger	Logs request details 📊
validateCrew	Validates crew input
validateShift	Validates shift input
validateCrewExists	Ensures crew exists
❗ Error Handling

All errors follow this structure:

{
  "Message": "Error description",
  "errors": ["field is required"],
  "data": null
}
Code	Meaning
✅ 200	Success
🆕 201	Created
⚠️ 400	Bad Request
❌ 404	Not Found
📜 License

✨ Built with clean code, scalable structure, and best practices.

Mustafa Rashid Abbas

ة
