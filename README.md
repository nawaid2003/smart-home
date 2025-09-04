# 🏠 Smart Home Application

Welcome to the **Smart Home Application**! A modern, React-based web app that simulates a comprehensive smart home environment with beautiful UI and interactive controls. Manage rooms, control devices with precision, and monitor your home's energy consumption—all with real-time weather integration.

![Smart Home Demo](https://via.placeholder.com/800x400/1f2937/10b981?text=Smart+Home+Dashboard)

---

## ✨ Features

### 🌡️ **Live Weather Integration**
- Real-time weather data for your location
- Temperature display with Celsius/Fahrenheit toggle
- Current weather conditions with intuitive icons

### 🏠 **Advanced Room Management**
- **Horizontal scrolling** through rooms with stunning visuals
- **Room cards** with custom background images and icons
- **Active device counter** for each room
- **Smooth animations** powered by Framer Motion

### 🎛️ **Interactive Device Controls** ⭐ **NEW!**
- **Click-to-control interface**: Tap any active device to open its control modal
- **Device-specific controls** with beautiful, animated interfaces:
  - 💡 **Lights & Lamps**: Brightness control (0-100%)
  - 📺 **TV & Monitors**: Volume control (0-100%)
  - 🌀 **Fans**: Speed levels (1-5)
  - ❄️ **AC Units**: Temperature control (16-30°C)
  - 🔥 **Ovens**: Temperature control (100-250°C)
  - 🧊 **Fridges**: Temperature control (-5 to 10°C)
- **Preset buttons**: Quick Low/Med/High settings for each device
- **Real-time updates**: Instant visual feedback and value persistence
- **Custom sliders**: Beautiful, responsive range controls with gradient fills

### 📊 **Energy Dashboard**
- **Live energy monitoring** based on active devices
- **Consumption estimates** with visual indicators
- **Device usage statistics** and efficiency insights

### 📱 **Responsive Design**
- **Mobile-first approach** with touch-friendly controls
- **Desktop optimization** with hover effects and smooth transitions
- **Dark mode support** with automatic time-based switching
- **Accessibility features** with proper ARIA labels and keyboard navigation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- WeatherAPI account ([Get your free API key](https://www.weatherapi.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-home-app.git
   cd smart-home-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the project root:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🖥️ Usage Guide

### 🏠 **Room Navigation**
1. **Browse rooms** by scrolling horizontally through the room cards
2. **Click a room** to view all its devices and current status
3. **Monitor activity** with the real-time device counter

### 🎛️ **Device Control** ⭐ **Enhanced Experience**
1. **Toggle devices** using the elegant switch buttons
2. **Advanced controls**: Click any **active** (green) device to open its control modal
3. **Precision adjustment**: Use the interactive slider for fine-tuned control
4. **Quick presets**: Tap Low/Med/High buttons for instant settings
5. **Visual feedback**: Watch values update in real-time across the interface

### 🌤️ **Weather Monitoring**
- View **live weather conditions** in the top dashboard
- **Switch temperature units** between Celsius and Fahrenheit
- **Location-based data** (currently set to Bangalore, easily customizable)

### ⚡ **Energy Tracking**
- Monitor **real-time energy consumption**
- Track **device efficiency** and usage patterns
- **Optimize energy usage** based on live feedback

---

## 📊 Data Architecture

### Room Structure
```javascript
{
  name: "Living Room",           // Display name
  devices: [...deviceArray],     // Array of device objects
  icon: "MdHome",               // React icon name
  bgImage: "url/to/image.jpg",  // Background image URL
  activeCount: 3                // Auto-calculated active devices
}
```

### Device Structure
```javascript
{
  id: 1,                    // Unique identifier
  name: "Smart Light",      // Display name
  icon: "MdLightbulb",     // React icon name
  isOn: true,              // Power state
  type: "light",           // Device category
  value: 75                // Control value (brightness/temp/speed)
}
```

### Supported Device Types
| Type | Control Property | Range | Unit | Default |
|------|-----------------|-------|------|---------|
| `light`, `lamp` | Brightness | 0-100 | % | 75 |
| `tv`, `monitor` | Volume | 0-100 | % | 45 |
| `fan` | Speed | 1-5 | Level | 3 |
| `ac` | Temperature | 16-30 | °C | 22 |
| `oven` | Temperature | 100-250 | °C | 180 |
| `fridge` | Temperature | -5 to 10 | °C | 4 |

---

## 🛠️ Tech Stack

### **Core Technologies**
- **⚛️ React 18** - Modern UI library with hooks
- **⚡ Vite** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS** - Utility-first CSS framework

### **Enhanced Features**
- **✨ Framer Motion** - Smooth animations and transitions
- **📡 Axios** - HTTP client for weather API integration
- **🎯 React Icons** - Comprehensive icon library
- **🏪 Context API** - State management with persistence
- **📱 Responsive Design** - Mobile-first approach

### **Development Tools**
- **🔧 ESLint** - Code linting and formatting
- **🎯 PropTypes** - Runtime type checking
- **💾 LocalStorage** - Data persistence

---

## 📂 Project Architecture

```
smart-home-app/
├── 📁 src/
│   ├── 📄 App.jsx                    # Main application component
│   ├── 📁 context/
│   │   └── 📄 SmartHomeContext.jsx   # Global state management
│   ├── 📁 components/
│   │   ├── 📄 Dashboard.jsx          # Weather & energy dashboard
│   │   ├── 📄 RoomsList.jsx          # Room navigation component
│   │   └── 📄 DevicesGrid.jsx        # Device control interface ⭐
│   ├── 📄 index.css                  # Global styles & Tailwind imports
│   └── 📄 main.jsx                   # Application entry point
├── 📁 public/                        # Static assets
├── 📄 .env                          # Environment variables
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tailwind.config.js            # Tailwind configuration
├── 📄 vite.config.js                # Vite configuration
└── 📄 README.md                     # This file
```

---

## 🎨 Key Components

### **DevicesGrid.jsx** ⭐ **Star Feature**
The crown jewel of our application featuring:
- **Interactive modal controls** with device-specific interfaces
- **Smooth animations** and responsive design
- **Real-time value updates** with visual feedback
- **Preset functionality** for quick device adjustments
- **Type-safe prop validation** and error handling

### **SmartHomeContext.jsx**
Centralized state management providing:
- **Device state persistence** with localStorage
- **Real-time updates** across all components
- **Energy calculation** and room statistics
- **Weather data integration**

### **Dashboard.jsx**
Information hub featuring:
- **Live weather display** with unit conversion
- **Energy consumption tracking**
- **System status indicators**

---

## 🚀 Performance Features

- **⚡ Lazy loading** for optimal bundle size
- **🔄 State persistence** with localStorage
- **📱 Mobile optimization** with touch events
- **🎭 Smooth animations** without performance impact
- **🔍 Error boundaries** for robust user experience

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💻 Make your changes**
4. **✅ Test thoroughly**
5. **📝 Commit with descriptive messages**
   ```bash
   git commit -m "✨ Add amazing new feature"
   ```
6. **🚀 Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **🔄 Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and conventions
- Add PropTypes for new components
- Include responsive design considerations
- Test on both desktop and mobile devices
- Update documentation for new features

---

## 📋 Roadmap

- [ ] **🔐 User Authentication** - Multiple home profiles
- [ ] **📈 Analytics Dashboard** - Historical energy data
- [ ] **🔔 Smart Notifications** - Device alerts and schedules
- [ ] **🌍 Multi-location Support** - Multiple weather locations
- [ ] **🎮 Voice Control** - Speech recognition integration
- [ ] **📊 Advanced Energy Insights** - AI-powered recommendations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **WeatherAPI** for reliable weather data
- **React Icons** for the comprehensive icon library
- **Framer Motion** for smooth animation capabilities
- **Tailwind CSS** for the utility-first styling approach

---
