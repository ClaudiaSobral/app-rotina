import data from '../../data/exemplos/rotina_exemplo.json'
import { categoriasAtivas, criarEvento, tarefasAtivas } from './eventos'
import Cronometro from './Cronometro'
import Inicio from './Inicio'
import Categorias from './Categorias'
import Graficos from './Graficos'
import Menu from './Menu'
import { useState, useEffect } from 'react'
import { carregarEventos, salvarEventos } from './armazenamento'

function App() {
  const [tela, setTela] = useState('inicio')
  
  const [eventos, setEventos] = useState(() => carregarEventos(data.eventos))
  
  useEffect(() => {
    salvarEventos(eventos)
  }, [eventos])

  const registrar = (tipo, campos) => {
    setEventos(atuais => [...atuais, criarEvento(tipo, campos)])
  }
  
  const tarefas = tarefasAtivas(eventos)

  const categorias = categoriasAtivas(eventos)

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
        {tela === 'cronometro' && <Cronometro tarefas={tarefas} registrar={registrar} />}
        {tela === 'graficos' && <Graficos />}
        {tela === 'categorias' && (<Categorias categorias={categorias} tarefas={tarefas} registrar={registrar} />)}
      </div>

      <Menu telaAtual={tela} aoMudar={setTela}/>
    </div>
  )
}

export default App
