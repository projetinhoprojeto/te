/* document.getElementById('personalizarPerfil').addEventListener('click', () => {
    document.getElementById('perfilSelector').style.display = 'block';
});

function fecharSelector() {
    document.getElementById('perfilSelector').style.display = 'none';
}

function selecionarPerfil(img) {
    console.log('Perfil selecionado:', img);
    fecharSelector();
}*/
 document.addEventListener('DOMContentLoaded', () => {
    // Máscara de CPF
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpfError');

    cpfInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        event.target.value = value;
    });

    cpfInput.addEventListener('blur', async () => {
        const cpf = cpfInput.value.replace(/\D/g, '');
        const cpfValido = await validarCPF(cpf);
        if (!cpfValido) {
            cpfError.style.display = 'block';
        } else {
            cpfError.style.display = 'none';
        }
    });

   // Função para validar CPF
async function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

// Máscara e validação do CEP
const cepInput = document.getElementById('cep');
const cepError = document.getElementById('cepError');
const cepInfo = document.getElementById('cepInfo');
const logradouroSpan = document.getElementById('logradouro');
const bairroSpan = document.getElementById('bairro');
const localidadeSpan = document.getElementById('localidade');
const ufSpan = document.getElementById('uf');
const enderecoInput = document.getElementById('endereco');

// Aplicar máscara ao campo de CEP
cepInput.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    event.target.value = value;
});

// Ao perder o foco, buscar o CEP
cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarCEP(cep);
    } else {
        cepError.style.display = 'block';
        cepInfo.style.display = 'none';
    }
});

// Função para buscar o CEP na API ViaCEP
function buscarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                cepError.style.display = 'none';
                cepInfo.style.display = 'block';
                logradouroSpan.textContent = data.logradouro;
                bairroSpan.textContent = data.bairro;
                localidadeSpan.textContent = data.localidade;
                ufSpan.textContent = data.uf;
                enderecoInput.value = `${data.logradouro} - ${data.bairro} - ${data.localidade} - ${data.uf}`;
                enderecoInput.readOnly = true; // Tornar o campo somente leitura
            } else {
                cepError.style.display = 'block';
                cepInfo.style.display = 'none';
            }
        })
        .catch(() => {
            cepError.style.display = 'block';
            cepInfo.style.display = 'none';
        });
}


    // Máscaras de telefone
    const celularInput = document.getElementById('telefoneCelular');
    const fixoInput = document.getElementById('telefoneFixo');

    celularInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 0) {
            value = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
        this.value = value;
    });

    fixoInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        if (value.length > 0) {
            value = `(${value.slice(0, 2)})${value.slice(2, 6)}-${value.slice(6, 10)}`;
        }
        this.value = value;
    });
  
    // Validação e verificação de senhas
    document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const mensagemErro = document.getElementById('mensagemErro');

        event.preventDefault();

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            event.preventDefault();
            mensagemErro.textContent = 'As senhas não coincidem.';
            return;
        } else {
            mensagemErro.textContent = '';
        }

        // Validação CPF
        const cpf = cpfInput.value.replace(/\D/g, '');
        const cpfValido = await validarCPF(cpf);
        if (!cpfValido) {
            cpfError.style.display = 'block';
            event.preventDefault();
            return;
        }

        // Validação CEP
        /*
        const cep = cepInput.value.replace(/\D/g, '');
        const cepValido = buscarCEP(cep);
       if (!cepValido) {
           cepError.style.display = 'block';
           event.preventDefault();
        return;
        }*/
    });


});

document.getElementById('cadastroForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém o valor do campo 'nome'
    const nome = document.getElementById('nome').value;
    const nomeEnvio = document.getElementById('nome-envio'); // Elemento onde exibe o nome
    const confirmacao = document.getElementById('confirmado'); // Elemento da confirmação

    // Exibe o nome na mensagem de confirmação
    nomeEnvio.textContent = nome;

    // Exibe a mensagem de confirmação
    confirmacao.classList.add('ativar');

    // Enviar o formulário via Fetch API
    const formData = new FormData(event.target);

    fetch('cadastro.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Processa a resposta do servidor
    .then(data => {
        console.log('Resposta do servidor:', data); // Verifica o que o PHP retornou (pode ser oculto no final)
        
       setTimeout(() => {
            window.location.href = "../LOGIN/login.html"; // Redireciona para a página principal
        }, 5000);   // Tempo de 3 segundos antes de redirecionar
    })
    .catch(error => {
        console.error('Erro ao enviar o formulário:', error);
    });
});
   
let tema = document.getElementById('botao-tema');

// Função para aplicar o tema com base no localStorage
function aplicarTema() {
    if (localStorage.getItem('tema') === 'escuro') {
        document.body.classList.add('tema-escuro');
        tema.innerHTML = '<i class="bi bi-moon-stars"></i>';
    } else {
        document.body.classList.remove('tema-escuro');
        tema.innerHTML = '<i class="bi bi-brightness-high"></i>';
    }
}


aplicarTema();

/*
tema.addEventListener('click', function () {
    document.body.classList.toggle('tema-escuro');
    
    
    if (document.body.classList.contains('tema-escuro')) {
        tema.innerHTML = '<i class="bi bi-moon-stars"></i>';
        localStorage.setItem('tema', 'escuro');  // Salva o tema escuro no localStorage
    } else {
        tema.innerHTML = '<i class="bi bi-brightness-high"></i>';
        localStorage.setItem('tema', 'claro');  // Salva o tema claro no localStorage
    }
});*/
   




           
