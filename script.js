const alunos = [];
let pesquisaAtiva = "";

document.addEventListener("DOMContentLoaded", () => {

document.getElementById("btnLogin").addEventListener("click", () => {

const u = document.getElementById("usuario").value;
const s = document.getElementById("senha").value;

if (u === "admin" && s === "1234") {
document.getElementById("loginView").classList.add("hidden");
document.getElementById("appView").classList.remove("hidden");
showToast("Login realizado com sucesso");
} else {
document.getElementById("erroLogin").innerText = "Login inválido";
}

});

document.getElementById("btnCadastrar").addEventListener("click", () => {

const nome = document.getElementById("nome").value.trim();
const matricula = document.getElementById("matricula").value.trim();
const turma = document.getElementById("turma").value.trim();

const n1 = Number(document.getElementById("nota1").value);
const n2 = Number(document.getElementById("nota2").value);

if (!nome || !matricula || !turma) {
showToast("Preencha todos os campos");
return;
}

if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10) {
showToast("As notas devem estar entre 0 e 10");
return;
}

const media = ((n1 + n2) / 2).toFixed(1);

const status = Number(media) >= 6.5 ? "Aprovado" : "Reprovado";

alunos.push({
nome,
matricula,
turma,
nota1: n1,
nota2: n2,
media,
status
});

render();
atualizarDashboard();
showToast("Aluno cadastrado");

document.getElementById("nome").value = "";
document.getElementById("matricula").value = "";
document.getElementById("turma").value = "";
document.getElementById("nota1").value = "";
document.getElementById("nota2").value = "";

});

const pesquisa = document.getElementById("pesquisa");

if (pesquisa) {
pesquisa.addEventListener("input", (e) => {
pesquisaAtiva = e.target.value.toLowerCase();
render();
});
}

atualizarDashboard();

});

function atualizarDashboard() {

let aprovados = 0;
let soma = 0;

alunos.forEach(a => {
soma += Number(a.media);
if (a.status === "Aprovado") aprovados++;
});

const total = alunos.length;

document.getElementById("totalAlunos").innerText = total;
document.getElementById("aprovados").innerText = aprovados;
document.getElementById("reprovados").innerText = total - aprovados;
document.getElementById("mediaGeral").innerText = total ? (soma / total).toFixed(1) : "0.0";

const taxa = total ? ((aprovados / total) * 100).toFixed(1) : "0.0";

const rTotal = document.getElementById("rTotal");
const rTaxa = document.getElementById("rTaxa");
const rMedia = document.getElementById("rMedia");

if (rTotal && rTaxa && rMedia) {
rTotal.innerText = total;
rTaxa.innerText = taxa;
rMedia.innerText = total ? (soma / total).toFixed(1) : "0.0";
}

}

function render() {

const tabela = document.getElementById("tabelaAlunos");

tabela.innerHTML = "";

let lista = alunos;

if (pesquisaAtiva) {
lista = alunos.filter(a =>
a.nome.toLowerCase().includes(pesquisaAtiva)
);
}

lista.forEach((a, i) => {

tabela.innerHTML += `
<tr>
<td>${a.nome}</td>
<td>${a.matricula}</td>
<td>${a.turma}</td>
<td>${Number(a.media).toFixed(1)}</td>
<td class="${a.status === "Aprovado" ? "aprovado" : "reprovado"}">${a.status}</td>
<td><button onclick="remover(${i})">X</button></td>
</tr>
`;
});

}

function remover(i) {

alunos.splice(i, 1);

render();
atualizarDashboard();

showToast("Aluno removido");

}

function mostrar(secao) {

document.querySelectorAll(".section")
.forEach(s => s.classList.add("hidden"));

document.getElementById(secao)
.classList.remove("hidden");

if (secao === "dashboard") {
atualizarDashboard();
}

}

function logout() {
document.getElementById("appView").classList.add("hidden");
document.getElementById("loginView").classList.remove("hidden");
showToast("Logout realizado");
}

function showToast(msg) {

const toast = document.getElementById("toast");

toast.innerText = msg;
toast.style.opacity = 1;
toast.style.transform = "translateY(0)";

setTimeout(() => {
toast.style.opacity = 0;
toast.style.transform = "translateY(10px)";
}, 2000);

}