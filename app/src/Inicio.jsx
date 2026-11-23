import './Inicio.css'

const horizontais = [    
    {y: 10, de: 60, ate: 100},
    {y: 33, de: 0, ate: 100},
    {y: 60, de: 0, ate: 100},
    {y: 75, de: 0, ate: 100},
    {y: 80, de: 0, ate: 100}
]
const verticais = [
    {x: 19, de: 60, ate: 100},
    {x: 60, de: 0, ate: 60.5},
    {x: 81, de: 60, ate: 100},

]

const blocos = [
    { cor: 'amarelo', esquerda: 0, topo: 80, largura: 40, altura: 40 },
    { cor: 'preto', esquerda: 60, topo: 0, largura: 10.8, altura: 33.5 },
    { cor: 'vermelho', esquerda: 30, topo: 10.8, largura: 25, altura: 5 },
    { cor: 'vermelho', esquerda: 0, topo: 0, largura: 61, altura: 33.4},
    { cor: 'azul', esquerda: 61, topo: 33.5, largura: 40, altura: 27},
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
            {horizontais.map(linha => (
                <div
                key = {`${linha.y}-${linha.de}`}
                className="linha horizontal"
                style={{
                    top: `${linha.y}%`,
                    left: `${linha.de}%`,
                    width: `${linha.ate - linha.de}%`,
                }}
                
                />
                
            ))}
            {verticais.map(linha => (
                <div
                key = {`${linha.x}-${linha.de}`}
                className="linha vertical"
                style={{
                    left: `${linha.x}%`,
                    top: `${linha.de}%`,
                    height: `${linha.ate - linha.de}%`,
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