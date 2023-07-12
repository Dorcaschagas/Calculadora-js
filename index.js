const historico = document.getElementById('historico')
const equalBtn = document.getElementById('equal-btn')
const previos = document.getElementById('previos')
const mais = document.getElementById('mais')
const containerBotoes = document.querySelector('.container-botoes')
const histFixo = document.getElementById('historicoFixo')
const conteudoHistfixo = document.getElementById('conteudoHistfixo')
let parents = 0, operadores = 0, numeros = 0, contador = 0
let depoisRaiz = '', antesRaiz = '', result = '', totPreviosTeste = '', resultadoRaiz = '', porcentagemUltimoNum = '', operatorGeral = '', aposRaiz = '', respostaRaiz = '',aposPorcentagem = ''

const num = document.getElementsByClassName('number')
for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', numClick)
}
function numClick(event) {
    const button = event.target;
    const operator = button.dataset.operador;
    const number = button.dataset.number;
    operatorGeral = operator
    if (number) {
        tela.innerHTML += number;
    } else if (operator) {
        tela.innerHTML += operator;
    }
    if (tela.innerHTML === '') {
        if (isNaN(number) && operator !== '-') {
            return;
        }
    } else if (tela.innerHTML.slice(-1).includes(operator)) {
        if (isNaN(number)) {
            return
        }
    }
    //mostra resultado no previos se nao ouver parenteses, raiz ou porcentagem
    if (parents < 1 && !tela.innerHTML.includes('√') && !tela.innerHTML.includes('(')) {
        if (!operator) {
            previos.innerHTML = eval(tela.innerHTML).toFixed(2)
        }
    }
    //numeros e operadores na tela
    let expressao = tela.innerHTML;
    let regexNumeros = /\d+(\.\d+)?/g;
    numeros = expressao.match(regexNumeros);
    let regexOperadores = /[+\-*/]/g;
    operadores = expressao.match(regexOperadores);

    let conteudoAposParentese = ''
    let contadorParenteses = 0;
    for (let i = 0; i < tela.innerHTML.length; i++) {
        if (expressao[i] === '(') {
            contadorParenteses++
            if (contadorParenteses === parents) {
                let j = i + 1;
                while (j < expressao.length) {
                    conteudoAposParentese += expressao[j];
                    j++;
                    contador++
                }
            }
        }
    }
    let conteudoTela = tela.innerHTML
    let recebeTela = false
    document.getElementById('porcentagem').addEventListener('click', () => {
        recebeTela = true
        let tamNum = numeros[numeros.length - 1]
        let ultimoNum = numeros.slice(-1) / 100
        let porcentagemUltimoNum = ''
        let numSemUltimoNum = ''
        let novoConteudo = ''
        //sem parenteses
        if (parents === 0) {

            numSemUltimoNum = tela.innerHTML.slice(0, -`${tamNum.length + 1}`)
            // se tiver apenas um numero na tela sem raiz quadrada
            if (ultimoNum && numSemUltimoNum.length < 1) {
                porcentagemUltimoNum = ultimoNum.toFixed(2)
                tela.innerHTML = novoConteudo = tela.innerHTML.replace(/\d+(\.\d+)?$/, '') + porcentagemUltimoNum  //ok

                //raiz quadrada com porcentagem
                if (novoConteudo.slice(0, 1) === '√') {
                    let resRaizPorcentagem = respostaRaiz / 10
                    previos.innerHTML = resRaizPorcentagem
                }
            }
            //sem (raiz e parenteses) e com mais de um numero na tela
            if (!tela.innerHTML.includes('√') && !tela.innerHTML.includes('(') && numSemUltimoNum.length > 0) {
                let totalSemUltimo = ''
                if (!operator) {
                    totalSemUltimo = eval(numSemUltimoNum)
                }
                let divMulti = ultimoNum
                let SumSub = (totalSemUltimo / 100) * numeros.slice(-1)
                //selecionando os primeiros numeros 
                if (recebeTela === true) {
                    numSemUltimoNum = conteudoTela.slice(0, -`${numeros.slice(-1).length + 1}`)
                }

                //se ultimo operador === + ou -
                if (operadores[operadores.length - 1] === '+' || operadores[operadores.length - 1] === '-') {
                    tela.innerHTML = novoConteudo = tela.innerHTML.replace(/\d+(\.\d+)?$/, '') + SumSub.toFixed(2)
                } else {//se ultimo operador === / ou *
                    tela.innerHTML = novoConteudo = tela.innerHTML.replace(/\d+(\.\d+)?$/, '') + divMulti.toFixed(2)
                }
                previos.innerHTML = eval(novoConteudo).toFixed(2)
            }
        } else {//com parenteses e sem raiz quadrada

            // sem o ulitmo numero dos valores dentro dos parenteses
            numSemUltimoNum = conteudoAposParentese.slice(0, -`${tamNum.length}`)
            //se tiver apenas um numero depois do parenteses
            if (ultimoNum && numSemUltimoNum.length < 1 && !tela.innerHTML.includes('√')) {
                if (!operator) {//ok
                    porcentagemUltimoNum = ultimoNum.toFixed(2)
                    let dentroParentes = tela.innerHTML + ')'.repeat(parents)
                    previos.innerHTML = eval(dentroParentes).toFixed(2)
                }
            } else if (!tela.innerHTML.includes('√')) {// se tiver mais de um numero sem raiz
                if (!operator) {// se for '/' ou '*' 
                    if (operadores[operadores.length - 1] === '*' || operadores[operadores.length - 1] === '/') {
                        porcentagemUltimoNum = ultimoNum
                    } else {//se for + ou -
                        let entreParenteses = eval(numSemUltimoNum.slice(0, -1))
                        porcentagemUltimoNum = ultimoNum * entreParenteses
                    }
                }
            }//tela com raiz, parenteses e porcentagem
            if (tela.innerHTML.slice(0, 1) === '√' && tela.innerHTML.includes('(')) {
                let res1 = ''
                if (recebeTela === true) {
                    res1 = conteudoTela.slice(1, -`${numeros.slice(-1).length + 1}`) + ')'.repeat(parents)
                }
                if (!operator) {
                    let res2 = ''
                    if (numeros.length > 2 && conteudoAposParentese.length >= 3) {
                        res2 = eval(res1) * ultimoNum
                    } else {
                        res2 = numeros.slice(0, 1) * ultimoNum
                    }
                    let res3 = ''
                    let novoConteudo = ''

                    if (operadores[operadores.length - 1] === '*' || operadores[operadores.length - 1] === '/') {//se for * ou /
                        tela.innerHTML = novoConteudo = tela.innerHTML.replace(/\d+(\.\d+)?$/, '') + ultimoNum
                        res3 = novoConteudo.slice(1) + ')'.repeat(parents)
                    } else if (operadores[operadores.length - 1] === '-' || operadores[operadores.length - 1] === '+') {//se for - ou +
                        tela.innerHTML = novoConteudo = tela.innerHTML.replace(/\d+(\.\d+)?$/, '') + res2.toFixed(2)
                        res3 = novoConteudo.slice(1) + ')'.repeat(parents)
                    }
                    let res4 = Math.sqrt(eval(res3)).toFixed(2)
                    previos.innerHTML = res4;
                }
            } else {
                tela.innerHTML = novoConteudo = tela.innerHTML.replace(/\d+(\.\d+)?$/, '') + porcentagemUltimoNum

                //adicionando parenteses automaticamente no final
                let addParentestes = novoConteudo + ')'.repeat(parents)
                if (!operator) {
                    previos.innerHTML = eval(addParentestes).toFixed(2)
                }
            }
        }
    });
    const numAposRaiz = /√(\d+)(.*)/;
    const resultado = numAposRaiz.exec(expressao)
    if (resultado) {
        let valorAposRaiz = resultado[resultado.length - 2];
        aposRaiz = valorAposRaiz
        if (parents > 0) {
            aposRaiz += ')'.repeat(parents)
        }
        //raiz quadrada sem parenteses
        if (!tela.innerHTML.includes('(')) {
            respostaRaiz = Math.sqrt(aposRaiz).toFixed(2)
            previos.innerHTML = respostaRaiz
        }
    }// se tela iniciar com raiz quadrada e tiver parenteses
    if (tela.innerHTML.slice(0, 1) === '√' && tela.innerHTML.includes('(')) {
        let res1 = tela.innerHTML.slice(1) + ')'.repeat(parents)
        if (!operator) {
            let res2 = eval(res1)
            let res3 = Math.sqrt(res2).toFixed(2)
            previos.innerHTML = res3
        }
    }
    //     //    resultado antes + depois da raiz quadrada
    // let resAntesDepoisRaiz = depoisRaiz.replace(/√/g, "") + resultadoRaiz
    // if (parents > 0) {
    //     resAntesDepoisRaiz += ')'.repeat(parents)
    // }
    // // if (resultado) {
    // //     let antesDepoisRz = eval(resAntesDepoisRaiz)
    // //     totPreviosTeste = antesDepoisRz
    // //     previos.innerHTML = antesDepoisRz
    // // }

    // console.log(resAntesDepoisRaiz)
    // //dentro da raiz

    contador = contRes = 0
}
function clean() {
    //limpa a tela e outros
    previos.innerHTML = tela.innerHTML = totPreviosTeste = ''
    contador++
    if (contador >= 2) {
        historico.innerHTML = ''
        contRes = contador = 0
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
    totPreviosTeste = totPreviosTeste.slice(0, 1)
    contador = contRes = 0
}
let valorHist = '', receptor = ''
let contRes = contIr = 0
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
        zero: ' ', primero: '½', segundo: '¼', terceiro: '(', quarto: ')'
    }
    const btnVert = {
        zero: ' ', primero: '√x', segundo: '', terceiro: '¹/×', quarto: 'ƒ', quinto: 'π'
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
                            background: 'grey', width: '50%', height: '100vh', right: '0', top: '0', color: 'black', position: 'absolute', 'z-index': '2'
                        })
                        click > 1 ? click = 0 : null
                        if (click === 0) {
                            conteudoHistfixo.innerHTML = ''
                            Object.assign(histFixo.style, {
                                background: 'none', height: '20vh', right: '0', color: 'black'
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
                        antesRaiz = depoisRaiz = tela.innerHTML += parentesesAb
                        parents++
                    }
                    let penultimoValor = tela.innerHTML[tela.innerHTML.length - 2]
                    let ultimoValor = tela.innerHTML[tela.innerHTML.length - 1]
                    if (penultimoValor !== operatorGeral && penultimoValor !== '(' && penultimoValor !== '√') {//penultimo num diferente de operado, '(' e raiz quadrada && ultimo valor diferente de '('
                        if (ultimoValor === '(') {
                            let conteudo = tela.innerHTML;
                            let arrayConteudo = Array.from(conteudo);
                            arrayConteudo.splice(arrayConteudo.length - 1, 0, '*');
                            tela.innerHTML = arrayConteudo.join('');
                            depoisRaiz = tela.innerHTML
                        }
                    }
                })
            }
            if (i === 0 && j === 4) {
                botao.setAttribute('data-operador', ')')
                const parentesesfe = botao.dataset.operador
                botao.addEventListener('click', () => {
                    if (parents > 0) {
                        antesRaiz = depoisRaiz = tela.innerHTML += parentesesfe
                        parents--
                    } else {
                        return;
                    }
                })
            }
            if (j === 4 && i === 1) {
                botao.addEventListener('click', () => {
                    if (tela.innerHTML === '' || tela.innerHTML[tela.innerHTML.length - 1] === operatorGeral) {//tela vazia || final da tela igual operadores
                        tela.innerHTML += depoisRaiz = antesRaiz = '√'
                    } else if (tela.innerHTML[tela.innerHTML.length - 1] === numeros[numeros.length - 1]) {//final da tela for igual a numeros
                        tela.innerHTML += depoisRaiz = antesRaiz = '*√'
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
