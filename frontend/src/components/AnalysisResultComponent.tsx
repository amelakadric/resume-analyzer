import styled from "styled-components";
import { AnalysisResponse } from "../types/analysis.types";
import { useEffect, useRef } from "react";

type AnalysisResultComponentProps = {
  analysis: AnalysisResponse | null;
  isLoading?: boolean;
};

const Container = styled.div`
  margin: 2rem auto;
  width: 70%;
  text-align: center;
`;

const MainTitle = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
  width: 90%;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0;
`;

const SectionsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Section = styled.div`
  background-color: rgb(246, 243, 240);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 0;

  &.summary {
    background-color: rgb(246, 243, 240);
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: rgb(136, 174, 223);
    border-radius: 2px;
  }
`;

const MatchScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ScoreCircle = styled.div<{ score: number }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  background: ${({ score }) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FFC107";
    return "#F44336";
  }};
  color: white;
`;

const ScoreLabel = styled.div`
  font-size: 1.2rem;
  color: rgb(44, 62, 80);
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #2c3e50;
`;

function AnalysisResultComponent({
  analysis,
  isLoading,
}: AnalysisResultComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysis && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [analysis]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Analyzing your resume...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!analysis) return null;

  return (
    <Container ref={containerRef}>
      <MainTitle>Resume Analysis Results</MainTitle>
      <Description>
        We've analyzed your resume against the job description. Here's a
        detailed breakdown of how well your qualifications match the position.
      </Description>

      <Section className="summary">
        <MatchScore>
          <ScoreCircle score={analysis.matchPercentage}>
            {analysis.matchPercentage}%
          </ScoreCircle>
          <ScoreLabel>Match Score</ScoreLabel>
        </MatchScore>
        <Title>{analysis.summary.title}</Title>
        <SummaryText>{analysis.summary.content}</SummaryText>
      </Section>

      <SectionsRow>
        <Section>
          <Title>{analysis.matchingSkills.title}</Title>
          <List>
            {analysis.matchingSkills.items.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{analysis.gaps.title}</Title>
          <List>
            {analysis.gaps.items.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
      </SectionsRow>

      <Section>
        <Title>{analysis.improvements.title}</Title>
        <List>
          {analysis.improvements.items.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
}

export default AnalysisResultComponent;
