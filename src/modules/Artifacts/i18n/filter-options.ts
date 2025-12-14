export interface FilterOption {
  id: number;
  checked: boolean;
  option: {
    pt: string;
    en: string;
  };
  value: number;
}

export const filterOptions: FilterOption[] = [
  {
    id: 1,
    checked: false,
    option: {
      pt: "Comportamento",
      en: "Behavior",
    },
    value: 0,
  },
  {
    id: 2,
    checked: false,
    option: {
      pt: "Cognição",
      en: "Cognition",
    },
    value: 0,
  },
  {
    id: 3,
    checked: false,
    option: {
      pt: "Comunicação",
      en: "Communication",
    },
    value: 0,
  },
  {
    id: 4,
    checked: false,
    option: {
      pt: "Interação",
      en: "Interaction",
    },
    value: 0,
  },
];
