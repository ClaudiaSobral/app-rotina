import data from '../../data/exemplos/rotina_exemplo.json'
import { criarEvento, tarefasAtivas } from './eventos'
import Tarefa from './Tarefa'
import Cronometro from './Cronometro'
import Inicio from './Inicio'
import Categorias from './Categorias'
import Graficos from './Graficos'
import Menu from './Menu'
import { useState, useEffect } from 'react'

function App() {
  const [tela, setTela] = useState('inicio');
  
  const [eventos, setEventos] = useState(data.eventos)

  const registrar = (tipo, campos) => {
    setEventos(atuais => [...atuais, criarEvento(tipo, campos)])
  }

  const tarefas = tarefasAtivas(eventos)

  useEffect(() => {
    const relogio = setTimeout (() => {
      setTela('cronometro')
    }, 2500)

    return () => clearTimeout(relogio)  
  }, [])

  if (tela === 'inicio') {
    return <Inicio />
  }

  return (
    <div className="app">
      <div className='conteudo'>
        {tela === 'cronometro' && <Cronometro tarefas={tarefas} registrar ={registrar} />}
        {tela === 'categorias' && <Categorias tarefas={tarefas} registrar ={registrar} />}
        {tela === 'graficos' && <Graficos />}
      </div>

      <Menu telaAtual={tela} aoMudar={setTela}/>
    </div>
  )
}

export default App
