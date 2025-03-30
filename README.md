# NeXJob - Next Generation Job Portal

NeXJob is a modern, full-stack job portal application that connects job seekers with recruiters, featuring advanced ATS (Applicant Tracking System) capabilities and real-time interview scheduling.

## Features

### For Job Seekers
- Create and manage professional profiles
- Build and customize resumes with a modern builder
- Track application status in real-time
- Receive ATS compatibility scores for applications
- Schedule and attend virtual interviews
- View job market analytics and trends

### For Recruiters
- Post and manage job listings
- Review applications with ATS scoring
- Schedule and conduct virtual interviews
- Track candidate progress through the hiring pipeline
- Access job market insights and analytics
- Manage company profiles and branding

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Lucide icons for UI elements
- Axios for API communication
- Context API for state management

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Cloudinary for file storage
- Python scripts for data processing
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Python 3.x
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/NeXJob.git
cd NeXJob
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
Create `.env` files in both frontend and backend directories with the following variables:

Frontend (.env):
```
VITE_API_URL=http://localhost:5000
```

Backend (.env):
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
NeXJob/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.js
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/logout

### Jobs
- GET /api/jobs
- POST /api/jobs
- GET /api/jobs/:id
- PUT /api/jobs/:id
- DELETE /api/jobs/:id

### Applications
- POST /api/application/apply
- GET /api/application/jobapplicants/:jobId
- GET /api/application/getall
- PATCH /api/application/status/:id

### Interviews
- POST /api/interview/schedule-interview
- GET /api/interview/:id

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Lucide Icons for the beautiful icon set
- Tailwind CSS for the styling framework
- MongoDB for the database solution
- Cloudinary for file storage services
