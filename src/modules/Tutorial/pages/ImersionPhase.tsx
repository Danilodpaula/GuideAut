// ImersionPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Imersão do processo ProAut.
// Apresenta as atividades, artefatos gerados e recursos para equipes de desenvolvimento.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  FileText,
  Info,
  Lightbulb,
  Package,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Componente principal da página "Fase de Imersão".
 * Mostra a fase de imersão com atividades, artefatos e processos detalhados.
 * Ideal para orientar equipes na aplicação do método para desenvoFlvimento de interfaces acessíveis.
 */
export default function ImersionPhase() {
  const phaseArtifacts = [
    {
      id: "entrada",
      type_pt: "Entrada",
      type_en: "Input",
      name_pt: "Ideia ou visão geral de aplicação",
      name_en: "Idea or application overview",
    },
    {
      id: "cca",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Canvas dos Cuidadores de Autistas (CCA)",
      name_en: "Autistic Caregivers Canvas (ACC)",
    },
    {
      id: "cta",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Canvas dos Terapeutas de Autistas (CTA)",
      name_en: "Autistic Therapists Canvas (ATC)",
    },
    {
      id: "css",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Canvas do Solicitante do Software (CSS)",
      name_en: "Software Requester Canvas (RSC)",
    },
    {
      id: "fca",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Formulário de Caracterização do Autista (FCA)",
      name_en: "Autistic Characterization Form (ACF)",
    },
    {
      id: "vga",
      type_pt: "Saída",
      type_en: "Output",
      name_pt: "Gráfico de Visão Geral do Autista (VGA)",
      name_en: "Autistic Overview Graph (AOG)",
    },
  ];

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [diagramImersionOpen, setDiagramImersionOpen] = useState(false);
  const [diagramAprenderContextoOpen, setDiagramAprenderContextoOpen] =
    useState(false);
  const [diagramExtrairRequisitosOpen, setDiagramExtrairRequisitosOpen] =
    useState(false);

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
        id: "visao-geral",
        title: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
        type: "scroll",
      },
      {
        id: "aprender-contexto",
        title:
          language === "pt-BR"
            ? "Aprender sobre o contexto"
            : "Learn about the context",
        type: "scroll",
      },
      {
        id: "extrair-requisitos",
        title:
          language === "pt-BR" ? "Extrair requisitos" : "Extract requirements",
        type: "scroll",
      },
      {
        id: "consolidar-dados",
        title: language === "pt-BR" ? "Consolidar dados" : "Consolidate data",
        type: "scroll",
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
            {language === "pt-BR" ? "Fase de Imersão" : "Immersion Phase"}
          </h1>
          <p className="text-justify text-lg">
            {language === "pt-BR"
              ? "Mergulhando no contexto para compreender as verdadeiras dores do usuário."
              : "Diving into the context to understand the user's real pain points."}
          </p>
        </div>

        {/* Visão Geral */}
        <section id="visao-geral" className="scroll-m-20 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
            {language === "pt-BR" ? "Visão geral" : "Overview"}
          </h2>

          <div className="text-lg text-justify space-y-4">
            <p>
              {language === "pt-BR"
                ? "A fase de imersão é a fase caracterizada pela aproximação do problema. É nesta etapa que a equipe busca conhecer conceitos que permeiam o tema da aplicação a ser projetada e alcançar mais domínio sobre o problema a ser resolvido. Esse domínio é estabelecido com comunicação ativa junto às pessoas que são afetadas pelo app, permitindo que a pessoa autista e seus familiares participem do processo de design desta tecnologia."
                : "The immersion phase is characterized by approaching the problem. It is at this stage that the team seeks to understand concepts permeating the theme of the application to be designed and gain more mastery over the problem to be solved. This mastery is established through active communication with the people affected by the app, allowing the autistic person and their family members to participate in the design process of this technology."}
            </p>

            {diagramImersionOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setDiagramImersionOpen(false)}
                />

                <Card
                  className="relative mx-auto my-auto w-full max-w-md lg:max-w-3xl max-h-[80vh] animate-fade-in z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="sticky top-0 z-50 border-b px-6 py-4 rounded-t-xl">
                    <CardTitle className="text-xl text-blue-500 font-bold flex items-center justify-between">
                      {language === "pt-BR"
                        ? "Sobre o Diagrama"
                        : "About the Diagram"}

                      {/* Este botão é responsável por fechar o pop-up */}
                      <button
                        onClick={() => setDiagramImersionOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
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
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">
                              - Tem conhecimento pregresso a respeito do
                              autismo?
                            </span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Sim] → [1.2]
                              </span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [Não] → [1.1]
                              </span>
                            </div>
                          </div>

                          <div className="ml-6 space-y-3">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [1.1]
                                </span>
                                Aprender sobre o contexto
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Entender quem vai usar a aplicação, em quais
                                situações ela será utilizada e quais
                                necessidades, dificuldades ou preferências esse
                                usuário possui. No ProAut, isso inclui conhecer
                                o público autista, compreender seu ambiente,
                                suas rotinas e como ele interage com interfaces.
                                Esse entendimento é essencial para criar um
                                protótipo que realmente funcione para o usuário
                                final.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [1.2]
                                </span>
                                Elicitar requisitos
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Processo de descobrir, levantar e entender tudo
                                o que o sistema precisa ter ou fazer. Isso
                                envolve conversar com usuários, observar o
                                contexto, analisar necessidades e transformar
                                essas informações em requisitos claros. No
                                ProAut, essa etapa garante que o protótipo seja
                                baseado em necessidades reais do usuário,
                                especialmente do público autista.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [1.3]
                                </span>
                                Consolidar dados
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Consolidar dados significa reunir, organizar e
                                unificar todas as informações coletadas durante
                                a pesquisa ou levantamento de requisitos. No
                                ProAut, isso envolve juntar observações,
                                entrevistas e análises do contexto para formar
                                uma base clara e estruturada que servirá de
                                apoio para as próximas etapas, como a criação da
                                TRR e do protótipo.
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
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">
                              - Has prior knowledge about autism?
                            </span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Yes] → [1.2]
                              </span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [No] → [1.1]
                              </span>
                            </div>
                          </div>

                          <div className="ml-6 space-y-3">
                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [1.1]
                                </span>
                                Learn about the context
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Understand who will use the application, in
                                which situations it will be used, and what
                                needs, difficulties, or preferences this user
                                has. In ProAut, this includes knowing the
                                autistic audience, understanding their
                                environment, routines, and how they interact
                                with interfaces. This understanding is essential
                                to create a prototype that really works for the
                                end user.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [1.2]
                                </span>
                                Elicit requirements
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Process of discovering, gathering, and
                                understanding everything the system needs to
                                have or do. This involves talking to users,
                                observing the context, analyzing needs, and
                                transforming this information into clear
                                requirements. In ProAut, this step ensures that
                                the prototype is based on real user needs,
                                especially for the autistic audience.
                              </p>
                            </div>

                            <div>
                              <p className="font-medium">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                  [1.3]
                                </span>
                                Consolidate data
                              </p>
                              <p className="ml-8 mt-1 text-justify">
                                Consolidating data means gathering, organizing,
                                and unifying all information collected during
                                research or requirements gathering. In ProAut,
                                this involves combining observations,
                                interviews, and context analyses to form a clear
                                and structured foundation that will support the
                                next steps, such as creating the RCT
                                (Requirements/Constraints Table) and the
                                prototype.
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

            {/* Fluxo da Fase de Imersão */}
            <div className="relative">
              <div className="max-w-4xl lg:max-w-6xl mx-auto">
                <div className="flex justify-end p-4">
                  <Card
                    className="cursor-pointer border border-blue-100"
                    onClick={() => setDiagramImersionOpen(true)}
                  >
                    <CardContent className="text-blue-500 p-3">
                      <div className="flex items-center gap-2">
                        <strong>
                          <span className="text-base">
                            {language === "pt-BR"
                              ? "Explicação do diagrama"
                              : "Diagram Explanation"}
                          </span>
                        </strong>
                        <Lightbulb className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <img
                  src={
                    language === "pt-BR"
                      ? "/assets/imersion-phase/FluxoImersao-pt-br.png"
                      : "/assets/imersion-phase/FluxoImersao-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Figura 1: Fluxo sugerido para a atividade de Imersão"
                      : "Figure 1: Suggested flow for immersion activity"
                  }
                  className="rounded-md max-w-full h-auto"
                />
              </div>
              <p className="text-lg text-center mt-2">
                {language === "pt-BR"
                  ? "Figura 1: Fluxo sugerido para a atividade de Imersão"
                  : "Figure 1: Suggested flow for immersion activity"}
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
                <ul className="space-y-3 list-disc list-inside mb-4 ml-4">
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Atividades da Fase:"
                        : "Phase Activities:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Aprender sobre o contexto, Elicitar Requisitos e Consolidar Dados."
                      : "Learn about the context, Elicit Requirements and Consolidate Data."}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Entrada da fase:"
                        : "Phase input:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "a ideia ou visão geral de aplicação"
                      : "the idea or overview of the application"}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Saída da fase:"
                        : "Phase output:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "CCA (Canvas dos Cuidadores de Autistas); CTA (Canvas dos Terapeutas de Autistas); CSS (Canvas do Solicitante do Software); Formulário de Caracterização do Autista; e VGA(Gráfico de Visão Geral do Autista)"
                      : "ACC (Autistic Caregivers Canvas); ATC (Autistic Therapists Canvas); RSC (Software Requester Canvas); ACF (Autistic Characterization Form); and AOG (Autistic Overview Graph)"}
                  </li>
                  <li>
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Pais, especialistas, solicitantes de software, designers/desenvolvedores"
                      : "Parents, specialists, software requesters, designers/developers"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Seção Aprender sobre o contexto */}
        <section id="aprender-contexto" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Aprender sobre o contexto"
                : "Learn about the context"}
            </h2>
          </div>

          {diagramAprenderContextoOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setDiagramAprenderContextoOpen(false)}
              />

              <Card
                className="relative mx-auto my-auto w-full max-w-md lg:max-w-3xl max-h-[80vh] animate-fade-in z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <CardHeader className="sticky top-0 z-50 border-b px-6 py-4 rounded-t-xl">
                  <CardTitle className="text-xl text-blue-500 font-bold flex items-center justify-between">
                    {language === "pt-BR"
                      ? "Sobre o Diagrama"
                      : "About the Diagram"}

                    {/* Este botão é responsável por fechar o pop-up */}
                    <button
                      onClick={() => setDiagramAprenderContextoOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
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
                                [1.1.1]
                              </span>
                              Definir itens de busca
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Escolher quais informações você precisa procurar
                              para entender melhor o problema ou o usuário. No
                              ProAut, isso pode incluir termos, temas ou
                              aspectos específicos que guiam a pesquisa, como
                              comportamentos do usuário, necessidades,
                              limitações ou características da interface. Esses
                              itens ajudam a direcionar a coleta de dados de
                              forma clara e eficiente.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.1.2]
                              </span>
                              Definir a fonte de busca
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Escolher onde você vai procurar as informações
                              necessárias. No ProAut, isso pode incluir artigos
                              científos, entrevistas com usuários, observações
                              em campo, materiais de referência ou guias como o
                              GuideAut. Escolher boas fontes garante que os
                              dados coletados sejam confiáveis e úteis para as
                              próximas etapas do desenvolvimento.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.1.3]
                              </span>
                              Realizar Pesquisa Desk
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Buscar informações sem ir a campo, usando apenas
                              materiais já existentes. Isso inclui consultar
                              artigos, relatórios, sites, livros, documentos e
                              qualquer conteúdo disponível para estudar o tema.
                              No ProAut, a Pesquisa Desk ajuda a entender melhor
                              o público, o contexto e as boas práticas antes de
                              iniciar as etapas práticas do projeto.
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
                                [1.1.1]
                              </span>
                              Define search items
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Choose which information you need to search for to
                              better understand the problem or the user. In
                              ProAut, this can include specific terms, themes,
                              or aspects that guide the research, such as user
                              behaviors, needs, limitations, or interface
                              characteristics. These items help direct data
                              collection clearly and efficiently.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.1.2]
                              </span>
                              Define search sources
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Choose where you will look for the necessary
                              information. In ProAut, this can include
                              scientific articles, user interviews, field
                              observations, reference materials, or guides like
                              GuideAut. Choosing good sources ensures that the
                              collected data is reliable and useful for the next
                              stages of development.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.1.3]
                              </span>
                              Perform Desk Research
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Search for information without going into the
                              field, using only existing materials. This
                              includes consulting articles, reports, websites,
                              books, documents, and any available content to
                              study the topic. In ProAut, Desk Research helps to
                              better understand the audience, context, and best
                              practices before starting the practical stages of
                              the project.
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

          {/* Fluxo Aprender sobre o contexto*/}
          <div className="relative">
            <div className="max-w-4xl lg:max-w-6xl mx-auto">
              <div className="flex justify-end p-4">
                <Card
                  className="cursor-pointer border border-blue-100"
                  onClick={() => setDiagramAprenderContextoOpen(true)}
                >
                  <CardContent className="text-blue-500 p-3">
                    <div className="flex items-center gap-2">
                      <strong>
                        <span className="text-base">
                          {language === "pt-BR"
                            ? "Explicação do diagrama"
                            : "Diagram Explanation"}
                        </span>
                      </strong>
                      <Lightbulb className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <img
                src={
                  language === "pt-BR"
                    ? "/assets/imersion-phase/FluxoAprenderContexto-pt-br.png"
                    : "/assets/imersion-phase/FluxoAprenderContexto-en-us.png"
                }
                alt={
                  language === "pt-BR"
                    ? "Figura 2: Fluxo sugerido para aprender sobre o contexto"
                    : "Figure 2: Suggested flow for learning about the context"
                }
                className="rounded-md max-w-full h-auto"
              />
            </div>
            <p className="text-lg text-center mt-2">
              {language === "pt-BR"
                ? "Figura 2: Fluxo sugerido para aprender sobre o contexto"
                : "Figure 2: Suggested flow for learning about the context"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Elaboração dos itens de busca"
                  : "Search items elaboration"}
              </h3>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "É essencial entender o contexto que rodeia o desenvolvimento da sua aplicação antes de iniciar o desenvolvimento da sua aplicação. Para isso, a equipe de desenvolvimento deve definir itens de busca da pesquisa Desk, isto é, termos e/ou palavras chave a serem usados."
                  : "It is essential to understand the context surrounding the development of your application before starting it. For this, the development team must define search items for Desk research, that is, terms and/or keywords to be used."}
              </p>

              {/* Card de info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "INFO: Se você não delimitar esses itens, existem grandes chances de acabar se perdendo no processo."
                        : "INFO: If you don't delimit these items, there are high chances of getting lost in the process."}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "A pesquisa Desk utiliza dados anteriormente mapeados por outras pessoas que se encaixem na necessidade de desenvolvimento, por isso escolha cuidadosamente os itens de busca."
                  : "Desk research uses data previously mapped by other people that fit the development need, so choose the search items carefully."}
              </p>

              {/* Card de sugestão de procedimento no novo formato */}
              <Card className="border-l-4 border-l-blue-500 mt-4">
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
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {language === "pt-BR"
                        ? "Contexto-exemplo:"
                        : "Example context:"}
                    </h4>
                    <p className="text-lg text-justify text-blue-700 dark:text-blue-300 mb-3">
                      {language === "pt-BR"
                        ? "Imagine que está desenvolvendo uma aplicação para uma pessoa autista que possui um comportamento de stimming (autoestimulação sensorial) e balança os braços com frequência e queremos desenvolver um jogo de celular acessível para os mesmos."
                        : "Imagine you are developing an application for an autistic person who has stimming behavior (sensory self-stimulation) and frequently flaps their arms, and we want to develop an accessible mobile game for them."}
                    </p>
                    <p className="tex-lg text-blue-700 dark:text-blue-300 font-medium mb-2">
                      {language === "pt-BR"
                        ? "Itens de busca sugeridos:"
                        : "Suggested search items:"}
                    </p>
                    <ul className="tex-lg text-lg text-blue-700 dark:text-blue-300 list-disc list-inside ml-4 space-y-1">
                      <li>
                        {language === "pt-BR"
                          ? "autismo, comportamento repetitivo, stimming (para focar na pesquisa relacionada ao comportamento de balançar os braços)"
                          : "autism, repetitive behavior, stimming (to focus research related to arm flapping behavior)"}
                      </li>
                      <li>
                        {language === "pt-BR"
                          ? "design inclusivo, intervenção digital para stimming, monitoramento de stimming, tecnologia para regulação sensorial (para focar na busca de tecnologias semelhantes que já foram implementadas com foco nesses usuários)"
                          : "inclusive design, digital intervention for stimming, stimming monitoring, technology for sensory regulation (to focus on searching for similar technologies that have already been implemented focusing on these users)"}
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Definição das fontes de busca"
                  : "Definition of search sources"}
              </h3>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "A escolha das fontes de busca pode ser feita através de livros, sites, vídeos, revistas, blogs de pais e/ou especialistas em autismo, artigos relacionados, fontes acadêmicas sobre o assunto e o próprio repositório de recomendações do GuideAut. Caso o conteúdo não seja informativo para o contexto definido, abandone a fonte."
                  : "The choice of search sources can be made through books, websites, videos, magazines, blogs of parents and/or autism specialists, related articles, academic sources on the subject, and the GuideAut recommendation repository itself. If the content is not informative for the defined context, abandon the source."}
              </p>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Em caso de recorrer a chats de uso geral, sempre peça as fontes e cheque diretamente dos links obtidos. Se eventualmente optar pelo repositório do GuideAut, mantenha-se atento a curadoria que possui recomendações verificadas e de confiança e ao analisar recomendações da comunidade, observe o número de aprovações e desaprovações da recomendação, além de novamente checar se o que foi escrito possui validação nas suas fontes de busca alternativas."
                  : "In case of resorting to general-purpose chats, always ask for sources and check directly from the obtained links. If you eventually choose the GuideAut repository, stay attentive to the curation which has verified and trustworthy recommendations, and when analyzing community recommendations, observe the number of approvals and disapprovals of the recommendation, in addition to checking again if what was written has validation in your alternative search sources."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Realizar pesquisa Desk"
                  : "Perform Desk Research"}
              </h3>
              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "Para manter a pesquisa organizada e segura, registre suas buscas em documentos como planilhas ou blocos de anotações que de preferência possuam salvamento automático e backup em nuvem."
                  : "To keep the research organized and secure, record your searches in documents such as spreadsheets or notepads that preferably have automatic saving and cloud backup."}
              </p>

              {/* Card da Pesquisa Desk*/}
              <div className="my-6 p-4">
                <div className="max-w-4xl mx-auto">
                  <h4 className="font-semibold text-lg mb-4 text-center">
                    {language === "pt-BR"
                      ? "Exemplo de registro para a pesquisa Desk"
                      : "Example record for Desk Research"}
                  </h4>

                  <div className="overflow-x-auto border rounded bg-white text-black">
                    <table className="w-full text-lg text-left">
                      <thead className="bg-slate-50 border-b text-slate-900">
                        <tr>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR" ? "Fonte" : "Source"}
                          </th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR" ? "Tipo" : "Type"}
                          </th>
                          <th className="p-3 font-semibold border-r">
                            {language === "pt-BR" ? "Título" : "Title"}
                          </th>
                          <th className="p-3 font-semibold">
                            {language === "pt-BR" ? "Resumo" : "Summary"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-r border-b font-medium">
                            PubMed
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR" ? "Artigo" : "Article"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Intervenções digitais para stimming em autistas"
                              : "Digital interventions for stimming in autistic people"}
                          </td>
                          <td className="p-3 border-b">
                            {language === "pt-BR"
                              ? "Estudo sobre eficácia de apps para regulação sensorial"
                              : "Study on the efficacy of apps for sensory regulation"}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 border-r border-b font-medium">
                            Blog Especializado
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR" ? "Blog" : "Blog"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Dia a dia com autismo: entendendo o stimming"
                              : "Day to day with autism: understanding stimming"}
                          </td>
                          <td className="p-3 border-b">
                            {language === "pt-BR"
                              ? "Relato pessoal sobre estratégias de regulação sensorial"
                              : "Personal account on sensory regulation strategies"}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 border-r border-b font-medium">
                            GuideAut
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Repositório"
                              : "Repository"}
                          </td>
                          <td className="p-3 border-r border-b">
                            {language === "pt-BR"
                              ? "Recomendações para design inclusivo"
                              : "Recommendations for inclusive design"}
                          </td>
                          <td className="p-3 border-b">
                            {language === "pt-BR"
                              ? "Diretrizes validadas pela comunidade autista"
                              : "Guidelines validated by the autistic community"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-lg text-center mt-2">
                    {language === "pt-BR"
                      ? "Exemplo de registro para a pesquisa Desk."
                      : "Example record for Desk Research."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Extrair requisitos */}
        <section
          id="extrair-requisitos"
          className="scroll-m-20 space-y-6 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR"
                ? "Extrair requisitos"
                : "Extract requirements"}
            </h2>
          </div>

          <p className="text-lg text-justify mb-4">
            {language === "pt-BR"
              ? "Após a finalização da pesquisa desk, o time de desenvolvimento deve seguir para a etapa de extração de requisitos a partir do levantamento da documentação da pesquisa desk. Isso é uma atividade comum em equipes de software que permite estabelecer uma estratégia de extração de informações de qualidade com as partes interessadas para incentivar um laço de confiança com os envolvidos do projeto."
              : "After finishing the desk research, the development team must proceed to the requirements extraction stage based on the desk research documentation. This is a common activity in software teams that allows establishing a quality information extraction strategy with stakeholders to encourage a bond of trust with those involved in the project."}
          </p>
          <p className="text-lg text-justify mb-4">
            {language === "pt-BR"
              ? "Para aplicações voltadas para o público autista, a estratégia de elicitação de requisitos recomendada pelo ProAut orienta a equipe para o valor real do projeto."
              : "For applications aimed at the autistic audience, the requirements elicitation strategy recommended by ProAut guides the team towards the real value of the project."}
          </p>

          {diagramExtrairRequisitosOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setDiagramExtrairRequisitosOpen(false)}
              />

              <Card
                className="relative mx-auto my-auto max-w-md w-full max-w-md lg:max-w-3xl max-h-[80vh] animate-fade-in z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <CardHeader className="sticky top-0 z-50 border-b px-6 py-4 rounded-t-xl">
                  <CardTitle className="text-xl text-blue-500 font-bold flex items-center justify-between">
                    {language === "pt-BR"
                      ? "Sobre o Diagrama"
                      : "About the Diagram"}

                    {/* Este botão é responsável por fechar o pop-up */}
                    <button
                      onClick={() => setDiagramExtrairRequisitosOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
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
                                [1.2.1]
                              </span>
                              Entrevistar solicitante
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Conversar diretamente com a pessoa que pediu o
                              desenvolvimento da aplicação para entender
                              claramente suas necessidades, expectativas e
                              objetivos. No ProAut, essa entrevista ajuda a
                              identificar requisitos importantes, esclarecer
                              dúvidas e garantir que o protótipo seja criado de
                              acordo com o que o solicitante realmente precisa.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">
                              - Mais alguém para entrevistar?
                            </span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Sim] →
                              </span>
                              <div className="text-xs mt-1 text-blue-700">
                                [1.2.2.A.1] e/ou [1.2.2.A.2]
                              </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [Não] → [1.2.2.B]
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.2.A.1]
                              </span>
                              Realizar entrevista com o cuidador
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Conversar com a pessoa que acompanha ou auxilia o
                              usuário final no dia a dia. No ProAut, essa
                              entrevista é importante porque o cuidador conhece
                              rotinas, dificuldades, preferências e
                              comportamentos do usuário autista. Essas
                              informações ajudam a criar uma interface mais
                              adequada, segura e alinhada às necessidades reais
                              do usuário.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.2.A.2]
                              </span>
                              Realizar entrevista com Terapeuta
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Conversar com o profissional responsável pelo
                              acompanhamento clínico ou educacional do usuário
                              autista. No ProAut, essa entrevista é fundamental
                              porque o terapeuta oferece uma visão técnica sobre
                              habilidades, limitações, estímulos adequados e
                              necessidades específicas do usuário. Essas
                              informações ajudam a orientar decisões de
                              interface e garantir que o protótipo seja
                              realmente apropriado para o perfil do usuário.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.3]
                              </span>
                              Aplicar FCA
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Analisar quais informações, necessidades ou
                              observações aparecem com mais frequência durante
                              entrevistas e coleta de dados. No ProAut, essa
                              técnica ajuda a identificar quais itens são
                              realmente importantes para o usuário e para o
                              projeto, permitindo priorizar requisitos e tomar
                              decisões mais seguras na construção do protótipo.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.2.B]
                              </span>
                              Consultar o GuideAut
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Usar o guia como fonte de recomendações e boas
                              práticas para criar interfaces adequadas ao
                              público autista. No ProAut, o GuideAut ajuda a
                              orientar decisões sobre cores, formas, layouts,
                              estímulos visuais e outros aspectos importantes
                              para tornar a interface mais acessível, clara e
                              confortável para o usuário.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">
                              - Aprofundar conhecimento no contexto?
                            </span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Sim] → [1.2.4]
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
                                [1.2.4]
                              </span>
                              Pesquisa Exploratória
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Tipo de investigação usada para entender melhor um
                              problema ou um tema quando ainda se sabe pouco
                              sobre ele. No ProAut, ela serve para levantar
                              primeiras informações sobre o usuário, o contexto
                              e as necessidades envolvidas, ajudando a orientar
                              o que deve ser estudado com mais profundidade nas
                              etapas seguintes.
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
                                [1.2.1]
                              </span>
                              Interview requester
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Talk directly with the person who requested the
                              application development to clearly understand
                              their needs, expectations, and objectives. In
                              ProAut, this interview helps identify important
                              requirements, clarify doubts, and ensure that the
                              prototype is created according to what the
                              requester actually needs.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">
                              - Anyone else to interview?
                            </span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Yes] →
                              </span>
                              <div className="text-xs mt-1">
                                [1.2.2.A.1] and/or [1.2.2.A.2]
                              </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [No] → [1.2.2.B]
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.2.A.1]
                              </span>
                              Conduct interview with caregiver
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Talk to the person who accompanies or assists the
                              end user in their daily life. In ProAut, this
                              interview is important because the caregiver knows
                              the autistic user's routines, difficulties,
                              preferences, and behaviors. This information helps
                              create an interface that is more suitable, safe,
                              and aligned with the user's real needs.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.2.A.2]
                              </span>
                              Conduct interview with Therapist
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Talk to the professional responsible for the
                              clinical or educational follow-up of the autistic
                              user. In ProAut, this interview is fundamental
                              because the therapist offers a technical view on
                              skills, limitations, appropriate stimuli, and
                              specific user needs. This information helps guide
                              interface decisions and ensure the prototype is
                              truly appropriate for the user's profile.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.3]
                              </span>
                              Apply ACF
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Analyze which information, needs, or observations
                              appear most frequently during interviews and data
                              collection. In ProAut, this technique helps
                              identify which items are really important for the
                              user and the project, allowing prioritization of
                              requirements and making safer decisions in
                              prototype construction.
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.2.B]
                              </span>
                              Consult GuideAut
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Use the guide as a source of recommendations and
                              best practices for creating interfaces suitable
                              for the autistic audience. In ProAut, GuideAut
                              helps guide decisions about colors, shapes,
                              layouts, visual stimuli, and other important
                              aspects to make the interface more accessible,
                              clear, and comfortable for the user.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⬦</span>
                            <span className="font-semibold">
                              - Deepen knowledge in context?
                            </span>
                          </div>

                          <div className="ml-8 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="font-medium text-green-700">
                                [Yes] → [1.2.4]
                              </span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                              <span className="font-medium text-blue-700">
                                [No]
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="font-medium">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                                [1.2.4]
                              </span>
                              Exploratory Research
                            </p>
                            <p className="ml-8 mt-1 text-justify">
                              Type of investigation used to better understand a
                              problem or topic when little is known about it. In
                              ProAut, it serves to gather initial information
                              about the user, the context, and the needs
                              involved, helping to guide what should be studied
                              in more depth in the following steps.
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

          {/* Fluxo Extrair Requisitos*/}
          <div className="relative">
            <div className="max-w-4xl lg:max-w-6xl mx-auto">
              <div className="flex justify-end p-4">
                <Card
                  className="cursor-pointer border border-blue-100"
                  onClick={() => setDiagramExtrairRequisitosOpen(true)}
                >
                  <CardContent className="text-blue-500 p-3">
                    <div className="flex items-center gap-2">
                      <strong>
                        <span className="text-base">
                          {language === "pt-BR"
                            ? "Explicação do diagrama"
                            : "Diagram Explanation"}
                        </span>
                      </strong>
                      <Lightbulb className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <img
                src={
                  language === "pt-BR"
                    ? "/assets/imersion-phase/FluxoExtrairRequisitos-pt-br.png"
                    : "/assets/imersion-phase/FluxoExtrairRequisitos-en-us.png"
                }
                alt={
                  language === "pt-BR"
                    ? "Figura 3: Fluxo sugerido para extrair requisitos"
                    : "Figure 3: Suggested flow for extracting requirements"
                }
                className="rounded-md max-w-full h-auto"
              />
            </div>
            <p className="text-lg text-center mt-2">
              {language === "pt-BR"
                ? "Figura 3: Fluxo sugerido para extrair requisitos"
                : "Figure 3: Suggested flow for extracting requirements"}
            </p>
          </div>

          <div className="space-y-8">
            {/* Preenchimento do FCA */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR"
                  ? "Preenchimento do FCA"
                  : "ACF completion"}
              </h3>

              {/* Card de info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "Onde encontrar este artefato: Artefatos → Formulários"
                        : "Where to find this artifact: Artifacts → Forms"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "O ProAut indica a utilização de entrevistas junto a um Formulário de Caracterização do Autista (FCA) com os clientes, cuidadores e especialistas de autistas. O FCA é uma ferramenta para caracterizar autistas, dividido em quatro seções, representando as 4 principais áreas de limitação de um autista, a saber: Interação, Comunicação, Comportamento e Cognição. Cada seção é composta de um conjunto de características para as quais o entrevistador deve assinalar com o valor 1, para quando a criança apresentar a característica, e 0 caso contrário."
                  : "ProAut indicates the use of interviews along with an Autistic Characterization Form (ACF) with clients, caregivers, and autism specialists. The ACF is a tool to characterize autistic people, divided into four sections, representing the 4 main areas of limitation of an autistic person, namely: Interaction, Communication, Behavior, and Cognition. Each section is composed of a set of characteristics for which the interviewer must mark with the value 1, when the child presents the characteristic, and 0 otherwise."}
              </p>

              {/* Card de info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "Observação do Preenchimento: a característica é considerada como presente, se o autista apresentar mesmo que de forma esporádica. Por outro lado, é considerada ausente se nunca apresentou, ou se apresentou raríssimas vezes ao longo de sua vida."
                        : "Completion Note: the characteristic is considered present if the autistic person presents it even if sporadically. On the other hand, it is considered absent if they never presented it, or if they presented it very rarely throughout their life."}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "O preenchimento do FCA produz um gráfico denominado Gráfico de Visão Geral do Autista (VGA), o qual permite visualizar o grau de comprometimento em cada uma das áreas citadas anteriormente, de forma que, quanto mais alto o percentual do autista em uma determinada área, maior é o comprometimento nela."
                  : "Filling out the ACF produces a graph called Autistic Overview Graph (AOG), which allows visualizing the degree of impairment in each of the areas mentioned above, so that the higher the percentage of the autistic person in a certain area, the greater the impairment in it."}
              </p>

              <div className="my-6 p-4">
                <div className="max-w-3xl mx-auto flex justify-center">
                  <img
                    src={
                      language === "pt-BR"
                        ? "/assets/imersion-phase/VGA-pt-br.png"
                        : "/assets/imersion-phase/VGA-en-us.png"
                    }
                    alt={
                      language === "pt-BR"
                        ? "Figura 4: Gráfico de visão geral do Autista (VGA)"
                        : "Figure 4: Autistic Overview Graph (AOG)"
                    }
                    className="rounded-md max-w-full h-auto"
                  />
                </div>
                <p className="text-lg text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 4: Gráfico de visão geral do Autista (VGA)"
                    : "Figure 4: Autistic Overview Graph (AOG)"}
                </p>
              </div>

              <p className="text-lg text-justify">
                {language === "pt-BR"
                  ? "A produção do FCA e do VGA junto aos entrevistados pode permitir direcionar melhor as possíveis funcionalidades a serem desenvolvidas para resolução de problemas da interação do usuário com sua tecnologia."
                  : "The production of the ACF and the AOG with the interviewees can allow better direction of possible functionalities to be developed to solve user interaction problems with their technology."}
              </p>

              {/* Card de sugestão de procedimento no novo formato */}
              <Card className="border-l-4 border-l-blue-500 mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                    <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                    {language === "pt-BR"
                      ? "Sugestão de Procedimento para preenchimento do FCA"
                      : "Procedure Suggestion for ACF completion"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Imprima o FCA (caso não seja possível aplicar por meio eletrônico);"
                          : "Print the ACF (if it is not possible to apply electronically);"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Antes de iniciar a entrevista com os clientes/pais/mães/responsáveis, fale sobre a necessidade de preencher o FCA ressaltando o que ele significa e qual a sua importância para o desenvolvimento da tecnologia;"
                          : "Before starting the interview with clients/parents/mothers/guardians, talk about the need to fill out the ACF, highlighting what it means and its importance for the technology development;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Defina se o FCA será aplicado antes ou depois da entrevista;"
                          : "Define if the ACF will be applied before or after the interview;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Iniciar a aplicação do FCA marcando para cada item de característica, o valor 1 caso a característica esteja presente na criança ou 0 no caso de ausência;"
                          : "Start the application of the ACF marking for each characteristic item, the value 1 if the characteristic is present in the child or 0 in case of absence;"}
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Entrevistas */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {language === "pt-BR" ? "Entrevistas" : "Interviews"}
              </h3>

              {/* Card de info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "As entrevistas com solicitante, terapeutas e cuidadores são obrigatórias, uma vez que eles são quem passarão as necessidades do software/Aplicativo/tecnologia. Se não for possível realizar entrevistas com pais ou especialistas, o designer/desenvolvedor poderá fazer uso do GuideAut para encontrar recomendações de interface vindas da curadoria ou da própria comunidade autista."
                        : "Interviews with the requester, therapists, and caregivers are mandatory, since they are the ones who will convey the needs of the software/App/technology. If it is not possible to conduct interviews with parents or specialists, the designer/developer may use GuideAut to find interface recommendations coming from curation or the autistic community itself."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card de info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "DICA DE ENTREVISTA: é indicado que se mantenha um roteiro pré-estabelecido junto à sua equipe de desenvolvimento. Esse roteiro deve ser distinto para clientes, cuidadores e terapeutas. O ProAut já disponibiliza um template neste tutorial para Cliente, Cuidador e Terapeuta, que pode ser refinado com novas perguntas para complementar as respostas, assim como também pode deixar de fazer alguma."
                        : "INTERVIEW TIP: it is indicated to maintain a pre-established script with your development team. This script must be distinct for clients, caregivers, and therapists. ProAut already provides a template in this tutorial for Client, Caregiver, and Therapist, which can be refined with new questions to complement the answers, just as you can choose not to ask some."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="border rounded-lg p-4">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/imersion-phase/CCS-pt-br-darkTheme.png"
                          : "/assets/imersion-phase/CCS-en-us-darkTheme.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Cliente"
                          : "Questionnaire for Client"
                      }
                      className="block dark:hidden rounded-md max-w-full h-auto"
                    />
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/imersion-phase/CCS-pt-br-darkTheme.png"
                          : "/assets/imersion-phase/CCS-en-us-darkTheme.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Cliente"
                          : "Questionnaire for Client"
                      }
                      className="hidden dark:block rounded-md max-w-full h-auto"
                    />
                  </div>
                  <h5 className="font-semibold text-lg mb-2">
                    {language === "pt-BR"
                      ? "Roteiro de Perguntas para Cliente"
                      : "Questionnaire for Client"}
                  </h5>
                  <p className="text-justify text-base">
                    {language === "pt-BR"
                      ? "A primeira entrevista deve ser feita, obrigatoriamente, com o solicitante do aplicativo. O roteiro de perguntas foca em coletar informações sobre o objetivo do aplicativo, quais habilidades que se deseja que sejam trabalhadas pelo aplicativo, bem como os requisitos e funcionalidades almejadas."
                      : "The first interview must be done, mandatorily, with the application requester. The question script focuses on collecting information about the application's objective, which skills are desired to be worked on by the application, as well as the desired requirements and functionalities."}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/imersion-phase/CCA-pt-br-darkTheme.png"
                          : "/assets/imersion-phase/CCA-en-us-darkTheme.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Cuidador"
                          : "Questionnaire for Caregiver"
                      }
                      className="block dark:hidden rounded-md max-w-full h-auto"
                    />
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/imersion-phase/CCA-pt-br-darkTheme.png"
                          : "/assets/imersion-phase/CCA-en-us-darkTheme.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Cuidador"
                          : "Questionnaire for Caregiver"
                      }
                      className="hidden dark:block rounded-md max-w-full h-auto"
                    />
                  </div>
                  <h5 className="font-semibold text-lg mb-2">
                    {language === "pt-BR"
                      ? "Roteiro de Perguntas para Cuidador"
                      : "Questionnaire for Caregiver"}
                  </h5>
                  <p className="text-justify text-base">
                    {language === "pt-BR"
                      ? "A entrevista com os pais/mães/responsáveis deve ser realizada após a entrevista com o solicitante do aplicativo. Com conhecimentos sobre objetivos e necessidades do aplicativo em mãos, faça perguntas relacionadas ao tema/contexto do aplicativo ao passo que descobre aspectos do autista, atividades que acalmam/estressam, relação com tecnologias, entre outras informações."
                      : "The interview with parents/mothers/guardians must be carried out after the interview with the application requester. With knowledge about the application's objectives and needs in hand, ask questions related to the theme/context of the application while discovering aspects of the autistic person, activities that calm/stress, relationship with technologies, among other information."}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/imersion-phase/CTA-pt-br-darkTheme.png"
                          : "/assets/imersion-phase/CTA-en-us-darkTheme.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Terapeuta"
                          : "Questionnaire for Therapist"
                      }
                      className="block dark:hidden rounded-md max-w-full h-auto"
                    />
                    <img
                      src={
                        language === "pt-BR"
                          ? "/assets/imersion-phase/CTA-pt-br-darkTheme.png"
                          : "/assets/imersion-phase/CTA-en-us-darkTheme.png"
                      }
                      alt={
                        language === "pt-BR"
                          ? "Roteiro de Perguntas para Terapeuta"
                          : "Questionnaire for Therapist"
                      }
                      className="hidden dark:block rounded-md max-w-full h-auto"
                    />
                  </div>
                  <h5 className="font-semibold text-lg mb-2">
                    {language === "pt-BR"
                      ? "Roteiro de Perguntas para Terapeuta"
                      : "Questionnaire for Therapist"}
                  </h5>
                  <p className="text-justify text-base">
                    {language === "pt-BR"
                      ? "A entrevista com os especialistas deve ser realizada após entrevista com cuidadores e a seleção de especialistas deve ser feita de acordo com os objetivos e necessidades do aplicativo. A coleta de informações deve focar em conhecer os aspectos sociais do autista, atividades que acalmam/estressam, relação com tecnologias, validações do seu aplicativo junto à opiniões técnicas (menos pessoais do que obtidas com cuidadores), melhorar a compreensão do contexto."
                      : "The interview with specialists must be carried out after the interview with caregivers, and the selection of specialists must be done according to the objectives and needs of the application. Information collection should focus on knowing the social aspects of the autistic person, activities that calm/stress, relationship with technologies, validations of your application with technical opinions (less personal than those obtained with caregivers), improving context understanding."}
                  </p>
                </div>
              </div>

              {/* Card de sugestão de procedimento */}
              <Card className="border-l-4 border-l-blue-500 mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                    <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                    {language === "pt-BR"
                      ? "Sugestão de Procedimento para entrevista"
                      : "Procedure Suggestion for interview"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Agende com o entrevistado;"
                          : "Schedule with the interviewee;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Somente para os especialistas, a seleção do entrevistado deve ser feita de acordo com a área de atuação em relação ao objetivo e necessidades do software;"
                          : "Only for specialists, the selection of the interviewee must be done according to the area of expertise in relation to the objective and needs of the software;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Defina o meio para registrar a entrevista (gravação de áudio, bloco de anotações, filmagem etc.);"
                          : "Define the means to record the interview (audio recording, notepad, filming, etc.);"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Providencie o material para o registro da entrevista;"
                          : "Provide the material for recording the interview;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Chegue com antecedência ao local da entrevista;"
                          : "Arrive early at the interview location;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Exceto para o solicitante, explique os objetivos e necessidades do software bem como a finalidade da entrevista, apresente o TCLE (Termo de Consentimento Livre e Esclarecido) e solicite sua assinatura (ou concordância para o caso virtual);"
                          : "Except for the requester, explain the objectives and needs of the software as well as the purpose of the interview, present the IC (Informed Consent Form) and request their signature (or agreement for the virtual case);"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Também, exceto para o solicitante, explique sobre o preenchimento do FCA. Sendo que para o especialista, ele deverá responder com base na maioria dos atendimentos. Por exemplo, se a pergunta n°8 for (anda na ponta dos pés?) o(a) especialista deverá responder sim (1) caso a maioria dos seus atendidos tenham essa característica;"
                          : "Also, except for the requester, explain about filling out the ACF. For the specialist, they must answer based on the majority of attendances. For example, if question n°8 is (walks on tiptoes?) the specialist must answer yes (1) if the majority of their patients have this characteristic;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Antes de usar o roteiro proposto, pergunte e anote o nome do entrevistado;"
                          : "Before using the proposed script, ask and write down the interviewee's name;"}
                      </li>
                      <li className="text-justify">
                        {language === "pt-BR"
                          ? "Inicie a entrevista usando o roteiro sugerido;"
                          : "Start the interview using the suggested script;"}
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Card de info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                      {language === "pt-BR"
                        ? "INFO: Caso tenha dificuldades para entrevistar pais/mães/responsáveis e/ou especialistas, o designer/desenvolvedor pode fazer uso do GuideAut."
                        : "INFO: If you have difficulties interviewing parents/mothers/guardians and/or specialists, the designer/developer can make use of GuideAut."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h4 className="text-xl font-semibold">
                  {language === "pt-BR"
                    ? "Pesquisa Exploratória"
                    : "Exploratory Research"}
                </h4>
                <p className="text-lg text-justify">
                  {language === "pt-BR"
                    ? "É uma atividade opcional e é feita por meio de observação em um ambiente real (escola, consultório, casa) que envolve um autista em relação ao tema do projeto. Não deve haver intervenção durante a atividade de observação e como resultado, é esperado que o projetista/equipe possa conhecer melhor o perfil dos autistas."
                    : "It is an optional activity and is done through observation in a real environment (school, office, home) involving an autistic person regarding the project theme. There should be no intervention during the observation activity, and as a result, it is expected that the designer/team can better understand the profile of autistic people."}
                </p>

                {/* Card de sugestão de procedimento */}
                <Card className="border-l-4 border-l-blue-500 mt-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                      <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      {language === "pt-BR"
                        ? "Sugestão de Procedimento da Pesquisa Exploratória"
                        : "Procedure Suggestion for Exploratory Research"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Agende o procedimento com uma família/especialista/professor/escola, ou seja, o responsável pelo local onde será realizada a pesquisa exploratória;"
                            : "Schedule the procedure with a family/specialist/teacher/school, that is, the person responsible for the location where the exploratory research will be carried out;"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Defina o meio para registrar a observação (gravação de áudio, bloco de anotações, filmagem etc.);"
                            : "Define the means to record the observation (audio recording, notepad, filming, etc.);"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Providencie o material para o registro da observação;"
                            : "Provide the material for recording the observation;"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Chegue com antecedência ao local;"
                            : "Arrive early at the location;"}
                        </li>
                        <li className="text-justify">
                          {language === "pt-BR"
                            ? "Registre as formas de interação e comportamento da criança no seu cotidiano"
                            : "Record the forms of interaction and behavior of the child in their daily life"}
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Consolidar dados */}
        <section id="consolidar-dados" className="scroll-m-20 space-y-6 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {language === "pt-BR" ? "Consolidar Dados" : "Consolidate Data"}
            </h2>
          </div>

          <p className="text-lg text-justify mb-4">
            {language === "pt-BR"
              ? "Após a pesquisa desk e finalização da elicitação de requisitos, a equipe de desenvolvimento parte para a consolidação de dados. Na consolidação de dados, é feita a análise do material gerado pelas entrevistas e o mapeamento para um canvas, sendo que cada entrevista previamente feita possui seu canvas correspondente, disponível na aba de Artefatos."
              : "After the desk research and completion of requirements elicitation, the development team moves on to data consolidation. In data consolidation, the analysis of the material generated by the interviews and the mapping to a canvas is performed, with each previously conducted interview having its corresponding canvas, available in the Artifacts tab."}
          </p>

          {/* Card de info*/}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-lg text-justify text-blue-800 dark:text-blue-200">
                  {language === "pt-BR"
                    ? "Onde encontrar este artefato: Artefatos → Canvas"
                    : "Where to find this artifact: Artifacts → Canvas"}
                </p>
              </div>
            </div>
          </div>

          <ul className="text-lg space-y-2 list-disc list-inside mb-4 ml-4">
            <li>
              <strong className="text-blue-600">CSS:</strong>{" "}
              {language === "pt-BR"
                ? "Canvas dos Solicitantes;"
                : "Requester Canvas;"}
            </li>
            <li>
              <strong className="text-blue-600">CCA:</strong>{" "}
              {language === "pt-BR"
                ? "Canvas dos Cuidadores;"
                : "Caregiver Canvas;"}
            </li>
            <li>
              <strong className="text-blue-600">CTA:</strong>{" "}
              {language === "pt-BR"
                ? "Canvas dos Terapeutas;"
                : "Therapist Canvas;"}
            </li>
          </ul>

          <p className="text-lg text-justify">
            {language === "pt-BR"
              ? "A ordem de entrevistas é definida da seguinte forma. (Cliente → Cuidador → Especialista)."
              : "The order of interviews is defined as follows: (Client → Caregiver → Specialist)."}
          </p>

          {/* Card de info*/}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-lg text-justify text-blue-800 dark:text-blue-200 font-medium">
                  {language === "pt-BR"
                    ? "INFO: o Canvas é um painel feito para descrever as principais áreas dos elementos que envolvem um modelo de negócios e foi criado pelo especialista em estratégia e inovação suíço Alexander Osterwalder em meados dos anos 2000. O objetivo do método é criar um mapa que permita uma visualização direta de cada etapa do crescimento de uma iniciativa."
                    : "INFO: the Canvas is a panel made to describe the main areas of the elements involving a business model and was created by Swiss strategy and innovation expert Alexander Osterwalder in the mid-2000s. The method's objective is to create a map that allows direct visualization of each stage of an initiative's growth."}
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-justify">
            {language === "pt-BR"
              ? "Cada canvas possui 7 ou 8 campos, cada um representado tópicos como Perfil, Objetivos, entre outros. Perguntas dos roteiros são mapeadas para cada campo por seu ID. É interessante que você memorize onde inserir as informações obtidas nas perguntas dentro dos campos especificados ou mantenha esse tutorial aberto durante a utilização do artefato."
              : "Each canvas has 7 or 8 fields, each representing topics such as Profile, Objectives, among others. Questions from the scripts are mapped to each field by their ID. It is interesting that you memorize where to insert the information obtained in the questions within the specified fields or keep this tutorial open during the use of the artifact."}
          </p>

          <p className="text-lg text-justify">
            {language === "pt-BR"
              ? "Ao inserir as informações nos campos especificados, apresente-as por tópicos (Canvas Tipo 1 disponibilizado pelo ProAut) ou textualmente (Canvas Tipo 2 disponibilizado pelo ProAut)."
              : "When inserting information into the specified fields, present them by topics (Canvas Type 1 provided by ProAut) or textually (Canvas Type 2 provided by ProAut)."}
          </p>

          <p className="text-lg text-justify">
            {language === "pt-BR"
              ? "É importante ter em mente que as informações a serem inseridas dentro do canvas precisam ser específicas e concisas. O desenvolvedor/analista deve atuar como um filtro técnico, traduzindo o desejo do cliente em informações claras e factíveis, sem prometer a solução técnica final antecipadamente."
              : "It is important to keep in mind that the information to be inserted into the canvas needs to be specific and concise. The developer/analyst must act as a technical filter, translating the client's desire into clear and feasible information, without promising the final technical solution in advance."}
          </p>

          {/* Tabela de exemplo de como filtrar as respostas do cliente após uma entrevista */}
          <div className="my-6 p-4">
            <div className="max-w-4xl mx-auto">
              <h4 className="font-semibold text-lg mb-4 text-center">
                {language === "pt-BR"
                  ? "Exemplo de como filtrar as respostas do cliente após uma entrevista"
                  : "Example of how to filter client responses after an interview"}
              </h4>

              <div className="overflow-x-auto border rounded bg-white text-black">
                <table className="w-full text-lg text-left">
                  <thead className="bg-slate-50 border-b text-slate-900">
                    <tr>
                      <th className="p-3 font-semibold border-r">
                        {language === "pt-BR"
                          ? "Resposta da entrevista"
                          : "Interview response"}
                      </th>
                      <th className="p-3 font-semibold">
                        {language === "pt-BR"
                          ? "Informação filtrada para montagem do canvas"
                          : "Filtered information for canvas assembly"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-r border-b text-xs">
                        {language === "pt-BR"
                          ? '"Comunicação com os professores responsáveis pelo atendimento do autista, disponibilização de informações do autista de forma acessível como se fosse um perfil que o professor pode acessar."'
                          : '"Communication with the teachers responsible for the autistic person\'s care, availability of information about the autistic person in an accessible way as if it were a profile that the teacher can access."'}
                      </td>
                      <td className="p-3 border-b text-lg">
                        {language === "pt-BR"
                          ? "Perfil do autista acessível para professores"
                          : "Accessible autistic profile for teachers"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border-r border-b text-xs">
                        {language === "pt-BR"
                          ? '"Quero que haja perfil para mentor, professor, autista e até especialista se possível. Cada perfil teria acesso a funções específicas do sistema."'
                          : '"I want there to be a profile for mentor, teacher, autistic person, and even specialist if possible. Each profile would have access to specific functions of the system."'}
                      </td>
                      <td className="p-3 border-b text-lg">
                        {language === "pt-BR"
                          ? "Múltiplos perfis de usuário com permissões específicas"
                          : "Multiple user profiles with specific permissions"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border-r border-b text-xs">
                        {language === "pt-BR"
                          ? '"Botões de alerta para autistas se sentirem muito ameaçados ou desconfortáveis e quiserem reportar isso com mais clareza para serem atendidos virtualmente ou presencialmente."'
                          : '"Alert buttons for autistic people if they feel very threatened or uncomfortable and want to report this more clearly to be attended virtually or in person."'}
                      </td>
                      <td className="p-3 border-b text-lg">
                        {language === "pt-BR"
                          ? "Sistema de alerta para situações de desconforto"
                          : "Alert system for situations of discomfort"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-center mt-2">
                {language === "pt-BR"
                  ? "Exemplo de como filtrar as respostas do cliente após uma entrevista."
                  : "Example of how to filter client responses after an interview."}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div className="border rounded-lg p-4">
              <div className="mb-4 flex justify-center">
                <img
                  src={
                    language === "pt-BR"
                      ? "/assets/imersion-phase/CCSCanvas-pt-br.jpg"
                      : "/assets/imersion-phase/CCSCanvas-en-us.jpg"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Canvas para entrevista do solicitante no GuideAut. (CSS)"
                      : "Canvas for requester interview in GuideAut. (CSS)"
                  }
                  className="rounded-md max-w-full h-auto"
                />
              </div>
              <h5 className="font-semibold text-lg mb-2">
                {language === "pt-BR"
                  ? "Canvas para entrevista do solicitante (CSS)"
                  : "Canvas for requester interview (CSS)"}
              </h5>
            </div>

            <div className="border rounded-lg p-4">
              <div className="mb-4 flex justify-center">
                <img
                  src={
                    language === "pt-BR"
                      ? "/assets/imersion-phase/CCACanvas-pt-br.jpg"
                      : "/assets/imersion-phase/CCACanvas-en-us.jpg"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Canvas para entrevista do cuidador no GuideAut. (CCA)"
                      : "Canvas for caregiver interview in GuideAut. (CCA)"
                  }
                  className="rounded-md max-w-full h-auto"
                />
              </div>
              <h5 className="font-semibold text-lg mb-2">
                {language === "pt-BR"
                  ? "Canvas para entrevista do cuidador (CCA)"
                  : "Canvas for caregiver interview (CCA)"}
              </h5>
            </div>

            <div className="border rounded-lg p-4">
              <div className="mb-4 flex justify-center">
                <img
                  src={
                    language === "pt-BR"
                      ? "/assets/imersion-phase/CTACanvas-pt-br.jpg"
                      : "/assets/imersion-phase/CTACanvas-en-us.jpg"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Canvas para entrevista do terapeuta no GuideAut. (CCT)"
                      : "Canvas for therapist interview in GuideAut. (CCT)"
                  }
                  className="rounded-md max-w-full h-auto"
                />
              </div>
              <h5 className="font-semibold text-lg mb-2">
                {language === "pt-BR"
                  ? "Canvas para entrevista do terapeuta (CTA)"
                  : "Canvas for therapist interview (CTA)"}
              </h5>
            </div>
          </div>

          {/* Card de sugestão de procedimento no novo formato */}
          <Card className="border-l-4 border-l-blue-500 mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                <Lightbulb className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                {language === "pt-BR"
                  ? "Procedimento de preenchimento dos Canvas"
                  : "Canvas completion procedure"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <ol className="text-lg text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-3 ml-4">
                  <li className="text-justify">
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Preencha o CSS:"
                        : "Fill out the CSS:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Com o princípio de concisão do Canvas em mente, preencha o CSS."
                      : "With the principle of conciseness of the Canvas in mind, fill out the CSS."}
                  </li>
                  <li className="text-justify">
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Preencha o CCA e o CTA:"
                        : "Fill out the CCA and CTA:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Em seguida, aplique essa mesma mentalidade de filtragem ao analisar o material gerado na entrevista com o cuidador e terapeuta, preenchendo o CCA e o CTA."
                      : "Next, apply this same filtering mindset when analyzing the material generated in the interview with the caregiver and therapist, filling out the CCA and CTA."}
                  </li>
                  <li className="text-justify">
                    <strong className="text-blue-700 dark:text-blue-300">
                      {language === "pt-BR"
                        ? "Elimine os conflitos:"
                        : "Eliminate conflicts:"}
                    </strong>{" "}
                    {language === "pt-BR"
                      ? "Por fim, elimine os conflitos entre o CCA e o CTA. O conflito entre os canvas ocorre quando em uma determinada entrevista, caso seja obtida uma resposta que conflite com a de outra entrevista, deve-se usar aquela que tiver mais incidência (quantidade de semelhantes)."
                      : "Finally, eliminate conflicts between the CCA and CTA. The conflict between canvases occurs when in a certain interview, if an answer is obtained that conflicts with that of another interview, the one with the highest incidence (quantity of similar ones) should be used."}
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card de Artefatos da Fase */}
        <div className="mt-6 p-4 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            {language === "pt-BR" ? "Artefatos da Fase" : "Phase Artifacts"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {phaseArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="flex flex-col p-4 rounded border border-blue-200"
              >
                <span className="text-xs font-bold mb-1 uppercase tracking-wider">
                  {language === "pt-BR" ? artifact.type_pt : artifact.type_en}
                </span>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="font-medium text-base">
                    {language === "pt-BR" ? artifact.name_pt : artifact.name_en}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* --- INICIO DOS BOTÕES DE NAVEGAÇÃO --- */}
        <div className="flex flex-col md:flex-row gap-4 pt-8 pb-8">
          {/* Botão Voltar: Processo ProAut */}
          <button
            onClick={() => navigate("/proaut-process")}
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
                {language === "pt-BR" ? "Fases do Processo" : "Process Phases"}
              </span>
            </div>
          </button>

          {/* Botão Avançar: Fase de Análise (Amarelo para combinar com a fase) */}
          <button
            onClick={() => navigate("/analysis-phase")}
            className="group w-full md:w-1/2 relative overflow-hidden rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-between"
          >
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-yellow-100 text-sm font-medium uppercase tracking-wider">
                {language === "pt-BR" ? "Próximo Passo" : "Next Step"}
              </span>
              <span className="text-xl font-bold flex items-center gap-2">
                {language === "pt-BR"
                  ? "Ir para Fase 2: Análise"
                  : "Go to Phase 2: Analysis"}
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
