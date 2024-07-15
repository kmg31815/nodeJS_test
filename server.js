// 導入所需的 module
const express = require('express');

// 建立 Express 應用程式
const app = express();
// 指定 port 號
const port = 8080;
// 使用中間件解析 JSON 資料
app.use(express.json());

// 處理 POST 請求，發送到 API 端點
app.post('/request', async (req, res) => {
    const requestBody = req.body;
    console.log(typeof requestBody['price'])

    if (typeof requestBody['price'] === "number") {
        res.json(requestBody);
    } else {
        res.statusCode = 400;
        res.json({
            "url": "https://api.schedule.asiayo.com/",
            "status": 400,
            "contentType": "application/JSON",
            "headers": {
                "cache-control": "no-cache, private",
                "content-type": "application/JSON",
                "date": "Wed, 01 May 2099 00:00:00 GMT",
                "server": "nginx",
                "x-request-id": "679723986539296061"
            },
            "body": "{\"status\":{\"code\":XXXX,\"msg\":\"Validation failed.\"},\"data\":{\"errors\":{\"price\":[\"The price must be numeric\"]}}}"
        });
    }
});

// 啟動伺服器，監聽指定的端口
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});