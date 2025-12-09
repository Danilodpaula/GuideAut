import { createContext } from "react";

interface ContextProps {
  model: string;
}

const PersonaContext = createContext<ContextProps | undefined>(undefined);
