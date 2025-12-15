import { useState } from "react";
import {
  caregiverQuestions,
  clientQuestions,
  therapistQuestions,
} from "../i18n/scripts-questions";
import {
  caregiverSections,
  clientSections,
  therapistSections,
} from "../i18n/scripts-sections";
import useDefault from "./useDefault";
import { toast } from "sonner";
import useScriptApi from "./useScriptApi";
import { ScriptCreateDto } from "../types/dto/script-create";
import { ScriptUpdateDto } from "../types/dto/script-update";
import { titles } from "../i18n/scripts";
import { NewQuestion } from "../types/script";
import { z } from "zod";
const questions = (formType: string) => {
  switch (formType) {
    case "1":
      return clientQuestions;
    case "2":
      return caregiverQuestions;
    case "3":
      return therapistQuestions;
    default:
      return [];
  }
};

const sections = (formType: string) => {
  switch (formType) {
    case "1":
      return clientSections;
    case "2":
      return caregiverSections;
    case "3":
      return therapistSections;
    default:
      return [];
  }
};

const getTitle = (formType: string) => {
  switch (formType) {
    case "1":
      return titles[0];
    case "2":
      return titles[1];
    case "3":
      return titles[2];
    default:
      return {
        id: "",
        pt: "",
        en: "",
      };
  }
};

const useScriptForm = ({
  formType,
  id,
}: {
  formType?: string;
  id?: string;
}) => {
  const { exibirTexto } = useDefault();
  const [newQuestions, setNewQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionSection, setNewQuestionSection] = useState("");
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [roteiroName, setRoteiroName] = useState("");
  const { createScript, updateScript } = useScriptApi({ id: id });

  const addQuestion = () => {
    const Question = z
      .string()
      .min(5, {
        message: exibirTexto(
          "A pergunta deve ter no mínimo 5 caracteres.",
          "The question must be at least 5 characters long.",
        ),
      })
      .max(200, {
        message: exibirTexto(
          "Texto muito longo! (pergunta)",
          "Text is too long! (question)",
        ),
      });
    const result = Question.safeParse(newQuestionText);

    if (result.success) {
      const newQuestion: NewQuestion = {
        id: crypto.randomUUID(),
        question: newQuestionText,
        isFixed: false,
        section: newQuestionSection,
      };
      setNewQuestions([...newQuestions, newQuestion]);
      setShowAddQuestionDialog(false);
      toast.success(
        exibirTexto(
          "Pergunta adicionada com sucesso!  😄",
          "Question added successfully!  😄",
        ),
      );
    } else {
      const errors = result.error.errors.map((e) => e.message);
      toast.error(errors[0]);
    }
  };

  const removeQuestion = (id: string) => {
    setNewQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.success(
      exibirTexto(
        "Pergunta removida com sucesso!  😄",
        "Question removed successfully!  😄",
      ),
    );
  };

  const createSubmit = async () => {
    const Title = z
      .string()
      .min(5, {
        message: exibirTexto(
          "O título deve ter no mínimo 5 caracteres.",
          "The title must be at least 5 characters long.",
        ),
      })
      .max(200, {
        message: exibirTexto(
          "Texto muito longo! (título)",
          "Text is too long! (title)",
        ),
      });

    const result = await Title.safeParseAsync(roteiroName);

    if (result.success) {
      const newScript: ScriptCreateDto = {
        name: roteiroName,
        type: formType,
        items: newQuestions.map((q) => {
          return {
            section: q.section,
            isFixed: q.isFixed,
            question: q.question,
          };
        }),
      };
      setShowSaveDialog(false);
      await createScript.mutateAsync(newScript);
    } else {
      const errors = result.error.errors.map((e) => e.message);
      toast.error(errors[0]);
    }
  };

  const updateSubmit = async () => {
    const Title = z
      .string()
      .min(5, {
        message: exibirTexto(
          "O título deve ter no mínimo 5 caracteres.",
          "The title must be at least 5 characters long.",
        ),
      })
      .max(200, {
        message: exibirTexto(
          "Texto muito longo! (título)",
          "Text is too long! (title)",
        ),
      });

    const result = await Title.safeParseAsync(roteiroName);

    if (result.success) {
      const newScript: ScriptUpdateDto = {
        name: roteiroName,
        type: formType,
        items: newQuestions.map((q) => {
          return {
            section: q.section,
            isFixed: q.isFixed,
            question: q.question,
          };
        }),
      };
      setShowSaveDialog(false);
      await updateScript.mutateAsync(newScript);
    } else {
      const errors = result.error.errors.map((e) => e.message);
      toast.error(errors[0]);
    }
  };

  return {
    questions,
    sections,
    setNewQuestionText,
    setNewQuestionSection,
    showAddQuestionDialog,
    showSaveDialog,
    setRoteiroName,
    addQuestion,
    removeQuestion,
    createSubmit,
    updateSubmit,
    roteiroName,
    setShowSaveDialog,
    getTitle,
    setShowAddQuestionDialog,
    newQuestionSection,
    newQuestionText,
    newQuestions,
    setNewQuestions,
  };
};

export default useScriptForm;
