# SendText 📱

A lightweight web application that lets users interact with phone numbers through **SMS, voice calls, and WhatsApp** using a React + Vite frontend and Node.js + Express backend.

## ✨ Features

* 📱 **SMS** — Send SMS messages using Twilio.
* 📞 **Voice Calls** — Initiate phone calls using Twilio Voice.
* 💬 **WhatsApp** — Send WhatsApp messages using the Twilio WhatsApp Sandbox.
* 📋 **Copy Number** — Quickly copy the entered phone number.
* 🌐 **Responsive UI** — Simple and user-friendly interface.

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* Twilio SDK
* dotenv
* CORS

### APIs

* Twilio SMS API
* Twilio Voice API
* Twilio WhatsApp API

## 📁 Project Structure

```text
sendText/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── server/
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/sendtext.git
cd sendtext
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_voice_number

TWILIO_WHATSAPP_FROM=whatsapp:your_whatsapp_sender
TWILIO_WHATSAPP_TO=whatsapp:your_verified_recipient
TWILIO_WHATSAPP_CONTENT_SID=your_content_sid

PORT=5000
```

**Never commit your `.env` file or expose your Twilio credentials publicly.**

### 4. Start the backend

```bash
npm run server
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Start the frontend

Open another terminal:

```bash
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open that URL in your browser.

## 🔑 Twilio Setup

### SMS

The application uses Twilio's SMS API to send messages.

For a Twilio Trial account, SMS functionality is subject to Twilio's trial restrictions and verified-recipient requirements.

### Voice

The application uses the Twilio Voice API to initiate calls.

Trial accounts have restrictions on destinations and call functionality. The recipient may need to be verified in the Twilio Console.

### WhatsApp

The application currently uses the **Twilio WhatsApp Sandbox** for testing.

The Sandbox has restrictions:

* Sender is controlled by Twilio.
* Recipient must join/verify the Sandbox.
* Trial/Sandbox messages may require Twilio-approved templates.
* Production WhatsApp messaging requires additional WhatsApp Business configuration.

## 🔒 Security

Environment variables are used for Twilio credentials.

The following files should **never** be committed:

```text
.env
node_modules/
```

Make sure `.gitignore` contains:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
build/
*.log
```

If a Twilio Auth Token is accidentally exposed, rotate it immediately from the Twilio Console.

## 📡 Application Flow

```text
                 SendText
                    │
           ┌────────┼────────┐
           │        │        │
          SMS      Call   WhatsApp
           │        │        │
           └────────┼────────┘
                    ↓
                  Twilio
                    │
             Communication
                    │
                    ↓
             Mobile Device
```

## 🧪 Development

Run the frontend and backend separately:

### Terminal 1

```bash
npm run dev
```

### Terminal 2

```bash
npm run server
```

## 📌 Current Limitations

This project is currently configured primarily for **development and testing**.

Twilio Trial and WhatsApp Sandbox accounts have restrictions on:

* Recipient numbers
* Sender numbers
* Message templates
* International communication
* Voice functionality

For production usage, appropriate Twilio and WhatsApp Business configuration is required.

## 🔮 Future Improvements

* User authentication
* Contact management
* Call history
* SMS history
* WhatsApp history
* Message templates
* Delivery status tracking
* Scheduled messages
* Contact groups
* Production WhatsApp Business integration
* Deployment with HTTPS
* Rate limiting and API security

## 👩‍💻 Author

**Krissa Jiyani**

Built using React, Node.js, Express, and Twilio.

## 📄 License

This project is intended for educational and development purposes.
