const express = require('express');
const fs = require('fs');
const { fromFile } = require('file-type');
const path = require('path');
const cors = require('cors');
const multer = require('multer')
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const mime = require('mime-types');
const generateQRWithText = require('./services/qrGenerator');

const { sendRequestConfirmationEmail, sendAdminNotificationEmail } = require('./services/emailService');
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const ALLOWED_MIME_TYPES = [
  'application/pdf', // pdf
  'application/msword', // doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/vnd.ms-excel', // xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-powerpoint', // ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
  'text/plain', // txt
  'text/csv', // csv
  'application/rtf', // rtf
  'application/zip' // zip
];


// function fileFilter(req, file, cb) {
//   if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type'), false);
//   }
// }

// Multer
const uploadDir = path.join(__dirname, '/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + ext);
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max



//Route to serve your main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get('/api/site-data', (req, res) => {


    const lang = req.query.lang;


    let filePath = path.join(__dirname, 'site-data.json');
    if (lang === "DE") {
        filePath = path.join(__dirname, 'site-data-de.json');
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            // send back server error
            return res.status(500).json({ error: 'Failed to read the file' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Failed to parse JSON' });
        }

    })
});





app.post('/api/contact-us', upload.single('attachment'), async (req, res) => {

    try {
        const filePath = path.join(__dirname, 'request-data.json');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
        }

        let attachment = null;
        const { name, email, message } = req.body;

        if (req.file !== undefined && req.file !== null) {
            const attachfilePath = path.join(uploadDir, req.file.filename);
           const mimeType = req.file.mimetype;
           const fileTypeResult = await fromFile(attachfilePath);

            if (!fileTypeResult || !ALLOWED_MIME_TYPES.includes(fileTypeResult.mime)) {
                fs.unlinkSync(attachfilePath); // Delete invalid file
                return res.status(400).json({ error: 'File content does not match expected type.' });
            }

            attachment = {
                originalName: req.file.originalname,
                storedName: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
            };
        }


        const newEntry = {
            name,
            email,
            message,
            attachment,
            timestamp: new Date().toISOString()
        };

        const data = fs.readFileSync(filePath, 'utf-8');
        const requestData = JSON.parse(data);
        requestData.push(newEntry);
        fs.writeFileSync(filePath, JSON.stringify(requestData, null, 2), 'utf-8');


        await sendRequestConfirmationEmail(newEntry);

        await sendAdminNotificationEmail(newEntry);

        return res.status(201).json({ message: 'Your request created. Thank you for reaching out to us.' });

    } catch (err) {
        return res.status(500).json({ error: err })
    }

});



app.use((req, res, next) => {
  res.status(404).send('Not found');
});

app.use((req, res, next) => {
    console.log(`Received request for: ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
