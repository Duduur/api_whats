const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next)=>{
    //Permissão de acesso para quem irá chamar a API
    response.header('Access-Control-Allow-Origin', '*')

    //Permissão de acesso para quais métodos a API irá responder 
    response.header('Access-Control-Allow-Methods', 'GET')

    //Ativa as configurações do header para o cors
    app.use(cors())

    next()
})

const whatsapp = require('./modulo/funcoes.js')


//EndPoint para retornar todos os dados pessoais filtrando pelo usuário
app.get('/v1/whatsapp/pessoais/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let telefone = request.query.number

    let dados = whatsapp.getListaContatos(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})


//EndPoint para retornar todos os dados de profile filtrando pelo usuário
app.get('/v1/whatsapp/profile/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let telefone = request.query.number

    let dados = whatsapp.getFlitroUsuario(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})


//EndPoint para retornar todos os contatos filtrando pelo usuário
app.get('/v1/whatsapp/contatos/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let telefone = request.query.number

    let dados = whatsapp.getDadosContatos(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})


//EndPoint para retornar todos os contatos filtrando pelo usuário
app.get('/v1/whatsapp/conversas/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let telefone = request.query.number

    let dados = whatsapp.getContatosUsuario(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})


//EndPoint filtrando as conversas pelo usuário e nome do contato
app.get('/v1/whatsapp/usuario-contato/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let telefone = request.query.number
    let contato = request.query.nome

    let dados = whatsapp.getFlitroUsuario(telefone, contato)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})


//EndPoint filtrando a palavra chave de  uma conversa de determinado contato e usuário
app.get('/v1/whatsapp/palavra-chave/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let telefone = request.query.number
    let contato = request.query.nome
    let palavraChave = request.query.palavra

    let dados = whatsapp.getPalavraChave(telefone, contato, palavraChave)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})