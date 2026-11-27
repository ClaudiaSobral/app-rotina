export function criarEvento(tipo, campos) {
    return {
        evento_id: crypto.randomUUID(),
        tipo,
        timestamp_utc: new Date().toISOString(),
        fuso: Intl.DateTimeFormat().resolvedOptions().timeZone,
        versao_esquema: 2,
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

export function categoriasAtivas(eventos) {
    const porId = new Map()

    for (const e of eventos) {
        if (e.tipo === 'categoria_criada') {
            porId.set(e.categoria_id, { categoria_id: e.categoria_id, nome: e.nome, ativa: true })
        }
        if (e.tipo === 'categoria_arquivada') {
            const categoria = porId.get(e.categoria_id)
            if (categoria) categoria.ativa = false
        }
    }
    
    return [...porId.values()].filter(c => c.ativa)

}