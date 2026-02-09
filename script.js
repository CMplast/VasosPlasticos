// ====== PEDIDO TOTAL ======
let pedido = [];

// ====== CAMBIAR VISUAL SEGUN TIPO ======
function cambiarTipo() {
  const tipo = document.getElementById("tipoVaso").value;
  const contColorVaso = document.getElementById("bloqueColorVaso");
  const textoGlitter = document.getElementById("avisoGlitter");

  if (tipo === "glitter") {
    contColorVaso.style.display = "none";
    textoGlitter.style.display = "block";
  } else {
    contColorVaso.style.display = "block";
    textoGlitter.style.display = "none";
  }
}

// ====== AGREGAR CANTIDAD + - ======
function cambiarCantidad(valor) {
  const input = document.getElementById("cantidad");
  let num = parseInt(input.value) || 0;
  num += valor;
  if (num < 0) num = 0;
  input.value = num;
}

// ====== AGREGAR TANDA ======
function agregarTanda() {
  const tipo = document.getElementById("tipoVaso").value;
  const colorVaso = document.getElementById("colorVaso").value;
  const colorTapa = document.getElementById("colorTapa").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!cantidad || cantidad <= 0) {
    alert("Agregá cantidad primero");
    return;
  }

  let texto = "";

  if (tipo === "glitter") {
    texto = cantidad + " vasos GLITTER tapa " + colorTapa;
  } else {
    texto = cantidad + " vasos " + tipo + " color " + colorVaso + " tapa " + colorTapa;
  }

  pedido.push(texto);

  actualizarLista();

  // reset cantidad
  document.getElementById("cantidad").value = 0;
}

// ====== MOSTRAR LISTA ======
function actualizarLista() {
  const lista = document.getElementById("listaPedido");
  lista.innerHTML = "";

  pedido.forEach((p, index) => {
    lista.innerHTML += `
      <div class="itemPedido">
        ${p}
        <button onclick="eliminarItem(${index})" class="btnEliminar">❌</button>
      </div>
    `;
  });
}

// ====== ELIMINAR ITEM ======
function eliminarItem(i) {
  pedido.splice(i, 1);
  actualizarLista();
}

// ====== ENVIAR WHATSAPP ======
function enviarPedido() {
  if (pedido.length === 0) {
    alert("Agregá al menos una tanda");
    return;
  }

  let mensaje = "Hola, quiero pedir:%0A%0A";

  pedido.forEach(p => {
    mensaje += "• " + p + "%0A";
  });

  // CAMBIA ESTE NUMERO POR EL TUYO
  const numero = "5491126675200";

  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}

// ====== INICIO ======
document.addEventListener("DOMContentLoaded", () => {
  cambiarTipo();
});

