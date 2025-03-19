export default function compras(params) {

// abrir modal de compras 
    const links = document.querySelectorAll('.link-compras')
    const linkBtnNav = document.querySelector('.nav-button')
    const sectionCompras = document.querySelector('.section-compras')

    links.forEach((link) => {
        link.addEventListener('click', saibaMaisHandleClick)
        function saibaMaisHandleClick(e) {
            e.preventDefault()
            sectionCompras.classList.add('ativo')
        }
    })

    linkBtnNav.addEventListener('click', pecaAquiHandleClick)
        function pecaAquiHandleClick(e) {
            e.preventDefault()
            sectionCompras.classList.add('ativo')
        }
    

    sectionCompras.addEventListener('click', clickForaModal)
    function clickForaModal(e) {
        if (e.target === this) 
            sectionCompras.classList.remove('ativo')
    }
// logica quantidade de produtos

        document.querySelectorAll('.produto-compra').forEach(produto => {
            const input = produto.querySelector('.quantity');
            const btnIncrement = produto.querySelector('.increment-btn');
            const btnDecrement = produto.querySelector('.btn-decrement');

            btnIncrement.addEventListener('click', () => {   
                if (Number(input.value) < Number(input.max)) {
                    input.value = Number(input.value) + 1;
                }
                
            });
            btnDecrement.addEventListener('click', () => {
                if (Number(input.value) > Number(input.min)) {
                    input.value = Number(input.value) - 1;
                }
            });
        });

}