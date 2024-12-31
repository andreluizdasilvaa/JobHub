document.addEventListener("DOMContentLoaded", () => {
    const BlackGround = document.getElementById('overlay_blackground');
    const Modal_Info = document.querySelector('.container_info-job');
    const Btns_vagas = document.querySelectorAll('.show_modal-info');
    const icon_close_modal_info = document.getElementById('close_modal_job-info');
    const body = document.body;
    const SCROLL_BOTTOM_LIMIT = 500; // Limite inferior

    let handleScroll = null; // Variável para armazenar a função de scroll
    let scrollXBeforeModal = 0; // Variável para armazenar a posição horizontal antes de abrir o modal
    let scrollYBeforeModal = 0; // Variável para armazenar a posição vertical antes de abrir o modal

    // Adiciona o evento de clique a cada botão
    Btns_vagas.forEach(element => {
        element.addEventListener('click', () => {
            // Captura as posições antes de abrir o modal
            scrollXBeforeModal = window.scrollX;
            scrollYBeforeModal = window.scrollY;

            // Exibe o modal e o fundo escuro
            BlackGround.style.display = 'block';
            Modal_Info.style.display = 'block';
            body.style.overflowY = 'hidden';

            // Verifica se a largura da tela é 1000px ou menos
            if (window.innerWidth <= 1000) {
                // Mover temporariamente para o topo
                window.scrollTo(0, 0);

                Modal_Info.style.position = 'absolute';
                body.style.overflowY = 'auto';

                // Função para monitorar o scroll
                handleScroll = function () {
                    const currentScroll = window.scrollY;

                    // Se o scroll for maior que o limite inferior
                    if (currentScroll > SCROLL_BOTTOM_LIMIT) {
                        window.scrollTo(0, SCROLL_BOTTOM_LIMIT); // Travar no limite inferior
                    }
                };

                // Adiciona o evento de scroll
                window.addEventListener('scroll', handleScroll);
            }
        });
    });

    // Fecha o modal ao clicar no fundo ou no ícone de fechar
    BlackGround.addEventListener('click', closed_Modal);
    icon_close_modal_info.addEventListener('click', closed_Modal);

    function closed_Modal() {
        // Restaura o scroll no body
        body.style.overflowY = 'auto';
        Modal_Info.style.position = 'fixed';
        
        // Oculta o modal e o fundo escuro
        BlackGround.style.display = 'none';
        Modal_Info.style.display = 'none';

        // Remove o evento de scroll, se existir
        if (handleScroll) {
            window.removeEventListener('scroll', handleScroll);
            handleScroll = null; // Reseta a função
        }

        // Redireciona o usuário para a posição horizontal e vertical que ele estava antes de abrir o modal
        window.scrollTo(scrollXBeforeModal, scrollYBeforeModal);
    }
});

// Revisar