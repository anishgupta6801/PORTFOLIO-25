# Anish Kumar Portfolio

A professional portfolio website with contact form functionality and an admin panel to view submissions.

## Features

- Responsive design that works on all devices
- Dark mode toggle with localStorage persistence
- Mobile-friendly navigation with hamburger menu
- Contact form with data storage
- Admin panel to view contact form submissions
- 3D profile picture section
- Detailed skills and projects sections

## Step-by-Step Guide to Run the Program

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Installation and Setup

1. **Download or Clone the Project**
   - Download the project files to your computer
   - Extract the files if downloaded as a ZIP

2. **Install Dependencies**
   - Open a command prompt or terminal
   - Navigate to the project folder:

     ```bash
     cd path/to/ANISH\ PORTFOLIO
     ```

   - Install the required packages:

     ```bash
     npm install
     ```
   - This will install Express, CORS, and other dependencies

3. **Start the Server**
   - In the same terminal, run:

     ```bash
     node server-simple.js
     ```

   - You should see the message: "Server running on port 5000"
   - Keep this terminal window open while using the portfolio

4. **Access the Portfolio**
   - Open your web browser
   - Go to: `http://localhost:5000/newport.html`
   - The portfolio website should now be displayed

### Using the Contact Form

1. **Navigate to the Contact Section**
   - Scroll down to the "GET IN TOUCH" section
   - Or click "CONTACT" in the navigation menu

2. **Fill Out the Form**
   - Enter your name
   - Enter your email address
   - Type your message
   - Click the "SEND MESSAGE" button

3. **Submission Confirmation**
   - After submitting, you'll see a success message
   - Your submission is now stored in the system

## Accessing the Admin Panel

The admin panel allows you to view all contact form submissions.

1. **Open the Admin Panel**
   - In your web browser, go to: `http://localhost:5000/admin.html`
   - Or add "/admin.html" to the end of your portfolio URL

2. **View Submissions**
   - All contact form submissions will be displayed
   - Submissions are sorted with the newest ones at the top
   - Each submission shows:
     - Name of the person
     - Email address
     - Message content
     - Date and time of submission

3. **Return to Portfolio**
   - Click the "Back to Portfolio" link in the top-right corner

## How Data is Stored

- Contact form submissions are stored in a file called `contact-submissions.json`
- This file is automatically created in your project folder
- Each submission includes name, email, message, and timestamp
- No database setup is required with this simplified version

## Troubleshooting

### Server Won't Start

- Make sure Node.js is properly installed
- Check if port 5000 is already in use by another application
- Try changing the port in the `.env` file if needed

### Can't Access the Portfolio

- Ensure the server is running (terminal shows "Server running on port 5000")
- Check that you're using the correct URL (`http://localhost:5000/newport.html`)
- Try a different browser if issues persist

### Form Submission Errors

- Make sure all fields are filled out
- Check your internet connection
- Ensure the server is still running

## Advanced: MongoDB Integration

If you want to use MongoDB instead of the JSON file storage:

1. Install MongoDB locally or set up a MongoDB Atlas account
2. Update the `.env` file with your MongoDB connection string
3. Run `node server.js` instead of `server-simple.js`

Detailed MongoDB setup instructions are available in the `MONGODB_SETUP.md` file.

## Project Structure

- `newport.html` - Main portfolio page
- `newport.css` - Styles for the portfolio
- `newport.js` - Client-side JavaScript
- `server-simple.js` - Express server with JSON file storage
- `server.js` - Express server with MongoDB integration
- `admin.html` - Admin panel to view contact submissions
- `contact-submissions.json` - File where form submissions are stored

## License

MIT
