// IdeationPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Ideação do processo ProAut.
// Apresenta as atividades, artefatos gerados e recursos para equipes de desenvolvimento.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  ChevronRight,
  Edit3,
  FileText,
  Filter,
  Info,
  Lightbulb,
  MessageSquare,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Componente principal da página "Fase de Ideação".
 * Mostra a fase de ideação com atividades, técnicas de brainstorming e processos detalhados.
 * Ideal para orientar equipes na geração e refinamento de ideias para interfaces acessíveis.
 */
export default function IdeationPhase() {
  // Artefatos da fase de ideação
  const phaseArtifacts = [
    {
      id: "trr-inicial",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Tabela de Requisitos/Restrições (TRR) Inicial",
      name_en: "Initial Requirements/Constraints Table (RCT)",
    },
    {
      id: "personas",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Personas (PersonAut)",
      name_en: "Personas (PersonAut)",
    },
    {
      id: "mapa-empatia",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Mapa de Empatia (EmpathyAut)",
      name_en: "Empathy Map (EmpathyAut)",
    },
    {
      id: "trr-completa",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Tabela de Requisitos/Restrições (TRR) Completa",
      name_en: "Complete Requirements/Constraints Table (RCT)",
    },
  ];

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [diagramOpen, setDiagramOpen] = useState(false);

  // Estrutura da tabela de conteúdos
  const tableOfContents = useMemo(
    () => [
      {
        id: "proaut-phases",
        title: language === "pt-BR" ? "Fases do Processo" : "Process Phases",
        type: "navigate",
        path: "/proaut-process",
      },
      {
        id: "imersao",
        title: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
        type: "navigate",
        path: "/imersion-phase",
      },
      {
        id: "analise",
        title: language === "pt-BR" ? "2. Análise" : "2. Analysis",
        type: "navigate",
        path: "/analysis-phase",
      },
      {
        id: "visao-geral",
        title: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
        type: "scroll",
      },
      {
        id: "definir-requisitos",
        title:
          language === "pt-BR"
            ? "Definir Itens de Requisitos/Restrições"
            : "Define Requirements/Constraints Items",
        type: "scroll",
      },
      {
        id: "especificar-requisitos",
        title:
          language === "pt-BR"
            ? "Especificar Itens de Requisitos"
            : "Specify Requirements Items",
        type: "scroll",
      },
      {
        id: "gerar-refinar-ideias",
        title:
          language === "pt-BR"
            ? "Gerar/Refinar Ideias de Interface"
            : "Generate/Refine Interface Ideas",
        type: "scroll",
      },
      {
        id: "prototipacao",
        title: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
        type: "navigate",
        path: "/prototyping-phase",
      },
    ],
    [language],
  );

  // Rola para o topo assim que a página carrega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Efeito para detectar a seção ativa durante o scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents
        .filter((item) => item.type === "scroll")
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [language, tableOfContents]);

  const handleNavigation = (item: (typeof tableOfContents)[0]) => {
    if (item.type === "navigate" && item.path) {
      // Navega para a página específica da fase
      navigate(item.path);
    } else {
      // Para seções internas, faz scroll
      const element = document.getElementById(item.id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        setActiveSection(item.id);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 relative">
      {/* Conteúdo Principal */}

      {/* Botão visível apenas em mobile */}
      <button
        className="fixed bottom-10 right-6 z-[1001] gap-2 p-3 border border-blue-400 bg-blue-50 dark:border-blue-800 rounded-lg lg:hidden mb-4"
        onClick={() => setTocOpen(!tocOpen)}
      >
        {tocOpen ? (
          <ChevronRight className="h-6 w-6 text-blue-500 dark:text-blue-800 rotate-180" />
        ) : (
          <FileText className="h-6 w-6 text-blue-500 dark:text-blue-800" />
        )}
      </button>

      <div className="flex-1 space-y-6 p-6 animate-fade-in order-1 lg:order-1">
        {/* Cabeçalho da página */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "pt-BR" ? "Fase de Ideação" : "Ideation Phase"}
          </h1>
          <p className="text-lg">
            {language === "pt-BR"
              ? "Gerando ideias criativas através de técnicas colaborativas com a equipe."
              : "Generating creative ideas through collaborative techniques with the team."}
          </p>
        </div>

        <section id="visao-geral" className="scroll-m-20 space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Visão Geral" : "Overview"}
            </h2>
          </div>

          <div className="space-y-4 text-lg">
            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "A fase de ideação tem como objetivo gerar ideias por meio de estímulos de criatividade em conjunto com a equipe de desenvolvimento e design da aplicação, em conformidade com o contexto e expectativas do usuário do software/app. Ela segue a criação dos artefatos de personas, mapas de empatia e a versão inicial da Tabela de Requisitos/Restrições."
                : "The ideation phase aims to generate ideas through creativity stimuli together with the application development and design team, in accordance with the software/app user's context and expectations. It follows the creation of persona artifacts, empathy maps and the initial version of the Requirements/Constraints Table."}
            </p>

            {diagramOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramOpen(false)}
                />

                {/* Conteúdo do pop-up */}
                <Card
                  className="relative mx-auto my-auto max-w-md w-full max-h-[80vh] overflow-y-auto animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="sticky top-0 border-b px-6 py-4 rounded-t-xl">
                    <CardTitle className="text-xl text-blue-500 font-bold flex items-center justify-between">
                      {language === "pt-BR"
                        ? "Sobre o Diagrama"
                        : "About the Diagram"}
                      <button
                        onClick={() => setDiagramOpen(false)}
                        className="p-1 rounded-full"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {language === "pt-BR" ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◯</span>
                            <span className="font-semibold">- Iniciar</span>
                          </div>

                          <div className="ml-6 space-y-3">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [3.1]
                                </span>
                                Definir itens de requisitos/restrições
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Detalhar cada requisito ou restrição em partes
                                menores e mais específicas, para que fiquem
                                claros, compreensíveis e fáceis de implementar.
                                No ProAut, isso ajuda a descrever exatamente o
                                que cada requisito envolve — como
                                comportamentos, condições, funcionalidades ou
                                limitações — garantindo que nada fique vago ou
                                aberto a múltiplas interpretações. É uma forma
                                de transformar requisitos gerais em instruções
                                precisas para o protótipo e, depois, para o
                                desenvolvimento.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [3.2]
                                </span>
                                Especificar itens requisitos
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Descrever de forma clara, detalhada e objetiva
                                como cada item do requisito deve funcionar na
                                prática. No ProAut, essa etapa transforma uma
                                necessidade geral em uma instrução precisa,
                                indicando exatamente o que deve aparecer na
                                interface, como deve se comportar, quais
                                condições devem ser atendidas e como o usuário
                                irá interagir. É essa especificação que orienta
                                a equipe na criação do protótipo e garante que
                                todos entendam o requisito da mesma forma.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [3.3]
                                </span>
                                Gerar/Refinar ideias de interface
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Criar propostas visuais e funcionais de como a
                                aplicação deve aparecer e se comportar, com base
                                nos requisitos levantados. No ProAut, essa etapa
                                envolve pensar em layouts, organização de
                                elementos, fluxos de navegação e aspectos
                                visuais adequados ao usuário autista. Refinar
                                ideias é ajustar essas propostas conforme surgem
                                novos entendimentos, garantindo que a interface
                                fique mais clara, acessível e alinhada às
                                necessidades reais do usuário.
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◯</span>
                            <span className="font-semibold">- Start</span>
                          </div>

                          <div className="ml-6 space-y-3">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [3.1]
                                </span>
                                Define requirements/constraints items
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Detail each requirement or constraint into
                                smaller, more specific parts so they become
                                clear, understandable, and easy to implement. In
                                ProAut, this helps describe exactly what each
                                requirement involves—such as behaviors,
                                conditions, functionalities, or
                                limitations—ensuring nothing remains vague or
                                open to multiple interpretations. It's a way to
                                transform general requirements into precise
                                instructions for the prototype and, later, for
                                development.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [3.2]
                                </span>
                                Specify requirements items
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Describe clearly, in detail, and objectively how
                                each requirement item should work in practice.
                                In ProAut, this step transforms a general need
                                into a precise instruction, indicating exactly
                                what should appear in the interface, how it
                                should behave, what conditions must be met, and
                                how the user will interact. This specification
                                guides the team in creating the prototype and
                                ensures everyone understands the requirement in
                                the same way.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [3.3]
                                </span>
                                Generate/Refine interface ideas
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Create visual and functional proposals for how
                                the application should appear and behave, based
                                on the raised requirements. In ProAut, this step
                                involves thinking about layouts, element
                                organization, navigation flows, and visual
                                aspects suitable for the autistic user. Refining
                                ideas means adjusting these proposals as new
                                understandings emerge, ensuring the interface
                                becomes clearer, more accessible, and aligned
                                with the user's real needs.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Fluxo Fase de Ideação*/}
            <div className="relative">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <div className="flex justify-end p-4">
                  <Card
                    className="cursor-pointer border border-blue-100"
                    onClick={() => setDiagramOpen(!diagramOpen)}
                  >
                    <CardContent className=" text-blue-500 p-3">
                      <div className="flex items-center gap-2">
                        <strong>
                          <span className="text-lg">
                            {language === "pt-BR"
                              ? "Explicação do diagrama"
                              : "Diagram Explanation"}
                          </span>
                        </strong>
                        <Lightbulb className="h-6 w-6" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/ideation-phase/FluxoIdeacao-pt-br.png"
                      : "src/modules/Tutorial/assets/ideation-phase/FluxoIdeacao-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Figura 1: Fluxo sugerido para a atividade de ideação"
                      : "Figure 1: Suggested workflow for the ideation activity"
                  }
                  className="rounded-md shadow-sm max-w-full h-auto"
                />
              </div>
              <p className="text-lg text-center mt-2">
                {language === "pt-BR"
                  ? "Figura 1: Fluxo sugerido para a atividade de ideação"
                  : "Figure 1: Suggested workflow for the ideation activity"}
              </p>
            </div>

            {/* Resumo da Fase */}
            <Card className="border border-blue-200 dark:border-blue-800 mt-6 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Info className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR" ? "Resumo da Fase" : "Phase Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800 dark:text-blue-200 space-y-3">
                <ul className="text-lg text-justify space-y-3 list-disc list-inside mb-4 ml-4">
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Entrada da fase:"
                        : "Phase input:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "a Tabela Inicial de Requisitos/Restrições da Interface (TRR), o Mapa de Empatia e as Personas."
                      : "the Initial Interface Requirements/Constraints Table (RCT), the Empathy Map and the Personas."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Saída da fase:"
                        : "Phase output:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Lista Atualizada da Tabela de Requisitos/Restrições da Interface (TRR) completa."
                      : "Updated Complete Interface Requirements/Constraints Table (RCT) List."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Pais, especialistas, solicitantes de software, designers/desenvolvedores."
                      : "Parents, specialists, software requesters, designers/developers."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Atividades da Fase:"
                        : "Phase Activities:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Definir Itens de Requisitos/Restrições, Especificar Itens Requisitos e Gerar/Refinar Ideias de Interface."
                      : "Define Requirements/Constraints Items, Specify Requirements Items and Generate/Refine Interface Ideas."}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Seção Definir Itens de Requisitos/Restrições */}
        <section
          id="definir-requisitos"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Definir Itens de Requisitos/Restrições"
                : "Activity: Define Requirements/Constraints Items"}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "Nesta atividade, a equipe utiliza a técnica de brainstorming (tempestade de ideias), uma prática para aumentar a qualidade das ideias, com a colaboração dos envolvidos (pais/mães, especialistas e o solicitante), além do time de desenvolvimento. É neste momento que as pessoas devem se reunir para apresentar ideias e resolver problemas de forma criativa."
                : "In this activity, the team uses the brainstorming technique, a practice to increase the quality of ideas, with the collaboration of those involved (parents, specialists and the requester), in addition to the development team. It is at this moment that people should come together to present ideas and solve problems creatively."}
            </p>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR"
                    ? "Sugestão de Procedimento"
                    : "Procedure Suggestion"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <ol className="text-lg text-justify text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Marcar a sessão de brainstorming, de preferência, com os designers/desenvolvedores, solicitante, um especialista e um pai/mãe, no mínimo;"
                        : "Schedule the brainstorming session, preferably with designers/developers, requester, a specialist and a parent, at minimum;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Escolher um moderador da sessão, que poderá ser um membro do time desenvolvedor (por exemplo, o designer), opte por moderadores mais neutros e não escolha tomadores de decisão nessa função para que eles não deem ideias ou direcionamentos tedenciosos;"
                        : "Choose a session moderator, who could be a member of the developer team (for example, the designer), opt for more neutral moderators and do not choose decision makers in this role so they don't give biased ideas or directions;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Definir o tempo de discussão para cada item de requisito (caso você tenha ideia de qual item é mais importante ou provavelmente causará mais discussão) ou da sessão como um todo. Esse tempo precisa ser cronometrado durante a reunião;"
                        : "Define the discussion time for each requirement item (if you have an idea of which item is more important or will likely cause more discussion) or for the session as a whole. This time needs to be timed during the meeting;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Iniciar a sessão, com o moderador fazendo uma breve explanação de como será conduzida a sessão, bem como o significado de termos mais técnicos (requisito, Persona, Mapa de empatia, brainstorming, entre outros) que se fizerem necessário para melhor compreensão dos participantes;"
                        : "Start the session, with the moderator giving a brief explanation of how the session will be conducted, as well as the meaning of more technical terms (requirement, Persona, Empathy map, brainstorming, among others) that are necessary for better understanding of participants;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "O moderador deve apresentar a lista inicial de requisitos levantados/identificados na fase de análise;"
                        : "The moderator should present the initial list of requirements raised/identified in the analysis phase;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "O moderador deverá apresentar as Personas e Mapa de Empatia (ou distribuir uma cópia das personas e mapa de empatia para cada participante) para que todos tenham mente o perfil do futuro usuário;"
                        : "The moderator should present the Personas and Empathy Map (or distribute a copy of the personas and empathy map to each participant) so that everyone keeps in mind the future user's profile;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Coletar e analisar o feedback de sua equipe e de outras partes interessadas para identificar o que funcionou bem e o que pode ser melhorado."
                        : "Collect and analyze feedback from your team and other stakeholders to identify what worked well and what can be improved."}
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Card de info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                    {language === "pt-BR"
                      ? "Muitas equipes de trabalho atualmente já não estão no mesmo local físico e as sessões de brainstorming remotas já se tornaram comuns porém a interação face a face é perdida, assim como a comunicação não verbal e espontaneidade que ocorrem em uma sessão presencial, por isso, o brainstorming presencial é indicado pelo ProAut."
                      : "Many work teams are no longer in the same physical location and remote brainstorming sessions have become common, but face-to-face interaction is lost, as well as non-verbal communication and spontaneity that occur in an in-person session, so in-person brainstorming is recommended by ProAut."}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "Certos aplicativos podem ajudar na criação e realização das sessões de brainstorming como o Miro, o Google JamBoard e o FigJam do Figma. Fica a escolha do time de desenvolvimento escolher o aplicativo compatível com sua forma de trabalho."
                : "Certain applications can help in the creation and execution of brainstorming sessions such as Miro, Google JamBoard and Figma's FigJam. It's up to the development team to choose the application compatible with their way of working."}
            </p>

            <div className="my-6 p-4">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <img
                  src="src/modules/Tutorial/assets/ideation-phase/ExemploBrainstorm.jpg"
                  alt={
                    language === "pt-BR"
                      ? "Figura 2: Template de Board no Miro para sessão de brainstorming"
                      : "Figure 2: Miro Board Template for brainstorming session"
                  }
                  className="rounded-md shadow-sm max-w-full h-auto"
                />
              </div>
              <p className="text-lg text-justify text-sm text-center">
                {language === "pt-BR"
                  ? "Figura 2: Template de Board no Miro para sessão de brainstorming"
                  : "Figure 2: Miro Board Template for brainstorming session"}
              </p>
            </div>
          </div>
        </section>

        {/* Seção Especificar Itens de Requisitos */}
        <section
          id="especificar-requisitos"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Edit3 className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Especificar Itens de Requisitos"
                : "Activity: Specify Requirements Items"}
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Para cada item de requisito, os participantes poderão contribuir com sugestões sobre como serão feitas as interações (cenários) daquele requisito. Normalmente, começamos com uma ideia geral e depois definimos um objetivo mais específico após termos a oportunidade de discutir ideias."
                  : "For each requirement item, participants can contribute with suggestions on how the interactions (scenarios) of that requirement will be done. Usually, we start with a general idea and then define a more specific objective after having the opportunity to discuss ideas."}
              </p>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Em geral, abra cada bloco para discussão de ideias com 'Como poderíamos...'."
                  : "In general, open each block for idea discussion with 'How could we...'."}
              </p>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                    <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                    {language === "pt-BR"
                      ? "Contexto-exemplo"
                      : "Example Context"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-lg text-blue-700 dark:text-blue-300 mb-2">
                      <strong>
                        {language === "pt-BR" ? "Requisito:" : "Requirement:"}
                      </strong>{" "}
                      {language === "pt-BR"
                        ? "Mostrar o conceito de esquerda/direita, usando uma pessoa como referência central."
                        : "Show the concept of left/right, using a person as central reference."}
                    </p>
                    <p className="text-lg text-justify text-blue-700 dark:text-blue-300 mt-2">
                      {language === "pt-BR"
                        ? "O maior obstáculo é que o lado esquerdo do personagem na tela aparece no lado direito do campo de visão do usuário. Então, Como poderíamos... resolver a ambiguidade da visão espelho de forma imediata e intuitiva?"
                        : "The biggest obstacle is that the left side of the character on screen appears on the right side of the user's field of vision. So, How could we... solve the mirror vision ambiguity in an immediate and intuitive way?"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Após abertura de ideias para os integrantes da equipe, é possível supor que algumas soluções sejam apresentadas como"
                  : "After opening ideas to team members, it's possible to assume that some solutions would be presented such as"}
              </p>

              <ul className="text-lg text-justify space-y-2 list-disc list-inside ml-4">
                <li>
                  {language === "pt-BR"
                    ? "Apresentar o conceito de lateralidade, tendo como referência uma pessoa no centro da tela."
                    : "Present the concept of laterality, having as reference a person in the center of the screen."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Mostrar as palavras esquerda e direita ao lado da pessoa, ao mesmo tempo que a pessoa levanta o braço esquerdo e direito respectivamente. Tomando cuidado da visão espelho (esquerda da tela e a esquerda de quem está de frente para tela, por exemplo)."
                    : "Show the words left and right next to the person, while the person raises their left and right arm respectively. Taking care of mirror vision (left of screen and left of person facing screen, for example)."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Apresentar uma voz em tom suave(preferência da persona) falando as palavras esquerdo direito."
                    : "Present a voice in soft tone(persona preference) speaking the words left right."}
                </li>
              </ul>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Elenque as ideias em post-its. E lembre-se dos princípios essenciais do brainstorming:"
                  : "List the ideas on post-its. And remember the essential principles of brainstorming:"}
              </p>

              <ol className=" text-lg text-justifyspace-y-3 list-decimal list-inside ml-4">
                <li>
                  {language === "pt-BR"
                    ? "Não critique, nem permita críticas às ideias propostas, para não atrapalhar o processo criativo. A avaliação ficará para um momento posterior."
                    : "Do not criticize, nor allow criticism of proposed ideas, so as not to disrupt the creative process. Evaluation will be left for a later moment."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Incentive a produção de uma ampla gama de ideias. Quanto maior a quantidade, melhor. Se alguém tentar construir uma ideia a partir de outra, por combinação, adaptação ou transformação, deixe. O brainstorming é naturalmente colaborativo."
                    : "Encourage the production of a wide range of ideas. The greater the quantity, the better. If someone tries to build an idea from another, by combination, adaptation or transformation, allow it. Brainstorming is naturally collaborative."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Motive sua equipe a compartilhar ideias, mesmo que elas não tenham sido completamente elaboradas."
                    : "Motivate your team to share ideas, even if they haven't been completely elaborated."}
                </li>
              </ol>
            </div>

            {/* Card de info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                    {language === "pt-BR"
                      ? "Durante a sessão de brainstorming, podem surgir novos requisitos não identificados na fase anterior. Caso isso ocorra e o solicitante esteja participando da sessão de brainstorming, ele poderá ser questionado para validar a necessidade do(s) novo(s) requisito(s) identificado(s), caso contrário ele poderá ser questionado em um outro momento previamente agendado."
                      : "During the brainstorming session, new requirements not identified in the previous phase may arise. If this occurs and the requester is participating in the brainstorming session, they can be questioned to validate the need for the new identified requirement(s), otherwise they can be questioned at another previously scheduled time."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Gerar/Refinar Ideias de Interface */}
        <section
          id="gerar-refinar-ideias"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Filter className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Gerar/Refinar Ideias de Interface"
                : "Activity: Generate/Refine Interface Ideas"}
            </h2>
          </div>

          {/* Card de info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                  {language === "pt-BR"
                    ? "Os clientes/cuidadores/solicitantes são incentivados a colaborar nesta atividade."
                    : "Clients/caregivers/requesters are encouraged to collaborate in this activity."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Com as ideias elencadas, é necessário escolher quais efetivamente irão compor a aplicação. O ProAut sugere a técnica do cardápio das ideias, uma técnica de brainwriting, que ajuda a organizar, compilar e ilustrar melhor as ideias que irão compor o 'cardápio'. Indicaremos duas formas de conduzir com esta técnica."
                  : "With the listed ideas, it's necessary to choose which ones will effectively compose the application. ProAut suggests the idea menu technique, a brainwriting technique, that helps organize, compile and better illustrate the ideas that will compose the 'menu'. We will indicate two ways to conduct with this technique."}
              </p>

              {/* Grid para as duas sugestões de procedimento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1° Sugestão de Procedimento */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                      <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      {language === "pt-BR"
                        ? "1° Sugestão de Procedimento"
                        : "1° Suggested Procedure"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Caso seja realizada logo após a sessão de brainstorming, permanecer com o mesmo moderador da atividade anterior, ou selecionar outro;"
                            : "If conducted right after the brainstorming session, remain with the same moderator from the previous activity, or select another;"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "O moderador deverá distribuir cópias do cardápio de ideias (lista de ideias);"
                            : "The moderator should distribute copies of the idea menu (idea list);"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Definir a quantidade de ideias a serem selecionadas;"
                            : "Define the quantity of ideas to be selected;"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Dependendo da quantidade de ideias, solicitar que cada participante escolha um determinado número de ideias. Isso pode ser acordado entre os participantes. Quanto maior o número de ideias, maior poderá ser o número de escolhas. Por exemplo, caso a lista possua 10 ideias, pode-se solicitar que cada participante escolha até 4 ideias, mas isso dependerá do acordo feito entre os participantes;"
                            : "Depending on the quantity of ideas, request that each participant choose a certain number of ideas. This can be agreed among participants. The greater the number of ideas, the greater the number of choices can be. For example, if the list has 10 ideas, each participant can be requested to choose up to 4 ideas, but this will depend on the agreement made among participants;"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Após as seleções, o mediador deverá listar as ideias mais votadas. Em caso de empate, sugere-se, levar a discussão se as ideias empatadas devem ser usadas, ou se apenas uma delas. Nesse último caso levantar com os participantes a melhor opção para o projeto."
                            : "After the selections, the mediator should list the most voted ideas. In case of a tie, it's suggested to take the discussion whether the tied ideas should be used, or only one of them. In this last case, raise with participants the best option for the project."}
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                {/* 2° Sugestão de Procedimento */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                      <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      {language === "pt-BR"
                        ? "2° Sugestão de Procedimento"
                        : "2° Suggested Procedure"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Liste todos os requisitos juntamente com as respectivas ideias de cenário sugeridas em um painel ou lousa visível para todos os participantes."
                            : "List all requirements together with the respective suggested scenario ideas on a panel or board visible to all participants."}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Certifique-se de que as ideias de cenários apresentadas estejam alinhadas com os perfis definidos pelas Personas e/ou o Mapa de Empatia e comunique claramente o número de ideias promissoras que serão selecionadas e qual o critério da seleção."
                            : "Ensure that the presented scenario ideas are aligned with the profiles defined by the Personas and/or the Empathy Map and clearly communicate the number of promising ideas that will be selected and what the selection criteria is."}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Peça a cada participante para fazer suas escolhas entre as ideias listadas. O voto do participante possui um peso, por exemplo, o valor 1 (ou outro sistema de pontos previamente definido)."
                            : "Ask each participant to make their choices among the listed ideas. The participant's vote has a weight, for example, value 1 (or another previously defined points system)."}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Compute os votos e retire do Cardápio as ideias com o maior número de votos, seguindo o critério de seleção definido no Passo 3."
                            : "Compute the votes and remove from the Menu the ideas with the highest number of votes, following the selection criteria defined in Step 3."}
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Card de info*/}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "INFO: Se não deseja seguir com o cardápio de ideias, outras técnicas de brainwriting são sugeridas como a matriz de posicionamento."
                        : "INFO: If you don't want to proceed with the idea menu, other brainwriting techniques are suggested such as the positioning matrix."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Após a análise e seleção feita anteriormente, ocorre a definição dos elementos principais e complementares dos cenários de interação selecionados. Esses elementos correspondem a um detalhamento de como os elementos que compõem o cenário devem ser apresentados na interface a ser elaborada. Ou seja, se a descrição do cenário selecionado cita um objeto, nesta atividade deve-sedefinir qual o objeto (como principal) e a cor ou formato do objeto (como complementar)."
                  : "After the analysis and selection done previously, the definition of main and complementary elements of the selected interaction scenarios occurs. These elements correspond to a detailing of how the elements that compose the scenario should be presented in the interface to be elaborated. That is, if the description of the selected scenario mentions an object, in this activity one must define which object (as main) and the color or format of the object (as complementary)."}
              </p>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Como resultado desta atividade, deve-se completar o preenchimento da Tabela de requisitos/cenários de interface. Veja um exemplo seguindo o cenário do app para ensino de Noções espaciais e lateralidade:"
                  : "As a result of this activity, the filling of the requirements/interface scenarios table should be completed. See an example following the scenario of the app for teaching Spatial Notions and laterality:"}
              </p>

              {/* Imagem do TRR completo */}
              <div className="my-6 p-4">
                <div className="max-w-4xl lg:max-w-6xl">
                  <img
                    src={
                      language === "pt-BR"
                        ? "src/modules/Tutorial/assets/ideation-phase/finalTRR-pt-br-lightTheme.png"
                        : "src/modules/Tutorial/assets/ideation-phase/finalTRR-en-us-lightTheme.png"
                    }
                    alt={
                      language === "pt-BR"
                        ? "TRR do app para Ensino de Noções espaciais e lateralidade"
                        : "RCT for Spatial Notions and Laterality Teaching App"
                    }
                    className="block dark:hidden rounded-md shadow-sm max-w-full h-auto mx-auto"
                  />
                  <img
                    src={
                      language === "pt-BR"
                        ? "src/modules/Tutorial/assets/ideation-phase/finalTRR-pt-br-darkTheme.png"
                        : "src/modules/Tutorial/assets/ideation-phase/finalTRR-en-us-darkTheme.png"
                    }
                    alt={
                      language === "pt-BR"
                        ? "TRR do app para Ensino de Noções espaciais e lateralidade"
                        : "RCT for Spatial Notions and Laterality Teaching App"
                    }
                    className="hidden dark:block rounded-md shadow-sm max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-lg text-sm text-center mt-2">
                  {language === "pt-BR"
                    ? "TRR do app para Ensino de Noções espaciais e lateralidade"
                    : "RCT for Spatial Notions and Laterality Teaching App"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Artefatos da Fase */}
        <div className="mt-8 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            {language === "pt-BR" ? "Artefatos da Fase" : "Phase Artifacts"}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {phaseArtifacts.map((artifact) => (
              <li
                key={artifact.id}
                className="flex flex-col p-3 rounded border shadow-sm"
              >
                <span className="text-xs font-bold mb-1 uppercase tracking-wider">
                  {language === "pt-BR" ? artifact.type_pt : artifact.type_en}
                </span>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="font-medium text-base">
                    {language === "pt-BR" ? artifact.name_pt : artifact.name_en}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {tocOpen && (
        <div
          className="fixed w-full h-full bg-black/50 z-[999] lg:hidden"
          onClick={() => setTocOpen(false)}
        />
      )}

      {/* Tabela de Conteúdos */}
      <div
        className={`${tocOpen ? "fixed" : "hidden"} w-[100vw] max-h-[80vh] z-[1000] lg:relative lg:w-80 lg:block lg:order-2 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5rem)] overflow-y-auto flex-shrink-0 p-6`}
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              {language === "pt-BR"
                ? "Tabela de Conteúdos"
                : "Table of Contents"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item);
                    if (window.innerWidth < 1024) {
                      setTocOpen(false);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-l-blue-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <ChevronRight
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeSection === item.id
                        ? "text-blue-500 rotate-90"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm text-left break-words">
                    {item.title}
                  </span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
