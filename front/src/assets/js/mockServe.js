const express = require('express');     //引入mock
const mockData = require("./mockData")
let app = express();
const appUser= mockData.concat([]);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', '*');
    // if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    next();
});

for(let i of appUser){
    // if(!i.method){
    //     app.use(i.url, function (req, res) {
    //         res.json(i.data)
    //     })
    // }else
    if(i.method === 'get') {
        app.get(i.url, function (req, res) {
            res.json(i.data)
        })
    }else if(i.method === 'post') {
        app.post(i.url, function (req, res) {
            res.json(i.data)
        })
    }else if(i.method === 'put') {
        app.put(i.url, function (req, res) {
            res.json(i.data)
        })
    }else if(i.method === 'delete'){
        app.delete(i.url, function (req, res) {
            res.json(i.data)
        })
    }
}


app.listen('9010', () => {
    console.log('监听端口 9010')
})
