document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('.count');
    let started = false;

    function animateCounters() {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // A velocidade da animação

                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }

    window.addEventListener('scroll', () => {
        const section = document.querySelector('.sec_4');
        const sectionTop = section.getBoundingClientRect().top;

        if (!started && sectionTop <= window.innerHeight) {
            started = true;
            animateCounters();
        }
    });

    //Sumir o header após tanto de rolagem
    const header = document.querySelector('.btn_header');

    // Adiciona o evento de rolagem
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Adiciona ou remove a classe 'scrolled' com base na posição do scroll
        if (scrollPosition > 0.8 * viewportHeight) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});