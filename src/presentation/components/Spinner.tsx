import styled from "styled-components";

const Spinner = styled.div<{ border?: string; size?: string; }>`
  border: ${({ border }) => border || 4}px solid #e7e5e4;
  border-top: ${({ border }) => border || 4}px solid dodgerblue;
  border-radius: 50%;
  width: ${({ size }) => size || 64}px;
  height: ${({ size }) => size || 64}px;
  animation: spin 1.5s ease-in-out infinite;
  margin: 1em;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

export default Spinner;