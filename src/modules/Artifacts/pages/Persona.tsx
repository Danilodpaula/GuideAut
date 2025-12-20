import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import { useEffect } from "react";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import ExportPDFButton from "../components/ExportPDFButton";
import VGA from "../components/VGA";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import usePersonaApi from "../hooks/usePersonaApi";
import { languages } from "../i18n/autistic-languages";
import { genders } from "../i18n/genders";

const Persona = () => {
  useAuthGuard();
  const { id, contentRef, exibirTexto } = useDefault();
  const { findOnePersona } = usePersonaApi({ id: id });
  const { isFetching, data, isError, refetch } = findOnePersona;

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>{exibirTexto("Nenhuma persona encontrada!", "No persona found!")}</p>
    );
  }

  const gender = genders.find((gender) => gender.id === data.gender);
  const lang = languages.find((l) => l.id === data.language);

  const FirstModel = () => {
    const { exibirTexto } = useDefault();
    const gender = genders.find((gender) => gender.id === data.gender);
    const lang = languages.find((l) => l.id === data.language);

    return (
      <div className="grid grid-rows-6 grid-cols-6 gap-5">
        <div className="col-start-1 col-end-3 row-start-1 row-end-4 border-2 border-primary p-5 rounded">
          <h2 className="font-bold">
            {exibirTexto("Atividades que Acalmam", "Calming Activities")}:
          </h2>
          {data.calmingActivities.map((activity) => {
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
          {data.socialAspects.map((aspect) => {
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
          <p className="break-all">{data.supportLevel}</p>
          <div className="h-3" />
          <VGA
            interactionList={data.interaction}
            cognitionList={data.cognition}
            communicationList={data.communication}
            behaviorList={data.behavior}
          />
        </div>
        <div className="col-start-3 col-end-5 row-start-3 row-end-5 border-2 border-primary p-5 rounded">
          <div className="flex flex-col items-center justify-center gap-3">
            <CircleUserRound className="w-52 h-52" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-bold">{exibirTexto("Nome: ", "Name: ")}</h2>
              <p className="break-all">{data.name}</p>
              <h2 className="font-bold">{exibirTexto("Idade: ", "Age: ")}</h2>
              <p className="break-all">{data.age}</p>
              <h2 className="font-bold">
                {exibirTexto("Gênero: ", "Gender: ")}
              </h2>
              <p className="break-all">{exibirTexto(gender.pt, gender.en)}</p>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-3 row-start-4 row-end-7 border-2 border-primary p-5 rounded">
          <h2 className="font-bold">
            {exibirTexto("Atividades que Estressam", "Stressful Activities")}:
          </h2>
          {data.stressfulActivities.map((activity) => {
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
          {data.stereotypes.map((stereotype) => {
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
          {data.softwareAspects.map((aspect) => {
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

  const SecondModel = () => {
    const { exibirTexto } = useDefault();
    const gender = genders.find((gender) => gender.id === data.gender);
    const lang = languages.find((l) => l.id === data.language);

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
          <p className="break-all">{data.supportLevel}</p>
          <div className="h-3" />
          <VGA
            interactionList={data.interaction}
            cognitionList={data.cognition}
            communicationList={data.communication}
            behaviorList={data.behavior}
          />
        </div>
        <div className="border-2 border-primary p-5 rounded">
          <div className="flex flex-col items-center justify-center gap-3">
            <CircleUserRound className="w-52 h-52" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-bold">{exibirTexto("Nome: ", "Name: ")}</h2>
              <p className="break-all">{data.name}</p>
              <h2 className="font-bold">{exibirTexto("Idade: ", "Age: ")}</h2>
              <p className="break-all">{data.age}</p>
              <h2 className="font-bold">
                {exibirTexto("Gênero: ", "Gender: ")}
              </h2>
              <p className="break-all">{exibirTexto(gender.pt, gender.en)}</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-primary p-5 rounded">
          <h2 className="font-bold">{exibirTexto("Sobre", "About")}:</h2>
          <p className="break-all">{data.about}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl max-h-6xl mx-auto m-[30px]">
      <BackToArtifactsPageButton value="1" />
      <Card className="flex flex-col mt-[20px]" ref={contentRef}>
        <CardHeader></CardHeader>
        <CardContent>
          {data && data.model === "1" && <FirstModel />}
          {data && data.model === "2" && <SecondModel />}
        </CardContent>
      </Card>
      <div className="mt-[25px]">
        <ExportPDFButton
          filename={`persona_${data.name}_${Date.now()}`}
          pageRef={contentRef}
        />
      </div>
    </div>
  );
};

export default Persona;
