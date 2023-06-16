const historico = document.getElementById('historico')
const equalBtn = document.getElementById('equal-btn')
const previos = document.getElementById('previos')
const mais = document.getElementById('mais')
const containerBotoes = document.querySelector('.container-botoes')


function insert(value) {
    const tela = document.getElementById('tela');
    tela.innerHTML += value;
}



let contador = 0


const num = document.getElementsByClassName('number')

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', numClick)
}

function numClick(event) {
    const button = event.target
    const operator = button.dataset.operator
    const number = button.dataset.number

    const ultimoValor = tela.innerHTML.slice(-1)

    if (ultimoValor === '/' || ultimoValor === '*' || ultimoValor === '-' || ultimoValor === '+') {
        if (isNaN(number)) {
            // alert('operator')
            return;
        }
    } else if (ultimoValor === '' && (operator === '/' || operator === '*' || operator === '+')) {
        return;
    }

    if (operator) {
        insert(operator)
    }

    if (number) {
        insert(number)
        previos.innerHTML = '=' + eval(tela.innerHTML)
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

let contRes = 0
function calcular() {
    var resultado = tela.innerHTML


    tela.innerHTML = eval(resultado)
    previos.innerHTML = tela.innerHTML
    historico.innerHTML += '=' + resultado + '<br>'
    historico.innerHTML += '=' + eval(resultado)

    contRes++
    contador = 0

    if (contRes === 2) {
        tela.innerHTML = ''
        previos.innerHTML = ''
        contRes = 0
    }

}

let contIr = 0
document.getElementById('mais').addEventListener('click', () => {

        const resultadoTela = document.querySelector('.resultadoTela');
        resultadoTela.style.height = '25vh'

    if (contIr >= 1) {
        mais.innerHTML = 'Mais'

    } else {
        mais.innerHTML = 'voltar'
    }
    contIr++
    contIr > 1 ? contIr = 0 : null

    const botoesHorizontal = 5;
    const botoesVertical = 6;

    const btnhori = ['', 'lg', 'In', '(', ')'];
    const btnVert = ['X¹', 'v¬x', 'X!', '¹/x', 'PI', 'e'];

    for (let i = 0; i < botoesVertical; i++) {
        for (let j = 0; j < botoesHorizontal; j++) {
            const botao = document.createElement('button');
            botao.className = 'novosBotoes';

            if (i === 0) {
                botao.textContent = btnhori[j];
                botao.style.gridRow = 1;
                botao.style.gridColumn = j + 1;
                containerBotoes.style.gridTemplateColumns = `repeat(${botoesHorizontal}, 1fr)`;
            } else {
                botao.textContent = btnVert[i - 1];
                botao.style.gridRow = i + 1;
                botao.style.gridColumn = 1;
                containerBotoes.style.gridTemplateRows = `repeat(${botoesVertical}, 1fr)`;
            }
            containerBotoes.appendChild(botao);


            if (contIr === 0) {
                resultadoTela.style.height = '50vh'
                const botoes = document.getElementsByClassName('novosBotoes');
                while (botoes.length > 0) {
                    botoes[0].parentNode.removeChild(botoes[0]);
                    containerBotoes.style.gridTemplateRows = 'repeat(5, 1fr)'
                    containerBotoes.style.gridTemplateColumns = 'repeat(4, 1fr)'
                }
            }
        }
    }

})