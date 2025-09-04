# Smart Home Application

Welcome to the Smart Home Application! This is a React-based web app that simulates a smart home environment. It lets users manage rooms and devices like lights, fans, TVs, ACs, ovens, and fridges. Each device can be toggled on/off and supports custom controls (brightness, volume, temperature, or speed). The app also fetches live weather data for Bangalore.

---

## 🌟 Features

- **Live Weather**: Fetches real-time weather data for Bangalore (temperature + conditions).
- **Room Management**: Scroll through rooms with icons, background images, and active device counts.
- **Device Control**:
  - Toggle devices **On/Off**.
  - Open a **device control modal** with sliders:
    - Lights & Lamps → Brightness (0–100%)
    - TV → Volume (0–100%)
    - Fan → Speed (1–5)
    - AC → Temperature (16–30 °C)
    - Oven → Temperature (100–250 °C)
    - Fridge → Temperature (−5–10 °C)
  - Each device starts with sensible default values.
- **Energy Usage**: Displays estimated consumption based on active devices.
- **Responsive UI**: Works on desktop and mobile, with smooth animations via **framer-motion**.

---

## 🚀 Installation

1. **Clone the repository**
   
   git clone https://github.com/your-username/smart-home-app.git
   cd smart-home-app


2. **Install dependencies**

   npm install
  

3. **Set environment variables**

   - Create a .env file in the project root.
   - Add your [WeatherAPI](https://www.weatherapi.com/) key:

     VITE_WEATHER_API_KEY=your_api_key_here


4. **Run the app**

   npm run dev

   Then open http://localhost:5173.

---

## 🖥️ Usage

- **Browse Rooms** → Scroll horizontally and click a room to view its devices.
- **Toggle Devices** → Click a device to open its control card. Use the toggle button to turn it On/Off.
- **Weather Info** → See live weather in Bangalore. Switch units between Celsius and Fahrenheit.
- **Energy Dashboard** → Track energy usage based on currently active devices.

---

## 📊 Data Structure

Rooms and devices are defined in mock data (initialRooms) and stored in context.

### Room object

- name – Room name
- devices – Array of devices
- icon – Icon name (from react-icons/md)
- bgImage – Background image URL
- activeCount – Number of active devices

### Device object

- id – Unique number
- name – Device name
- icon – Icon name (e.g. "MdLightbulb")
- isOn – Boolean state
- type – "light" | "lamp" | "tv" | "fan" | "ac" | "oven" | "fridge"
- value – Current slider value (brightness, temp, etc.)

📌 Example:

{
  "id": 1,
  "name": "Smart Light",
  "icon": "MdLightbulb",
  "isOn": true,
  "type": "light",
  "value": 70
}


---

## 🛠️ Tech Stack

- **React** – UI library
- **Vite** – Fast dev server
- **Tailwind CSS** – Styling
- **Framer Motion** – Animations
- **Axios** – Weather API requests
- **React Icons** – Device/room icons

---

## 📂 Project Structure

smart-home-app/
├── src/
│   ├── App.jsx
│   ├── context/
│   │   └── SmartHomeContext.jsx
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── RoomsList.jsx
│   │   ├── DevicesGrid.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.js
└── README.md


---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: git checkout -b feature/my-feature
3. Commit: git commit -m "Added my feature"
4. Push: git push origin feature/my-feature
5. Open a PR

---
