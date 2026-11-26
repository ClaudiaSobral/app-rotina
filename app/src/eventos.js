export function criarEvento(tipo, campos) {
    return {
        evento_id: crypto.randomUUID(),
        tipo,
        timestamp_utc: new Date().toISOString(),
        fuso: Intl.DateTimeFormat().resolvedOptions().timeZone,
        versao_esquema: 1,
        ...campos,
    }
}

export function tarefasAtivas(eventos) {
    const arquivadas = new Set(
        eventos
            .filter(e => e.tipo === 'tarefa_arquivada')
            .map(e => e.tarefa_id)
    )

    return eventos.filter(
        e => e.tipo === 'tarefa_criada' && !arquivadas.has(e.tarefa_id)
    )
}