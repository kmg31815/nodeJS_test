// 導入所需的 module
const puppeteer = require('puppeteer'); // 獲取完整動態加載的 HTML 結構
const cheerio = require('cheerio'); // 解析 HTML (類似jQuery用法)
const fs = require('fs'); // 操作檔案
const path = require('path'); // 處理和轉換文件路徑

// 定義要擷取的網址
const url = 'https://asiayo.com/zh-tw/package/sport-activities/';

/*
    async / await 是 Promise 的語法糖
        一般擷取資料會使用"非同步"來處理大量請求、加快回傳 response 速度，
        且使用 async 和 await 可以簡化非同步方法的錯誤處理，並使程式更可讀
    
    使用 async 定義非同步方法(內部以同步的方式運行)
    await 可以暫停非同步函式的運行（中止Promise的運行），直到非同步進入resolve或reject，當接收完回傳值後繼續非同步函式的運行
*/

// 非同步方法 擷取資料
async function fetchPageHTML() {
    // 啟動 Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        /*
            const { data } = await axios.get(url);
            相當於
            const response = await axios.get(url);
            const data = response.data;
            當需要訪問回應對象的其他屬性（例如狀態碼、標頭等）時，可以通過 response 取得
         */
        // const { data } = await axios.get(url); // axios.get(url) 是非同步方法
        // const $ = cheerio.load(data); // 使用 Cheerio 加載 HTML 資料，並以 $ 來操控解析後的資料

        // 前往指定的 URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // 等待網頁內容完全加載
        await page.waitForSelector('#app > div > div.sc-kAuIVs.kwPuLx > div.sc-gfQywf.isGzTD > div.sc-hlzHbZ.sc-ihFKfs.iXBGse.bxeiHn > div');

        // 獲取完整的 HTML 內容
        const htmlContent = await page.content();

        return htmlContent;
    } catch (error) {
        console.error('Error fetching page HTML:', error);
        return [];
    } finally {
        // 關閉 Puppeteer 瀏覽器
        await browser.close();
    }
}

// 寫入 CSV 檔案
function saveToCSV(activities) {
    const filePath = path.join(__dirname, 'activity.csv');
    const header = '賽事名稱\t每人最低價\n';
    const rows = activities.map(activity => `${activity.title}\t${activity.price}`).join('\n');
    const csvContent = header + rows;

    fs.writeFileSync(filePath, csvContent);
    console.log(`Data saved to ${filePath}`);
}

// 非同步方法執行完後再執行 then() 內部程式碼，避免數據沒獲取到的問題
fetchPageHTML().then(pageHTML => {

    // 使用 Cheerio 加載 HTML 資料，並以 $ 來操控解析後的資料
    const $ = cheerio.load(pageHTML);

    const activities = [];

    // 遍歷每個元素，從中擷取"賽事名稱"和"每人最低價"
    $('a').each((index, element) => {
        const title = $(element).find('div.sc-cHGmPC.hGUsNP > h2').text().trim();
        const priceText = $(element).find('div.sc-cHGmPC.hGUsNP > div.sc-jhrdCu.ikbdyw > div').text().trim();

        // 將價格轉換為數字
        const price = parseInt(priceText.replace(/[^\d.]/g, '')); // replace(/[^\d.]/g, '') 將非數字移除

        if (title && !isNaN(price)) {
            activities.push({ title, price });
        }
    });

    console.log(activities)
    saveToCSV(activities);
});