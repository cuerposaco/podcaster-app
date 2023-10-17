import styled from "styled-components";

const Container = styled.div<{ $flex?: boolean; $direction?: string; $center?: boolean; }>`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  ${({ $flex }:any) => $flex && `display: flex;`}
  ${({ $direction }:any) => $direction && `flex-direction: ${$direction};`}
  ${({ $center }:any) => $center && `align-items: center; justify-items: center;`}
`;

export default Container;