// ==============================================
// FUNCIONALIDADE DE SCROLL PARA O TOPO DA PÁGINA
// ==============================================

// Garante que a página vá para o topo assim que for carregada ou atualizada
window.onload = function () {
    // Encontrar o botão de rolar para o topo
    const scrollButton = document.querySelector('.scroll-to-top');

    // Simula um clique nele para ir ao topo
    if (scrollButton) {
        scrollButton.click();
    }
};

// Configuração inicial para prevenir scroll memorizado
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Função de scroll para o topo (reutilizável)
function scrollToTop(smooth = false) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'instant'
    });
}

// Auto-scroll no carregamento (instantâneo)
window.addEventListener('load', () => {
    scrollToTop(false); // Rápido e sem animação
});

// Botão de voltar ao topo (suave)
document.getElementById('scrollToTop')?.addEventListener('click', () => {
    scrollToTop(true); // Animação suave
});

// ==============================================
// FUNCIONALIDADE DE ACORDEÃO (TOGGLE DE CONTEÚDO)
// ==============================================

// Função para alternar a visibilidade do parágrafo e o símbolo +/-
function toggleVisibility(element) {
    const allItems = document.querySelectorAll('.item-texto-imagem');

    // Fecha todos os parágrafos antes de abrir o que foi clicado
    allItems.forEach(item => {
        const paragraph = item.querySelector('p');
        const icon = item.querySelector('.toggle-icon');
        paragraph.style.display = 'none';  // Esconde o parágrafo
        icon.textContent = '+'; // Define o ícone como "+"
        item.classList.remove('open'); // Remove a classe 'open'
    });

    // Abre o parágrafo associado ao item clicado
    const paragraph = element.querySelector('p');
    const icon = element.querySelector('.toggle-icon');
    if (paragraph.style.display === 'none' || paragraph.style.display === '') {
        paragraph.style.display = 'block'; // Exibe o parágrafo
        icon.textContent = '-'; // Define o ícone como "-"
        element.classList.add('open'); // Adiciona a classe 'open' para mudar o ícone
    } else {
        paragraph.style.display = 'none'; // Esconde o parágrafo
        icon.textContent = '+'; // Define o ícone como "+"
        element.classList.remove('open'); // Remove a classe 'open'
    }
}

// Adiciona o evento de clique em cada item de texto/imagem
const items = document.querySelectorAll('.item-texto-imagem');
items.forEach(item => {
    item.addEventListener('click', function () {
        toggleVisibility(item);
    });
});

// Inicializa os parágrafos fechados e os ícones "+" quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item-texto-imagem');
    items.forEach(item => {
        const paragraph = item.querySelector('p');
        paragraph.style.display = 'none'; // Inicialmente todos os parágrafos estão fechados
        item.querySelector('.toggle-icon').textContent = '+'; // Inicialmente, o ícone será "+"
    });

    // Abre o primeiro item ao carregar a página
    const firstItem = document.querySelector('.item-texto-imagem');
    const firstParagraph = firstItem.querySelector('p');
    const firstIcon = firstItem.querySelector('.toggle-icon');
    firstParagraph.style.display = 'block'; // Exibe o primeiro parágrafo
    firstIcon.textContent = '-'; // Altera o ícone para "-"
    firstItem.classList.add('open'); // Marca o primeiro item como "aberto"
});

// ==============================================
// BARRA DE PROGRESSO DE SCROLL
// ==============================================

// Atualizar a barra de progresso enquanto o usuário rola a página
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / totalHeight) * 100;
    progressBar.style.width = progress + '%';

    // Exibe o botão "Voltar ao topo" quando rolar para baixo
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (scrollPosition > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

// Adiciona evento para rolar a página e atualizar a barra de progresso
window.addEventListener('scroll', updateProgressBar);

// ==============================================
// LIGHTBOX (MODAL DE IMAGEM)
// ==============================================

// Objeto lightbox com métodos para abrir e fechar
const lightbox = {
    overlay: document.querySelector('.lightbox-overlay'),
    image: document.querySelector('.lightbox-image'),

    // Método para abrir o lightbox
    open: (img) => {
        lightbox.image.src = img.src;
        lightbox.overlay.style.display = 'flex';
    },

    // Método para fechar o lightbox
    close: () => {
        lightbox.overlay.style.display = 'none';
    }
};

// Eventos do lightbox
document.querySelector('.lightbox-close').addEventListener('click', lightbox.close);
document.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
    if (e.target === lightbox.overlay) lightbox.close();
});

// Configuração adicional do lightbox quando o DOM é carregado
document.addEventListener('DOMContentLoaded', function () {
    const image = document.querySelector('.coluna-imagem img');
    const lightbox = document.querySelector('.lightbox-overlay');
    const lightboxImg = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');

    // Hover na imagem original
    image.addEventListener('mouseenter', function () {
        document.body.style.cursor = "url('caminho/para/seu-cursor-hover.png'), auto";
    });

    image.addEventListener('mouseleave', function () {
        document.body.style.cursor = "default";
    });

    // Abre o lightbox
    image.addEventListener('click', function () {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
        document.body.style.overflow = 'hidden';
        document.body.style.cursor = "url('caminho/para/seu-cursor-modal.png'), auto";
    });

    // Fecha o lightbox
    closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.cursor = "default";
    });

    // Fecha ao clicar fora
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.cursor = "default";
        }
    });

    // Cursor especial na imagem do lightbox
    lightboxImg.addEventListener('mouseenter', function () {
        this.style.cursor = url('assets/svg/cursor-open.svg'), zoom - out;
    });
});