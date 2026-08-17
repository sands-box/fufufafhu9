window.TL = window.TL || {};

window.TL.Assessment = {
    tierPools: { 1: [], 2: [], 3: [] },
    flatQuestions: [],
    currentIndex: 0,
    score: 0,
    userAnswers: [],

    _shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    _tierInfo: {
        1: { nama: 'Tingkat 1: Dasar', desc: 'Soal-soal pemahaman dasar mengenai definisi dan konsep inti tiap transformasi.' },
        2: { nama: 'Tingkat 2: Menengah', desc: 'Soal-soal penerapan rumus dan perhitungan koordinat hasil transformasi.' },
        3: { nama: 'Tingkat 3: Lanjutan', desc: 'Soal-soal analisis dan gabungan beberapa transformasi sekaligus.' }
    },

    _diagrams: {
        'rotasi180-refleksiX': `
            <svg viewBox="0 0 240 200" style="width:100%; max-width:280px; margin: 16px auto; display:block;">
                <line x1="20" y1="100" x2="220" y2="100" stroke="rgba(254,243,199,0.4)" stroke-width="1.5"/>
                <line x1="120" y1="10" x2="120" y2="190" stroke="rgba(254,243,199,0.4)" stroke-width="1.5"/>
                <circle cx="200" cy="60" r="5" fill="#38bdf8"/><text x="200" y="48" fill="#38bdf8" font-size="12" text-anchor="middle">E(4,2)</text>
                <circle cx="40" cy="140" r="5" fill="#a78bfa"/><text x="40" y="158" fill="#a78bfa" font-size="12" text-anchor="middle">(-4,-2)</text>
                <circle cx="40" cy="60" r="5" fill="#f59e42"/><text x="40" y="48" fill="#f59e42" font-size="12" text-anchor="middle">(-4,2)</text>
                <path d="M195 65 L45 135" stroke="#a78bfa" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
                <path d="M40 135 L40 65" stroke="#f59e42" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
            </svg>`,
        'dilatasi-kuadran': `
            <svg viewBox="0 0 240 200" style="width:100%; max-width:280px; margin: 16px auto; display:block;">
                <line x1="20" y1="100" x2="220" y2="100" stroke="rgba(254,243,199,0.4)" stroke-width="1.5"/>
                <line x1="120" y1="10" x2="120" y2="190" stroke="rgba(254,243,199,0.4)" stroke-width="1.5"/>
                <text x="70" y="30" fill="rgba(254,243,199,0.5)" font-size="11">Kuadran II</text>
                <text x="150" y="185" fill="rgba(254,243,199,0.5)" font-size="11">Kuadran IV</text>
                <circle cx="90" cy="60" r="5" fill="#38bdf8"/><text x="90" y="48" fill="#38bdf8" font-size="12" text-anchor="middle">F(-2,4)</text>
                <circle cx="180" cy="180" r="5" fill="#f59e42"/><text x="180" y="168" fill="#f59e42" font-size="12" text-anchor="middle">F'(4,-8)</text>
                <path d="M92 63 L177 176" stroke="#fef3c7" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
            </svg>`
    },

    render(target) {
        this.currentIndex = 0;
        this.score = 0;
        this.userAnswers = [];

        const data = window.TL.SOAL_DATA;
        if (!data || !data.length) {
            target.innerHTML = `
                <div class="flex-center" style="background-color: var(--color-navy-deep);">
                    <div style="background-color: var(--color-navy); padding: 40px; border-radius: 12px; max-width: 600px; text-align: center; border: 1px solid var(--color-accent-amber);">
                        <h2 style="color: var(--color-accent-amber); margin-bottom: 16px;">Gagal Memuat Soal</h2>
                        <p style="color: var(--color-warm-light); font-size: 1.1rem; line-height: 1.6;">Data soal (/assets/data/soal.js) belum termuat.</p>
                    </div>
                </div>
            `;
            return;
        }

        this.tierPools = { 1: [], 2: [], 3: [] };
        data.forEach(q => { if (this.tierPools[q.tier]) this.tierPools[q.tier].push(q); });
        this.flatQuestions = [
            ...this._shuffle(this.tierPools[1]),
            ...this._shuffle(this.tierPools[2]),
            ...this._shuffle(this.tierPools[3])
        ];
        this.questions = this.flatQuestions;

        this.showTierIntro(target, 1);
    },

    showTierIntro(target, tier) {
        const info = this._tierInfo[tier];
        target.innerHTML = `
            <div class="flex-center" style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width:100%; height:100vh; flex-direction:column; gap:20px; position:relative;">
                <button class="btn-settings-gear scene-gear" id="btn-gear-tier" title="Pengaturan">&#9881;</button>
                <div style="background:var(--color-navy); border:1px solid var(--color-teal); border-radius:16px; padding:44px; max-width:520px; text-align:center;">
                    <span style="display:inline-block; padding:6px 16px; border-radius:20px; background:rgba(20,184,166,0.15); color:var(--color-teal); font-family:'Poppins',sans-serif; font-weight:700; font-size:0.85rem; margin-bottom:18px;">BAGIAN ${tier} DARI 3</span>
                    <h2 style="color:var(--color-teal); font-size:1.8rem; margin-bottom:16px;">${info.nama}</h2>
                    <p style="color:var(--color-warm-light); font-size:1.05rem; line-height:1.6; margin-bottom:28px;">${info.desc}</p>
                    <button class="btn btn-primary" id="btn-mulai-tier" style="padding:14px 36px;">Mulai</button>
                </div>
            </div>
        `;
        target.querySelector('#btn-gear-tier').addEventListener('click', () => window.TL.Settings.show());
        target.querySelector('#btn-mulai-tier').addEventListener('click', () => this.renderQuestion(target));
    },

    renderQuestion(target) {
        if (this.currentIndex >= this.questions.length) {
            this.calculateScore();
            this.showResult(target);
            return;
        }

        const q = this.questions[this.currentIndex];

        let selectedIdx = -1;
        let checkCount = 0;

        const diagramHTML = q.gambar && this._diagrams[q.gambar] ? this._diagrams[q.gambar] : '';

        let html = `
            <div style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; min-height: 100vh;">
                <div class="assessment-wrapper">
                    <div class="assessment-header">
                        <h2>Uji Kompetensi &middot; ${this._tierInfo[q.tier].nama.replace('Tingkat ', 'T')}</h2>
                        <div style="display:flex; align-items:center; gap:14px;">
                            <span style="color: var(--color-accent-blue); font-size: 1.1rem; font-weight: 600;">Soal ${this.currentIndex + 1} dari ${this.questions.length}</span>
                            <button class="btn-settings-gear" id="btn-gear-assess" title="Pengaturan">&#9881;</button>
                        </div>
                    </div>
                    <div style="display:flex; gap:24px; align-items:flex-start;">
                        <div class="question-card" style="flex:1.3;">
                            <div class="question-text">${q.soal}</div>
                            ${diagramHTML}
                            <div class="options-grid" id="options-container">
                                ${q.opsi.map((opt, idx) => `<button class="option-btn" data-index="${idx}">${String.fromCharCode(65 + idx)}. ${opt}</button>`).join('')}
                            </div>
                            <p class="cek-hint" id="cek-hint"></p>
                        </div>
                        <div class="pembahasan-box" id="pembahasan-box" style="flex:1; display:none;">
                            <h4>Pembahasan</h4>
                            <p id="pembahasan-text"></p>
                        </div>
                    </div>
                    <div class="assessment-footer">
                        <button class="btn btn-secondary" id="btn-cek" disabled>Cek</button>
                        <button class="btn btn-primary" id="btn-next" disabled>Selanjutnya</button>
                    </div>
                </div>
            </div>
        `;

        target.innerHTML = html;
        target.querySelector('#btn-gear-assess').addEventListener('click', () => window.TL.Settings.show());

        const opts = target.querySelectorAll('.option-btn');
        const btnCek = target.querySelector('#btn-cek');
        const btnNext = target.querySelector('#btn-next');
        const cekHint = target.querySelector('#cek-hint');
        const pembahasanBox = target.querySelector('#pembahasan-box');
        const pembahasanText = target.querySelector('#pembahasan-text');

        opts.forEach(btn => {
            btn.addEventListener('click', () => {
                if (checkCount > 0) return;
                opts.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedIdx = parseInt(btn.getAttribute('data-index'));
                btnCek.disabled = false;
            });
        });

        btnCek.addEventListener('click', () => {
            checkCount++;
            if (checkCount === 1) {
                opts.forEach((b, idx) => {
                    b.classList.remove('selected');
                    b.disabled = true;
                    if (idx === q.jawaban) b.classList.add('correct');
                    else if (idx === selectedIdx) b.classList.add('wrong');
                });
                this.userAnswers[this.currentIndex] = selectedIdx;
                cekHint.innerText = selectedIdx === q.jawaban
                    ? 'Benar! Klik "Cek" sekali lagi untuk melihat pembahasan, atau langsung lanjut.'
                    : 'Kurang tepat. Klik "Cek" sekali lagi untuk melihat pembahasan, atau langsung lanjut.';
                btnNext.disabled = false;
            } else if (checkCount === 2) {
                pembahasanText.innerText = q.penjelasan || 'Tidak ada pembahasan untuk soal ini.';
                pembahasanBox.style.display = 'block';
                cekHint.innerText = 'Klik "Selanjutnya" untuk lanjut ke soal berikutnya.';
                btnCek.disabled = true;
            }
        });

        btnNext.addEventListener('click', () => {
            if (checkCount === 0) return;
            const prevTier = q.tier;
            this.currentIndex++;
            if (this.currentIndex < this.questions.length && this.questions[this.currentIndex].tier !== prevTier) {
                this.showTierIntro(target, this.questions[this.currentIndex].tier);
                return;
            }
            this.renderQuestion(target);
        });
    },

    calculateScore() {
        this.score = 0;
        this.questions.forEach((q, idx) => {
            if (this.userAnswers[idx] === q.jawaban) this.score++;
        });
        window.TL.State.data.skor = this.score;
        window.TL.State.save();
    },

    _ulangiMagang() {
        window.TL.Audio.stop();
        window.TL.State.reset();
        window.TL.App.navigate('form');
    },

    _kembaliAwal() {
        window.TL.Audio.stop();
        window.TL.State.reset();
        window.TL.App.navigate('landing');
    },

    _unduhHasil() {
        if (!window.jspdf) { alert('Library PDF belum termuat. Pastikan ada koneksi internet.'); return; }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const st = window.TL.State.data;
        let y = 18;
        const lh = 6;
        const maxW = 175;

        const checkPage = (need = lh) => {
            if (y + need > 285) { doc.addPage(); y = 18; }
        };
        const addText = (text, opts = {}) => {
            const size = opts.size || 10;
            const bold = opts.bold || false;
            const color = opts.color || [40, 40, 40];
            doc.setFont('helvetica', bold ? 'bold' : 'normal');
            doc.setFontSize(size);
            doc.setTextColor(color[0], color[1], color[2]);
            const lines = doc.splitTextToSize(text, maxW);
            lines.forEach(line => {
                checkPage();
                doc.text(line, 15, y);
                y += lh;
            });
        };

        addText('LAPORAN HASIL BELAJAR - NARAGEO', { size: 16, bold: true, color: [15, 23, 41] });
        y += 2;
        addText(`Nama: ${st.nama || '-'}`, { size: 11 });
        addText(`Kelas: ${st.kelas || '-'}`, { size: 11 });
        addText(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, { size: 11 });
        y += 4;

        addText('EKSPLORASI & TEMUAN', { size: 13, bold: true, color: [20, 130, 120] });
        y += 1;
        const modulNama = { refleksi: 'Refleksi', translasi: 'Translasi', rotasi: 'Rotasi', dilatasi: 'Dilatasi' };
        Object.keys(modulNama).forEach(mid => {
            checkPage(20);
            addText(modulNama[mid], { size: 11.5, bold: true, color: [15, 23, 41] });
            const ans = (st.answers && st.answers[mid]) || null;
            if (ans) {
                addText(`Pertanyaan 1: ${ans.q1 || '-'}`, { size: 9.5 });
                addText(`Pertanyaan 2: ${ans.q2 || '-'}`, { size: 9.5 });
                addText(`Simpulan: ${ans.simpulan || '-'}`, { size: 9.5 });
            } else {
                addText('Belum dikerjakan.', { size: 9.5, color: [150, 60, 60] });
            }
            y += 2;
        });

        y += 3;
        checkPage(14);
        addText('UJI KOMPETENSI', { size: 13, bold: true, color: [20, 130, 120] });
        addText(`Skor: ${this.score} / ${this.questions.length} (Batas lulus: 9)`, { size: 11, bold: true });
        y += 2;

        this.questions.forEach((q, idx) => {
            checkPage(22);
            const userIdx = this.userAnswers[idx];
            const benar = userIdx === q.jawaban;
            addText(`${idx + 1}. ${q.soal}`, { size: 10, bold: true, color: [15, 23, 41] });
            addText(`Jawaban siswa: ${userIdx != null && userIdx >= 0 ? q.opsi[userIdx] : '(tidak dijawab)'} ${benar ? '(Benar)' : '(Salah)'}`, { size: 9.5, color: benar ? [22, 130, 60] : [180, 40, 40] });
            if (!benar) addText(`Jawaban benar: ${q.opsi[q.jawaban]}`, { size: 9.5, color: [22, 130, 60] });
            addText(`Pembahasan: ${q.penjelasan}`, { size: 9 });
            y += 2;
        });

        doc.save(`Hasil_${(st.nama || 'siswa').replace(/\s+/g, '_')}.pdf`);
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

        const gear = document.createElement('button');
        gear.className = 'btn-settings-gear scene-gear';
        gear.title = 'Pengaturan';
        gear.innerHTML = '&#9881;';
        gear.addEventListener('click', () => window.TL.Settings.show());
        sceneContainer.appendChild(gear);

        if (isLulus) {
            const dialogs = [
                "AKU LULUS! Aku resmi menjadi Arsitek Muda!",
                "Semua perjuangan ini akhirnya terbayar.",
                `Terima kasih sudah tidak menyerah, ${nama}.`
            ];
            window.TL.Narasi.renderChatBubbles(sceneContainer, dialogs, () => {
                this.showFinalActions(target, true);
            }, "assets/images/avatar-senang.png", "Lanjut");
        } else {
            const dialogs = [
                "Hmm, belum lulus kali ini... Tapi tidak apa-apa, yang penting aku sudah belajar banyak.",
                "Aku harus coba lagi. Pasti bisa!"
            ];
            window.TL.Narasi.renderChatBubbles(sceneContainer, dialogs, () => {
                this.showFinalActions(target, false);
            }, "assets/images/avatar-kecewa.png", "Lanjut");
        }
    },

    showFinalActions(target, isLulus) {
        target.innerHTML = `
            <div class="flex-center" style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; height: 100vh; flex-direction: column; gap: 20px; position:relative;">
                <button class="btn-settings-gear scene-gear" id="btn-gear-final" title="Pengaturan">&#9881;</button>
                <h2 style="color: var(--color-accent-amber); font-size: 2.5rem;">Skor Anda: ${this.score} / ${this.questions.length}</h2>
                <p style="color: var(--color-warm-light); font-size: 1.15rem;">${isLulus ? 'Selamat, kamu lulus Uji Kompetensi!' : 'Batas lulus adalah 9 benar (70%). Jangan menyerah!'}</p>
                <div style="display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; justify-content:center;">
                    ${isLulus
                        ? `<button class="btn btn-primary" id="btn-ulangi-magang" style="padding: 14px 32px;">Ulangi Magang</button>`
                        : `<button class="btn btn-primary" id="btn-retry" style="padding: 14px 32px;">Ulangi Uji Kompetensi</button>
                           <button class="btn btn-secondary" id="btn-giveup" style="padding: 14px 32px;">Akhiri Magang</button>`
                    }
                    <button class="btn btn-secondary" id="btn-unduh" style="padding: 14px 32px;">&#128190; Unduh Hasil Kompetensi</button>
                </div>
                <button class="btn btn-secondary" id="btn-kembali-awal" style="position:absolute; bottom:24px; right:24px; font-size:0.85rem; padding:10px 18px;">Kembali ke Awal Cerita</button>
            </div>
        `;

        target.querySelector('#btn-gear-final').addEventListener('click', () => window.TL.Settings.show());
        target.querySelector('#btn-unduh').addEventListener('click', () => this._unduhHasil());
        target.querySelector('#btn-kembali-awal').addEventListener('click', () => this._kembaliAwal());

        if (isLulus) {
            target.querySelector('#btn-ulangi-magang').addEventListener('click', () => this._ulangiMagang());
        } else {
            target.querySelector('#btn-retry').addEventListener('click', () => window.TL.App.navigate('assessment'));
            target.querySelector('#btn-giveup').addEventListener('click', () => {
                target.innerHTML = '';
                const sceneContainer = document.createElement('div');
                sceneContainer.className = 'scene-container';
                const bg = document.createElement('div');
                bg.className = 'bg-gradient';
                sceneContainer.appendChild(bg);
                target.appendChild(sceneContainer);

                const dialogs = [
                    "Kali ini memang belum berhasil... Tapi ilmu yang sudah aku pelajari tidak akan hilang.",
                    "Mungkin lain waktu aku coba lagi. Aku pasti bisa!"
                ];
                window.TL.Narasi.renderChatBubbles(sceneContainer, dialogs, () => {
                    this._ulangiMagang();
                }, "assets/images/avatar-kecewa.png", "Ulangi Magang");
            });
        }
    }
};
