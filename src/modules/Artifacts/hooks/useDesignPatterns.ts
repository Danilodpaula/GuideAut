import { useEffect, useState } from "react";
import { EmpathyDto } from "../types/dto/empathy";
import { DesignPattern } from "../types/dto/design-pattern";
import { behaviorOptions } from "../i18n/behavior-options";
import { cognitionOptions } from "../i18n/cognition-options";
import { communicationOptions } from "../i18n/communication-options";
import { interactionOptions } from "../i18n/interaction-options";
import {
  behaviorDesignPatterns,
  cognitionDesignPatterns,
  communicationDesignPatterns,
  interactionDesignPatterns,
} from "../i18n/dpaut";
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

const useDesignPatterns = ({ empathy }: Props) => {
  const [behavior, setBehavior] = useState<OptionDesignPatterns[]>([]);
  const [cognition, setCognition] = useState<OptionDesignPatterns[]>([]);
  const [communication, setCommunication] = useState<OptionDesignPatterns[]>(
    [],
  );
  const [interaction, setInteraction] = useState<OptionDesignPatterns[]>([]);

  useEffect(() => {
    const behaviorPatterns: OptionDesignPatterns[] = empathy.behavior.map(
      (b) => {
        const option: I18NProps = behaviorOptions.find((o) => o.id === b);
        const mapping = behaviorDesignPatterns.find((dp) => dp.behavior === b);
        if (mapping) {
          const patterns = designPatterns.filter((dp) => {
            return mapping.patterns.includes(dp.id);
          });
          return {
            option,
            patterns,
          };
        }
      },
    );

    const cognitionPatterns: OptionDesignPatterns[] = empathy.cognition.map(
      (c) => {
        const option: I18NProps = cognitionOptions.find((o) => o.id === c);
        const mapping = cognitionDesignPatterns.find(
          (dp) => dp.cognition === c,
        );
        if (mapping) {
          const patterns = designPatterns.filter((dp) => {
            return mapping.patterns.includes(dp.id);
          });
          return {
            option,
            patterns,
          };
        }
      },
    );

    const communicationPatterns: OptionDesignPatterns[] =
      empathy.communication.map((c) => {
        const option: I18NProps = communicationOptions.find((o) => o.id === c);
        const mapping = communicationDesignPatterns.find(
          (dp) => dp.communication === c,
        );
        if (mapping) {
          const patterns = designPatterns.filter((dp) => {
            return mapping.patterns.includes(dp.id);
          });
          return {
            option,
            patterns,
          };
        }
      });

    const interactionPatterns: OptionDesignPatterns[] = empathy.interaction.map(
      (i) => {
        const option: I18NProps = interactionOptions.find((o) => o.id === i);
        const mapping = interactionDesignPatterns.find(
          (dp) => dp.interaction === i,
        );
        if (mapping) {
          const patterns = designPatterns.filter((dp) => {
            return mapping.patterns.includes(dp.id);
          });
          return {
            option,
            patterns,
          };
        }
      },
    );

    setBehavior(behaviorPatterns);
    setCognition(cognitionPatterns);
    setCommunication(communicationPatterns);
    setInteraction(interactionPatterns);
  }, [empathy]);

  return {
    behavior,
    cognition,
    communication,
    interaction,
  };
};

export default useDesignPatterns;
