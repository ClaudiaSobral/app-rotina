const CHAVE = 'quadrito.eventos'

export function carregarEventos(padrao) {
    try {
        const texto = localStorage.getItem(CHAVE)
        return texto ? JSON.parse(texto) : padrao
    } catch {
        return padrao
    }
}

export function salvarEventos(eventos) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(eventos))
    } catch {
        
    }
}
