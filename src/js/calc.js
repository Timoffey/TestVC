module.exports = {
  calcS(monthly) {
    return Number(monthly) * 12 * 3
  },

  calcRevenue(monthly, type) {
    const monthlyInvestment = monthly
    let money = 0
    let revenueTimes = 0

    const start = new Date()
    start.setDate(1)

    const finish = new Date(start.getFullYear() + 3, start.getMonth(), start.getDate(), 0, 0, 0)
    const delta = Math.ceil((finish.getTime() - start.getTime()) / (1000 * 24 * 60 * 60))

    for (let i = 0; i <= delta; i++) {
      let currDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
      currYearDays = new Date(currDate.getFullYear(), 2, 0).getDate() == 29 ? 366 : 365
      currMonthDays = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate()

      if (currDate.getDate() == currMonthDays) {
        money += +monthlyInvestment
        money = getRevenue(money, type, currMonthDays, currYearDays)
      }

    }
    return money

    function getRevenue(money, type, daysInMonth, daysInYear) {
      let coefficient = 0.0698
      revenueTimes++

      if (type == 'l') {
        revenueTimes >= 36 && (coefficient = 0.7121)
        revenueTimes < 36 && (coefficient = 0.2397)
        revenueTimes < 12 && (coefficient = 0.1525)
        revenueTimes < 6 && (coefficient = 0.1134)
        revenueTimes < 3 && (coefficient = 0.0519)
      }

      const percent = (coefficient / daysInYear * daysInMonth * money).toFixed(2)
      money += +percent
      return money
    }
  }
}