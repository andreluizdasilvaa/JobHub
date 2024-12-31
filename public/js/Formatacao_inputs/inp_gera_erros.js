function gerarError(idElemento, msg) {
    // Selecionar o elemento pelo ID
    const elemento = document.getElementById(idElemento);

    if (!elemento) {
        console.error(`Elemento com ID '${idElemento}' não encontrado.`);
        return;
    }

    animationError(elemento);

    // Encontrar o container pai com a classe 'input_default'
    const container = elemento.closest('.input_default');

    if (!container) {
        console.error(`Container '.input_default' para o elemento com ID '${idElemento}' não encontrado.`);
        return;
    }
    

    // Verificar se já existe um span com a classe 'text_err'
    if (container.querySelector('.text_err')) {
        return; // Não adiciona outro span se já existir
    }

    // Criar o span com a classe 'text_err'
    const novoSpan = document.createElement('span');

    // Se tiver msg de erro personalizada, adiciona
    if (!msg) {
        novoSpan.textContent = 'Erro: Verifique este campo.';
    } else {
        novoSpan.textContent = msg;
    }

    novoSpan.className = 'text_err';

    // Adicionar o span ao container
    container.appendChild(novoSpan);
}

// Gera a animação de erro ( shake )
function animationError(elemento) {
    elemento.classList.add('input_error');

    setTimeout(() => {
        elemento.classList.remove('input_error');
    }, 1000);
}

// Função para remover msg de erro em todos inputs
function removeErrorMessages() {
    // Seleciona todos os .input_default no formulário
    const inputs = document.querySelectorAll('.input_default');

    inputs.forEach(input => {
        // Pega o span com a classe 'text_err' dentro de cada .input_default
        const errorSpan = input.querySelector('.text_err');
        
        // Se existir, remove o span
        if (errorSpan) {
            errorSpan.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o evento de clique nos inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('click', removeErrorMessages);
    });

    document.querySelectorAll('select').forEach(input => {
        input.addEventListener('click', removeErrorMessages);
    });
}) 