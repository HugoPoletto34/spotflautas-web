import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 40px;
  max-width: 600px;
  padding: 40px 80px;
  border-radius: 8px;
  margin: 40px auto;

  background: var(--background);
`;

export const FormTitle = styled.h1`
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--primary-dark);

  font-weight: 700;
  font-size: 32px;
  color: var(--primary-dark);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;
