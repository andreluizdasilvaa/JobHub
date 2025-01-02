document.addEventListener('DOMContentLoaded', () => {
    const btn_logout = document.getElementById('btn_logout');

    btn_logout.addEventListener('click', () => {
        fetch('api/logout',{
             method: "DELETE"
        })
        .then((resp) => {
            if(resp.ok) {
                location.reload();
            } else {
                alert('erro')
                console.log(resp);
            }
        })
    })
})