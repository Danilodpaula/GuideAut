import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";
import BackToArtifactsPageButton from "../components/BackToArtifactsPageButton";
import ExportPDFButton from "../components/ExportPDFButton";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import { useDPAut } from "../hooks/useDPAut";
import useEmpathyApi from "../hooks/useEmpathyApi";
import DesignPatternCard from "../components/DesignPatternCard";

const EmpathyDesignPatterns = () => {
  useAuthGuard();
  const { id, contentRef, exibirTexto } = useDefault();
  const { findOneEmpathy } = useEmpathyApi({ id: id });
  const { isFetching, data, isError, refetch } = findOneEmpathy;

  useEffect(() => {
    refetch();
  }, []);

  const { patterns } = useDPAut({ empathy: data });

  if (isFetching) {
    return <p>{exibirTexto("Carregando...", "Loading...")}</p>;
  }

  if (isError) {
    return <p>{exibirTexto("Algo deu errado!", "Something went wrong!")}</p>;
  }

  if (!data) {
    return (
      <p>
        {exibirTexto(
          "Nenhum mapa de empatia encontrado!",
          "No empathy map found!",
        )}
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <BackToArtifactsPageButton value="2" />
      <Card className="flex flex-col" ref={contentRef}>
        <CardHeader>
          <div className="flex items-baseline">
            <h2 className="font-bold text-[40px]">
              {exibirTexto(
                "Padrões de Design para: ",
                "Design Patterns for: ",
              ) + data.name}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          {patterns.length === 0 && (
            <p>
              {exibirTexto(
                "Nenhum padrão de design para esse mapa de empatia!",
                "No design pattern for this empathy map!",
              )}
            </p>
          )}
          {patterns.length > 0 && (
            <div className="flex flex-col gap-5">
              {patterns.map((p) => {
                return <DesignPatternCard key={p.id} designPattern={p} />;
              })}
            </div>
          )}
        </CardContent>
      </Card>
      <ExportPDFButton
        filename={`dpaut_${data.name}_${Date.now()}`}
        pageRef={contentRef}
      />
    </div>
  );
};

export default EmpathyDesignPatterns;
