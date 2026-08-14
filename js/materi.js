window.TL = window.TL || {};

window.TL.Materi = {
    data: {
        refleksi: {
            title: "Refleksi (Pencerminan)",
            body: `
                <p style="margin-bottom: 16px;">Refleksi atau pencerminan adalah suatu transformasi yang memindahkan setiap titik pada bidang dengan menggunakan sifat bayangan cermin dari titik-titik yang akan dipindahkan.</p>
                <p style="margin-bottom: 16px;">Sifat-sifat refleksi:</p>
                <ul style="margin-left: 24px; margin-bottom: 24px;">
                    <li style="margin-bottom: 8px;">Jarak titik asal ke cermin sama dengan jarak cermin ke titik bayangan.</li>
                    <li style="margin-bottom: 8px;">Garis yang menghubungkan titik asal dengan titik bayangan tegak lurus terhadap cermin.</li>
                    <li style="margin-bottom: 8px;">Bentuk dan ukuran bangun tidak berubah.</li>
                </ul>
                <p style="padding: 16px; background-color: rgba(56, 189, 248, 0.1); border-left: 4px solid var(--color-refleksi); border-radius: 4px;"><strong>Persiapan Eksplorasi:</strong> Di tahap eksplorasi nanti, kamu akan mencoba mencerminkan bangun datar terhadap Sumbu-X, Sumbu-Y, dan garis y = x.</p>
            `
        },
        translasi: {
            title: "Translasi (Pergeseran)",
            body: `
                <p style="margin-bottom: 16px;">Translasi adalah transformasi yang memindahkan setiap titik pada bidang menurut jarak dan arah tertentu. Jarak dan arah ini biasanya dinyatakan dalam bentuk vektor translasi (x, y).</p>
                <p style="margin-bottom: 16px;">Aturan translasi:</p>
                <ul style="margin-left: 24px; margin-bottom: 24px;">
                    <li style="margin-bottom: 8px;">Nilai <strong>x</strong> menentukan pergeseran horizontal (kanan positif, kiri negatif).</li>
                    <li style="margin-bottom: 8px;">Nilai <strong>y</strong> menentukan pergeseran vertikal (atas positif, bawah negatif).</li>
                    <li style="margin-bottom: 8px;">Translasi tidak mengubah bentuk dan ukuran bangun geometri, hanya posisinya saja.</li>
                </ul>
                <p style="padding: 16px; background-color: rgba(245, 158, 66, 0.1); border-left: 4px solid var(--color-translasi); border-radius: 4px;"><strong>Persiapan Eksplorasi:</strong> Silakan bereksperimen dengan mengubah nilai X dan Y pada tab Eksplorasi untuk melihat bagaimana koordinat bangun bergeser.</p>
            `
        },
        rotasi: {
            title: "Rotasi (Perputaran)",
            body: `
                <p style="margin-bottom: 16px;">Rotasi adalah transformasi yang memindahkan suatu titik ke titik lain dengan perputaran terhadap titik pusat tertentu dan sudut tertentu.</p>
                <p style="margin-bottom: 16px;">Elemen penting dalam rotasi:</p>
                <ul style="margin-left: 24px; margin-bottom: 24px;">
                    <li style="margin-bottom: 8px;"><strong>Titik Pusat Rotasi:</strong> Titik acuan perputaran (dalam program magang ini kita menggunakan pusat koordinat O(0,0)).</li>
                    <li style="margin-bottom: 8px;"><strong>Sudut Rotasi:</strong> Besaran perputaran. Sudut positif berarti berlawanan arah jarum jam, sedangkan sudut negatif searah jarum jam.</li>
                </ul>
                <p style="padding: 16px; background-color: rgba(167, 139, 250, 0.1); border-left: 4px solid var(--color-rotasi); border-radius: 4px;"><strong>Persiapan Eksplorasi:</strong> Cobalah merotasikan bangun dengan sudut 90&deg;, 180&deg;, dan 270&deg; berlawanan arah jarum jam pada tab Eksplorasi.</p>
            `
        },
        dilatasi: {
            title: "Dilatasi (Penskalaan)",
            body: `
                <p style="margin-bottom: 16px;">Dilatasi adalah transformasi yang mengubah ukuran (memperbesar atau memperkecil) suatu bangun geometri tanpa mengubah bentuknya.</p>
                <p style="margin-bottom: 16px;">Faktor penentu dilatasi:</p>
                <ul style="margin-left: 24px; margin-bottom: 24px;">
                    <li style="margin-bottom: 8px;"><strong>Pusat Dilatasi:</strong> Titik acuan penarikan skala (kita gunakan pusat koordinat O(0,0)).</li>
                    <li style="margin-bottom: 8px;"><strong>Faktor Skala (k):</strong> Menentukan seberapa besar atau kecil bayangan yang dihasilkan. Jika k &gt; 1, bangun membesar. Jika 0 &lt; k &lt; 1, bangun mengecil. Jika k negatif, arah pembesaran berlawanan dari pusat koordinat.</li>
                </ul>
                <p style="padding: 16px; background-color: rgba(52, 211, 153, 0.1); border-left: 4px solid var(--color-dilatasi); border-radius: 4px;"><strong>Persiapan Eksplorasi:</strong> Geser slider faktor skala pada tab Eksplorasi untuk mengamati perubahan ukuran dan perpindahan titik koordinat bayangan.</p>
            `
        }
    },
    
    render(target, moduleId) {
        const materi = this.data[moduleId];
        if (!materi) return;
        
        target.innerHTML = `
            <div style="padding: 40px; max-width: 800px;">
                <h2 style="color: var(--color-${moduleId}); margin-bottom: 24px; font-size: 2rem;">${materi.title}</h2>
                <div style="font-size: 1.15rem; line-height: 1.7; color: var(--color-warm-light);">
                    ${materi.body}
                </div>
            </div>
        `;
    }
};