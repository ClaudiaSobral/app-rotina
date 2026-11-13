import data from '../../data/exemplos/rotina_exemplo.json'
import Tarefa from './Tarefa'

function App() {
  const tarefas = data.eventos.filter(evento => evento.tipo === 'tarefa_criada')

  return (
    <>
      <h1>Rotina</h1>
      <ul>
        {tarefas.map (tarefa => (
          <Tarefa key={tarefa.tarefa_id} nome={tarefa.nome} categoria={tarefa.categoria}/>
        ))}
      </ul>
    </>

  )
}

export default App
