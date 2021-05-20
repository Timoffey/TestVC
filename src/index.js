import 'rupture'
import './styles/style.styl'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()
import './js/range.js'
import { getStatistics } from './js/get-statistics'

const stats = getStatistics('url')

let showStatistics = false
document.querySelector('.toggle').addEventListener('click', () => {
  showStatistics = !showStatistics
  if (showStatistics) {
    document.querySelector('.toggle__text').innerText = 'Свернуть'
    document.querySelector('.toggle__icon--down').classList.add('toggle__icon--up')
    document.querySelector('.toggle__icon--down').classList.remove('toggle__icon--down')
    document.querySelector('.additional-info__statistics').style.display = 'block'
    setStatistics()
    const $statistics = document.querySelector('.statistics')
    $statistics.scrollIntoView({ behavior: 'smooth' })
  } else {
    document.querySelector('.toggle__text').innerText = 'А как в среднем у читателей vc.ru?'
    document.querySelector('.toggle__icon--up').classList.add('toggle__icon--down')
    document.querySelector('.toggle__icon--up').classList.remove('toggle__icon--up')
    document.querySelector('.additional-info__statistics').style.display = 'none'
    const $finalScreen = document.querySelector('.final-screen')
    $finalScreen.scrollIntoView({ behavior: 'smooth' })
  }
})

document.body.addEventListener('click', () => {
  hidePopups()
})

document.querySelectorAll('.invest-types__more')
  .forEach(button => button.addEventListener('click', (event) => {
    switch (event.target.parentElement.className.split('--')[1]) {
      case 's':
        console.log(event)
        hidePopups()
        document.querySelector('.invest-types--s .popup').style.display = 'block'
        document.querySelector('.invest-types--s').style.zIndex = 10
        document.querySelector('.invest-types--m').style.zIndex = 1
        document.querySelector('.invest-types--l').style.zIndex = 1
        event.stopPropagation()
        break;
      case 'm':
        hidePopups()
        document.querySelector('.invest-types--m .popup').style.display = 'block'
        document.querySelector('.invest-types--s').style.zIndex = 1
        document.querySelector('.invest-types--m').style.zIndex = 10
        document.querySelector('.invest-types--l').style.zIndex = 1
        event.stopPropagation()
        break;
      case 'l':
        hidePopups()
        document.querySelector('.invest-types--l .popup').style.display = 'block'
        document.querySelector('.invest-types--s').style.zIndex = 1
        document.querySelector('.invest-types--m').style.zIndex = 1
        document.querySelector('.invest-types--l').style.zIndex = 10
        event.stopPropagation()
        break;
    }
  }))

function hidePopups() {
  document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none')
}

function setStatistics() {
  const $minimum = document.querySelector('.minimum__progress').querySelector('.progress__status')
  const $minimumValue = document.querySelector('.minimum__value')
  const $maximum = document.querySelector('.maximum__progress').querySelector('.progress__status')
  const $maximumValue = document.querySelector('.maximum__value')

  const setProgress = (circle, value, percent) => {
    const r = parseInt(getComputedStyle(circle).r, 10)
    circle.style.strokeDashoffset = Math.PI * r * 2 / 100 * (100 - percent)
    value.innerText = percent + '%'
  }

  setProgress($minimum, $minimumValue, stats.more1k)
  setProgress($maximum, $maximumValue, stats.more10k)

  const $medianValue = document.querySelector('.median__illustration .illustration__value');
  $medianValue.innerText = `${stats.avg.toLocaleString()} ₽`
}