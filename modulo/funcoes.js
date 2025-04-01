/******************************************************************************************************************
 * Objetivo: API para retornar dados do Whatszapp
 * Data: 04/02/2025
 * Autor: Eduardo
 * Versão: 1.0
******************************************************************************************************************/

var contatos = require('./contatos')

const getListaContatos = function(number){
    let listaContato = contatos.contatos
    let contatosJSON = {}
    let telefone = String(number)
    let status = false
    
    listaContato['whats-users'].forEach(function(itemC){
       if(String(itemC.number)== telefone){
            status = true
            contatosJSON.accont = itemC.account
            contatosJSON.create_since = itemC['created-since']
            contatosJSON.number = itemC.number
       }
    })
    if(status == true){
        return contatosJSON
    }else{
        return false
    }
}

const getDadosContatos = function(number){
    let listaContato = contatos.contatos
    let contatosJSON1 = []
    let telefone = String(number)
    let status = false
   

    listaContato['whats-users'].forEach(function(item){
        if(String(item.number) == telefone){
            status = true
            contatosJSON1.push({
                nickname : item.nickname,
                profile_image : item['profile-image'],
                background : item.background
            })
 
        }
    })
    if(status == true){
        return contatosJSON1
    }else{
        return false
    }
}

const getContatosUsuario = function(number){
    let listaContato = contatos.contatos
    let contatosJSON = []
    let telefone = String(number)
    let status = false
   

    listaContato['whats-users'].forEach(function(itemC){
        if(String(itemC.number)== telefone){
            listaContato = itemC.contacts
            itemC.contacts.forEach(function(item){
                    status = true
                    let listaContatos = {
                    name : item.name,
                    description : item.description,
                    image : item.image
                }
                contatosJSON.push(listaContatos)

        })
        }
        
    })
    if(status == true){
        return contatosJSON
    }else{
        return false
    }
}

const getConversasUsuarios = function(number){
    let listaContato = contatos.contatos
    let contatosJSON = []
    let telefone = String(number)
    let status = false

    listaContato['whats-users'].forEach(function(itemC){
        if(String(itemC.number) == telefone){
            listaContato = itemC.contacts
            itemC.contacts.forEach(function(item){
                status = true
                let listaConversa = {
                    usuario : itemC.account,
                    numero : itemC.number,
                    nome : item.name,
                    descricao : item.description,
                    imagem : item.image,
                    mensagens : item.messages
                }
                contatosJSON.push(listaConversa)
            })
        }
    })
    if(status == true){
        return contatosJSON
    }else{
        return false
    }
}

const getFlitroUsuario = function(number, conversa){
   let listaContato = contatos.contatos
   let usuario = String(number) .toUpperCase()
   let contato = String(conversa).toUpperCase()
   let contatosJSON = []
   let status = false
   let nomeUsuario 

   listaContato['whats-users'].forEach(function(itemUsuario){
        listaContato = itemUsuario.contacts
        nomeUsuario = itemUsuario.account
        if(String(itemUsuario.number) == usuario){
            itemUsuario.contacts.forEach(function(itemMensagem){
                itemUsuario = itemMensagem.messages
                if(String(itemMensagem.name).toUpperCase() == contato){
                    status = true
                    let listaConversa = {
                        usuario : nomeUsuario,
                        nome : itemMensagem.name,
                        mensagens : itemMensagem.messages
                    }
                    contatosJSON.push(listaConversa)
                }
            })
        }
   })
   if(status == true){
        return contatosJSON
   }else{
        return false
   }
  

}
const getPalavraChave = function(number,conversa,palavra){
    let listaContato = contatos.contatos
    let usuario = String(number).toUpperCase()
    let contato = String(conversa).toUpperCase()
    let chave = String(palavra).toUpperCase()
    let contatosJSON = []
    let status = true
    let pessoa

    listaContato['whats-users'].forEach(function(itemUsuario){
        listaContato = itemUsuario.contacts
        if(String(itemUsuario.number) == usuario){
            itemUsuario.contacts.forEach(function(itemMensagem){
                pessoa = itemMensagem.name
                if(String(pessoa).toUpperCase() == contato){
                    itemMensagem.messages.forEach(function(itemChave){
                        itemMensagem = itemChave.content
                        if(String(itemMensagem).toUpperCase().includes(chave)){
                            let listaDados = {
                                usuario : itemUsuario.account,
                                contato : itemMensagem.name,
                                mensagens : itemChave.content
                            }   
                            contatosJSON.push(listaDados)
                        }

                    })
                }
            })
        }
    })
    if(status == true){
        return contatosJSON
   }else{
        return false
   }
}

module.exports ={
    getListaContatos,
    getDadosContatos,
    getContatosUsuario,
    getConversasUsuarios,
    getFlitroUsuario,
    getPalavraChave
}

//console.log(getListaContatos('11987876567'))
//console.log(getDadosContatos('11987876567'))
//console.log(getContatosUsuario('11987876567'))
//console.log(getConversasUsuarios('11987876567'))
//console.log(getFlitroUsuario('11987876567', 'Ana Maria'))
//console.log(getPalavraChave('11987876567', 'Ana Maria', 'leonid'))