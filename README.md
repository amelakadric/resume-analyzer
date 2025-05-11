# JobAlign AI - Resume Analyzer

JobAlign AI is an intelligent resume analysis tool that helps job seekers optimize their resumes for specific job descriptions. Using advanced AI technology, it provides detailed feedback on how well your resume matches a job posting and suggests improvements to increase your chances of landing your dream job.

## 🌟 Features

- **Resume Analysis**: Upload your resume in PDF or DOC format
- **Job Description Matching**: Compare your resume against any job description
- **Detailed Feedback**: Receive comprehensive analysis including:
  - Match percentage
  - Matching skills
  - Skill gaps
  - Improvement suggestions
- **Real-time Analysis**: Get instant feedback on your resume
- **User-friendly Interface**: Clean and intuitive design

## 🚀 Live Demo

Try the application live at: [JobAlign AI](https://jobalignai.netlify.app/)

## 🛠️ Tech Stack

### Frontend

- React with TypeScript
- Styled Components for styling
- Vite for build tooling
- Axios for API requests

### Backend

- NestJS (Node.js framework)
- TypeScript
- OpenAI API for analysis
- MongoDB for data storage

## 🏗️ Project Structure

```
resume-analyzer/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript type definitions
│   └── public/           # Static assets
│
└── backend/              # NestJS backend application
    ├── src/
    │   ├── analysis/    # Analysis module
    │   ├── common/      # Shared utilities
    │   └── main.ts      # Application entry point
    └── uploads/         # Temporary file storage
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Create `.env` file in the backend directory
   - Add your OpenAI API key and MongoDB connection string

### Running Locally

1. Start the backend server:

```bash
cd backend
npm run start:dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔧 Configuration

### Environment Variables

Backend (.env):

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
OPEN_API_KEY=your_openai_api_key
```

Frontend (.env):

```
VITE_API_URL=http://localhost:3000
```

## 🚀 Deployment

The application is deployed using:

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- The open-source community for the amazing tools and libraries
