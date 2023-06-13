//tela
const tela = document.getElementById('tela')
const historico = document.getElementById('historico')
// const res = document.getElementById('equal-btn')
const previos = document.getElementById('previos')

let contador = 0
let contRes = 0

function insert(num) {

    tela.innerHTML += num
    previos.innerHTML = '=' + eval(tela.innerHTML)

    if(tela.innerHTML.length > 1){
        historico.innerHTML += tela.innerHTML + '<br>'
    }
    contador = 0
    contRes = 0
}

function clean() {
    previos.innerHTML = ''
    tela.innerHTML = ''

    contador++

    if (contador >= 2) {
        historico.innerHTML = ''
        contador = 0
        contRes = 0
    }
}

function back() {

    tela.innerHTML = tela.innerHTML.slice(0, -1);
    previos.innerHTML = previos.innerHTML.slice(0, -1)

    contador = 0
    contRes = 0
}

function calcular() {
    var resultado = tela.innerHTML

    if (resultado) {
        tela.innerHTML = eval(resultado)  
        historico.innerHTML += '=' + tela.innerHTML + '<br>'
    
        contRes++
        contador = 0

        if (contRes === 2) {
            tela.innerHTML = ''
            previos.innerHTML = ''
            contRes = 0
        }
    }
}

// Adicionar manipuladores de eventos aos botões
equalBtn.addEventListener('click', calcular);
