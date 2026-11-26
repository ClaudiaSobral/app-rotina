function Categorias({ tarefas, registrar }) {
    return (
        <main>
            <h1>Categorias</h1>
            <ul>
                {tarefas.map(t => (
                    <li key={t.tarefa_id}>{t.nome} ({t.categoria})</li>
                ))}
            </ul>
            <button onClick={() => registrar('tarefa_criada', {
                tarefa_id: crypto.randomUUID(),
                nome: 'Tarefa de teste',
                categoria: 'Teste',
            })}>
                Criar tarefa de teste
            </button>
        </main>
    )
}

export default Categorias