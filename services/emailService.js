const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const path = require('path');
const fs = require('fs');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendRequestConfirmationEmail(reqBody) {

    const filePath = path.join(__dirname, '..','assets' , `palmx.png`);
    const { name, email } = reqBody;
    const currentYear = new Date().getFullYear();
    let attachment;

  fs.readFile(filePath, async (err, fileBuffer) => {
    if (err) {
      throw err;
    }

    try {
      const base64Image = fileBuffer.toString("base64");

      attachment = {
        content: base64Image,
        filename: `palmx-logo.jpeg`,
        type: "image/jpeg",
        disposition: "inline",
        content_id: "companylogo",
      };



const htmlBody = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>PalmX – Application Request Received</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 30px;
      }

      .header {
        background-color: #191919;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .content {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
        font-size: 16px;
      }

      .steps {
list-style: none;  
        margin: 0;
        padding: 0;
        margin-top: 20px;
        padding-left: 20px;
      }
      .steps li {
        margin-bottom: 10px;
      }
      .footer {
        font-size: 13px;
        background: #777777;
        color: #dddddd;
        text-align: center;
        padding: 20px;
        border-top: 1px solid #dddddd;
      }
    </style>
  </head>
  <body>
    <div class="container">
    <div class="header">
          <img 
            src="cid:companylogo" 
            alt="PalmX Logo" 
            width="100" 
            height="100" 
            style="width: 100px; height: 100px; border-radius: 100px; display: flex; align-self: flex-start; margin-right: 40px; "
          />
          <div style="align-self: center;">
              Thank You for Reaching Out
          </div>
      </div>
      <div class="content">
        <p>Dear ${name},</p>
        <p>
          Thank you for submitting your request to <strong>PalmX – Empowering Innovation</strong>. We're excited to learn more about your project and look forward to collaborating with you.
        </p>
        <p>
          Here’s what happens next:
        </p>
        <ul class="steps">
          <li><strong>1.</strong> We review your submitted requirements.</li>
          <li><strong>2.</strong> Our experts will analyze your needs in detail.</li>
          <li><strong>3.</strong> You’ll receive a comprehensive proposal tailored to your goals.</li>
          <li><strong>4.</strong> Upon your approval, we kick off the project!</li>
        </ul>
        <p>
          If you have any questions in the meantime, feel free to reach out to us at
          <a href="mailto:info@palmx.io">info@palmx.io</a>.
        </p>
        <p>Warm regards,<br />The PalmX Team</p>
      </div>
      <div class="footer">
        &copy; ${currentYear} PalmX – Empowering Innovation. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
    const msg = {
            to: email,
            from: process.env.EMAIL_SENDER,
            subject: "PalmX – Application Request Received",
            html: htmlBody,
            attachments: [attachment],
        };
      

      const response = await sgMail.send(msg);
      return response;
    } catch (error) {
      throw error;
    }
  });
}


module.exports = { sendRequestConfirmationEmail };