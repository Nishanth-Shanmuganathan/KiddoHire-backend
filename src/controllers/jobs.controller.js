var unirest = require("unirest");

exports.searchCity = async (req, res) => {
  const string = req.params.city
  try {
    const result = await unirest("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/cities").query({
      "namePrefix": string
    }).headers({
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      "x-rapidapi-key": "be13d2339emsh990703595a99346p1cf446jsn862e9402a187",
      "useQueryString": true
    });

    if (result.error) throw new Error(result.error);
    const data = result.body.data.map(element => element['city']);
    res.status(200).send({ data })
  } catch (error) {
    res.status(400).send({ message: 'No cities found' })
  }
}
