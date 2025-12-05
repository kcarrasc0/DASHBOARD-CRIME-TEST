// Exemplo de função que seu projeto deve ter
function validarFiltro(inicio, fim, tipo) {
    if (!inicio || !fim) return { valido: false, msg: "Campos obrigatórios" };
    if (new Date(inicio) > new Date(fim)) return { valido: false, msg: "Data inicial maior que final" };
    if (tipo === "") return { valido: false, msg: "Selecione um tipo" };
    return { valido: true, msg: "OK" };
}

function formatarData(data) {
    // Formata YYYY-MM-DD para DD/MM/YYYY
    if(!data) return "";
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

module.exports = { validarFiltro, formatarData };