let pedidoGuardado = [];
let totalCajas = 0;

const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Rojo","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
"Naranja Fluo","Violeta Fluo","Verde pastel","Violeta pastel",
"Rosa pastel","Celeste pastel"
];

function crearColores(id){
const cont = document.getElementById(id);

colores.forEach(color=>{
const div = document.createElement("div");
div.className="colorItem";

div.innerHTML=`
${color}
<div class="contador">
<button onclick="restar(this)">-</button>
<span class="numero">0</span>
<button onclick="sumar(this)">+</button>
</div>
`;

cont.appendChild(div);
});
}

crearColores("colores400");
crearColores("colores500");

function sumar(btn){
const num = btn.parentElement.querySelector(".numero");
num.innerText = parseInt(num.innerText)+1;
}

function restar(btn){
const num = btn.parentElement.querySelector(".numero");
let val = parseInt(num.innerText);
if(val>0) num.innerText = val-1;
}

function agregarAlPedido(btn){

const prod = btn.closest(".producto");
const nombre = prod.dataset.nombre;
const tipo = prod.querySelector(".tipo").value;
const tapa = prod.querySelector(".tapa")?.value || "";
const colorTapa = prod.querySelector(".colorTapa")?.value || "";
const otroColor = prod.querySelector(".otroColorTapa")?.value || "";

let colorTapaFinal = colorTapa;
if(colorTapa==="Otro") colorTapaFinal = otroColor;

let agregado=false;
let texto="";

prod.querySelectorAll(".colorItem").forEach(item=>{
const cantidad = parseInt(item.querySelector(".numero").innerText);

if(cantidad>0){

let colorElegido = item.childNodes[0].textContent.trim();
let palabra = "cajas";
let linea = "";

// 👉 SI ES GLITTER = color de tapa
if(tipo.toLowerCase().includes("glitter")){
palabra = "tapas";
linea = `- ${cantidad} ${palabra} ${colorElegido}`;
}else{
linea = `- ${cantidad} ${palabra} ${colorElegido}`;

if(tapa) linea += ` con ${tapa}`;
if(colorTapaFinal && colorTapaFinal!=="Mismo color que vaso"){
linea += ` ${colorTapaFinal}`;
}
}

if(!agregado){
texto+=`${nombre} (${tipo})\n`;
agregado=true;
}

texto+=linea+"\n";
totalCajas += cantidad;
}
});

if(agregado){
pedidoGuardado.push(texto);
actualizarPanel();
btn.innerText="✔ Agregado";
btn.style.background="green";

setTimeout(()=>{
btn.innerText="➕ Agregar esta tanda al pedido";
btn.style.background="#111";
},1000);

}else{
alert("No agregaste cantidades");
}

prod.querySelectorAll(".numero").forEach(n=>n.innerText="0");
}

function actualizarPanel(){
const lista = document.getElementById("listaPedido");

if(pedidoGuardado.length===0){
lista.innerText="Aún no agregaste productos";
}else{
lista.innerText = pedidoGuardado.join("\n");
}

document.getElementById("totalCajas").innerText = totalCajas;
}

function borrarPedido(){
pedidoGuardado=[];
totalCajas=0;
actualizarPanel();
}

function enviarWhatsApp(){

if(pedidoGuardado.length===0){
alert("Agregá productos primero");
return;
}

let mensaje="PEDIDO MAYORISTA\n\n"+pedidoGuardado.join("\n");

const url="https://api.whatsapp.com/send?phone=5491134505374&text="+encodeURIComponent(mensaje);
window.open(url,"_blank");
}

/* mostrar input si pone otro color tapa */
document.querySelectorAll(".colorTapa").forEach(sel=>{
sel.addEventListener("change",function(){
const input = this.parentElement.querySelector(".otroColorTapa");
if(this.value==="Otro"){
input.style.display="block";
}else{
input.style.display="none";
}
});
});
