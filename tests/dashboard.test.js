const { validarFiltro } = require('../src/script');

describe('Testes Unitários - Lógica de Validação do Dashboard', () => {

    // CASO 1: Campos Vazios
    test('Deve retornar erro se as datas não forem preenchidas', () => {
        // Tenta validar enviando strings vazias
        const resultado = validarFiltro('', '', 'roubo');
        
        expect(resultado.valido).toBe(false);
        expect(resultado.msg).toBe("Por favor, preencha as datas de início e fim.");
    });

    // CASO 2: Tipo de Crime não selecionado
    test('Deve retornar erro se o tipo de crime estiver vazio', () => {
        const resultado = validarFiltro('2023-01-01', '2023-01-31', '');
        
        expect(resultado.valido).toBe(false);
        expect(resultado.msg).toBe("Selecione um tipo de crime.");
    });

    // CASO 3: Data Inicial maior que Final (Lógica Inversa)
    test('Deve bloquear se a data inicial for maior que a final', () => {
        // Início: Fevereiro, Fim: Janeiro (Impossível)
        const resultado = validarFiltro('2023-02-01', '2023-01-01', 'furto');
        
        expect(resultado.valido).toBe(false);
        expect(resultado.msg).toBe("A data inicial não pode ser maior que a final.");
    });

    // CASO 4: Data no Futuro (Regra de Negócio)
    test('Deve bloquear datas futuras', () => {
        // Criamos uma data "falsa" bem no futuro (ano 3000)
        const resultado = validarFiltro('3000-01-01', '3000-02-01', 'homicidio');
        
        expect(resultado.valido).toBe(false);
        expect(resultado.msg).toBe("A data inicial não pode ser no futuro.");
    });

    // CASO 5: Caminho Feliz (Tudo Certo)
    test('Deve validar corretamente quando todos os dados estão ok', () => {
        // Usamos uma data passada segura
        const resultado = validarFiltro('2023-01-01', '2023-01-31', 'fraude');
        
        expect(resultado.valido).toBe(true);
        expect(resultado.msg).toBe("Filtro aplicado com sucesso!");
    });

});