// ProAutProcess.tsx
// Página informativa do GuideAut que descreve o processo ProAut.
// Apresenta as 4 fases do método baseado em Design Thinking, atividades,
// artefatos gerados e recursos adicionais para equipes de desenvolvimento.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  Boxes,
  ChevronRight,
  FileText,
  Info,
  Lightbulb,
  Palette,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🧩 Componente principal da página "Processo ProAut".
 * Mostra cada fase do processo com atividades, artefatos e botões de download.
 * Ideal para orientar equipes que aplicam o método no desenvolvimento de interfaces acessíveis.
 */
export default function ProAutProcess() {
  const phaseDeliverables = {
    imersao: [
      {
        id: "es",
        name_pt: "Formulários de entrevista",
        name_en: "Interviews Formularies",
      },
      {
        id: "fca",
        name_pt: "Ficha de Caracterização do Autista (FCA)",
        name_en: "Autistic Characterization Form (ACF)",
      },
      {
        id: "mc",
        name_pt: "Canvas (CCS, CCA, CTA)",
        name_en: "Canvas (CCS, CCA, CTA)",
      },
    ],
    analise: [
      {
        id: "tir",
        name_pt: "Tabela Inicial de Requisitos/Restrições de Interface",
        name_en: "Initial Table of Interface Requirements/Constraints",
      },
      {
        id: "pa",
        name_pt: "Template Persona Autista",
        name_en: "Autistic Persona Template",
      },
      {
        id: "mp",
        name_pt: "Template Mapa de Empatia",
        name_en: "Empathy Map Template",
      },
    ],
    ideacao: [
      {
        id: "tfr",
        name_pt: "Tabela Final de Requisitos/Restrições de Interface",
        name_en: "Final Table of Interface Requirements/Constraints",
      },
    ],
    prototipacao: [
      {
        id: "prot",
        name_pt: "Protótipo Interativo",
        name_en: "Interactive Prototype",
      },
      {
        id: "rel",
        name_pt: "Relatório de Validação",
        name_en: "Validation Report",
      },
    ],
  };

  const { language } = useI18n();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [diagramOpen, setDiagramOpen] = useState(false);

  // Estrutura da tabela de conteúdos com paths de navegação
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
    window.scrollTo(0, 0);
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

  // Estrutura de fases do processo ProAut, com conteúdo bilíngue
  const phases = [
    {
      id: "imersao",
      name: language === "pt-BR" ? "1. Imersão" : "1. Immersion",
      icon: Users,
      color: "bg-blue-500",
      description:
        language === "pt-BR" ? (
          <>
            <p className="mb-4">
              Antes de realizar a elicitação dos requisitos, é de extrema
              importância que todos os envolvidos no projeto conheçam o domínio
              do problema a ser resolvido pela aplicação a ser desenvolvida.
              Acreditamos que a abordagem para alcançar tal domínio é ser capaz
              de estabelecer uma comunicação ativa com seu usuário, permitindo
              que a pessoa autista participe do processo de design da
              tecnologia. É neste aspecto que a imersão trabalha.
            </p>
            <p className="mb-4">
              A fase de imersão é a fase caracterizada pela aproximação do
              problema. É nesta etapa que a equipe busca conhecer conceitos que
              permeiam o tema da aplicação a ser projetada.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Entrada da fase:</strong> a ideia ou visão geral de
                aplicação.
              </li>
              <li>
                <strong>Saída da fase:</strong> CCA (Canvas dos Cuidadores de
                Autistas); CTA (Canvas dos Terapeutas de Autistas); CSS (Canvas
                do Solicitante do Software); Formulário de Caracterização do
                Autista; e VGA (Gráfico de Visão Geral do Autista).
              </li>
              <li>
                <strong>Envolvidos:</strong> Pais, especialistas, solicitantes
                de software, designers/desenvolvedores.
              </li>
              <li>
                <strong>Atividades da Fase:</strong> Aprender sobre o contexto,
                Elicitar Requisitos e Consolidar Dados.
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-4">
              Before performing requirements elicitation, it is extremely
              important that everyone involved in the project knows the domain
              of the problem to be solved by the application to be developed. We
              believe that the approach to achieve such domain is to be able to
              establish active communication with your user, allowing the
              autistic person to participate in the technology design process.
              This is the aspect that immersion works on.
            </p>
            <p className="mb-4">
              The immersion phase is characterized by approaching the problem.
              It is at this stage that the team seeks to understand concepts
              that permeate the theme of the application to be designed.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Phase input:</strong> the application idea or overview.
              </li>
              <li>
                <strong>Phase output:</strong> ACC (Autistic Caregivers Canvas);
                ATC (Autistic Therapists Canvas); RSC (Software Requester
                Canvas); Autistic Characterization Form (ACF); and AOG (Autistic
                Overview Graph).
              </li>
              <li>
                <strong>Involved:</strong> Parents, specialists, software
                requesters, designers/developers.
              </li>
              <li>
                <strong>Phase Activities:</strong> Learn about the context,
                Elicit Requirements and Consolidate Data.
              </li>
            </ul>
          </>
        ),
    },
    {
      id: "analise",
      name: language === "pt-BR" ? "2. Análise" : "2. Analysis",
      icon: Lightbulb,
      color: "bg-yellow-500",
      description:
        language === "pt-BR" ? (
          <>
            <p className="mb-4">
              A fase de Análise é o momento de aproximação do problema. Agora
              que a equipe coletou diversos dados na imersão, é preciso
              mergulhar nessas informações e avaliar as implicações do desafio
              sob o ponto de vista de todos os envolvidos (stakeholders).
            </p>
            <p className="mb-4">
              A fase de Análise tem como objetivo aprofundar as informações
              obtidas na fase de Imersão e iniciar as principais propostas de
              solução.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Entrada da fase:</strong> Canvas preenchidos
                (Solicitante, Cuidadores, Terapeutas), ACF respondido e Gráfico
                VGA.
              </li>
              <li>
                <strong>Envolvidos:</strong> Time de desenvolvimento,
                cuidador(es) e/ou terapeuta(s).
              </li>
              <li>
                <strong>Atividades da Fase:</strong> Triangular dos Dados, Gerar
                Mapa de Empatia e Gerar de Personas.
              </li>
              <li>
                <strong>Saída da fase:</strong> Lista Inicial de
                Requisitos/Restrições, Personas e Mapa de Empatia.
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-4">
              The Analysis phase is the moment to approach the problem. Now that
              the team has collected various data during immersion, it is
              necessary to dive into this information and evaluate the
              implications of the challenge from the point of view of all
              stakeholders involved.
            </p>
            <p className="mb-4">
              The Analysis phase aims to delve deeper into the information
              obtained in the Immersion phase and initiate the main proposed
              solutions.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Phase Input:</strong> Filled Canvases (Requester,
                Caregivers, Therapists), answered ACF and AOG Graph.
              </li>
              <li>
                <strong>Involved:</strong> Development team, caregiver(s) and/or
                therapist(s).
              </li>
              <li>
                <strong>Phase Activities:</strong> Triangular Data Analysis,
                Generate Empathy Map, and Generate Personas.
              </li>
              <li>
                <strong>Phase Output:</strong> Initial Requirements/Constraints
                Table (RCT), Personas and Empathy Map.
              </li>
            </ul>
          </>
        ),
    },
    {
      id: "ideacao",
      name: language === "pt-BR" ? "3. Ideação" : "3. Ideation",
      icon: Palette,
      color: "bg-green-500",
      description:
        language === "pt-BR" ? (
          <>
            <p className="mb-4">
              A fase de ideação tem como objetivo gerar ideias por meio de
              estímulos de criatividade em conjunto com a equipe de
              desenvolvimento e design da aplicação, em conformidade com o
              contexto e expectativas do usuário do software/app. Ela segue a
              criação dos artefatos de personas, mapas de empatia e a versão
              inicial da Tabela de Requisitos/Restrições.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Entrada da fase:</strong> a Lista Inicial de
                Requisitos/Restrições da Interface (TRR), o Mapa de Empatia e as
                Personas.
              </li>
              <li>
                <strong>Saída da fase:</strong> Lista Atualizada da Tabela de
                Requisitos/Restrições da Interface (TRR) completa.
              </li>
              <li>
                <strong>Envolvidos:</strong> Pais, especialistas, solicitantes
                de software, designers/desenvolvedores.
              </li>
              <li>
                <strong>Atividades da Fase:</strong> Definir Itens de
                Requisitos/Restrições, Especificar Itens Requisitos e
                Gerar/Refinar Ideias de Interface.
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-4">
              The ideation phase aims to generate ideas through creativity
              stimuli together with the application development and design team,
              in accordance with the software/app user's context and
              expectations. It follows the creation of persona artifacts,
              empathy maps and the initial version of the
              Requirements/Constraints Table.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Phase input:</strong> the Initial Interface
                Requirements/Constraints List (RCT), the Empathy Map and the
                Personas.
              </li>
              <li>
                <strong>Phase output:</strong> Updated Complete Interface
                Requirements/Constraints Table (RCT) List.
              </li>
              <li>
                <strong>Involved:</strong> Parents, specialists, software
                requesters, designers/developers.
              </li>
              <li>
                <strong>Phase Activities:</strong> Define
                Requirements/Constraints Items, Specify Requirements Items and
                Generate/Refine Interface Ideas.
              </li>
            </ul>
          </>
        ),
    },
    {
      id: "prototipacao",
      name: language === "pt-BR" ? "4. Prototipação" : "4. Prototyping",
      icon: Boxes,
      color: "bg-purple-500",
      description:
        language === "pt-BR" ? (
          <>
            <p className="mb-4">
              A Prototipação é um processo no qual se busca transferir ideias do
              âmbito conceitual para o concreto. Consiste em todo e qualquer
              objeto, seja físico ou virtual, que simula uma interação para
              validar uma ideia, de forma que se produza uma versão inicial da
              interface idealizada.
            </p>
            <p className="mb-4">
              Com o protótipo em mãos, é possível avaliá-lo junto ao usuário, e
              dependendo do resultado, refiná-lo até transformá-lo em uma
              solução que realmente esteja alinhada às necessidades levantadas
              no processo.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Entrada da fase:</strong> Lista Atualizada da Tabela de
                Requisitos/Restrições da Interface (TRR) completa.
              </li>
              <li>
                <strong>Saída da fase:</strong> Protótipos de baixa, média e
                alta fidelidade.
              </li>
              <li>
                <strong>Envolvidos:</strong> Designers/desenvolvedores,
                usuários, cuidadores e especialistas.
              </li>
              <li>
                <strong>Atividades da Fase:</strong> Desenvolver protótipos,
                Validar com usuários e Refinar iterativamente.
              </li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-4">
              Prototyping is a process in which ideas are transferred from the
              conceptual domain to a tangible form. It consists of creating any
              object, whether physical or virtual, that simulates an interaction
              to validate an idea, resulting in an initial version of the
              idealized interface.
            </p>
            <p className="mb-4">
              With the prototype in hand, it is possible to evaluate it with the
              user and, depending on the results, refine it until it becomes a
              solution that is truly aligned with the needs identified during
              the process.
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside mb-4">
              <li>
                <strong>Phase Input:</strong> Updated Complete Interface
                Requirements/Constraints Table (RCT) List.
              </li>
              <li>
                <strong>Phase Output:</strong> Low, medium and high fidelity
                prototypes.
              </li>
              <li>
                <strong>Involved:</strong> Designers/developers, users,
                caregivers and specialists.
              </li>
              <li>
                <strong>Phase Activities:</strong> Develop prototypes, Validate
                with users and Refine iteratively.
              </li>
            </ul>
          </>
        ),
    },
  ];

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
            {language === "pt-BR" ? "Visão geral do ProAut" : "ProAut Overview"}
          </h1>

          {/* Introdução ao ProAut */}
          <div className="space-y-4 text-lg">
            <p>
              {language === "pt-BR"
                ? "Muitas tecnologias atuais são, geralmente, inacessíveis, pois as pessoas que criam as tecnologias convencionais não incorporam, regularmente, design acessível e como desenvolvedores, sabemos que cada etapa do desenvolvimento de uma aplicação precisa ser meticulosamente idealizada e analisada antes de ser propriamente implementada."
                : "Many current technologies are generally inaccessible because the people who create conventional technologies do not regularly incorporate accessible design, and as developers, we know that each stage of application development needs to be meticulously conceived and analyzed before being properly implemented."}
            </p>
            <p>
              {language === "pt-BR"
                ? "O grande impasse é: somos levados a ignorar muitos contextos importantes que precisam ser desvendados para evitar problemas com aqueles que mais devemos satisfazer, os clientes e inevitavelmente, até mesmo as coisas mais simples passam despercebidas dado certos contextos. É nesse entremeio que a falta de cuidado no desenvolvimento de tecnologias para usuários com condições neurodivergentes fica evidente."
                : "The great impasse is: we are led to ignore many important contexts that need to be uncovered to avoid problems with those we must satisfy the most - the clients - and inevitably, even the simplest things go unnoticed given certain contexts. It is in this interlude that the lack of care in developing technologies for users with neurodivergent conditions becomes evident."}
            </p>
            <p>
              {language === "pt-BR"
                ? "Mitigar esse problema é o nosso objetivo e o GuideAut, como ferramenta WEB colaborativa, disponibiliza as ferramentas e repositório de informações necessárias para que sua equipe possa facilmente construir um protótipo de qualidade da sua aplicação. Com o ProAut, o processo baseado em Design Thinking (DT) que permeia o funcionamento do GuideAut, é possível realizar o alinhamento de requisitos com foco nos autistas."
                : "Mitigating this problem is our goal, and GuideAut, as a collaborative WEB tool, provides the tools and information repository necessary for your team to easily build a quality prototype of your application. With ProAut, the Design Thinking (DT) based process that permeates GuideAut's functioning, it is possible to align requirements with a focus on autistic individuals."}
            </p>
          </div>

          {/* Informação sobre as fases */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-medium">
                  {language === "pt-BR"
                    ? "INFO: O ProAut é indicado, principalmente, para construção de protótipos de baixa fidelidade."
                    : "INFO: ProAut is mainly recommended for building low-fidelity prototypes."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fases do processo */}
        <div className="grid gap-6">
          <section id="proaut-phases" className="space-y-12 scroll-m-20 pt-6">
            <h2 className="text-3xl font-bold tracking-tight border-b pb-2">
              {language === "pt-BR" ? "Fases do Processo" : "Process Phases"}
            </h2>

            <div className="space-y-4">
              <p className="text-lg">
                {language === "pt-BR"
                  ? "O ProAut possui 4 fases: Fase de imersão, Análise, Ideação e Prototipação. Nas quais:"
                  : "ProAut has 4 phases: Immersion phase, Analysis, Ideation and Prototyping. In which:"}
              </p>

              <ul className="space-y-3 text-lg list-disc list-inside">
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de imersão"
                      : "Immersion phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "você conhece aspectos relacionados ao autismo, adaptação da fase de imersão original do DT. Te direciona para uma solução e guia na geração de documentação para definir o problema a ser resolvido;"
                    : "you learn aspects related to autism, adaptation of the original DT immersion phase. It directs you to a solution and guides in generating documentation to define the problem to be solved;"}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de análise"
                      : "Analysis phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "observe padrões e elimine discordâncias na documentação da fase de imersão. Isso possibilita gerar empatia e personas com mais precisão;"
                    : "observe patterns and eliminate discrepancies in the immersion phase documentation. This enables generating empathy and personas with more accuracy;"}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de ideação"
                      : "Ideation phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "conheça requisitos, reunindo a equipe de desenvolvimento para uma comunicação aberta acerca de melhorias, adições e remoções de ferramentas pensadas para resolver o problema definido;"
                    : "learn requirements, gathering the development team for open communication about improvements, additions and removals of tools designed to solve the defined problem;"}
                </li>
                <li>
                  <strong>
                    {language === "pt-BR"
                      ? "Fase de prototipação"
                      : "Prototyping phase"}
                    :
                  </strong>{" "}
                  {language === "pt-BR"
                    ? "a concepção do protótipo e seu refinamento."
                    : "the conception of the prototype and its refinement."}
                </li>
              </ul>

              <p className="text-lg pt-2 flex items-center gap-1 flex-wrap">
                {language === "pt-BR"
                  ? "Cada fase possui atividades que devem ser realizadas com artefatos disponibilizados na aba"
                  : "Each phase has activities that must be performed with artifacts provided in the"}
                <FileText className="h-5 w-5 mx-1" />
                <strong>
                  {language == "pt-BR" ? "Artefatos" : "Artifacts"}
                </strong>
                {""}
                {language === "pt-BR"
                  ? "da barra lateral esquerda da página atual."
                  : "tab on the left of the current page."}
              </p>
            </div>

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

            {/* Fluxograma ProAut*/}
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
                      ? "src/modules/Tutorial/assets/imersion-phase/FluxoProAut-pt-br.png"
                      : "src/modules/Tutorial/assets/imersion-phase/FluxoProAut-en-us.png"
                  }
                  alt={
                    language === "pt-BR"
                      ? "Diagrama do processo ProAut"
                      : "ProAut process diagram"
                  }
                  className="w-full h-auto rounded-md shadow-sm"
                />
                <p className="text-sm text-center mt-2">
                  {language === "pt-BR"
                    ? "Figura 1: Diagrama ilustrativo do processo ProAut"
                    : "Figure 1: Illustrative diagram of the ProAut process"}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-lg">
              <p>
                {language === "pt-BR"
                  ? "Cada atividade possui sua particularidade e funcionalidade dado às necessidades do seu desenvolvimento. Elas são baseadas em técnicas já consolidadas de entrevistas, Desk Research, geração de personas e mapa de empatias, por exemplo, montadas para o contexto do TEA."
                  : "Each activity has its particularity and functionality given the needs of your development. They are based on already consolidated techniques such as interviews, Desk Research, persona generation and empathy maps, for example, tailored for the ASD context."}
              </p>

              <p>
                {language === "pt-BR"
                  ? "Caso já tenha feito uso do ProAut anteriormente e esteja em dúvida acerca de alguma atividade ou artefato, acesse o referido conteúdo através da Tabela de Conteúdos na barra lateral esquerda. Caso nunca tenha usado, recomendamos fortemente que prossiga pelo tutorial até se sentir confortável para explorar os artefatos e iniciar a sua jornada de prototipação!"
                  : "If you have used ProAut before and are in doubt about any activity or artifact, access the mentioned content through the Table of Contents in the left sidebar. If you have never used it, we strongly recommend that you proceed with the tutorial until you feel comfortable exploring the artifacts and starting your prototyping journey!"}
              </p>
            </div>
            {phases.map((phase) => {
              const Icon = phase.icon;
              const deliverables = phaseDeliverables[phase.id] || [];

              return (
                <React.Fragment key={phase.id}>
                  <div
                    className={`rounded-lg flex items-start gap-4 p-4
                                  ${phase.id === "imersao" ? "bg-blue-50 border-l-8 border-blue-400" : ""}
                                  ${phase.id === "analise" ? "bg-yellow-50 border-l-8 border-yellow-400" : ""}
                                  ${phase.id === "ideacao" ? "bg-green-50 border-l-8 border-green-400" : ""}
                                  ${phase.id === "prototipacao" ? "bg-purple-50 border-l-8 border-purple-400" : ""}
                  `}
                  >
                    <div className={`${phase.color} p-3 rounded-xl shrink-0`}>
                      <Icon className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold leading-none tracking-tight pt-1 text-black">
                        {phase.name}
                      </h3>
                    </div>
                  </div>

                  {/* Descrição da Fase */}
                  <div className="text-base space-y-4">{phase.description}</div>
                </React.Fragment>
              );
            })}
          </section>
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
