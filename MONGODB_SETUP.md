# MongoDB Setup Guide

This guide will help you set up MongoDB for your portfolio contact form.

## Option 1: Local MongoDB Installation

### Windows Installation

1. Download the MongoDB Community Server from the [official website](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" installation
4. Install MongoDB as a service (recommended)
5. Install MongoDB Compass (the GUI for MongoDB)
6. Complete the installation

### Start MongoDB Service

1. MongoDB should start automatically as a service
2. Verify it's running by opening MongoDB Compass
3. Connect to `mongodb://localhost:27017`

### Configure Your Application

1. Use the following connection string in your `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/portfolio_contacts
```

## Option 2: MongoDB Atlas (Cloud Database)

MongoDB Atlas is a fully managed cloud database service that's free to get started.

### Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new organization and project

### Create a Cluster

1. Click "Build a Database"
2. Choose the free tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create Cluster" (this may take a few minutes)

### Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" for development (you can restrict this later)
4. Click "Confirm"

### Create a Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these securely)
4. Set user privileges to "Read and Write to Any Database"
5. Click "Add User"

### Get Your Connection String

1. Go to "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user's password
6. Replace `<dbname>` with `portfolio_contacts`

### Configure Your Application

1. Use the connection string in your `.env` file:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/portfolio_contacts?retryWrites=true&w=majority
```

## Verifying the Setup

1. Start your application with `npm start`
2. Submit a test message through the contact form
3. Check MongoDB Compass or Atlas to see if the data was saved
4. Visit the admin page at `/admin.html` to view submissions

## Troubleshooting

### Connection Issues

- Verify your MongoDB service is running
- Check your connection string for typos
- Ensure your IP address is whitelisted (for Atlas)
- Verify your username and password are correct

### Data Not Saving

- Check the server console for error messages
- Verify the form is submitting correctly (check browser console)
- Ensure your MongoDB user has write permissions
