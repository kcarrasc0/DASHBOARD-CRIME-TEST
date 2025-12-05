const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');

// Importa o caminho exato do driver instalado pelo npm
const chromeDriverPath = require('chromedriver').path;

// Aumenta o timeout para 2 minutos (só por garantia)
jest.setTimeout(120000);

describe('Testes Funcionais (E2E) - Dashboard de Crimes', () => {
    let driver;

    beforeAll(async () => {
        // Configurações do Chrome
        let options = new chrome.Options();
        
        // --- OBRIGATÓRIO: MODO HEADLESS (SEM TELA) ---
        // Isso ajuda a evitar travamentos gráficos e problemas de versão
        options.addArguments('--headless=new'); 
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');
        options.addArguments('--ignore-certificate-errors');

        // Configura o Serviço apontando manualmente para o driver baixado
        const service = new ServiceBuilder(chromeDriverPath);

        try {
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeService(service) // Força o uso do driver local
                .setChromeOptions(options)
                .build();
        } catch (error) {
            console.error("ERRO AO ABRIR O CHROME:", error);
            throw error;
        }
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Deve filtrar dados corretamente quando preenchido', async () => {
        // VERIFIQUE SE O SERVER ESTÁ LIGADO
        await driver.get('http://127.0.0.1:5500/src/index.html');

        let inputInicio = await driver.wait(until.elementLocated(By.id('data-inicio')), 20000);
        await inputInicio.sendKeys('01-01-2025');

        await driver.findElement(By.id('data-fim')).sendKeys('01-02-2025');
        await driver.findElement(By.id('tipo-crime')).sendKeys('Roubo');
        await driver.findElement(By.id('btn-filtrar')).click();

        let dashboard = await driver.wait(until.elementLocated(By.id('dashboard-resultado')), 20000);
        let classe = await dashboard.getAttribute('class');
        expect(classe).not.toContain('hidden');
    });

    test('Deve exibir mensagem de erro ao enviar formulário vazio', async () => {
        await driver.get('http://127.0.0.1:5500/src/index.html');

        let btnFiltrar = await driver.wait(until.elementLocated(By.id('btn-filtrar')), 20000);
        await btnFiltrar.click();

        let msgErro = await driver.wait(until.elementLocated(By.id('msg-erro')), 20000);
        let texto = await msgErro.getText();
        expect(texto).toContain('Por favor, preencha');
    });

    test('Deve exibir alerta de sucesso ao clicar em exportar', async () => {
        await driver.get('http://127.0.0.1:5500/src/index.html');
        
        await driver.findElement(By.id('data-inicio')).sendKeys('01-01-2025');
        await driver.findElement(By.id('data-fim')).sendKeys('01-02-2025');
        await driver.findElement(By.id('tipo-crime')).sendKeys('Furto');
        await driver.findElement(By.id('btn-filtrar')).click();

        let btnExportar = await driver.wait(until.elementLocated(By.id('btn-exportar')), 20000);
        await driver.sleep(1000); // Pausa para garantir clique
        await btnExportar.click();

        await driver.wait(until.alertIsPresent(), 10000);
        let alerta = await driver.switchTo().alert();
        let textoAlerta = await alerta.getText();
        expect(textoAlerta).toContain('Relatório PDF gerado');
        await alerta.accept();
    });
});