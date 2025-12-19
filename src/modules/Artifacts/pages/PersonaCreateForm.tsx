import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { FormProvider } from "react-hook-form";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import Behavior from "../components/Behavior";
import Cognition from "../components/Cognition";
import Communication from "../components/Communication";
import Interaction from "../components/Interaction";
import PersonaAbout from "../components/PersonaAbout";
import PersonaCalmingActivities from "../components/PersonaCalmingActivities";
import PersonaChooseModel from "../components/PersonaChooseModel";
import PersonaConfirmation from "../components/PersonaConfirmation";
import PersonaCreateWelcome from "../components/PersonaCreateWelcome";
import PersonaGeneralCharacteristics from "../components/PersonaGeneralCharacteristics";
import PersonalData from "../components/PersonalData";
import PersonaSocialAspects from "../components/PersonaSocialAspects";
import PersonaSoftwareAspects from "../components/PersonaSoftwareAspects";
import PersonaStereotypesHabits from "../components/PersonaStereotypesHabits";
import PersonaStressfulActivities from "../components/PersonaStressfulActivities";
import SubmitButton from "../components/SubmitButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import usePersonaForm from "../hooks/usePersonaForm";

const PersonaCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const { exibirTexto } = useDefault();
  const { errors, onCreateSubmit, formMethods } = usePersonaForm({});

  const baseSteps = useMemo(
    () => [
      <PersonaCreateWelcome />,
      <PersonalData />,
      <PersonaGeneralCharacteristics />,
      <Behavior />,
      <Cognition />,
      <Communication />,
      <Interaction />,
      <PersonaChooseModel />,
    ],
    [],
  );

  const model1Steps = useMemo(
    () => [
      <PersonaStressfulActivities />,
      <PersonaCalmingActivities />,
      <PersonaStereotypesHabits />,
      <PersonaSocialAspects />,
      <PersonaSoftwareAspects />,
    ],
    [],
  );

  const model2Steps = useMemo(() => [<PersonaAbout />], []);

  const confirmationSteps = useMemo(() => [<PersonaConfirmation />], []);

  const [steps, setSteps] = useState([...baseSteps, ...confirmationSteps]);

  const model = formMethods.watch("model");

  useEffect(() => {
    if (model === "1") {
      setSteps([...baseSteps, ...model1Steps, ...confirmationSteps]);
    } else if (model === "2") {
      setSteps([...baseSteps, ...model2Steps, ...confirmationSteps]);
    } else {
      setSteps([...baseSteps, ...confirmationSteps]);
    }
  }, [model, baseSteps, confirmationSteps, model1Steps, model2Steps]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto p-4 max-w-6xl max-h-6xl">
      <BackToArtifactsPageButton value="1" />
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onCreateSubmit)}
          className="mx-auto p-4"
        >
          <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
            {exibirTexto("Criar Persona", "Create Persona")}
          </h2>
          <div className="p-4 border rounded mb-4">{steps[step]}</div>
          <div className="flex flex-row gap-[20px]">
            {step !== 0 && (
              <Button onClick={back} type="button">
                {exibirTexto("Voltar", "Back")}
              </Button>
            )}
            {step !== steps.length - 1 && (
              <Button
                onClick={next}
                disabled={step === 7 && model === ""}
                type="button"
              >
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

export default PersonaCreateForm;
