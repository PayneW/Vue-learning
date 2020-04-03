const compression = require('compression');
const bodyParser = require('body-parser');

const axios = require("axios");
const express = require("express");
const app = express();
const apiRoutes = express.Router();

const port = process.env.PORT || config.build.port;


apiRoutes.get('/getDiscList', function (req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log("Error: ", e)
    })
});

app.use('/api', apiRoutes);

app.use(compression());

app.use(epxress.static('./dist'));

module.export = app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('listening at http://localhost: ' + port + '\n');
});
