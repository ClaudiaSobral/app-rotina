import { useState } from "react"

function NovaTarefa({ categoriaId, registrar}) {
    const [nome, setNome] = useState('')

    function criar(evento) {
        evento.preventDefault()

        const limpo = nome.trim()
        if (!limpo) return

        registrar('tarefa_criada', {
            tarefa_id: crypto.randomUUID(),
            nome: limpo,
            categoria_id: categoriaId,
        })
        setNome('')
    }

    return (
        <form onSubmit={criar}>
            <label htmlFor={`nova-tarefa-${categoriaId}`}>Nova atividade</label>
            <input 
            id={`nova-tarefa-${categoriaId}`}
            value={nome}
            onChange={e => setNome(e.target.value)}
            />
            <button type="submit">Adicionar</button>
        </form>
    )
}

export default NovaTarefa