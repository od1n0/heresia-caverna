function liToggle(cb, grupoId) {
  const li = cb.closest('li');
  li.classList.toggle('completed', cb.checked);
  atualizarProgresso(grupoId);
}

    const grupos = {
  "grupo-1": 9, "grupo-2": 11, "grupo-3": 7, "grupo-4": 5, "grupo-5": 4,
  "grupo-6": 4, "grupo-7": 11, "grupo-8": 10, "grupo-9": 12, "grupo-10": 12
};


  function atualizarProgresso(grupoId) {
    const cb = document.querySelectorAll(`#${grupoId} input[type="checkbox"]`);
    const total = grupos[grupoId];
    const marcados = Array.from(cb).filter(c=>c.checked).length;

    document.getElementById(`progresso-${grupoId}`).innerText = `${marcados} de ${total} completos`;
    const barra = document.getElementById(`barra-${grupoId}`);
    barra.style.width = `${(marcados/total)*100}%`;

    const btn = document.getElementById(`btn-${grupoId}`);
    btn.innerText = marcados === total ? "Desmarcar todos" : "Marcar todos";

    localStorage.setItem(grupoId, JSON.stringify(Array.from(cb).map(c=>c.checked)));
  }

  function toggleAll(grupoId) {
    const grupo = document.getElementById(grupoId);
    const checkboxes = grupo.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  
    checkboxes.forEach(cb => {
      cb.checked = !allChecked;
      const li = cb.closest('li');
      if (!allChecked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });
  
    atualizarProgresso(grupoId);
  }

  function carregarProgresso() {
  for (let grupoId in grupos) {
    const data = JSON.parse(localStorage.getItem(grupoId) || '[]');
    const cb = document.querySelectorAll(`#${grupoId} input[type="checkbox"]`);
    
    cb.forEach((c, i) => {
      c.checked = !!data[i];
      const li = c.closest('li');
      li.classList.toggle('completed', c.checked);
    });

    atualizarProgresso(grupoId);
  }
}


  function filtrar() {
    const termo = document.getElementById('filtro').value.toLowerCase();
    const secoes = document.querySelectorAll('.grupo-section');
  
    secoes.forEach(section => {
      let algumVisivel = false;
      const desafios = section.querySelectorAll('li');
  
      desafios.forEach(li => {
        const texto = li.innerText.toLowerCase();
        const match = texto.includes(termo);
  
        li.style.display = match ? 'list-item' : 'none';
        li.classList.toggle('highlight', match);
        if (match) algumVisivel = true;
      });
  
      // Exibir ou esconder o grupo inteiro
      section.style.display = algumVisivel ? 'block' : 'none';
    });
  }
  

  window.onload = carregarProgresso;
  function toggleEstrategia(button) {
  const texto = button.nextElementSibling;
  const isVisible = texto.style.display === 'block';
  texto.style.display = isVisible ? 'none' : 'block';
  button.innerText = isVisible ? 'Ver Estratégia' : 'Esconder Estratégia';
}

document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("tooltip");

  document.querySelectorAll(".grupo-section li").forEach(li => {
    const descricao = li.querySelector(".descricao");

    if (!descricao) return;

    li.addEventListener("mouseenter", (e) => {
      tooltip.innerText = descricao.textContent.trim();
      tooltip.style.display = "block";
      tooltip.style.opacity = "1";
    });

    li.addEventListener("mousemove", (e) => {
      tooltip.style.left = (e.pageX + 20) + "px";
      tooltip.style.top = (e.pageY + 20) + "px";
    });

    li.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
      tooltip.style.opacity = "0";
    });
  });
});

