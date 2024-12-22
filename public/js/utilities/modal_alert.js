function showModal(imgSrc, text, btnText, time = 5000, link = null) {
    // Seleção de elementos
    const modal_alert = document.getElementById('modal_alert');
    const overlay_blackground = document.getElementById('overlay_blackground');
    const image_modal_alert = document.getElementById('image_modal_alert');
    const text_modal_alert = document.getElementById('text_modal_alert');
    const btn_modal_alert = document.getElementById('btn_modal_alert');
    
    // Atualizar conteúdo do modal
    image_modal_alert.src = `../assets/imgs/modal_alert/${imgSrc}`;
    text_modal_alert.textContent = text;
    btn_modal_alert.textContent = btnText;

    // Exibir modal e overlay
    overlay_blackground.style.display = 'block';
    modal_alert.style.display = 'block';

    const closeModal = () => {
        modal_alert.style.display = 'none';
        overlay_blackground.style.display = 'none';
        if (link) {
            window.location.href = link; // Redirecionar se um link foi fornecido
        }
    };

    // Fechar modal após o tempo especificado
    setTimeout(closeModal, time);

    // Adicionar evento ao botão
    btn_modal_alert.onclick = closeModal;
}