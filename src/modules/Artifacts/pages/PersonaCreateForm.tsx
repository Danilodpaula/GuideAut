import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
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
import { PersonaInput, usePersonaForm } from "../hooks/usePersonaForm";
import { FormProvider } from "react-hook-form";

const PersonaCreateForm = () => {
  useAuthGuard();
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const { exibirTexto } = useDefault();
  const { formMethods, errors, onCreateSubmit } = usePersonaForm({});

  const baseSteps = useMemo(
    () => [
      <PersonaCreateWelcome />,
      <PersonalData<PersonaInput> control={formMethods.control} />,
      <PersonaGeneralCharacteristics control={formMethods.control} />,
      <Behavior<PersonaInput> control={formMethods.control} />,
      <Cognition<PersonaInput> control={formMethods.control} />,
      <Communication<PersonaInput> control={formMethods.control} />,
      <Interaction<PersonaInput> control={formMethods.control} />,
      <PersonaChooseModel
        model={model}
        control={formMethods.control}
        setModel={setModel}
      />,
    ],
    [model, formMethods.control],
  );

  const model1Steps = useMemo(
    () => [
      <PersonaStressfulActivities control={formMethods.control} />,
      <PersonaCalmingActivities control={formMethods.control} />,
      <PersonaStereotypesHabits control={formMethods.control} />,
      <PersonaSocialAspects control={formMethods.control} />,
      <PersonaSoftwareAspects control={formMethods.control} />,
    ],
    [formMethods.control],
  );

  const model2Steps = useMemo(() => [<PersonaAbout />], []);

  const confirmationSteps = useMemo(
    () => [<PersonaConfirmation watch={formMethods.watch} />],
    [formMethods.watch],
  );

  const [steps, setSteps] = useState([...baseSteps, ...confirmationSteps]);

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
