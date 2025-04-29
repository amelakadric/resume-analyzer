import styled from "styled-components";

const ViewerContainer = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

type ResumeViewerComponentProps = {
  resumeUrl: string;
};

function ResumeViewerComponent({ resumeUrl }: ResumeViewerComponentProps) {
  return (
    <ViewerContainer>
      <Iframe src={resumeUrl} title="Resume Viewer" />
    </ViewerContainer>
  );
}

export default ResumeViewerComponent;
