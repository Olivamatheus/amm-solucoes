document.addEventListener("DOMContentLoaded", function () {
    const orders = Array.from(document.querySelectorAll(".order"));
    const statusFilter = document.getElementById("status");
    const lojaCheckboxes = document.querySelectorAll("#dropdownLoja .form-check-input");

    // Função para filtrar pedidos por status
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

    // Função para filtrar pedidos por lojas selecionadas
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
    abrirLojaBtn.addEventListener('click', () => {
        if (abrirLojaBtn.classList.contains('off')) {
            abrirLojaBtn.classList.remove('off');
            abrirLojaBtn.classList.add('on');
            abrirLojaBtn.textContent = 'Abrir Loja';
        } else {
            abrirLojaBtn.classList.remove('on');
            abrirLojaBtn.classList.add('off');
            abrirLojaBtn.textContent = 'Fechar Loja';
        }
    });
});