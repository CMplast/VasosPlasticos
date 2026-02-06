let pedidoGuardado = [];
const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
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
alert("No agregaste nada al pedido");
return;
}

let mensaje="PEDIDO MAYORISTA\n\n";

pedidoGuardado.forEach(p=>{
mensaje+=p+"\n";
});

const url="https://api.whatsapp.com/send?phone=5491134505374&text="+encodeURIComponent(mensaje);
window.open(url,"_blank");
}

function agregarAlPedido(btn){

const prod = btn.closest(".producto");
const nombre = prod.dataset.nombre;
const tipo = prod.querySelector(".tipo").value;
const tapa = prod.querySelector(".tapa")?.value || "";

let agregado=false;
let texto="";

prod.querySelectorAll(".colorItem").forEach(item=>{
const cantidad = parseInt(item.querySelector(".numero").innerText);
if(cantidad>0){
if(!agregado){
texto+=nombre+" ("+tipo+")";
if(tapa && nombre==="Vasos 400cc") texto+=" - "+tapa;
texto+="\n";
agregado=true;
}
const color = item.childNodes[0].textContent.trim();
texto+=`- ${cantidad} cajas ${color}\n`;
}
});

if(agregado){
pedidoGuardado.push(texto);
alert("Agregado al pedido ✔️");
}else{
alert("No agregaste cantidades");
}

/* reset contador */
prod.querySelectorAll(".numero").forEach(n=>n.innerText="0");
}

