import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../../../shared/i18n";
import { ButtonGroup, Container, Title } from "./styles";

const AdmPage: React.FC = () => {
  const { translate } = useI18n();
  const navigate =  useNavigate();
  return (
 <Container>
      <Title>{translate({ id: "adm.title" })}</Title>

      <ButtonGroup>
        <Button onClick={() => navigate("/")}>
          {translate({ id: "button.home" })}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default AdmPage;
