let newsList = []
const apiKey = "e1761270d6584b7f8443dae877e60dd9"

const loadNews = async() => {
    let url = `https://newsapi.org/v2/everything?q=MotoGP&page=${page}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json()
    let dataList = result.articles
    
    newsList = newsList.concat(dataList)
    render(newsList)

}

const render = (list) => {
    let newsHtml = list.map(item => `
    <div id="news" class="row">
        <div id="contentsArea" class="col-8">
            <div id="title"><a href="${item.url}" id="a-title">${item.title}</a></div>
            <div id="publishedAt">${publicTime(item.publishedAt)}</div>
            <div id="author">${item.author}</div>
            <div id="description">${item.description}</div>
            <div id="readMore"><a href="${item.articles}">Read More</a></div>
            <div id="source"><a href="${item.url}">${item.source.name}</a></div>
        </div>
        <div id="imgArea" class="col-4" style="text-align: center">
            <img src="${item.urlToImage}" style="width: inherit; height: 250px" alt="">
        </div>
    </div>
`).join("")

    document.getElementById("newsArea").innerHTML = newsHtml
    document.getElementById("number-news").innerHTML = `Numbers of Articles: ${newsList.length}`
}

function publicTime(time) {     
    let newTime = time.toString().split("").splice(0, 10).join("")     
    let newTime1 = newTime.replace("-", "")     
    let newTime2 = newTime1.replace("-", "")     
    console.log(newTime2)     
    return moment(newTime2, "YYYYMMDD").fromNow() 
} 

let page = 1

let loadMorePages = () => {
    page++
    loadNews()
}
loadNews()
