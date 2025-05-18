// js/data.js
// js/data.js
const lugaresDestaque = [
  {
    id: 1,
    nome: "Buffet Pampulha",
    imagem: "../docs/images/buffet-pampulha.jpg",
    descricao: "Espaço premium para casamentos com vista para a Lagoa da Pampulha",
    tipo: "Casamento",
    localidade: "Belo Horizonte",
    bairro: "Pampulha",
    capacidade: 300,
    preco: 15000,
    avaliacao: 4.8
  },
  {
    id: 2,
    nome: "BI72 Espaço",
    imagem: "../docs/images/bi72.jpg",
    descricao: "Moderno espaço corporativo com tecnologia de ponta",
    tipo: "Corporativo",
    localidade: "São Paulo",
    bairro: "Itaim Bibi",
    capacidade: 150,
    preco: 8500,
    avaliacao: 4.6
  },
  {
    id: 3,
    nome: "Buffet Catharina",
    imagem: "../docs/images/catharina.jpg",
    descricao: "Ambiente rústico-chique perfeito para festas intimistas",
    tipo: "Aniversário",
    localidade: "Rio de Janeiro",
    bairro: "Leblon",
    capacidade: 120,
    preco: 12000,
    avaliacao: 4.9
  },
  {
    id: 4,
    nome: "Espaço Vila Madá",
    imagem: "../docs/images/vila-mada.jpg",
    descricao: "Galeria de arte transformada em espaço para eventos criativos",
    tipo: "Formatura",
    localidade: "São Paulo",
    bairro: "Vila Madalena",
    capacidade: 200,
    preco: 9800,
    avaliacao: 4.7
  },
  {
    id: 5,
    nome: "Palácio das Convenções",
    imagem: "../docs/images/palacio.jpg",
    descricao: "Espaço luxuoso para grandes eventos e convenções",
    tipo: "Corporativo",
    localidade: "Belo Horizonte",
    bairro: "Savassi",
    capacidade: 500,
    preco: 25000,
    avaliacao: 4.5
  },
  {
    id: 6,
    nome: "Jardim Botânico Eventos",
    imagem: "../docs/images/jardim.jpg",
    descricao: "Eventos em meio à natureza com estrutura completa",
    tipo: "Casamento",
    localidade: "Rio de Janeiro",
    bairro: "Jardim Botânico",
    capacidade: 180,
    preco: 18000,
    avaliacao: 4.9
  }
];

// Função para filtrar os locais
function filtrarLocais(filtros) {
  return lugaresDestaque.filter(lugar => {
    return (
      (!filtros.tipo || lugar.tipo === filtros.tipo) &&
      (!filtros.localidade || lugar.localidade === filtros.localidade) &&
      (!filtros.bairro || lugar.bairro === filtros.bairro) &&
      (!filtros.capacidade || lugar.capacidade >= filtros.capacidade)
    );
  });
}

// Função para carregar os destaques
function carregarDestaques(filtros = {}) {
  const container = document.getElementById('destaques-container');
  const locaisFiltrados = filtrarLocais(filtros);
  
  if (!container) return;
  
  let html = '';
  
  if (locaisFiltrados.length === 0) {
    html = `
      <div class="col-12 text-center py-5">
        <h3 class="text-muted">Nenhum local encontrado com esses filtros</h3>
        <button class="btn btn-outline-primary mt-3" onclick="carregarDestaques()">Limpar filtros</button>
      </div>
    `;
  } else {
    locaisFiltrados.forEach(lugar => {
      html += `
        <div class="col-md-4 mb-4" data-aos="fade-up">
          <div class="card h-100">
            <img src="${lugar.imagem}" class="card-img-top" alt="${lugar.nome}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="card-title">${lugar.nome}</h5>
                <span class="badge bg-primary">${lugar.avaliacao} ⭐</span>
              </div>
              <p class="card-text text-muted">${lugar.descricao}</p>
              <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Tipo:</span>
                  <strong>${lugar.tipo}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Local:</span>
                  <strong>${lugar.bairro}, ${lugar.localidade}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Capacidade:</span>
                  <strong>${lugar.capacidade} pessoas</strong>
                </li>
              </ul>
            </div>
            <div class="card-footer bg-white border-top-0">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 text-primary">R$ ${lugar.preco.toLocaleString('pt-BR')}</h5>
                <button class="btn btn-primary">Reservar</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  container.innerHTML = html;
}

// Inicializa os filtros e carrega os locais
document.addEventListener('DOMContentLoaded', () => {
  carregarDestaques();
  
  // Atualiza os selects com opções dinâmicas
  atualizarOpcoesFiltros();
});

// Função para atualizar os selects
function atualizarOpcoesFiltros() {
  const tipos = [...new Set(lugaresDestaque.map(l => l.tipo))];
  const localidades = [...new Set(lugaresDestaque.map(l => l.localidade))];
  
  const tipoSelect = document.getElementById('filtro-tipo');
  const localidadeSelect = document.getElementById('filtro-localidade');
  const bairroSelect = document.getElementById('filtro-bairro');
  
  // Preenche tipos
  tipos.forEach(tipo => {
    tipoSelect.innerHTML += `<option value="${tipo}">${tipo}</option>`;
  });
  
  // Preenche localidades
  localidades.forEach(localidade => {
    localidadeSelect.innerHTML += `<option value="${localidade}">${localidade}</option>`;
  });
  
  // Atualiza bairros quando muda localidade
  localidadeSelect.addEventListener('change', function() {
    const bairros = [...new Set(lugaresDestaque
      .filter(l => l.localidade === this.value)
      .map(l => l.bairro))];
    
    bairroSelect.innerHTML = '<option value="">Bairro Espaço</option>';
    bairros.forEach(bairro => {
      bairroSelect.innerHTML += `<option value="${bairro}">${bairro}</option>`;
    });
  });
}

// Função para aplicar filtros
function aplicarFiltros() {
  const filtros = {
    tipo: document.getElementById('filtro-tipo').value,
    localidade: document.getElementById('filtro-localidade').value,
    bairro: document.getElementById('filtro-bairro').value,
    capacidade: document.getElementById('filtro-capacidade').value
  };
  
  carregarDestaques(filtros);
}