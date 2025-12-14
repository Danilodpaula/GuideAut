import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { useState } from "react";
import DesignPatternCard from "../components/DesignPatternCard";
import useAuthGuard from "../hooks/useAuthGuard";
import useDefault from "../hooks/useDefault";
import { designPatterns as patterns } from "../i18n/design-patterns";
import { DesignPatternType } from "../types/dto/design-pattern";

interface Option {
  id: number;
  checked: boolean;
  title: {
    pt: string;
    en: string;
  };
}

const DesignPatterns = () => {
  useAuthGuard();
  const { exibirTexto } = useDefault();
  const [designPatterns, setDesignPatterns] = useState(patterns);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([
    {
      id: 1,
      checked: false,
      title: {
        pt: "Layout Gráfico (LG)",
        en: "Graphic Layout (LG)",
      },
    },
    {
      id: 2,
      checked: false,
      title: {
        pt: "Estrutura e Navegação (EN)",
        en: "Structure and Navigation (EN)",
      },
    },
    {
      id: 3,
      checked: false,
      title: {
        pt: "Usuário (US)",
        en: "User (US)",
      },
    },
    {
      id: 4,
      checked: false,
      title: {
        pt: "Linguagem (LI)",
        en: "Language (LI)",
      },
    },
  ]);

  const filterData = () => {
    setDesignPatterns(() => {
      const newValue = patterns.filter((record) => {
        if (options[0].checked && record.type === DesignPatternType.LG) {
          return true;
        }

        if (options[1].checked && record.type === DesignPatternType.EN) {
          return true;
        }

        if (options[2].checked && record.type === DesignPatternType.US) {
          return true;
        }

        if (options[3].checked && record.type === DesignPatternType.LI) {
          return true;
        }

        if (options.every((o) => !o.checked)) {
          return true;
        }

        return false;
      });
      return newValue;
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">
        {exibirTexto("Padrões de Design - DPAut", "Design Patterns - DPAut")}
      </h1>
      <p className="text-muted-foreground mt-2">
        {exibirTexto(
          "Soluções comprovadas para problemas comuns em interfaces para autistas",
          "Proven solutions for common problems in interfaces for autistics",
        )}
      </p>
      <div className="flex flex-col gap-5">
        <Button className="self-start" onClick={() => setOpenDialog(true)}>
          <Filter />
          {exibirTexto("Filtrar padrões de design", "Filter design patterns")}
        </Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {exibirTexto("Categorias", "Categories")}
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="flex flex-col gap-3">
              {options.map((o) => {
                return (
                  <div key={o.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={o.checked}
                        onCheckedChange={(checked) => {
                          setOptions((prev) => {
                            const newValue: Option[] = prev.map((option) => {
                              if (option.id === o.id) {
                                return {
                                  ...option,
                                  checked: Boolean(checked),
                                };
                              } else {
                                return option;
                              }
                            });
                            return newValue;
                          });
                        }}
                      />
                      <Label>{exibirTexto(o.title.pt, o.title.en)}</Label>
                    </div>
                  </div>
                );
              })}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  {exibirTexto("Cancelar", "Cancel")}
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                  filterData();
                }}
              >
                {exibirTexto("Filtrar padrões", "Filter patterns")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {designPatterns.map((dp) => {
          return <DesignPatternCard designPattern={dp} key={dp.id} />;
        })}
      </div>
    </div>
  );
};

export default DesignPatterns;
