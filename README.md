# 🕵️‍♂️ Dashboard de Monitoramento de Crimes - Projeto de VV
![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=GREEN&style=for-the-badge)
![Badge Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Badge Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)
![Badge Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> Projeto final da disciplina de **Verificação e Validação de Software**, focado na implementação de testes automatizados (Unitários e E2E) e pipeline de Integração Contínua (CI).

---

## 🖼️ Visão Geral do Projeto

O objetivo deste projeto não foi apenas criar um sistema, mas sim garantir a sua **qualidade e robustez**. A aplicação simula um Dashboard de Segurança Pública onde é possível filtrar ocorrências criminais por data e tipo.

**O foco principal foi a implementação de:**
* 🧪 **Testes Unitários:** Para garantir a lógica de validação de dados.
* 🤖 **Testes Funcionais (E2E):** Para simular a jornada do usuário no navegador.
* ⚙️ **CI/CD:** Automação de testes via GitHub Actions.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Testes Unitários:** Jest.
* **Automação Web:** Selenium WebDriver (ChromeDriver).
* **Ambiente de Execução:** Node.js.
* **CI:** GitHub Actions.

---

## 📂 Estrutura do Projeto

```bash
DASHBOAR-CRIME-TEST/
├── .github/workflows/   # Pipeline de CI (GitHub Actions)
├── src/                 # Código Fonte (Frontend)
│   ├── index.html       # Interface do Dashboard
│   ├── style.css        # Estilos
│   └── script.js        # Lógica (Alvo dos testes unitários)
├── tests/               # Suíte de Testes
│   ├── dashboard.test.js            # Testes Unitários (Jest)
│   └── dashboard.functional.test.js # Testes Funcionais (Selenium)
├── package.json         # Dependências e Scripts
└── README.md            # Documentação
```


## 🚀 Como Executar o Projeto
Siga os passos abaixo para rodar os testes na sua máquina.

1. Pré-requisitos
Certifique-se de ter instalado:

Node.js (v16 ou superior)

Google Chrome (Versão Atualizada)

2. Instalação
Clone o repositório e instale as dependências:

Bash

git clone [https://github.com/SEU-USUARIO/DASHBOAR-CRIME-TEST.git](https://github.com/kcarrasc0/DASHBOARD-CRIME-TEST.git)
cd DASHBOAR-CRIME-TEST
npm install

# 3. Rodando os Testes

## 🧪 Testes Unitários (Jest)
Verificam a lógica de validação de datas e campos obrigatórios.

Bash

npm run test:unit

## 🤖 Testes Funcionais (Selenium)
Abrem o navegador e testam o fluxo de preenchimento e exportação. Nota: Certifique-se de que o projeto está rodando (Live Server) ou ajuste a URL no código de teste.

Bash

npm run test:func

## ✅ Rodar Tudo
Bash

npm test

## 📊 Plano de Testes (Resumo)
Cenários Cobertos no Jest:
Campos de data e tipo vazios (Deve retornar erro).

Data Inicial maior que Data Final (Deve bloquear).

Data Inicial no futuro (Deve bloquear).

Fluxo feliz com dados válidos.

Cenários Cobertos no Selenium:
Fluxo de Filtro: Preencher formulário -> Clicar em Filtrar -> Verificar se resultados aparecem.

Fluxo de Erro: Tentar filtrar vazio -> Verificar mensagem de erro na tela.

Fluxo de Exportação: Gerar relatório -> Verificar e aceitar o alert do navegador.

