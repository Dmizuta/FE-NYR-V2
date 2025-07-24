const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Buscar o produto por ID na API
axios.get(`${URL_API}/api/products/${productId}`)
  .then(res => {
    const produto = res.data;

    document.getElementById('productName').textContent = produto.cod_prod;
    document.getElementById('productDescription').textContent = produto.descricao;
    document.getElementById('productImage').src = produto.img_prod || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
    document.getElementById('precoFechada').textContent = produto.preco_fechada ? `R$ ${produto.preco_fechada.toFixed(2)}` : '-';
    document.getElementById('qtdeFechada').textContent = produto.cx_fech ?? '-';
    document.getElementById('precoFracionada').textContent = produto.preco_fracionada ? `R$ ${produto.preco_fracionada.toFixed(2)}` : '-';
    document.getElementById('qtdeFracionada').textContent = produto.qtde_fracionada ?? '-';
  })
  .catch(err => {
    console.error('Erro ao buscar produto:', err);
    document.querySelector('.produto-container').innerHTML = "<h2>Produto não encontrado 😕</h2>";
  });

// Botão ADICIONAR
document.getElementById('btnAdicionar').addEventListener('click', () => {
  const qtd = parseInt(document.getElementById('quantidade').value);

  if (!qtd || qtd <= 0) {
    alert("Digite uma quantidade válida.");
    return;
  }

  const produtoInfo = {
    id: productId,
    qtd: qtd,
    nome: document.getElementById('productName').textContent
  };

  localStorage.setItem('ultimoProdutoAdicionado', JSON.stringify(produtoInfo));
  alert(`Adicionado ${qtd}x "${produtoInfo.nome}" ao pedido.`);

  exibirUltimoProduto();
});

// Botão CANCELAR
document.getElementById('btnCancelar').addEventListener('click', () => {
  history.back();
});

// Exibir último produto adicionado
function exibirUltimoProduto() {
  const info = localStorage.getItem('ultimoProdutoAdicionado');
  if (!info) return;

  const { id, nome, qtd } = JSON.parse(info);
  const container = document.getElementById('ultimoProdutoContainer');
  container.style.display = 'block';
  container.innerHTML = `
    <strong>Último produto adicionado:</strong><br>
    🧺 <strong>${nome}</strong> — ${qtd}x<br>
    <a href="produto.html?id=${id}">Ver novamente</a>
  `;
}

exibirUltimoProduto();
