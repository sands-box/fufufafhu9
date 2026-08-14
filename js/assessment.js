window.TL = window.TL || {};

window.TL.Assessment = {
    questions: [],
    currentIndex: 0,
    score: 0,
    userAnswers: [],

    render(target) {
        this.currentIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        fetch('assets/data/soal.json')
            .then(res => res.json())
            .then(data => {
                this.questions = data;
                this.renderQuestion(target);
            })
            .catch(err => {
                target.innerHTML = `
                    <div class="flex-center" style="background-color: var(--color-navy-deep);">
                        <div style="background-color: var(--color-navy); padding: 40px; border-radius: 12px; max-width: 600px; text-align: center; border: 1px solid var(--color-accent-amber);">
                            <h2 style="color: var(--color-accent-amber); margin-bottom: 16px;">Gagal Memuat Soal</h2>
                            <p style="color: var(--color-warm-light); font-size: 1.1rem; line-height: 1.6;">Browser memblokir pembacaan file lokal (soal.json). Jalankan melalui Local Web Server (seperti Live Server VS Code) agar soal dapat dimuat.</p>
                        </div>
                    </div>
                `;
            });
    },

    renderQuestion(target) {
        if (this.currentIndex >= this.questions.length) {
            this.calculateScore();
            this.showResult(target);
            return;
        }

        const q = this.questions[this.currentIndex];
        
        let html = `
            <div style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; min-height: 100vh;">
                <div class="assessment-wrapper">
                    <div class="assessment-header">
                        <h2>Uji Kompetensi</h2>
                        <span style="color: var(--color-accent-blue); font-size: 1.1rem; font-weight: 600;">Soal ${this.currentIndex + 1} dari ${this.questions.length}</span>
                    </div>
                    <div class="question-card">
                        <div class="question-text">${q.soal}</div>
                        <div class="options-grid" id="options-container">
                            ${q.opsi.map((opt, idx) => `<button class="option-btn" data-index="${idx}">${String.fromCharCode(65 + idx)}. ${opt}</button>`).join('')}
                        </div>
                    </div>
                    <div class="assessment-footer">
                        <button class="btn btn-primary" id="btn-next" disabled>Selanjutnya</button>
                    </div>
                </div>
            </div>
        `;
        
        target.innerHTML = html;

        const opts = target.querySelectorAll('.option-btn');
        const btnNext = target.getElementById('btn-next');
        let selectedIdx = -1;

        opts.forEach(btn => {
            btn.addEventListener('click', () => {
                opts.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedIdx = parseInt(btn.getAttribute('data-index'));
                btnNext.disabled = false;
            });
        });

        btnNext.addEventListener('click', () => {
            this.userAnswers.push(selectedIdx);
            this.currentIndex++;
            this.renderQuestion(target);
        });
    },

    calculateScore() {
        this.score = 0;
        this.questions.forEach((q, idx) => {
            if (this.userAnswers[idx] === q.jawaban) {
                this.score++;
            }
        });
        window.TL.State.data.skor = this.score;
        window.TL.State.save();
    },

    showResult(target) {
        const isLulus = this.score >= 9;
        const nama = window.TL.State.data.nama || "Siswa";

        target.innerHTML = '';
        const sceneContainer = document.createElement('div');
        sceneContainer.className = 'scene-container';
        const bg = document.createElement('div');
        bg.className = 'bg-gradient';
        sceneContainer.appendChild(bg);
        target.appendChild(sceneContainer);

        if (isLulus) {
            const dialogs = [
                "AKU LULUS! Aku resmi menjadi Arsitek Muda!",
                "Semua perjuangan ini akhirnya terbayar.",
                `Terima kasih sudah tidak menyerah, ${nama}.`
            ];
            window.TL.Narasi.renderChatBubbles(sceneContainer, dialogs, () => {
                window.TL.App.navigate('certificate');
            }, "assets/images/avatar-senang.png", "Lihat Sertifikat");
        } else {
            const dialogs = [
                "Hmm, belum lulus kali ini...",
                "Tapi tidak apa-apa. Yang penting aku sudah belajar banyak.",
                "Aku harus coba lagi. Pasti bisa!"
            ];
            window.TL.Narasi.renderChatBubbles(sceneContainer, dialogs, () => {
                this.showRetryOption(target);
            }, "assets/images/avatar-kecewa.png", "Lanjut");
        }
    },

    showRetryOption(target) {
        target.innerHTML = `
            <div class="flex-center" style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; height: 100vh; flex-direction: column; gap: 24px;">
                <h2 style="color: var(--color-accent-amber); font-size: 2.5rem;">Skor Anda: ${this.score} / 12</h2>
                <p style="color: var(--color-warm-light); font-size: 1.25rem;">Batas lulus adalah 9 benar (70%). Jangan menyerah!</p>
                <div style="display: flex; gap: 16px; margin-top: 24px;">
                    <button class="btn btn-primary" id="btn-retry" style="padding: 14px 32px;">Ulangi Uji Kompetensi</button>
                    <button class="btn btn-secondary" id="btn-giveup" style="padding: 14px 32px;">Akhiri Magang</button>
                </div>
            </div>
        `;

        target.querySelector('#btn-retry').addEventListener('click', () => {
            window.TL.App.navigate('assessment');
        });

        target.querySelector('#btn-giveup').addEventListener('click', () => {
            target.innerHTML = '';
            const sceneContainer = document.createElement('div');
            sceneContainer.className = 'scene-container';
            const bg = document.createElement('div');
            bg.className = 'bg-gradient';
            sceneContainer.appendChild(bg);
            target.appendChild(sceneContainer);

            const dialogs = [
                "Kali ini memang belum berhasil...",
                "Tapi ilmu yang sudah aku pelajari tidak akan hilang.",
                "Mungkin lain waktu aku coba lagi. Aku pasti bisa!"
            ];
            window.TL.Narasi.renderChatBubbles(sceneContainer, dialogs, () => {
                window.TL.App.navigate('certificate');
            }, "assets/images/avatar-kecewa.png", "Ambil Sertifikat");
        });
    }
};