// 導入所需的 module
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'activity.csv');
const data = fs.readFileSync(filePath, 'utf8');
const lines = data.trim().split('\n'); // 以換行作為分隔符拆分字串

// slice(1) 從索引 1 開始到最後 => 因為不需要 header
const json = lines.slice(1).map(line => {
    const values = line.split('\t'); // 以 tab 作為分隔符拆分字串
    return {
        "name": values[0],
        "price": parseInt(values[1])
    };
});

console.log(json);