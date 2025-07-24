
  const container = document.getElementById('productList');

  axios.get(`${URL_API}/api/products`)
  //axios.get('http://localhost:3000/api/products') // substitua pelo domínio da Vercel se for testar em produção
    .then(res => {
      res.data.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'stack-card';
        card.onclick = () => window.location.href = `/pages/produtos/produto.html?id=${produto.id_prod}`;

        card.innerHTML = `
          <div class="image">
            <img src="${produto.img_prod || 'https://via.placeholder.com/120x90?text=Sem+Imagem'}" alt="${produto.cod_prod}" />
          </div>
          <div class="stack-card-content">
            <h2>${produto.cod_prod}</h2>
            <p>${produto.descricao || ''}</p>
          </div>
          <div class="cxfechada">
            <h2>Caixa Fechada</h2>
            <div class="qtde">Qtde: ${produto.cx_fech ?? '-'}</div>
            <div class="stack-card-price">R$ ${produto.preco_fechada?.toFixed(2) ?? '-'}</div>
          </div>
          <div class="cxfracionada">
            <h2>Caixa Fracionada</h2>
            <div class="qtde">Qtde: ${produto.qtde_fracionada ?? '-'}</div>
            <div class="stack-card-price">R$ ${produto.preco_fracionada?.toFixed(2) ?? '-'}</div>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar produtos:', err);
      container.innerHTML = '<p>Erro ao carregar produtos 😕</p>';
    });
