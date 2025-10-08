import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../../../shared/i18n";
import { ButtonGroup,Container, Title } from "./styles";

const RecommendationsHome: React.FC = () => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>{translate({ id: "recommendations.home.title" })}</Title>

      <ButtonGroup>
        <Button onClick={() => navigate("/recommendations/page")}>
          {translate({ id: "recommendations.button.access.page" })}
        </Button>
        <Button onClick={() => navigate("/")}>
          {translate({ id: "button.home" })}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default RecommendationsHome;
