// Função Pura: Apenas lógica, sem mexer no HTML (Perfeita para teste Unitário - Jest)
function validarFiltro(inicio, fim, tipo) {
    if (!inicio || !fim) {
        return { valido: false, msg: "Por favor, preencha as datas de início e fim." };
    }

    if (tipo === "") {
        return { valido: false, msg: "Selecione um tipo de crime." };
    }

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    const dataAtual = new Date();

    if (dataInicio > dataFim) {
        return { valido: false, msg: "A data inicial não pode ser maior que a final." };
    }

    if (dataInicio > dataAtual) {
        return { valido: false, msg: "A data inicial não pode ser no futuro." };
    }

    return { valido: true, msg: "Filtro aplicado com sucesso!" };
}

// Função de Interface: Mexe no HTML (Perfeita para teste Funcional - Selenium)
function processarFiltro() {
    const inicio = document.getElementById('data-inicio').value;
    const fim = document.getElementById('data-fim').value;
    const tipo = document.getElementById('tipo-crime').value;

    const validacao = validarFiltro(inicio, fim, tipo);
    
    const divErro = document.getElementById('msg-erro');
    const divDashboard = document.getElementById('dashboard-resultado');

    if (!validacao.valido) {
        // Mostra erro
        divErro.textContent = validacao.msg;
        divErro.classList.remove('hidden');
        divDashboard.classList.add('hidden');
    } else {
        // Mostra sucesso
        divErro.classList.add('hidden');
        divDashboard.classList.remove('hidden');
        
        // Simula atualização de dados aleatórios
        document.getElementById('res-total').textContent = Math.floor(Math.random() * 500);
    }
}

function exportarRelatorio() {
    alert("Relatório PDF gerado e enviado para download!");
}

// --- Lógica de Exportação para o JEST ---
// O comando abaixo verifica: "Estou rodando no Node.js?"
// Se sim, exporta a função para o teste. Se não (navegador), ignora para não dar erro.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validarFiltro };
}