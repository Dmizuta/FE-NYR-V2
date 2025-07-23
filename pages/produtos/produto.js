const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Exemplo: https://backend-wav2.vercel.app/api/products
axios.get('https://backendnyrfestas.vercel.app/api/produtos')
  .then(res => {
    const produto = res.data.find(p => p.id_prod == productId);

    if (produto) {
      document.getElementById('productName').textContent = produto.cod_prod;
      document.getElementById('productDescription').textContent = produto.descricao;
      document.getElementById('productImage').src = produto.img_prod || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
      document.getElementById('precoFechada').textContent = produto.preco_fechada ? `R$ ${produto.preco_fechada.toFixed(2)}` : '-';
      document.getElementById('qtdeFechada').textContent = produto.cx_fech ?? '-';
      document.getElementById('precoFracionada').textContent = produto.preco_fracionada ? `R$ ${produto.preco_fracionada.toFixed(2)}` : '-';
      document.getElementById('qtdeFracionada').textContent = produto.qtde_fracionada ?? '-';
    } else {
      document.querySelector('.produto-container').innerHTML = "<h2>Produto não encontrado 😕</h2>";
    }
  })
  .catch(err => {
    console.error('Erro ao buscar produto:', err);
  });
