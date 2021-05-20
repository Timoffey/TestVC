import { calcL, calcM, calcS, calcRevenue } from './calc'

const $range = document.querySelector('.slider__range');
$range.value = 0;
$range.addEventListener('input', (e) => {

  const pos = e.target.value
  $range.style.background = `linear-gradient(90deg, #FF9796 0%,#FE4D4A ${pos / 500}%,#E2E2E2 0%)`

  const $tooltip = document.querySelector('.slider__tooltip');
  const rangeWidth = parseInt(getComputedStyle(e.target).width, 10)
  $tooltip.innerText = Number(pos).toLocaleString() + ' ₽'
  const tooltipWidth = parseInt(getComputedStyle($tooltip).width)
  $tooltip.style.left = `${(rangeWidth - 25) / 50000 * pos + 33 - tooltipWidth / 2}px` // Корректируем ширину слайдера на ширину пипки

  const root = document.querySelector(":root");
  root.style.setProperty("--slider-tooltip-arr", tooltipWidth / 2 + 5 + 'px');

  $tooltip.style.visibility = pos == 0 ? 'hidden' : 'visible'
})


$range.addEventListener('change', () => {
  const summ = document.querySelector('.slider__range').value
  const $finalScreen = document.querySelector('.final-screen')

  $finalScreen.style.display = 'block'
  $finalScreen.scrollIntoView({ behavior: 'smooth' })

  document.querySelector('.final-screen__title').innerText = `Вы откладываете ${Number(summ).toLocaleString()} ₽ в месяц.\nЗа три года вы бы заработали:`

  const savingsS = calcS(summ)
  const savingsM = calcRevenue(summ, 'm')
  const savingsL = calcRevenue(summ, 'l')
  document.querySelector('.invest-types--s').querySelector('.invest-types__summ').innerText = '~' + Math.round(savingsS).toLocaleString() + String.fromCharCode(160) + '₽'
  document.querySelector('.invest-types--m').querySelector('.invest-types__summ').innerText = '~' + Math.round(savingsM).toLocaleString() + String.fromCharCode(160) + '₽'
  document.querySelector('.invest-types--l').querySelector('.invest-types__summ').innerText = 'до' + String.fromCharCode(160) + '~' + Math.round(savingsL).toLocaleString() + String.fromCharCode(160) + '₽'

  /* Тут я не понял что значит "нужно вычислить максимально возможные значения этих трёх категорий", поэтому взял просто их значение при 50к в месяц */
  const maxSavingS = 1800000 / 10
  const maxSavingM = 2007423 / 10
  const maxSavingL = 2699131 / 10
  /*
  Тем не менее в дизайне количество монеток разнится.
  Но суммы не настолько различные, чтобы смысл был в том, чтобы взять количество монеток от наивысшей категории за максимум.
  С другой стороны, пока писал комментарий, подумал, что так хотя бы интересней и логичней.
  Может это косяк дизайна, который сибл меня с толку и неоднозначного описания
  
  const maxSavings = [savingsS, savingsM, savingsL].sort((a, b) => b - a)[0] / 10
  
  Но так получается вообще статика. В итоге у меня либо все столбики одной длины, либо статика. 
  Лучше оставлю все столбики одной длины, хоть динамика какая-то наблюдается.
  */


  addCoins(document.querySelector('.invest-types--s').querySelector('.stack'), Math.ceil(Math.floor(savingsS) / maxSavingS))
  addCoins(document.querySelector('.invest-types--m').querySelector('.stack'), Math.ceil(Math.floor(savingsM) / maxSavingM))
  addCoins(document.querySelector('.invest-types--l').querySelector('.stack'), Math.ceil(Math.floor(savingsL) / maxSavingL))
})

function addCoins(elem, num) {
  elem.innerHTML = ''
  for (let i = 0; i < num; i++) {
    const $coin = document.createElement('div')
    $coin.classList.add('stack__coin')
    elem.insertAdjacentElement('afterbegin', $coin)
  }
}