import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import { cognitionOptions } from "../i18n/cognition-options";

const Cognition = () => {
  const { exibirTexto } = useDefault();
  const { control } = useFormContext();

  return (
    <div>
      <h2 className="flex-1 mb-[10px] font-bold">
        {exibirTexto(" Cognição", " Cognition")}
        <small className="text-red-600 ml-2">
          {exibirTexto(
            "Inclua ao menos 1 opção!",
            "Include at least 1 option!",
          )}
        </small>
      </h2>
      <Controller
        name={"cognition"}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-[10px]">
            {cognitionOptions.map((option) => {
              const checked = value.includes(option.id);
              return (
                <Label key={option.id}>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...value, option.id]);
                      } else {
                        onChange(value.filter((v: string) => v !== option.id));
                      }
                    }}
                  />
                  {" " + exibirTexto(option.pt, option.en)}
                </Label>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default Cognition;
