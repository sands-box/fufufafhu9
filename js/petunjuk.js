window.TL = window.TL || {};

window.TL.Petunjuk = {
    data: {
        refleksi: [
            "Buka tab Pemantik terlebih dahulu. Amati kelima gambar proses secara urut dari atas ke bawah, sambil memikirkan jawaban dari tiap pertanyaan yang tertulis di sampingnya.",
            "Pindah ke tab Eksplorasi & Temuan. Di mode 2D, klik dan tarik langsung titik A, B, atau C di kanvas untuk mengubah bentuk segitiganya.",
            "Ganti garis cermin lewat menu dropdown untuk mencoba arah pencerminan yang berbeda: sumbu X, sumbu Y, atau garis y = x.",
            "Nyalakan \"Tampilkan Garis Bantu\" untuk melihat angka jarak yang sebenarnya, lengkap dengan tanda sama panjang dan siku-siku, bukan cuma tebakan mata.",
            "Coba juga \"Pratinjau Refleksi Ganda\" untuk melihat hasil pencerminan dua kali berturut-turut.",
            "Di mode 3D, geser ketiga slidernya (Jarak ke Cermin, Kiri-Kanan, Atas-Bawah) untuk menggerakkan kotak ke segala arah, lalu putar tampilannya dengan menarik area kanvas.",
            "Tuliskan pengamatan dan simpulanmu di panel kanan. Semua kolom wajib diisi sebelum bisa disimpan.",
            "Klik \"Simpan & Selesaikan Modul\" untuk menandai modul ini selesai."
        ],
        translasi: [
            "Buka tab Pemantik terlebih dahulu. Amati kelima gambar proses secara urut, sambil memikirkan jawaban dari tiap pertanyaan yang tertulis di sampingnya.",
            "Pindah ke tab Eksplorasi & Temuan. Di mode 2D, geser slider dx (geser X) dan dy (geser Y), atau tarik langsung titik-titiknya di kanvas.",
            "Nyalakan \"Tampilkan Garis Bantu\" untuk melihat vektor pergeseran dan komponen jaraknya secara langsung.",
            "Di mode 3D, geser ketiga slidernya untuk menggerakkan kotak ke segala arah, lalu putar tampilannya dengan menarik area kanvas.",
            "Tuliskan pengamatan dan simpulanmu di panel kanan. Semua kolom wajib diisi sebelum bisa disimpan.",
            "Klik \"Simpan & Selesaikan Modul\" untuk menandai modul ini selesai."
        ],
        rotasi: [
            "Buka tab Pemantik terlebih dahulu. Amati kelima gambar proses secara urut, sambil memikirkan jawaban dari tiap pertanyaan yang tertulis di sampingnya.",
            "Pindah ke tab Eksplorasi & Temuan. Di mode 2D, geser slider sudut rotasi untuk memutar bangunnya mengelilingi titik pusat.",
            "Nyalakan \"Tampilkan Garis Bantu\" untuk melihat jari-jari dan besar sudut putarnya secara langsung.",
            "Di mode 3D, geser slidernya untuk mengatur sudut dan posisi, lalu putar tampilannya dengan menarik area kanvas.",
            "Tuliskan pengamatan dan simpulanmu di panel kanan. Semua kolom wajib diisi sebelum bisa disimpan.",
            "Klik \"Simpan & Selesaikan Modul\" untuk menandai modul ini selesai."
        ],
        dilatasi: [
            "Buka tab Pemantik terlebih dahulu. Amati kelima gambar proses secara urut, sambil memikirkan jawaban dari tiap pertanyaan yang tertulis di sampingnya.",
            "Pindah ke tab Eksplorasi & Temuan. Di mode 2D, geser slider faktor skala (k) untuk membesarkan atau mengecilkan bangunnya.",
            "Nyalakan \"Tampilkan Garis Bantu\" untuk melihat jarak titik ke pusat sebelum dan sesudah didilatasi.",
            "Di mode 3D, geser slidernya untuk mengatur skala dan posisi, lalu putar tampilannya dengan menarik area kanvas.",
            "Tuliskan pengamatan dan simpulanmu di panel kanan. Semua kolom wajib diisi sebelum bisa disimpan.",
            "Klik \"Simpan & Selesaikan Modul\" untuk menandai modul ini selesai."
        ]
    },

    show(moduleId) {
        const steps = this.data[moduleId] || [];
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'modal-petunjuk';
        overlay.innerHTML = `
            <div class="modal-box">
                <h3>Petunjuk Penggunaan Modul ${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}</h3>
                <ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>
                <button class="btn btn-primary" id="btn-tutup-petunjuk">Mengerti</button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('#btn-tutup-petunjuk').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }
};
