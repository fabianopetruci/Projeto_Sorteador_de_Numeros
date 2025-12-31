// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const qtd = document.getElementById("number-qtd")
const min = document.getElementById("range-min")
const max = document.getElementById("range-max")
const noRepeat = document.getElementById("no-repeat")

// Quando o usuário clicar em Sortear
form.onsubmit = (event) => {
    event.preventDefault()
    let input1 = Number(qtd.value)
    let input2 = Number (min.value)
    let input3 = Number (max.value)
    let input4 = (noRepeat.checked)

    const range = input3 - input2 + 1
    // Exibe alerta caso o valor do limite mínimo do intervalo seja maior que o limite máximo.
    if (input2 > input3) {
        return alert ("Não é possível sortear. Diminua o valor do limite mínimo do intervalo")
    }

    // Exibe alerta caso o valor da quantidade supere o total de números disponíveis do intervalo
    if (input1 > range && input4) {
        return alert ("O valor da quantidade é maior que o total de números disponíveis. Por favor diminua a quantidade ou aumente o limite máximo do intervalo.")
    }

    let numerosSorteados = []

    do {
        /* Cria uma variável (numeroEscolhido) para receber um número aleatório
    gerado por Math.random (0 a 0.9999...), que é ajustado ao intervalo
    multiplicando pelo range e somando o limite mínimo, e então convertido
    em inteiro com Math.floor */
        const numeroEscolhido = Math.floor(Math.random() * (input3 - input2 + 1)) + input2
        
        if (input4) {
            /*  (noRepeat - on) Se o número sorteado AINDA NÃO (!) estiver na na lista de
               números sorteados, então coloque esse número na lista */
            if (!numerosSorteados.includes(numeroEscolhido)) {
                numerosSorteados.push(numeroEscolhido)
            }

            /* (noRepeat - off) Caso contrário, coloque o número sorteado na lista */
        } else {
            numerosSorteados.push(numeroEscolhido)
        }

    } while (numerosSorteados.length < input1)
}