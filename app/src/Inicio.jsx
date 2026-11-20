import './Inicio.css'

const horizontais = [16, 29, 40, 60, 91]
const verticais = [20, 28, 50, 79]

const blocos = [
    { cor: 'amarelo', esquerda: 20, topo: 29, largura: 29, altura: 12 },
    { cor: 'vermelho', esquerda: 21, topo: 60, largura: 60, altura: 30},
]

function Inicio() {
    return(
        <main className='inicio'>
            {blocos.map(bloco => (
                <div
                key={bloco.cor}
                className={`bloco ${bloco.cor}`}
                style={{
                    left: `${bloco.esquerda}%`,
                    top: `${bloco.topo}%`,
                    width: `${bloco.largura}%`,
                    height: `${bloco.altura}%`,
                }}
                />              
            ))}

            <div className='titulo'>
                <h1>Quadrito</h1>
                <p>sua rotina ideal</p>
            </div>
        </main>
    )
}

export default Inicio