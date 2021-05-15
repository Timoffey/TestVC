import { calcL, calcM, calcS, calcRevenue } from './calc'

const range = document.querySelector('.slider__range');
range.value = 0;
range.addEventListener('input', (e) => {

  const pos = e.target.value
  range.style.background = `linear-gradient(90deg, #FF9796 0%,#FE4D4A ${pos / 500}%,#E2E2E2 0%)`

  const tooltip = document.querySelector('.slider__tooltip');
  const rangeWidth = parseInt(getComputedStyle(e.target).width, 10)
  tooltip.innerText = Number(pos).toLocaleString() + ' ₽'
  const tooltipWidth = parseInt(getComputedStyle(tooltip).width)
  tooltip.style.left = `${(rangeWidth - 25) / 50000 * pos + 33 - tooltipWidth / 2}px` // Корректируем ширину слайдера на ширину пипки

  const root = document.querySelector(":root");
  root.style.setProperty("--slider-tooltip-arr", tooltipWidth / 2 + 5 + 'px');

  tooltip.style.visibility = pos == 0 ? 'hidden' : 'visible'
})


range.addEventListener('change', () => {
  const summ = document.querySelector('.slider__range').value
  const finalScreen = document.querySelector('.final-screen')

  finalScreen.style.display = 'block'
  finalScreen.scrollIntoView({ behavior: 'smooth' })

  document.querySelector('.final-screen__title').innerText = `Вы откладываете ${Number(summ).toLocaleString()} ₽ в месяц.\nЗа три года вы бы заработали:`
  document.querySelector('.invest-types--s').querySelector('.invest-types__summ').innerText = '~' + calcS(summ).toLocaleString() + ' ₽'
  document.querySelector('.invest-types--m').querySelector('.invest-types__summ').innerText = '~' + calcRevenue(summ, 'm').toLocaleString() + ' ₽'
  document.querySelector('.invest-types--l').querySelector('.invest-types__summ').innerText = 'до ~' + calcRevenue(summ, 'l').toLocaleString() + ' ₽'
})
