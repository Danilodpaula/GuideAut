import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../../../shared/i18n";
import { ButtonGroup,Container, Title } from "./styles";

const TutorialHome: React.FC = () => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>{translate({ id: "tutorial.home.title" })}</Title>

      <ButtonGroup>
        <Button onClick={() => navigate("/tutorial/page")}>
          {translate({ id: "tutorial.button.access.page" })}
        </Button>
        <Button onClick={() => navigate("/")}>
          {translate({ id: "button.home" })}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default TutorialHome;
