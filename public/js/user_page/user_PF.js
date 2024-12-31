document.addEventListener('DOMContentLoaded', () => {
    var btn_edit_profile = document.querySelectorAll('.editar_perfil-user');

    btn_edit_profile.forEach(element => {
        element.addEventListener('click', () => {
            alert('Apertou!');
        });
    });
});
