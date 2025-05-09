import styled from "styled-components";
import { useEffect, useRef } from "react";

type JobDescriptionComponentProps = {
  handleSetJobDescription: (newValue: string) => void;
  jobDescription: string;
};

const Textarea = styled.textarea`
  display: block;
  width: 31rem;
  min-height: 200px;
  max-height: 1010px;
  height: 200px;

  overflow-y: auto;
  resize: none;
  margin: 1rem;
  margin-top: 1rem;
  background-color: rgb(246, 243, 240);
  border-radius: 0.75rem;
  border: none;
  padding: 1rem;
  font-size: 0.8rem;
  line-height: 1.5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

const Div = styled.div`
  margin: 1rem;
`;

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

function JobDescriptionComponent({
  handleSetJobDescription,
  jobDescription,
}: JobDescriptionComponentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 1010)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [jobDescription]);

  return (
    <Div>
      <Title>Job Description</Title>
      <Description>
        Paste the job description here to analyze how well your resume matches
        the requirements.
      </Description>
      <Textarea
        ref={textareaRef}
        placeholder="Paste job description here..."
        name="jobDescription"
        id="jobDescription"
        onChange={(e) => {
          handleSetJobDescription(e.target.value);
        }}
        value={jobDescription}
      ></Textarea>
    </Div>
  );
}

export default JobDescriptionComponent;
