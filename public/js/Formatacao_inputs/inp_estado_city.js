document.addEventListener('DOMContentLoaded', () => {
    const cidadesPorEstado = {};

    // Função para preencher os estados nos selects
    const preencherEstados = (estadoSelectId) => {
        fetch('/api/estados/')
            .then(response => response.json())
            .then(estados => {
                const estadoOptions = estados.map(
                    estado => `<option value="${estado.uf}">${estado.nome} (${estado.uf})</option>`
                ).join('');
                document.getElementById(estadoSelectId).innerHTML += estadoOptions;
            })
            .catch(error => console.error('Erro ao buscar estados:', error));
    };

    // Função para atualizar as cidades com base no estado selecionado
    const atualizarCidades = (estado, cidadeSelectId) => {
        const cidadeSelect = document.getElementById(cidadeSelectId);
        if (!estado || !cidadeSelect) return;

        // Limpar opções existentes
        cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione sua cidade</option>';

        // Verificar se já temos cidades armazenadas
        if (cidadesPorEstado[estado]) {
            cidadesPorEstado[estado].forEach(cidade => {
                const option = document.createElement("option");
                option.value = cidade.nome;
                option.textContent = cidade.nome;
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

    // Função para inicializar o preenchimento de estados e eventos
    const inicializar = (estadoSelectId, cidadeSelectId) => {
        preencherEstados(estadoSelectId);

        document.getElementById(estadoSelectId).addEventListener("change", (event) => {
            atualizarCidades(event.target.value, cidadeSelectId);
        });
    };

    // Inicializar para os selects de estado e cidade
    inicializar("estado-pf", "cidade-pf");
    inicializar("estado-pj", "cidade-pj");
});
