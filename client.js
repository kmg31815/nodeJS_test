// 導入所需的 module
const axios = require('axios');

const headers = {
    'channel': 'CP',
    'user': 'OOO',
};
const requestData = {
    "name": "岡山馬拉松",
    "price": "8150"
}
// 發送 POST 請求到虛擬端點
axios.post("http://localhost:8080/request", requestData, { headers }).then(response => {
    console.log(response.data);
}).catch(error => {
    if (error.response) {
        console.error('Error response data:', error.response.data);
    } else {
        console.error('Error:', error.message);
    }
});