enum DesignPatternType {
  LG,
  EN,
  US,
  LI,
}

interface I18NProps {
  pt: string;
  en: string;
}

interface DesignPattern {
  id: string;
  type: DesignPatternType;
  title: I18NProps;
  problem: I18NProps;
  solution: I18NProps;
  how: I18NProps;
}

export type { DesignPattern };

export { DesignPatternType };
