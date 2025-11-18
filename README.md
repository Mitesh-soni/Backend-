# Employee Integration System

## 📌 Overview

This project is a complete **Employee Management & Integration System** that handles:

* Employee Database
* User (3rd Party API) Database
* Integration Workflow using Command Queues
* Full CRUD API Operations (POST, GET, PUT, DELETE)

The system is optimized with a clean folder structure and an asynchronous integration pipeline using:

* `intcmdq` (Integration Command Queue)
* `intcmdqt` (Integration Command Queue Tracker)
* Command Provider linking
* Connector for executing external API calls

---

## 🚀 Features

### **1. CRUD Operations**

* **User API**: Create, Read, Update, Delete user data
* **Employee API**: Create, Read, Update, Delete employee data

### **2. Integration Queue Processing**

When any Employee API operation occurs, the flow triggers:

1. Save integration command in **intcmdq**
2. Save integration command-track entry in **intcmdqt**
3. Execute connector → fetch URL, method, auth token from database
4. Call 3rd-party API (User API)
5. Store status logs:

   * **Status 2** → API HIT
   * **Status 3** → SUCCESS
   * **Status 4** → FAIL

### **3. Third-Party API Simulation**

You manually created a **User API** that acts like a third-party API. The system hits this API based on employee operations.

---

## 📁 Folder Structure

```
project-root/
│
├── controllers/
│   ├── userController.js        # User API CRUD
│   └── employeeController.js    # Employee API CRUD
|
├── integration/
│   ├── controller/
│   │   ├── intcmdqController.js   # Handles command queue
│   │   ├── intcmdqtController.js  # Handles command queue tracking
│   │   └── connectorController.js # Executes API calls
│   │
│   ├── models/
│   │   ├── intcmdq.js            # intcmdq schema
│   │   └── intcmdqt.js           # intcmdqt schema
│   │
│   └── provider/
│       ├── connector.js          # External API connector
│       └── getIntegrationCommandQ.js
│
├── models/
│   ├── counters.js
│   ├── employees.js
│   ├── icommand.js
│   ├── icommandproviderlink.js
│   ├── intcmdqs.js
│   ├── intcmdqts.js
│   ├── iprovider.js
│   ├── istatus.js
│   └── users.js
│
└── README.md
```

---

## 🔄 Complete Workflow Explanation

### **1. Employee API Trigger**

Whenever you hit an Employee API (POST / PUT / DELETE):

* Employee data is processed
* A command entry is created in **intcmdq** with fields:

  * `commandId`
  * `providerId`
  * `jsonPara` (employee data)

### **2. intcmdqt Entry**

Then **intcmdqt** is called:

* Stores `integrationData = { commandProviderLinkId, commandId, providerId, jsonPara }`
* `status = 1` initially

### **3. Connector Executed**

`connectorController` receives `integrationData`:

* Fetches API settings from `getintcmdqController` (URL, method, token)
* Calls the third-party API
* Updates status:

  * **2 = APIHIT** (before hitting API)
  * **3 = SUCCESS** (API success response)
  * **4 = FAIL** (API failure)
* All actions are saved under the same **transaction number (trno)**

### **4. Third-Party API (User API)**

The system hits User API according to the Employee CRUD operation:

* Create Employee → Create User
* Update Employee → Update User
* Delete Employee → Delete User

---

## 🔧 Tech Stack

* **Node.js / Express** backend
* **MongoDB** + Mongoose
* Integration modules (custom-built)
* API connectors

---

## 🧪 API Endpoints

### **Employee API**

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| POST   | `/employee`     | Create employee |
| GET    | `/employee/:id` | Get employee    |
| PUT    | `/employee/:id` | Update employee |
| DELETE | `/employee/:id` | Delete employee |

### **User API (3rd Party)**

| Method | Endpoint    | Description |
| ------ | ----------- | ----------- |
| POST   | `/user`     | Create user |
| GET    | `/user/:id` | Get user    |
| PUT    | `/user/:id` | Update user |
| DELETE | `/user/:id` | Delete user |

---

## ⚙️ Integration Status Flow

| Status Code | Meaning   |
| ----------- | --------- |
| 1           | Initiated |
| 2           | API HIT   |
| 3           | SUCCESS   |
| 4           | FAIL      |

---

## 📘 Conclusion

This project demonstrates:

* Clean MVC architecture
* Real-time integration simulation
* Queue-based async communication
* Third‑party API execution flow
* Complete audit logging with status codes

Perfect for **resume**, **system design showcase**, and **practical API integration demonstration**.

If you want, I can also create:
✔ Architecture Diagram
✔ Sequence Diagram
✔ API Documentation (Swagger-like)
✔ GitHub-friendly badges & formatting
✔ Full project description for resume

Just tell me! 🚀