export default function initModal(params) {

    const botaoAbrir = document.querySelector('[data-modal="abrir"]')
    const botaoFechar = document.querySelector('[data-modal="fechar"]')
    const containerModal = document.querySelector('[data-modal="container"]')
    
    //no console se digitar direto ele não aparece porque só ta exportando a function mas se por no console.log aparece: (caso isso esteja fora da função initModal que é a que está sendo exportada)
    
    //console.log(botaoAbrir,botaoFechar,containerModal)
    //-------------------------------------------------------------------------------------------------------

    
    //para funcionar o modal precisamos de:
    
    if (botaoAbrir && botaoFechar && containerModal) { //se essas const existirem, faça isso, senão pula. isso serve pra se algum dia não for detectado essas const por algum motivo, o js não dar erro e travar e assim ele segue o código
    
        // abrir o modal
        // botaoAbrir.addEventListener('click', abrirModal)
        // function abrirModal(event) {
        //     event.preventDefault()
        //     containerModal.classList.add('ativo')
        // }
        const linksComAbrir = document.querySelectorAll('[data-modal="abrir"]')
        linksComAbrir.forEach((params) => {
            params.addEventListener('click', abrirModal)
            function abrirModal(event) {
                event.preventDefault()
                containerModal.classList.add('ativo')
            }
        })
    
        // fechar o modal
            //clique no x
        botaoFechar.addEventListener('click', fecharModal)
        function fecharModal(e) {
            e.preventDefault()
            containerModal.classList.remove('ativo')
        }
    
            //clique fora do modal
        containerModal.addEventListener('click', clickForaModal)
        function clickForaModal(e) {
            if (e.target === this) 
                fecharModal(e) //if de uma linha só não precisa abrir {}
        }
        //aqui acontece que o containerModal é o pai e tem os elementos dentro então ao clicar fora ou dentro do elemento ainda está clicando no elemento pai de tabela e por isso tem que isolar no if pra que feche o modal quando clicque somente no containerModal e não nos filhos.
    
        }
    }
    
    //obs: poderia usar o toggle que add e remove a class para usar apenas duas funções e deixar o codigo menor. Assim, se otmimiza a função porque é menos linha de codigo pro js ler. (ao inves de usar abrirModal e fecharModal, poderia usar toggleModal e mudar o add do classlist para toggle)
    //-------------------------------------------------------------------------------------------------------

    // lógica dos produtos:

    // const imgModal = document.querySelector('.div-modal img')
    // const hModal = document.querySelector('.div-modal h4')
    // const pModal = document.querySelector('.div-modal p')

    // imgModal.src= "/imgs/cafe-de-acai-produto.png"
    // hModal.innerHTML= 'teste'
    // pModal.innerHTML= 'teste'

    fetch('json/produtos.json')
    .then( response=> response.json())
    .then(produtos=> {
        console.log(produtos[0].id) // teste
        const imgModal = document.querySelector('.div-modal img')
        const hModal = document.querySelector('.div-modal h4')
        const pModal = document.querySelector('.div-modal p')
        const linksSaibaMais = document.querySelectorAll('[data-modal="abrir"]')



        linksSaibaMais.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                const produtoSelecionado = produtos.find(produto => produto.id === link.id)

                if (produtoSelecionado) {
                    imgModal.src= produtoSelecionado.imagem
                    hModal.innerHTML= produtoSelecionado.nome
                    pModal.innerHTML= produtoSelecionado.descricao
                }
            })
        })
    })