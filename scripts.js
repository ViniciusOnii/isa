document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Configuração do slider principal
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const counter = document.querySelector('.slide-counter');
    let currentSlide = 0;
    let isTransitioning = false;
    const transitionDelay = 1000;

    // Funções do slider principal
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        counter.textContent = `${index + 1}/${slides.length}`;

        setTimeout(() => {
            isTransitioning = false;
        }, transitionDelay);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Inicialização do slider principal
    if (slides.length > 0) {
        showSlide(currentSlide);
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Navegação com teclado para o slider principal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Autoplay do slider principal
        let autoplayInterval = setInterval(nextSlide, 5000);

        document.querySelector('.slider').addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        document.querySelector('.slider').addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Configuração do modal do portfólio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentModalImage = null;

    // Criar elementos do modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="" alt="Portfolio Image">
            <button class="modal-close">&times;</button>
            <button class="modal-prev">&lt;</button>
            <button class="modal-next">&gt;</button>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');

    // Funções do modal
    function openModal(image) {
        modalImg.src = image.src;
        modal.style.display = 'flex';
        currentModalImage = image;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showNextImage() {
        const currentItem = currentModalImage.closest('.portfolio-item');
        const nextItem = currentItem.nextElementSibling || portfolioItems[0];
        const nextImage = nextItem.querySelector('img');
        openModal(nextImage);
    }

    function showPrevImage() {
        const currentItem = currentModalImage.closest('.portfolio-item');
        const prevItem = currentItem.previousElementSibling || portfolioItems[portfolioItems.length - 1];
        const prevImage = prevItem.querySelector('img');
        openModal(prevImage);
    }

    // Eventos do modal
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        item.addEventListener('click', () => openModal(img));
    });

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevImage);
    modalNext.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Navegação com teclado para o modal
    document.addEventListener('keydown', (e) => {
        if (!modal.style.display || modal.style.display === 'none') return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Verificar ícones sociais
    const socialIcons = document.querySelectorAll('.social-icon img');
    socialIcons.forEach(icon => {
        icon.addEventListener('error', function() {
            console.error('Erro ao carregar imagem:', this.src);
        });
    });

    // Formulário de Contato
    document.getElementById('contatoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        // Por exemplo, usando fetch para enviar para um servidor
        
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            servico: document.getElementById('servico').value,
            mensagem: document.getElementById('mensagem').value
        };
        
        // Por enquanto, apenas mostra uma mensagem de sucesso
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        this.reset();
    });
}); 