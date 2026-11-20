import data from '../../data/exemplos/rotina_exemplo.json'
import Tarefa from './Tarefa'
import Cronometro from './Cronometro'
import Inicio from './Inicio'

function App() {
  {/*const tarefas = data.eventos.filter(evento => evento.tipo === 'tarefa_criada')*/}

  return (
    <>
     {/* <h1>Rotina</h1>
      <ul>
        {tarefas.map (tarefa => (
          <Tarefa key={tarefa.tarefa_id} nome={tarefa.nome} categoria={tarefa.categoria}/>
        ))}
      </ul>

      <Cronometro /> */}
      <Inicio />
    </>

  )
}

export default App
