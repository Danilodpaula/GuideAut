import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: calc(100vh - 56px);
  background-color: ${({ theme }) => theme.colorBgLayout};
  color: ${({ theme }) => theme.colorText};
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colorText};
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: grid;
  gap: 12px;
  width: 220px;

  button {
    font-weight: 500;
    letter-spacing: 0.3px;
  }
`;
