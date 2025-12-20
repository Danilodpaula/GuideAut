import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";

const PersonaAbout = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="flex-1 ml-[20px] font-bold">
        {exibirTexto(
          " Esta persona representa uma pessoa autista. Descreva suas características, particularidades, pontos fortes e desafios, considerando que cada pessoa autista é única.",
          " This persona represents an autistic person. Describe their traits, strengths, and challenges in a way that reflects the diversity and uniqueness of autistic individuals.",
        )}
      </h2>
      <Controller
        name="about"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Textarea
              className="resize-none h-[300px]"
              value={value}
              onChange={onChange}
            ></Textarea>
          );
        }}
      />
    </div>
  );
};

export default PersonaAbout;
