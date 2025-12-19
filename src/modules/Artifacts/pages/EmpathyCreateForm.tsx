import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import Behavior from "../components/Behavior";
import Cognition from "../components/Cognition";
import Communication from "../components/Communication";
import EmpathyConfirmation from "../components/EmpathyConfirmation";
import EmpathyMotivations from "../components/EmpathyMotivations";
import Interaction from "../components/Interaction";
import PersonalData from "../components/PersonalData";
import SubmitButton from "../components/SubmitButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import useEmpathyForm from "../hooks/useEmpathyForm";

const EmpathyCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const { exibirTexto } = useDefault();
  const { formMethods, onCreateSubmit, errors } = useEmpathyForm({});

  const steps = [
    <PersonalData />,
    <EmpathyMotivations />,
    <Interaction />,
    <Cognition />,
    <Communication />,
    <Behavior />,
    <EmpathyConfirmation />,
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto p-4">
      <BackToArtifactsPageButton value="2" />
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onCreateSubmit)}
          className="mx-auto p-4"
        >
          <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
            {exibirTexto("Criar Mapa de Empatia", "Create Empathy Map")}
          </h2>
          <div className="p-4 border rounded mb-4">{steps[step]}</div>
          <div className="flex flex-row gap-[20px]">
            {step !== 0 && (
              <Button onClick={back} type="button">
                {exibirTexto("Voltar", "Back")}
              </Button>
            )}
            {step !== steps.length - 1 && (
              <Button onClick={next} type="button">
                {exibirTexto("Próximo", "Next")}
              </Button>
            )}
            {step === steps.length - 1 && <SubmitButton />}
          </div>
        </form>
      </FormProvider>
      {errors.length > 0 && (
        <p className="font-bold text-red-600">{errors[0]}</p>
      )}
    </div>
  );
};

export default EmpathyCreateForm;
