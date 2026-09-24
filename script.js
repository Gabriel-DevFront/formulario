// ========================================
// ELEMENTOS DO HTML
// ========================================

const formulario = document.getElementById("formVaga");

const tabela = document.getElementById("tabelaVagas");

const pesquisa = document.getElementById("pesquisa");

const mensagemVazia = document.getElementById("mensagemVazia");

const contadorHero = document.getElementById("contadorHero");


// ========================================
// ARRAY DE VAGAS
// ========================================

let vagas = [];


// ========================================
// FUNÇÃO PARA MOSTRAR AS VAGAS
// ========================================

function mostrarVagas(lista = vagas) {

    // Limpa a tabela

    tabela.innerHTML = "";


    // Verifica se não existem vagas

    if (lista.length === 0) {

        mensagemVazia.style.display = "block";

        atualizarContador();

        return;
    }


    mensagemVazia.style.display = "none";


    // Cria uma linha para cada vaga

    lista.forEach(function (vaga) {

        const linha = document.createElement("tr");


        linha.innerHTML = `

            <td>
                <span class="empresa">
                    ${vaga.empresa}
                </span>
            </td>

            <td>
                <span class="cargo">
                    ${vaga.cargo}
                </span>
            </td>

            <td>
                ${vaga.area}
            </td>

            <td>
                <span class="badge">
                    ${vaga.modalidade}
                </span>
            </td>

            <td>
                ${vaga.localizacao}
            </td>

            <td>
                ${vaga.bolsa}
            </td>

            <td>

                <button
                    class="botao-remover"
                    onclick="removerVaga(${vaga.id})"
                >
                    Excluir
                </button>

            </td>

        `;


        tabela.appendChild(linha);

    });


    atualizarContador();

}


// ========================================
// CADASTRAR NOVA VAGA
// ========================================

formulario.addEventListener("submit", function (event) {

    // Impede o navegador de recarregar a página

    event.preventDefault();


    // Pega os valores do formulário

    const empresa =
        document.getElementById("empresa").value.trim();

    const cargo =
        document.getElementById("cargo").value.trim();

    const area =
        document.getElementById("area").value;

    const modalidade =
        document.getElementById("modalidade").value;

    const localizacao =
        document.getElementById("localizacao").value.trim();

    const bolsa =
        document.getElementById("bolsa").value.trim();

    const descricao =
        document.getElementById("descricao").value.trim();


    // Cria o objeto da vaga

    const novaVaga = {

        id: Date.now(),

        empresa: empresa,

        cargo: cargo,

        area: area,

        modalidade: modalidade,

        localizacao: localizacao,

        bolsa: bolsa,

        descricao: descricao

    };


    // Adiciona a vaga ao array

    vagas.push(novaVaga);


    // Atualiza a tabela

    mostrarVagas();


    // Limpa o formulário

    formulario.reset();


    // Mostra uma mensagem

    alert("✅ Vaga cadastrada com sucesso!");


    // Leva o usuário até a tabela

    document.getElementById("vagas").scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// REMOVER VAGA
// ========================================

function removerVaga(id) {

    const confirmar =
        confirm("Deseja realmente excluir esta vaga?");


    if (!confirmar) {
        return;
    }


    // Remove a vaga

    vagas = vagas.filter(function (vaga) {

        return vaga.id !== id;

    });


    // Atualiza a tabela

    mostrarVagas();

}


// ========================================
// PESQUISA DE VAGAS
// ========================================

pesquisa.addEventListener("input", function () {

    const termo =
        pesquisa.value.toLowerCase().trim();


    const resultado =
        vagas.filter(function (vaga) {

            return (

                vaga.empresa.toLowerCase().includes(termo) ||

                vaga.cargo.toLowerCase().includes(termo) ||

                vaga.area.toLowerCase().includes(termo) ||

                vaga.modalidade.toLowerCase().includes(termo) ||

                vaga.localizacao.toLowerCase().includes(termo)

            );

        });


    mostrarVagas(resultado);

});


// ========================================
// ATUALIZAR CONTADOR
// ========================================

function atualizarContador() {

    contadorHero.textContent = vagas.length;

}


// ========================================
// INICIAR PÁGINA
// ========================================

mostrarVagas();