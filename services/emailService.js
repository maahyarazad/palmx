require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

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

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
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
      table.container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 0;
        border-collapse: separate;
        border-spacing: 0;
      }
      td.header {
        background-color: #191919;
        color: #ffffff;
        padding: 20px;
        font-size: 22px;
        font-weight: bold;
        vertical-align: middle;
      }
      td.header img {
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        margin-right: 40px;
        width: 100px;
        height: 100px;
      }
      td.header div {
        display: inline-block;
        vertical-align: middle;
      }
      td.content {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
        font-size: 16px;
      }
      ul.steps {
        list-style: none;
        margin: 20px 0 0 20px;
        padding: 0;
      }
      ul.steps li {
        margin-bottom: 10px;
      }
      td.footer {
        font-size: 13px;
        background: #777777;
        color: #dddddd;
        text-align: center;
        padding: 20px;
        border-top: 1px solid #dddddd;
      }
      a {
        color: #1a73e8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <table class="container" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="header">
          <img 
            src="cid:companylogo" 
            alt="PalmX Logo"
            width="100" 
            height="100"
          />
          <div>Thank You for Reaching Out</div>
        </td>
      </tr>
      <tr>
        <td class="content">
          <p>Dear ${name},</p>
          <p>
            Thank you for submitting your request to <strong>PalmX – Empowering Innovation</strong>. We're excited to learn more about your project and look forward to collaborating with you.
          </p>
          <p>Here’s what happens next:</p>
          <ul class="steps">
            <li><strong>1.</strong> We review your submitted requirements.</li>
            <li><strong>2.</strong> Our experts will analyze your needs in detail.</li>
            <li><strong>3.</strong> You’ll receive a comprehensive proposal tailored to your goals.</li>
            <li><strong>4.</strong> Upon your approval, we kick off the project!</li>
          </ul>
          <p>
            If you have any questions in the meantime, feel free to reach out to us at
            <a href="mailto:info@palm-x.com">info@palmx.io</a>.
          </p>
          <p>Warm regards,<br />The PalmX Team</p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          &copy; ${currentYear} PalmX – Empowering Innovation. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`;


const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'PalmX – Application Request Received',
    html: htmlBody,
    attachments: [
      {
        filename: 'palmx-logo.jpeg',
        content: fileBuffer,
        cid: 'companylogo', // same as in HTML image src
        contentType: 'image/jpeg',
      },
    ],
  };

     const info = await transporter.sendMail(mailOptions);
     console.log(info);
    // const msg = {
    //         to: email,
    //         from: process.env.EMAIL_SENDER,
    //         subject: "PalmX – Application Request Received",
    //         html: htmlBody,
    //         attachments: [attachment],
    //     };
      

    //   const response = await sgMail.send(msg);
      return response;
    } catch (error) {
      throw error;
    }
  });
}


module.exports = { sendRequestConfirmationEmail };