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

function enviarWhatsApp(){

if(pedidoGuardado.length===0){
alert("Agregá productos primero");
return;
}

let mensaje="PEDIDO MAYORISTA\n\n";
mensaje+=document.getElementById("listaPedido").innerText;

const url="https://api.whatsapp.com/send?phone=5491134505374&text="+encodeURIComponent(mensaje);
window.open(url,"_blank");
}

function agregarAlPedido(btn){

const prod = btn.closest(".producto");
const nombre = prod.dataset.nombre;
const tipo = prod.querySelector(".tipo").value;
const tapa = prod.querySelector(".tapa")?.value || "";
const colorTapa = prod.querySelector(".colorTapa")?.value || "";

let agregado=false;
let texto="";

prod.querySelectorAll(".colorItem").forEach(item=>{
const cantidad = parseInt(item.querySelector(".numero").innerText);

if(cantidad>0){

let palabra="cajas";
if(tipo.toLowerCase().includes("glitter")) palabra="tapas";

if(!agregado){
texto+=`<b>${nombre} (${tipo})</b><br>`;
if(tapa && nombre==="Vasos 400cc") texto+=`${tapa}<br>`;
agregado=true;
}

const color = item.childNodes[0].textContent.trim();
let linea = `- ${cantidad} ${palabra} ${color}`;

if(tapa) linea += ` con ${tapa}`;
if(colorTapa) linea += ` color ${colorTapa}`;

texto += linea + "<br>";

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
btn.style.background="#25D366";
},1000);

}else{
alert("No agregaste cantidades");
}

prod.querySelectorAll(".numero").forEach(n=>n.innerText="0");
}

function actualizarPanel(){
const lista = document.getElementById("listaPedido");

if(pedidoGuardado.length===0){
lista.innerHTML="Aún no agregaste productos";
}else{
lista.innerHTML = pedidoGuardado.join("<br>");
}

document.getElementById("totalCajas").innerText = totalCajas;
}

function borrarPedido(){
pedidoGuardado=[];
totalCajas=0;
actualizarPanel();
}



