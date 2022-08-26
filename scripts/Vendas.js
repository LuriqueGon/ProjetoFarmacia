const SetLocalStorage = (dbTempItem) => localStorage.setItem("TempListItem", JSON.stringify(dbTempItem))
const GetLocalStorage = () =>JSON.parse(localStorage.getItem('dbItem'))??[]
const GetLocalStorageTemp = () =>JSON.parse(localStorage.getItem('TempListItem'))??[]

let IndexStop = null
let CDBRange = 13
let IsValid = false

function AtualizarProdutos(){
    if(String(document.querySelector('#vendasCDB').value.length) == CDBRange){        

        let CDB = document.querySelector('#vendasCDB').value

        if(AnalisarDados(CDB) == true){
            document.querySelector('#vendasCDB').disabled = true
            document.querySelector('#vendasCDB').classList.add('disable')
            CompletarProduto()
        }else{
            alert("Item não Encontrado nos Dados")
            Cancelar()
        }

    }
}

function AnalisarDados(CDB){
    const TempItem = GetLocalStorage()

    for(let i = 0; i<TempItem.length; i++){
        if(CDB == TempItem[i].CDB){
            IndexStop = i
            IsValid = true
            return IndexStop, IsValid, true
        }
    }
    return false

}

function CompletarProduto(){
    const TempItem = GetLocalStorage()[IndexStop]
    console.log(TempItem)

    document.querySelector('#ProdutoName').value = TempItem.prodName
    document.querySelector('#ProdutoValor').value = `R$ ${TempItem.valorUni}    `

}

function AdicionarItem(){
    if(IsValid == true){
        Quant = Number(document.querySelector('#ProdutoQuantidade').value)
        if(Quant <= 0){
            Quant = 1
        }    
    
        let TempItem = GetLocalStorage()[IndexStop]
        TempItem.QuantVendas = Quant
        const TempItemList = GetLocalStorageTemp()
        TempItemList.push(TempItem)
        SetLocalStorage(TempItemList)
        console.log(TempItemList)

        AtualizarTabela()



    }else{
        alert("Só pode adicionar itens que estão no Estoque")
    }
    


}

function Cancelar(){
    IndexStop = null
    document.querySelector('#ProdutoQuantidade').value = ""
    document.querySelector('#ProdutoName').value = ""
    document.querySelector('#ProdutoValor').value = ""
    document.querySelector('#vendasCDB').value = ""
    document.querySelector('#vendasCDB').disabled = false
    document.querySelector('#vendasCDB').classList.remove('disable')
}

function LimparVendar(){
    localStorage.removeItem('TempListItem')
    AtualizarTabela()
}

function AtualizarTabela(){

    // 2526954102122

    const TempItemList = GetLocalStorageTemp()
    const tBody = document.querySelector('#tBody')
    tBody.innerHTML = ""

    console.log(TempItemList)

    if(TempItemList != []){
        
        for(let i=0; i<TempItemList.length; i++){
            tBody.innerHTML += `<tr><td>${i}</td><td>${TempItemList[i].prodName}</td><td>R$ ${TempItemList[i].valorUni.toFixed(2)}</td><td>${TempItemList[i].QuantVendas}</td><td>R$ ${(TempItemList[i].valorUni * TempItemList[i].QuantVendas).toFixed(2)}</td><td class="Icon"><i class="fa-solid fa-pen-to-square" id="Edit${i}" ></i><i class="fa-solid fa-xmark" id="Remove${i}"></i></td></tr>`
        }
        AtualizarSoma()
        Cancelar()
    }


}

function AtualizarSoma(){
    const TempItemList = GetLocalStorageTemp()    

    let soma = 0

    for(let i=0; i<TempItemList.length; i++){
        soma += (TempItemList[i].valorUni * TempItemList[i].QuantVendas)
    }

    document.querySelector('#total').textContent = soma.toFixed(2)
}

function FinalizarCompras(){

}

document.querySelector('#vendasCDB').addEventListener('keypress', function(e){
    console.log(e.key)
    switch (e.key) {
        case '0':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '1':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '2':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '3':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '4':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '5':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '6':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '7':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '8':
            AtualizarProdutos()
            console.log("ATT")
            break;
        case '9':
            AtualizarProdutos()
            console.log("ATT")
            break;
        
        default:
            break;
    }
    
})

document.body.addEventListener('keyup', function(e){
    // console.log(e.keyCode)
    if(e.keyCode == 13 ){
        AdicionarItem()
    }
    if(e.keyCode == 17 || e.keyCode == 86 ){
        AtualizarProdutos()
    }
})

AtualizarTabela()