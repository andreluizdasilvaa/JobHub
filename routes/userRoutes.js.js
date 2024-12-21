var express = require('express');
var axios = require('axios');

var router = express.Router();

// Rota para obter os estados
router.get('/estados', async (req, res) => {
    try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = response.data;

        const estadosFiltrados = estados.map(estado => ({
            nome: estado.nome,
            uf: estado.sigla
        }));
        res.json(estadosFiltrados);
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        res.status(500).json({ error: 'Erro ao buscar estados' });
    }
});

// Rota para obter as cidades de um estado
router.get('/estados/:uf/municipios', async (req, res) => {
    const uf = req.params.uf;
    try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const cidades = response.data;

        // Filtra os dados relevantes
        const cidadesFiltradas = cidades.map(cidade => ({
            nome: cidade.nome,
        }));
        
        res.json(cidadesFiltradas); 
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

module.exports = router;