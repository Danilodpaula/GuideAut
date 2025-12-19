import { SubmitHandler, useForm, UseFormWatch } from "react-hook-form";
import { FormBase } from "../types/form-base";
import usePersonaApi from "./usePersonaApi";
import { useState } from "react";
import useDefault from "./useDefault";
import { z } from "zod";

interface Inputs extends FormBase {
  language: string;
  supportLevel: string;
  model: string;
  stressfulActivities: string[];
  calmingActivities: string[];
  stereotypes: string[];
  softwareAspects: string[];
  socialAspects: string[];
  about: string;
}

interface Props {
  id?: string;
}

type PersonaWatch = UseFormWatch<Inputs>;

const usePersonaForm = ({ id }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { exibirTexto } = useDefault();
  const { createPersona, updatePersona } = usePersonaApi({ id: id });

  const formMethods = useForm<Inputs>({
    defaultValues: {
      name: "",
      age: 0,
      gender: "prefer-not-to-say",
      language: "nonverbal",
      supportLevel: "3",
      model: "",
      stressfulActivities: [],
      calmingActivities: [],
      stereotypes: [],
      softwareAspects: [],
      socialAspects: [],
      about: "",
      interaction: [],
      cognition: [],
      communication: [],
      behavior: [],
    },
  });

  const onCreateSubmit: SubmitHandler<Inputs> = async (data) => {
    data.age = Number(data.age);

    const aboutValue = data.model === "1" ? 0 : 20;

    const Persona = z.object({
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
      language: z.enum(["verbal", "nonverbal", "echolalic"]),
      supportLevel: z.enum(["1", "2", "3"]),
      model: z.enum(["1", "2"]),
      stressfulActivities:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Atividades Estressantes - Selecione pelo menos uma opção!",
                "Stressful Activities - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      calmingActivities:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Atividades Calmantes - Selecione pelo menos uma opção!",
                "Calming Activities - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      stereotypes:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Estereótipos - Selecione pelo menos uma opção!",
                "Stereotypes - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      softwareAspects:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Aspectos de Software - Selecione pelo menos uma opção!",
                "Software Aspects - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      socialAspects:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Aspectos Sociais - Selecione pelo menos uma opção!",
                "Social Aspects - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      about:
        aboutValue === 20
          ? z
              .string()
              .min(aboutValue, {
                message: exibirTexto(
                  `O sobre deve ter pelo menos ${aboutValue} caracteres!`,
                  `About must be at least ${aboutValue} characters long!`,
                ),
              })
              .max(200, {
                message: exibirTexto(
                  "Texto muito longo! (sobre)",
                  "Text is too long! (about)",
                ),
              })
          : z.string(),
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
    const result = await Persona.safeParseAsync(data);

    if (result.success) {
      await createPersona.mutateAsync(data);
    } else {
      const errors = result.error.errors.map((e) => e.message);
      setErrors(errors);
    }
  };

  const onUpdateSubmit: SubmitHandler<Inputs> = async (data) => {
    data.age = Number(data.age);
    const aboutValue = data.model === "1" ? 0 : 20;

    const Persona = z.object({
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
      language: z.enum(["verbal", "nonverbal", "echolalic"]),
      supportLevel: z.enum(["1", "2", "3"]),
      model: z.enum(["1", "2"]),
      stressfulActivities:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Atividades Estressantes - Selecione pelo menos uma opção!",
                "Stressful Activities - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      calmingActivities:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Atividades Calmantes - Selecione pelo menos uma opção!",
                "Calming Activities - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      stereotypes:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Estereótipos - Selecione pelo menos uma opção!",
                "Stereotypes - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      softwareAspects:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Aspectos de Software - Selecione pelo menos uma opção!",
                "Software Aspects - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      socialAspects:
        data.model === "1"
          ? z.array(z.string()).min(1, {
              message: exibirTexto(
                "Aspectos Sociais - Selecione pelo menos uma opção!",
                "Social Aspects - Select at least one option!",
              ),
            })
          : z.array(z.string()),
      about:
        aboutValue === 20
          ? z
              .string()
              .min(aboutValue, {
                message: exibirTexto(
                  `O sobre deve ter pelo menos ${aboutValue} caracteres!`,
                  `About must be at least ${aboutValue} characters long!`,
                ),
              })
              .max(200, {
                message: exibirTexto(
                  "Texto muito longo! (sobre)",
                  "Text is too long! (about)",
                ),
              })
          : z.string(),
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
    const result = await Persona.safeParseAsync(data);

    if (result.success) {
      await updatePersona.mutateAsync(data);
    } else {
      const errors = result.error.errors.map((e) => e.message);
      setErrors(errors);
    }
  };

  return {
    errors,
    onCreateSubmit,
    onUpdateSubmit,
    formMethods,
  };
};

export { usePersonaForm };

export type { Inputs as PersonaInput, PersonaWatch };
