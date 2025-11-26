document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do DOM
    const paginas = document.querySelectorAll('.pagina-livro');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const btnVoltarIndice = document.getElementById('btnVoltarIndice');
    
    // Elemento do botão secreto (estrela)
    const btnSegredo = document.getElementById('btnSegredo');

    // Estado inicial
    let currentPageIndex = 0; // Começa na Capa (índice 0)
    
    // CONTROLE DE PÁGINAS:
    // Capa (1) + Sumário (1) + 3 Receitas normais (3x3=9) + Receita Secreta (3) + Final (1) = 15 páginas
    const totalPages = 15; 
    
    // Índice da página do sumário (para o botão voltar)
    const indicePageIndex = 1; 

    // Função para atualizar a visualização (quais páginas aparecem)
    function updatePageDisplay() {
        paginas.forEach((page, index) => {
            if (index === currentPageIndex) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Atualiza o texto do indicador (Ex: Página 1 / 15)
        pageIndicator.textContent = `Página ${currentPageIndex + 1} / ${totalPages}`;

        // Lógica dos botões de navegação (desabilita no início e no fim)
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages - 1;
    }

    // Função para pular para uma página específica
    function goToPage(index) {
        if (index >= 0 && index < totalPages) {
            currentPageIndex = index;
            updatePageDisplay();
        }
    }

    // --- EVENT LISTENERS (Ações dos botões) ---

    // Botão Anterior
    prevBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updatePageDisplay();
        }
    });

    // Botão Próxima
    nextBtn.addEventListener('click', () => {
        if (currentPageIndex < totalPages - 1) {
            currentPageIndex++;
            updatePageDisplay();
        }
    });

    // Botão Voltar ao Sumário (na página final)
    if (btnVoltarIndice) {
        btnVoltarIndice.addEventListener('click', () => {
            goToPage(indicePageIndex); 
        });
    }

    // LÓGICA DO BOTÃO SECRETO (Estrela)
    if (btnSegredo) {
        btnSegredo.addEventListener('click', () => {
            // A receita secreta começa após a Feijoada.
            // Estrutura:
            // 0: Capa
            // 1: Sumário
            // 2-4: Lasanha
            // 5-7: Bolo
            // 8-10: Feijoada
            // 11: INÍCIO DA RECEITA SECRETA (Pão de Queijo)
            goToPage(11); 
        });
    }

    // Links clicáveis dentro do Sumário
    const sumarioLinks = document.querySelectorAll('.indice a[data-target-page]');
    sumarioLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que o link recarregue a página
            
            // O atributo data-target-page no HTML usa contagem humana (começa em 1)
            // O array do JavaScript usa contagem de índice (começa em 0)
            // Por isso subtraímos 1.
            const targetPage = parseInt(event.target.dataset.targetPage);
            goToPage(targetPage - 1); 
        });
    });

    // Inicializa a página ao carregar
    updatePageDisplay();
});