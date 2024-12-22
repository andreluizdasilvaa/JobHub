const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Loga o erro para depuração

    const statusCode = err.status || 500; // Usa o status do erro ou 500 como padrão
    const message = err.message || 'Erro interno no servidor.';

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;