import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { defaultStereotypes } from "../i18n/persona";
import PersonaAddOption from "./PersonaAddOption";

const PersonaStereotypesHabits = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {exibirTexto(" Estereótipos ou Manias", " Stereotypes or Quirks")}
        <small className="text-red-600 ml-2">
          {exibirTexto(
            "Inclua ao menos 1 opção! Ou apenas escreva: Nada",
            "Include at least 1 option! Or just write: Nothing",
          )}
        </small>
      </h2>
      <h2 className="flex-1">
        {" " +
          exibirTexto(
            "Informe os estereótipos ou manias da persona",
            "List the persona’s stereotypes or quirks",
          )}
      </h2>
      <Controller
        name="stereotypes"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <PersonaAddOption
              fieldName="stereotypes"
              fieldOptions={defaultStereotypes}
              fixedValuesText={exibirTexto(
                "Estereótipos/Manias do GuideAut",
                "Stereotypes/Quirks from GuideAut",
              )}
              inputPlaceholder={exibirTexto(
                "Escreva um estereótipo ou mania",
                "Write a stereotype or quirk",
              )}
              includedValues={values}
              setIncludedValues={onChange}
              includedValuesText={exibirTexto(
                "Estereótipos/Manias Selecionados",
                "Selected Stereotypes/Quirks",
              )}
            />
          );
        }}
      />
    </div>
  );
};

export default PersonaStereotypesHabits;
