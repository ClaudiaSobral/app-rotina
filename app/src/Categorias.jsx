import { useState } from 'react'
import NovaTarefa from './NovaTarefa'

function Categorias({ categorias, tarefas, registrar }) {
    const [novoNome, setNovoNome] = useState('')
    const [aviso, setAviso] = useState('')

    function criarCategoria(evento) {
        evento.preventDefault()

        const nome = novoNome.trim()
        if (!nome) return
        
        const jaExiste = categorias.some(
            c => c.nome.toLowerCase() === nome.toLowerCase()
        )
        if (jaExiste) {
            setAviso(`A categoria "${nome}" já existe.`)
            return
        }

        registrar('categoria_criada', {
            categoria_id: crypto.randomUUID(),
            nome,
        })
        setNovoNome('')
        setAviso('')
    }

    return (
        <main className="categorias">
            <h1>Categorias</h1>

            <form onSubmit={criarCategoria}>
                <label htmlFor="nova-categoria">Nova categoria</label>
                <input id="nova-categoria"
                value={novoNome}
                onChange={e => setNovoNome(e.target.value)}
                />
                <button type="submit">Adicionar</button>
            </form>

            {aviso && <p role="alert">{aviso}</p>}

            <ul>
                {categorias.map(categoria => {
                    const tarefasDaCategoria = tarefas.filter(
                        t => t.categoria_id === categoria.categoria_id
                    )
                    const quantidade = tarefasDaCategoria.length

                    return (
                        <li key={categoria.categoria_id}>
                            <span>{categoria.nome}</span>
                            <small>{quantidade} atividade(s)</small>
                            <button
                            disabled={quantidade > 0}
                            aria-label={`Excluir ${categoria.nome}`}
                            onClick={() =>
                                registrar('categoria_arquivada', {
                                    categoria_id: categoria.categoria_id,
                                })
                            }
                            >
                                Excluir
                            </button>

                            <ul>
                                {tarefasDaCategoria.map(tarefa => (
                                    <li key={tarefa.tarefa_id}>
                                        {tarefa.nome}
                                        <button
                                        aria-label={`Excluir ${tarefa.nome}`}
                                        onClick={() => registrar('tarefa_arquivada', {tarefa_id: tarefa.tarefa_id})}>Excluir</button>
                                    </li>
                                ))}
                            </ul>

                            <NovaTarefa categoriaId={categoria.categoria_id} registrar={registrar} />
                        </li>
                    )

                })}
            </ul>

            {categorias.length === 0 && <p>Nenhuma categoria ainda</p>}
        </main>
    )
}

export default Categorias