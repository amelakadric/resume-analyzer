import styled from "styled-components";
import ResumeViewerComponent from "./ResumeViewerComponent";
import { useState } from "react";

type ResumeComponentProps = {
  handleSetResume: (file: File) => void;
  handleSubmit: () => void;
};

const ResumeComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const FileInput = styled.input`
  display: block;
  width: 400px;
  padding: 0.5rem;
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

const Button = styled.button`
  width: 60%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: rgb(136, 174, 223);
  &:hover {
    background-color: rgb(108, 145, 194);
  }
`;

function ResumeComponent({
  handleSetResume,
  handleSubmit,
}: ResumeComponentProps) {
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
        <FileInput type="file" onChange={(e) => handleChange(e)} />
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
        {resumeUrl && <ResumeViewerComponent resumeUrl={resumeUrl} />}
      </ResumeComp>
    </>
  );
}

export default ResumeComponent;
