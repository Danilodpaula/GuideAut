// PrototypingPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Prototipação do processo ProAut.
// Detalha a criação, validação e refinamento do protótipo com base na TRR Completa.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  CheckCircle,
  ChevronRight,
  FileText,
  Info,
  Lightbulb,
  PenTool,
  Repeat,
  Users,
  X,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Componente principal da página "Fase de Prototipação".
 * Abrange as atividades de Criar, Validar e Refinar o protótipo.
 */
export default function PrototypingPhase() {
  const phaseArtifacts = [
    {
      id: "trr-completa",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "TRR Completa",
      name_en: "Complete TRR",
    },
    {
      id: "prototipo-validado",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Protótipo Validado",
      name_en: "Validated Prototype",
    },
  ];

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [diagramOpen, setDiagramOpen] = useState(false);

  // Estrutura da tabela de conteúdos - atualizada com nova seção
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
        id: "ideacao",
        title: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
        type: "navigate",
        path: "/ideation-phase",
      },
      {
        id: "visao-geral",
        title: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
        type: "scroll",
      },
      {
        id: "criar-prototipo",
        title: language === "pt-BR" ? "Criar Protótipo" : "Create Prototype",
        type: "scroll",
      },
      {
        id: "validar-prototipo",
        title:
          language === "pt-BR" ? "Validar Protótipo" : "Validate Prototype",
        type: "scroll",
      },
      {
        id: "refinar-prototipo",
        title: language === "pt-BR" ? "Refinar Protótipo" : "Refine Prototype",
        type: "scroll",
      },
      {
        id: "conclusao-fase",
        title: language === "pt-BR" ? "Conclusão da Fase" : "Phase Conclusion",
        type: "scroll",
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
            {language === "pt-BR"
              ? "Fase de Prototipação"
              : "Prototyping Phase"}
          </h1>
          <p className="text-justify text-lg">
            {language === "pt-BR"
              ? "Transformando ideias em algo visual, palpável e interativo para validar decisões de design."
              : "Transforming ideas into something visual, tangible, and interactive to validate design decisions."}
          </p>
        </div>

        {/* --- VISÃO GERAL --- */}
        <section id="visao-geral" className="scroll-m-20 space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Visão Geral" : "Overview"}
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-justify">
              {language === "pt-BR"
                ? "A fase de Prototipação tem como objetivo transformar ideias, requisitos e conceitos desenvolvidos nas etapas anteriores em algo visual, palpável e interativo. Um protótipo pode ser físico ou virtual e serve para simular a experiência do usuário, validar decisões de design e antecipar ajustes antes do desenvolvimento final. Essa etapa permite que a equipe explore soluções, teste hipóteses e descubra pontos de melhoria rapidamente, reduzindo custos e garantindo que o produto final esteja alinhado às necessidades reais dos usuários e stakeholders."
                : "The Prototyping phase aims to transform ideas, requirements, and concepts developed in previous stages into something visual, tangible, and interactive. A prototype may be physical or virtual and is used to simulate the user experience, validate design decisions, and anticipate adjustments before the final development. This stage allows the team to explore solutions, test hypotheses, and quickly identify improvement points, reducing costs and ensuring that the final product aligns with the actual needs of users and stakeholders."}
            </p>

            {diagramOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramOpen(false)}
                />

                {/* Conteúdo do pop-up vem aqui.*/}
                <Card
                  className="relative mx-auto my-auto max-w-md w-full max-h-[80vh] overflow-y-auto animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header + Botão de Fechar*/}
                  <CardHeader className="sticky top-0 z-10 bg-white border-b px-6 py-4 rounded-t-xl">
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
                  {/* Texto do pop-up atualizado */}
                  <CardContent className="p-6">
                    <div className="space-y-4 text-lg">
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
                                  [4.1]
                                </span>
                                Criar protótipo
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Transformar as ideias de interface em uma
                                representação visual e interativa, permitindo
                                simular como a aplicação irá funcionar. No
                                ProAut, isso envolve montar telas, definir
                                layouts, organizar elementos e criar fluxos que
                                representem o uso real do sistema. O protótipo
                                serve como uma prévia do produto final,
                                permitindo avaliações e ajustes antes do
                                desenvolvimento.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [4.2]
                                </span>
                                Validar protótipo
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Apresentar e testar a versão criada com os
                                stakeholders — como solicitante, cuidador,
                                terapeuta e usuários — para verificar se ele
                                atende às necessidades do projeto. No ProAut,
                                essa validação ajuda a identificar problemas,
                                confirmar decisões de design e receber sugestões
                                de melhoria. É o momento de garantir que o
                                protótipo faz sentido, está claro e realmente
                                funciona para o público autista antes de seguir
                                para o refinamento e desenvolvimento.
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-2xl">⬦</span>
                              <span className="font-semibold">- Melhoria?</span>
                            </div>

                            <div className="ml-8 grid grid-cols-2 gap-2">
                              <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                                <span className="font-medium text-green-700">
                                  [Sim]
                                </span>
                              </div>
                              <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                                <span className="font-medium text-blue-700">
                                  [Não]
                                </span>
                              </div>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [4.3]
                                </span>
                                Refinar protótipo
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Ajustar, melhorar e corrigir a versão inicial
                                com base no feedback recebido durante a
                                validação. No ProAut, isso envolve revisar
                                problemas apontados, atualizar elementos
                                visuais, reorganizar fluxos e deixar a interface
                                mais adequada para o usuário autista. O
                                refinamento é iterativo e continua até que o
                                protótipo alcance um nível satisfatório de
                                clareza, funcionalidade e usabilidade.
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">◯</span>
                            <span className="font-semibold">Start</span>
                          </div>

                          <div className="ml-6 space-y-4">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [4.1]
                                </span>
                                Create Prototype
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Transform interface ideas into a visual and
                                interactive representation, simulating how the
                                application will work.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [4.2]
                                </span>
                                Validate Prototype
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Present and test the prototype with stakeholders
                                to confirm whether it meets project needs and
                                identify necessary improvements.
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-2xl">⬦</span>
                              <span className="font-semibold">
                                Improvements needed?
                              </span>
                            </div>

                            <div className="ml-8 grid grid-cols-2 gap-2">
                              <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                                <span className="font-medium text-green-700">
                                  [Yes] →
                                </span>
                              </div>
                              <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                                <span className="font-medium text-blue-700">
                                  [No] → [4.3]
                                </span>
                              </div>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [4.3]
                                </span>
                                Refine Prototype
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Adjust and improve the prototype based on
                                validation feedback. This cycle continues until
                                the prototype reaches a satisfactory level of
                                clarity, functionality, and usability.
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

            {/* Fluxo Fase de Prototipação */}
            <div className="relative">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <div className="flex justify-end p-4">
                  <Card
                    className="cursor-pointer border border-blue-100"
                    onClick={() => setDiagramOpen(!diagramOpen)}
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
                      ? "src/modules/Tutorial/assets/prototyping-phase/FluxoPrototipacao-pt-br.png"
                      : "src/modules/Tutorial/assets/prototyping-phase/FluxoPrototipacao-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Figura 1: Fluxo sugerido para a atividade de prototipação"
                      : "Figure 1: Suggested workflow for the prototyping activity"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-sm text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 1: Fluxo sugerido para a atividade de prototipação"
                    : "Figure 1: Suggested workflow for the prototyping activity"}
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
              <CardContent className="text-blue-800 dark:text-blue-200 space-y-3">
                <ul className="space-y-3 list-disc list-inside mb-4 ml-4">
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Atividades da Fase:"
                        : "Phase Activities:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Criar Protótipo, Validar Protótipo e Refinar Protótipo."
                      : "Create Prototype, Validate Prototype, and Refine Prototype."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Entrada da fase:"
                        : "Phase input:"}
                    </strong>{" "}
                    {language === "pt-BR" ? "TRR Completa" : "Complete TRR"}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Saída da fase:"
                        : "Phase output:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Protótipo validado"
                      : "Validated Prototype"}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Equipe de desenvolvimento, terapeuta(s) e cuidador(es) (quando aplicável), cliente(s) e usuário(s) finais."
                      : "Development team, therapist(s), caregiver(s) (when applicable), and client(s)."}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --- ATIVIDADE: CRIAR PROTÓTIPO --- */}
        <section id="criar-prototipo" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <PenTool className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Criar Protótipo"
                : "Activity: Create Prototype"}
            </h2>
          </div>

          <div className="text-justify space-y-4 text-lg leading-relaxed">
            <p>
              {language === "pt-BR"
                ? "Nessa atividade, o time de design utiliza os requisitos do projeto como referência para construir a primeira versão do protótipo. O processo parte da interpretação detalhada das especificações registradas na TRR, seguida da análise das sugestões de baixa fidelidade fornecidas. Quando aplicável, também são consultados guias de design — como o GuideAut — que orientam o uso adequado de cores, formas geométricas, espaçamentos, componentes e padrões de design inclusivo. O objetivo é produzir uma representação coerente com a visão do projeto, estruturada de forma organizada e consistente com as necessidades dos usuários."
                : "In this activity, the design team uses the project requirements as a reference to construct the first version of the prototype. The process begins with a detailed interpretation of the specifications documented in the TRR, followed by an analysis of the low-fidelity suggestions provided. When applicable, design guides—such as GuideAut—are also consulted to guide decisions regarding colors, geometric shapes, spacing, components, and inclusive design patterns."}
            </p>

            {/* Card de info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    {language === "pt-BR"
                      ? "Orientação pelo GuideAut"
                      : "Guidance by GuideAut"}
                  </h4>
                  <p className="text-justify text-blue-800 dark:text-blue-200">
                    {language === "pt-BR"
                      ? "Quando aplicável, também são consultados guias de design — como o GuideAut — que orientam o uso adequado de cores, formas geométricas, espaçamentos, componentes e padrões de design inclusivo."
                      : "When applicable, design guides—such as GuideAut—are also consulted to guide decisions regarding colors, geometric shapes, spacing, components, and inclusive design patterns."}
                  </p>
                </div>
              </div>
            </div>

            <p>
              {language === "pt-BR"
                ? "O objetivo é produzir uma representação coerente com a visão do projeto, estruturada de forma organizada e consistente com as necessidades dos usuários."
                : "The objective is to produce a coherent representation of the project's vision, structured in an organized manner and consistent with users' needs."}
            </p>
          </div>
        </section>

        {/* --- ATIVIDADE: VALIDAR PROTÓTIPO --- */}
        <section id="validar-prototipo" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Validar Protótipo"
                : "Activity: Validate Prototype"}
            </h2>
          </div>

          <div className="text-justify space-y-4 text-lg leading-relaxed">
            <p>
              {language === "pt-BR"
                ? "Após a construção do protótipo, inicia-se sua validação com os stakeholders. Essa validação geralmente ocorre em reuniões ou apresentações, preferencialmente utilizando-se um protótipo de alta fidelidade exibido em um dispositivo físico ou emulado, como smartphones, tablets ou notebooks. Essa abordagem facilita a visualização em escala real, a identificação de problemas e a avaliação da navegabilidade e das funcionalidades simuladas. Durante a validação, os envolvidos podem sugerir ajustes ou apontar inconsistências, e todas as observações devem ser registradas para garantir que nenhum ponto seja perdido"
                : "After the prototype is created, validation with stakeholders begins. This validation typically occurs in meetings or presentations, preferably using a high-fidelity prototype displayed on a physical or emulated device such as a smartphone, tablet, or laptop. This approach helps stakeholders visualize the design at real scale, identify issues, and evaluate navigation and simulated functionalities."}
            </p>

            {/* Card de benefícios atualizado para usar a lógica da fase de imersão */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR"
                    ? "Benefícios da Validação com Alta Fidelidade"
                    : "Benefits of High-Fidelity Validation"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-justify text-blue-700 dark:text-blue-300 mb-3">
                    {language === "pt-BR"
                      ? "Essa abordagem facilita a visualização em escala real, a identificação de problemas e a avaliação da navegabilidade e das funcionalidades simuladas."
                      : "This approach helps stakeholders visualize the design at real scale, identify issues, and evaluate navigation and simulated functionalities."}
                  </p>
                  <ul className="text-blue-700 dark:text-blue-300 list-disc list-inside ml-4 space-y-2">
                    <li>
                      {language === "pt-BR"
                        ? "Visualização do projeto em escala real"
                        : "Visualizing the design at real scale"}
                    </li>
                    <li>
                      {language === "pt-BR"
                        ? "Identificação de problemas"
                        : "Identification of issues"}
                    </li>
                    <li>
                      {language === "pt-BR"
                        ? "Avaliação da navegabilidade"
                        : "Evaluation of navigation"}
                    </li>
                    <li>
                      {language === "pt-BR"
                        ? "Avaliação das funcionalidades simuladas"
                        : "Evaluation of simulated functionalities"}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Card de info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-justify text-blue-800 dark:text-blue-200 font-medium">
                    <strong>
                      {language === "pt-BR"
                        ? "Registro das Observações:"
                        : "Recording Observations:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Durante a validação, os envolvidos podem sugerir ajustes ou apontar inconsistências, e todas as observações devem ser registradas para garantir que nenhum ponto seja perdido."
                      : "During validation, participants may suggest adjustments or point out inconsistencies. All observations must be recorded to ensure that no change request is overlooked."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ATIVIDADE: REFINAR PROTÓTIPO --- */}
        <section id="refinar-prototipo" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Repeat className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Atividade: Refinar Protótipo"
                : "Activity: Refine Prototype"}
            </h2>
          </div>

          <div className="text-justify space-y-4 text-lg leading-relaxed">
            <p>
              {language === "pt-BR"
                ? "Concluída a validação, inicia-se o processo de refinamento. Essa etapa consiste na análise de todas as sugestões recebidas, na realização dos ajustes necessários e, se for o caso, em nova revisão com a equipe e stakeholders. Esse ciclo pode repetir-se diversas vezes até que o protótipo atinja um nível satisfatório de qualidade e esteja plenamente alinhado às expectativas do cliente e às necessidades dos usuários finais. Quando todos os elementos estão aprovados, o protótipo é considerado pronto para seguir para o desenvolvimento."
                : "Once validation is completed, the refinement process begins. This stage involves analyzing all suggestions received, making the necessary adjustments, and, if needed, performing another review with the team and stakeholders. This cycle may repeat several times until the prototype reaches a satisfactory quality level and is fully aligned with client expectations and user needs."}
            </p>

            {/* Card de ciclo iterativo atualizado para usar a lógica da fase de imersão */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Repeat className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                  {language === "pt-BR" ? "Ciclo Iterativo" : "Iterative Cycle"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-justify text-blue-700 dark:text-blue-300 mb-3">
                    {language === "pt-BR"
                      ? "Esse ciclo pode repetir-se diversas vezes até que o protótipo atinja um nível satisfatório de qualidade e esteja plenamente alinhado às expectativas do cliente e às necessidades dos usuários finais."
                      : "This cycle may repeat several times until the prototype reaches a satisfactory quality level and is fully aligned with client expectations and user needs."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-center">
                      {language === "pt-BR"
                        ? "Quando todos os elementos estão aprovados, o protótipo é considerado pronto para seguir para o desenvolvimento."
                        : "When all elements are approved, the prototype is considered ready for development."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --- CONCLUSÃO DA FASE --- */}
        <section
          id="conclusao-fase"
          className="scroll-m-20 space-y-6 mt-12 pt-8 border-t"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Conclusão da Fase" : "Phase Conclusion"}
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            {/* Card de conclusão atualizado para usar a lógica da fase de imersão */}
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
                      ? "A Prototipação é essencial para garantir que o projeto avance com segurança e clareza. Ela permite validar ideias, reduzir retrabalho, identificar problemas com antecedência e assegurar que a solução final atenda aos requisitos funcionais, visuais e de experiência do usuário. Ao final dessa fase, a equipe possui uma representação concreta e validada da interface, servindo como base sólida para o desenvolvimento."
                      : "The Prototyping phase is essential to ensure that the project progresses with clarity and confidence. It enables the validation of ideas, reduces rework, identifies issues early, and ensures that the final solution meets functional, visual, and user experience requirements."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-center">
                      {language === "pt-BR"
                        ? "Ao final dessa fase, a equipe possui uma representação concreta e validada da interface, servindo como base sólida para o desenvolvimento."
                        : "By the end of this phase, the team has a concrete and validated representation of the interface, serving as a solid foundation for development."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resumo dos Artefatos */}
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
                  <span className="font-medium">
                    {language === "pt-BR" ? artifact.name_pt : artifact.name_en}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* --- INICIO DO BOTÃO DE VOLTAR --- */}
        <div className="flex flex-col md:flex-row gap-4 pt-8 pb-8">
          {/* Botão Voltar: Fase 3 - Ideação */}
          <button
            onClick={() => navigate("/ideation-phase")}
            className="group w-full md:w-full relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500 flex items-center justify-between"
          >
            <div className="relative z-10 bg-gray-100 dark:bg-gray-700 p-3 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
              <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500" />
            </div>

            <div className="relative z-10 flex flex-col items-end gap-1">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                {language === "pt-BR" ? "Voltar" : "Back"}
              </span>
              <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {language === "pt-BR" ? "3. Ideação" : "3. Ideation"}
              </span>
            </div>
          </button>
        </div>
        {/* --- FIM DO BOTÃO DE VOLTAR --- */}
      </div>

      {tocOpen && (
        <div
          className="fixed w-full h-full bg-black/50 z-[999] lg:hidden"
          onClick={() => setTocOpen(false)}
        />
      )}

      {/* Tabela de Conteúdos */}
      <div
        className={`${tocOpen ? "fixed" : "hidden"} w-[100vw] max-h-[80vh] z-[1000] lg:relative lg:w-80 lg:block lg:order-2 lg:sticky lg:top-40 lg:self-start lg:max-h-[calc(100vh-5rem)] overflow-y-auto flex-shrink-0 p-6`}
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
