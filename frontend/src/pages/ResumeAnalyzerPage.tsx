import { useState } from "react";
import ResumeComponent from "../components/ResumeComponent";
import { postResume } from "../services/resumeService";
import styled from "styled-components";
import JobDescriptionComponent from "../components/JobDescriptionComponent";
import { postAnalysis } from "../services/analysisService";
import { AnalysisRequest, AnalysisResponse } from "../types/analysis.types";
import { ResumeUploadResponse } from "../types/resume.types";
import AnalysisResultComponent from "../components/AnalysisResultComponent";

const ResumePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 20%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: rgb(136, 174, 223);
  color: white;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgb(108, 145, 194);
  }

  &:disabled {
    background-color: rgb(200, 200, 200);
    color: rgb(120, 120, 120);
    cursor: not-allowed;
  }
`;

function ResumeAnalyzerPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  function handleSetJobDescription(newJobDescription: string) {
    console.log(newJobDescription);
    setJobDescription(newJobDescription);
  }

  function handleSetResume(file: File) {
    setResume(file);
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      if (resume) {
        const formData = new FormData();
        formData.append("file", resume);
        const response = (await postResume(formData)) as ResumeUploadResponse;

        const analysisData: AnalysisRequest = {
          resumeId: response._id,
          jobDescription: jobDescription,
        };

        const analysisResponse = (await postAnalysis(
          analysisData
        )) as AnalysisResponse;
        setAnalysisResult(analysisResponse);
      }
    } catch (error) {
      console.log("Error uploading resume");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ResumePage>
        <ResumeComponent handleSetResume={handleSetResume} />

        <JobDescriptionComponent
          handleSetJobDescription={handleSetJobDescription}
          jobDescription={jobDescription}
        />
      </ResumePage>
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !resume || !jobDescription}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </Button>

      <AnalysisResultComponent
        analysis={analysisResult}
        isLoading={isLoading}
      />
    </>
  );
}

export default ResumeAnalyzerPage;
