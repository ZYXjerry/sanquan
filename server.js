const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data.json');

// 读取所有产品
function getAllData() {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
}

// 支持多编码查询
app.get('/api/trace', (req, res) => {
  const { code } = req.query;
  const jsonData = getAllData();
  const target = jsonData.products.find(item => item.validCode === code);

  if (target) {
    res.json({ success: true, data: target });
  } else {
    res.json({ success: false, msg: '产品编码不存在，请重新输入' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 三全溯源服务已启动`);
  console.log(`🌐 访问地址：http://localhost:${PORT}`);
});