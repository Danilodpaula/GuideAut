import { Control, Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";
import { Language } from "../i18n/language";
import { defaultCalmingActivities as defaultOptions } from "../i18n/persona";
import useDefault from "../hooks/useDefault";
import { PersonaInput } from "../hooks/usePersonaForm";
import { useI18n } from "@/core/i18n/I18nContext";
import { toast } from "sonner";
import usePersonaDefaultValues from "../hooks/usePersonaDefaultValues";
import PersonaAddOption from "./PersonaAddOption";

const PersonaCalmingActivities = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const [newActivity, setNewActivity] = useState("");
  const { exibirTexto } = useDefault();

  const { defaultValues: defaultCalmingActivities, filterValues } =
    usePersonaDefaultValues({
      defaultOptions: defaultOptions,
    });

  const { watch } = useFormContext();

  const watchValue = watch("calmingActivities");

  useEffect(() => {
    filterValues(watchValue);
  }, [watchValue]);

  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 font-bold">
        {exibirTexto(" Atividades que acalmam", " Calming Activities")}
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
            "Informe as atividades que acalmam a persona",
            "Report the activities that calm the persona",
          )}
      </h2>
      <Controller
        name="calmingActivities"
        control={control}
        render={({ field: { value: values, onChange } }) => {
          return (
            <PersonaAddOption
              fieldName="calmingActivities"
              fieldOptions={defaultCalmingActivities}
              fixedValuesText={exibirTexto(
                "Atividades do GuideAut",
                "Activities from GuideAut",
              )}
              inputPlaceholder={exibirTexto(
                "Escreva uma atividade que acalma",
                "Write a calming activity",
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

export default PersonaCalmingActivities;
