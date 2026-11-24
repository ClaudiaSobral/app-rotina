import data from '../../data/exemplos/rotina_exemplo.json'
import Tarefa from './Tarefa'
import Cronometro from './Cronometro'
import Inicio from './Inicio'
import { useState, useEffect } from 'react'

function App() {
  const [tela, setTela] = useState('inicio');
  /*const tarefas = data.eventos.filter(evento => evento.tipo === 'tarefa_criada')*/

  useEffect(() => {
    const relogio = setTimeout (() => {
      setTela('cronometro')
    }, 2500)

    return () => clearTimeout(relogio)  
  }, [])

  if (tela === 'cronometro') {
    return <Cronometro />
  }

  return <Cronometro />
}

export default App
