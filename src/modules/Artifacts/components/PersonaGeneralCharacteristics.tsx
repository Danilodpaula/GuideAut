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
import { Label } from "@/components/ui/label";
import { Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDefault from "../hooks/useDefault";
import { languages } from "../i18n/autistic-languages";
import { PersonaInput } from "../hooks/usePersonaForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const autismLevels = ["1", "2", "3"];

const languagesTexts = {
  nonverbal: {
    pt: `
      dificuldade em expressar-se
      verbalmente ou oralmente, podendo não desenvolver a linguagem
      falada ou ter uma fala limitada. Se comunica por gestos ou
      expressões faciais.
        `,
    en: `
    difficulty expressing themselves
    verbally or orally, possibly not developing spoken language or
    having limited speech. Communicates through gestures or facial
    expressions.
    `,
  },
  verbal: {
    pt: `
    utiliza a comunicação verbal, porém
    com certas peculiaridades, incluindo uma tendência a ser
    literal, dificuldade em entender metáforas e sarcasmo.
    `,
    en: `
    uses verbal communication but with
    certain peculiarities, including a tendency to be literal and
    difficulty understanding metaphors and sarcasm.
    `,
  },
  echolalic: {
    pt: `
    repetição de frases ou
    palavras que ouviu de outras pessoas ou de fontes externas (TV,
    músicas, etc.), estando dentro ou fora de contexto de uma
    conversa.
    `,
    en: `
    repetition of phrases or
    words heard from other people or external sources (TV, music,
    etc.), either in or out of the context of a conversation.
    `,
  },
};

const supportLevelTexts = {
  1: {
    pt: `
Pessoas no nível 1 de suporte apresentam dificuldades leves na comunicação social e na adaptação a mudanças.
Geralmente são verbais e conseguem realizar atividades do dia a dia de forma independente, mas podem ter
dificuldade em iniciar ou manter interações sociais, compreender sutilezas sociais e lidar com situações
novas. Requerem apoio pontual, principalmente para organização, habilidades sociais e regulação emocional.
    `,
    en: `
Individuals at support level 1 show mild difficulties in social communication and adapting to change.
They are usually verbal and capable of independent daily activities, but may struggle to initiate or
maintain social interactions, understand social nuances, and cope with new situations. They require
occasional support, especially for organization, social skills, and emotional regulation.
    `,
  },
  2: {
    pt: `
Pessoas no nível 2 de suporte apresentam dificuldades significativas na comunicação social, tanto verbal
quanto não verbal. As interações sociais são limitadas e os comportamentos repetitivos ou interesses
restritos são mais evidentes. Mudanças de rotina costumam causar sofrimento. Requerem apoio substancial e
estruturado, incluindo acompanhamento terapêutico frequente e suporte educacional ou funcional contínuo.
    `,
    en: `
Individuals at support level 2 show significant difficulties in social communication, both verbal and
nonverbal. Social interactions are limited, and repetitive behaviors or restricted interests are more
pronounced. Changes in routine often cause distress. They require substantial and structured support,
including frequent therapeutic follow-up and continuous educational or functional assistance.
    `,
  },
  3: {
    pt: `
Pessoas no nível 3 de suporte apresentam déficits severos na comunicação social, com comunicação verbal
mínima ou inexistente. As dificuldades de interação são intensas e os comportamentos repetitivos são
marcantes, interferindo significativamente no funcionamento diário. Requerem apoio muito substancial e
contínuo para atividades básicas, adaptação ao ambiente e participação social.
    `,
    en: `
Individuals at support level 3 have severe deficits in social communication, with minimal or no verbal
communication. Social interaction difficulties are intense, and repetitive behaviors strongly interfere
with daily functioning. They require very substantial and continuous support for basic activities,
environmental adaptation, and social participation.
    `,
  },
};

const LanguageDialog = () => {
  const { exibirTexto } = useDefault();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <i className="cursor-pointer">
          {exibirTexto(
            "Dúvidas sobre linguagem da persona?",
            "Questions about the persona’s language?",
          )}
        </i>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>
            {exibirTexto(
              "Os tipos de linguagem da persona são:",
              "The persona’s types of language are:",
            )}
          </DialogTitle>
          <DialogDescription />
          <div className="flex flex-col">
            <ScrollArea className="h-72 pr-5">
              <p>
                <strong>{exibirTexto(" Não verbal: ", " Nonverbal: ")}</strong>
                {exibirTexto(
                  languagesTexts.nonverbal.pt,
                  languagesTexts.nonverbal.en,
                )}
              </p>
              <br />
              <p>
                <strong>{exibirTexto(" Verbal: ", " Verbal: ")}</strong>
                {exibirTexto(
                  languagesTexts.verbal.pt,
                  languagesTexts.verbal.en,
                )}
              </p>
              <br />
              <p>
                <strong>
                  {exibirTexto(" Verbal Ecolálica: ", " Echolalic Verbal: ")}
                </strong>
                {exibirTexto(
                  languagesTexts.echolalic.pt,
                  languagesTexts.echolalic.en,
                )}
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

const SupportLevelDialog = () => {
  const { exibirTexto } = useDefault();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <i className="cursor-pointer">
          {exibirTexto(
            "Dúvidas sobre nível de suporte?",
            "Questions about the support level?",
          )}
        </i>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>
            {exibirTexto(
              "Os níveis de suporte são:",
              "The support levels are:",
            )}
          </DialogTitle>
          <DialogDescription />
          <div className="flex flex-col">
            <ScrollArea className="h-72 pr-5">
              <p>
                <strong>{" 1: "}</strong>
                {exibirTexto(supportLevelTexts[1].pt, supportLevelTexts[1].en)}
              </p>
              <br />
              <p>
                <strong>{" 2: "}</strong>
                {exibirTexto(supportLevelTexts[2].pt, supportLevelTexts[2].en)}
              </p>
              <br />
              <p>
                <strong>{" 3: "}</strong>
                {exibirTexto(supportLevelTexts[3].pt, supportLevelTexts[3].en)}
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

const PersonaGeneralCharacteristics = ({
  control,
}: {
  control: Control<PersonaInput, any, PersonaInput>;
}) => {
  const { exibirTexto } = useDefault();

  return (
    <div className="flex flex-col gap-[10px]">
      <Label htmlFor="language">
        {exibirTexto("Linguagem da Persona", "Persona's language")}
      </Label>
      <Controller
        name="language"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => {
                return (
                  <SelectItem key={lang.id} value={lang.id}>
                    {exibirTexto(lang.pt, lang.en)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
      <LanguageDialog />
      <div className="h-[10px]" />
      <Label htmlFor="autismLevel">
        {exibirTexto("Nível de Suporte", "Support Level")}
      </Label>
      <Controller
        name="supportLevel"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {autismLevels.map((level) => {
                return (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
      <SupportLevelDialog />
    </div>
  );
};

export default PersonaGeneralCharacteristics;
