var i = 0; //Variável criada para servir de index para o array alunos[].
var alunos = []; //Array criado para armazenar os objetos aluno. 
var registro = []; //Array criado para armazenar as tags HTML responsáveis por exibir os alunos registrados.
var novoRegistro = []; //Array criado para armazenar as tags HTML responsáveis por exibir na tela os campos para alteração de um aluno.
var arrayData = []; //Array criado para armazenar os caracteres da data de nascimento dos alunos cadastrados.

//Cabecalho do registro de alunos. A essa variável são concatenadas novas tags HTML para que seja exibido na tela o registro de um novo aluno.
var msg = "<tr id='cabecalho'><td class='td_cabecalho'>Nome</td><td class='td_cabecalho'>Telefone</td><td class='td_cabecalho' >Nascimento</td><td class='td_cabecalho'>Nota</td><td class='td_cabecalho'>Opções</td></tr>";

//Função construtora do Objeto Aluno.
function Aluno (id, nome, telefone, nascimento, nota) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.nascimento = nascimento;
    this.nota = nota;
}

//Função que cria um objeto Aluno e o armazena no array alunos[];
function gravaAluno() {

    if (verificaSeDadosEstaoPreenchidos()) {
    
        var nome = document.getElementById('nome').value;
        var telefone = document.getElementById('telefone').value;
        var nascimento = document.getElementById('nascimento').value;
        var nota = document.getElementById('nota').value;
    
        var aluno = new Aluno(i, nome, telefone, nascimento, nota);

        alunos[i] = aluno;

        alert("Cadastro realizado com sucesso!");

        exibirRegistros(alunos[i]);

        i++;

    }
}

//Função que altera o documento HTML para que seja exibido o registro dos alunos cadastrados.
function exibirRegistros(a) {
    
    var registroAlunos = document.getElementById('registroAlunos');

    registro[a.id] = "<tr><td class='td_dados'>" + a.nome + "</td><td class='td_dados'>" + a.telefone + "</td><td class='td_dados'>" + alteraEstiloData(a.nascimento) + "</td><td class='td_dados'>" + a.nota + "</td><td class='td_dados'><input class='btn_editar' id='btn_editar"+a.id+"' type='button' value='Editar' onmouseover='alteraCorBotao(\"btn_editar"+a.id+"\")' onmouseout='alteraParaCorPreviaBotao(\"btn_editar"+a.id+"\")' onclick='alterarAluno("+a.id+", registro["+a.id+"])'><input class='btn_excluir' id='btn_excluir"+a.id+"' onmouseover='alteraCorBotao(\"btn_excluir"+a.id+"\")' onmouseout='alteraParaCorPreviaBotao(\"btn_excluir"+a.id+"\")' type='button' value='Excluir' onClick='excluiRegistro(registro[" + a.id + "])'></td></tr>";

    msg += registro[a.id];
    registroAlunos.innerHTML = msg;
    
}

//Função criada para exibir campos que permitem alterar os dados de um aluno.
function alterarAluno(a, b) {

    var registroAlunos = document.getElementById('registroAlunos');
    var dadosAntigos = alunos[a];

    novoRegistro[a] = "<tr><td class='td_dados'><input id='novoNome"+a+"' type='text' value='" + dadosAntigos.nome + "'></td><td class='td_dados'><input id='novoTelefone"+a+"' type='text' value='" + dadosAntigos.telefone + "' maxlength='11'></td><td class='td_dados'><input id='novoNascimento"+a+"' type='date' value='" + dadosAntigos.nascimento + "'></td><td class='td_dados'><input id='novaNota"+a+"' type='number' value='" + dadosAntigos.nota + "' maxlength='4'></td><td id='btn_gravar_alteracoes'><input class='btn_gravar_alt' id='btn_gravar_alt"+dadosAntigos.id+"' type='button' value='Gravar' onclick='gravarAlteracoes("+a+", novoRegistro["+a+"])' onmouseover='alteraCorBotao(\"btn_gravar_alt"+dadosAntigos.id+"\")' onmouseout='alteraParaCorPreviaBotao(\"btn_gravar_alt"+dadosAntigos.id+"\")'></td></tr>";

    msg = msg.replace(b, novoRegistro[a]);
    registroAlunos.innerHTML = msg;

}

//Função que altera os dados de um aluno e exibe tais dados na tela.
function gravarAlteracoes(a, b) {

    if (confirm("Confirma a alteração dos dados?")) {
        var registroAlunos = document.getElementById('registroAlunos');

        var novoNome = document.getElementById('novoNome' + a).value;
        var novoTelefone = document.getElementById('novoTelefone' + a).value;
        var novoNascimento = document.getElementById('novoNascimento' + a).value;
        var novaNota = document.getElementById('novaNota' + a).value;

        alunos[a].nome = novoNome;
        alunos[a].telefone = novoTelefone;
        alunos[a].nascimento = novoNascimento;
        alunos[a].nota = novaNota;

        registro[alunos[a].id] = "<tr><td class='td_dados'>" + alunos[a].nome+ "</td><td class='td_dados'>" + alunos[a].telefone + "</td><td class='td_dados'>" + alteraEstiloData(alunos[a].nascimento) + "</td><td class='td_dados'>" + alunos[a].nota + "</td><td class='td_dados'><input class='btn_editar' id='btn_editar"+alunos[a].id+"' type='button'value='Editar' onmouseover='alteraCorBotao(\"btn_editar"+alunos[a].id+"\")' onmouseout='alteraParaCorPreviaBotao(\"btn_editar"+alunos[a].id+"\")' onclick='alterarAluno("+alunos[a].id+", registro["+alunos[a].id+"])'><input type='button' class='btn_excluir' id='btn_excluir"+alunos[a].id+"' value='Excluir' onmouseover='alteraCorBotao(\"btn_excluir"+alunos[a].id+"\")' onmouseout='alteraParaCorPreviaBotao(\"btn_excluir"+alunos[a].id+"\")' onClick='excluiRegistro(registro[" + alunos[a].id + "])'> </td></tr>";

        novoRegistro[a] = "";

        msg = msg.replace(b, registro[alunos[a].id]);
        registroAlunos.innerHTML = msg;

    }

}

//Função que exclui um registro de aluno.
function excluiRegistro(a) { 
    
    if(confirm("Deseja realmente excluir o registro?")) {
        var registroAlunos = document.getElementById('registroAlunos');

        msg = msg.replace(a, "");
        registroAlunos.innerHTML = msg;

    }

}

//Função que indica quais campos não estão preenchidos ao tentar se cadastrar um NOVO aluno.
function verificaSeDadosEstaoPreenchidos() {

    var nome = document.getElementById('nome');
    var telefone = document.getElementById('telefone');
    var nascimento = document.getElementById('nascimento');
    var nota = document.getElementById('nota');

    var msg_aviso_nome = document.getElementById('msg_aviso_nome');
    var msg_aviso_telefone = document.getElementById('msg_aviso_telefone');
    var msg_aviso_nascimento = document.getElementById('msg_aviso_nascimento');
    var msg_aviso_nota = document.getElementById('msg_aviso_nota');

    var mensagem = "Campo obrigatório.";

    if (nome.value == "") {
        msg_aviso_nome.innerHTML = mensagem;
    } else {
        msg_aviso_nome.innerHTML = "";
    }

    if (telefone.value == "") {
        msg_aviso_telefone.innerHTML = mensagem;
    } else {
        msg_aviso_telefone.innerHTML = ""; 
    }

    if (nascimento.value == "") {
        msg_aviso_nascimento.innerHTML = mensagem;
    } else {
        msg_aviso_nascimento.innerHTML = "";
    }

    if (nota.value == "") {
        msg_aviso_nota.innerHTML = mensagem;
    } else {
        msg_aviso_nota.innerHTML = "";
    }

    if (nome.value == "" || telefone.value == "" || nascimento.value == "" || nota.value == "") {
        return false;
    } else {
        return true;
    }

}

//Função que altera a cor de botão quando o envento 'onmouseover' é acionado.
function alteraCorBotao(id) {

    var btn= document.getElementById(id);

    btn.style.backgroundColor = "#ffffff";
    btn.style.color = "#be622d";
    btn.style.borderColor = "#be622d";

}

//Função que altera a cor de botão quando o evento 'onmouseout' é acionado.
function alteraParaCorPreviaBotao(id) {

    var btn = document.getElementById(id);

    btn.style.backgroundColor = "#be622d";
    btn.style.color = "#ffffff";
    btn.style.borderColor = "#ffffff";

}

//Função que altera o formato da data que será exibida no registro para dd/mm/aaaa.
function alteraEstiloData(data) {
    var aux = "";
    var novaData = "";
    arrayData = data.split('');
    
    var dia = arrayData[8] + arrayData[9];
    var mes = arrayData[5] + arrayData[6];
    var ano = arrayData[0] + arrayData[1] + arrayData[2] + arrayData[3];

    novaData = dia + "/" + mes + "/" + ano;
    
    return novaData;

}

//Função criada para verificar se o número inserido no campo Telefone é um número.
function verificaSeEhNumero(id, id_msg) {
    var input = document.getElementById(id);
    var aviso = document.getElementById(id_msg);

    if (isNaN(input.value)) {
        aviso.innerHTML = "Favor digitar um número válido."
        input.value = "";
    } else {
        aviso.innerHTML = "";
    }

}