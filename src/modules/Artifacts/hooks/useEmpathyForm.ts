import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormBase } from "../types/form-base";
import useDefault from "./useDefault";
import useEmpathyApi from "./useEmpathyApi";

interface Inputs extends FormBase {
  reasons: string;
  expectations: string;
}

interface Props {
  id?: string;
}

const useEmpathyForm = ({ id }: Props) => {
  const { createEmpathy, updateEmpathy } = useEmpathyApi({ id: id });

  const formMethods = useForm<Inputs>({
    defaultValues: {
      name: "",
      age: 0,
      gender: "prefer-not-to-say",
      reasons: "",
      expectations: "",
      interaction: [],
      cognition: [],
      communication: [],
      behavior: [],
    },
  });

  const { exibirTexto } = useDefault();
  const [errors, setErrors] = useState<string[]>([]);

  const onCreateSubmit: SubmitHandler<Inputs> = async (data) => {
    data.age = Number(data.age);
    const Empathy = z.object({
      name: z
        .string()
        .min(3, {
          message: exibirTexto(
            "O nome deve ter pelo menos 3 caracteres!",
            "Name must be at least 3 characters long!",
          ),
        })
        .max(200, {
          message: exibirTexto(
            "Texto muito longo! (nome)",
            "Text is too long! (name)",
          ),
        }),
      age: z
        .number({
          message: exibirTexto(
            "Digite uma idade válida!",
            "Enter a valid age!",
          ),
        })
        .int({
          message: exibirTexto(
            "A idade deve ser um número inteiro!",
            "Age must be an integer!",
          ),
        })
        .min(0, {
          message: exibirTexto("Idade Mínima é 0!", "Minimum age is 0!"),
        })
        .max(120, {
          message: exibirTexto("Idade máxima é 120!", "Maximum age is 120!"),
        }),
      gender: z.enum([
        "male",
        "female",
        "prefer-not-to-say",
        "other",
        "non-binary",
      ]),
      reasons: z
        .string()
        .min(10, {
          message: exibirTexto(
            "Explique melhor seus motivos!",
            "Please explain your reasons in more detail!",
          ),
        })
        .max(200, {
          message: exibirTexto(
            "Texto muito longo! (motivos)",
            "Text is too long! (reasons)",
          ),
        }),
      expectations: z
        .string()
        .min(10, {
          message: exibirTexto(
            "Descreva suas expectativas!",
            "Describe your expectations!",
          ),
        })
        .max(200, {
          message: exibirTexto(
            "Texto muito longo! (expectativas)",
            "Text is too long! (expectations)",
          ),
        }),
      interaction: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Interação - Selecione pelo menos uma opção!",
          "Interaction - Select at least one option!",
        ),
      }),
      cognition: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Cognição - Selecione pelo menos uma opção!",
          "Cognition - Select at least one option!",
        ),
      }),
      communication: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Comunicação - Selecione pelo menos uma opção!",
          "Communication - Select at least one option!",
        ),
      }),
      behavior: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Comportamento - Selecione pelo menos uma opção!",
          "Behavior - Select at least one option!",
        ),
      }),
    });
    const result = await Empathy.safeParseAsync(data);

    if (result.success) {
      await createEmpathy.mutateAsync(data);
    } else {
      const errors = result.error.errors.map((e) => e.message);
      setErrors(errors);
    }
  };

  const onUpdateSubmit: SubmitHandler<Inputs> = async (data) => {
    data.age = Number(data.age);
    const Empathy = z.object({
      name: z
        .string()
        .min(3, {
          message: exibirTexto(
            "O nome deve ter pelo menos 3 caracteres!",
            "Name must be at least 3 characters long!",
          ),
        })
        .max(200, {
          message: exibirTexto(
            "Texto muito longo! (nome)",
            "Text is too long! (name)",
          ),
        }),
      age: z
        .number({
          message: exibirTexto(
            "Digite uma idade válida!",
            "Enter a valid age!",
          ),
        })
        .int({
          message: exibirTexto(
            "A idade deve ser um número inteiro!",
            "Age must be an integer!",
          ),
        })
        .min(0, {
          message: exibirTexto("Idade Mínima é 0!", "Minimum age is 0!"),
        })
        .max(120, {
          message: exibirTexto("Idade máxima é 120!", "Maximum age is 120!"),
        }),
      gender: z.enum([
        "male",
        "female",
        "prefer-not-to-say",
        "other",
        "non-binary",
      ]),
      reasons: z
        .string()
        .min(10, {
          message: exibirTexto(
            "Explique melhor seus motivos!",
            "Please explain your reasons in more detail!",
          ),
        })
        .max(200, {
          message: exibirTexto(
            "Texto muito longo! (motivos)",
            "Text is too long! (reasons)",
          ),
        }),
      expectations: z
        .string()
        .min(10, {
          message: exibirTexto(
            "Descreva suas expectativas!",
            "Describe your expectations!",
          ),
        })
        .max(200, {
          message: exibirTexto(
            "Texto muito longo! (expectativas)",
            "Text is too long! (expectations)",
          ),
        }),
      interaction: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Interação - Selecione pelo menos uma opção!",
          "Interaction - Select at least one option!",
        ),
      }),
      cognition: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Cognição - Selecione pelo menos uma opção!",
          "Cognition - Select at least one option!",
        ),
      }),
      communication: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Comunicação - Selecione pelo menos uma opção!",
          "Communication - Select at least one option!",
        ),
      }),
      behavior: z.array(z.string()).min(1, {
        message: exibirTexto(
          "Comportamento - Selecione pelo menos uma opção!",
          "Behavior - Select at least one option!",
        ),
      }),
    });
    const result = await Empathy.safeParseAsync(data);

    if (result.success) {
      await updateEmpathy.mutateAsync(data);
    } else {
      const errors = result.error.errors.map((e) => e.message);
      setErrors(errors);
    }
  };

  return {
    formMethods,
    onCreateSubmit,
    onUpdateSubmit,
    errors,
  };
};

export default useEmpathyForm;
