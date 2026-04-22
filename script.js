const canvas = document.getElementById('assinatura');
const ctx = canvas.getContext('2d');
let desenhando = false;

canvas.addEventListener('mousedown',()=>desenhando=true);
canvas.addEventListener('mouseup',()=>desenhando=false);
canvas.addEventListener('mousemove',desenhar);

function desenhar(e){
 if(!desenhando) return;
 ctx.lineWidth=2;
 ctx.lineCap='round';
 ctx.lineTo(e.offsetX,e.offsetY);
 ctx.stroke();
 ctx.beginPath();
 ctx.moveTo(e.offsetX,e.offsetY);
}

function limpar(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
}

document.getElementById('form').addEventListener('submit', function(e){
 e.preventDefault();

 let numero = localStorage.getItem('numeroContrato') || 1;
 localStorage.setItem('numeroContrato', parseInt(numero)+1);

 const { jsPDF } = window.jspdf;
 const doc = new jsPDF();

 doc.text("SAGAZ MOTORS LTDA", 20, 20);
 doc.text("Contrato Nº: "+numero, 20, 30);

 doc.text("Cliente: "+nome.value, 20, 40);
 doc.text("CPF: "+cpf.value, 20, 50);

 doc.text("Moto: "+marca.value+" "+modelo.value, 20, 60);
 doc.text("Valor: R$ "+valor.value, 20, 70);

 doc.text("Garantia de 1 ano motor e bateria.", 20, 90);
 doc.text("Resolução CONTRAN 996/2023.", 20, 100);

 let img = canvas.toDataURL("image/png");
 doc.addImage(img, 'PNG', 20, 110, 100, 40);

 doc.save("contrato_"+numero+".pdf");
});
