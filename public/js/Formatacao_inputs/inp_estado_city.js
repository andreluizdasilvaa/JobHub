document.addEventListener('DOMContentLoaded', () => {

    // Objeto para armazenar os estados e cidades
    const cidadesPorEstado = {};

    // Preenchendo os estados dinamicamente
    fetch('/api/estados/')
        .then(response => response.json())
        .then(estados => {
            const estadoOptions = estados.map(
                estado => `<option value="${estado.uf}">${estado.nome} (${estado.uf})</option>`
            ).join('');

            // Preenchendo ambos os selects de estados
            document.getElementById("estado-pf").innerHTML += estadoOptions;
            document.getElementById("estado-pj").innerHTML += estadoOptions;
        })
        .catch(error => console.error('Erro ao buscar estados:', error));

    // Função para atualizar cidades com base no estado selecionado
    const atualizarCidades = (estado, cidadeSelect) => {
        if (!estado || !cidadeSelect) return;

    // Limpar opções existentes
    cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione sua cidade</option>';

    // Verificar se já temos cidades armazenadas
    if (cidadesPorEstado[estado]) {
        cidadesPorEstado[estado].forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade.nome; // Use o campo apropriado
            option.textContent = cidade.nome; // Use o campo apropriado
            cidadeSelect.appendChild(option);
        });
        return;
    }

    // Buscar cidades do estado via API
    fetch(`/api/estados/${estado}/municipios`)
        .then(response => response.json())
        .then(cidades => {
            cidadesPorEstado[estado] = cidades; // Armazenar para evitar novas requisições
            cidades.forEach(cidade => {
                const option = document.createElement("option");
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                cidadeSelect.appendChild(option);
            });
        })
        .catch(error => console.error(`Erro ao buscar cidades de ${estado}:`, error));
    };

    // Eventos para selecionar estado e atualizar cidades
    document.getElementById("estado-pf").addEventListener("change", (event) => {
        atualizarCidades(event.target.value, document.getElementById("cidade-pf"));
    });

    document.getElementById("estado-pj").addEventListener("change", (event) => {
        atualizarCidades(event.target.value, document.getElementById("cidade-pj"));
    });

})