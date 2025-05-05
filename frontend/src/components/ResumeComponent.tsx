import styled from "styled-components";
import ResumeViewerComponent from "./ResumeViewerComponent";
import { useState } from "react";

type ResumeComponentProps = {
  handleSetResume: (file: File) => void;
};

const ResumeComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 1rem;
`;

const FileInput = styled.input`
  display: block;
  width: 400px;
  padding: 1rem;
  padding-left: 9rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: rgb(168, 197, 228);
  }
  &::file-selector-button {
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem;
    background-color: rgb(136, 174, 223);
  }
  &::file-selector-button:hover {
    background-color: rgb(108, 145, 194);
  }
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
    <>
      <ResumeComp>
        <h2>Resume</h2>
        <FileInput
          name="resume"
          id="resume"
          type="file"
          onChange={(e) => handleChange(e)}
        />

        {resumeUrl && <ResumeViewerComponent resumeUrl={resumeUrl} />}
      </ResumeComp>
    </>
  );
}

export default ResumeComponent;
