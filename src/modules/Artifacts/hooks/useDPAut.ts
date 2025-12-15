import { useEffect, useState } from "react";
import {
  behaviorDesignPatterns,
  cognitionDesignPatterns,
  communicationDesignPatterns,
  interactionDesignPatterns,
} from "../i18n/dpaut";
import { DesignPattern } from "../types/dto/design-pattern";
import { EmpathyDto } from "../types/dto/empathy";
import { designPatterns } from "../i18n/design-patterns";

interface Props {
  empathy: EmpathyDto;
}

interface I18NProps {
  id: string;
  pt: string;
  en: string;
}

interface OptionDesignPatterns {
  option: I18NProps;
  patterns: DesignPattern[];
}

const useDPAut = ({ empathy }: Props) => {
  const [patterns, setPatterns] = useState<DesignPattern[]>([]);

  useEffect(() => {
    const patternsIds = [];

    if (empathy) {
      for (const option of empathy.behavior) {
        const mapping = behaviorDesignPatterns.find(
          (dp) => dp.behavior === option,
        );
        if (mapping) {
          patternsIds.push(...mapping.patterns);
        }
      }

      for (const option of empathy.cognition) {
        const mapping = cognitionDesignPatterns.find(
          (dp) => dp.cognition === option,
        );
        if (mapping) {
          patternsIds.push(...mapping.patterns);
        }
      }

      for (const option of empathy.communication) {
        const mapping = communicationDesignPatterns.find(
          (dp) => dp.communication === option,
        );
        if (mapping) {
          patternsIds.push(...mapping.patterns);
        }
      }

      for (const option of empathy.interaction) {
        const mapping = interactionDesignPatterns.find(
          (dp) => dp.interaction === option,
        );
        if (mapping) {
          patternsIds.push(...mapping.patterns);
        }
      }

      const formattedIds = [...new Set(patternsIds)];

      setPatterns(() => {
        const foundPatterns = designPatterns.filter((dp) => {
          return formattedIds.includes(dp.id);
        });
        return foundPatterns;
      });
    }
  }, [empathy]);

  return {
    patterns,
  };
};

export { useDPAut };
export type { OptionDesignPatterns };
