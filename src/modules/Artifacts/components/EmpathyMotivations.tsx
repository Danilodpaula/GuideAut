import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";

const EmpathyMotivations = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();

  return (
    <div>
      <Label htmlFor="reasons">
        {exibirTexto(
          "Por quais motivos esta aplicação se torna necessária?",
          "For what reasons does this application become necessary?",
        )}
      </Label>
      <Controller
        name={"reasons"}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Textarea
              className="resize-none h-[200px] w-[700px]"
              value={value}
              onChange={onChange}
            />
          );
        }}
      />
      <div className="h-[10px]" />
      <Label htmlFor="expectations">
        {exibirTexto(
          "O que o usuário espera obter a partir desta aplicação?",
          "What does the user expect to obtain from this application?",
        )}
      </Label>
      <Controller
        name={"expectations"}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Textarea
              className="resize-none h-[200px] w-[700px]"
              value={value}
              onChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default EmpathyMotivations;
