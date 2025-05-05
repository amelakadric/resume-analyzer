import { useState } from "react";
import ResumeComponent from "../components/ResumeComponent";
import { postResume } from "../services/resumeService";
import styled from "styled-components";
import JobDescriptionComponent from "../components/JobDescriptionComponent";
import { postAnalysis } from "../services/analysisService";
import { AnalysisRequest, AnalysisResponse } from "../types/analysis.types";
import { ResumeUploadResponse } from "../types/resume.types";

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
  &:hover {
    background-color: rgb(108, 145, 194);
  }
  &.inactive {
    background-color: rgb(200, 200, 200);
    color: rgb(120, 120, 120);
    cursor: not-allowed;

    &:hover {
      background-color: rgb(200, 200, 200); /* No hover effect when inactive */
    }
  }
`;

function ResumeAnalyzerPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  function handleSetJobDescription(newJobDescription: string) {
    console.log(newJobDescription);
    setJobDescription(newJobDescription);
  }

  function handleSetResume(file: File) {
    setResume(file);
  }

  async function handleSubmit() {
    try {
      if (resume) {
        const formData = new FormData();
        formData.append("file", resume);
        const response = (await postResume(formData)) as ResumeUploadResponse;

        const analysisData: AnalysisRequest = {
          resumeId: response._id,
          jobDescription: jobDescription,
        };

        return (await postAnalysis(analysisData)) as AnalysisResponse;
      }
    } catch (error) {
      console.log("Error uploading resume");
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
        className={!jobDescription || !resume ? "inactive" : ""}
      >
        Analyze
      </Button>
    </>
  );
}

export default ResumeAnalyzerPage;
