import { useState } from "react";
import ResumeComponent from "../components/ResumeComponent";
import styled from "styled-components";
import JobDescriptionComponent from "../components/JobDescriptionComponent";
import { AnalysisRequest, AnalysisResponse } from "../types/analysis.types";
import AnalysisResultComponent from "../components/AnalysisResultComponent";
import { postAnalysis } from "../services/analysisService";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const ResumePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !jobDescription) return;

    setIsLoading(true);
    try {
      const analysisRequestData: AnalysisRequest = {
        resume: resume,
        jobDescription: jobDescription,
      };

      const response = (await postAnalysis(
        analysisRequestData
      )) as AnalysisResponse;

      setAnalysisResult(response);
    } catch (error) {
      console.log(error);
      console.log("Error analyzing resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Heading>Resume Analyzer</Heading>
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
    </PageContainer>
  );
}

export default ResumeAnalyzerPage;
