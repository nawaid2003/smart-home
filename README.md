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
   ```bash
   git clone https://github.com/your-username/smart-home-app.git
   cd smart-home-app
   ```
