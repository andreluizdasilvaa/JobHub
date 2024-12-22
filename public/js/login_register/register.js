document.addEventListener('DOMContentLoaded', () => {

    // Trocando os Formularios quando click no btn radio  
    const radioPf = document.getElementById('radio2');
    const radioPj = document.getElementById('radio3');
    const formPf = document.getElementById('form-pf');
    const formPj = document.getElementById('form-pj');

    const alternarFormularios = () => {
        if (radioPf.checked) {
            formPf.style.display = 'block';
            formPj.style.display = 'none';
        } else if (radioPj.checked) {
            formPf.style.display = 'none';
            formPj.style.display = 'block';
        }
    };

    // Evento para alternar o formulário ao selecionar um dos rádios
    radioPf.addEventListener('change', alternarFormularios);
    radioPj.addEventListener('change', alternarFormularios);

    alternarFormularios();
    
    // Login e tratamento
    var submit_register_pj = document.getElementById('submit_register-pj');
    var submit_register_pf = document.getElementById('submit_register-pf');

    // Tratamento PJ (CNPJ)
    submit_register_pj.addEventListener('click', (event) => {
        event.preventDefault();

        var nome_empresa = document.getElementById('nome-pj').value.trim();
        var apelido_pj = document.getElementById('apelido-pj').value.trim();
        var cnpj = document.getElementById('cnpj').value.trim();
        var endereco_pj = document.getElementById('endereco-pj').value.trim();
        var email_pj = document.getElementById('email_pj').value.trim();
        var area_atuacao = document.getElementById('area-atuacao-pj').value.trim();
        var estado_pj = document.getElementById('estado-pj').value.trim();
        var senha_pj = document.getElementById('senha-pj').value.trim();
        var cidade_pj = document.getElementById('cidade-pj').value.trim();
        var checkbox_terms_pj = document.getElementById('checkbox-terms-pj');
        var checbox_div_pj = document.getElementById('checkmark-pj');

        // Validando os campos com switch
        switch (true) {
            case !nome_empresa:
                gerarError('nome-pj', "Nome da Empresa é Obrigatório");
                break;
            case !apelido_pj:
                gerarError('apelido-pj', "Apelido é Obrigatório");
                break;
            case !cnpj:
                gerarError('cnpj', "CNPJ é Obrigatório");
                break;
            case validaCNPJ(cnpj) == false:
                gerarError('cnpj', 'CNPJ Invalido')
                break
            case !email_pj:
                gerarError('email_pj', 'E-mail é Obrigatório')
                break
            case !area_atuacao:
                gerarError('area-atuacao-pj', "Área de Atuação é Obrigatória");
                break;
            case !senha_pj:
                gerarError('senha-pj', "Senha é Obrigatória");
                break;
            case !checkbox_terms_pj.checked:
                animationError(checbox_div_pj);
                break;
            default:
                var data = {
                    nome: nome_empresa,
                    apelido: apelido_pj,
                    cnpj: limparInput(cnpj),
                    endereco: endereco_pj,
                    area_atuacao: area_atuacao,
                    estado: estado_pj,
                    senha: senha_pj,
                    cidade: cidade_pj,
                    email: email_pj
                }
                
                fetch("/api/pj/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then(async (resp) => {
                        if (resp.ok) {
                            showModal('check.svg', 'Cadastro Realizado com Sucesso!', 'Continuar');
                        } else {
                            const errorData = await resp.json(); // Obter a mensagem de erro do servidor
                            switch (errorData.inp_err_msg) {
                                case "cnpj":
                                    gerarError('cnpj', "Este CNPJ já existe");
                                    break;
                                case "Email":
                                    gerarError('email_pj', "Este E-mail já existe");
                                    break;
                                case "Apelido":
                                    gerarError('apelido-pj', "Este apelido já existe");
                                    break;
                                default:
                                    alert("Erro desconhecido. Tente novamente.");
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("Erro na requisição:", error);
                        alert("Erro ao tentar realizar o cadastro.");
                    });
                
        };
    });

    // tratamento pf ( CPF )
    submit_register_pf.addEventListener('click', (event) => {
        event.preventDefault();

        var nome_completo = document.getElementById('nome-pf').value.trim();
        var apelido_pf = document.getElementById('apelido-pf').value.trim();
        var cpf = document.getElementById('cpf').value.trim();
        var data_nasc = document.getElementById('data_nasc-pf').value.trim();
        var tell_pf = document.getElementById('tell-pf').value.trim();
        var email_pf = document.getElementById('email_pf').value.trim();
        var estado_pf = document.getElementById('estado-pf').value.trim();
        var senha_pf = document.getElementById('senha-pf').value.trim();
        var cidade_pf = document.getElementById('cidade-pf').value.trim();
        var checkbox_terms_pf = document.getElementById('checkbox-terms-pf');
        var checbox_div = document.getElementById('checkmark-pf');

        // Validação da data de nascimento
        if (data_nasc) {
            const dataNascimento = new Date(data_nasc);
            const dataAtual = new Date();

            // Se a data de nascimento for maior que a data atual
            if (dataNascimento > dataAtual) {
                gerarError('data_nasc-pf', "Data de Nascimento Invalida");
                return;
            }
        }

        // Validando os campos com switch
        switch (true) {
            case !nome_completo:
                gerarError('nome-pf', "Nome Completo Obrigatório");
                break;
            case !apelido_pf:
                gerarError('apelido-pf', "Apelido Obrigatório"); // !
                break;
            case !cpf:
                gerarError('cpf', "CPF Obrigatório");
                break;
            case isValidCPF(cpf) == false:
                gerarError('cpf', "CPF Invalido");
                break
            case !data_nasc:
                gerarError('data_nasc-pf', "Data de Nascimento Obrigatório");
                break;
            case !email_pf:
                gerarError('email_pf', "E-mail Obrigatório");
                break;
            case !senha_pf:
                gerarError('senha-pf', "Senha Obrigatório");
                break;
            case !checkbox_terms_pf.checked:
                animationError(checbox_div);
                break;
            default:
                var data = {
                    nome: nome_completo,
                    apelido: apelido_pf,
                    cpf: limparInput(cpf),
                    nascimento: data_nasc,
                    telefone: limparInput(tell_pf),
                    email: email_pf,
                    estado: estado_pf,
                    cidade: cidade_pf,
                    senha: senha_pf
                }
                
                fetch("/api/pf/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then(async (resp) => {
                    if (resp.ok) {
                        showModal('check.svg', 'Cadastro Realizado com Sucesso!', 'Continuar');
                    } else {
                        const errorData = await resp.json(); // Obtenha a mensagem de erro do servidor
                        switch (errorData.inp_err_msg) {
                            case "CPF":
                                gerarError('cpf', "Este CPF já existe");
                                break;
                            case "Email":
                                gerarError('email_pf', "Este E-mail já existe");
                                break;
                            case "Apelido":
                                gerarError('apelido-pf', "Este apelido já existe");
                                break;
                            default:
                                alert("Erro desconhecido");
                        }
                    }
                }).catch(error => {
                    console.error('Erro na requisição:', error);
                    alert('Erro ao tentar realizar o cadastro.');
                });
                
        }
    });
 
    // Adiciona o evento de clique nos inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('click', removeErrorMessages);
    });

    document.querySelectorAll('select').forEach(input => {
        input.addEventListener('click', removeErrorMessages);
    });

});
