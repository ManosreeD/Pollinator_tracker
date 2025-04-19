# 🐝 Pollinator Tracker - YOLOv5 Flask App

This project is a **Pollinator Identification System** using **YOLOv5** and **Flask**.  
It detects pollinators in uploaded images and provides insights on their presence and frequency.

---

## 🚀 How to Run This Project After Cloning

Follow these steps to set up and run the project on your machine.

### 1️⃣ Clone the Repository

First, download the project by running:

```sh
git clone https://github.com/ManosreeD/Pollinator_tracker.git
cd Pollinator_tracker
```

### 2️⃣ Set Up the Virtual Environment

Navigate to the `backend/` folder and create a virtual environment:

```sh
cd backend
python -m venv venv
```

Activate the virtual environment:
- **Windows (CMD or PowerShell)**

    ```sh
    venv\Scripts\activate
    ```

### 3️⃣ Ensure the YOLOv5 Model (`best.pt`) is Available

- The `best.pt` model file should be inside the `backend/` folder.
- If it is missing, download or place your trained YOLOv5 model inside:

    ```
    Pollinator_tracker/
    │── backend/
    │   ├── best.pt  ✅ (Place the model file here)
    │   ├── uploads/    # Stores Uploaded/Processed Images
    ```

### 4️⃣ Run the Flask Backend

Navigate to the `backend/` folder and start the Flask server:

```sh
cd backend
python app.py
```

If everything is correct, you should see:

```
Running on http://127.0.0.1:5000/
```

### 5️⃣ Open the Frontend

- **DO NOT use Live Server (it may cause refresh issues).**

- Instead, open `frontend/index.html` manually in your browser:
    - **Windows:** Right-click `index.html` → Open with Chrome  
    - **Mac/Linux:** Run:
        ```sh
        open frontend/index.html
        ```

---

## 📌 Additional Commands

### 🐍 If You Need to Exit the Virtual Environment

```sh
deactivate
```

---

## 🚀 Project Structure

```
Pollinator_tracker/
│── backend/        # Flask Backend (Runs the API)
│   ├── app.py      # Flask API File
│   ├── best.pt     # YOLOv5 Model (Must be added)
│   ├── uploads/    # Stores Uploaded/Processed Images
│
│── frontend/       # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│
│── yolov5/         # YOLOv5 (Cloned Separately)
│   ├── hubconf.py  
│   ├── models/
│   ├── utils/
│
│── README.md       # This Guide 🚀
```

---

## 🎯 Final Notes

✔ **Make sure `yolov5/` is cloned and `best.pt` is inside `backend/`.**  
✔ **Run `python app.py` in the `backend/` folder to start the server.**  
✔ **Open `frontend/index.html` manually in the browser.**  
✔ **Do not use Live Server to avoid auto-refresh issues.**  

🔥 **Now your project is fully set up!** If you face any issues, open an **issue in GitHub** or contact the project owner. 🚀😊