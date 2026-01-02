// Seleciona o formulário principal
// É nele que o usuário clica em "Sortear"
const form = document.querySelector("form")

// Inputs do formulário
// quantidade de números, mínimo, máximo e opção de não repetir
const qtd = document.getElementById("number-qtd")
const min = document.getElementById("range-min")
const max = document.getElementById("range-max")
const noRepeat = document.getElementById("no-repeat")

// Áreas da interface
// formArea será escondido após o sorteio
// resultsArea será exibido com os resultados
const formArea = document.getElementById("form-area")
const resultsArea = document.getElementById("results-area")
const resultsGrid = document.getElementById("results-grid")

// Elemento que mostra o contador do sorteio
// Exemplo: "1º RESULTADO", "2º RESULTADO", etc.
const resultCount = document.getElementById("result-count")

// Botão que permite refazer o sorteio
// Fica escondido no início e aparece após a revelação
const btnAgain = document.getElementById("btn-again")

// Controla quantas vezes o sorteio foi realizado
// Fica fora das funções para não zerar a cada execução
let contadorSorteios = 0

// Função auxiliar que cria uma pausa artificial no código
// Retorna uma Promise que é resolvida após X milissegundos
// Usada com await para criar a revelação sequencial
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Função para resetar a tela inicial
function resetarTela() {
    // volta para o formulário
    resultsArea.style.display = "none"
    formArea.style.display = "block"

    // limpa o grid e esconde botão sortear novamente
    resultsGrid.innerHTML = ""
    btnAgain.style.display = "none"
}

// Função responsável por mostrar resultados + animação
async function mostrarResultados(numerosSorteados) {
    // === FASE 0: PREPARAÇÃO DA INTERFACE ===
    //Mostra o número do sorteio
    contadorSorteios += 1
    resultCount.textContent = `${contadorSorteios}º`

    // Oculta o formulário
    formArea.style.display = "none"

    // Mostra a área de resultados
    resultsArea.style.display = "block"

    // Limpa resultados anteriores
    resultsGrid.innerHTML = ""

    // Exibe botão sortear novamente
    btnAgain.style.display = "none"

    // === FASE 1: CRIAÇÃO DOS SLOTS ===
    // Array que guarda os slots criados na tela
    const slots = []

    // Para cada número sorteado, cria um slot animado
    for (let i = 0; i < numerosSorteados.length; i++) {

        // Slot principal (quadrado)
        const resultSlot = document.createElement("div")
        resultSlot.classList.add("result-slot")

        // Camada da animação (roleta)
        const slotReel = document.createElement("div")
        slotReel.classList.add("slot-reel")
        resultSlot.appendChild(slotReel)

        // Trilho da animação
        const slotTrack = document.createElement("div")
        slotTrack.classList.add("slot-track")
        slotReel.appendChild(slotTrack)

        // Quadradinhos que se movimentam
        // (podem ser vários)
        for (let j = 0; j < 6; j++) {
            const slotDot = document.createElement("div")
            slotDot.classList.add("slot-dot")
            slotTrack.appendChild(slotDot)
        }

        // Camada onde o número final será exibido
        const slotNumber = document.createElement("div")
        slotNumber.classList.add("slot-number")
        resultSlot.appendChild(slotNumber)

        // Adiciona o slot ao grid
        resultsGrid.appendChild(resultSlot)

        // Guarda o slot no array para controlar depois
        slots.push(resultSlot)
    }

    // === FASE 2: REVELAÇÃO SEQUENCIAL ===
    for (let i = 0; i < slots.length; i++) {
    await sleep(1000)
    slots[i].classList.add("is-done")
    slots[i].querySelector(".slot-number").textContent = numerosSorteados[i]
  }
    // === FASE 3: FINALIZAÇÃO ===
    btnAgain.style.display = "flex"
}

// Executa quando o usuário clicar em Sortear
form.onsubmit = async (event) => {
    // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault()

    // Converte os valores dos inputs para número
    const inputQtd = Number(qtd.value)
    const inputMin = Number (min.value)
    const inputMax = Number (max.value)
    const naoRepetir = (noRepeat.checked)

    // Calcula quantos números existem no intervalo
    const range = inputMax - inputMin + 1

    // Exibe alerta caso o valor do limite mínimo do intervalo seja maior que o limite máximo.
    if (inputMin > inputMax) {
        return alert ("Não é possível sortear. Diminua o valor do limite mínimo do intervalo")
    }

    // Exibe alerta caso o valor da quantidade supere o total de números disponíveis do intervalo
    if (naoRepetir && inputQtd > range) {
        return alert ("O valor da quantidade é maior que o total de números disponíveis. Por favor diminua a quantidade ou aumente o limite máximo do intervalo.")
    }

    // Array que armazenará os números sorteados
    const numerosSorteados = []

    // Loop de sorteio
    // Continua até atingir a quantidade desejada
    do {
        /* Cria uma variável (numeroEscolhido) para receber um número aleatório
    gerado por Math.random (0 a 0.9999...), que é ajustado ao intervalo
    multiplicando pelo range e somando o limite mínimo, e então convertido
    em inteiro com Math.floor */
        const numeroEscolhido = Math.floor(Math.random() * range) + inputMin
        
        if (naoRepetir) {
            /*  (noRepeat - on) Se o número sorteado AINDA NÃO (!) estiver na na lista de
               números sorteados, então coloque esse número na lista */
            if (!numerosSorteados.includes(numeroEscolhido)) {
                numerosSorteados.push(numeroEscolhido)
            }

            /* (noRepeat - off) Caso contrário, coloque o número sorteado na lista */
        } else {
            numerosSorteados.push(numeroEscolhido)
        }

    } while (numerosSorteados.length < inputQtd)
    
    // Chama a função que cuida da exibição e animação
    await mostrarResultados(numerosSorteados)
}

// Ao clicar no botão sortear novamente executa a função resetarTela
btnAgain.addEventListener("click", () => {
  resetarTela()
})
