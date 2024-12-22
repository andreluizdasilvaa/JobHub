// Função para remover caracteres especiais do CPF
function limparInput(data) {
    return data.replace(/\D/g, ''); // Remove qualquer caractere não numérico
}