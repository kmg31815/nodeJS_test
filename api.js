// 導入所需的 module
const axios = require('axios');

// A
const headers = {
    'channel': 'CP',
    'user': 'OOO',
};
const requestData = {
    "name": "岡山馬拉松",
    "price": 8150
}
// 發送 POST 請求到虛擬端點
axios.post("https://api.schedule.asiayo.com/", requestData, { headers }).then(response => {
    console.log(response.data);
}).catch(error => {
    if (error.response) {
        console.error('Error response data:', error.response.data);
    } else {
        console.error('Error:', error.message);
    }
});

// B
const response = {
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
    "body": "{\"status\":{\"code\":\"XXXX\",\"msg\":\"Validation failed.\"},\"data\":{\"errors\":{\"price\":[\"The price must be numeric\"]}}}"
};

const parsedBody = JSON.parse(response.body);
const errors = parsedBody.data.errors;
console.log(errors);

// C
/*
    {
        "name": "岡山馬拉松",
        "price": "8150"
    }
    price 的值不是數字，就可能會導致 API 回應錯誤 "The price must be numeric"
*/
