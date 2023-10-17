import styled, { css } from "styled-components";

export const camelToDashed = (str: string) => str.replace(/([A-Z])/, '-$1').toLowerCase();

const Grid = styled.div<{ justifyContent?: string; }>`
  display: flex;
  ${({ ...rest }) => Object.entries(rest).map(([prop, value]) => css`${camelToDashed(prop)}: ${value};`)}
`;

export default Grid;