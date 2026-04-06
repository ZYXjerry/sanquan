// 查询
async function doSearch() {
  const code = document.getElementById('codeInput').value.trim();
  if (!code) {
    alert("请输入产品溯源编码");
    return;
  }
  try {
    const res = await fetch(`/api/trace?code=${code}`);
    const data = await res.json();
    if (!data.success) {
      alert(data.msg);
      return;
    }
    renderResult(data.data);
  } catch (e) {
    alert("请求失败，请检查服务");
  }
}

// 渲染结果
function renderResult(data) {
  document.getElementById('page-search').classList.add('hidden');
  document.getElementById('page-result').classList.remove('hidden');

  // 产品信息
  const p = data.product;
  const infoHtml = `
    <div class="item"><div class="label">产品名称</div><div class="value">${p.name}</div></div>
    <div class="item"><div class="label">产品规格</div><div class="value">${p.spec}</div></div>
    <div class="item"><div class="label">生产批次</div><div class="value">${p.batch}</div></div>
    <div class="item"><div class="label">生产日期</div><div class="value">${p.productionDate}</div></div>
    <div class="item"><div class="label">保质期</div><div class="value">${p.shelfLife}</div></div>
    <div class="item"><div class="label">生产基地</div><div class="value">${p.factory}</div></div>
  `;
  document.getElementById('productInfo').innerHTML = infoHtml;

  // 溯源环节
  const stepsGrid = document.getElementById('stepsGrid');
  stepsGrid.innerHTML = '';
  data.steps.forEach((step, idx) => {
    const stepItem = document.createElement('div');
    stepItem.className = 'step-item';
    stepItem.innerHTML = `
      <div class="num">${idx+1}</div>
      <div class="name">${step.title.replace(/\d+\. /, '')}</div>
    `;
    stepItem.onclick = () => openModal(step.title, step.org, step.content);
    stepsGrid.appendChild(stepItem);
  });
}

// 弹窗
function openModal(title, org, content) {
  document.getElementById('modalTitle').innerText = title + " | " + org;
  document.getElementById('modalBody').innerText = content;
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// 返回
function backSearch() {
  document.getElementById('page-result').classList.add('hidden');
  document.getElementById('page-search').classList.remove('hidden');
  document.getElementById('codeInput').value = "";
}