function Tarefa ({ nome, categoria }) {
    return (
        <li>
            {nome} <small>({categoria})</small>
        </li>
    )
}

export default Tarefa