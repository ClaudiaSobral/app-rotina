import json
from pathlib import Path

from pipeline.validacao import validar_evento

EXEMPLO = Path("data/exemplos/rotina_exemplo.json")

def carregar_eventos():
    return json.loads(EXEMPLO.read_text(encoding="utf-8"))["eventos"]

def test_eventos_do_exemplo_sao_validos():
    for evento in carregar_eventos():
        assert validar_evento(evento) == []

def test_evento_com_tipo_desconhecido_e_invalido():
    ""
    evento = carregar_eventos()[0] | {"tipo": "tarefa_inventada"}
    erros = validar_evento(evento)
    assert len(erros) == 1 