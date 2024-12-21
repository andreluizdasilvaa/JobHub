document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cpf").addEventListener("input", function (e) {
    var value = e.target.value;
    var rawValue = value.replace(/\D/g, ""); // Remove tudo que não é número

    // Aplica a máscara de CPF
    var cpfPattern = rawValue
      .replace(/^(\d{3})(\d)/, "$1.$2") // Adiciona ponto após o terceiro dígito
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após o sexto dígito
      .replace(/\.(\d{3})(\d)/, ".$1-$2") // Adiciona traço após o nono dígito
      .replace(/(-\d{2})\d+?$/, "$1"); // Impede a entrada de mais de 11 dígitos

    e.target.value = cpfPattern;
  });
});

// Função para validar o CPF
function isValidCPF(cpf) {
  // Remove máscara
  cpf = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos ou é uma sequência inválida
  if (
      !cpf ||
      cpf.length !== 11 ||
      /^(\d)\1{10}$/.test(cpf)
  ) {
      return false;
  }

  // Calcula os dígitos verificadores
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}