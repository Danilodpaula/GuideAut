import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { defaultStressfulActivities } from "../i18n/persona";
import PersonaAddOption from "./PersonaAddOption";

const PersonaStressfulActivities = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {exibirTexto(" Atividades que estressam", " Stressful Activities")}
        <small className="text-red-600 ml-2">
          {exibirTexto(
            "Inclua ao menos 1 opção! Ou apenas escreva: Nada",
            "Include at least 1 option! Or just write: Nothing",
          )}
        </small>
      </h2>
      <h2 className="flex-1">
        {exibirTexto(
          " Informe as atividades que estressam a persona",
          " Report the activities that stress the persona",
        )}
      </h2>
      <Controller
        name="stressfulActivities"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <PersonaAddOption
              fieldName="stressfulActivities"
              fieldOptions={defaultStressfulActivities}
              fixedValuesText={exibirTexto(
                "Atividades do GuideAut",
                "Activities from GuideAut",
              )}
              inputPlaceholder={exibirTexto(
                "Escreva uma atividade que estressa",
                "Write a stressful activity",
              )}
              includedValues={values}
              setIncludedValues={onChange}
              includedValuesText={exibirTexto(
                "Atividades Selecionadas",
                "Selected Activities",
              )}
            />
          );
        }}
      />
    </div>
  );
};

export default PersonaStressfulActivities;
