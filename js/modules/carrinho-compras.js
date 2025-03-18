export default function compras(params) {

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

    // function increment() {
    //     let input = document.getElementById('quantity');
    //     if (input.value < input.max) {
    //         input.value = parseInt(input.value) + 1;
    //     }
    // }

    // function decrement() {
    //     let input = document.getElementById('quantity');
    //     if (input.value > input.min) {
    //         input.value = parseInt(input.value) - 1;
    //     }
    // }
    // const incrementBtn = document.querySelectorAll('.incremet-btn')
    // incrementBtn.forEach((btn) => {
    //     btn.addEventListener('click', incrementar)
    //     function incrementar(params) {
    //         increment()
    //     }
    // })

}