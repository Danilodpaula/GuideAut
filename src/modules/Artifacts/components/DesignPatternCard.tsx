import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Boxes, Compass, Languages, User } from "lucide-react";
import useDefault from "../hooks/useDefault";
import { DesignPattern, DesignPatternType } from "../types/dto/design-pattern";

const DesignPatternCard = ({
  designPattern,
}: {
  designPattern: DesignPattern;
}) => {
  const { exibirTexto } = useDefault();
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            {designPattern.type === DesignPatternType.LG && (
              <Boxes className="w-8 h-8" />
            )}
            {designPattern.type === DesignPatternType.EN && (
              <Compass className="w-8 h-8" />
            )}
            {designPattern.type === DesignPatternType.US && (
              <User className="w-8 h-8" />
            )}
            {designPattern.type === DesignPatternType.LI && (
              <Languages className="w-8 h-8" />
            )}
            <h2 className="font-bold text-2xl">
              {exibirTexto(designPattern.title.pt, designPattern.title.en)}
            </h2>
          </div>
          <span className="text-xl">{designPattern.id}</span>
        </div>
        <div></div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-2">
          <h2 className="font-bold">
            {exibirTexto("Problema: ", "Problem: ")}
          </h2>
          <p>
            {exibirTexto(designPattern.problem.pt, designPattern.problem.en)}
          </p>
        </div>
        <div className="flex gap-2">
          <h2 className="font-bold">
            {exibirTexto("Solução: ", "Solution: ")}
          </h2>
          <p>
            {exibirTexto(designPattern.solution.pt, designPattern.solution.en)}
          </p>
        </div>
        <div className="flex gap-2">
          <h2 className="font-bold">{exibirTexto("Como: ", "How: ")}</h2>
          <p>{exibirTexto(designPattern.how.pt, designPattern.how.en)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignPatternCard;
