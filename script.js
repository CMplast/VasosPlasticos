const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Rojo","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
"Naranja Fluo","Violeta Fluo","Verde pastel","Violeta pastel",
"Rosa pastel","Celeste pastel"
];

let pedidoGuardado = [];

/* =========================
   CREAR COLORES
========================= */

function crearColores(){
const cont = document.getElementById("coloresUnico");

colores.forEach(color=>{
const div = document.createElement("div");
div.className="colorItem";

div.innerHTML=`
<span>${color}</span>
<div class="contador">
<button onclick="restar(this)">-</button>
<span class="numero">0</span>
<button onclick="sumar(this)">+</button>
</div>
`;

cont.appendChild(div);
});
}

crearColores();

/* =========================
   CARGAR COLORES TAPA
========================= */

function cargarColoresTapa(){

const select = document.getElementById("colorTapa");

if(!select) return;

colores.forEach(color=>{
const op = document.createElement("option");
op.value = color;
op.textContent = color;
select.appendChild(op);
});

}

cargarColoresTapa();

/* =========================
   SUMAR / RESTAR
========================= */

function sumar(btn){

const item = btn.closest(".colorItem");
const color = item.querySelector("span").innerText;

const num = item.querySelector(".numero");
num.innerText = parseInt(num.innerText)+1;

animarNumero(num);

/* AUTO COLOR TAPA */

const selectTapa = document.getElementById("colorTapa");

if(selectTapa && selectTapa.value === ""){
selectTapa.value = color;
}

}

function restar(btn){
const num = btn.parentElement.querySelector(".numero");
let val = parseInt(num.innerText);

if(val > 0){
num.innerText = val - 1;
animarNumero(num);
}
}

function animarNumero(num){

const valor = Number(num.innerText);

if(valor > 0){
    num.style.color = "#16a34a";
}else{
    num.style.color = "#111";
}

num.classList.remove("animar");
void num.offsetWidth;
num.classList.add("animar");
}

/* =========================
   CAMBIAR TAPA
========================= */

function cambiarTapa(){
const tam = document.getElementById("tamano").value;
const tapa = document.getElementById("tapaSelect");

tapa.innerHTML="";

if(tam==="400"){
tapa.innerHTML=`
<option value="">Sin tapa</option>
<option value="Tapa lisa">Tapa lisa</option>
<option value="Tapa domo">Tapa domo</option>
<option value="Tapa pelota">Tapa pelota</option>
`;
}else{
tapa.innerHTML=`
<option value="">Sin tapa</option>
<option value="Tapa plana">Tapa plana</option>
`;
}
}

/* =========================
   GUARDAR PEDIDO
========================= */

function guardarPedido(){

let bloque="";
let subtotal = 0;

const tam = document.getElementById("tamano").value;
const tipo = document.querySelector(".tipo").value;
const tapa = document.getElementById("tapaSelect").value;
const colorTapa = document.getElementById("colorTapa")?.value || "";

document.querySelectorAll(".colorItem").forEach(item=>{
const cant = parseInt(item.querySelector(".numero").innerText);

if(cant > 0){

if(bloque===""){
bloque+=`Vasos ${tam}ml`;

if(tipo!=="Comun") bloque+=` (${tipo})`;

if(tapa) bloque+=` - ${tapa}`;

if(colorTapa) bloque+=` (${colorTapa})`;

bloque+="\n";
}

const color=item.querySelector("span").innerText;
bloque+=`• ${cant} cajas ${color}\n`;

subtotal += cant;
}
});

if(bloque===""){
mostrarModal("No agregaste nada");
return;
}

pedidoGuardado.push({
texto: bloque,
subtotal: subtotal
});

actualizarLista();
resetear();

/* Scroll suave */

const pedidoActual = document.querySelector(".pedidoActual");

window.scrollTo({
    top: pedidoActual.offsetTop - 10,
    behavior: "smooth"
});

/* Animación confirmación */

pedidoActual.classList.remove("confirmado");
void pedidoActual.offsetWidth;
pedidoActual.classList.add("confirmado");
}

/* =========================
   ACTUALIZAR LISTA
========================= */

function actualizarLista(){

const lista = document.getElementById("listaPedido");
lista.innerHTML="";

if(pedidoGuardado.length===0){
lista.innerText="Aún no hay productos";
return;
}

let totalGeneral = 0;

pedidoGuardado.forEach((pedido, index)=>{

totalGeneral += pedido.subtotal;

const contenedor = document.createElement("div");
contenedor.style.background="#1e293b";
contenedor.style.padding="12px";
contenedor.style.borderRadius="12px";
contenedor.style.marginBottom="12px";
contenedor.style.position="relative";
contenedor.style.whiteSpace="pre-line";

const titulo = document.createElement("div");
titulo.innerHTML = `<strong>Pedido ${index+1}</strong>`;
titulo.style.marginBottom="6px";

const texto = document.createElement("div");
texto.innerText = pedido.texto;

const subtotalDiv = document.createElement("div");
subtotalDiv.innerHTML = `Subtotal: <strong>${pedido.subtotal} cajas</strong>`;
subtotalDiv.style.marginTop="8px";
subtotalDiv.style.color="#16a34a";

const btnEliminar = document.createElement("button");
btnEliminar.innerText = "🗑";
btnEliminar.style.position="absolute";
btnEliminar.style.top="8px";
btnEliminar.style.right="8px";
btnEliminar.style.background="#ef4444";
btnEliminar.style.border="none";
btnEliminar.style.color="white";
btnEliminar.style.borderRadius="8px";
btnEliminar.style.padding="4px 8px";
btnEliminar.style.cursor="pointer";

btnEliminar.onclick = ()=>{
mostrarModal("¿Eliminar este pedido?", (confirmado)=>{
if(confirmado){
pedidoGuardado.splice(index,1);
actualizarLista();
}
});
};

contenedor.appendChild(titulo);
contenedor.appendChild(texto);
contenedor.appendChild(subtotalDiv);
contenedor.appendChild(btnEliminar);

lista.appendChild(contenedor);

});

/* TOTAL GENERAL */

const totalDiv = document.createElement("div");
totalDiv.innerHTML = `TOTAL GENERAL: <strong>${totalGeneral} cajas</strong>`;
totalDiv.style.marginTop="15px";
totalDiv.style.padding="10px";
totalDiv.style.background="#0f172a";
totalDiv.style.borderRadius="10px";
totalDiv.style.textAlign="center";
totalDiv.style.fontSize="18px";
totalDiv.style.color="#38bdf8";

lista.appendChild(totalDiv);
}

/* =========================
   RESETEAR
========================= */

function resetear(){

document.querySelectorAll(".numero").forEach(n=>{
n.innerText = "0";
animarNumero(n);
});

const selectTapa = document.getElementById("colorTapa");

if(selectTapa){
selectTapa.value="";
}

}

/* =========================
   BORRAR TODO
========================= */

function borrarPedido(){

if(pedidoGuardado.length===0){
mostrarModal("No hay pedido para borrar");
return;
}

mostrarModal("¿Borrar todo el pedido?", (confirmado)=>{
if(confirmado){
pedidoGuardado=[];
actualizarLista();
}
});
}

/* =========================
   WHATSAPP
========================= */

function enviarWhatsApp(){

if(pedidoGuardado.length===0){
mostrarModal("No hay pedido");
return;
}

let mensaje="PEDIDO MAYORISTA\n\n";
let totalGeneral = 0;

pedidoGuardado.forEach((pedido, index)=>{

mensaje+=`Pedido ${index+1}\n`;
mensaje+=pedido.texto;
mensaje+=`Subtotal: ${pedido.subtotal} cajas\n\n`;

totalGeneral += pedido.subtotal;

});

mensaje+="----------------------------\n";
mensaje+=`TOTAL DE CAJAS: ${totalGeneral} cajas\n`;
mensaje+="----------------------------\n";

const num1="5491134505374";
const num2="5491165032943";

window.open(`https://api.whatsapp.com/send?phone=${num1}&text=${encodeURIComponent(mensaje)}`,"_blank");

setTimeout(()=>{
window.open(`https://api.whatsapp.com/send?phone=${num2}&text=${encodeURIComponent(mensaje)}`,"_blank");
},800);
}

/* =========================
   MODAL PERSONALIZADO
========================= */

function mostrarModal(texto, callback){

const modal = document.getElementById("modal");
const textoModal = document.getElementById("modalTexto");
const btnAceptar = document.getElementById("modalAceptar");
const btnCancelar = document.getElementById("modalCancelar");

textoModal.innerText = texto;
modal.classList.add("activo");

btnAceptar.onclick = () => {
modal.classList.remove("activo");
if(callback) callback(true);
};

btnCancelar.onclick = () => {
modal.classList.remove("activo");
if(callback) callback(false);
};

}

