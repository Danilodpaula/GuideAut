import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Import } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useDefault from "../hooks/useDefault";
import usePersonaApi from "../hooks/usePersonaApi";
import { genders } from "../i18n/genders";
import { PersonaDto } from "../types/dto/persona";

const ImportPersona = () => {
  const { exibirTexto } = useDefault();
  const { findAllPersona } = usePersonaApi({});
  const { isFetching, data, isError, refetch } = findAllPersona;
  const { setValue } = useFormContext();
  const [selected, setSelected] = useState<PersonaDto | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  if (isFetching) {
    return (
      <Button disabled className="mb-4">
        {exibirTexto("Carregando Personas...", "Loading Personas...")}
      </Button>
    );
  }

  if (isError) {
    return <div></div>;
  }

  if (data) {
    return (
      <div>
        <Button type="button" className="mb-4" onClick={() => setIsOpen(true)}>
          <Import />
          {exibirTexto("Importar Persona", "Import Persona")}
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogTitle>
                {exibirTexto(
                  "Lista das Suas Personas Cadastradas:",
                  "List of Your Registered Personas:",
                )}
              </DialogTitle>
              <DialogDescription />
              <div className="flex flex-col">
                <ScrollArea className="h-72 pr-5">
                  {data.length === 0 && (
                    <p>
                      {exibirTexto(
                        "Nenhuma persona criada!",
                        "No persona created!",
                      )}
                    </p>
                  )}
                  <div className="flex flex-col gap-4">
                    {data.length > 0 &&
                      data.map((persona) => {
                        const checked =
                          !!selected && selected.id === persona.id;
                        const gender = genders.find(
                          (g) => g.id === persona.gender,
                        );
                        return (
                          <Label
                            key={persona.id}
                            className="flex gap-4 justify-left items-center"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => setSelected(persona)}
                            />
                            <div className="flex flex-col items-left gap-2">
                              <p className="max-w-40 truncate">
                                {persona.name}
                              </p>
                              <p>{exibirTexto(gender.pt, gender.en)}</p>
                              <p>
                                {persona.age + exibirTexto(" anos", " years")}
                              </p>
                            </div>
                          </Label>
                        );
                      })}
                  </div>
                </ScrollArea>
              </div>
              <DialogClose asChild>
                <Button variant="outline">
                  {exibirTexto("Cancelar", "Cancel")}
                </Button>
              </DialogClose>
              <Button
                disabled={!selected}
                onClick={() => {
                  setValue("name", selected.name);
                  setValue("age", selected.age);
                  setValue("gender", selected.gender);
                  setValue("behavior", selected.behavior);
                  setValue("cognition", selected.cognition);
                  setValue("communication", selected.communication);
                  setValue("interaction", selected.interaction);
                  setIsOpen(false);
                }}
              >
                {exibirTexto("Importar", "Import")}
              </Button>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    );
  }
};

export default ImportPersona;
