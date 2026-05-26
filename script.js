// Banco de dados dos cenários do simulador
const cenarios = [
    {
        texto: "Sua plantação está sofrendo com o ataque de uma praga comum. O que você faz?",
        opcaoA: "Aplicar defensivos químicos em toda a propriedade de forma preventiva.",
        efeitoA: { prod: 25, amb: -25 }, // Sobe produção, prejudica o ambiente
        opcaoB: "Utilizar drones e manejo biológico para aplicar o produto apenas nas áreas afetadas.",
        efeitoB: { prod: 20, amb: 15 }   // Equilibra ambos positivamente
    },
    {
        texto: "O período de seca começou e o solo precisa de água para o cultivo.",
        opcaoA: "Ligar os pivôs centrais de irrigação em capacidade máxima nos horários mais quentes.",
        efeitoA: { prod: 15, amb: -20 },
        opcaoB: "Instalar sensores de umidade no solo para aplicar água por gotejamento apenas no volume necessário.",
        efeitoB: { prod: 20, amb: 20 }
    },
    {
        texto: "Você quer expandir os lucros da fazenda aumentando a área de pastagem do gado.",
        opcaoA: "Utilizar uma área de mata nativa da sua propriedade para abrir novos pastos.",
        efeitoA: { prod: 25, amb: -35 },
        opcaoB: "Adotar o sistema ILPF (Integração Lavoura-Pecuária-Floresta) reaproveitando áreas já abertas.",
        efeitoB: { prod: 25, amb: 25 }
    },
    {
        texto: "Chegou o momento de preparar o solo para a próxima grande safra de grãos.",
        opcaoA: "Arar a terra profundamente revirando o solo, deixando-o exposto ao vento e à chuva.",
        efeitoA: { prod: 10, amb: -15 },
        opcaoB: "Utilizar o Sistema de Plantio Direto, mantendo a palhada da colheita anterior protegendo a terra.",
        efeitoB: { prod: 20, amb: 20 }
    }
];

let cenarioAtual = 0;
let pontosProducao = 50;
let pontosAmbiente = 50;

// Função para atualizar as barras de progresso na tela
function atualizarBarras() {
    // Garante que os pontos fiquem estritamente entre 0 e 100
    pontosProducao = Math.max(0, Math.min(100, pontosProducao));
    pontosAmbiente = Math.max(0, Math.min(100, pontosAmbiente));

    // Atualiza o preenchimento visual das barras (CSS)
    document.getElementById('barra-producao').style.width = pontosProducao + '%';
    document.getElementById('barra-ambiente').style.width = pontosAmbiente + '%';

    // Atualiza a porcentagem em formato de texto
    document.getElementById('txt-producao').innerText = pontosProducao + '%';
    document.getElementById('txt-ambiente').innerText = pontosAmbiente + '%';
}

// Função para carregar o cenário atual na tela
function carregarCenario() {
    if (cenarioAtual < cenarios.length) {
        document.getElementById('contador').innerText = `Cenário ${cenarioAtual + 1} de ${cenarios.length}`;
        document.getElementById('texto-cenario').innerText = cenarios[cenarioAtual].texto;
        document.getElementById('opt-A').innerText = cenarios[cenarioAtual].opcaoA;
        document.getElementById('opt-B').innerText = cenarios[cenarioAtual].opcaoB;
    } else {
        finalizarJogo();
    }
}

// Função chamada quando o usuário clica em um botão de escolha
function fazerEscolha(opcao) {
    const efeitos = cenarios[cenarioAtual];
    
    if (opcao === 'A') {
        pontosProducao += efeitos.efeitoA.prod;
        pontosAmbiente += efeitos.efeitoA.amb;
    } else {
        pontosProducao += efeitos.efeitoB.prod;
        pontosAmbiente += efeitos.efeitoB.amb;
    }

    atualizarBarras();
    cenarioAtual++;
    carregarCenario();
}

// Função para processar os resultados finais do jogador
function finalizarJogo() {
    document.getElementById('area-jogo').classList.add('oculto');
    const telaFinal = document.getElementById('tela-final');
    telaFinal.classList.remove('oculto');

    let resultado = "";

    if (pontosProducao >= 75 && pontosAmbiente >= 75) {
        resultado = "🏆 **Parabéns! Gestão Excelente!** Você alcançou o equilíbrio perfeito do Agrinho 2026. Sua fazenda é altamente produtiva e uma referência em proteção à natureza.";
    } else if (pontosProducao >= 70 && pontosAmbiente < 50) {
        resultado = "🚜 **Alerta Vermelho Ambiental!** Sua fazenda produz muito bem, mas está esgotando os recursos naturais. No futuro, a falta de água e solo fértil destruirá sua produção.";
    } else if (pontosAmbiente >= 70 && pontosProducao < 50) {
        resultado = "📉 **Aviso de Falência!** A natureza está intacta, mas a produção está muito baixa para alimentar as pessoas e manter o negócio vivo. É preciso tecnologia para produzir de forma eficiente.";
    } else {
        resultado = "⚙️ **Atenção!** Sua fazenda ficou na média. Com um pouco mais de tecnologia sustentável e planejamento, você conseguirá aumentar as duas barras.";
    }

    document.getElementById('resultado-texto').innerHTML = resultado;
}

// Função para resetar as variáveis e recomeçar o simulador
function reiniciarJogo() {
    cenarioAtual = 0;
    pontosProducao = 50;
    pontosAmbiente = 50;
    atualizarBarras();
    document.getElementById('tela-final').classList.add('oculto');
    document.getElementById('area-jogo').classList.remove('oculto');
    carregarCenario();
}

// Inicialização automática do simulador assim que a página carrega
atualizarBarras();
carregarCenario();