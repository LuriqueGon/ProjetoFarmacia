const SetLocalStorage = (dbTempItem) => localStorage.setItem("TempListItem", JSON.stringify(dbTempItem))
const GetLocalStorage = () =>JSON.parse(localStorage.getItem('dbItem'))??[]
const GetLocalStorageTemp = () =>JSON.parse(localStorage.getItem('TempListItem'))??[]

let IndexStop = null
let CDBRange = 13
let IsValid = false
let IsExistedItem = false
let Edit = false
let EditIndex = null
let SomaFinal = null
let Data = new Date
let Hora = new Date
let FimDeVendas = ""

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
    const TempItem = GetLocalStorage() //ESTOQUE

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

    const TempItem = GetLocalStorage()[IndexStop] //ITEM DO ESTOQUE ESCOLHIDO

    document.querySelector('#ProdutoName').value = TempItem.prodName
    document.querySelector('#ProdutoValor').value = `R$ ${TempItem.valorUni}    `
    document.querySelector('#ProdutoQuantidade').focus()
}






function AdicionarItem(){
    if(Edit == false){
        if(IsValid == true){ //Existir no ESTOQUE

            Quant = Number(document.querySelector('#ProdutoQuantidade').value)
    
            if(Quant <= 0){
                Quant = 1
            }    
    
            IsExisted(Quant)
            if(IsExistedItem == true){
                console.log('Item Existe')
                AtualizarTabela()
    
            }else{       
                console.log("Item não Existe")
    
                //DEFINIR QUANTIDADE DE ITENS SELECIONADOS ^
            
                let TempItem = GetLocalStorage()[IndexStop] //ITEM SELECIONADO DO ESTOQUE
                TempItem.QuantVendas = Quant
    
                const TempItemList = GetLocalStorageTemp()
                TempItemList.push(TempItem)
    
                SetLocalStorage(TempItemList)
                AtualizarTabela()
    
            }
    
    
        }else{
            alert("Só pode adicionar itens que estão no Estoque")
        }
        
    }else{
        let Quant = Number(document.querySelector('#ProdutoQuantidade').value)

        UpdateItem(EditIndex, Quant)
    }
    


}

function IsExisted(Quant){

    let TempItem = GetLocalStorage()[IndexStop] //ITEM SELECIONADO DO ESTOQUE
    const TempItemList = GetLocalStorageTemp()

    for(let i=0; i<TempItemList.length; i++){
        console.log("Entrou")
        if(TempItemList[i].CDB == TempItem.CDB){

            console.log(TempItemList[i])
            TempItemList[i].QuantVendas += Quant
            SetLocalStorage(TempItemList)   
            IsExistedItem = true         
            return IsExistedItem, true
        }
    }

    return false
}

function Cancelar(){
    IndexStop = null
    document.querySelector('#ProdutoQuantidade').value = ""
    document.querySelector('#ProdutoName').value = ""
    document.querySelector('#ProdutoValor').value = ""
    document.querySelector('#vendasCDB').value = ""
    document.querySelector('#vendasCDB').disabled = false
    document.querySelector('#vendasCDB').classList.remove('disable')
    IsExistedItem = false
    document.querySelector('#btn1').textContent = "Adicionar"
    Edit = false
    EditIndex = null
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

    if(TempItemList != []){
        
        for(let i=0; i<TempItemList.length; i++){
            tBody.innerHTML += `<tr><td>${i}</td><td>${TempItemList[i].prodName}</td><td>R$ ${TempItemList[i].valorUni.toFixed(2).toString().replace('.',',')}</td><td>${TempItemList[i].QuantVendas}</td><td>R$ ${(TempItemList[i].valorUni * TempItemList[i].QuantVendas).toFixed(2).toString().replace('.',',')}</td><td class="Icon"><i class="fa-solid fa-pen-to-square" id="Edit${i}" onclick="Editar(${i})"></i><i class="fa-solid fa-xmark" id="Remove${i}"onclick="Remover(${i})"></i></td></tr>`
        }
        AtualizarSoma(document.querySelector('#total'))
        Cancelar()
    }


}

function AtualizarSoma(locage){
    const TempItemList = GetLocalStorageTemp()    

    let soma = 0

    for(let i=0; i<TempItemList.length; i++){
        soma += (TempItemList[i].valorUni * TempItemList[i].QuantVendas)
    }

    locage.textContent = soma.toFixed(2).toString().replace('.',',').toString().replace('.',',')
    return soma
}

document.querySelector('#vendasCDB').addEventListener('keypress', function(e){
    console.log(e.key)
    switch (e.key) {
        case '0':
            AtualizarProdutos()            
            break;
        case '1':
            AtualizarProdutos()            
            break;
        case '2':
            AtualizarProdutos()            
            break;
        case '3':
            AtualizarProdutos()            
            break;
        case '4':
            AtualizarProdutos()            
            break;
        case '5':
            AtualizarProdutos()            
            break;
        case '6':
            AtualizarProdutos()            
            break;
        case '7':
            AtualizarProdutos()            
            break;
        case '8':
            AtualizarProdutos()            
            break;
        case '9':
            AtualizarProdutos()            
            break;
        
        default:
            break;
    }
    
})

function Editar(i){

    document.querySelector('#ProdutoQuantidade').focus()

    document.querySelector('#btn1').textContent = "Editar"
    EditIndex = i
    Edit = true

    const TempItemList = GetLocalStorageTemp()[i]

    document.querySelector('#ProdutoQuantidade').value = TempItemList.QuantVendas
    document.querySelector('#ProdutoName').value = TempItemList.prodName
    document.querySelector('#ProdutoValor').value = TempItemList.valorUni
    document.querySelector('#vendasCDB').value = TempItemList.CDB

    document.querySelector('#vendasCDB').disabled = true
    document.querySelector('#vendasCDB').classList.add('disable')

    return EditIndex, Edit
}

function UpdateItem(i, Quant){
    let TempItemList = GetLocalStorageTemp()
    TempItemList[i].QuantVendas = Quant
    SetLocalStorage(TempItemList)
    AtualizarTabela()
}

function Remover(i){
    if(confirm("Você tem certeza que deseja apagar o item? " )){
        const TempItemList = GetLocalStorageTemp()  
        TempItemList.splice(i, 1)
        SetLocalStorage(TempItemList)
        AtualizarTabela()
        document.querySelector('#vendasCDB').focus()
    }
}

document.body.addEventListener('keyup', function(e){
    // console.log(e.keyCode)
    if(e.keyCode == 13 ){
        AdicionarItem()
    }
    if(e.keyCode == 17 || e.keyCode == 86 ){
        AtualizarProdutos()
    }
})

function FinalizarCompras(){
    document.querySelector('.modal').classList.add('FinalizarVendas')
    document.querySelector('header').classList.add('FinalizarVendas')
    GerirNota()
    GerirDataHora()
}

function GerirNota(){
    const TempItemList = GetLocalStorageTemp()
    const tBody = document.querySelector('#tBodyPrint')
    tBody.innerHTML = ""

    for(let i=0; i<TempItemList.length; i++){
        tBody.innerHTML += ` <tr><td>${i}</td><td>${TempItemList[i].CDB}</td><td>${TempItemList[i].QuantVendas} Uni  ${TempItemList[i].prodName}</td><td>R$ ${(TempItemList[i].QuantVendas * TempItemList[i].valorUni).toFixed(2).toString().replace('.',',')}</td></tr>`
    }
    AtualizarSoma(document.querySelector('#ValorTotalPrint'))

}

function GerirDataHora(){
    // Data = `${Data.getDate()} / ${Data.getMonth()+1} / ${Data.getFullYear()}`
    // Hora = `${Hora.getHours()} : ${Hora.getMinutes()}`
    let DataNow = ""
    let HoraNow = ""
    if(Data.getDate() < 10){
        DataNow = `0${Data.getDate()} /`
    }else{
        DataNow = `${Data.getDate()} /`
    }
    if(Data.getMonth()+1 < 10){
        DataNow += ` 0${Data.getMonth()+1} /`
    }else{
        DataNow += ` ${Data.getMonth()+1} /`
    }

    DataNow += ` ${Data.getFullYear()}`

    if(Hora.getHours() < 10){
        HoraNow = `0${Data.getHours()} :`
    }else{
        HoraNow = `${Data.getHours()} :`
    }
    if(Hora.getMinutes() < 10){
        HoraNow += ` 0${Hora.getMinutes()}`
    }else{
        HoraNow += ` ${Hora.getMinutes()}`
    }

    console.log(HoraNow)
    document.querySelector('#DataPrint').textContent = DataNow
    document.querySelector('#HoraPrint').textContent = HoraNow
}

function CancelarModal(){
    document.querySelector('.modal').classList.remove('FinalizarVendas')
    document.querySelector('header').classList.remove('FinalizarVendas')
}

function MetodoDePagamento(){
    let MDP = document.querySelector('#selectMDP').value
    switch (MDP) {
        case "MDP":
            DesativarTudo()
            DesativarMDP()
            break;
        case "01":
            LiberarSistemaDinheiro()
            FimDeVendas = "Dinheiro"
            break;
        case "02":
            LiberarSistemaCartao()
            FimDeVendas  = "Cartao"
            break;
        case "03":
            LiberarSistemaPix()
            FimDeVendas = "Pix"
            break;
        
        default:
            break;
    }
}

function DesativarTudo(){
    document.querySelector('.fieldLineCartao').classList.add('fieldDisable')
    document.querySelector('.Pix').classList.add('fieldDisable')
    document.querySelector('.fieldLineParcelamento').classList.add('fieldDisable')
    document.querySelector('.fieldLineDinheiro').classList.add('fieldDisable')
    document.querySelector('.FimDaCompra').classList.add('fieldDisable')    
    document.querySelector('#TrocoPrintValue').value = ""
    document.querySelector('#TrocoPrint').textContent = "00,00"
    document.querySelector('#PagoPrint').textContent = "00,00"
    document.querySelector('#ValorPagoPrint').value = ""
    document.querySelector('#CPFPrint').value = ""
    document.querySelector('#CpfAlterar').textContent = "000.000.000-00"
}

function DesativarMDP(){
    document.querySelector('#selectCartao').value = "MDP"
    document.querySelector('#selectMDP').value = "MDP"
    document.querySelector('#selectCartaoParcela').value = "MDP"

}

function LiberarSistemaDinheiro(){
    DesativarTudo()    
    document.querySelector('.fieldLineDinheiro').classList.remove('fieldDisable')
    document.querySelector('.FimDaCompra').classList.remove('fieldDisable')
}

function LiberarSistemaCartao(){
    DesativarTudo()    
    document.querySelector('.fieldLineCartao').classList.remove('fieldDisable')
}

function LiberarSistemaPix(){
    DesativarTudo()    
    document.querySelector('.Pix').classList.remove('fieldDisable')
    document.querySelector('.FimDaCompra').classList.remove('fieldDisable')
    document.querySelector('#PagoPrint').textContent = document.querySelector('#ValorTotalPrint').textContent
}

function LiberarSistemaTipoCartao(){
    let TipoCartao = document.querySelector('#selectCartao').value
    switch (TipoCartao) {
        case "MDP":
            DesativarTudo()
            DesativarMDP()
            break;
        case "01":
            LiberarSistemaDebito()            
            break;
        case "02":
            LiberarSistemaCredito()
            break;
        
        default:
            break;
    }
}

function LiberarSistemaDebito(){
    document.querySelector('#PagoPrint').textContent = document.querySelector('#ValorTotalPrint').textContent
    document.querySelector('.FimDaCompra').classList.remove('fieldDisable')
}
function LiberarSistemaCredito(){
    document.querySelector('.fieldLineParcelamento').classList.remove('fieldDisable')
    document.querySelector('#PagoPrint').textContent = document.querySelector('#ValorTotalPrint').textContent
}

function LiberarSistemaParcelas(){
    let Parcelas = document.querySelector('#selectCartaoParcela').value
    document.querySelector('.FimDaCompra').classList.remove('fieldDisable')
}

function FinalizarVendasPrint(){
    if(FimDeVendas == "Dinheiro"){
        if(document.querySelector('#ValorPagoPrint').value != ""){
            console.log("Dinheiro")
            let ValorPago = Number(document.querySelector('#ValorPagoPrint').value)
            let ValorFinal = Number(document.querySelector('#ValorTotalPrint').textContent.toString().replace(',','.'))
            let Troco = (ValorPago - ValorFinal).toFixed(2).toString().replace('.',',')
            
            document.querySelector('#TrocoPrintValue').value = Troco
            document.querySelector('#TrocoPrint').textContent = Troco
            document.querySelector('#PagoPrint').textContent = ValorPago.toFixed(2).toString().replace('.',',')
            console.log(Troco)

            
        }
    }else if(FimDeVendas == "Cartao"){

    }else if(FimDeVendas == "Pix"){

    }else{
        alert("Defina o tipo de pagamento")
    }
}

function AtualizarCPF(){
    document.querySelector('#CpfAlterar').textContent = ""
    if(document.querySelector('#CPFPrint').value.toString().length == 11){
        for(let i = 0; i<11; i++){
            if(i == 2 || i == 5){
                document.querySelector('#CpfAlterar').textContent += document.querySelector('#CPFPrint').value.toString()[i]
                document.querySelector('#CpfAlterar').textContent += '.'
            }else if( i == 8){
                document.querySelector('#CpfAlterar').textContent += document.querySelector('#CPFPrint').value.toString()[i]
                document.querySelector('#CpfAlterar').textContent += '-'
            }else{
                document.querySelector('#CpfAlterar').textContent += document.querySelector('#CPFPrint').value.toString()[i]
            }
        }
    }
    if(document.querySelector('#CpfAlterar').textContent == ""){
        document.querySelector('#CpfAlterar').textContent = "000.000.000-00"
    }
    // document.querySelector('#CpfAlterar').textContent = document.querySelector('#CPFPrint').value.toString()
    // 000.000.000-00
    
}

AtualizarTabela()
// FinalizarCompras()