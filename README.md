# 🚀 Apna Video - A Zoom Clone Built with WebRTC!

👉 [Try it out here](https://zoom-clone-client.onrender.com)

Welcome to **Apna Video**! 🎉  
This is a real-time video conferencing app, built from scratch using **WebRTC** for seamless peer-to-peer communication. Inspired by platforms like **Zoom** and **Google Meet**, this project helped me dive deep into building the core of real-time communication systems.

---

### 🔧 Tech Stack

Here’s the technology stack that powers **Apna Video**:

- **Frontend**:  
  - React.js – For building an interactive UI
  - Material UI – For stylish and responsive design components
  - Socket.IO – For real-time signaling and chat
  - Axios – For making API requests

- **Backend**:  
  - Node.js + Express – For handling backend logic and REST API routes
  - MongoDB – For storing room/session data
  - WebRTC – For live video/audio streaming and screen sharing
  - Socket.IO – For real-time communication and signaling

---

### 📌 Features You’ll Find Inside

- 🎥 **One-on-one video conferencing** – Enjoy seamless video calls with friends or colleagues.
- 💬 **Real-time live chat** – Chat with users during calls.
- 🖥️ **Screen sharing support** – Share your screen for better collaboration.
- 🔗 **Unique room creation and joining functionality** – Create or join video rooms with just a link.
- ⚡ **Real-time communication** – Peer-to-peer connections for smooth video and audio quality.

---

### 💻 Getting Started

1. **Clone the Repository**  
   First, clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/zoom-clone.git
   cd zoom-clone
````

2. **Install Dependencies**
   For both the frontend and backend, install the necessary dependencies:

   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd backend
   npm install
   ```

3. **Run the App**
   Start the backend server and the frontend application in separate terminals:

   ```bash
   # For backend
   cd backend
   npm run dev   # Runs in development mode (with nodemon)

   # For frontend
   cd frontend
   npm start     # Starts the React development server
   ```

4. **Visit the App**
   Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the app.

---

### 🛠️ Scripts and Configuration

#### Frontend (`frontend/package.json`)

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

* **Dependencies**:

  * `react`, `react-dom`, `react-router-dom`, `axios`
  * `socket.io-client`, `@mui/material`, `@emotion/react`
  * and more...

#### Backend (`backend/package.json`)

```json
"scripts": {
  "dev": "nodemon src/app.js",
  "start": "node src/app.js",
  "prod": "pm2 src/app.js"
}
```

* **Dependencies**:

  * `express`, `mongoose`, `socket.io`, `cors`, `dotenv`
  * and more...

---

### 🧑‍💻 Developer Insights

This project was an exciting journey, especially when it came to learning how WebRTC works in real-time video and audio streaming. Here are some things I learned along the way:

* Building a **peer-to-peer connection** using WebRTC.
* Handling **media streams** and managing video/audio calls.
* Integrating **Socket.IO** for real-time signaling and communication.
* Working with **MongoDB** to store room data and manage user sessions.

---

### 🤝 Contributing

Feel free to contribute! If you have any suggestions or improvements, open an issue or submit a pull request. I'd love to hear your thoughts and ideas!

---

### 💬 Let’s Connect

* **GitHub**: [@singhmahipal](https://github.com/singhmahipal)
* **LinkedIn**: [Mahipal Singh](https://linkedin.com/in/mahipalsingh18)

---

### 📚 Learnings

This project gave me hands-on experience with full-stack development and real-time communication. I’m super excited to keep building and improving!

---

### 🏷️ Tags

#WebRTC #ReactJS #MongoDB #NodeJS #SocketIO #RealTimeCommunication #VideoConferencing #ScreenSharing #ZoomClone #FullStackDeveloper #LearningByBuilding

