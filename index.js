const historico = document.getElementById('historico')
const equalBtn = document.getElementById('equal-btn')
const previos = document.getElementById('previos')
const mais = document.getElementById('mais')
const containerBotoes = document.querySelector('.container-botoes')
const histFixo = document.getElementById('historicoFixo')
const conteudoHistfixo = document.getElementById('conteudoHistfixo')
let depoisRaiz = ''
let antesRaiz = ''
let parents = 0
let operadores = 0
let numeros = 0
let contador = 0
let entreParen = false
let entreParenteses = ''
let operadorAntes = ''
let resultadoParenteses = ''
let resultadoAntesRaizParenteses = ''
let totalPrevios = ''
const num = document.getElementsByClassName('number')
for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', numClick)
}
// Function to handle number button clicks
function numClick(event) {
    const button = event.target;
    const operator = button.dataset.operador;
    const number = button.dataset.number;
    const penultimoValor = tela.innerHTML.slice(-1);

    // Check conditions for valid input
    if (penultimoValor === '/' || penultimoValor === '*' || penultimoValor === '-' || penultimoValor === '+') {
        if (isNaN(number)) {
            return;
        }
    } else if (penultimoValor === '' && (operator === '/' || operator === '*' || operator === '+')) {
        return;
    } else if (penultimoValor === '(' && (operator === '/' || operator === '*' || operator === '+')) {
        return;
    }

    // Append number or operator to 'tela' innerHTML
    if (number) {
        tela.innerHTML += number;
        antesRaiz = tela.innerHTML;
    } else if (operator) {
        tela.innerHTML += operator;
        antesRaiz = tela.innerHTML;
    }

    let expressao = tela.innerHTML;
    let regexNumeros = /\d+(\.\d+)?/g;
    numeros = expressao.match(regexNumeros);
    let regexOperadores = /[+\-*/]/g;
    operadores = expressao.match(regexOperadores);
    // Percentage button click event
    document.getElementById('porcentagem').addEventListener('click', () => {
        let penultimo = 0;
        // Retrieve the penultimate number from 'numeros' array
        if (numeros.length >= 2) {
            penultimo = numeros[numeros.length - 2];
        }
        console.log(penultimo)
        let numeroFim = parseFloat(numeros.slice(-1)[0]);
        penultimo = parseFloat(penultimo);
        let porcentagem = (numeroFim) / 100;
        let porcentagemFormatada = porcentagem.toFixed(2);
        let mult = porcentagemFormatada * penultimo
        let sum = penultimo + mult
        let sub = penultimo - mult
        let div = (penultimo / numeroFim) * 100
        let TelaConteudo = tela.innerHTML;
        let novoConteudo = TelaConteudo.replace(/\d+(\.\d+)?$/, '') + porcentagemFormatada;
        tela.innerHTML = novoConteudo;
        if (operadores[operadores.length - 1] === '+') {
            previos.innerHTML = sum
            totalPrevios = sum
        } else if (operadores[operadores.length - 1] === '-') {
            previos.innerHTML = sub
            totalPrevios = sub
        } else if (operadores[operadores.length - 1] === '/') {
            previos.innerHTML = div
            totalPrevios = div
        } else {
            previos.innerHTML = mult
            totalPrevios = mult
        }
    });

    // Square root calculations
    const numAposRaiz = /√(\d+)(.*)/;
    const resultado = numAposRaiz.exec(expressao);
    let raizQuadrada = '';
    // Check if the expression matches the square root pattern
    if (resultado) {
        let valorAposRaiz = resultado[resultado.length - 2];
        operadoresAposRaiz = ''

        // if(operadoresAposRaiz = resultado[2] === '('){
        //     operadoresAposRaiz = resultado[0, -1];
        //      console.log(operadoresAposRaiz)
        // } else {
        //     operadoresAposRaiz = resultado[2];
        // }
        let aposRaiz = valorAposRaiz + operadoresAposRaiz;
        console.log(operadoresAposRaiz)
        let somandoRaiz = ''
        if (tela.innerHTML[tela.innerHTML.length - 1] === '/' || tela.innerHTML[tela.innerHTML.length - 1] === '*' || tela.innerHTML[tela.innerHTML.length - 1] === '-' || tela.innerHTML[tela.innerHTML.length - 1] === '+' || tela.innerHTML[tela.innerHTML.length - 1] === '(') {
            return
        } else {
            somandoRaiz += eval(aposRaiz);
            let resultadoRaiz = Math.sqrt(somandoRaiz);
            raizQuadrada = resultadoRaiz.toFixed(2);
            totalPrevios = raizQuadrada
            previos.innerHTML = totalPrevios

        }
    }
    if(totalPrevios){
        totalPrevios = `${resultadoAntesRaizParenteses}` + `${operadorAntes}` + `${resultadoParenteses}` + `${operadorAntes}` + `${raizQuadrada}`
        previos.innerHTML = eval(totalPrevios)
    }


    //operaçoes dentro dos parenteeses
    if(entreParen === true){
        entreParenteses += tela.innerHTML[tela.innerHTML.length -1]
        if(entreParenteses[entreParenteses.length -1] === '/' || entreParenteses[entreParenteses.length -1] === '*' || entreParenteses[entreParenteses.length -1] === '-' || entreParenteses[entreParenteses.length -1] === '+'){
            return
        }else {
            resultadoParenteses = eval(entreParenteses)
            totalPrevios = resultadoParenteses
        }
    }



    if(totalPrevios){
        totalPrevios = `${resultadoAntesRaizParenteses}` + `${operadorAntes}` + `${resultadoParenteses}` + `${operadorAntes}` + `${raizQuadrada}`
        previos.innerHTML = eval(totalPrevios)
    }



    if(entreParen !== true){
        antesRaiz = tela.innerHTML
    } else {
        return
    }
    let resdepoisRaiz = depoisRaiz.replace(/√/g, "") + raizQuadrada
    if (resultado) {
        totalPrevios = eval(resdepoisRaiz)
    } else if (antesRaiz[antesRaiz.length - 1] === '*' || antesRaiz[antesRaiz.length - 1] === '/' || antesRaiz[antesRaiz.length - 1] === '-' || antesRaiz[antesRaiz.length - 1] === '+') {
        return
    } else {
        resultadoAntesRaizParenteses = eval(antesRaiz)
        totalPrevios = resultadoAntesRaizParenteses
    }
    


    if(totalPrevios){
        totalPrevios = `${resultadoAntesRaizParenteses}` + `${operadorAntes}` + `${resultadoParenteses}` + `${operadorAntes}` + `${raizQuadrada}`
        previos.innerHTML = eval(totalPrevios)
    }





    contador = 0 
    contRes = 0
}

function clean() {
    previos.innerHTML = ''
    tela.innerHTML = ''
    entreParenteses = ''
    totalPrevios = ''
    contador++
    if (contador >= 2) {
        historico.innerHTML = ''
        contador = 0
        contRes = 0
    }
}
let abrindo = 0
function back() {
    abrindo = -1 + parents
    if (tela.innerHTML.slice(-1) === '(') {
        parents--
    }
    if (tela.innerHTML.slice(-1) === ')') {
        parents++
    }
    tela.innerHTML = tela.innerHTML.slice(0, -1);
    previos.innerHTML = previos.innerHTML.slice(0, -1)
    entreParenteses = entreParenteses.slice(0, -1)
    // totalPrevios = totalPrevios.slice(0, -1)
    contador = 0
    contRes = 0
}
let valorHist = ''
let contRes = 0
let receptor = ''

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
    const btnHori = {
        zero: ' ',
        primero: '½',
        segundo: '¼',
        terceiro: '(',
        quarto: ')'
    }
    const btnVert = {
        zero: ' ',
        primero: '√x',
        segundo: '',
        terceiro: '¹/×',
        quarto: 'ƒ',
        quinto: 'π'
    }
    for (let i = 0; i < botoesVertical; i++) {
        for (let j = 0; j < botoesHorizontal; j++) {
            const botao = document.createElement('button');
            botao.className = 'novosBotoes';
            if (i === 0) {
                const key = Object.keys(btnHori)[j];
                const botaoValue = btnHori[key]
                botao.textContent = botaoValue;
                botao.style.gridRow = 1;
                botao.style.gridColumn = j + 1;
                containerBotoes.style.gridTemplateColumns = `repeat(${botoesHorizontal}, 1fr)`;

                //botao mais opcoes
                if (i === 0 && j === 0) {
                    let click = 0
                    botao.addEventListener('click', botao00click)
                    const icone = document.createElement('i')
                    icone.className = 'fas fa-clock'
                    botao.appendChild(icone)
                    function botao00click() {

                        conteudoHistfixo.innerHTML = valorHist
                        click++
                        Object.assign(histFixo.style, {
                            background: 'grey',
                            width: '50%',
                            height: '100vh',
                            right: '0',
                            top: '0',
                            color: 'black',
                            position: 'absolute',
                            'z-index': '2'
                        })
                        click > 1 ? click = 0 : null
                        if (click === 0) {
                            conteudoHistfixo.innerHTML = ''
                            Object.assign(histFixo.style, {
                                background: 'none',
                                height: '20vh',
                                right: '0',
                                color: 'black'

                            })
                        }
                    }
                }
            } else {
                const key = Object.keys(btnVert)[i];
                const botaoValue = btnVert[key]
                botao.textContent = botaoValue;
                botao.style.gridRow = i + 1;
                botao.style.gridColumn = 1;
                containerBotoes.style.gridTemplateRows = `repeat(${botoesVertical}, 1fr)`;
            }
            containerBotoes.appendChild(botao);
            if (contIr === 0) {
                historico.style.height = '35vh'
                resultadoTela.style.height = '100vh'
                const botoes = document.getElementsByClassName('novosBotoes');
                while (botoes.length > 0) {
                    botoes[0].parentNode.removeChild(botoes[0]);
                    containerBotoes.style.gridTemplateRows = 'repeat(5, 1fr)'
                    containerBotoes.style.gridTemplateColumns = 'repeat(4, 1fr)'
                }
            } else {
                resultadoTela.style.height = '100vh'
                historico.style.height = '25vh'
            }
            //add funcoes as teclas criadas quando a tecla mais e clicada
            if (i === 0 && j === 1) {
                botao.addEventListener('click', () => {
                    // tela.innerHTML += 'botao01'
                })
            } else if (i === 0 && j === 2) {
                botao.addEventListener('click', () => {
                    // tela.innerHTML += 'botao02'
                })
            } else if (i === 0 && j === 3) {
                botao.setAttribute('data-operador', '(')
                const parentesesAb = botao.dataset.operador
                botao.addEventListener('click', () => {
                    if (tela.innerHTML !== '') {
                        tela.innerHTML += parentesesAb
                        // antesRaiz = tela.innerHTML
                        depoisRaiz = tela.innerHTML
                        parents++
                    }
                    entreParen = true
                    let penultimoValor = tela.innerHTML[tela.innerHTML.length - 2]
                    let ultimoValor = tela.innerHTML[tela.innerHTML.length - 1]
                    if (penultimoValor !== '/' && penultimoValor !== '*' && penultimoValor !== '-' && penultimoValor !== '+' && penultimoValor !== '(' && penultimoValor !== '√') {
                        if (ultimoValor === '(') {
                            let conteudo = tela.innerHTML;
                            let arrayConteudo = Array.from(conteudo);
                            arrayConteudo.splice(arrayConteudo.length - 1, 0, '*');
                            tela.innerHTML = arrayConteudo.join('');
                            depoisRaiz = tela.innerHTML
                            //pegando operador antes do parenteses
                            operadorAntes += tela.innerHTML[tela.innerHTML.length-2]
                            totalPrevios += operadorAntes
                            console.log('oper', operadorAntes)
                            if(tela.innerHTML[tela.innerHTML.length-1] === '('){
                                return
                            } else {
                                entreParenteses = tela.innerHTML[tela.innerHTML.length-1]
                            }
                        }
                    } else {
                        //pegando operador antes do parenteses
                        operadorAntes += penultimoValor
                        totalPrevios += operadorAntes
                        console.log('oper', operadorAntes)

                    }
                })
            }
            if (i === 0 && j === 4) {
                botao.setAttribute('data-operador', ')')
                const parentesesfe = botao.dataset.operador
                botao.addEventListener('click', () => {
                    if (parents > 0) {
                        tela.innerHTML += parentesesfe
                        // antesRaiz = tela.innerHTML
                        depoisRaiz = tela.innerHTML
                        // console.log(eval(antesRaiz))
                        parents--
                    } else {
                        return;
                    }
                })
            }
            if (j === 4 && i === 1) {
                botao.addEventListener('click', () => {
                    
                    if (tela.innerHTML === '') {
                        tela.innerHTML += '√'
                        depoisRaiz = tela.innerHTML
                        antesRaiz = tela.innerHTML
                    } else if (tela.innerHTML[tela.innerHTML.length - 1] === numeros[numeros.length - 1]) {
                        tela.innerHTML += '*√'
                        depoisRaiz = tela.innerHTML
                        antesRaiz = tela.innerHTML
                        operadorAntes += tela.innerHTML[tela.innerHTML.length-2]
                        totalPrevios += operadorAntes
                        console.log('oper', operadorAntes)
                    } else {
                        if (tela.innerHTML[tela.innerHTML.length - 1] === operadores[operadores.length - 1]) {
                            tela.innerHTML += '√'
                            depoisRaiz = tela.innerHTML
                            antesRaiz = tela.innerHTML
                            operadorAntes += tela.innerHTML[tela.innerHTML.length-2]
                            totalPrevios += operadorAntes
                            console.log('oper', operadorAntes)
                        }
                    }
                })

            } else if (j === 4 && i === 2) {
                botao.setAttribute('data-operador', '')
                const botao02 = botao.dataset.operador
                botao.innerHTML = 'x <sup >y</sup>'
                botao.addEventListener('click', () => {
                    // tela.innerHTML += botao02
                })
            } else if (j === 4 && i === 3) {
                botao.addEventListener('click', () => {
                    // tela.innerHTML += 'botao03'
                })
            } else if (j === 4 && i === 4) {
                botao.addEventListener('click', () => {
                    // tela.innerHTML += 'ƒ'
                })
            } else if (j === 4 && i === 5) {
                botao.addEventListener('click', () => {
                    // tela.innerHTML += 'botao05'
                })
            }

        }
    }
})
function calcular() {
    // colocar  'totalPrevios =' nos previos


    contRes++
    if (typeof parents === 'number' && parents > 0) {
        let fechandoParentheses = '';
        for (let i = 0; i < parents; i++) {
            fechandoParentheses = ')';
        }
        tela.innerHTML += fechandoParentheses;
    }
    var resultado = ''
    if (tela.innerHTML !== '') {
        resultado = tela.innerHTML
        tela.innerHTML = eval(resultado)
    }
    previos.innerHTML = tela.innerHTML
    totalPrevios = tela.innerHTML
    if (previos.innerHTML != '') {
        receptor = '= ' + previos.innerHTML
    }
    historico.innerHTML += resultado + '<br>' + receptor + '<br>'
    if (historico.innerHTML !== '') {
        valorHist = historico.innerHTML
    } else {
        valorHist = null
    }
    if (tela.innerHTML === '') {
        historico.innerHTML = ''
    }
    localStorage.getItem(valorHist, historico) || null;

    contador = 0
    if (contRes === 2) {
        tela.innerHTML = ''
        previos.innerHTML = ''
        contRes = 0
    }
}
