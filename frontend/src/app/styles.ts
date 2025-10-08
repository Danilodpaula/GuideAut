import { Flex } from "antd";
import styled from "styled-components";

export const AppContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1;
  width: 100%;
  overflow: hidden;
  z-index: 0;
  background-color: ${({ theme }) => theme?.colorBgLayout};
  color: ${({ theme }) => theme?.colorText};
  transition: background-color 0.3s ease, color 0.3s ease;
`;
