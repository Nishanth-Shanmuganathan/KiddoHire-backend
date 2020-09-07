var unirest = require("unirest");
var fs = require("fs");
var path = require("path");

exports.dashboardBuilder = async (req, res, next) => {
  const user = "employee"
  try {
    const data1 = require(path.join(__dirname, '..', '..', 'public', 'data/hiring-trends.json'))
    const firstLabelData1 = '2020'
    const secondLabelData1 = '2019'
    const firstValueData1 = data1.map(ele => ele[firstLabelData1])
    const secondValueData1 = data1.map(ele => ele[secondLabelData1])
    const chartLabel1 = data1.map(ele => ele.Week)
    const result1 = []
    result1.push({ data: firstValueData1, label: firstLabelData1 })
    result1.push({ data: secondValueData1, label: secondLabelData1 })
    result1.push('Global hiring graph')
    result1.push(chartLabel1)


    let result2 = []

    if (user === "employee") {
      data2 = require(path.join(__dirname, '..', '..', 'public', 'data/fortune-companies.json'))
      const firstLabelData2 = 'Google'
      const secondLabelData2 = 'Microsoft'
      const thirdLabelData2 = 'Apple'
      const fourthLabelData2 = 'Walmart'
      const firstValueData2 = data2.map(ele => ele[firstLabelData2]);
      const secondValueData2 = data2.map(ele => ele[secondLabelData2]);
      const thirdValueData2 = data2.map(ele => ele[thirdLabelData2]);
      const fourthValueData2 = data2.map(ele => ele[fourthLabelData2]);
      const chartLabel2 = data2.map(ele => ele.Week);
      result2.push({ data: firstValueData2, label: firstLabelData2 })
      result2.push({ data: secondValueData2, label: secondLabelData2 })
      result2.push({ data: thirdValueData2, label: thirdLabelData2 })
      result2.push({ data: fourthValueData2, label: fourthLabelData2 })
      result2.push('Intake graph of tech giants')
      result2.push(chartLabel2)
    } else {
      const data2 = require(path.join(__dirname, '..', '..', 'public', 'data/hiring-mode.json'))
      const firstLabelData2 = 'Online'
      const secondLabelData2 = 'Direct'
      const firstValueData2 = data2.map(ele => ele[firstLabelData2]);
      const secondValueData2 = data2.map(ele => ele[secondLabelData2]);
      const chartLabel2 = data2.map(ele => ele.Week);
      result2.push({ data: firstValueData2, label: firstLabelData2 })
      result2.push({ data: secondValueData2, label: secondLabelData2 })
      result2.push('Recent hiring trends')
      result2.push(chartLabel2)
    }
    res.status(200).send({
      result1, result2
    })

  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: 'Unable to fetch news feed'
    })
  }

}
exports.feedBuilder = async (req, res) => {
  const page = req.body.page || 1
  try {
    var result = await unirest("GET", "https://newscatcher.p.rapidapi.com/v1/search_free").query({
      "sort_by": "rank",
      "page_size": "10",
      "page": page,
      "sort_by": 'rate',
      "media": "True",
      "lang": "en",
      "q": "jobs"

    }).headers({
      "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      "x-rapidapi-key": "be13d2339emsh990703595a99346p1cf446jsn862e9402a187",
      "useQueryString": true
    });

    if (result.error) {
      // console.log(result);
      throw new Error()
    }
    res.send({
      feeds: result.body.articles
    })
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      message: 'Unable to fetch news feed'
    })
  }
}
