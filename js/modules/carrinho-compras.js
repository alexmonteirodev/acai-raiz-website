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
// logica quantidade de produtos e soma total

//         document.querySelectorAll('.produto-compra').forEach(produto => {
//             const input = produto.querySelector('.quantity')
//             const btnIncrement = produto.querySelector('.increment-btn')
//             const btnDecrement = produto.querySelector('.btn-decrement')
//             const preco = produto.querySelector('[data-preco]')
//             const totalValue = document.querySelector('#valor-total')

//             let total = 0

//             btnIncrement.addEventListener('click', () => {   
//                 if (Number(input.value) < Number(input.max)) {
//                     input.value = Number(input.value) + 1;
//                 }
//                 let itemTotal = Number(input.value) * Number(preco.dataset.preco)
//                 totalValue.innerHTML = total += itemTotal 

//             });
//             btnDecrement.addEventListener('click', () => {
//                 if (Number(input.value) > Number(input.min)) {
//                     input.value = Number(input.value) - 1;
//                 }
//             });
//         });

document.querySelectorAll('.produto-compra').forEach(produto => {
    const input = produto.querySelector('.quantity');
    const btnIncrement = produto.querySelector('.increment-btn');
    const btnDecrement = produto.querySelector('.btn-decrement');
    const preco = produto.querySelector('[data-preco]');
    const totalValue = document.querySelector('#valor-total');

    // Inicializa o valor total
    let total = 0;

    btnIncrement.addEventListener('click', () => {
        if (Number(input.value) < Number(input.max)) {
            input.value = Number(input.value) + 1;
        }

        // Calcula o total para esse item
        let itemTotal = Number(input.value) * Number(preco.dataset.preco);

        // Atualiza o total geral
        total = 0;
        document.querySelectorAll('.produto-compra').forEach(produto => {
            const input = produto.querySelector('.quantity');
            const preco = produto.querySelector('[data-preco]');
            total += Number(input.value) * Number(preco.dataset.preco);
        });

        totalValue.innerHTML = `${total.toFixed(2)}`; // Exibe o total com 2 casas decimais
    });

    btnDecrement.addEventListener('click', () => {
        if (Number(input.value) > Number(input.min)) {
            input.value = Number(input.value) - 1;
        }

        // Recalcula o total
        total = 0;
        document.querySelectorAll('.produto-compra').forEach(produto => {
            const input = produto.querySelector('.quantity');
            const preco = produto.querySelector('[data-preco]');
            total += Number(input.value) * Number(preco.dataset.preco);
        });

        totalValue.innerHTML = `${total.toFixed(2)}`; // Exibe o total atualizado
    });
});


// logica botão enviar

    const btnEnviar = document.querySelector('.btn-enviar button')
    const telefone = "79991198907"
    let mensagem = 'teste'

    btnEnviar.addEventListener('click', handleClickEnviar)

    // function handleClickEnviar(params) {
    //     const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    //     window.open(url, "_blank");
    // }
}


