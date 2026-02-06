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
let mensaje="PEDIDO MAYORISTA\n\n";

document.querySelectorAll(".producto").forEach(prod=>{
const nombre = prod.dataset.nombre;
const tipo = prod.querySelector(".tipo").value;
const tapa = prod.querySelector(".tapa")?.value || "";
let agregado=false;

prod.querySelectorAll(".colorItem").forEach(item=>{
const cantidad = item.querySelector(".numero").innerText;
if(cantidad>0){
if(!agregado){
mensaje+=nombre+" ("+tipo+")";
if(tapa && nombre==="Vasos 400cc") mensaje+=" - "+tapa;
mensaje+="\n";
agregado=true;
}
const color = item.childNodes[0].textContent.trim();
mensaje+=`- ${cantidad} cajas ${color}\n`;
}
});

if(agregado) mensaje+="\n";
});

const url="https://api.whatsapp.com/send?phone=5491134505374&text="+encodeURIComponent(mensaje);
window.open(url,"_blank");
}

