enum designPatternType {
  LG,
  EN,
  US,
  LI,
}

export const designPatterns = [
  {
    id: "LG_01",
    type: designPatternType.LG,
    title: {
      pt: "Design e Estrutura Simples",
      en: "Simple Design and Structure",
    },
    problem: {
      pt: "O excesso de features pode causar stress e frustração, o que cria um efeito negativo na usabilidade do sistema.",
      en: "Excessive features can cause stress and frustration, which negatively impacts the system's usability.",
    },
    solution: {
      pt: "O design geral e a estrutura devem ser simples, claros e previsíveis; conteúdo secundário que distrai o usuário deve ser evitado.",
      en: "The overall design and structure should be simple, clear, and predictable; secondary content that distracts the user should be avoided.",
    },
    how: {
      pt: "Limitar o número de features disponíveis a qualquer momento na aplicação.",
      en: "Limit the number of features available at any given time in the application.",
    },
  },
];

export const designPatternsMapper = [];
