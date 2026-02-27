const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Rojo","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
"Naranja Fluo","Violeta Fluo","Verde pastel","Violeta pastel",
"Rosa pastel","Celeste pastel"
];

let pedidoGuardado=[];

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

function sumar(btn){
const num = btn.parentElement.querySelector(".numero");
num.innerText = parseInt(num.innerText)+1;

animarNumero(num);
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

// ---- CONTROL DE COLOR ----
if(valor > 0){
    num.style.color = "#16a34a";
}else{
    num.style.color = "#111";
}

// ---- ANIMACIÓN ----
num.classList.remove("animar");
void num.offsetWidth;
num.classList.add("animar");

}
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

function guardarPedido(){

let bloque="";

const tam = document.getElementById("tamano").value;
const tipo = document.querySelector(".tipo").value;
const tapa = document.getElementById("tapaSelect").value;

document.querySelectorAll(".colorItem").forEach(item=>{
const cant=item.querySelector(".numero").innerText;

if(cant>0){
if(bloque===""){
bloque+=`Vasos ${tam}ml`;
if(tipo!=="Comun") bloque+=` (${tipo})`;
if(tapa) bloque+=` - ${tapa}`;
bloque+="\n";
}

const color=item.querySelector("span").innerText;
bloque+=`• ${cant} cajas ${color}\n`;
}
});

if(bloque===""){
alert("No agregaste nada");
return;
}    

pedidoGuardado.push(bloque);
actualizarLista();
resetear();
const pedidoActual = document.querySelector(".pedidoActual");

window.scrollTo({
    top: pedidoActual.offsetTop - 10,
    behavior: "smooth"
});
const bloquePedido = document.querySelector(".pedidoActual");

bloquePedido.classList.remove("confirmado");
void bloquePedido.offsetWidth;
bloquePedido.classList.add("confirmado");
}

function actualizarLista(){
const lista=document.getElementById("listaPedido");
lista.innerHTML="";

pedidoGuardado.forEach(p=>{
const div=document.createElement("div");
div.innerText=p;
lista.appendChild(div);
});
}
function resetear(){
document.querySelectorAll(".numero").forEach(n=>{
    n.innerText = "0";
    animarNumero(n);
});
} // ← cierre correcto

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

function enviarWhatsApp(){

if(pedidoGuardado.length===0){
mostrarModal("No hay pedido");
return;
}

let mensaje="PEDIDO MAYORISTA\n\n";
pedidoGuardado.forEach(p=>mensaje+=p+"\n");

const num1="5491134505374";
const num2="5491165032943";

window.open(`https://api.whatsapp.com/send?phone=${num1}&text=${encodeURIComponent(mensaje)}`,"_blank");
setTimeout(()=>{
window.open(`https://api.whatsapp.com/send?phone=${num2}&text=${encodeURIComponent(mensaje)}`,"_blank");
},800);
}

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
