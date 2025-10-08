import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../../../shared/i18n";
import { ButtonGroup,Container, Title } from "./styles";

const HomePage: React.FC = () => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>{translate({ id: "home.title" })}</Title>

      <ButtonGroup>
        <Button onClick={() => navigate("/artifacts")}>
          {translate({ id: "button.artifacts" })}
        </Button>
        <Button onClick={() => navigate("/recommendations")}>
          {translate({ id: "button.recommendations" })}
        </Button>
        <Button onClick={() => navigate("/tutorial")}>
          {translate({ id: "button.tutorial" })}
        </Button>
        <Button onClick={() => navigate("/adm")}>
          {translate({ id: "button.adm" })}
        </Button>
        <Button onClick={() => navigate("/login")}>
          {translate({ id: "button.login" })}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default HomePage;
