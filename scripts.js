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
    if (input1 > range && noRepeat) {
        return alert ("O valor da quantidade é maior que o total de números disponíveis. Por favor diminua a quantidade ou aumente o limite máximo do intervalo.")
    }
}