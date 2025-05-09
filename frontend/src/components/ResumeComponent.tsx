import styled from "styled-components";
import ResumeViewerComponent from "./ResumeViewerComponent";
import { useState } from "react";

type ResumeComponentProps = {
  handleSetResume: (file: File) => void;
};

const Title = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  max-width: 31rem;
  line-height: 1.5;
`;

const Div = styled.div`
  margin: 1rem;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: block;
  width: 31rem;
  height: 200px;
  background-color: rgb(246, 243, 240);
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: #666;
`;

const UploadText = styled.span`
  color: #666;
  font-size: 1rem;
`;

function ResumeComponent({ handleSetResume }: ResumeComponentProps) {
  const [resumeUrl, setResumeUrl] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleSetResume(file);
      setResumeUrl(URL.createObjectURL(file));
    } else {
      setResumeUrl("");
    }
  }

  return (
    <Div>
      <Title>Your Resume</Title>
      <Description>
        Upload your resume in PDF format to analyze how well it matches the job
        requirements.
      </Description>
      <Input
        type="file"
        id="resume"
        name="resume"
        accept=".pdf"
        onChange={handleChange}
      />
      <Label htmlFor="resume">
        <UploadIcon>📄</UploadIcon>
        <UploadText>Click to upload your resume (PDF)</UploadText>
      </Label>

      {resumeUrl && <ResumeViewerComponent resumeUrl={resumeUrl} />}
    </Div>
  );
}

export default ResumeComponent;
