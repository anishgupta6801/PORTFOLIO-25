const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Path to the JSON file that will store contact submissions
const dataFilePath = path.join(__dirname, 'contact-submissions.json');

// Initialize the JSON file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
}

// API endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        
        // Create new contact submission
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            message,
            date: new Date().toISOString()
        };
        
        // Read existing submissions
        let submissions = [];
        try {
            const data = fs.readFileSync(dataFilePath, 'utf8');
            submissions = JSON.parse(data);
        } catch (error) {
            console.error('Error reading submissions file:', error);
            submissions = [];
        }
        
        // Add new submission
        submissions.unshift(newContact);
        
        // Write back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(submissions, null, 2));
        
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// API endpoint to get all contacts
app.get('/api/contacts', (req, res) => {
    try {
        // Read submissions from file
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const submissions = JSON.parse(data);
        
        res.status(200).json({ success: true, data: submissions });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
