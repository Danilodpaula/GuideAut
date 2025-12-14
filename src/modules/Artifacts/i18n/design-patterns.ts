import { DesignPattern, DesignPatternType } from "../types/dto/design-pattern";

export const designPatterns: DesignPattern[] = [
  {
    id: "LG_01",
    type: DesignPatternType.LG,
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
  {
    id: "LG_02",
    type: DesignPatternType.LG,
    title: {
      pt: "Acessibilidade de Informação",
      en: "Information Accessibility",
    },
    problem: {
      pt: "Como tornar a absorção de conceitos mais simples para usuários portadores de TEA?",
      en: "How to make the absorption of concepts simpler for users with ASD (Autism Spectrum Disorder)?",
    },
    solution: {
      pt: "Utilizar figuras junto a representações de informação redundante para tornar o texto mais acessível.",
      en: "Use figures along with redundant information representations to make the text more accessible.",
    },
    how: {
      pt: "Agrupar o texto junto de uma figura que represente a ideia, como desenho de uma maçã - conceito de comida.",
      en: "Group the text together with a figure that represents the idea, such as a drawing of an apple - concept of food.",
    },
  },
  {
    id: "LG_03",
    type: DesignPatternType.LG,
    title: {
      pt: "Textos e Imagens Legíveis",
      en: "Legible Texts and Images",
    },
    problem: {
      pt: "Usuários autistas dão preferência a textos combinados com imagens.",
      en: "Autistic users prefer texts combined with images.",
    },
    solution: {
      pt: "Dar suporte à informação através da utilização de texto e figura combinados de forma legível.",
      en: "Support information through the use of legibly combined text and figures.",
    },
    how: {
      pt: "Texto deve acompanhar figuras; deve ser claro, simples e curto (máximo uma frase por linha); estar em fonte grande, estilo simples de cor suave. Cabeçalho e título devem ser usados.",
      en: "Text should accompany figures; it should be clear, simple, and short (maximum one sentence per line); use a large font, simple style, and soft color. Heading and title should be used.",
    },
  },
  {
    id: "LG_04",
    type: DesignPatternType.LG,
    title: {
      pt: "Elementos de Distração",
      en: "Distraction Elements",
    },
    problem: {
      pt: "Pessoas com TEA, especialmente crianças, podem se sentir desconfortáveis com certos elementos distrativos e apresentar dificuldades de foco e atenção.",
      en: "People with ASD, especially children, may feel uncomfortable with certain distracting elements and present difficulties with focus and attention.",
    },
    solution: {
      pt: "Sons de fundo, texto se movendo, imagens piscando e rolagem horizontal devem ser evitados (distração no geral).",
      en: "Background sounds, moving text, blinking images, and horizontal scrolling should be avoided (distraction in general).",
    },
    how: {
      pt: "Não utilizar sons de fundo, texto se movendo, imagens piscando e rolagem horizontal.",
      en: "Do not use background sounds, moving text, blinking images, and horizontal scrolling.",
    },
  },
  {
    id: "LG_05",
    type: DesignPatternType.LG,
    title: {
      pt: "Simplicidade de Figuras",
      en: "Simplicity of Figures",
    },
    problem: {
      pt: "Tendência de design de depender de elementos multimídia para substituir a informação em texto.",
      en: "Design tendency to rely on multimedia elements to replace textual information.",
    },
    solution: {
      pt: "Ajudar o usuário a manter o foco no tópico através da utilização equilibrada de figuras.",
      en: "Help the user maintain focus on the topic through the balanced use of figures.",
    },
    how: {
      pt: "Utilizar figuras como desenhos, fotografias e imagens simbólicas; devem ser fáceis de entender, não devem estar no background, devem ter um foco nítido.",
      en: "Use figures such as drawings, photographs, and symbolic images; they should be easy to understand, should not be in the background, and should have a sharp focus.",
    },
  },
  {
    id: "LG_06",
    type: DesignPatternType.LG,
    title: {
      pt: "Limitação de Informação",
      en: "Information Limitation",
    },
    problem: {
      pt: "Muitas informações na tela podem causar confusão aos usuários.",
      en: "Too much information on the screen can cause confusion for users.",
    },
    solution: {
      pt: "O documento deve ser curto.",
      en: "The document should be short.",
    },
    how: {
      pt: "Utilizar texto com frases curtas e poucas palavras; limitar a quantidade de informações.",
      en: "Use text with short sentences and few words; limit the amount of information.",
    },
  },
  {
    id: "LG_07",
    type: DesignPatternType.LG,
    title: {
      pt: "Previsibilidade e Feedback",
      en: "Predictability and Feedback",
    },
    problem: {
      pt: "Usuários com TEA podem ter dificuldade entendendo e interpretando metáforas e expressões não-literais.",
      en: "Users with ASD may have difficulty understanding and interpreting metaphors and non-literal expressions.",
    },
    solution: {
      pt: "Fazer com que o conteúdo seja previsível e prover feedbacks a fim de facilitar a tomada de decisões.",
      en: "Make the content predictable and provide feedback to facilitate decision-making.",
    },
    how: {
      pt: "Fornecer feedback sensorial (tátil, vibração, áudio, visual) após uma ação significativa, utilizar mensagens de erro/instruções claras.",
      en: "Provide sensory feedback (tactile, vibration, audio, visual) after a significant action, use clear error messages/instructions.",
    },
  },
  {
    id: "LG_08",
    type: DesignPatternType.LG,
    title: {
      pt: "Responsividade",
      en: "Responsiveness",
    },
    problem: {
      pt: "Com o crescente aumento da utilização de dispositivos móveis, há um impacto significativo nos aspectos dos websites.",
      en: "With the increasing use of mobile devices, there is a significant impact on website aspects.",
    },
    solution: {
      pt: "Websites devem adaptar suas visualizações e conteúdos aos dispositivos.",
      en: "Websites must adapt their views and content to devices.",
    },
    how: {
      pt: "Possuir designs adaptados para desktop e mobile.",
      en: "Have designs adapted for desktop and mobile.",
    },
  },
  {
    id: "EN_01",
    type: DesignPatternType.EN,
    title: {
      pt: "Consistência e Padronização",
      en: "Consistency and Standardization",
    },
    problem: {
      pt: "O uso de padrões é importante para o usuário identificar funções no sistema.",
      en: "The use of patterns is important for the user to identify functions in the system.",
    },
    solution: {
      pt: "Tornar a navegação consistente e similar.",
      en: "Make the navigation consistent and similar.",
    },
    how: {
      pt: "Padronizar páginas e seções, posicionar elementos similares nos mesmos lugares em várias páginas.",
      en: "Standardize pages and sections, positioning similar elements in the same places across multiple pages.",
    },
  },
  {
    id: "EN_02",
    type: DesignPatternType.EN,
    title: {
      pt: "Simplicidade de Navegação",
      en: "Navigation Simplicity",
    },
    problem: {
      pt: "O usuário não deve ter dificuldades de entender a navegação, mesmo em seu primeiro uso.",
      en: "The user should not have difficulty understanding the navigation, even on their first use.",
    },
    solution: {
      pt: "Ter uma estrutura simples e lógica, de forma que o usuário seja capaz de navegar e de lembrar informação navegacional mesmo após sucessivos usos.",
      en: "Have a simple and logical structure, so the user is able to navigate and remember navigational information even after successive uses.",
    },
    how: {
      pt: "Disponibilizar todos os botões navegacionais e ferramentas necessárias imediatamente; limitar a 3 cliques em webpages e não usar links quebrados.",
      en: "Make all necessary navigational buttons and tools immediately available; limit to 3 clicks on webpages and do not use broken links.",
    },
  },
  {
    id: "EN_03",
    type: DesignPatternType.EN,
    title: {
      pt: "Suporte à Navegação",
      en: "Navigation Support",
    },
    problem: {
      pt: "O usuário pode não encontrar suporte à sua navegação.",
      en: "The user may not find support for their navigation.",
    },
    solution: {
      pt: "Adicionar informação e botões de navegação no topo/fim da página para localização mais rápida.",
      en: "Add information and navigation buttons at the top/bottom of the page for faster location.",
    },
    how: {
      pt: "Adicionar informações, como título e localização, e botões de navegação no topo/fim da página.",
      en: "Add information, such as title and location, and navigation buttons at the top/bottom of the page.",
    },
  },
  {
    id: "EN_04",
    type: DesignPatternType.EN,
    title: {
      pt: "Rótulos Redundantes",
      en: "Redundant Labels",
    },
    problem: {
      pt: "Diferentes usuários possuem níveis de habilidade diferentes de encontrar e fazer uso de informações.",
      en: "Different users have different skill levels in finding and making use of information.",
    },
    solution: {
      pt: "Rotule claramente elementos do site com o seu propósito, mesmo que pareça redundante, para tornar a navegação e as funcionalidades mais fáceis de serem acompanhadas.",
      en: "Clearly label site elements with their purpose, even if it seems redundant, to make navigation and functionalities easier to follow.",
    },
    how: {
      pt: "Usar palavras que deixem claro o sobre o que o site/funcionalidade é e por que a pessoa iria usá-lo.",
      en: "Use words that make it clear what the site/functionality is about and why the person would use it.",
    },
  },
  {
    id: "US_01",
    type: DesignPatternType.US,
    title: {
      pt: "Customização",
      en: "Customization",
    },
    problem: {
      pt: "A personalização é fundamental para a UX de pessoas com TEA, pois possuem diferentes preferências pessoais e necessidades.",
      en: "Personalization is fundamental for the UX of people with ASD, as they have different personal preferences and needs.",
    },
    solution: {
      pt: "Possibilitar customização.",
      en: "Enable customization.",
    },
    how: {
      pt: "Oferecer ao usuário a possibilidade de selecionar features que quer disponível, esquema de cores da aplicação, tamanho e tipo da fonte, espaçamento, etc.",
      en: "Offer the user the possibility to select features they want available, the application's color scheme, font size and type, spacing, etc.",
    },
  },
  {
    id: "US_02",
    type: DesignPatternType.US,
    title: {
      pt: "Engajamento",
      en: "Engagement",
    },
    problem: {
      pt: "É importante trabalhar memória, atenção e leitura com o usuário portador de TEA.",
      en: "It is important to work on memory, attention, and reading with the user with ASD.",
    },
    solution: {
      pt: "Tentar engajar com o usuário para facilitar entendimento e aumentar as chances de visitar ou usar novamente o site ou aplicação.",
      en: "Try to engage the user to facilitate understanding and increase the chances of visiting or using the site or application again.",
    },
    how: {
      pt: "Oferecer instruções e orientação sobre como realizar tarefas visualmente ou por áudio, utilizar minigames.",
      en: "Offer instructions and guidance on how to perform tasks visually or by audio, use minigames.",
    },
  },
  {
    id: "US_04",
    type: DesignPatternType.US,
    title: {
      pt: "Adaptar Interação",
      en: "Adapt Interaction",
    },
    problem: {
      pt: "Uma aplicação adaptativa pode entregar o que é mais apropriado para o desenvolvimento de aspectos cognitivos aos usuários com TEA.",
      en: "An adaptive application can deliver what is most appropriate for the development of cognitive aspects to users with ASD.",
    },
    solution: {
      pt: "Adaptar a interação com usuários considerando o seu histórico de interação, preferências, pedidos e necessidades.",
      en: "Adapt the interaction with users considering their interaction history, preferences, requests, and needs.",
    },
    how: {
      pt: "Selecionar novos jogos baseados no desempenho; quantidade e dificuldade de exercícios apropriada à idade; múltiplos temas à escolha.",
      en: "Select new games based on performance; appropriate amount and difficulty of exercises for the age; multiple themes to choose from.",
    },
  },
  {
    id: "US_06",
    type: DesignPatternType.US,
    title: {
      pt: "Perfil e Armazenamento",
      en: "Profile and Storage",
    },
    problem: {
      pt: "A indisponibilidade das informações entre sessões pode tornar a experiência do usuário mais negativa.",
      en: "The unavailability of information between sessions can make the user's experience more negative.",
    },
    solution: {
      pt: "Use perfis para armazenar informações sobre usuários.",
      en: "Use profiles to store information about users.",
    },
    how: {
      pt: "Permitir que o usuário crie e faça login utilizando nome de usuário/e-mail e senha para salvar suas informações.",
      en: "Allow the user to create and log in using a username/email and password to save their information.",
    },
  },
  {
    id: "LI_01",
    type: DesignPatternType.LI,
    title: {
      pt: "Simplicidade de Linguagem",
      en: "Language Simplicity",
    },
    problem: {
      pt: "Pessoas com TEA comumente interpretam conteúdo textual literalmente e possuem dificuldade em entender frases e conceitos abstratos.",
      en: "People with ASD commonly interpret textual content literally and have difficulty understanding abstract phrases and concepts.",
    },
    solution: {
      pt: "Mantenha a linguagem simples e precisa.",
      en: "Keep the language simple and precise.",
    },
    how: {
      pt: "Utilize uma linguagem visual e textual simples, especificando termos e evitando expressões idiomáticas.",
      en: "Use a simple visual and textual language, specifying terms and avoiding idiomatic expressions.",
    },
  },
  {
    id: "LI_03",
    type: DesignPatternType.LI,
    title: {
      pt: "Alternativas em Questionários",
      en: "Alternatives in Questionnaires",
    },
    problem: {
      pt: "Os usuários podem se sentir frustrados ao não conseguirem fornecer uma resposta exata.",
      en: "Users may feel frustrated when they cannot provide an exact answer.",
    },
    solution: {
      pt: "Forneça alternativas para respostas definitivas em questionários e formulários para reduzir frustração.",
      en: "Provide alternatives for definitive answers in questionnaires and forms to reduce frustration.",
    },
    how: {
      pt: 'Utilizar termos como "eu não sei", "não quero informar" ou "não se aplica" em formulários e questionários.',
      en: 'Use terms like "I don\'t know", "prefer not to say", or "not applicable" in forms and questionnaires.',
    },
  },
];
