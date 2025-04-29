import { useState } from "react";
import ResumeComponent from "../components/ResumeComponent";
import { postResume } from "../services/resumeService";
import styled from "styled-components";

const ResumePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

function ResumeAnalyzerPage() {
  const [resume, setResume] = useState<File | null>(null);

  function handleSetResume(file: File) {
    setResume(file);
  }

  async function handleResumeSubmit() {
    try {
      if (resume) {
        const formData = new FormData();
        formData.append("file", resume);
        const response = await postResume(formData);
      }
    } catch (error) {
      console.log("Error uploading resume");
    }
  }

  return (
    <>
      <ResumePage>
        <ResumeComponent
          handleSetResume={handleSetResume}
          handleSubmit={handleResumeSubmit}
        />

        <div>Job description component</div>
      </ResumePage>
    </>
  );
}

export default ResumeAnalyzerPage;
