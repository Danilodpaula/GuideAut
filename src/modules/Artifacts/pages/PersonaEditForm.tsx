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
import PersonaGeneralCharacteristics from "../components/PersonaGeneralCharacteristics";
import PersonalData from "../components/PersonalData";
import PersonaSocialAspects from "../components/PersonaSocialAspects";
import PersonaSoftwareAspects from "../components/PersonaSoftwareAspects";
import PersonaStereotypesHabits from "../components/PersonaStereotypesHabits";
import PersonaStressfulActivities from "../components/PersonaStressfulActivities";
import SubmitButton from "../components/SubmitButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import usePersonaApi from "../hooks/usePersonaApi";
import { PersonaInput, usePersonaForm } from "../hooks/usePersonaForm";

const PersonaEditForm = () => {
  useAuthGuard();
  const { id, exibirTexto } = useDefault();
  const { findOnePersona } = usePersonaApi({ id: id });
  const { isFetching, data, isError, refetch } = findOnePersona;
  const [step, setStep] = useState(0);
  const { onUpdateSubmit, formMethods, errors } = usePersonaForm({ id: id });

  const baseSteps = useMemo(
    () => [
      <PersonalData<PersonaInput> control={formMethods.control} />,
      <PersonaGeneralCharacteristics control={formMethods.control} />,
      <Behavior<PersonaInput> control={formMethods.control} />,
      <Cognition<PersonaInput> control={formMethods.control} />,
      <Communication<PersonaInput> control={formMethods.control} />,
      <Interaction<PersonaInput> control={formMethods.control} />,
      <PersonaChooseModel control={formMethods.control} />,
    ],
    [formMethods.control],
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

  const model2Steps = useMemo(
    () => [<PersonaAbout control={formMethods.control} />],
    [formMethods.control],
  );

  const confirmationSteps = useMemo(
    () => [<PersonaConfirmation watch={formMethods.watch} />],
    [formMethods.watch],
  );

  const [steps, setSteps] = useState([...baseSteps, ...confirmationSteps]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      formMethods.reset(data);
    }
  }, [data]);

  useEffect(() => {
    if (formMethods.watch("model") === "1") {
      setSteps([...baseSteps, ...model1Steps, ...confirmationSteps]);
    } else if (formMethods.watch("model") === "2") {
      setSteps([...baseSteps, ...model2Steps, ...confirmationSteps]);
    } else {
      setSteps([...baseSteps, ...confirmationSteps]);
    }
  }, [
    formMethods.watch("model"),
    baseSteps,
    confirmationSteps,
    model1Steps,
    model2Steps,
  ]);

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>{exibirTexto("Nenhuma persona encontrada!", "No persona found!")}</p>
    );
  }

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (data) {
    return (
      <div className="mx-auto p-4 max-w-[1000px]">
        <BackToArtifactsPageButton value="1" />
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onUpdateSubmit)}
            className="mx-auto p-4"
          >
            <h2 className="font-bold text-[30px] text-[#20B4F8] pb-[25px]">
              {exibirTexto("Editar Persona", "Edit Persona")}
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
  }
};

export default PersonaEditForm;
