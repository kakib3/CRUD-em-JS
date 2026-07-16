const { ClientRequest } = require('http');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var cliente = {
    nome: [],
    CPF: [],
    celular: [],
    email: []
};

/*
const cliente = {
    nome: nomeRL,
    CPF: cpfRL,
    celular: celularRL,
    email: emailRL
};*/

var atual = 0;

function cadastrar(quantidade){
    console.log("\n-----------------------------")
    console.log(`Cadastro do cliente ${atual + 1}`);
    console.log("-----------------------------")
    rl.question("Nome do cliente: ", (nomeRL) => {
        cliente.nome.push(nomeRL);
        rl.question("CPF: ", (cpfRL) => {
            cliente.CPF.push(cpfRL);
            rl.question("Número celular: ", (celularRL) => {
                cliente.celular.push(celularRL);
                rl.question("Email: ", (emailRL) => {
                    cliente.email.push(emailRL);
                    atual++;
                    if(atual < quantidade){
                        return cadastrar(quantidade);
                    }
                    else{
                        atual = 0;
                        menu();
                    }
                })
            })
        })
    })
}

function listarCadastros(){
    if (cliente.nome.length === 0){
        console.log("\nNão há clientes cadastrados.");
        menu();
    }

    rl.question("\nUma pesquisa de cadastro específico (y/n)? ", (listarCadastroeEspecificoRL) => {
        if(listarCadastroeEspecificoRL === "y"){
            rl.question("ID a ser procurado: ", (idEspecificoRL) =>{
                let idEspecifico = Number(idEspecificoRL);
                if(idEspecifico >= 0 && idEspecifico < cliente.nome.length){
                    console.log(`\n-------------\n   ID: ${idEspecifico}\n-------------`);
                    console.log("Nome:" + cliente.nome[idEspecifico]);
                    console.log("CPF:" + cliente.CPF[idEspecifico]);
                    console.log("Celular:" + cliente.celular[idEspecifico]);
                    console.log("Email:" + cliente.email[idEspecifico]);                    
                } else{
                    console.log("ID inválido ou não encontrado.");
                }
                menu();
            })
        }
        else{
            for (let i = 0; i < cliente.nome.length; i++){
            console.log(`\n-------------\n   ID: ${i}\n-------------`);
            console.log("Nome:" + cliente.nome[i]);
            console.log("CPF:" + cliente.CPF[i]);
            console.log("Celular:" + cliente.celular[i]);
            console.log("Email:" + cliente.email[i]);
            }
            menu();
        }
    })
}

function atualizarCadastro(){
    if(cliente.nome.length === 0){
        console.log("\nNão há clientes cadastrados.");
        menu();
    }

    rl.question("Digite o ID do cadastro do cliente que deseja atualizar: ", (idAtualizarRL) => {
        let idAtualizar = Number(idAtualizarRL);
        if(idAtualizar >= 0 && idAtualizar < cliente.nome.length){
            rl.question("Nome do cliente: ", (novoNomeRL) => {
                cliente.nome[idAtualizar] = novoNomeRL;
                rl.question("CPF: ", (novoCpfRL) => {
                    cliente.CPF[idAtualizar]= novoCpfRL;
                    rl.question("Número celular: ", (novoCelularRL) => {
                        cliente.celular[idAtualizar] = novoCelularRL;
                        rl.question("Email: ", (novoEmailRL) => {
                            cliente.email[idAtualizar] = novoEmailRL;
                            menu();
                        })
                     })
                })
            })

        } else{
            console.log("ID inválido!\n")
            menu();
        }

    })
}

function excluirCadastro(){
    if(cliente.nome.length === 0){
        console.log("\nNão há clientes cadastrados.")
        menu();
    }

    rl.question("Digite o ID do cliente que deseja excluir: ", (idExcluirRL) => {
        let idExcluir = Number(idExcluirRL);
        if(idExcluir >= 0 && idExcluir < cliente.nome.length){
            cliente.nome.splice(idExcluir, 1);
            cliente.CPF.splice(idExcluir, 1);
            cliente.celular.splice(idExcluir, 1);
            cliente.email.splice(idExcluir, 1);

            console.log("Cadastro excluído com sucesso.");
            menu();

        } else{
            console.log("ID inválido!\n")
            menu();
        }

    })
}

function menu(){
    console.log("\n------------------- CADASTROS DE CLIENTES -------------------")
    console.log("1 - Cadastro de clientes");
    console.log("2 - Mostrar cadastros");
    console.log("3 - Atualizar cadastro");
    console.log("4 - Excluir cadastro");
    console.log("5 - Sair");
    console.log("-------------------------------------------------------------\n")

    rl.question("Digite o número da ação: ", (escolhaAcaoRL) => {
    
        const escolhaAcao = Number(escolhaAcaoRL);

        switch(escolhaAcao){
        
            case 1:
                rl.question("\nQuantos clientes deseja cadastrar? ", (quantiRL) => {
                    const quantidade = Number(quantiRL);
                    if(quantidade <= 0){
                        rl.question("\nNão vai cadastrar niguém (y/n)? ", (naocadastro) => {
                            if(naocadastro === 'y' || naocadastro === 'Y'){
                                console.log("Adeus!");
                                rl.close(); 
                            } else{
                                console.log("Voltando para tela de cadastro...");
                                menu();
                            }
                        })
                    } else{
                        cadastrar(quantidade);
                    }
                })
                break;
            
            case 2:
                listarCadastros();
                break;

            case 3:
                atualizarCadastro();
                break;

            case 4:
                excluirCadastro();
                break;
        
            case 5:
                console.log("\nBye-bye, Miss American Pie...");
                console.log("Atividade finalizada.");
                rl.close();
                break;
          }
    })
}

menu();