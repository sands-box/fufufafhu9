window.TL = window.TL || {};

window.TL.Temuan = {
    data: {
        refleksi: {
            q1: "Bagaimana jarak titik asal ke garis cermin dibandingkan dengan jarak bayangan ke garis cermin?",
            q2: "Apakah bentuk dan ukuran bangun berubah setelah direfleksikan?",
            simpulan: "Berdasarkan hasil eksplorasi, tuliskan simpulanmu tentang apa itu refleksi dan sifat-sifatnya!"
        },
        translasi: {
            q1: "Jika nilai X positif, ke arah mana bangun bergeser? Bagaimana jika nilai Y negatif?",
            q2: "Apakah translasi mengubah bentuk dan arah hadap bangun datar?",
            simpulan: "Berdasarkan hasil eksplorasi, tuliskan simpulanmu tentang apa itu translasi dan bagaimana perubahannya!"
        },
        rotasi: {
            q1: "Apa yang terjadi pada posisi titik jika diputar 90 derajat berlawanan jarum jam?",
            q2: "Apakah jarak dari pusat putaran ke titik asal berubah setelah rotasi?",
            simpulan: "Berdasarkan hasil eksplorasi, tuliskan simpulanmu tentang apa itu rotasi dan pengaruh sudut putarannya!"
        },
        dilatasi: {
            q1: "Apa perbedaan bayangan yang dihasilkan ketika faktor skala (k) lebih dari 1 dibandingkan dengan k antara 0 dan 1?",
            q2: "Apakah dilatasi mempertahankan bentuk asli dari bangun tersebut?",
            simpulan: "Berdasarkan hasil eksplorasi, tuliskan simpulanmu tentang apa itu dilatasi dan pengaruh faktor skalanya!"
        }
    },

    render(target, moduleId) {
        const materi = this.data[moduleId];
        if (!materi) return;

        const isCompleted = window.TL.State.data.progress[moduleId];

        let html = `
            <div class="temuan-container">
                <h2 style="color: var(--color-${moduleId}); margin-bottom: 32px; font-size: 2rem; text-transform: capitalize;">Temuan & Simpulan: ${moduleId}</h2>
        `;

        if (isCompleted) {
            html += `
                <div style="background-color: rgba(52, 211, 153, 0.1); border: 1px solid var(--color-dilatasi); padding: 32px; border-radius: 12px; text-align: center;">
                    <h3 style="color: var(--color-dilatasi); margin-bottom: 16px; font-size: 1.5rem;">Modul Selesai!</h3>
                    <p style="color: var(--color-warm-light); margin-bottom: 24px; font-size: 1.1rem;">Kamu sudah menyelesaikan laporan temuan dan simpulan untuk materi ini dengan baik.</p>
                    <button class="btn btn-primary" id="btn-back-dash">Kembali ke Dashboard</button>
                </div>
            </div>`;
            target.innerHTML = html;
            
            target.querySelector('#btn-back-dash').addEventListener('click', () => {
                window.TL.App.navigate('dashboard');
            });
            return;
        }

        html += `
                <form id="temuan-form">
                    <div class="temuan-card">
                        <h4 style="color: var(--color-accent-blue); margin-bottom: 16px;">Pertanyaan Panduan 1</h4>
                        <p style="color: var(--color-warm-light); font-size: 1.1rem; margin-bottom: 8px;">${materi.q1}</p>
                        <textarea class="temuan-input" required placeholder="Tuliskan pengamatanmu di sini..."></textarea>
                    </div>
                    <div class="temuan-card">
                        <h4 style="color: var(--color-accent-blue); margin-bottom: 16px;">Pertanyaan Panduan 2</h4>
                        <p style="color: var(--color-warm-light); font-size: 1.1rem; margin-bottom: 8px;">${materi.q2}</p>
                        <textarea class="temuan-input" required placeholder="Tuliskan pengamatanmu di sini..."></textarea>
                    </div>
                    <div class="temuan-card" style="border-color: rgba(245, 158, 66, 0.5);">
                        <h4 style="color: var(--color-accent-amber); margin-bottom: 16px;">Simpulan Akhir</h4>
                        <p style="color: var(--color-warm-light); font-size: 1.1rem; margin-bottom: 8px;">${materi.simpulan}</p>
                        <textarea class="temuan-input" style="min-height: 150px; border-color: rgba(245, 158, 66, 0.3);" required placeholder="Tuliskan simpulan akhirmu secara lengkap dan formal..."></textarea>
                    </div>
                    <div style="text-align: right;">
                        <button type="submit" class="btn btn-primary" style="padding: 14px 40px; font-size: 1.1rem;">Simpan & Selesaikan Modul</button>
                    </div>
                </form>
            </div>
        `;
        
        target.innerHTML = html;

        const form = target.querySelector('#temuan-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.TL.State.data.progress[moduleId] = true;
            window.TL.State.save();
            this.render(target, moduleId);
        });
    }
};