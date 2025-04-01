/*********************************************************************************************************************************************************************************
 *Objetivo: Criar uma APi para o projeto Whatsapp
 *Data: 28/01/2025
 *Autor: Eduardo
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

const listaC = require('./contatos')

const getDadosPessoaisUsuario = function(number){
    let telefone = Number(number)
    let listaContatos = listaC.contatos
    let dadosContato
    let dadosPessoais = {}
    let status = false

    listaContatos['whats-users'].forEach(function(dados){
        dadosContato = dados.number 
        if(Number(dadosContato) == telefone){
            status = true 
            dadosPessoais.usuario = dados.account
            dadosPessoais.numero = dados.number
            dadosPessoais.data_de_criacao = dados['created-since']
        }
    })

    if(status == true){
        return dadosPessoais
    }else{
        return status
    }
}

const getDadosProfileUsuario = function(number){
    let telefone = Number(number)
    let listaContatos = listaC.contatos
    let dadosContato
    let dadosProfile = {}
    let status = false

    listaContatos['whats-users'].forEach(function(dados){
        dadosContato = dados.number 
        if(Number(dadosContato) == telefone){
            status = true
            dadosProfile.nickname = dados.nickname
            dadosProfile.imagem = dados['profile-image']
            dadosProfile.cor_fundo = dados.background
        }
    })

    if(status == true){
        return dadosProfile
    }else{
        return status
    }
}

const getDadosContatoUsuario = function(number){
    let telefone = Number(number)
    let listaContatos = listaC.contatos
    let dadosContato
    let informacoes = []
    let status = false

    listaContatos['whats-users'].forEach(function(dados){
        dadosContato = dados.number 
        if(Number(dadosContato) == telefone){
            dados.contacts.forEach(function(item){
                status = true
                let contatosUsuario = {}
                contatosUsuario.usuario = dados.account
                contatosUsuario.contato = item.name
                contatosUsuario.foto_contato = item.image
                contatosUsuario.descricao_contato = item.description

                informacoes.push(contatosUsuario)
            })
        }
    })

    if(status == true){
        return informacoes
    }else{
        return status
    }
}

const getConversasUsuario = function(number){
    let telefone = Number(number)
    let listaContatos = listaC.contatos['whats-users']
    let dadosContato
    let conversas = []
    let status = false

    listaContatos.forEach(function(dados){
        dadosContato = dados.number 
            if(Number(dadosContato) == telefone){
                dados.contacts.forEach(function(item){
                    status = true
                    let dadosMensagens = {}
                    dadosMensagens.usuario = dados.account
                    dadosMensagens.contato = item.name
                    dadosMensagens.descricao = item.description
                    dadosMensagens.imagem = item.image 
                    dadosMensagens.mensagens = item.messages
                    conversas.push(dadosMensagens)

                })
            }
        
    })

    if(status == true){
        return conversas
    }else{
        return status
    }
}

const getFiltroContato = function(number, nomeContato){
    let usuario = Number(number)
    let contato = String(nomeContato).toUpperCase()
    let listaContatos = listaC.contatos['whats-users']
    let dadosUser
    let dadosContato
    let conversas = []
    let status = false


    listaContatos.forEach(function(dados){
        dadosUser = dados.number
            if(Number(dadosUser) == usuario){
                dados.contacts.forEach(function(item){
                    dadosContato = item.name
                    if(String(dadosContato).toUpperCase() == contato){
                        status = true
                        let dadosMensagens = {}
                        dadosMensagens.usuario = dados.account
                        dadosMensagens.contato = item.name
                        dadosMensagens.mensagens = item.messages
                        conversas.push(dadosMensagens)
                    }
                })  
            }
    })

    if(status == true){
        return conversas
    }else{
        return status
    }

}

const getPalavraChave = function(number, nomeContato, chave){
    let usuario = Number(number)
    let contato = String(nomeContato).toUpperCase()
    let palavra = String(chave).toUpperCase()
    let listaContatos = listaC.contatos['whats-users']
    let dadosUser
    let dadosContato
    let dadosMensagem
    let mensagemSelecionada = []
    let status = false

    listaContatos.forEach(function(dados){
        dadosUser = dados.number
            if(Number(dadosUser) == usuario){
                dados.contacts.forEach(function(item){
                    dadosContato = item.name
                    if(String(dadosContato).toUpperCase() == contato){
                        item.messages.forEach(function(informacao){
                            dadosMensagem = informacao.content
                            if(String(dadosMensagem).toUpperCase().includes(palavra)){
                                status = true 
                                let informacoes = {}
                                informacoes.usuario = dados.account
                                informacoes.contato = item.name
                                informacoes.palavra_chave = palavra 
                                informacoes.mensagem = informacao.content

                                mensagemSelecionada.push(informacoes)
                            }
                        })
                    }
                })
            }
    })

    if(status == true){
        return mensagemSelecionada
    }else{
        return status
    }
}

module.exports = {
    getDadosPessoaisUsuario,
    getDadosProfileUsuario,
    getDadosContatoUsuario,
    getConversasUsuario,
    getFiltroContato,
    getPalavraChave
}
