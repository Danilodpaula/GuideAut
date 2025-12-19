import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { genders } from "../i18n/genders";

const PersonalData = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();
  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="flex-1 mb-[10px] font-bold">
        {" " + exibirTexto("Dados Pessoais", "Personal Data")}
      </h2>
      <Label htmlFor="name">
        {exibirTexto(
          "Qual é o nome da persona autista?",
          "What is the name of the autistic persona?",
        )}
      </Label>
      <Controller
        name={"name"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input id="name" type="text" value={value} onChange={onChange} />
        )}
      />
      <Label htmlFor="age">
        {exibirTexto("E qual é a idade?", "And what is their age?")}
      </Label>
      <Controller
        name={"age"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input id="age" type="number" value={value} onChange={onChange} />
        )}
      />
      <Label htmlFor="gender">
        {exibirTexto("E qual é o gênero?", "And what is their gender?")}
      </Label>
      <Controller
        name={"gender"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((gender) => {
                return (
                  <SelectItem key={gender.id} value={gender.id}>
                    {exibirTexto(gender.pt, gender.en)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default PersonalData;
