// ═══════════════════════════════════════════════════════════
//  Google Apps Script — Backend do Questionário
//  Simulação Empresarial 2025/2026
//
//  INSTRUÇÕES DE INSTALAÇÃO:
//  1. Abra https://sheets.google.com e crie uma nova folha
//  2. Vá a Extensões → Apps Script
//  3. Apague o conteúdo e cole este ficheiro inteiro
//  4. Clique em Implementar → Nova implementação
//  5. Tipo: Aplicação Web
//     - Executar como: Eu
//     - Quem tem acesso: Qualquer pessoa
//  6. Clique em Implementar e copie o URL
//  7. Cole o URL na variável SCRIPT_URL no index.html
// ═══════════════════════════════════════════════════════════

// Cabeçalhos da folha (ordem das colunas)
var HEADERS = [
  'timestamp', 'email',
  'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8',
  'q9_dominio_conteudos', 'q9_clareza_comunicacao', 'q9_capacidade_motivar',
  'q9_disponibilidade_duvidas', 'q9_feedback_trabalhos', 'q9_pontualidade_gestao',
  'q9_relacionamento_alunos', 'q9_apoio_relatorios', 'q9_preparacao_simulacao',
  'q10_clareza_objetivos', 'q10_qualidade_materiais', 'q10_relevancia_atividades',
  'q10_adequacao_avaliacao', 'q10_articulacao_teoria_pratica', 'q10_contributo_formacao',
  'q10_adequacao_calendario', 'q10_organizacao_simulacao', 'q10_tempo_decisoes',
  'q11_eficacia_plataforma', 'q11_qualidade_relatorios',
  'q11_adequacao_posicao_competitiva', 'q11_adequacao_capacidade_tecnica',
  'q11_equilibrio_avaliacao'
];

/**
 * Recebe POST com dados do questionário e guarda na folha.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Criar cabeçalhos se a folha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#f3f4f6');
    }

    // Montar linha com os dados na ordem dos cabeçalhos
    var row = HEADERS.map(function (key) {
      return data[key] !== undefined ? data[key] : '';
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET devolve todas as respostas em JSON.
 * Aceda ao URL do script no browser para obter o ficheiro JSON completo.
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var headers = data[0];
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[i][j];
      }
      rows.push(obj);
    }

    return ContentService
      .createTextOutput(JSON.stringify(rows, null, 2))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
