// PrototypingPhase.tsx
// Página informativa do GuideAut que descreve a Fase de Prototipação do processo ProAut.
// Detalha a criação, validação e refinamento do protótipo com base na TRR Completa.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  ChevronRight,
  FileText,
  Info,
  Lightbulb,
  PenTool,
  Repeat,
  Users,
  X,
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

  // Estrutura da tabela de conteúdos
  const tableOfContents = useMemo(
    () => [
      {
        id: "proaut-phases",
        title: language === "pt-BR" ? "Fases do Processo" : "Process Phases",
        type: "scroll",
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
        className="fixed bottom-10 right-6 z-70 gap-2 p-3 border border-blue-100 bg-blue-50 rounded-lg lg:hidden mb-4"
        onClick={() => setTocOpen(!tocOpen)}
      >
        {tocOpen ? (
          <ChevronRight className="h-6 w-6 text-blue-500" />
        ) : (
          <FileText className="h-6 w-6 text-blue-500" />
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
          <p className="text-lg">
            {language === "pt-BR"
              ? "Do conceito ao concreto: validando ideias com interações reais."
              : "From concept to concrete: validating ideas with real interactions."}
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
            <p>
              {language === "pt-BR"
                ? "A Prototipação é um processo no qual se busca transferir ideias do âmbito conceitual para o concreto. Consiste em todo e qualquer objeto, seja físico ou virtual, que simula uma interação para validar uma ideia, de forma que se produza uma versão inicial da interface idealizada."
                : "Prototyping is a process in which ideas are transferred from the conceptual domain to a tangible form. It consists of creating any object, whether physical or virtual, that simulates an interaction to validate an idea, resulting in an initial version of the idealized interface."}
            </p>
            <p>
              {language === "pt-BR"
                ? "Com o protótipo em mãos, é possível avaliá-lo junto ao usuário, e dependendo do resultado, refiná-lo até transformá-lo em uma solução que realmente esteja alinhada às necessidades levantadas no processo."
                : "With the prototype in hand, it is possible to evaluate it with the user and, depending on the results, refine it until it becomes a solution that is truly aligned with the needs identified during the process."}
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
                  {/* Texto do pop-up */}
                  <CardContent className="p-6">
                    <p className="space-y-3 text-lg">
                      {language == "pt-BR"
                        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu lectus urna. Nulla sit amet vehicula ligula, quis lacinia metus. Fusce eu blandit lacus. Suspendisse vel lacus feugiat, bibendum magna eget, pellentesque diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; "
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu lectus urna. Nulla sit amet vehicula ligula, quis lacinia metus. Fusce eu blandit lacus. Suspendisse vel lacus feugiat, bibendum magna eget, pellentesque diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus pellentesque viverra tempor. Suspendisse potenti. Praesent rutrum pulvinar est id pharetra. Nam sed lacus augue. Donec turpis urna, auctor posuere lobortis nec, ultricies et odio. Morbi vulputate nec ipsum lobortis auctor. Proin dolor purus, sollicitudin ac mattis tristique, malesuada ac leo. Maecenas molestie risus ut arcu volutpat rutrum. Aliquam efficitur vel dolor pellentesque porta."}
                    </p>
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

            <div className="p-4 mt-4">
              <ul className="space-y-2 list-none">
                <li className="flex gap-2">
                  <span className="font-bold min-w-[120px]">
                    {language === "pt-BR" ? "Atividades:" : "Activities:"}
                  </span>
                  <span>
                    {language === "pt-BR"
                      ? "Criar Protótipo, Validar Protótipo e Refinar Protótipo."
                      : "Create Prototype, Validate Prototype, and Refine Prototype."}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold min-w-[120px]">
                    {language === "pt-BR" ? "Entrada:" : "Input:"}
                  </span>
                  <span>
                    {language === "pt-BR" ? "TRR Completa" : "Complete TRR"}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold min-w-[120px]">
                    {language === "pt-BR" ? "Saída:" : "Output:"}
                  </span>
                  <span>
                    {language === "pt-BR"
                      ? "Protótipo validado"
                      : "Validated Prototype"}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold min-w-[120px]">
                    {language === "pt-BR" ? "Envolvidos:" : "Involved:"}
                  </span>
                  <span>
                    {language === "pt-BR"
                      ? "Equipe de desenvolvimento, terapeuta(s), cuidador(es) e cliente(s)."
                      : "Development team, therapist(s), caregiver(s), and client(s)."}
                  </span>
                </li>
              </ul>
            </div>
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

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Para iniciar o desenvolvimento do protótipo, o time de design deverá seguir os requisitos e suas respectivas especificações. Para cada um deles, o time avalia a sugestão de baixa fidelidade contida na TRR, e procura representá-la no protótipo gerado."
                : "To begin the prototype development, the design team must follow the requirements and their respective specifications. For each requirement, the team evaluates the low-fidelity suggestion included in the TRR and seeks to represent it in the generated prototype."}
            </p>
            <p>
              {language === "pt-BR"
                ? "Além disso, o time poderá consultar o GuideAut quantas vezes for necessário."
                : "Additionally, the team may consult the GuideAut as many times as necessary."}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800">
                    {language === "pt-BR"
                      ? "O papel do GuideAut"
                      : "The role of GuideAut"}
                  </h4>
                  <p className="text-blue-700 text-sm mt-1">
                    {language === "pt-BR"
                      ? "O GuideAut poderá fornecer informações úteis para nortear algumas decisões da equipe, quanto ao que usar ou não usar quanto às cores, formas geométricas (caso necessário) e layouts a serem utilizados durante o design das interfaces do protótipo, por exemplo."
                      : "The GuideAut can provide useful information to guide some design decisions regarding the use of colors, geometric shapes (when necessary), and layout choices for the prototype’s interface design."}
                  </p>
                </div>
              </div>
            </div>
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

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Após a finalização do protótipo, este é validado pelos stakeholders envolvidos. Tal atividade pode acontecer por meio de uma reunião com os envolvidos, apresentando o que foi projetado."
                : "After completing the prototype, it is validated by the stakeholders involved. This activity may take place in a meeting where the designed prototype is presented."}
            </p>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg mb-3 border-b pb-2">
                {language === "pt-BR"
                  ? "Recomendação de Alta Fidelidade"
                  : "High-Fidelity Recommendation"}
              </h4>
              <p className="mb-4">
                {language === "pt-BR"
                  ? "Recomenda-se que para essa apresentação, o protótipo seja de alta fidelidade, e esteja representado em um dispositivo (notebook, tablet, smartphone) físico ou emulado."
                  : "It is recommended that this presentation be made using a high-fidelity prototype displayed on a physical or emulated device (such as a notebook, tablet, or smartphone)."}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  {language === "pt-BR"
                    ? "Torna o processo de revisão mais fluido."
                    : "Makes the review process more fluid."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Permite visualizar o projeto em escala real e validar funcionalidades."
                    : "Allows visualizing the project at real scale and validate its functionalities."}
                </li>
                <li>
                  {language === "pt-BR"
                    ? "Permite observar se as decisões de design estão de acordo com o esperado."
                    : "Enables observing whether design decisions align with expectations."}
                </li>
              </ul>
            </div>

            <p className="italic">
              {language === "pt-BR"
                ? "No decorrer dessa etapa, os stakeholders podem solicitar mudanças no protótipo apresentado. Tais sugestões devem ser registradas, para garantir que todas as mudanças sejam realizadas."
                : "During this stage, stakeholders may request changes to the prototype. Such suggestions must be documented to ensure that all necessary modifications are implemented."}
            </p>
          </div>
        </section>

        {/* --- ATIVIDADE: REFINAR PROTÓTIPO --- */}
        <section
          id="refinar-prototipo"
          className="scroll-m-20 space-y-6 mt-12 pt-8 border-t"
        >
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

          <div className="space-y-4">
            <p>
              {language === "pt-BR"
                ? "Conforme comentado anteriormente, nesta etapa é importante que todos os itens de melhoria apontados pelos stakeholders componham o refinamento do protótipo proposto."
                : "As mentioned previously, it is essential that all improvement items identified by stakeholders are incorporated into the proposed prototype refinement."}
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
              <p className="font-medium text-green-900 text-lg mb-2">
                {language === "pt-BR" ? "Ciclo de Iteração" : "Iteration Cycle"}
              </p>
              <p className="text-green-800">
                {language === "pt-BR"
                  ? "O refinamento e validação compõem um ciclo de iteração até que o protótipo esteja em um nível satisfatório para os stakeholders, especialmente para o cliente."
                  : "The refinement and validation form an iterative cycle that continues until the prototype reaches a level considered satisfactory by the stakeholders, especially the client."}
              </p>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="font-bold text-green-900">
                  {language === "pt-BR"
                    ? "Com o fim do ciclo, entende-se que o protótipo está pronto para ser desenvolvido de fato."
                    : "Once this cycle is completed, the prototype is deemed ready for actual development."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resumo dos Artefatos */}
        <div className="mt-8 bg-slate-50 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            {language === "pt-BR" ? "Artefatos da Fase" : "Phase Artifacts"}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {phaseArtifacts.map((artifact) => (
              <li
                key={artifact.id}
                className="flex flex-col bg-white p-3 rounded border shadow-sm"
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
          className="fixed w-full h-full bg-black/50 z-60 lg:hidden"
          onClick={() => setTocOpen(false)}
        />
      )}

      {/* Tabela de Conteúdos */}
      <div
        className={`${tocOpen ? "fixed" : "hidden"} w-[100vw] max-h-[80vh] z-70 lg:relative lg:w-80 lg:block lg:order-2 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5rem)] overflow-y-auto flex-shrink-0 p-6`}
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
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-start gap-2 text-white/90${
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
