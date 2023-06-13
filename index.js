//tela
const tela = document.getElementById('tela')
const historico = document.getElementById('historico')
const res = document.getElementById('equal-btn')

let contador = 2
let contRes = 0

function insert(num) {
    tela.innerHTML += num
    contador = 0
    contRes = 0
}
//////////////////////////////////////////////////////////
//limpa o historico se clicado duas vezes "DEL"
if (contador < 0 || contador === 2) {
    contador = 0
}
function clean() {
    tela.innerHTML = ''
    contador++
    if (contador > 2) {
        historico.innerHTML = ''
        contador = 0
        contRes = 0
    }
}
//////////////////////////////////////////////////////////
function back() {
    var resultado = document.getElementById('tela').innerHTML;
    document.getElementById('tela').innerHTML = resultado.substring(0, resultado.length - 1)
    contador = 0
    contRes = 0
}
//////////////////////////////////////////////////////////
function calcular() {
    //recebe valores que estao na tela tela
    var resultado = document.getElementById('tela').innerHTML;
    //verifica se ha valores em resultado
    if (resultado) {
        tela.innerHTML = eval(resultado)
        historico.innerHTML += tela.innerHTML + '<br>'
        contRes++
        contador = 0

        if (contRes === 2) {
            tela.innerHTML = ''
            contRes = 0
        }
        console.log(contRes)
    }
}
//////////////////////////////////////////////////////////


