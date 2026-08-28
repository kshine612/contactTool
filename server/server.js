import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

console.log(
  "Account SID loaded:",
  !!process.env.TWILIO_ACCOUNT_SID
);

console.log(
  "Auth Token loaded:",
  !!process.env.TWILIO_AUTH_TOKEN
);

console.log(
  "Twilio Number loaded:",
  !!process.env.TWILIO_PHONE_NUMBER
);

// Send SMS
app.post("/api/send-sms", async (req, res) => {
  try {
    const { phone, message } = req.body;

    // Validate phone
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Validate message
    // if (!message) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Message is required",
    //   });
    // }

    // Clean phone number
    let cleanPhone = phone.replace(/[^\d+]/g, "");

    // Convert Indian 10-digit number
    // 9876543210
    // →
    // +919876543210
    if (
      cleanPhone.length === 10 &&
      !cleanPhone.startsWith("+")
    ) {
      cleanPhone = "+91" + cleanPhone;
    }

    // If user enters 919876543210
    if (
      cleanPhone.length === 12 &&
      cleanPhone.startsWith("91")
    ) {
      cleanPhone = "+" + cleanPhone;
    }

    // Basic validation
    if (
      !cleanPhone.startsWith("+") ||
      cleanPhone.length < 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid phone number.",
      });
    }

    console.log("Sending SMS...");
    console.log("To:", cleanPhone);
    console.log("Message:", message);

    // Send using Twilio
    const twilioMessage = await client.messages.create({
      body: "sms_customer_support",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: cleanPhone,
    });

    console.log(
      "Twilio Message SID:",
      twilioMessage.sid
    );

    return res.status(200).json({
      success: true,
      message: "SMS submitted successfully!",
      sid: twilioMessage.sid,
      status: twilioMessage.status,
    });

  } catch (error) {

    console.error(
      "Twilio Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to send SMS",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Backend running at http://localhost:${PORT}`
  );
});

// Make a phone call
app.post("/api/make-call", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    let cleanPhone = phone.replace(/[^\d+]/g, "");

    // Convert Indian 10-digit number
    if (
      cleanPhone.length === 10 &&
      !cleanPhone.startsWith("+")
    ) {
      cleanPhone = "+91" + cleanPhone;
    }

    // Convert 91XXXXXXXXXX
    if (
      cleanPhone.length === 12 &&
      cleanPhone.startsWith("91")
    ) {
      cleanPhone = "+" + cleanPhone;
    }

    console.log("Calling:", cleanPhone);

    const call = await client.calls.create({
      to: cleanPhone,
    
      from: process.env.TWILIO_PHONE_NUMBER,
    
      url: "https://webhooks.twilio.com/v1/Voice/Template/voice_text_to_speech",
    });

    console.log("Call SID:", call.sid);

    res.json({
      success: true,
      message: "Call initiated successfully",
      sid: call.sid,
      status: call.status,
    });

  } catch (error) {
    console.error("Twilio Call Error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to make call",
    });
  }
});

app.post("/api/send-whatsapp", async (req, res) => {
  try {
    console.log("===== WHATSAPP =====");

    console.log(
      "From:",
      process.env.TWILIO_WHATSAPP_FROM
    );

    console.log(
      "To:",
      process.env.TWILIO_WHATSAPP_TO
    );

    console.log(
      "Content SID:",
      process.env.TWILIO_WHATSAPP_CONTENT_SID
    );

    const whatsappMessage = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,

      to: process.env.TWILIO_WHATSAPP_TO,

      contentSid:
        process.env.TWILIO_WHATSAPP_CONTENT_SID
    });

    console.log(
      "WhatsApp sent successfully!"
    );

    console.log(
      "Message SID:",
      whatsappMessage.sid
    );

    res.json({
      success: true,
      sid: whatsappMessage.sid,
      status: whatsappMessage.status
    });

  } catch (error) {
    console.error(
      "WhatsApp Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
      code: error.code
    });
  }
});