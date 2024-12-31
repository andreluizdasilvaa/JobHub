document.addEventListener('DOMContentLoaded', () => {
    const Container_btn_v_topo = document.querySelector('.btn-voltar-topo');
    const btnVoltarTopoA = document.getElementById('btn-voltar-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { 
            if (!Container_btn_v_topo.classList.contains('visivel')) {
                Container_btn_v_topo.style.display = 'flex'; 
                setTimeout(() => Container_btn_v_topo.classList.add('visivel'), 10);
            }
        } else {
            if (Container_btn_v_topo.classList.contains('visivel')) {
                Container_btn_v_topo.classList.remove('visivel'); 
                setTimeout(() => Container_btn_v_topo.style.display = 'none', 200); 
            }
        }
    });

    btnVoltarTopoA.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
});
