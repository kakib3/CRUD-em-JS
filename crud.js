
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var clientes = [];
var atual = 0;
var proximoId = 1;

function cadastrar(quantidade){
    console.log("\n-----------------------------")
    console.log(`Cadastro do cliente ${atual + 1}`);
    console.log("-----------------------------")
    rl.question("Nome do cliente: ", (nomeRL) => {
        rl.question("CPF: ", (cpfRL) => {
            rl.question("Número celular: ", (celularRL) => {
                rl.question("Email: ", (emailRL) => {

                    let novoCliente = {
                        id: proximoId,
                        nome: nomeRL,
                        cpf: cpfRL,
                        celular: celularRL,
                        email: emailRL
                    };
                    clientes.push(novoCliente);
                    proximoId++;

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
    if (clientes.length === 0){
        console.log("\nNão há clientes cadastrados.");
        menu();
        return;
    }

    rl.question("\nUma pesquisa de cadastro específico (y/n)? ", (listarCadastroeEspecificoRL) => {
        if(listarCadastroeEspecificoRL === "y"){
            rl.question("ID a ser procurado: ", (idEspecificoRL) =>{
                let idEspecifico = Number(idEspecificoRL);
                let clienteEncontrado = clientes.find(c => c.id === idEspecifico);

                if(clienteEncontrado){
                    console.log(`\n-------------\n   ID: ${clienteEncontrado.id}\n-------------`);
                    console.log("Nome:" + clienteEncontrado.nome);
                    console.log("CPF:" + clienteEncontrado.cpf);
                    console.log("Celular:" + clienteEncontrado.celular);
                    console.log("Email:" + clienteEncontrado.email); 

                } else{
                    console.log("ID inválido ou não encontrado.");
                }

                menu();
            })
        }
        else{
            for (let i = 0; i < clientes.length; i++){
            console.log(`\n-------------\n   ID: ${clientes[i].id}\n-------------`);
            console.log("Nome:" + clientes[i].nome);
            console.log("CPF:" + clientes[i].cpf);
            console.log("Celular:" + clientes[i].celular);
            console.log("Email:" + clientes[i].email);
            }
            menu();
        }
    })
}

function atualizarCadastro(){
    if(clientes.length === 0){
        console.log("\nNão há clientes cadastrados.");
        menu();
        return;
    }

    rl.question("Digite o ID do cadastro do cliente que deseja atualizar: ", (idAtualizarRL) => {
        let idAtualizar = Number(idAtualizarRL);
        let indice = clientes.findIndex(c => c.id === idAtualizar);

        if(indice !== -1){
            rl.question("Nome do cliente: ", (novoNomeRL) => {
                clientes[indice].nome = novoNomeRL;
                rl.question("CPF: ", (novoCpfRL) => {
                    clientes[indice].cpf = novoCpfRL;
                    rl.question("Número celular: ", (novoCelularRL) => {
                        clientes[indice].celular = novoCelularRL;
                        rl.question("Email: ", (novoEmailRL) => {
                            clientes[indice].email = novoEmailRL;
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
    if(clientes.length === 0){
        console.log("\nNão há clientes cadastrados.")
        menu();
        return;
    }

    rl.question("Digite o ID do cliente que deseja excluir: ", (idExcluirRL) => {
        let idExcluir = Number(idExcluirRL);
        let indice = clientes.findIndex(c => c.id === idExcluir);
        
        if(indice !== -1){
            clientes.splice(indice, 1);

            console.log("Cadastro excluído com sucesso.");
            menu();

        } else{
            console.log("ID inválido!\n")
            menu();
        }

    })
}

function menu(){
    console.log("\n------------------- CADASTRO DE CLIENTES -------------------")
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