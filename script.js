'use strict'

const message = document.getElementById('message')

async function contatosUsuario() {
    const url = 'http://localhost:8080/v1/whatsapp/conversas/filtro?number=11966578996'

    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarContato(link){
    const nomeText = document.createElement('p')
    nomeText.textContent = link.nickname

    message.appendChild(nomeText)
}

async function preencherContatos (){
    const contato = await contatosUsuario()

    contato.forEach(criarContato)
}

preencherContatos()
