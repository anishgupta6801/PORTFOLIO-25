const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Contact schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        
        // Create new contact
        const newContact = new Contact({
            name,
            email,
            message
        });
        
        // Save to database
        await newContact.save();
        
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// API endpoint to get all contacts (protected in a real app)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
