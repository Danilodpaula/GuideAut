import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { defaultSocialAspects } from "../i18n/persona";
import PersonaAddOption from "./PersonaAddOption";

const PersonaSocialAspects = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {exibirTexto(" Aspectos Sociais", " Social Aspects")}
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
            "Informe os aspectos sociais da persona",
            "Report the persona's social aspects",
          )}
      </h2>
      <Controller
        name="socialAspects"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <PersonaAddOption
              fieldName="socialAspects"
              fieldOptions={defaultSocialAspects}
              fixedValuesText={exibirTexto(
                "Aspectos sociais e familiares do GuideAut",
                "Social and familiar aspects from GuideAut",
              )}
              inputPlaceholder={exibirTexto(
                "Escreva um aspecto social ou familiar",
                "Write a social or familiar aspect",
              )}
              includedValues={values}
              setIncludedValues={onChange}
              includedValuesText={exibirTexto(
                "Aspectos Selecionados",
                "Selected Aspects",
              )}
            />
          );
        }}
      />
    </div>
  );
};

export default PersonaSocialAspects;
