from datetime import datetime
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

TIPOS_CONHECIDOS = {
    "tarefa_criada", "tarefa_editada", "tarefa_arquivada", "sessao_iniciada", "sessao_pausada", "sessao_retomada", "sessao_finalizada"
}

COLUNAS_OBRIGATORIAS = ["evento_id", "tipo", "timestamp_utc", "fuso", "versao_esquema"]

def validar_evento(evento):
    """Devolve a lista de erros do evento
    Lista vazia = evento válido."""

    erros = []

    for coluna in COLUNAS_OBRIGATORIAS:
        if evento.get(coluna) in (None, ""):
            erros.append(f"coluna obrigatória ausente: {coluna}")

    if erros:
        return erros

    if evento["tipo"] not in TIPOS_CONHECIDOS:
        erros.append(f"tipo desconhecido: {evento['tipo']}")

    try:
        datetime.fromisoformat(evento["timestamp_utc"].replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        erros.append(f"timestamp_utc inválido: {evento['fuso']}")

    return erros

