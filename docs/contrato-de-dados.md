# Contrato de dados — Rotina

**Versão do esquema:** 1
**Escopo:** MVP (tarefas e sessões) e Fase 2 (hábitos)

Este documento define quais dados o app gera e como o pipeline deve interpretá-los. O app é a fonte; o pipeline (Airflow, Spark, dbt) só confia no que está escrito aqui.

---

## 1. Princípios

1. **Só acrescenta.** Eventos nunca são alterados nem apagados. Corrigir algo é gerar um evento novo.
2. **IDs nascem no celular.** Todo `evento_id`, `tarefa_id`, `sessao_id` e `habito_id` é um UUID gerado pelo app.
3. **Tempo em UTC, com o fuso junto.** O horário é guardado em UTC (ISO 8601) e o fuso do aparelho vai ao lado, para que o pipeline reconstrua o dia local.
4. **Exportação completa.** Cada arquivo exportado traz o histórico inteiro. Quem evita duplicatas é o pipeline, usando `evento_id` (carga idempotente).
5. **Durações não são guardadas.** O app registra o que aconteceu; o tempo de cada sessão é calculado pelo pipeline.

---

## 2. Arquivo exportado

- Nome: `rotina_AAAA-MM-DD.json` (data local da exportação)
- Formato: JSON

```json
{
  "exportado_em": "2026-10-24T20:30:00Z",
  "eventos": [ { "...": "..." } ]
}
```

---

## 3. Colunas comuns a todo evento

| Coluna | Tipo | Obrigatória | Descrição |
|---|---|---|---|
| `evento_id` | UUID | sim | Identificador único do evento. Chave de deduplicação. |
| `tipo` | texto | sim | Um dos tipos listados nas seções 4 e 6. |
| `timestamp_utc` | texto ISO 8601 | sim | Momento do evento, em UTC. Ex.: `2026-10-24T14:05:00Z`. |
| `fuso` | texto | sim | Fuso IANA do aparelho no momento do evento. Ex.: `America/Sao_Paulo`. |
| `versao_esquema` | inteiro | sim | Versão deste contrato. Hoje: `1`. |

---

## 4. Eventos do MVP: tarefas e sessões

| Tipo | Quando acontece | Campos extras |
|---|---|---|
| `tarefa_criada` | Você cria uma tarefa | `tarefa_id`, `nome`, `categoria` (opcional) |
| `tarefa_editada` | Você muda nome ou categoria | `tarefa_id`, `nome`, `categoria` (valores novos) |
| `tarefa_arquivada` | Você arquiva a tarefa | `tarefa_id` |
| `sessao_iniciada` | Você inicia o cronômetro | `tarefa_id`, `sessao_id` |
| `sessao_pausada` | Você pausa | `sessao_id` |
| `sessao_retomada` | Você retoma depois de pausar | `sessao_id` |
| `sessao_finalizada` | Você encerra a sessão | `sessao_id` |

### Regras de sessão

- Sequência válida: `sessao_iniciada` → (`sessao_pausada` → `sessao_retomada`)* → `sessao_finalizada`.
- **Proposta:** só uma sessão ativa por vez. Iniciar outra exige finalizar a atual.
- Tempo da sessão = soma dos intervalos ativos (início até pausa, retomada até pausa ou fim).
- Sessão que cruza a meia-noite: o pipeline divide o tempo entre os dias, usando o `fuso` do evento.
- Sessão sem `sessao_finalizada`: o pipeline marca como incompleta e não a conta nos totais.
- Tarefa arquivada continua nos dados históricos; só deixa de aparecer para novas sessões.

---

## 5. Validações que o pipeline fará

Estas regras viram testes (pytest, e depois testes do dbt ou Great Expectations):

- `evento_id` não nulo e único após a carga.
- `tipo` pertence à lista de tipos conhecidos.
- `timestamp_utc` em formato válido e não no futuro distante.
- `fuso` é um fuso IANA válido.
- Todo evento de sessão tem `sessao_id`; todo `sessao_iniciada` tem `tarefa_id` existente.
- Sequência de eventos de cada sessão respeita a seção 4.

Eventos que falharem não são descartados em silêncio: vão para uma área de quarentena para análise.

---

## 6. Fase 2: hábitos (fora do MVP)

Checklist de feito/não feito por dia, para cada hábito criado. Dia sem marcação conta como não feito.

| Tipo | Quando acontece | Campos extras |
|---|---|---|
| `habito_criado` | Você cria um hábito | `habito_id`, `nome` |
| `habito_marcado` | Você marca o hábito como feito | `habito_id`, `data_referencia` |
| `habito_desmarcado` | Você desfaz a marcação | `habito_id`, `data_referencia` |

- `data_referencia` é uma **data local** (AAAA-MM-DD), não um horário. Permite marcar um dia anterior.
- O estado de cada quadradinho é o **último evento** daquele `habito_id` naquela `data_referencia`.
- O pipeline usa uma tabela de calendário (`dim_data`, uma linha por dia) para exibir os dias sem marcação como "não feito".

---

## 7. Exemplo

```json
{
  "exportado_em": "2026-10-24T20:30:00Z",
  "eventos": [
    {
      "evento_id": "a1f3c2d4-0000-4000-8000-000000000001",
      "tipo": "tarefa_criada",
      "timestamp_utc": "2026-10-24T14:02:10Z",
      "fuso": "America/Sao_Paulo",
      "versao_esquema": 1,
      "tarefa_id": "t-0001",
      "nome": "Estudar Airflow",
      "categoria": "Estudo"
    },
    {
      "evento_id": "b7c9e1f2-0000-4000-8000-000000000002",
      "tipo": "sessao_iniciada",
      "timestamp_utc": "2026-10-24T14:05:00Z",
      "fuso": "America/Sao_Paulo",
      "versao_esquema": 1,
      "tarefa_id": "t-0001",
      "sessao_id": "s-0001"
    },
    {
      "evento_id": "d2e8a3b4-0000-4000-8000-000000000003",
      "tipo": "sessao_finalizada",
      "timestamp_utc": "2026-10-24T14:45:30Z",
      "fuso": "America/Sao_Paulo",
      "versao_esquema": 1,
      "sessao_id": "s-0001"
    }
  ]
}
```

---

## 8. Evolução do contrato

- Adicionar um tipo de evento ou uma coluna opcional não quebra nada: sobe `versao_esquema`.
- Mudar o significado de uma coluna existente exige nova versão e tratamento explícito no pipeline.
- Toda mudança neste arquivo entra no repositório com um commit descrevendo o motivo.

---

## 9. Decisões tomadas

- Uma sessão ativa por vez.
- Categoria faz parte do MVP.
- Um único dispositivo (o celular): não há dispositivo_id na versão 1. Se isso mudar, entra como coluna nova e sobe versao_esquema.