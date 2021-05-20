module.exports = {
  getStatistics(url) {

    // fetch(url,{
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     get:'statistics'
    //   })
    // })
    //CORS =( Предположим, получили
    const serverResponse = '[10000,200,1000,150,1500,2000,2500,10000,15000,400,40000,20000,100,2500,5000,4500,5000,5000,10000,8000,6000,25000,35000,2500,1000,7000]';
    const statistics = JSON.parse(serverResponse)

    const avg = Math.floor(statistics.reduce((acc, i) => acc += i / statistics.length, 0))
    const more1k = Math.floor(statistics.filter(i => i > 1000).length / (statistics.length / 100))
    const more10k = Math.floor(statistics.filter(i => i > 10000).length / (statistics.length / 100))
    return { avg, more1k, more10k }
  }
}