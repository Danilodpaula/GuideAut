import { enUS as ArtifactsEnUs } from "./Artifacts/en-US";
import { ptBR as ArtifactsPtBr } from "./Artifacts/pt-BR";
import { enUS as AdmBaseEnUS } from "./Base/en-US";
import { ptBR as AdmBasePtBr } from "./Base/pt-BR";
import { enUS as RecommendationsEnUs } from "./Recommendations/en-US";
import { ptBR as RecommendationsPtBr } from "./Recommendations/pt-BR";
import { enUS as TutorialEnUs } from "./Tutorial/en-US";
import { ptBR as TutorialPtBr } from "./Tutorial/pt-BR";

export const enUS = {
  ...AdmBaseEnUS,
  ...ArtifactsEnUs,
  ...RecommendationsEnUs,
  ...TutorialEnUs,
};

export const ptBR = {
  ...AdmBasePtBr,
  ...ArtifactsPtBr,
  ...RecommendationsPtBr,
  ...TutorialPtBr,
};
