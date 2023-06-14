import styled from "styled-components";

export const Ipt = styled.input`
  width: 100%;
  border: 1px solid var(--ipt-text);
  padding: 12px;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 300;
  color: var(--ipt-text);
`;

export const IptContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;

  a {
    font-weight: 700;
    font-size: 12px;
    text-decoration: underline;
    color: var(--primary-dark);
  }
`;

export const AlertText = styled.p`
  font-size: 12px;
  color: var(--ipt-text);
  display: flex;
  grid-gap: 8px;
  align-items: center;
`;
