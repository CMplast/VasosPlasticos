const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
"Naranja Fluo","Violeta Fluo","Verde pastel","Violeta pastel",
"Rosa pastel","Celeste pastel"
];

let pedidoGuardado=[];

function crearColores(id){
const cont = document.getElementById(id);

colores.forEach(color=>{
const div = document.createElement("div");
div.className="colorItem";

div.innerHTML=`
<span>${color}</span>
<div>
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
let val=parseInt(num.innerText);
if(val>0) num.innerText=val-1;
}

function guardarPedido(tipoVaso){

let bloque="";

const prod = tipoVaso==="400"
? document.querySelector('[data-nombre="Vasos 400cc"]')
: document.querySelector('[data-nombre="Vasos 500cc"]');

const nombre = prod.dataset.nombre;
const tipo = prod.querySelector(".tipo").value;
const tapa = prod.querySelector(".tapa")?.value || "";

prod.querySelectorAll(".colorItem").forEach(item=>{
const cant=item.querySelector(".numero").innerText;

if(cant>0){
if(bloque===""){
bloque+=`${nombre}`;
if(tipo!=="Comun") bloque+=` (${tipo})`;
if(tapa && nombre==="Vasos 400cc") bloque+=` - ${tapa}`;
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
resetear(prod);
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

function resetear(prod){
prod.querySelectorAll(".numero").forEach(n=>n.innerText="0");
}

function enviarWhatsApp(){

if(pedidoGuardado.length===0){
alert("No hay pedido");
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
