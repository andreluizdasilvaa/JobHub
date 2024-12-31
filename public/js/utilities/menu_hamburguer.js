document.addEventListener("DOMContentLoaded", () => {
    const btn_burguer = document.getElementById("menu_burguer_conteiner");
    const overlay_burguer_on = document.querySelector(".conteiner_burguer_on");
    const close_icon_mn_burguer = document.getElementById("close_icon_mn_burguer");

    // Mostra o menu hamburguer ao clicar no botão
    btn_burguer.addEventListener("click", () => {
        overlay_burguer_on.style.display = "block";
        document.body.style.overflowY = "hidden"
    });

    // Fecha o menu hamburguer ao clicar no ícone de fechar
    close_icon_mn_burguer.addEventListener("click", () => {
        overlay_burguer_on.style.display = "none";
        document.body.style.overflowY = "auto";
    });

    // Monitora alterações no tamanho da janela
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 800) {
            // Garante que o menu seja ocultado em telas grandes
            overlay_burguer_on.style.display = "none";
            document.body.style.overflowY = "auto";
        }
    });
});