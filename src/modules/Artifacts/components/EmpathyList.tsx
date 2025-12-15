import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import useDefault from "../hooks/useDefault";
import useEmpathyApi from "../hooks/useEmpathyApi";
import EmpathyCardItem from "./EmpathyCardItem";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterOption, filterOptions } from "../i18n/filter-options";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EmpathyDto } from "../types/dto/empathy";

const EmpathyList = () => {
  const { navigate, exibirTexto } = useDefault();
  const { findAllEmpathy, removeEmpathy } = useEmpathyApi({});
  const { isFetching, data: apiData, isError, refetch } = findAllEmpathy;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [options, setOptions] = useState<FilterOption[]>(filterOptions);
  const [data, setData] = useState<EmpathyDto[]>(apiData);

  const filterData = () => {
    setData(() => {
      const newValue = apiData.filter((record) => {
        const interaction = Math.trunc((record.interaction.length * 100) / 9);
        const cognition = Math.trunc((record.cognition.length * 100) / 9);
        const communication = Math.trunc(
          (record.communication.length * 100) / 9,
        );
        const behavior = Math.trunc((record.behavior.length * 100) / 13);

        if (options[0].checked && behavior < options[0].value) {
          return false;
        }

        if (options[1].checked && cognition < options[1].value) {
          return false;
        }

        if (options[2].checked && communication < options[2].value) {
          return false;
        }

        if (options[3].checked && interaction < options[3].value) {
          return false;
        }

        return true;
      });
      return newValue;
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  if (isFetching) {
    return <div>{exibirTexto("Carregando...", "Loading")}</div>;
  }

  if (isError) {
    return (
      <div>{exibirTexto("Algo deu errado!", "Something went wrong!")}</div>
    );
  }

  return (
    <div className="p-4 border rounded mb-4 flex flex-col gap-5">
      <Button className="self-start" onClick={() => setOpenDialog(true)}>
        <Filter />
        {exibirTexto("Filtrar mapas de empatia", "Filter empathy maps")}
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {exibirTexto(
                "Filtre os mapas de empatia por nível de comprometimento",
                "Filter the empathy maps by level of commitment",
              )}
            </DialogTitle>
            <DialogDescription>
              {exibirTexto(
                "Porcentagem mínima (entre 0 e 100)",
                "Minimum percentage (between 0 and 100)",
              )}
            </DialogDescription>
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
                          const newValue: FilterOption[] = prev.map(
                            (option) => {
                              if (option.id === o.id) {
                                return { ...option, checked: Boolean(checked) };
                              } else {
                                return option;
                              }
                            },
                          );
                          return newValue;
                        });
                      }}
                    />
                    <Label>{exibirTexto(o.option.pt, o.option.en)}</Label>
                  </div>
                  {o.checked && (
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-1/2"
                      value={o.value}
                      onChange={(e) => {
                        setOptions((prev) => {
                          const newValue: FilterOption[] = prev.map(
                            (option) => {
                              if (option.id === o.id) {
                                return {
                                  ...option,
                                  value: Number(e.target.value),
                                };
                              } else {
                                return option;
                              }
                            },
                          );
                          return newValue;
                        });
                      }}
                    />
                  )}
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
              {exibirTexto("Filtrar registros", "Filter records")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {data &&
        data.length > 0 &&
        data.map((empathy) => {
          return (
            <EmpathyCardItem
              key={empathy.id}
              name={empathy.name}
              age={empathy.age}
              gender={empathy.gender}
              dpautAction={() => navigate(`/design-patterns/${empathy.id}`)}
              viewAction={() => navigate(`/empathy/${empathy.id}`)}
              editAction={() => navigate(`/empathy/${empathy.id}/update`)}
              deleteAction={async () => {
                await removeEmpathy.mutateAsync(empathy.id);
                refetch();
              }}
            />
          );
        })}
      {data && data.length == 0 && (
        <div>
          {exibirTexto(
            "Nenhum mapa de empatia criado!",
            "No empathy map created!",
          )}
        </div>
      )}
      {isError && (
        <div>{exibirTexto("Algo deu errado!", "Something went wrong!")}</div>
      )}
    </div>
  );
};

export default EmpathyList;
