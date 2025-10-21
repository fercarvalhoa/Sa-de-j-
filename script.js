// ======= TROCA ENTRE AS ABAS =======
document.addEventListener("DOMContentLoaded", function() {
    const botoes = document.querySelectorAll("nav button");
    const secoes = document.querySelectorAll("section");

    botoes.forEach((botao, index) => {
        botao.addEventListener("click", () => {
            // Remove 'active' de todos
            botoes.forEach(btn => btn.classList.remove("active"));
            secoes.forEach(sec => sec.classList.remove("active"));

            // Ativa o botão e seção clicados
            botao.classList.add("active");
            secoes[index].classList.add("active");
        });
    });
});

// ======= CADASTRO DE USUÁRIO =======
function cadastrarUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !cpf || !email) {
        alert("Por favor, preencha todos os campos antes de cadastrar!");
        return;
    }

    alert(`✅ Usuário cadastrado com sucesso!\n\nNome: ${nome}\nCPF: ${cpf}\nE-mail: ${email}`);
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("email").value = "";
}

// ======= PRÉ-TRIAGEM =======
function enviarTriagem() {
    const sintomas = document.getElementById("sintomas").value.trim();
    if (!sintomas) {
        alert("Por favor, descreva seus sintomas.");
        return;
    }

    const codigo = "TRI" + Math.floor(Math.random() * 90000 + 10000);
    document.getElementById("resultadoTriagem").innerHTML =
        `<strong>Pré-triagem concluída!</strong><br>Seu código de rastreio é: <b>${codigo}</b>`;
    document.getElementById("sintomas").value = "";
}

// ======= RASTREAMENTO =======
function rastrearFila() {
    const codigo = document.getElementById("codigoRastreio").value.trim();
    if (!codigo) {
        alert("Digite o código de rastreio.");
        return;
    }

    const posicao = Math.floor(Math.random() * 15) + 1;
    document.getElementById("resultadoRastreamento").innerHTML =
        `🔍 Código ${codigo} — Você está na posição <b>${posicao}</b> da fila de atendimento.`;
}

// ======= AGENDAMENTO =======
function agendar() {
    const exame = document.getElementById("exame").value;
    const data = document.getElementById("data").value;

    if (!exame || !data) {
        alert("Selecione o tipo de exame e a data desejada!");
        return;
    }

    alert(`📅 Agendamento confirmado para "${exame}" no dia ${data}!`);
    document.getElementById("exame").value = "";
    document.getElementById("data").value = "";
}

// ======= MAPA DE UBS PRÓXIMAS =======
document.addEventListener("DOMContentLoaded", () => {
    const mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    // Cria o mapa
    const map = L.map("map").setView([-23.5505, -46.6333], 13); // posição inicial: São Paulo

    // Adiciona mapa base (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> colaboradores'
    }).addTo(map);

    // Lista de UBS simuladas
    const ubsList = [
        { nome: "UBS Central", lat: -23.550, lon: -46.635 },
        { nome: "UBS Jardim Esperança", lat: -23.554, lon: -46.630 },
        { nome: "UBS Saúde da Família", lat: -23.548, lon: -46.640 }
    ];

    // Adiciona marcadores
    ubsList.forEach(ubs => {
        const marker = L.marker([ubs.lat, ubs.lon]).addTo(map);
        const rotaLink = `https://www.google.com/maps/dir/?api=1&destination=${ubs.lat},${ubs.lon}`;
        marker.bindPopup(`
            <b>${ubs.nome}</b><br>
            <a href="${rotaLink}" target="_blank">📍 Ver rota</a>
        `);
    });

    // Localização do usuário (se permitido)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 14);
            L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup("📍 Você está aqui!")
              .openPopup();
        }, () => {
            console.warn("Não foi possível obter sua localização.");
        });
    }
});
