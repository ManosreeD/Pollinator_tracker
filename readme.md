# 🐝 Pollinator Tracker - MERN Stack Application

This project is a **Pollinator Identification System** using **YOLOv5** and **MERN Stack** (MongoDB, Express, React, Node.js).  
It detects pollinators in uploaded images and videos, providing insights on their presence and frequency.

---

## 🚀 How to Run This Project

Follow these steps to set up and run the project on your machine.

### 1️⃣ Prerequisites

Make sure you have the following installed:
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas account)
- Python 3.8+ with pip
- Git

### 2️⃣ Clone the YOLOv5 Repository

If you haven't already, clone the YOLOv5 repository next to this project:

```sh
git clone https://github.com/ultralytics/yolov5.git
```

### 3️⃣ Install Python Dependencies

Install the required Python packages for YOLOv5 model inference:

```sh
pip install torch torchvision numpy opencv-python pillow
cd yolov5
pip install -r requirements.txt
cd ..
```

### 4️⃣ Ensure the YOLOv5 Model (`best.pt`) is Available

- The `best.pt` model file should be inside the `backend/` folder.
- If it is missing, download or place your trained YOLOv5 model inside:

```
Pollinator_tracker/
│── backend/
│   ├── best.pt  ✅ (Place the model file here)
```

### 5️⃣ Set Up MongoDB

Make sure MongoDB is running locally on the default port (27017), or update the `.env` file with your MongoDB connection string.

### 6️⃣ Install Backend Dependencies and Start Server

```sh
cd backend
npm install
npm start
```

The server should start at http://localhost:5000

### 7️⃣ Install Frontend Dependencies and Start React App

```sh
cd frontend
npm install
npm run dev
```

The React app should start at http://localhost:5173

### 8️⃣ Open the App in Your Browser

Navigate to:
```
http://localhost:5173
```

---

## 📚 Features

- ✅ Upload and process both **images** and **videos** for pollinator detection
- ✅ YOLOv5 deep learning model for accurate detection
- ✅ Video processing with frame extraction and analysis
- ✅ Statistical analysis of detected pollinators
- ✅ MongoDB for data persistence
- ✅ Clean, modern UI with React

---

## 🛠️ Technologies Used

- **Frontend**: React, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Machine Learning**: YOLOv5 (PyTorch)
- **Video Processing**: OpenCV

---

## 📁 Project Structure

```
Pollinator_tracker/
│── backend/             # Express.js Backend
│   ├── scripts/         # Python scripts for YOLOv5 processing
│   ├── uploads/         # Stores uploaded files and results
│   ├── routes/          # API routes
│   ├── models/          # MongoDB models
│   ├── server.js        # Main Express server
│   └── best.pt          # YOLOv5 model
│
│── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── api.js       # API integration
│   │   └── ...
│   └── ...
│
│── yolov5/              # YOLOv5 repository (cloned separately)
```