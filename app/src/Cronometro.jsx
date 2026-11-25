import { useEffect, useState } from "react"
import "./Cronometro.css"

function formatarTempo(totalSegundos) {
    const horas = Math.floor(totalSegundos / 3600)
    const minutos = Math.floor((totalSegundos % 3600) / 60)
    const segundos = totalSegundos % 60

    return [horas, minutos, segundos]
        .map(n => String(n).padStart(2, '0'))
        .join(':')
}
function Cronometro() {
    const [segundos, setSegundos] = useState(0)
    const [rodando, setRodando] = useState(false)

    useEffect(() => {
        if (!rodando) return

        const intervalo = setInterval(() => {
            setSegundos(atual => atual + 1)
        }, 1000)

        return () => clearInterval(intervalo)
    }, [rodando])

    return (
        <main className="cronometro">
            <p className="contador">{formatarTempo(segundos)}</p>
            <button onClick={() => setRodando(!rodando)}>
                {rodando ? 'Pausar' : 'Iniciar'}
                </button>

        </main>
    )
}

export default Cronometro