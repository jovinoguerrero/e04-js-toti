
let botao = document.querySelector("button")
let nomeInput = document.getElementById("nomeInput")
let idadeInput = document.getElementById("idade")
let titulo = document.getElementById("nome")
let lista = document.getElementById("lista")
let formulario = document.querySelector("form")
let aviso = document.getElementById("aviso")
let dado = document.getElementsByClassName("dado")

let sobrenomeInput = document.getElementById("sobrenomeInput")
let cor = document.getElementById("cor")
let mV = document.getElementById("maisVelho")

let main = document.querySelector("main")
//let nL = document.getElementsByClassName("nL")

let registros = []

// Identificação do evento input para mais interatividade :). Sustitui na hora o conteúdo do span no título por o nome que esta se ingresando.
nomeInput.addEventListener("input", function(e) {
    titulo.textContent = this.value
    // Se por alguma ração o campo do input nome fica vazio, o conteúdo do span volta à normalidade.
    if(titulo.textContent == "") {
        titulo.textContent = "..."
    }
})




// Identificação de evento submit no formulario, para prevenir ele e não atualizar o site.
formulario.addEventListener("submit", function(event) {

    // Apago todos os ul.nL
    let nL = Array.prototype.slice.call(document.getElementsByClassName("nL"), 0);
    for(let element of nL) {
        //console.log(element);
        element.remove();
    }

    event.preventDefault()
    validarFormulario()
})

// Função que va a validar o formulario e desencadear uma serie de funções.
function validarFormulario() {
    // Condição principal. Se a pessoa é menor de idade(18) não pode ser registrado ;(
    if(idadeInput.value < 18) {
        aviso.textContent = "Poxa, não podemos registrar pessoas menores de idade :("
    } else {
        // Se não, o conteúdo de aviso volta a estar vazio e se procede a adicionar o registro da pessoa numa lista.
        aviso.textContent = ""

        let novoRegistro = document.createElement("li")
        novoRegistro.textContent = nomeInput.value + " " + sobrenomeInput.value + ", tem " + idadeInput.value + " anos."
        lista.appendChild(novoRegistro)

        // Guardando valores en variaveis
        let name = nomeInput.value
        let age = idadeInput.value
        let lastname = sobrenomeInput.value
        let color = cor.value

        // Guardando variaveis num objeto
        let pessoa = {
            name ,
            age,
            lastname,
            color
        }
        // Guardando objeto no array
        registros.push(pessoa)
        // Console para ver conteúdo do array
        //console.log(registros)
        
        // Chamado de função para procurar pelo(s) mais velho(s)
        let maisVelhos = obterMaisVelhos(registros)
        mV.textContent = "As pessoas mais velhas encontradas nos registros foram:"
        // for que adicionará parágrafo(s) com o(s) mais velho(s)
        for (let pessoa of maisVelhos) {     
            let novoMV = document.createElement("p")
            novoMV.textContent = `${pessoa.name} ${pessoa.lastname}: ${pessoa.age} anos`
            mV.appendChild(novoMV)
        }


        

        // Se declara variável para agrupar e guardar grupos por cores do registro, se fazendo um chamado à função: obterAgrupamentoPorCores(registros).
        let gruposPorCores = obterAgrupamentoPorCores(registros)

        // Se declara um ciclo for para percorrer as cores de cada pessoa e agrupar pessoas por cores.
        for (let cor of Object.keys(gruposPorCores)) {
            let novaLista = document.createElement("ul")
            novaLista.setAttribute("class", "nL");
            novaLista.style.padding = "0"
            novaLista.textContent = `Pessoas que preferem a cor ${cor}:`
            main.appendChild(novaLista)

            //console.log(`Pessoas que preferem a cor ${cor}:`)
        
            // Ciclo for para percorrer e mostrar pessoas dependendo da cor.
            for (let pessoa of gruposPorCores[cor]) {
                let pCor = document.createElement("Li")
                pCor.textContent = `- ${pessoa.name}`
                novaLista.appendChild(pCor)
                //console.log(`- ${pessoa.name}`)
            }
        }
        //console.log(gruposPorCores)


        // Reset do formulario para os inputs ficar vazios
        formulario.reset()
    }
}

// Função que procura o(s) mais velho(s)
function obterMaisVelhos(registros) {

    let maisVelhos = [ registros[0] ]

    for (let registro of registros.slice(1)) {
        if (registro.age > maisVelhos[0].age) {
        maisVelhos = [ registro ]
        } else if (registro.age === maisVelhos[0].age) {
        maisVelhos.push(registro)
        }
    }
    return maisVelhos
}

// Função para separar e agrupar pessoas pela cor.
function obterAgrupamentoPorCores(registros) {
    
    let gruposdeCores = {}
    
    for (let registro of registros) {
      if (typeof gruposdeCores[registro.color] === 'undefined') {
        gruposdeCores[registro.color] = [ registro ]
      } else {
        gruposdeCores[registro.color].push(registro)
      }
    }
    return gruposdeCores
  }