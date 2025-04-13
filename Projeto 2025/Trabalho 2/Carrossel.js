const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.carousel-control.prev');
const next = document.querySelector('.carousel-control.next');

let current = 0;
let interval = setInterval(nextSlide, 4000);

function updateCarousel(index) {
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    items[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    current = (current + 1) % items.length;
    updateCarousel(current);
}

function prevSlide() {
    current = (current - 1 + items.length) % items.length;
    updateCarousel(current);
}

next.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

prev.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        current = index;
        updateCarousel(current);
        resetTimer();
    });
});

function resetTimer() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
}

function gerarLink(titulo) {
    return './' + titulo
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[^\w_]/g, '')
        + '.html';
}

async function carregarLivrosDoCSV(caminhoCSV, containerId) {
    try {
        const response = await fetch(caminhoCSV);
        const csvText = await response.text();
        const container = document.getElementById(containerId);

        const resultado = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        resultado.data.forEach(livro => {
            const titulo = livro['Título']?.trim();
            const imagem = livro['Capa']?.trim();

            if (!titulo || !imagem) return;

            const linkPagina = gerarLink(titulo);

            const div = document.createElement('div');
            div.classList.add('book');
            div.innerHTML = `
      <a href="${linkPagina}">
        <img src="${imagem}" alt="${titulo}">
      </a>
      <div class="book-title">${titulo}</div>
    `;
            container.appendChild(div);
        });
    } catch (erro) {
        console.error(`Erro ao carregar ${caminhoCSV}:`, erro);
    }
}
carregarLivrosDoCSV('livrosa.csv', 'livrosAcaoContainer');
carregarLivrosDoCSV('livosb.csv', 'livrosAventuraContainer');
carregarLivrosDoCSV('livosc.csv', 'livrosDistopiaContainer');
carregarLivrosDoCSV('livosd.csv', 'livrosDramaContainer');
carregarLivrosDoCSV('livose.csv', 'livrosFantasiaContainer');
carregarLivrosDoCSV('livosf.csv', 'livrosFiccaoContainer');
carregarLivrosDoCSV('livosg.csv', 'livrosInvestigacaoContainer');
carregarLivrosDoCSV('livosh.csv', 'livrosRomanceContainer');
carregarLivrosDoCSV('livosi.csv', 'livrosSuspenseContainer');

function scrollBooks(containerId, direction) {
    const container = document.getElementById(containerId);
    const scrollAmount = 400 * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}


document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();

    // Pega todos os elementos com classe .book
    const allBooks = document.querySelectorAll('.book');

    allBooks.forEach(book => {
        const titleElement = book.querySelector('.book-title');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';

        if (title.includes(searchValue)) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
});


document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const sections = document.querySelectorAll('.linha');

    sections.forEach(section => {
        const books = section.querySelectorAll('.book');
        let sectionHasMatch = false;

        books.forEach(book => {
            const titleElement = book.querySelector('.book-title');
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';

            if (title.includes(searchValue)) {
                book.style.display = 'block';
                sectionHasMatch = true;
            } else {
                book.style.display = 'none';
            }
        });

        // Mostra ou esconde a seção com base se algum livro corresponde
        section.style.display = sectionHasMatch || searchValue === "" ? 'block' : 'none';
    });
});



