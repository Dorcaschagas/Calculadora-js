//tela
const tela = document.getElementById('tela')
const historico = document.getElementById('historico')
const res = document.getElementById('equal-btn')
const previos = document.getElementById('previos')

let contador = 0
let contRes = 0

if (contador < 0 || contador === 2) {
    contador = 0
}

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
    var resultado = document.getElementById('previos').innerHTML;
    document.getElementById('previos').innerHTML = resultado.substring(0, resultado.length - 1)
    var resultado = document.getElementById('tela').innerHTML;
    document.getElementById('tela').innerHTML = resultado.substring(0, resultado.length - 1)
    contador = 0
    contRes = 0
}

function calcular() {
    var resultado = document.getElementById('tela').innerHTML;

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

