// AnalysisPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Análise do processo ProAut.
// Detalha a triangulação de dados, geração de personas e mapa de empatia.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
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
      name_en: "Canvases (Requester, Caregivers, Therapists)",
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
        id: "conclusao-fase",
        title: language === "pt-BR" ? "Encerramento da Fase" : "Phase Closing",
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
          <p className="text-lg text-justify">
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
            <p className="text-justify">
              {language === "pt-BR"
                ? "A Fase de Análise é responsável por transformar as informações brutas coletadas na Fase de Imersão em conhecimento estruturado, capaz de orientar o design e o desenvolvimento da solução. Nesta etapa, a equipe interpreta, cruza e organiza os dados fornecidos pelos diversos stakeholders — cuidadores, terapeutas e cliente solicitante — para compreender profundamente o contexto do autista e suas necessidades."
                : "The Analysis Phase is responsible for transforming the raw information collected in the Immersion Phase into structured knowledge, capable of guiding the solution's design and development. In this stage, the team interprets, cross-references, and organizes data provided by various stakeholders — caregivers, therapists, and the requesting client — to deeply understand the autistic person's context and needs."}
            </p>
            <p className="text-justify">
              {language === "pt-BR"
                ? "Além de identificar requisitos e restrições, esta fase também envolve a construção de artefatos que aumentam a empatia do time com o usuário autista, como o PersonAut e o EmpathyAut. O resultado central é a TRR Inicial, que posteriormente se tornará a base para a fase de Ideação e para o protótipo."
                : "In addition to identifying requirements and constraints, this phase also involves building artifacts that increase the team's empathy with the autistic user, such as PersonAut and EmpathyAut. The central result is the Initial RCT (Requirements/Constraints Table), which will later become the basis for the Ideation phase and the prototype."}
            </p>
            <p className="text-justify">
              {language === "pt-BR"
                ? "O resultado final desta fase é a elaboração de uma TRR (Tabela de Requisitos Refinada) completa, que reúne requisitos, justificativas, dependências, sugestões iniciais de design e recomendações baseadas no GuideAut. Esse documento se torna, posteriormente, o principal artefato de entrada para a Fase de Prototipação."
                : "The final result of this phase is the elaboration of a complete RCT (Refined Requirements Table), which gathers requirements, justifications, dependencies, initial design suggestions, and recommendations based on GuideAut. This document subsequently becomes the main input artifact for the Prototyping Phase."}
            </p>

            {diagramAnalysisOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramAnalysisOpen(false)}
                />

                {/* Conteúdo do pop-up do diagrama de análise */}
                <Card
                  className="relative mx-auto my-auto w-full max-w-md lg:max-w-3xl max-h-[80vh] overflow-y-auto animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="sticky top-0 z-50 border-b px-6 py-4 rounded-t-xl">
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
                  <CardContent
                    className="p-6 overflow-y-auto"
                    style={{ maxHeight: "calc(80vh - 72px)" }}
                  >
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
                                Triangulate Data
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Cross-reference information coming from
                                different sources — such as interviews,
                                observations, documents, and research — to
                                verify if they confirm each other. In ProAut,
                                triangulation helps increase information
                                reliability, ensuring that the elicited
                                requirements truly reflect the user's needs and
                                do not depend on just one perspective.
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
                                feels, says, does, and hears, as well as their
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
                                caregiver, or therapist, including their needs,
                                difficulties, goals, and behaviors. This
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
                      ? "/assets/analysis-phase/FluxoAnalise-pt-br.png"
                      : "/assets/analysis-phase/FluxoAnalise-en-us.png"
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
                  {language === "pt-BR"
                    ? "Visão Geral desta fase"
                    : "Phase Overview"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-blue-800 dark:text-blue-200 space-y-3">
                <p className="mb-2 font-semibold">
                  {language === "pt-BR"
                    ? "Resumidamente, a fase de Análise é constituída do seguinte:"
                    : "Briefly, the Analysis phase consists of the following:"}
                </p>
                <ul className="space-y-3 list-disc list-inside mb-4 ml-4">
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

                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Entradas da fase:"
                        : "Phase Inputs:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Os Canvas do cuidador (CCA), do terapeuta (CTA) e do solicitante do software (CSS); o(s) Formulário(s) de Caracterização do Autista (FCA) preenchido(s) e seu(s) respectivo(s) Gráfico(s) de Visão Geral do Autista (VGA)"
                      : "Caregiver (CCA), Therapist (CTA), and Requester (CSS) Canvases; filled Autistic Characterization Form(s) (FCA) and respective Autistic Overview Graph(s) (VGA)."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Saídas da fase:"
                        : "Phase Outputs:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "A Tabela de Requisitos/Restrições (TRR) Inicial, o PersonAut e o EmpathyAut."
                      : "The Initial Requirements/Constraints Table (RCT), PersonAut, and EmpathyAut."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Time de desenvolvimento, cuidador(es) e/ou terapeuta(s)."
                      : "Development team, caregiver(s) and/or therapist(s)."}
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
                ? "A Triangulação de Dados é o núcleo da Fase de Análise. Nela, a equipe cruza as informações dos três Canvas (CCA, CTA e CSS), correlacionando pontos semelhantes, complementares ou contraditórios. O objetivo é extrair requisitos e restrições, garantindo que a visão do cliente esteja alinhada às necessidades do autista e às percepções de quem convive ou trabalha com ele."
                : "Data Triangulation is the core of the Analysis Phase. Here, the team cross-references information from the three Canvases (CCA, CTA, and CSS), correlating similar, complementary, or contradictory points. The goal is to extract requirements and constraints, ensuring the client's vision aligns with the autistic person's needs and the perceptions of those who live or work with them."}
            </p>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR"
                    ? "Como funciona a triangulação"
                    : "How triangulation works"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <ul className="text-lg text-justify text-blue-700 dark:text-blue-300 list-disc list-inside space-y-3 ml-4">
                    <li>
                      <strong>
                        {language === "pt-BR"
                          ? "Extrair informações relevantes:"
                          : "Extract relevant information:"}
                      </strong>{" "}
                      {language === "pt-BR"
                        ? "A equipe identifica, nos Canvas e FCAs, necessidades, dores, comportamentos, rotinas, dificuldades, preferências e limitações."
                        : "The team identifies needs, pains, behaviors, routines, difficulties, preferences, and limitations in the Canvases and ACFs."}
                    </li>
                    <li>
                      <strong>
                        {language === "pt-BR"
                          ? "Cruzar informações:"
                          : "Cross-reference information:"}
                      </strong>{" "}
                      {language === "pt-BR"
                        ? "Verifica-se o que é reforçado pelo cuidador, terapeuta e solicitante, e o que diverge entre eles."
                        : "Verify what is reinforced by the caregiver, therapist, and requester, and what diverges among them."}
                    </li>
                    <li>
                      <strong>
                        {language === "pt-BR"
                          ? "(Re)Definir requisitos e restrições:"
                          : "(Re)Define requirements and constraints:"}
                      </strong>{" "}
                      {language === "pt-BR"
                        ? "A partir dos dados cruzados, são propostas definições iniciais de requisitos funcionais, requisitos não funcionais e restrições sensoriais, ambientais ou operacionais."
                        : "Based on cross-referenced data, initial definitions of functional requirements, non-functional requirements, and sensory, environmental, or operational constraints are proposed."}
                    </li>
                    <li>
                      <strong>
                        {language === "pt-BR"
                          ? "Validar com o cliente:"
                          : "Validate with client:"}
                      </strong>{" "}
                      {language === "pt-BR"
                        ? "Todo requisito extraído deve ser confirmado com o cliente, garantindo que esteja correto e condizente com o objetivo do software."
                        : "Every extracted requirement must be confirmed with the client, ensuring it is correct and consistent with the software's objective."}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {diagramTriangularOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramTriangularOpen(false)}
                />

                {/* Conteúdo do pop-up do diagrama de triangular dados */}
                <Card
                  className="relative mx-auto my-auto w-full max-w-md lg:max-w-3xl max-h-[80vh] animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="sticky top-0 z-50 border-b px-6 py-4 rounded-t-xl">
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
                  <CardContent
                    className="p-6 overflow-y-auto"
                    style={{ maxHeight: "calc(80vh - 72px)" }}
                  >
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
                                system must have (requirements) and everything
                                it cannot do or must adhere to (constraints). In
                                ProAut, this step occurs after analyzing the
                                collected data, ensuring that requirements are
                                aligned with the real context of the autistic
                                user. It is the moment to correct, update or
                                reorganize information so that the RCT
                                accurately reflects the identified needs.
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
                  src={
                    language === "pt-BR"
                      ? "/assets/analysis-phase/TriangularDado-PTBR.png"
                      : "/assets/analysis-phase/TriangularDado-InglesUS.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Figura 2: Fluxo sugerido para triangular dados"
                      : "Figure 2: Suggested workflow for data triangulation"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-lg text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 2: Representação da subatividade de Triangular Dados"
                    : "Figure 2: Representation of the Triangulate Data subactivity"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Tabela de Requisitos/Restrições (TRR)"
                  : "Requirements/Constraints Table (RCT)"}
              </h3>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "O principal artefato gerado é a TRR Inicial, com as três primeiras colunas preenchidas:"
                  : "The main artifact generated is the Initial RCT, with the first three columns filled:"}
              </p>
              <ul className="text-lg text-justify list-disc list-inside ml-4 space-y-2">
                <li>
                  {language === "pt-BR"
                    ? "Identificação do requisito"
                    : "Requirement Identification"}
                </li>
                <li>{language === "pt-BR" ? "Descrição" : "Description"}</li>
                <li>
                  {language === "pt-BR"
                    ? "Justificativa ou origem"
                    : "Justification or origin"}
                </li>
              </ul>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "As demais colunas (prioridade, sugestão de baixa fidelidade, recomendações do GuideAut etc.) serão completadas somente na Fase de Ideação."
                  : "The remaining columns (priority, low-fidelity suggestion, GuideAut recommendations, etc.) will be completed only in the Ideation Phase."}
              </p>
            </div>

            {/* Imagem do exemplo de TRR Inicial */}
            <div className="my-6 p-4">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <img
                  src={
                    language === "pt-BR"
                      ? "/assets/analysis-phase/initialTRR-pt-br-lightTheme.png"
                      : "/assets/analysis-phase/initialTRR-en-us-lightTheme.png"
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
                      ? "/assets/analysis-phase/initialTRR-pt-br-darkTheme.png"
                      : "/assets/analysis-phase/initialTRR-en-us-darkTheme.png"
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
                ? "Para aprofundar a empatia com o usuário autista, a equipe utiliza o artefato PersonAut, específico do ProAut. Ele sintetiza informações do FCA e do VGA, criando uma representação clara, humana e compreensível do autista usuário do sistema."
                : "To deepen empathy with the autistic user, the team uses the PersonAut artifact, specific to ProAut. It synthesizes information from the FCA and VGA, creating a clear, human, and understandable representation of the autistic system user."}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "pt-BR"
                  ? "Quantidade de Personas:"
                  : "Number of Personas:"}
              </h3>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Se houver mais de um autista envolvido, é possível gerar mais de um PersonAut. Cada Persona deve ser criada com base em um FCA individual para garantir precisão."
                  : "If more than one autistic person is involved, it is possible to generate more than one PersonAut. Each Persona must be created based on an individual FCA to ensure accuracy."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {language === "pt-BR"
                  ? "Modelos do PersonAut:"
                  : "PersonAut Models:"}
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200">
                    {language === "pt-BR"
                      ? "Modelo 1 – PersonAut por tópicos"
                      : "Model 1 – Topic-based PersonAut"}
                  </h4>
                  <p className="text-lg text-justify text-blue-700 dark:text-blue-300">
                    {language === "pt-BR"
                      ? "Apresenta o autista através de listas organizadas (perfil, comportamentos, preferências, dificuldades etc.)."
                      : "Presents the autistic person through organized lists (profile, behaviors, preferences, difficulties, etc.)."}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200">
                    {language === "pt-BR"
                      ? "Modelo 2 – PersonAut narrativo"
                      : "Model 2 – Narrative PersonAut"}
                  </h4>
                  <p className="text-lg text-justify text-blue-700 dark:text-blue-300">
                    {language === "pt-BR"
                      ? "Descreve a rotina e as características do autista por meio de um texto fluido, abordando: relações familiares, rotina escolar, sensibilidade a estímulos, relação com tecnologia, comportamentos específicos."
                      : "Describes the routine and characteristics of the autistic person through fluid text, covering: family relationships, school routine, sensitivity to stimuli, relationship with technology, and specific behaviors."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                    {language === "pt-BR"
                      ? "Objetivo: Proporcionar à equipe informações pertinentes à condição geral do autista. A intenção é que a equipe se sinta o mais próxima possível da realidade do autista, com base nas características apresentadas, juntamente com o VGA gerado."
                      : "Objective: To provide the team with relevant information regarding the autistic person's general condition. The intention is for the team to feel as close as possible to the autistic person's reality, based on the presented characteristics, along with the generated VGA."}
                  </p>
                </div>
              </div>
            </div>

            {/* Imagem dos exemplo de modelos do PersonAut */}
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              {/* Modelo 1 */}
              <div className="border-2 border-gray-300 rounded-xl p-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-full max-w-md overflow-hidden rounded-lg">
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/analysis-phase/personAut1-pt-br.png"
                          : "/assets/analysis-phase/personAut1-en-us.png"
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
                    ? "Modelo 1: Preenchimento por meio de tópicos."
                    : "Model 1: Completion via topics."}
                </h5>
              </div>

              {/* Modelo 2 */}
              <div className="border-2 border-gray-300 rounded-xl p-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-full max-w-md overflow-hidden rounded-lg">
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/analysis-phase/personAut2-pt-br.png"
                          : "/assets/analysis-phase/personAut2-en-us.png"
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
                    ? "Modelo 2: Preenchimento com texto descritivo."
                    : "Model 2: Completion with descriptive text."}
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
                ? "O ProAut também utiliza um modelo próprio de mapa de empatia: o EmpathyAut, que complementa o PersonAut ao aprofundar aspectos específicos do Transtorno do Espectro Autista."
                : "ProAut also uses its own empathy map model: EmpathyAut, which complements PersonAut by deepening specific aspects of Autism Spectrum Disorder."}
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
                    ? "Aborda aspectos mais relacionados ao comprometimento do autista em relação às áreas afetadas pelo TEA."
                    : "Addresses aspects more related to the autistic person's impairment regarding areas affected by ASD."}
                </li>
                <li>
                  <strong>PersonAut:</strong>{" "}
                  {language === "pt-BR"
                    ? "Aborda informações sobre aspectos de relacionamento com a família, com a escola e com a tecnologia."
                    : "Addresses information about relationship aspects with family, school, and technology."}
                </li>
              </ul>
            </div>

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
                      ? "/assets/analysis-phase/empathyAut-pt-br.png"
                      : "/assets/analysis-phase/empathyAut-en-us.png"
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
                  ? "Figura 6: Canvas do EmpathyAut"
                  : "Figure 6: EmpathyAut Canvas"}
              </p>
            </div>
          </div>
        </section>

        {/* --- ENCERRAMENTO DA FASE --- */}
        <section
          id="conclusao-fase"
          className="scroll-m-20 space-y-6 mt-12 pt-8 border-t"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Encerramento da Fase"
                : "Phase Conclusion"}
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <CheckCircle className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR" ? "Conclusão" : "Conclusion"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-justify text-blue-700 dark:text-blue-300 mb-4">
                    {language === "pt-BR"
                      ? "Ao concluir as três atividades — Triangulação de Dados, PersonAut e EmpathyAut — a equipe obtém uma visão sólida, estruturada e humanizada do problema. Com o material validado pelos stakeholders, encerra-se a fase com:"
                      : "Upon concluding the three activities — Data Triangulation, PersonAut, and EmpathyAut — the team obtains a solid, structured, and humanized view of the problem. With the material validated by stakeholders, the phase ends with:"}
                  </p>
                  <ul className="text-justify text-blue-700 dark:text-blue-300 list-disc list-inside ml-4 space-y-1 mb-4">
                    <li>
                      {language === "pt-BR" ? "TRR Inicial" : "Initial RCT"}
                    </li>
                    <li>
                      {language === "pt-BR"
                        ? "Persona(s) criada(s)"
                        : "Created Persona(s)"}
                    </li>
                    <li>
                      {language === "pt-BR"
                        ? "EmpathyAut preenchido"
                        : "Completed EmpathyAut"}
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-center">
                      {language === "pt-BR"
                        ? "Esses artefatos orientam diretamente a Fase de Ideação e garantem que as decisões futuras respeitem o contexto real da pessoa autista."
                        : "These artifacts directly guide the Ideation Phase and ensure that future decisions respect the autistic person's real context."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

        {/* --- INICIO DOS BOTÕES DE NAVEGAÇÃO --- */}
        <div className="flex flex-col md:flex-row gap-4 pt-8 pb-8">
          {/* Botão Voltar: Fase 1 - Imersão */}
          <button
            onClick={() => navigate("/imersion-phase")}
            className="group w-full md:w-1/2 relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500 flex items-center justify-between"
          >
            <div className="relative z-10 bg-gray-100 dark:bg-gray-700 p-3 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
              <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500" />
            </div>

            <div className="relative z-10 flex flex-col items-end gap-1">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                {language === "pt-BR" ? "Voltar" : "Back"}
              </span>
              <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {language === "pt-BR" ? "1. Imersão" : "1. Immersion"}
              </span>
            </div>
          </button>

          {/* Botão Avançar: Fase 3 - Ideação (Verde) */}
          <button
            onClick={() => navigate("/ideation-phase")}
            className="group w-full md:w-1/2 relative overflow-hidden rounded-xl bg-green-600 hover:bg-green-700 text-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-between"
          >
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-green-100 text-sm font-medium uppercase tracking-wider">
                {language === "pt-BR" ? "Próximo Passo" : "Next Step"}
              </span>
              <span className="text-xl font-bold flex items-center gap-2">
                {language === "pt-BR"
                  ? "Ir para Fase 3: Ideação"
                  : "Go to Phase 3: Ideation"}
              </span>
            </div>

            <div className="relative z-10 bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
              <ArrowRight className="h-6 w-6 text-white" />
            </div>

            {/* Efeito decorativo de fundo */}
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:w-48 group-hover:h-48 transition-all duration-500" />
          </button>
        </div>
        {/* --- FIM DOS BOTÕES DE NAVEGAÇÃO --- */}
      </div>

      {tocOpen && (
        <div
          className="fixed w-full h-full bg-black/50 z-[999] lg:hidden"
          onClick={() => setTocOpen(false)}
        />
      )}

      {/* Tabela de Conteúdos */}
      <div
        className={`${tocOpen ? "fixed" : "hidden"} w-[100vw] max-h-[80vh] z-[1000] lg:z-0 lg:relative lg:w-80 lg:block lg:order-2 lg:sticky lg:top-40 lg:self-start lg:max-h-[calc(100vh-5rem)] overflow-y-auto flex-shrink-0 p-6`}
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
