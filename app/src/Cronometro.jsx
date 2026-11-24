import "./Cronometro.css"

function formatarTempo() {
    const hora = Math.floor(totalSegundos / 3600)


}
function Cronometro() {
    return (
        <main className="cronometro">
            <p className="contador">00:00</p>
            <button className="botao">Iniciar</button>
            <button className="botao">Finalizar</button>
        </main>
    )
}

export default Cronometro