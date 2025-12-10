// controllers/contactController.js
import { awsSES } from "../Config/AWS.js";
import emailTemplate from "../Helpers/emailTemplate.js";

export const contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Email body HTML
    const body = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    const params = emailTemplate(
      "wheeelspot@gmail.com",       // admin email to receive contact messages
      "New Contact Form Message",
      body
    );

    await awsSES.sendEmail(params).promise();

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};
