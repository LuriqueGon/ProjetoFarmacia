const SetLocalStorage = (dbTempItem) => localStorage.setItem("dbItem", JSON.stringify(dbTempItem))
const GetLocalStorage = () =>JSON.parse(localStorage.getItem('dbItem'))??[]

let IndexStop = null
let CDB = null

function Consultar(){
    if(document.querySelector('#consultaCDB').value != ""){

        PegarDados()      
        
    }else{
        alert('\t\t\tErr \n \nCodigo de barra Inacessivel!\n')
    }
    Cancelar()
}

function Cancelar(){
    document.querySelector('#consultaCDB').value = ""
    document.querySelector('#consultaCDB').focus()
}

function PegarDados(){
    const TempItem = GetLocalStorage()


    AnalisarItens(TempItem)    
}

function AnalisarItens(){

    const TempItem = GetLocalStorage()
    CDB = document.querySelector('#consultaCDB').value

    for(let i = 0; i < TempItem.length; i++){

        console.log(TempItem[i])

        if(TempItem[i].CDB == CDB){

            IndexStop = i
            EnviarTabela()

            return IndexStop,CDB

        }
    }

    if(IndexStop == null){
        alert("Item não encontrado no Estoque")
    }

}

function EnviarTabela(){

    const TempItem = GetLocalStorage()
    TempItem[IndexStop]


    const tBody = document.querySelector('#tBody')
    tBody.innerHTML = ""


    tBody.innerHTML += `<tr><td>${TempItem[IndexStop].prodName}</td><td>${TempItem[IndexStop].CDB}</td><td>R$ ${TempItem[IndexStop].valorUni}</td></td><td>${TempItem[IndexStop].Quant}</td></tr>`
    
    

}

Cancelar()

document.body.addEventListener('keydown', function(e){
    let Key = e.keyCode
    if(Key == 13){
        Consultar()
    }
    if(Key == 27){
        Cancelar()
    }
})