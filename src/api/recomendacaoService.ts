import api from "./client";
import {
  AvaliacaoRequest,
  RecomendacaoRequest,
} from "./types/recomendacaoTypes";

import { Comentario } from "./types/recomendacaoTypes";

export const listarRecomendacoesApi = () => {
  return api.get("/recomendacoes/list-all");
};

export const criarRecomendacaoApi = (data: RecomendacaoRequest) => {
  return api.post("/recomendacoes", data);
};

export const atualizarRecomendacaoApi = (
  id: string,
  data: RecomendacaoRequest,
) => {
  return api.put(`/recomendacoes/${id}`, data);
};

export const deletarRecomendacaoApi = (id: string) => {
  return api.delete(`/recomendacoes/${id}`);
};

export const avaliarRecomendacaoApi = (id: string, data: AvaliacaoRequest) => {
  return api.post(`/recomendacoes/${id}/avaliar`, data);
};

export const listarComentariosApi = (id: string) => {
  return api.get<Comentario[]>(`/recomendacoes/${id}/comentarios`);
};

export const criarComentarioApi = (id: string, texto: string) => {
  return api.post<Comentario>(`/recomendacoes/${id}/comentarios`, { texto });
};

export const deletarComentarioApi = (recId: string, comentarioId: string) => {
  return api.delete(`/recomendacoes/${recId}/comentarios/${comentarioId}`);
};
