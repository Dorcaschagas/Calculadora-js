//tela
const tela = document.getElementById('tela')
const historico = document.getElementById('historico')
const equalBtn = document.getElementById('equal-btn')
const previos = document.getElementById('previos')
const mais = document.getElementById('mais')
const containerBotoes = document.querySelector('.container-botoes')

let contador = 0

function insert(num) {

    const ultimoValor = tela.innerHTML.slice(-1)

    if(ultimoValor === '/' || ultimoValor === '*' || ultimoValor === '-' || ultimoValor === '+'){
        if(isNaN(num)){
            return
        }
    }else if(tela.innerHTML === '' && (num === '/' || num === '*' || num === '+')){
        return
    }

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

let contRes = 0
function calcular() {
    var resultado = tela.innerHTML


    tela.innerHTML = eval(resultado)  
    previos.innerHTML = tela.innerHTML
    historico.innerHTML += '=' + resultado + '<br>'

    contRes++
    contador = 0

    if (contRes > 2) {
        tela.innerHTML = ''
        previos.innerHTML = ''
        contRes = 0
    }

}

const porcentagem = document.getElementById('porcentagem')

function porcent(){
    var resultado = tela.innerHTML
    const resPorCent = (eval(resultado) * tela.innerHTML.slice(-1))  / 100
    tela.innerHTML = resPorCent
}

porcentagem.addEventListener('click', porcent)


let contIr = 0
function ir() {
    
    if(contIr === 2){
        contIr = 0
    }

    contIr++
    mais.innerHTML = 'Mais'

    const resultadoTela = document.querySelector('.resultadoTela');
    resultadoTela.style.height = '25vh'

    mais.style.background = 'white'

    const botoesHorizontal = 5
    const botoesVertical = 6
    
    for (let i = 0; i < botoesHorizontal; i++) {
        const btnhori = ['', 'lg', 'In', '(', ')'];
        const botao = document.createElement('button');
        botao.textContent = btnhori[i];
        botao.className = 'novosBotoes'

        const coluna = i + 1 ; // Calcula a coluna do 
        const linha = Math.floor(i / botoesHorizontal) + 1; // Calcula a linha do botão
    
        containerBotoes.appendChild(botao)
    
        botao.style.gridRow = linha; // Define a posição da linha do botão
        botao.style.gridColumn = coluna; // Define a posição da coluna do botão
        containerBotoes.style.gridTemplateColumns = `repeat(${botoesHorizontal}, 1fr)`; // Define o número de colunas do contêiner

        if(contIr === 1){
            mais.innerHTML = 'Voltar';
        }else if(contIr >= 2){
            const botoes = document.getElementsByClassName('novosBotoes');
            while (botoes.length > 0) {
            botoes[0].parentNode.removeChild(botoes[0]);
            containerBotoes.style.gridTemplateRows = 'repeat(5, 1fr)'
            containerBotoes.style.gridTemplateColumns = 'repeat(4, 1fr)'
            }
        }else{
            mais.innerHTML = 'Mais';
        }
    }
    
    for (let i = 0; i < botoesVertical; i++) {
        const btnVert = ['X¹', 'v¬x', 'X!', '¹/x', 'PI','e'  ]
        const botao = document.createElement('button');
        botao.textContent = btnVert[i];
        botao.className = 'novosBotoes'

      
        const linha = i + 1; // Calcula a linha do botão
        const coluna = Math.floor(i / botoesVertical) + 1; // Calcula a coluna do botão
      
        containerBotoes.appendChild(botao);
      
        botao.style.gridRow = linha; // Define a posição da linha do botão
        botao.style.gridColumn = coluna; // Define a posição da coluna do botão
        containerBotoes.style.gridTemplateRows = `repeat(${botoesVertical}, 1fr)`; // Define o número de linhas do contêiner

        if(contIr === 1){
            mais.innerHTML = 'Voltar';
        }else if(contIr >= 2){
            const botoes = document.getElementsByClassName('novosBotoes');
            while (botoes.length > 0) {
            botoes[0].parentNode.removeChild(botoes[0]);
            containerBotoes.style.gridTemplateRows = 'repeat(5, 1fr)'
            containerBotoes.style.gridTemplateColumns = 'repeat(4, 1fr)'
            }
        }else{
            mais.innerHTML = 'Mais';
        }
    }
    console.log(contIr)
}
console.log(contIr)

mais.addEventListener('click', ir)





