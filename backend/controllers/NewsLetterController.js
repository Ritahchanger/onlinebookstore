const nodemailer = require("nodemailer");
const sendBulkEmail = async (req, res) => {
  const { emails, subject, message } = req.body; // Assuming emails, subject, and message are in the request body

  // Validate request body
  if (!emails || !subject || !message) {
    return res
      .status(400)
      .json({
        error: "Emails, subject, and message are required in the request body",
      });
  }

  try {
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_PASSWORD,
      },
    });

    // Send email to multiple recipients
    const info = await transporter.sendMail({
      from: `"BEMI EDITORS LIMITED" <${process.env.COMPANY_EMAIL}>`,
      to: emails, // Array of recipient email addresses
      subject: subject,
      text: message,
      html: `
          <html>
            <head>
              <style>
                /* CSS styles */
                body {
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                }
                .container {
                  margin: 20px;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                  margin-bottom: 20px;
                }
                p {
                  margin-bottom: 10px;
                }
                a {
                  display: inline-block;
                  background-color: #4CAF50;
                  color: #fff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                }
                a:hover {
                  background-color: #45a049;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>${subject}</h1>
                <p>${message}</p>
              </div>
            </body>
          </html>
        `,
    });

    console.log("Bulk email sent:", info.response);
    res
      .status(200)
      .json({ success: true, message: "Bulk email sent successfully" });
  } catch (error) {
    console.error("Error sending bulk email:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to send bulk email" });
  }
};

module.exports = { sendBulkEmail };
