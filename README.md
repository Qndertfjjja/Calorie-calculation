# QR Code Calorie Tracker

## Overview
The **QR Code Calorie Tracker** is a React-based web application that scans a QR code representing a food dish and dynamically calculates its calorie count based on the constituent items. Users can modify the quantities of each item, and the total calorie count is updated in real time. A backend powered by Node.js and MongoDB manages the inventory, including CRUD operations for dishes and their calorie data.

## Key Features

### Frontend
1. **QR Code Scanning**: 
   - Scans QR codes containing dish details (dish name and constituent items).
2. **Dynamic Calorie Calculation**:
   - Displays calorie breakdown of a dish.
   - Allows users to modify item quantities with real-time updates to calorie totals.
3. **User-Friendly Interface**:
   - Clean and intuitive design for easy interaction.

### Backend
1. **CRUD APIs**:
   - Manage dishes and constituent items in the inventory.
2. **Dynamic Calorie Retrieval**:
   - Fetch calorie data for items from MongoDB.

### Example Interaction:
- **Before Modification**:
  ```
  Idli (2): 100 cal each → 200 cal
  Vada (1): 200 cal → 200 cal
  Sambhar (1): 120 cal → 120 cal
  Chutney (1): 80 cal → 80 cal
  Total: 600 cal
  ```
- **After Modification**:
  ```
  Idli (3): 100 cal each → 300 cal
  Vada (1): 200 cal → 200 cal
  Sambhar (0): 0 cal → 0 cal
  Chutney (1): 80 cal → 80 cal
  Total: 580 cal
  ```

---

## Tech Stack

- **Frontend**: React.js (with `react-qr-reader` for QR code scanning)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

---

## High-Level Design (HLD)

### Architecture Diagram
![Architecture Diagram](link-to-architecture-diagram)

**Flow**:
1. User scans a QR code.
2. The frontend sends the dish details to the backend.
3. The backend retrieves calorie data for the items from MongoDB.
4. The calculated calorie breakdown is displayed to the user.
5. Users modify quantities, triggering real-time updates.

---

## Low-Level Design (LLD)

### API Contracts

#### 1. Get Calorie Data for a Dish
**Endpoint**: `GET /api/dishes/:dishName`

**Request**:
```json
{
  "dishName": "Idli Vada Combo"
}
```

**Response**:
```json
{
  "dishName": "Idli Vada Combo",
  "items": [
    { "name": "Idli", "calories": 100 },
    { "name": "Vada", "calories": 200 },
    { "name": "Sambhar", "calories": 120 },
    { "name": "Chutney", "calories": 80 }
  ]
}
```

#### 2. Update Dish
**Endpoint**: `PUT /api/dishes/:dishName`

**Request**:
```json
{
  "dishName": "Idli Vada Combo",
  "items": [
    { "name": "Idli", "quantity": 3 },
    { "name": "Vada", "quantity": 1 },
    { "name": "Chutney", "quantity": 1 }
  ]
}
```

**Response**:
```json
{
  "message": "Dish updated successfully",
  "totalCalories": 580
}
```

#### 3. CRUD APIs for Inventory
- **Add Item**: `POST /api/items`
- **Update Item**: `PUT /api/items/:itemName`
- **Delete Item**: `DELETE /api/items/:itemName`
- **Get All Items**: `GET /api/items`

### Database Schema

#### Dishes Collection
```json
{
  "dishName": "Idli Vada Combo",
  "items": [
    { "name": "Idli", "quantity": 2 },
    { "name": "Vada", "quantity": 1 },
    { "name": "Sambhar", "quantity": 1 },
    { "name": "Chutney", "quantity": 1 }
  ]
}
```

#### Items Collection
```json
{
  "name": "Idli",
  "calories": 100
}
```

---

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## Deployment

The application can be deployed using platforms like **Vercel**, **Netlify**, or **Heroku**.

---

## Project Demo

- **Live URL**: [Deployed Application](link-to-deployed-app)
- **Presentation Video**: [Group Presentation Video](link-to-google-drive-video)

---

## License
This project is licensed under the MIT License.
