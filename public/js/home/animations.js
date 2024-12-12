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
                    setTimeout(updateCount, 10);
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
})