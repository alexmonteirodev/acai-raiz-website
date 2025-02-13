//scroll suave link interno (ao clicar no link interno da pagina (exemplo: a href="#contato"), o scroll desce suavemente até o ponto desejado):
export default function scrollSuave() {
    const linksInternos = document.querySelectorAll('[data-menu="suave"] a[href^="#"]')
    
    linksInternos.forEach((params) => {
        params.addEventListener('click', scrollToSection)
    })

    function scrollToSection(e) {
        e.preventDefault() //previne movimento padrao do link interno de levar a seção
        const href = e.currentTarget.getAttribute('href') //seleciona atributo do href que foi clicado
        const section = document.querySelector(href) //linkou href com a section

        section.scrollIntoView({ //scrollIntoView = bota esse elemento na minha view/vista
            behavior: 'smooth',
            block: 'start',
        })
    }
}


/*
forma alternativa de fazer:

//const topo = section.offsetTop //observe que cada usa section pq tem uma section do html para cada link interno, ou seja, cada link interno deve ser uma section

//window.scrollTo({
//top: 'topo',
//behavior: 'smooth',
})
*/


//o que eu fiz aqui?
//adicionei o export default (poderia ser só export mas como é só uma função se usou o default) antes da function e tirei a ativação do final - scrollSuave()