window.TL = window.TL || {};

window.TL.Gabungan = {
    data: {
        refleksi: {
            q1: "Bagaimana jarak titik asal ke garis cermin dibandingkan dengan jarak bayangan ke garis cermin? (cek angkanya lewat \"Tampilkan Garis Bantu\" di mode 2D maupun 3D)",
            q2: "Apakah bentuk dan ukuran bangun berubah setelah direfleksikan?",
            simpulan: "Kalau adik kelasmu belum pernah dengar refleksi, bagaimana kamu jelaskan aturannya pakai kata-katamu sendiri?",
            promptBefore: "Geser titik-titik segitiganya, atau ganti garis cerminnya. Perhatikan baik-baik: apakah jarak tiap titik ke cermin selalu sama dengan jarak bayangannya ke cermin?",
            promptAfter: "Sekarang garis bantunya menyala, lengkap dengan angka jaraknya. Cek, samakah keduanya?"
        },
        translasi: {
            q1: "Jika nilai X positif, ke arah mana bangun bergeser? Bagaimana jika nilai Y negatif? (cek angkanya lewat \"Tampilkan Garis Bantu\")",
            q2: "Apakah translasi mengubah bentuk dan arah hadap bangun datar?",
            simpulan: "Kalau adik kelasmu belum pernah dengar translasi, bagaimana kamu jelaskan aturannya pakai kata-katamu sendiri?",
            promptBefore: "Geser slider dx dan dy, atau tarik langsung titik-titiknya. Perhatikan bagaimana arah dan jarak pergeserannya.",
            promptAfter: "Sekarang garis bantunya menyala, menunjukkan vektor pergeseran dan komponennya."
        },
        rotasi: {
            q1: "Apa yang terjadi pada posisi titik jika diputar 90 derajat berlawanan jarum jam? (cek angkanya lewat \"Tampilkan Garis Bantu\")",
            q2: "Apakah jarak dari pusat putaran ke titik asal berubah setelah rotasi?",
            simpulan: "Kalau adik kelasmu belum pernah dengar rotasi, bagaimana kamu jelaskan aturannya pakai kata-katamu sendiri?",
            promptBefore: "Geser slider sudut rotasi. Perhatikan bagaimana posisi titik berubah mengelilingi pusat.",
            promptAfter: "Sekarang garis bantunya menyala, menunjukkan jari-jari dan sudut putarnya."
        },
        dilatasi: {
            q1: "Apa perbedaan bayangan yang dihasilkan ketika faktor skala (k) lebih dari 1 dibandingkan dengan k antara 0 dan 1? (cek angkanya lewat \"Tampilkan Garis Bantu\")",
            q2: "Apakah dilatasi mempertahankan bentuk asli dari bangun tersebut?",
            simpulan: "Kalau adik kelasmu belum pernah dengar dilatasi, bagaimana kamu jelaskan aturannya pakai kata-katamu sendiri?",
            promptBefore: "Geser slider faktor skala (k). Perhatikan bagaimana ukuran dan jarak titik ke pusat berubah.",
            promptAfter: "Sekarang garis bantunya menyala, menunjukkan jarak titik ke pusat sebelum dan sesudah."
        }
    },

    render(target, moduleId) {
        const data = this.data[moduleId];
        if (!data) return;

        const isCompleted = window.TL.State.data.progress[moduleId];

        if (isCompleted) {
            this.renderCompleted(target, moduleId, data);
            return;
        }

        target.innerHTML = `
            <div class="gabungan-layout">
                <div class="gabungan-kiri">
                    <div class="canvas-header">
                        <h3 style="color: var(--color-warm-light); font-size:0.95rem;">Eksplorasi: <span style="color: var(--color-${moduleId}); text-transform: capitalize;">${moduleId}</span></h3>
                        <div class="mode-toggle">
                            <button class="mode-btn active" id="btn-mode-2d">2D</button>
                            <button class="mode-btn" id="btn-mode-3d">3D</button>
                        </div>
                    </div>
                    <div class="eksplorasi-prompt" id="eks-prompt">${data.promptBefore}</div>
                    <div class="canvas-container" id="canvas-container-2d"></div>
                    <div class="canvas-container" id="canvas-container-3d" style="display:none;"></div>
                </div>
                <div class="gabungan-kanan">
                    <h3 style="color: var(--color-warm-light); margin-bottom: 18px; font-size:1.1rem;">Temuan &amp; Simpulan</h3>
                    <div class="temuan-card">
                        <h4>Pertanyaan 1</h4>
                        <p>${data.q1}</p>
                        <textarea class="temuan-input" id="input-q1" placeholder="Tuliskan pengamatanmu di sini..."></textarea>
                        <p class="temuan-error" id="error-q1"></p>
                    </div>
                    <div class="temuan-card">
                        <h4>Pertanyaan 2</h4>
                        <p>${data.q2}</p>
                        <textarea class="temuan-input" id="input-q2" placeholder="Tuliskan pengamatanmu di sini..."></textarea>
                        <p class="temuan-error" id="error-q2"></p>
                    </div>
                    <div class="temuan-card simpulan">
                        <h4>Simpulan Akhir</h4>
                        <p>${data.simpulan}</p>
                        <textarea class="temuan-input" id="input-simpulan" style="min-height:120px;" placeholder="Tuliskan simpulan akhirmu di sini..."></textarea>
                        <p class="temuan-error" id="error-simpulan"></p>
                    </div>
                    <div style="text-align:right;">
                        <button class="btn btn-primary" id="btn-simpan">Simpan &amp; Selesaikan Modul</button>
                    </div>
                </div>
            </div>
        `;

        window.TL.Canvas2D.render(target.querySelector('#canvas-container-2d'), moduleId);

        const promptEl = target.querySelector('#eks-prompt');
        window.TL.Canvas2D.onBantuToggle = (isOn) => {
            promptEl.innerText = isOn ? data.promptAfter : data.promptBefore;
        };

        target.querySelector('#btn-mode-2d').addEventListener('click', () => {
            target.querySelector('#btn-mode-2d').classList.add('active');
            target.querySelector('#btn-mode-3d').classList.remove('active');
            target.querySelector('#canvas-container-2d').style.display = 'block';
            target.querySelector('#canvas-container-3d').style.display = 'none';
            window.dispatchEvent(new Event('resize'));
        });
        target.querySelector('#btn-mode-3d').addEventListener('click', () => {
            target.querySelector('#btn-mode-3d').classList.add('active');
            target.querySelector('#btn-mode-2d').classList.remove('active');
            target.querySelector('#canvas-container-3d').style.display = 'block';
            target.querySelector('#canvas-container-2d').style.display = 'none';
            if (!target.querySelector('#canvas-container-3d').dataset.loaded) {
                window.TL.Canvas3D.render(target.querySelector('#canvas-container-3d'), moduleId);
                target.querySelector('#canvas-container-3d').dataset.loaded = '1';
            }
            setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
        });

        const btnSimpan = target.querySelector('#btn-simpan');
        btnSimpan.addEventListener('click', () => {
            const fields = ['q1', 'q2', 'simpulan'];
            let allFilled = true;
            fields.forEach(f => {
                const input = target.querySelector(`#input-${f}`);
                const error = target.querySelector(`#error-${f}`);
                if (input.value.trim().length === 0) {
                    allFilled = false;
                    input.classList.add('input-error');
                    error.innerText = 'Isi dulu bagian ini sebelum menyimpan.';
                } else {
                    input.classList.remove('input-error');
                    error.innerText = '';
                }
            });
            if (!allFilled) return;

            window.TL.State.data.progress[moduleId] = true;
            window.TL.State.data.answers = window.TL.State.data.answers || {};
            window.TL.State.data.answers[moduleId] = {
                q1: target.querySelector('#input-q1').value,
                q2: target.querySelector('#input-q2').value,
                simpulan: target.querySelector('#input-simpulan').value
            };
            window.TL.State.save();
            this.render(target, moduleId);
        });
    },

    renderCompleted(target, moduleId, data) {
        target.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:center; height:100%; padding:40px; position:relative;">
                <button class="btn-settings-gear" id="btn-gear-completed" title="Pengaturan" style="position:absolute; top:20px; right:20px;">&#9881;</button>
                <div id="completed-box" style="background-color: rgba(52, 211, 153, 0.1); border: 1px solid var(--color-dilatasi); padding: 40px; border-radius: 12px; text-align: center; max-width: 520px;">
                    <h3 style="color: var(--color-dilatasi); margin-bottom: 16px; font-size: 1.5rem;">Modul Selesai!</h3>
                    <p style="color: var(--color-warm-light); margin-bottom: 24px; font-size: 1.05rem;">Kamu sudah menyelesaikan eksplorasi dan simpulan untuk materi ini dengan baik.</p>
                    <div style="display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-secondary" id="btn-riwayat">Lihat Riwayat</button>
                        <button class="btn btn-primary" id="btn-back-dash">Kembali ke Dashboard</button>
                    </div>
                </div>
            </div>
        `;

        target.querySelector('#btn-gear-completed').addEventListener('click', () => window.TL.Settings.show());
        target.querySelector('#btn-back-dash').addEventListener('click', () => window.TL.App.navigate('dashboard'));
        target.querySelector('#btn-riwayat').addEventListener('click', () => {
            const ans = (window.TL.State.data.answers && window.TL.State.data.answers[moduleId]) || { q1: '-', q2: '-', simpulan: '-' };
            target.querySelector('#completed-box').innerHTML = `
                <h3 style="color: var(--color-teal); margin-bottom: 20px; font-size: 1.3rem;">Riwayat Jawabanmu</h3>
                <div style="text-align:left;">
                    <div class="temuan-card">
                        <h4>Pertanyaan 1</h4>
                        <p style="opacity:0.85;">${data.q1}</p>
                        <p style="color: var(--color-warm-light); background: var(--color-navy-deep); padding:10px; border-radius:6px; margin-top:8px;">${ans.q1 || '-'}</p>
                    </div>
                    <div class="temuan-card">
                        <h4>Pertanyaan 2</h4>
                        <p style="opacity:0.85;">${data.q2}</p>
                        <p style="color: var(--color-warm-light); background: var(--color-navy-deep); padding:10px; border-radius:6px; margin-top:8px;">${ans.q2 || '-'}</p>
                    </div>
                    <div class="temuan-card simpulan">
                        <h4>Simpulan Akhir</h4>
                        <p style="color: var(--color-warm-light); background: var(--color-navy-deep); padding:10px; border-radius:6px; margin-top:8px;">${ans.simpulan || '-'}</p>
                    </div>
                </div>
                <div style="text-align:center; margin-top:16px;">
                    <button class="btn btn-primary" id="btn-back-dash2">Kembali ke Dashboard</button>
                </div>
            `;
            target.querySelector('#btn-back-dash2').addEventListener('click', () => window.TL.App.navigate('dashboard'));
        });
    }
};
