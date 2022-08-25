'use strict'

let Edit = false
let IndexEdit = null

const SetLocalStorage = (dbTempItem) => localStorage.setItem("dbItem", JSON.stringify(dbTempItem))
const GetLocalStorage = () =>JSON.parse(localStorage.getItem('dbItem'))??[]

// CREATE

function CreateItem (Item) {
    const dbTempItem = GetLocalStorage()
    if(ChecarItem(Item) == true){
        dbTempItem.push(Item)
        SetLocalStorage(dbTempItem)        
        CreateTable(dbTempItem)
    }
}

function CreateTable(dbTempItem) {
    const tBody = document.querySelector('#tBody')
    tBody.innerHTML = ""

    if(dbTempItem[0] != ""){
        for(let i = 0; i<dbTempItem.length; i++){
            console.log(i)
            console.log(dbTempItem.length)
            console.log(dbTempItem[i])
            tBody.innerHTML += `<tr><td>${i}</td><td>${dbTempItem[i].prodName}</td><td>${dbTempItem[i].CDB}</td><td>${dbTempItem[i].Quant}</td><td>R$ ${dbTempItem[i].valorUni.toFixed(2)}</td><td>R$ ${(dbTempItem[i].Quant * dbTempItem[i].valorUni).toFixed(2)}</td><td class="Icon"><i class="fa-solid fa-pen-to-square" id="Edit" onclick="Editar(${i})"></i><i class="fa-solid fa-xmark" id="Remove" onclick="Remover(${i})"></i></td></tr>`            
        }
    }
    
}

// Layout

function SepararDados(){

    let prodName = document.querySelector('#EstoqueName').value 
    let CDB = document.querySelector('#EstoqueCBD').value 
    let quant = Number(document.querySelector('#EstoqueQuant').value)
    let valorUni = Number(document.querySelector('#EstoqueValue').value)

    if(Edit == false){    
        if(IsValid(prodName, CDB, quant, valorUni) == true){

            const layoutTempItem = {
                prodName : prodName,
                CDB : CDB,
                Quant : quant,
                valorUni : valorUni 
            }
        
            CreateItem(layoutTempItem)
            Cancelar()

        }else{
            alert("Há Algum dado errado, ou ausente")
        }

    }else{
        if(IsValid(prodName, CDB, quant, valorUni) == true){

            const layoutTempItem = {
                prodName : prodName,
                CDB : CDB,
                Quant : quant,
                valorUni : valorUni 
            }

            UpdateItem(IndexEdit, layoutTempItem)
            Cancelar()
            Edit = false

        }else{
            alert("Há Algum dado errado, ou ausente")
        }
        
    }

    IndexEdit = null
    

    AlterarButton()
    
}

function Cancelar(){
    document.querySelector('#EstoqueName').value = ""
    document.querySelector('#EstoqueCBD').value = ""
    document.querySelector('#EstoqueQuant').value = ""
    document.querySelector('#EstoqueValue').value = ""
    document.querySelector('#EstoqueCBD').focus()
    Edit = false
    IndexEdit = null
    AlterarButton()
}

function Editar(i){

    Edit = true
    AlterarButton()

    const dbTempItem = GetLocalStorage()

    document.querySelector('#EstoqueName').value = dbTempItem[i].prodName
    document.querySelector('#EstoqueCBD').value = dbTempItem[i].CDB
    document.querySelector('#EstoqueQuant').value = dbTempItem[i].Quant
    document.querySelector('#EstoqueValue').value =  dbTempItem[i].valorUni   

    return IndexEdit = i
}

function Remover(i){
    if(confirm("Você tem certeza que deseja apagar o item ", i, "Do seu Estoque?")){
        const dbTempItem = GetLocalStorage()
        dbTempItem.splice(i, 1)
        console.log(dbTempItem)
        SetLocalStorage(dbTempItem)
        OnloadCreateTable()
        document.querySelector('#EstoqueCBD').focus()
    }    
}

function UpdateItem(i, Item){
    const dbTempItem = GetLocalStorage()
    dbTempItem[i] = Item
    SetLocalStorage(dbTempItem)
    OnloadCreateTable()
}

function AlterarButton(){
    if(Edit == false){
        document.querySelector('#AddEdit').textContent = "Adicionar"
    }else{
        document.querySelector('#AddEdit').textContent = "Editar"
    }
}

// Config

function ChecarItem (Item){

    const dbTempItem = GetLocalStorage()

    for(let i = 0; i<dbTempItem.length; i++){

        if(dbTempItem[i].prodName.toUpperCase() == Item.prodName.toUpperCase()){
            if(!confirm("Já existe um Item com esse Nome, deseja Realmente Adiciona-lo??")){
                return false
            }
        }
        

        if(dbTempItem[i].CDB == Item.CDB){
            alert("Já existe um Item com esse Codigo de Barrra, deseja Realmente Adiciona-lo??")   
            return false            
        }

    }
    return true
}

function IsValid(prodName, CDB, quant, valorUni){
    if(prodName != "" && CDB != "" && quant != "" && valorUni != ""){
        return true
    }else{
        return false
    }
}

function OnloadCreateTable (){
    const dbTempItem = GetLocalStorage()
    CreateTable(dbTempItem)
    document.querySelector('#EstoqueCBD').focus()
}
OnloadCreateTable()

document.body.addEventListener('keydown', function(e){
    let Key = e.keyCode
    // console.log(Key)
    if(Key == 13){
        SepararDados()
    }
    if(Key == 27){
        Cancelar()
    }
})