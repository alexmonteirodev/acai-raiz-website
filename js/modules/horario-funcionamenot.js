export default function initFuncionamento(params) {
    const funcionamento = document.querySelector('[data-semana]')
    const diasSemana = funcionamento.dataset.semana.split(',').map(Number)

    const funcionamentoHorario = document.querySelector('[data-horario]')
    const horarioSemaana = funcionamentoHorario.dataset.horario.split(',').map(Number)

    const dataAgora = new Date()
    const diaAgora = dataAgora.getDay()
    const horarioAgora = dataAgora.getHours()

    const semanaAberto = diasSemana.indexOf(diaAgora) !== -1

    const horarioAberto = (horarioAgora >= horarioSemaana[0] && horarioAgora < horarioSemaana[1]) ? true:false
    // console.log(horarioAberto)

    if ( semanaAberto && horarioAberto) {
        funcionamento.classList.add('aberto')
    }
}


