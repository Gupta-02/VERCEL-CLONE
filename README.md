# Vercel Clone

A full-stack application that replicates core Vercel functionality, allowing users to deploy web applications with ease.

## 📋 Overview

This project is a clone of Vercel's deployment platform, providing a simplified but functional version of Vercel's core features. It allows users to upload projects, build them, and deploy them to the web with automatic CI/CD capabilities.

## 🏗️ Project Structure

The project is divided into several key components:

- **Frontend**: React-based UI for managing deployments and projects
- **Upload Service**: Handles project file uploads
- **Request Handler**: Routes requests to the appropriate deployed applications
- **Deployment Service**: Builds and deploys applications
- **Sample React App**: A demo application for testing the platform

## 🚀 Features

- **Project Upload**: Upload project files directly through the UI using Git Repo URLs
- **Automatic Builds**: Detect project type and run appropriate build commands
- **Deployment**: Deploy built applications to accessible URLs
- **View Project**: View your deployed projects
- **CI/CD Integration**: Automatic rebuilds on code changes

## 🛠️ Technologies Used

- **Frontend**: React Vite, TypeScript, TailwindCSS
- **Backend Services**: Node.js, Express.js
- **Cloud Storage**: AWS S3
- **Database & Caching**: Redis for deployment status tracking and queue management
- **Deployment**: Custom deployment engine
- **Styling**: TailwindCSS with shadcn UI components

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vercel-clone.git
   cd vercel-clone
   ```

2. Install dependencies for each service:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Upload Service
   cd ../upload
   npm install

   # Request Handler
   cd ../request\ handler
   npm install

   # Deployment Service
   cd ../deployment
   npm install
   ```

3. Compile the services:

   ```bash
   # Compile Upload Service
   cd ../upload
   tsc -b

   # Compile Request Handler
   cd ../request\ handler
   tsc -b

   # Compile Deployment Service
   cd ../deployment
   tsc -b
   ```

4. Start the services:

   ```bash
   # Start Frontend
   cd frontend
   npm run dev

   # Start Upload Service
   cd ../upload
   npm start

   # Start Request Handler
   cd ../request\ handler
   npm start

   # Start Deployment Service
   cd ../deployment
   npm start
   ```

## 🧪 Usage

1. Access the frontend at `http://localhost:5173` (or the port specified in your Vite config)
2. Upload the Git repo URL of your project
3. The system will automatically detect the project type, pull all the files from the repo and build it
4. Once built, your project will be deployed to a unique URL and you can view it at that URL

## 📝 Development

### Adding New Features

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
