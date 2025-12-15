import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { PersonaInput } from "../hooks/usePersonaForm";

type Props = {
  control: Control<PersonaInput, any, PersonaInput>;
  setModel?: (value: string) => void;
  model?: string;
};

const PersonaChooseModel = ({ control, setModel, model }: Props) => {
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="flex-1 ml-[20px] font-bold">
        {" " +
          exibirTexto(
            "Escolha o modelo adequado para sua persona.",
            "Choose the appropriate model for your persona.",
          )}
      </h2>
      <Controller
        name="model"
        control={control}
        render={({ field: { onChange, value } }) => {
          const changeFunction = (value: string) => {
            onChange(value);
            setModel(value);
          };

          return (
            <Select onValueChange={changeFunction} value={value}>
              <SelectTrigger>
                <SelectValue
                  placeholder={exibirTexto(
                    "Escolha o modelo",
                    "Choose the model",
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {exibirTexto("Modelo 1", "Model 1")}
                </SelectItem>
                <SelectItem value="2">
                  {exibirTexto("Modelo 2", "Model 2")}
                </SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
};

export default PersonaChooseModel;
