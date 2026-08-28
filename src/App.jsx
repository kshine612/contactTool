import { useState } from "react";
import "./App.css";

function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Clean the phone number
  const getCleanPhone = () => {
    return phone.replace(/[^\d+]/g, "");
  };

  // Validate phone number
  const validatePhone = () => {
    const cleanPhone = getCleanPhone();

    if (!cleanPhone) {
      alert("Please enter a phone number.");
      return false;
    }

    // Basic validation
    const digits = cleanPhone.replace(/\D/g, "");

    if (digits.length < 7) {
      alert("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  // CALL
  const handleCall = async () => {
    if (!phone.trim()) {
      alert("Please enter a phone number.");
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost:5000/api/make-call",
        {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
  
          body: JSON.stringify({
            phone: phone,
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to make call"
        );
      }
  
      alert("Call initiated successfully!");
  
      console.log("Call SID:", data.sid);
  
    } catch (error) {
      console.error(error);
  
      alert(
        error.message ||
          "Something went wrong while making the call."
      );
    }
  };

  // SMS
  const handleSMS = async () => {
    if (!phone.trim()) {
      alert("Please enter a phone number.");
      return;
    }
  
    // if (!message.trim()) {
    //   alert("Please enter a message.");
    //   return;
    // }
  
    try {
      const response = await fetch(
        "http://localhost:5000/api/send-sms",
        {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
  
          body: JSON.stringify({
            phone: phone,
            message: message,
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to send SMS"
        );
      }
  
      alert("SMS sent successfully!");
  
      console.log(
        "Twilio SID:",
        data.sid
      );
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        error.message ||
          "Something went wrong."
      );
    }
  };

  // WHATSAPP
  const handleWhatsApp = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/send-whatsapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const data = await response.json();
  
      console.log("WhatsApp response:", data);
  
      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "WhatsApp message failed"
        );
      }
  
      alert(
        "WhatsApp message sent successfully!"
      );
  
    } catch (error) {
      console.error(
        "WhatsApp Error:",
        error
      );
  
      alert(error.message);
    }
  };

  // COPY NUMBER
  const handleCopy = async () => {
    if (!phone) {
      alert("Please enter a phone number.");
      return;
    }

    try {
      await navigator.clipboard.writeText(phone);
      alert("Phone number copied!");
    } catch {
      alert("Unable to copy the number.");
    }
  };

  // CLEAR
  const handleClear = () => {
    setPhone("");
    setMessage("");
  };

  return (
    <div className="app">
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <main className="card">

        {/* Header */}
        <div className="header">
          <div className="logo">
            <span>☎</span>
          </div>

          <h1>Contact Tool</h1>

          <p>
            Quickly call, message or WhatsApp
            any phone number.
          </p>
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number
          </label>

          <div className="input-wrapper">
            <span className="input-icon">📱</span>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              autoComplete="tel"
            />

            {phone && (
              <button
                className="copy-button"
                onClick={handleCopy}
                title="Copy number"
              >
                📋
              </button>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="message">
              Message
            </label>

            <span className="character-count">
              {message.length}/1000
            </span>
          </div>

          <textarea
            id="message"
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setMessage(e.target.value);
              }
            }}
            placeholder="Enter your message..."
            maxLength={1000}
          />
        </div>

        {/* Action Buttons */}
        <div className="actions">

          <button
            className="action-button call-button"
            onClick={handleCall}
          >
            <span className="button-icon">📞</span>

            <span>
              <strong>Call</strong>
              <small>Open dialer</small>
            </span>
          </button>

          <button
            className="action-button sms-button"
            onClick={handleSMS}
          >
            <span className="button-icon">💬</span>

            <span>
              <strong>SMS</strong>
              <small>Open messages</small>
            </span>
          </button>

          <button
            className="action-button whatsapp-button"
            onClick={handleWhatsApp}
          >
            <span className="button-icon">🟢</span>

            <span>
              <strong>WhatsApp</strong>
              <small>Open WhatsApp</small>
            </span>
          </button>

        </div>

        {/* Clear */}
        {(phone || message) && (
          <button
            className="clear-button"
            onClick={handleClear}
          >
            Clear
          </button>
        )}

        {/* Footer */}
        <div className="footer">
          <span>🔒</span>
          <span>
            Your phone number and message are not
            stored by this website.
          </span>
        </div>

      </main>
    </div>
  );
}

export default App;
