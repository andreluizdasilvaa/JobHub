document.addEventListener("DOMContentLoaded", () => {
    
  document.getElementById("cnpj").addEventListener("input", function (e) {
    var value = e.target.value;
    var rawValue = value.replace(/\D/g, ""); // Remove tudo que não é número

    // Verifica se o CNPJ tem 15 dígitos e se o primeiro dígito é '0'
    if (rawValue.length === 15 && rawValue.startsWith("0")) {
      var potentialCNPJ = rawValue.substring(1);
      // Atualiza rawValue para o CNPJ sem o '0' inicial
      if (validaCNPJ(potentialCNPJ)) rawValue = potentialCNPJ;
    }

    var cnpjPattern = rawValue
      .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona ponto após o segundo dígito
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após o quinto dígito
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona barra após o oitavo dígito
      .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona traço após o décimo segundo dígito
      .replace(/(-\d{2})\d+?$/, "$1"); // Impede a entrada de mais de 14 dígitos
    e.target.value = cnpjPattern;
  });
});

// Função para validar o CNPJ
function validaCNPJ(cnpj) {
  var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var c = String(cnpj).replace(/[^\d]/g, '');

  if (c.length !== 14) return false;
  if (/0{14}/.test(c)) return false;

  for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
  if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;

  for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
  if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;

  return true;
}
