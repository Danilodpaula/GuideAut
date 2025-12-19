import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const EmpathyMotivations = () => {
  const { exibirTexto } = useDefault();
  const { control, watch } = useFormContext();
  const reasons = watch("reasons");
  const expectations = watch("expectations");
  const debouncedReasons = useDebounce<string>(reasons);
  const debouncedExpectations = useDebounce<string>(expectations);

  const isFirstRender = useRef(true);

  const validateLength = (
    value: string,
    fieldPt: string,
    fieldEn: string,
  ): string | null => {
    if (value.length < 10) {
      return exibirTexto(
        `O campo ${fieldPt} deve ter pelo menos 10 caracteres.`,
        `The field ${fieldEn} must be at least 10 characters long.`,
      );
    }

    if (value.length > 200) {
      return exibirTexto(
        `O campo ${fieldPt} deve ter no máximo 200 caracteres.`,
        `The field ${fieldEn} must be at most 200 characters long.`,
      );
    }

    return null;
  };

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    const error = validateLength(debouncedReasons, "Razões", "Reasons");

    if (error) {
      toast.error(error);
    }
  }, [debouncedReasons]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    const error = validateLength(
      debouncedExpectations,
      "Expectativas",
      "Expectations",
    );

    if (error) {
      toast.error(error);
    }
  }, [debouncedExpectations]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, []);

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
              onChange={(e) => {
                onChange(e.target.value);
              }}
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
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default EmpathyMotivations;
