document.addEventListener("DOMContentLoaded", function () {
    const orders = Array.from(document.querySelectorAll(".order"));
    const detailsContainer = document.getElementById("detalhesPedido");
    const criarPedidoBtn = document.getElementById("criarPedidoBtn");
    const ordersContent = document.querySelector(".orders-content");
    const modalDetalhesPedido = document.getElementById("modalDetalhesPedido");
    const conteudoModal = document.getElementById("conteudoModal");
    const fecharModalBtn = document.getElementById("fecharModalBtn");

    // Dados
    const pedidos = {
        123: {
            numero: "#123",
            dataPedido: "30/01/2025",
            dataEntrega: "31/01/2025",
            cliente: "João Silva",
            loja: "Loja 1",
            itens: [
                { nome: "Camisetas", quantidade: 2 },
                { nome: "Calça", quantidade: 1 }
            ],
            valorTotalItens: "50,00",
            taxaEntrega: "10,00",
            taxaAdicional: "5,00",
            descontoLoja: "10,00",
            valorTotal: "55,00",
            formaPagamento: "Cartão Crédito",
            status: "Pendente"
        },
        124: {
            numero: "#124",
            dataPedido: "31/01/2025",
            dataEntrega: "01/02/2025",
            cliente: "Maria Oliveira",
            loja: "Loja 2",
            itens: [
                { nome: "Vestido", quantidade: 1 },
                { nome: "Sapato", quantidade: 1 }
            ],
            valorTotalItens: "75,00",
            taxaEntrega: "15,00",
            taxaAdicional: "0,00",
            descontoLoja: "5,00",
            valorTotal: "85,00",
            formaPagamento: "Pagamento Online",
            status: "Confirmado"
        },
        125: {
            numero: "#125",
            dataPedido: "01/02/2025",
            dataEntrega: "02/02/2025",
            cliente: "Carlos Souza",
            loja: "Loja 3",
            itens: [
                { nome: "Jaqueta", quantidade: 1 },
                { nome: "Boné", quantidade: 1 }
            ],
            valorTotalItens: "100,00",
            taxaEntrega: "20,00",
            taxaAdicional: "0,00",
            descontoLoja: "0,00",
            valorTotal: "120,00",
            formaPagamento: "Cartão Débito",
            status: "Cancelado"
        }
    };

    // Exibir os detalhes do pedido
    function exibirDetalhes(pedidoId) {
        const pedido = pedidos[pedidoId];

        if (!pedido) {
            alert("Pedido não encontrado.");
            return;
        }

        // Detalhes do pedido
        const detalhesHTML = `
            <div class="info-order m-2">
                <h5 class="card-title text-center">Detalhes do Pedido <span class="order-number">${pedido.numero}</span></h5>
            </div>
            <div class="details-info p-2">
                <p class="card-text"><strong>Data do Pedido:</strong> <span class="order-date">${pedido.dataPedido}</span></p>
                <p class="card-text"><strong>Data da Entrega:</strong> ${pedido.dataEntrega}</p>
                <p class="card-text"><strong>Cliente:</strong> ${pedido.cliente}</p>
                <p class="card-text"><strong>Loja:</strong> ${pedido.loja}</p>
            </div>
            <hr class="details-line">
            <div class="details-order">
                <div class="order-items m-2">
                    <ul class="card-text"><strong>Itens:</strong>
                        ${pedido.itens.map(item => `<li class="card-text item">${item.quantidade}x <span>${item.nome}</span></li>`).join("")}
                    </ul>
                </div>
                <hr class="details-line">
                <div class="price-order m-2">
                    <ul class="card-text"><strong>Valor</strong>
                        <li class="card-text">Valor total dos Itens: <span>${pedido.valorTotalItens}</span></li>
                        <li class="card-text">Taxa de Entrega: <span>${pedido.taxaEntrega}</span></li>
                        <li class="card-text">Taxa Adicional: <span>${pedido.taxaAdicional}</span></li>
                        <li class="card-text">Desconto LOJA: <span>${pedido.descontoLoja}</span></li>
                        <li class="card-text">Valor TOTAL: <span>${pedido.valorTotal}</span></li>
                    </ul>
                </div>
                <hr class="details-line">
                <div class="type-payment m-2">
                    <ul class="card-text"><strong>Forma de Pagamento</strong>
                        <li class="card-text mt-1">${pedido.formaPagamento}</li>
                    </ul>
                </div>
                <hr class="details-line">
            </div>
            <div class="d-flex justify-content-evenly align-items-center mt-2 details-buttons">
                <button class="btn btn-outline-secondary m-2 mt-3">Imprimir</button>
                <button class="btn btn-outline-primary m-2 mt-3">Finalizar</button>
                <button class="btn btn-outline-danger m-2 mt-3">Cancelar</button>
            </div>
        `;

        // Verifica se é mobile ou desktop e exibe modal com detalhes
        if (window.innerWidth <= 799) {
            conteudoModal.innerHTML = detalhesHTML;
            modalDetalhesPedido.style.display = "block";
        } else {
            detailsContainer.innerHTML = detalhesHTML;
            detailsContainer.classList.remove("d-none");
        }
    }

    // Fechar o modal
    fecharModalBtn.addEventListener("click", function () {
        modalDetalhesPedido.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modalDetalhesPedido) {
            modalDetalhesPedido.style.display = "none";
        }
    });

    // Evento de clique aos cards de pedidos
    orders.forEach(order => {
        order.addEventListener("click", function () {
            const pedidoId = this.getAttribute("data-pedido");
            exibirDetalhes(pedidoId);
        });
    });

    // Função para clonar um pedido existente
    criarPedidoBtn.addEventListener("click", function () {
        const primeiroPedido = orders[0];
        const novoPedido = primeiroPedido.cloneNode(true);

        const novoNumero = Math.floor(Math.random() * 1000);
        novoPedido.querySelector(".order-number").textContent = `#${novoNumero}`;
        novoPedido.setAttribute("data-pedido", novoNumero);

        ordersContent.appendChild(novoPedido);

        novoPedido.addEventListener("click", function () {
            const pedidoId = this.getAttribute("data-pedido");
            exibirDetalhes(pedidoId);
        });
    });

    // Filtros
    const statusFilter = document.getElementById("status");
    const lojaCheckboxes = document.querySelectorAll("#dropdownLoja .form-check-input");

    statusFilter.addEventListener("change", function () {
        const selectedStatus = statusFilter.value;
        orders.forEach(order => {
            const orderStatus = order.querySelector(".order-status").textContent.toLowerCase();
            if (selectedStatus === "todos" || orderStatus === selectedStatus) {
                order.style.display = "block";
            } else {
                order.style.display = "none";
            }
        });
    });

    lojaCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const selectedLojas = Array.from(lojaCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            orders.forEach(order => {
                const orderLoja = order.querySelector(".store-name").textContent.split(": ")[1].toLowerCase();
                if (selectedLojas.length === 0 || selectedLojas.includes(orderLoja)) {
                    order.style.display = "block";
                } else {
                    order.style.display = "none";
                }
            });
        });
    });

    // Botão Abrir/Fechar Loja
    const abrirLojaBtn = document.getElementById('abrirLojaBtn');
    abrirLojaBtn.textContent = 'Abrir Loja';

    abrirLojaBtn.addEventListener('click', () => {
        if (abrirLojaBtn.textContent === 'Abrir Loja') {
            // Abrir a loja
            abrirLojaBtn.textContent = 'Fechar Loja';
            abrirLojaBtn.classList.remove('btn-primary');
            abrirLojaBtn.classList.add('btn-danger');
        } else {
            // Fechar a loja
            abrirLojaBtn.textContent = 'Abrir Loja';
            abrirLojaBtn.classList.remove('btn-danger');
            abrirLojaBtn.classList.add('btn-primary');
        }
    });
});