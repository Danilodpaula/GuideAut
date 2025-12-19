import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDefault from "../hooks/useDefault";
import { PersonaWatch } from "../hooks/usePersonaForm";
import { languages } from "../i18n/autistic-languages";
import { genders } from "../i18n/genders";
import ExportPDFButton from "./ExportPDFButton";
import VGA from "./VGA";
import { CircleUserRound } from "lucide-react";

const FirstModel = ({ watch }: { watch: PersonaWatch }) => {
  const { exibirTexto } = useDefault();
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const lang = languages.find((l) => l.id === watch("language"));

  return (
    <div className="grid grid-rows-6 grid-cols-6 gap-5">
      <div className="col-start-1 col-end-3 row-start-1 row-end-4 border-2 border-primary p-5 rounded">
        <h2 className="font-bold">
          {exibirTexto("Atividades que Acalmam", "Calming Activities")}:
        </h2>
        {watch("calmingActivities").map((activity) => {
          return (
            <p key={activity} className="break-all">
              - {activity}
            </p>
          );
        })}
      </div>
      <div className="col-start-3 col-end-5 row-start-1 row-end-3 border-2 border-primary p-5 rounded">
        <h2 className="font-bold">
          {exibirTexto("Aspectos Sociais", "Social Aspects")}:
        </h2>
        {watch("socialAspects").map((aspect) => {
          return (
            <p key={aspect} className="break-all">
              - {aspect}
            </p>
          );
        })}
      </div>
      <div className="col-start-5 col-end-7 row-start-1 row-end-4 border-2 border-primary p-5 rounded">
        <h2 className="font-bold mb-5">
          {exibirTexto("Características Gerais", "General Characteristics")}:
        </h2>
        <h2 className="font-bold">
          {exibirTexto("Linguagem: ", "Language: ")}
        </h2>
        <p className="break-all">{exibirTexto(lang.pt, lang.en)}</p>
        <h2 className="font-bold">
          {exibirTexto("Nível de Suporte: ", "Support Level: ")}
        </h2>
        <p className="break-all">{watch("supportLevel")}</p>
        <div className="h-3" />
        <VGA
          interactionList={watch("interaction")}
          cognitionList={watch("cognition")}
          communicationList={watch("communication")}
          behaviorList={watch("behavior")}
        />
      </div>
      <div className="col-start-3 col-end-5 row-start-3 row-end-5 border-2 border-primary p-5 rounded">
        <div className="flex flex-col items-center justify-center gap-3">
          <CircleUserRound className="w-52 h-52" />
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">{exibirTexto("Nome: ", "Name: ")}</h2>
            <p className="break-all">{watch("name")}</p>
            <h2 className="font-bold">{exibirTexto("Idade: ", "Age: ")}</h2>
            <p className="break-all">{watch("age")}</p>
            <h2 className="font-bold">{exibirTexto("Gênero: ", "Gender: ")}</h2>
            <p className="break-all">{exibirTexto(gender.pt, gender.en)}</p>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-3 row-start-4 row-end-7 border-2 border-primary p-5 rounded">
        <h2 className="font-bold">
          {exibirTexto("Atividades que Estressam", "Stressful Activities")}:
        </h2>
        {watch("stressfulActivities").map((activity) => {
          return (
            <p key={activity} className="break-all">
              - {activity}
            </p>
          );
        })}
      </div>
      <div className="col-start-3 col-end-5 row-start-5 row-end-7 border-2 border-primary p-5 rounded">
        <h2 className="font-bold">
          {exibirTexto("Estereótipos ou Manias", "Stereotypes or Quirks")}:
        </h2>
        {watch("stereotypes").map((stereotype) => {
          return (
            <p key={stereotype} className="break-all">
              - {stereotype}
            </p>
          );
        })}
      </div>
      <div className="col-start-5 col-end-7 row-start-4 row-end-7 border-2 border-primary p-5 rounded">
        <h2 className="font-bold">
          {exibirTexto("Aspectos de Software", "Software Aspects")}:
        </h2>
        {watch("softwareAspects").map((aspect) => {
          return (
            <p key={aspect} className="break-all">
              - {aspect}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const SecondModel = ({ watch }: { watch: PersonaWatch }) => {
  const { exibirTexto } = useDefault();
  const gender = genders.find((gender) => gender.id === watch("gender"));
  const lang = languages.find((l) => l.id === watch("language"));

  return (
    <div className="grid grid-rows-1 grid-cols-3 gap-5">
      <div className="border-2 border-primary p-5 rounded">
        <h2 className="font-bold mb-5">
          {exibirTexto("Características Gerais", "General Characteristics")}:
        </h2>
        <h2 className="font-bold">
          {exibirTexto("Linguagem: ", "Language: ")}
        </h2>
        <p className="break-all">{exibirTexto(lang.pt, lang.en)}</p>
        <h2 className="font-bold">
          {exibirTexto("Nível de Suporte: ", "Support Level: ")}
        </h2>
        <p className="break-all">{watch("supportLevel")}</p>
        <div className="h-3" />
        <VGA
          interactionList={watch("interaction")}
          cognitionList={watch("cognition")}
          communicationList={watch("communication")}
          behaviorList={watch("behavior")}
        />
      </div>
      <div className="border-2 border-primary p-5 rounded">
        <div className="flex flex-col items-center justify-center gap-3">
          <CircleUserRound className="w-52 h-52" />
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold">{exibirTexto("Nome: ", "Name: ")}</h2>
            <p className="break-all">{watch("name")}</p>
            <h2 className="font-bold">{exibirTexto("Idade: ", "Age: ")}</h2>
            <p className="break-all">{watch("age")}</p>
            <h2 className="font-bold">{exibirTexto("Gênero: ", "Gender: ")}</h2>
            <p className="break-all">{exibirTexto(gender.pt, gender.en)}</p>
          </div>
        </div>
      </div>
      <div className="border-2 border-primary p-5 rounded">
        <h2 className="font-bold">{exibirTexto("Sobre", "About")}:</h2>
        <p className="break-all">{watch("about")}</p>
      </div>
    </div>
  );
};

const PersonaConfirmation = ({ watch }: { watch: PersonaWatch }) => {
  const { contentRef } = useDefault();

  return (
    <div className="mx-auto mt-[30px]">
      <Card className="flex flex-col" ref={contentRef}>
        <CardHeader></CardHeader>
        <CardContent>
          {watch("model") === "1" && <FirstModel watch={watch} />}
          {watch("model") === "2" && <SecondModel watch={watch} />}
        </CardContent>
      </Card>
      <div className="mt-[25px]">
        <ExportPDFButton
          filename={`persona_${watch("name")}_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default PersonaConfirmation;
