// AnalysisPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Análise do processo ProAut.
// Detalha a triangulação de dados, geração de personas e mapa de empatia.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  ChevronRight,
  FileText,
  Heart,
  Info,
  Lightbulb,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Componente principal da página "Fase de Análise".
 * Abrange as etapas de Análise.
 */
export default function AnalysisPhase() {
  const phaseArtifacts = [
    {
      id: "canvas",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Canvas (Solicitante, Cuidadores, Terapeutas)",
      name_en: "Canvas (Requester, Caregivers, Therapists)",
    },
    {
      id: "fca",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Formulário de Caracterização do Autista (FCA)",
      name_en: "Autistic Characterization Form (ACF)",
    },
    {
      id: "vga",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Gráfico de Visão Geral do Autista (VGA)",
      name_en: "Autistic Overview Graph (AOG)",
    },
    {
      id: "trr-ini",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Tabela de Requisitos/Restrições (TRR) Inicial",
      name_en: "Initial Requirements/Constraints Table (RCT)",
    },
    {
      id: "personas",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Personas (PersonAut)",
      name_en: "Personas (PersonAut)",
    },
    {
      id: "mapa-empatia",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Mapa de Empatia (EmpathyAut)",
      name_en: "Empathy Map (EmpathyAut)",
    },
  ];

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [diagramAnalysisOpen, setDiagramAnalysisOpen] = useState(false);
  const [diagramTriangularOpen, setDiagramTriangularOpen] = useState(false);

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
        id: "visao-geral",
        title: language === "pt-BR" ? "2. Análise" : "2. Analysis",
        type: "scroll",
      },
      {
        id: "triangular-dados",
        title: language === "pt-BR" ? "Triangular Dados" : "Triangulate Data",
        type: "scroll",
      },
      {
        id: "gerar-personas",
        title: language === "pt-BR" ? "Gerar Personas" : "Generate Personas",
        type: "scroll",
      },
      {
        id: "mapa-empatia",
        title: language === "pt-BR" ? "Mapa de Empatia" : "Empathy Map",
        type: "scroll",
      },
      {
        id: "ideacao",
        title: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
        type: "navigate",
        path: "/ideation-phase",
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
            {language === "pt-BR" ? "Fase de Análise" : "Analysis Phase"}
          </h1>
          <p className="text-lg">
            {language === "pt-BR"
              ? "Transformando dados em empatia e requisitos em soluções."
              : "Transforming data into empathy and requirements into solutions."}
          </p>
        </div>

        <section id="visao-geral" className="scroll-m-20 space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Visão Geral" : "Overview"}
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "A fase de Análise é o momento de aproximação do problema. Agora que a equipe coletou diversos dados na imersão, é preciso mergulhar nessas informações e avaliar as implicações do desafio sob o ponto de vista de todos os envolvidos (stakeholders)."
                : "The Analysis phase is the moment to approach the problem. Now that the team has collected various data during immersion, it is necessary to dive into this information and evaluate the implications of the challenge from the point of view of all stakeholders involved."}
            </p>
            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "A fase de Análise tem como objetivo aprofundar as informações obtidas na fase de Imersão e iniciar as principais propostas de solução."
                : "The Analysis phase aims to delve deeper into the information obtained in the Immersion phase and initiate the main proposed solutions."}
            </p>

            {diagramAnalysisOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramAnalysisOpen(false)}
                />

                {/* Conteúdo do pop-up do diagrama de análise */}
                <Card
                  className="relative mx-auto my-auto max-w-md w-full max-h-[80vh] overflow-y-auto animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="sticky top-0 border-b px-6 py-4 rounded-t-xl z-50">
                    <CardTitle className="text-xl text-blue-500 font-bold flex items-center justify-between">
                      {language === "pt-BR"
                        ? "Sobre o Diagrama"
                        : "About the Diagram"}
                      <button
                        onClick={() => setDiagramAnalysisOpen(false)}
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

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◈</span>
                            <span className="font-semibold">- Paralelismo</span>
                          </div>

                          <div className="ml-6 space-y-3">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.1]
                                </span>
                                Triangular Dados
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Cruzar informações vindas de diferentes fontes —
                                como entrevistas, observações, documentos e
                                pesquisas — para verificar se elas se confirmam
                                entre si. No ProAut, a triangulação ajuda a
                                aumentar a confiabilidade das informações,
                                garantindo que os requisitos levantados
                                realmente refletem as necessidades do usuário e
                                não dependem de apenas uma perspectiva.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.2]
                                </span>
                                Gerar mapa de empatia
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Criar uma representação visual que ajuda a
                                entender o usuário de forma profunda. Ele
                                organiza informações sobre o que o usuário vê,
                                pensa, sente, fala, faz e ouve, além de suas
                                dores e necessidades. No ProAut, esse mapa ajuda
                                a equipe a compreender melhor o usuário autista,
                                garantindo que as decisões de design e protótipo
                                sejam centradas em suas reais características e
                                experiências.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.3]
                                </span>
                                Gerar Personas
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Criar representações fictícias, mas baseadas em
                                dados reais, dos tipos de usuários que irão
                                utilizar a aplicação. No ProAut, as personas
                                ajudam a equipe a visualizar quem é o usuário
                                autista, seu cuidador ou terapeuta, incluindo
                                suas necessidades, dificuldades, objetivos e
                                comportamentos. Isso facilita decisões de design
                                e garante que o protótipo seja realmente
                                centrado nas características do usuário final.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◉</span>
                            <span className="font-semibold">- Finalizar</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◯</span>
                            <span className="font-semibold">- Start</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◈</span>
                            <span className="font-semibold">- Parallelism</span>
                          </div>

                          <div className="ml-6 space-y-3">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.1]
                                </span>
                                Triangular Dados
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Cross-reference information from different
                                sources — such as interviews, observations,
                                documents, and research — to verify if they
                                confirm each other. In ProAut, triangulation
                                helps increase the reliability of information,
                                ensuring that the raised requirements truly
                                reflect the user's needs and do not depend on
                                just one perspective.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.2]
                                </span>
                                Generate empathy map
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Create a visual representation that helps
                                understand the user deeply. It organizes
                                information about what the user sees, thinks,
                                feels, says, does and hears, as well as their
                                pains and needs. In ProAut, this map helps the
                                team better understand the autistic user,
                                ensuring that design and prototype decisions are
                                centered on their real characteristics and
                                experiences.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.3]
                                </span>
                                Generate Personas
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Create fictional representations, but based on
                                real data, of the types of users who will use
                                the application. In ProAut, personas help the
                                team visualize who the autistic user is, their
                                caregiver or therapist, including their needs,
                                difficulties, goals and behaviors. This
                                facilitates design decisions and ensures that
                                the prototype is truly centered on the end
                                user's characteristics.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◉</span>
                            <span className="font-semibold">- Finish</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Fluxograma Fase de Análise */}
            <div className="relative">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <div className="flex justify-end p-4">
                  <Card
                    className="cursor-pointer border border-blue-100"
                    onClick={() => setDiagramAnalysisOpen(!diagramAnalysisOpen)}
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
                      ? "src/modules/Tutorial/assets/analysis-phase/FluxoAnalise-pt-br.png"
                      : "src/modules/Tutorial/assets/analysis-phase/FluxoAnalise-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Figura 1: Fluxo sugerido para a atividade de Análise"
                      : "Figure 1: Suggested workflow for the Analysis activity"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-lg text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 1: Fluxo sugerido para a atividade de Análise"
                    : "Figure 1: Suggested workflow for the Analysis activity"}
                </p>
              </div>
            </div>

            {/* Resumo da Fase */}
            <Card className="border border-blue-200 dark:border-blue-800 mt-6 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Info className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR" ? "Resumo da Fase" : "Phase Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-blue-800 dark:text-blue-200 space-y-3">
                <ul className="space-y-3 list-disc list-inside mb-4 ml-4">
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Entrada da fase:"
                        : "Phase input:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Canvas preenchidos (Solicitante, Cuidadores, Terapeutas), FCA respondido e Gráfico VGA."
                      : "Filled Canvases (Requester, Caregivers, Therapists), answered FCA and VGA Graph."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Saída da fase:"
                        : "Phase output:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Lista Inicial de Requisitos/Restrições, Personas e Mapa de Empatia."
                      : "Initial Requirements/Constraints List, Personas and Empathy Map."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Time de desenvolvimento, cuidador(es) e/ou terapeuta(s)."
                      : "Development team, caregiver(s) and/or therapist(s)."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Atividades da Fase:"
                        : "Phase Activities:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Triangular dos Dados, Gerar Mapa de Empatia e Gerar de Personas."
                      : "Triangulate Data, Generate Empathy Map, and Generate Personas."}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Triangular Dados */}
        <section id="triangular-dados" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Triangular Dados"
                : "Activity: Triangulate Data"}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-justify text-lg">
              {language === "pt-BR"
                ? "Nesta atividade, você deve usar as múltiplas fontes de dados (os diferentes Canvas) geradas na fase anterior para criar uma Lista Inicial de Requisitos e Restrições."
                : "In this activity, you must use the multiple data sources (the different Canvases) generated in the previous phase to create an Initial List of Requirements and Constraints."}
            </p>

            {/* Card de info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                    {language === "pt-BR"
                      ? "INFO: O termo 'Lista Inicial' é usado porque, nesta etapa, você vai definir apenas a identificação e a descrição do requisito. O detalhamento visual ocorrerá na próxima fase."
                      : "INFO: The term 'Initial List' is used because, at this stage, you will define only the identification and description of the requirement. Visual detailing will occur in the next phase."}
                  </p>
                </div>
              </div>
            </div>

            {diagramTriangularOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramTriangularOpen(false)}
                />

                {/* Conteúdo do pop-up do diagrama de triangular dados */}
                <Card
                  className="relative mx-auto my-auto max-w-md w-full max-h-[80vh] overflow-y-auto animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="sticky top-0 border-b px-6 py-4 rounded-t-xl z-50">
                    <CardTitle className="text-xl text-blue-500 font-bold flex items-center justify-between">
                      {language === "pt-BR"
                        ? "Sobre o Diagrama"
                        : "About the Diagram"}
                      <button
                        onClick={() => setDiagramTriangularOpen(false)}
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
                                  [2.1.1]
                                </span>
                                (Re)Definir Requisitos e Restrições
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Revisar, ajustar e complementar tudo o que o
                                sistema precisa ter (requisitos) e tudo o que
                                ele não pode fazer ou deve obedecer
                                (restrições). No ProAut, essa etapa acontece
                                após a análise dos dados coletados, garantindo
                                que os requisitos estejam alinhados ao contexto
                                real do usuário autista. É o momento de
                                corrigir, atualizar ou reorganizar informações
                                para que a TRR reflita com precisão as
                                necessidades identificadas.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.1.2]
                                </span>
                                Validar Requisitos e Restrições
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Confirmar que tudo o que foi definido está
                                correto, completo e realmente corresponde às
                                necessidades do usuário e do projeto. No ProAut,
                                isso envolve revisar cada requisito e restrição
                                com os stakeholders — como solicitante,
                                cuidador, terapeuta ou equipe técnica — para
                                garantir que tudo faça sentido e esteja alinhado
                                ao contexto do usuário autista. É uma checagem
                                final antes de seguir para a criação do
                                protótipo.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">- Validado?</span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Sim] →{" "}
                              </span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [Não] → [2.1.1]
                              </span>
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
                                  [2.1.1]
                                </span>
                                (Re)Define Requirements and Constraints
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Review, adjust and complement everything the
                                system needs to have (requirements) and
                                everything it cannot do or must obey
                                (constraints). In ProAut, this step occurs after
                                analyzing the collected data, ensuring that
                                requirements are aligned with the real context
                                of the autistic user. It is the moment to
                                correct, update or reorganize information so
                                that the RCT accurately reflects the identified
                                needs.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [2.1.2]
                                </span>
                                Validate Requirements and Constraints
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Confirm that everything defined is correct,
                                complete and truly corresponds to the user's and
                                project's needs. In ProAut, this involves
                                reviewing each requirement and constraint with
                                stakeholders — such as requester, caregiver,
                                therapist or technical team — to ensure
                                everything makes sense and is aligned with the
                                autistic user's context. It is a final check
                                before proceeding to prototype creation.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">- Validated?</span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Yes] →{" "}
                              </span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [No] → [2.1.1]
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Fluxograma Triangular Dados */}
            <div className="relative">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <div className="flex justify-end p-4">
                  <Card
                    className="cursor-pointer border border-blue-100"
                    onClick={() =>
                      setDiagramTriangularOpen(!diagramTriangularOpen)
                    }
                  >
                    <CardContent className="text-blue-500 p-3">
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
                  src="CAMINHO_DA_IMAGEM_DIAGRAMA_TRIANGULAR"
                  alt={
                    language === "pt-BR"
                      ? "Figura 2: Fluxo sugerido para triangular dados"
                      : "Figure 2: Suggested workflow for data triangulation"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-lg text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 2: Fluxo sugerido para triangular dados"
                    : "Figure 2: Suggested workflow for data triangulation"}
                </p>
              </div>
            </div>

            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "Você deve cruzar as informações. O que vai para a lista não é apenas o que o solicitante pediu, mas o resultado da combinação com o que os pais e especialistas informaram."
                : "You must cross-reference the information. What goes on the list is not just what the requester asked for, but the result of the combination with what parents and specialists reported."}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Como fazer a Triangulação:"
                  : "How to Triangulate:"}
              </h3>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                    <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                    {language === "pt-BR"
                      ? "Sugestão de Procedimento"
                      : "Procedure Suggestion"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Reúna todos os Canvas preenchidos (CSS, CCA, CTA) e o FCA;"
                          : "Gather all completed Canvases (RSC, ACC, ATC) and the ACF;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Crie uma tabela ou planilha para organizar os requisitos identificados;"
                          : "Create a table or spreadsheet to organize identified requirements;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Compare informações semelhantes entre os diferentes Canvas;"
                          : "Compare similar information between the different Canvases;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Identifique conflitos e decida qual informação prevalecerá;"
                          : "Identify conflicts and decide which information will prevail;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Classifique cada item como Requisito Funcional, Requisito Não-Funcional ou Restrição;"
                          : "Classify each item as Functional Requirement, Non-Functional Requirement or Constraint;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Numere e descreva cada item de forma clara e concisa."
                          : "Number and describe each item clearly and concisely."}
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Imagem do exemplo de TRR Inicial */}
            <div className="my-6 p-4">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/analysis-phase/initialTRR-pt-br-lightTheme.png"
                      : "src/modules/Tutorial/assets/analysis-phase/initialTRR-en-us-lightTheme.png"
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
                      ? "src/modules/Tutorial/assets/analysis-phase/initialTRR-pt-br-darkTheme.png"
                      : "src/modules/Tutorial/assets/analysis-phase/initialTRR-en-us-darkTheme.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "TRR do app para Ensino de Noções espaciais e lateralidade"
                      : "RCT for Spatial Notions and Laterality Teaching App"
                  }
                  className="hidden dark:block rounded-md shadow-sm max-w-full h-auto mx-auto"
                />
              </div>
              <p className="text-lg text-center mt-2">
                {language === "pt-BR"
                  ? "Figura 3: Exemplo de Lista Inicial de Requisitos/Restrições (TRR)"
                  : "Figure 3: Example of Initial Requirements/Constraints List (RCT)"}
              </p>
            </div>
          </div>
        </section>

        {/* Gerar Personas */}
        <section id="gerar-personas" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Gerar Personas (PersonAut)"
                : "Activity: Generate Personas (PersonAut)"}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "A atividade de gerar Personas serve para criar objetos de empatia. Cada persona deve corresponder a um FCA preenchido."
                : "The activity of generating Personas serves to create empathy objects. Each persona must correspond to a completed FCA."}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "pt-BR"
                  ? "Dados para construção das Personas:"
                  : "Data for Personas construction:"}
              </h3>

              <ul className="text-lg text-justify space-y-2 list-disc list-inside ml-4">
                <li>
                  {language === "pt-BR"
                    ? "Analise as seções do Canvas do Cuidador (CCA)."
                    : "Analyze the Caregiver Canvas (CCA) sections."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Analise as recomendações do Canvas do Terapeuta (CTA)."
                    : "Analyze the recommendations from the Therapist Canvas (CTA)."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Analise os requisitos do Canvas do Solicitante (CSS)."
                    : "Analyze the requirements from the Requester Canvas (CSS)."}
                </li>
              </ul>
            </div>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR" ? "Passo a Passo" : "Step by Step"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? " Transcreva atividades que acalmam/estressam dos Canvas."
                        : " Transcribe calming/stressing activities from Canvases."}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? " Do Canvas dos Pais (Aspectos familiares)."
                        : " From Parents Canvas (Family aspects)."}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? " Se houver contradição, analise e decida qual prevalece."
                        : " If there is contradiction, analyze and decide which prevails."}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? " Defina nome fictício, gênero e idade."
                        : " Define fictional name, gender and age."}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? " Insira o gráfico VGA e uma foto/desenho."
                        : " Insert VGA graph and a photo/drawing."}
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Imagem dos exemplo de modelos do PersonAut */}
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              {/* Modelo 1 */}
              <div className="border-2 border-gray-300 rounded-xl p-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-full max-w-md overflow-hidden rounded-lg">
                    <img
                      src={
                        language === "pt-BR"
                          ? "src/modules/Tutorial/assets/analysis-phase/personAut1-pt-br.png"
                          : "src/modules/Tutorial/assets/analysis-phase/personAut1-en-us.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Figura 4: Modelo 1 - PersonAut"
                          : "Figure 4: Model 1 - PersonAut"
                      }
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <h5 className="text-lg mb-3 text-center">
                  {language === "pt-BR"
                    ? "Figura 4: Modelo 1 - PersonAut"
                    : "Figure 4: Model 1 - PersonAut"}
                </h5>
              </div>

              {/* Modelo 2 */}
              <div className="border-2 border-gray-300 rounded-xl p-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-full max-w-md overflow-hidden rounded-lg">
                    <img
                      src={
                        language === "pt-BR"
                          ? "src/modules/Tutorial/assets/analysis-phase/personAut2-pt-br.png"
                          : "src/modules/Tutorial/assets/analysis-phase/personAut2-en-us.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Figura 5: Modelo 2 - PersonAut"
                          : "Figure 5: Model 2 - PersonAut"
                      }
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <h5 className="text-lg mb-3 text-center">
                  {language === "pt-BR"
                    ? "Figura 5: Modelo 2 - PersonAut"
                    : "Figure 5: Model 2 - PersonAut"}
                </h5>
              </div>
            </div>
          </div>
        </section>

        {/* Mapa de Empatia */}
        <section id="mapa-empatia" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Heart className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Gerar Mapa de Empatia"
                : "Activity: Generate Empathy Map"}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-justify">
              {language === "pt-BR"
                ? "O ProAut oferece um recurso adicional para geração de empatia: um Mapa de Empatia denominado EmpathyAut."
                : "ProAut offers an additional resource for generating empathy: an Empathy Map named EmpathyAut."}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "pt-BR"
                  ? "Obtenção das Instâncias:"
                  : "Obtaining Instances:"}
              </h3>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "As instâncias do EmpathyAut são obtidas diretamente do Formulário de Caracterização do Autista (FCA) e do Canvas do Cliente (CCS)."
                  : "EmpathyAut instances are obtained directly from the Autistic Characterization Form (FCA) and the Client Canvas (CSS)."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "pt-BR"
                  ? "Complementaridade:"
                  : "Complementarity:"}
              </h3>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "O PersonAut e o EmpathyAut devem se complementar para tornar o processo de empatia rico e preciso."
                  : "PersonAut and EmpathyAut must complement each other to make the empathy process rich and accurate."}
              </p>

              <ul className="text-lg text-justify space-y-2 list-disc list-inside ml-4">
                <li>
                  <strong>EmpathyAut:</strong>{" "}
                  {language === "pt-BR"
                    ? "Foca no comprometimento em relação às áreas afetadas pelo TEA."
                    : "Focuses on impairment regarding areas affected by ASD."}
                </li>
                <li>
                  <strong>PersonAut:</strong>{" "}
                  {language === "pt-BR"
                    ? "Foca no relacionamento com a família, escola e tecnologia."
                    : "Focuses on relationships with family, school, and technology."}
                </li>
              </ul>
            </div>

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
                        ? "Use os dados do FCA para preencher as áreas de limitação;"
                        : "Use ACF data to fill the limitation areas;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Analise cada uma das 4 áreas (Interação, Comunicação, Comportamento, Cognição);"
                        : "Analyze each of the 4 areas (Interaction, Communication, Behavior, Cognition);"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Identifique os principais desafios em cada área;"
                        : "Identify main challenges in each area;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Documente como esses desafios afetam o dia a dia;"
                        : "Document how these challenges affect daily life;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Relacione com os objetivos do aplicativo definidos no CSS;"
                        : "Relate to the application objectives defined in the RSC;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Considere as estratégias de enfrentamento mencionadas pelos cuidadores;"
                        : "Consider coping strategies mentioned by caregivers;"}
                    </li>
                    <li className="text-justify">
                      {language === "pt-BR"
                        ? "Valide o mapa com especialistas quando possível."
                        : "Validate the map with specialists when possible."}
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
                      ? "INFO: Embora a equipe possa escolher entre o PersonAut e o EmpathyAut, sugere-se o uso de ambos, pois suas informações se referem a diferentes aspectos da pessoa."
                      : "INFO: Although the team can choose between PersonAut and EmpathyAut, it is suggested to use both, as their information refers to different aspects of the person."}
                  </p>
                </div>
              </div>
            </div>

            {/* Imagem do exemplo de Mapa de Empatia */}
            <div className="my-6 p-4">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "src/modules/Tutorial/assets/analysis-phase/empathyAut-pt-br.png"
                      : "src/modules/Tutorial/assets/analysis-phase/empathyAut-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Figura 6: Exemplo de Mapa de Empatia (EmpathyAut)"
                      : "Figure 6: Example of Empathy Map (EmpathyAut)"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
              </div>
              <p className="text-lg text-center mt-2">
                {language === "pt-BR"
                  ? "Figura 6: Exemplo de Mapa de Empatia (EmpathyAut)"
                  : "Figure 6: Example of Empathy Map (EmpathyAut)"}
              </p>
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
                className="flex flex-col p-3 rounded border"
              >
                <span className="text-xs font-bold mb-1 uppercase tracking-wider">
                  {language === "pt-BR" ? artifact.type_pt : artifact.type_en}
                </span>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="font-medium">
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
