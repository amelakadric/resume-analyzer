import styled from "styled-components";

type JobDescriptionComponentProps = {
  handleSetJobDescription: (newValue: string) => void;
  jobDescription: string;
};

const Textarea = styled.textarea`
  display: block;
  width: 30rem;
  height: 22rem;
  resize: vertical;
  margin: 1rem;
  margin-top: 5.3rem;
  background-color: rgb(246, 243, 240);
  border-radius: 0.75rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const Div = styled.div`
  margin: 1rem;
`;

function JobDescriptionComponent({
  handleSetJobDescription,
  jobDescription,
}: JobDescriptionComponentProps) {
  return (
    <Div>
      <h2>Job Description</h2>
      <Textarea
        placeholder="type here..."
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
