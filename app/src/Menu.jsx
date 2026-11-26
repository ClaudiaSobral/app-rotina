const itens = [
    { id: 'cronometro', rotulo: 'Cronômetro' },
    { id: 'categorias', rotulo: 'Categorias' },
    { id: 'graficos', rotulo: 'Gráficos'},
]

function Menu({ telaAtual, aoMudar }) {
    return (
        <nav className="menu">
            {itens.map(item => (
                <button
                    key={item.id}
                    className={item.id === telaAtual ? 'ativo' : ''}
                    aria-current={item.id === telaAtual ? 'page' : undefined}
                    onClick={() => aoMudar(item.id)}
                    >
                    {item.rotulo}
                </button>
            ))}
        </nav>
    )
}

export default Menu