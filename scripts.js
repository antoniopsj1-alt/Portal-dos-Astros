            function limparTexto() {
            // Pega o elemento pelo ID e define o valor como vazio
            document.getElementById("resultado").style.display = 'none';
            dataNascimento.value = 'dd/mm/aaaa';
            nome.value = '';
            document.getElementById("btnVoltar").style.display = "none";
            }

            function calcularSigno(dataNasc) {
            const dia = dataNasc.getUTCDate();
            const mesSigno = dataNasc.getUTCMonth() + 1;

            if ((mesSigno === 3 && dia >= 21) || (mesSigno === 4 && dia <= 20)) {
                return { signo: 'Áries ♈', imagem: '01 - ARIES.png' };
            }
            if ((mesSigno === 4 && dia >= 21) || (mesSigno === 5 && dia <= 20)) {
                return { signo: 'Touro ♉', imagem: '02 - TOURO.png' };
            }
            if ((mesSigno === 5 && dia >= 21) || (mesSigno === 6 && dia <= 20)) {
                return { signo: 'Gêmeos ♊', imagem: '03 - GÊMEOS.png' };
            }
            if ((mesSigno === 6 && dia >= 21) || (mesSigno === 7 && dia <= 22)) {
                return { signo: 'Câncer ♋', imagem: '04 - CÂNCER.png' };
            }
            if ((mesSigno === 7 && dia >= 23) || (mesSigno === 8 && dia <= 22)) {
                return { signo: 'Leão ♌', imagem: '05 - LEÃO.png' };
            }
            if ((mesSigno === 8 && dia >= 23) || (mesSigno === 9 && dia <= 22)) {
                return { signo: 'Virgem ♍', imagem: '06 - VIRGEM.png' };
            }
            if ((mesSigno === 9 && dia >= 23) || (mesSigno === 10 && dia <= 22)) {
                return { signo: 'Libra ♎', imagem: '07 - LIBRA.png' };
            }
            if ((mesSigno === 10 && dia >= 23) || (mesSigno === 11 && dia <= 21)) {
                return { signo: 'Escorpião ♏', imagem: '08 - ESCORPIÃO.png' };
            }
            if ((mesSigno === 11 && dia >= 22) || (mesSigno === 12 && dia <= 21)) {
                return { signo: 'Sagitário ♐', imagem: '09 - Sagitário.png' };
            }
            if ((mesSigno === 12 && dia >= 22) || (mesSigno === 1 && dia <= 20)) {
                return { signo: 'Capricórnio ♑', imagem: '10 - Capricórnio.png' };
            }
            if ((mesSigno === 1 && dia >= 21) || (mesSigno === 2 && dia <= 18)) {
                return { signo: 'Aquário ♒', imagem: '11 - Aquário.png' };
            }
            if ((mesSigno === 2 && dia >= 19) || (mesSigno === 3 && dia <= 20)) {
                return { signo: 'Peixes ♓', imagem: '12 - PEIXES.png' };
            }

            return { signo: 'Signo não identificado', imagem: '' };
        }

        async function buscarHoroscopo(signo) {
            const elemento = document.getElementById('horoscopoTexto');
            elemento.textContent = 'Buscando o horóscopo do dia...';

            if (!window.puter || !window.puter.ai) {
                elemento.textContent = 'Puter não carregou. Verifique se a biblioteca do Puter está disponível e se você está logado.';
                return;
            }

            try {
                const resposta = await window.puter.ai.chat(
                    `Você é um astrólogo. Me diga o horóscopo do dia para o signo ${signo}. Responda em português, em 3 frases curtas e naturais.`
                );

                const texto = typeof resposta === 'string'
                    ? resposta
                    : resposta?.message?.content || resposta?.content || 'Não foi possível obter o horóscopo do dia.';

                elemento.textContent = texto;
            } catch (error) {
                console.error('Erro ao buscar horóscopo:', error);
                elemento.textContent = 'Não foi possível buscar o horóscopo do dia no momento.';
            }
        }

            document.getElementById('astrosForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const dataNascInput = document.getElementById('dataNascimento').value;

            if (!dataNascInput) return;

            const dataNasc = new Date(`${dataNascInput}T12:00:00`);
            const hoje = new Date();

            let idade = hoje.getFullYear() - dataNasc.getFullYear();
            const mes = hoje.getMonth() - dataNasc.getMonth();
            if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
                idade--;
            }

            const resultado = calcularSigno(dataNasc);
            const signo = resultado.signo;
            const imagemSigno = resultado.imagem;

            document.getElementById('resNome').textContent = nome || 'Usuário';
            document.getElementById('resIdade').textContent = idade;
            document.getElementById('resSigno').textContent = signo;
            document.getElementById('imgSigno').src = imagemSigno;
            document.getElementById('boxImagemSigno').style.display = 'block';
            document.getElementById('resultado').style.display = 'block';
            document.getElementById("btnVoltar").style.display = "block";
            await buscarHoroscopo(signo);
        });