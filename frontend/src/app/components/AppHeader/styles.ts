import styled from "styled-components";

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  height: 56px;
  background: ${({ theme }) => theme.colorBgContainer};
  color: ${({ theme }) => theme.colorText};
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary ?? 'transparent'};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;

  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colorText};
  user-select: none;
  pointer-events: none;
`;