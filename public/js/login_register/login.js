document.addEventListener('DOMContentLoaded', () => {

    var btn_submit = document.getElementById('submit');

    btn_submit.addEventListener('click', async (event) => {
        event.preventDefault();

        var mail = document.getElementById('email').value.trim();
        var senha = document.getElementById('senha').value.trim();

        // Verificação dos campos de entrada
        if (!mail) {
            gerarError('email', "E-mail é Obrigatório");
        } else if (!senha) {
            gerarError('senha', "Senha é Obrigatório");
        } else {
            try {
                // Envia a solicitação de login para o servidor
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mail, senha }),
                });

                // Verifica se a resposta foi bem-sucedida
                if (response.ok) {
                    // Se o login for bem-sucedido, redireciona o usuário
                    window.location.href = '/vagas'; // Redireciona para '/vagas' após o login
                } else {
                    // Se a resposta não for ok, exibe um erro
                    gerarError('email', "Credenciais inválidas.");
                }
            } catch (error) {
                console.error('Erro ao conectar-se ao servidor:', error);
                alert('Erro ao conectar-se ao servidor. Tente novamente mais tarde.');
            }
        }
    });

    // Função para mostrar erros na URL, se houver
    function checkUrlAndAlertFeed() {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        switch (true) {
            case error === '1':
                showModal('error.svg', 'Sessão Invalida, faça login novamente.', 'Continuar', 5000, '/login');
                break;
            default:
                break;
        }
    }

    // Chama a função de verificação de erros da URL
    checkUrlAndAlertFeed();
});
