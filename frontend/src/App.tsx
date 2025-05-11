import { useEffect } from "react";
import "./App.css";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import { getHealth } from "./services/healthService";

function App() {
  useEffect(() => {
    getHealth();
  }, []);

  return (
    <>
      <ResumeAnalyzerPage />
    </>
  );
}

export default App;
