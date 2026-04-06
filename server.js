const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3100;

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 读取溯源数据
const dataPath = path.join(__dirname, 'data.json');
function getTraceData() {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
}

// 核心接口：查询溯源信息
app.get('/api/trace', (req, res) => {
  const { code } = req.query;
  const data = getTraceData();
  
  if (code === data.validCode) {
    res.json({ success: true, data });
  } else {
    res.json({ success: false, msg: '编码不存在，请重新输入' });
  }
});

// 启动服务（和你旧代码完全一样！）
app.listen(PORT, () => {
  console.log(`✅ 三全溯源服务已启动`);
  console.log(`🌐 访问地址：http://localhost:${PORT}`);
});