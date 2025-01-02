document.addEventListener('DOMContentLoaded', () => {

    const btn_header_info = document.getElementById('modal_header-info');
    const modal_info_container = document.querySelector('.container_modal-config-header');

    btn_header_info.addEventListener('click', () => {
        // Verifica o estado atual e alterna entre mostrar e esconder
        if (modal_info_container.style.display === 'none' || modal_info_container.style.display === '') {
            modal_info_container.style.display = 'block'; // Torna o modal visível
        } else {
            modal_info_container.style.display = 'none'; // Torna o modal invisível
        }
    });
});
