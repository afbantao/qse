# Questionário de Avaliação — Simulação Empresarial 2025/2026

Questionário online de avaliação do docente e da unidade curricular, alojado no GitHub Pages.

## Configuração do Backend (5 minutos)

As respostas são guardadas numa Google Sheet via Google Apps Script. Siga estes passos:

### 1. Criar a folha de cálculo

Aceda a [sheets.google.com](https://sheets.google.com) e crie uma nova folha em branco.

### 2. Adicionar o script

1. Na folha, vá a **Extensões → Apps Script**
2. Apague todo o conteúdo do editor
3. Copie e cole o conteúdo do ficheiro [`google-apps-script.gs`](google-apps-script.gs)
4. Guarde (Ctrl+S)

### 3. Implementar como aplicação web

1. Clique em **Implementar → Nova implementação**
2. Em "Tipo", selecione **Aplicação Web**
3. Configure:
   - **Executar como:** Eu
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em **Implementar**
5. Autorize o acesso quando solicitado
6. **Copie o URL** que aparece (começa por `https://script.google.com/macros/...`)

### 4. Configurar o questionário

1. Abra o ficheiro `index.html`
2. Procure a linha:
   ```js
   var SCRIPT_URL = '';
   ```
3. Cole o URL do passo anterior entre as aspas:
   ```js
   var SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
4. Faça commit e push para o GitHub

### 5. Ativar GitHub Pages

1. No repositório, vá a **Settings → Pages**
2. Em "Source", selecione **Deploy from a branch**
3. Escolha a branch `main` e a pasta `/ (root)`
4. Clique em **Save**
5. O questionário ficará disponível em: **https://afbantao.github.io/qse/**

## Consultar respostas

- **Google Sheet:** Abra a folha de cálculo para ver todas as respostas em tempo real
- **JSON:** Cole o URL do Apps Script no browser para obter todas as respostas em formato JSON
- **Exportar:** Na Google Sheet, use Ficheiro → Transferir → CSV/Excel/PDF

## Estrutura

| Ficheiro | Descrição |
|---|---|
| `index.html` | Questionário completo (HTML + CSS + JS) |
| `google-apps-script.gs` | Código do backend (copiar para o Apps Script) |
| `README.md` | Este ficheiro |
