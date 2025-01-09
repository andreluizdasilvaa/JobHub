document.addEventListener('DOMContentLoaded', () => {

    const btn_header_info = document.getElementById('modal_header-info');
    const modal_info_container = document.querySelector('.container_modal-config-header');
    const icon_arrow = document.getElementById('icon_header-dow');

    function animationRotate(el) {
        if(el.style.transform == 'rotate(180deg)') {
            el.style.transform = 'none'
        } else {
            el.style.transform = 'rotate(180deg)'
        }
    }

    function mostraEscondeModal(el) {
        if(el.style.display === 'none' || el.style.display === '') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    }

    btn_header_info.addEventListener('click', () => {
        mostraEscondeModal(modal_info_container);
        animationRotate(icon_arrow);
    });
});
