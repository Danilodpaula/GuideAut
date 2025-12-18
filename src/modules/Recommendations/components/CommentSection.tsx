import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comentario } from "@/api/types/recomendacaoTypes";
import {
  listarComentariosApi,
  criarComentarioApi,
  deletarComentarioApi,
} from "@/api/recomendacaoService";
import { toast } from "sonner";
import { Send, MessageSquare, Trash2 } from "lucide-react";
import { CreateReportDialog } from "@/components/reports/CreateReportDialog";
import { useAuth } from "@/core/auth/AuthContext";

interface CommentSectionProps {
  recomendacaoId: string;
  isAuthenticated: boolean;
}

export const CommentSection = ({
  recomendacaoId,
  isAuthenticated,
}: CommentSectionProps) => {
  const { user, can } = useAuth();
  const [comments, setComments] = useState<Comentario[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const loadComments = async () => {
    try {
      const { data } = await listarComentariosApi(recomendacaoId);
      setComments(data);
    } catch (error) {
      console.error("Erro ao carregar comentários", error);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      loadComments();
    }
  }, [isExpanded, recomendacaoId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setIsLoading(true);
    try {
      const { data } = await criarComentarioApi(recomendacaoId, newComment);
      setComments([data, ...comments]);
      setNewComment("");
      toast.success("Comentário enviado!");
    } catch (error) {
      toast.error("Erro ao enviar comentário");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Tem certeza que deseja excluir este comentário?")) return;
    try {
      await deletarComentarioApi(recomendacaoId, commentId);
      toast.success("Comentário removido");
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      toast.error("Erro ao excluir comentário");
    }
  };

  const getInitials = (name: string) => name.slice(0, 2).toUpperCase();

  return (
    <div className="w-full pt-2 border-t mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-muted-foreground gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        {isExpanded ? "Ocultar comentários" : "Ver comentários"}
      </Button>

      {isExpanded && (
        <div className="space-y-4 mt-4 animate-fade-in">
          {isAuthenticated ? (
            <div className="flex gap-3 items-start">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva um comentário..."
                className="min-h-[80px] resize-none"
              />
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={isLoading || !newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Faça login para comentar.
            </p>
          )}

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Seja o primeiro a comentar!
              </p>
            ) : (
              comments.map((comment) => {
                const canDeleteComment =
                  isAuthenticated &&
                  (can("ADMIN") || (user?.id && comment.autorId === user.id));

                return (
                  <div
                    key={comment.id}
                    className="flex gap-3 bg-muted/30 p-3 rounded-lg group"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.autorAvatar || undefined} />
                      <AvatarFallback>
                        {getInitials(comment.autorNome)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-semibold mr-2">
                            {comment.autorNome}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.criadoEm).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                          {isAuthenticated && (
                            <CreateReportDialog
                              targetId={comment.id}
                              targetType="COMMENT"
                            />
                          )}

                          {canDeleteComment && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive transition-opacity"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mt-1 text-foreground/90">
                        {comment.texto}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
