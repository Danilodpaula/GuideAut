export interface RecomendacaoRequest {
  titulo: string;
  descricao: string;
  justificativa: string;
  categoria: string;
  referencia: string | null;
}

export interface Recomendacao {
  id: string;
  titulo: string;
  descricao: string;
  justificativa: string;
  referencia: string | null;
  categoria: string;
  criadoEm: string;
  somaNotas: number;
  totalAvaliacoes: number;
  autorEmail?: string; // Email do autor da recomendação
}

export interface AvaliacaoRequest {
  nota: number;
}

export interface Comentario {
  id: string;
  texto: string;
  autorNome: string;
  autorAvatar: string | null;
  criadoEm: string;
}
