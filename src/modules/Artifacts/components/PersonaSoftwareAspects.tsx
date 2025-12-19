import { Control, Controller } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { PersonaInput } from "../hooks/usePersonaForm";
import { defaultSoftwareAspects } from "../i18n/persona";
import PersonaAddOption from "./PersonaAddOption";

const PersonaSoftwareAspects = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {exibirTexto(" Aspectos de Software", " Software Aspects")}
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
            "Informe os aspectos de software da persona",
            "Report the persona's software aspects",
          )}
      </h2>
      <Controller
        name="softwareAspects"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <PersonaAddOption
              fieldName="softwareAspects"
              fieldOptions={defaultSoftwareAspects}
              fixedValuesText={exibirTexto(
                "Aspectos tecnológicos de software do GuideAut",
                "Technological software aspects from GuideAut",
              )}
              inputPlaceholder={exibirTexto(
                "Escreva um aspecto tecnológico ou de software",
                "Describe a technological or software-related aspect",
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

export default PersonaSoftwareAspects;
