import { styled } from "styled-components";

const StyledCircle1 = styled.div<{ $delay: number }>`
  @keyframes upDown {
    0% {
      transform: translateY(0);
      scale: 1;
      opacity: 1;
    }
    50% {
      transform: translateY(-20px);
      scale: 1.2;
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      scale: 1;
      opacity: 1;
    }
  }
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
  margin: 0 10px;
  animation: upDown 1s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
`;

export function LoadingComponent() {
  return (
    <div className="flex">
      <StyledCircle1 $delay={0.1} />
      <StyledCircle1 $delay={0.2} />
      <StyledCircle1 $delay={0.3} />
    </div>
  );
}
