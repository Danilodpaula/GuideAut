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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  control: Control<PersonaInput, any, PersonaInput>;
  setModel?: (value: string) => void;
  model?: string;
};

const modelsText = {
  1: {
    pt: `
    O Modelo 1 do PersonAut apresenta a persona usando tópicos. Os tópicos
    incluem: Atividades que acalmam (situações ou ações que trazem calma),
    Atividades que estressam (situações ou ações que geram estresse), Aspectos
    sociais e familiares (relações com familiares, terapeutas e colegas), Aspectos
    tecnológicos (afinidade e relação com tecnologias) e Esteriotipias e manias
    (hábitos e comportamentos repetitivos).
    `,
    en: `
    Model 1 of PersonAut presents the persona using bullet points. The topics
    include: Calming activities (situations or actions that provide calm),
    Stressful activities (situations or actions that cause stress), Social
    and family aspects (relationships with family, therapists, and peers),
    Technological aspects (affinity and relationship with technologies), and
    Stereotypies and habits (repetitive behaviors and personal habits).
    `,
  },
  2: {
    pt: `
    O Modelo 2 do PersonAut apresenta a persona de forma resumida, usando: Sobre
    (informações da persona de forma mais flexível, em formato de história).
    `,
    en: `
    Model 2 of PersonAut presents the persona in a summarized form, using
    About (persona information presented flexibly, in a story-like format).
    `,
  },
};

const ModelsDialog = () => {
  const { exibirTexto } = useDefault();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <i className="cursor-pointer">
          {exibirTexto(
            "Dúvidas sobre os modelos?",
            "Questions about the models?",
          )}
        </i>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>
            {exibirTexto("Os modelos são:", "The models are:")}
          </DialogTitle>
          <DialogDescription />
          <div className="flex flex-col">
            <ScrollArea className="h-72 pr-5">
              <p>
                <strong>{" 1: "}</strong>
                {exibirTexto(modelsText[1].pt, modelsText[1].en)}
              </p>
              <br />
              <p>
                <strong>{" 2: "}</strong>
                {exibirTexto(modelsText[2].pt, modelsText[2].en)}
              </p>
            </ScrollArea>
          </div>
          <DialogClose asChild>
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
              OK
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
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
      <ModelsDialog />
    </div>
  );
};

export default PersonaChooseModel;
