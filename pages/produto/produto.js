
    const mockProdutos = {
      "101": {
        nome: "MOD-111",
        descricao: "Sapato de palhaço - colorido",
        imagem: "image.png",
        precoFechada: 1.50,
        qtdeFechada: 120,
        precoFracionada: 2.20,
        qtdeFracionada: 12
      },
      "102": {
        nome: "Chapéu de Festa",
        descricao: "Chapéu cônico com elástico, pacote com 10 unidades",
        imagem: "https://i.imgur.com/UUkdW2e.png",
        precoFechada: 5.90,
        precoFracionada: 7.50,
        qtdeFracionada: 10
      }
    };

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const produto = mockProdutos[productId];

    if (produto) {
      document.getElementById('productName').textContent = produto.nome;
      document.getElementById('productDescription').textContent = produto.descricao;
      document.getElementById('productImage').src = produto.imagem;
      document.getElementById('precoFechada').textContent = produto.precoFechada ? `R$ ${produto.precoFechada.toFixed(2)}` : '-';
      document.getElementById('qtdeFechada').textContent = produto.qtdeFechada ?? '-';
      document.getElementById('precoFracionada').textContent = produto.precoFracionada ? `R$ ${produto.precoFracionada.toFixed(2)}` : '-';
      document.getElementById('qtdeFracionada').textContent = produto.qtdeFracionada ?? '-';
    } else {
      document.querySelector('.produto-container').innerHTML = "<h2>Produto não encontrado 😕</h2>";
    }

    document.getElementById('btnAdicionar').addEventListener('click', () => {
      const qtd = parseInt(document.getElementById('quantidade').value);
      const tipo = document.querySelector('input[name="tipoPreco"]:checked')?.value || 'desconhecido';

      if (!qtd || qtd <= 0) {
        alert("Digite uma quantidade válida.");
        return;
      }

      // Salvar no localStorage
      const ultimoProduto = {
        id: productId,
        nome: produto.nome,
        qtd: qtd,
        tipo: tipo
      };
      localStorage.setItem('ultimoProdutoAdicionado', JSON.stringify(ultimoProduto));

      alert(`Adicionado ${qtd}x "${produto.nome}" (${tipo}) ao pedido.`);
      exibirUltimoProduto();
    });

    document.getElementById('btnCancelar').addEventListener('click', () => {
      history.back();
    });

    function exibirUltimoProduto() {
      const info = localStorage.getItem('ultimoProdutoAdicionado');
      if (!info) return;

      const { id, nome, qtd, tipo } = JSON.parse(info);
      const container = document.getElementById('ultimoProdutoContainer');
      container.style.display = 'block';
      container.innerHTML = `
        <strong>Último produto adicionado:</strong><br>
        🧺 <strong>${nome}</strong> — ${qtd}x (${tipo})<br>
        <a href="produto.html?id=${id}">Ver novamente</a>
      `;
    }

    // Mostrar se já existe
    exibirUltimoProduto();
