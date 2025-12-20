import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import useDefault from "../hooks/useDefault";
import usePersonaDefaultValues from "../hooks/usePersonaDefaultValues";
import AddOptionAlertDialog from "./AddOptionAlertDialog";
import RemoveOptionAlertDialog from "./RemoveOptionAlertDialog";

interface Props {
  fieldName: string;
  fieldOptions: { en: string; pt: string }[];
  fixedValuesText: string;
  inputPlaceholder: string;
  includedValues: string[];
  setIncludedValues: (value: string[]) => void;
  includedValuesText: string;
}

const PersonaAddOption = ({
  fieldName,
  fieldOptions,
  includedValues,
  setIncludedValues,
  fixedValuesText,
  includedValuesText,
  inputPlaceholder,
}: Props) => {
  const { exibirTexto } = useDefault();
  const [inputValue, setInputValue] = useState("");

  const { watch } = useFormContext();

  const watchValue = watch(fieldName);

  const { defaultValues: fixedValues, filterValues } = usePersonaDefaultValues({
    defaultOptions: fieldOptions,
  });

  useEffect(() => {
    filterValues(watchValue);
  }, [watchValue]);

  const add = () => {
    const input = inputValue.trim();

    const validSize = input.length >= 3 && input.length <= 200;

    const notWritten = !includedValues.includes(input);

    const valid = validSize && notWritten;

    if (valid) {
      setIncludedValues([...includedValues, input]);
      setInputValue("");
    } else if (!validSize) {
      toast.error(
        exibirTexto(
          "Mínimo: 3 caracteres / Máximo: 200 caracteres",
          "Minimum: 3 characters / Maximum: 200 characters",
        ),
      );
    } else if (!notWritten) {
      toast.error(
        exibirTexto(
          "Esse item já está na lista!",
          "This item is already in the list!",
        ),
      );
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-[15px]">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={inputPlaceholder}
        />
        <Button onClick={add} type="button">
          {exibirTexto("Adicione", "Add")}
        </Button>
      </div>
      <div className="flex flex-row justify-evenly mt-[20px]">
        <div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="flex-1 font-bold">{fixedValuesText}</h2>
            <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] min-h-[400px]">
              {fixedValues.map((value, i) => {
                return (
                  <div key={i} className="flex justify-between">
                    <p className="text-left">
                      {exibirTexto(value.pt, value.en)}
                    </p>
                    <AddOptionAlertDialog
                      onClick={() => {
                        setIncludedValues([
                          ...includedValues,
                          exibirTexto(value.pt, value.en),
                        ]);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="flex-1 font-bold">{includedValuesText}</h2>
            <div className="flex flex-col p-4 border rounded mb-4 gap-[20px] w-[300px] min-h-[400px]">
              {includedValues.map((value, i) => {
                return (
                  <div key={i} className="flex justify-between">
                    <p className="text-left break-all">{value}</p>
                    <RemoveOptionAlertDialog
                      onClick={() => {
                        setIncludedValues(
                          includedValues.filter((val) => val !== value),
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaAddOption;
