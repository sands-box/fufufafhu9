window.TL = window.TL || {};

window.TL.Pemantik = {
    data: {
        refleksi: {
            title: "Refleksi (Pencerminan)",
            pemicu: [
                "Lihat baik-baik lima gambar di samping, urut dari atas ke bawah. Pada gambar ke-3, kenapa garis dari P ke cermin harus digambar tegak lurus? Coba bayangkan kalau garisnya miring, apa bedanya?",
                "Di gambar terakhir, jarak P ke cermin dan jarak P' ke cermin sama panjang. Kalau P digeser makin jauh dari cermin, menurutmu P' ikut makin jauh juga, dengan jarak yang tetap sama? Kenapa begitu?",
                "Sekarang bayangkan bukan cuma satu titik, tapi sebuah segitiga utuh yang dicerminkan. Apakah bentuk dan ukurannya berubah? Coba jelaskan alasanmu.",
                "Dari semua yang kamu amati di atas, coba rumuskan sendiri dengan kata-katamu: apa itu refleksi, dan aturan apa saja yang berlaku di dalamnya?"
            ],
            steps: [
                { caption: "Ini titik asal P yang akan dicerminkan.",
                  svg: `<circle cx="90" cy="65" r="7" fill="#38bdf8"/><text x="90" y="46" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Tentukan dulu garis cerminnya.",
                  svg: `<line x1="150" y1="10" x2="150" y2="115" stroke="#f59e42" stroke-width="2.5" stroke-dasharray="6 4"/><text x="150" y="127" fill="#f59e42" font-size="11" text-anchor="middle">cermin</text><circle cx="90" cy="65" r="7" fill="#38bdf8"/><text x="90" y="46" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Tarik garis tegak lurus dari P ke cermin.",
                  svg: `<line x1="150" y1="10" x2="150" y2="115" stroke="#f59e42" stroke-width="2.5" stroke-dasharray="6 4"/><line x1="90" y1="65" x2="150" y2="65" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M 138 65 L 138 53 L 150 53" fill="none" stroke="#fef3c7" stroke-width="1.5"/><circle cx="90" cy="65" r="7" fill="#38bdf8"/><text x="90" y="46" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Perpanjang garis itu ke seberang, sejauh jarak yang sama persis.",
                  svg: `<line x1="150" y1="10" x2="150" y2="115" stroke="#f59e42" stroke-width="2.5" stroke-dasharray="6 4"/><line x1="90" y1="65" x2="210" y2="65" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M 138 65 L 138 53 L 150 53" fill="none" stroke="#fef3c7" stroke-width="1.5"/><line x1="118" y1="59" x2="118" y2="71" stroke="#38bdf8" stroke-width="2"/><line x1="180" y1="59" x2="180" y2="71" stroke="#f59e42" stroke-width="2"/><circle cx="90" cy="65" r="7" fill="#38bdf8"/><text x="90" y="46" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><circle cx="210" cy="65" r="7" fill="none" stroke="#f59e42" stroke-width="2" stroke-dasharray="2 2"/>` },
                { caption: "Sampai di sana, itulah bayangan P', hasil pencerminan dari P.",
                  svg: `<line x1="150" y1="10" x2="150" y2="115" stroke="#f59e42" stroke-width="2.5" stroke-dasharray="6 4"/><line x1="90" y1="65" x2="210" y2="65" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M 138 65 L 138 53 L 150 53" fill="none" stroke="#fef3c7" stroke-width="1.5"/><line x1="118" y1="59" x2="118" y2="71" stroke="#38bdf8" stroke-width="2"/><line x1="180" y1="59" x2="180" y2="71" stroke="#f59e42" stroke-width="2"/><circle cx="90" cy="65" r="7" fill="#38bdf8"/><text x="90" y="46" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><circle cx="210" cy="65" r="7" fill="#f59e42"/><text x="210" y="46" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P'</text>` }
            ]
        },
        translasi: {
            title: "Translasi (Pergeseran)",
            pemicu: [
                "Lihat lima gambar di samping. Kalau vektor pergeserannya (3, 2), ke arah mana bangunnya bergeser, dan sejauh apa?",
                "Apakah arah hadap dan ukuran bangun berubah setelah digeser?",
                "Kalau translasi dilakukan dua kali berturut-turut, misalnya (2,1) lalu (1,3), apakah hasil akhirnya sama dengan translasi (3,4) sekali langsung?",
                "Coba rumuskan sendiri dengan kata-katamu: apa itu translasi, dan bagaimana cara menentukan bayangannya?"
            ],
            steps: [
                { caption: "Ini titik asal P.",
                  svg: `<circle cx="70" cy="80" r="7" fill="#38bdf8"/><text x="70" y="61" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Tentukan vektor pergeserannya, misalnya (3, 2).",
                  svg: `<circle cx="70" cy="80" r="7" fill="#38bdf8"/><text x="70" y="61" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><path d="M 170 30 L 220 30" stroke="#f59e42" stroke-width="2.5" marker-end="url(#arr1)"/><text x="195" y="20" fill="#f59e42" font-size="12" text-anchor="middle">(3, 2)</text><defs><marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f59e42"/></marker></defs>` },
                { caption: "Geser P mengikuti arah vektor tersebut...",
                  svg: `<circle cx="70" cy="80" r="7" fill="#38bdf8"/><text x="70" y="61" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><line x1="70" y1="80" x2="140" y2="55" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="4 3"/>` },
                { caption: "...sejauh panjang vektor pergeserannya.",
                  svg: `<circle cx="70" cy="80" r="7" fill="#38bdf8"/><text x="70" y="61" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><line x1="70" y1="80" x2="200" y2="35" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="200" cy="35" r="7" fill="none" stroke="#f59e42" stroke-width="2" stroke-dasharray="2 2"/>` },
                { caption: "Itulah bayangan P', hasil translasi dari P.",
                  svg: `<circle cx="70" cy="80" r="7" fill="#38bdf8"/><text x="70" y="61" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><line x1="70" y1="80" x2="200" y2="35" stroke="#f59e42" stroke-width="2" marker-end="url(#arr2)"/><circle cx="200" cy="35" r="7" fill="#f59e42"/><text x="200" y="20" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P'</text><defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f59e42"/></marker></defs>` }
            ]
        },
        rotasi: {
            title: "Rotasi (Perputaran)",
            pemicu: [
                "Lihat lima gambar di samping. Selama P diputar mengelilingi pusat O, apakah jarak P ke O berubah?",
                "Kalau P diputar 180° terhadap O, di manakah posisi bayangannya dibanding posisi awal?",
                "Apakah bentuk dan ukuran bangun berubah setelah dirotasikan?",
                "Coba rumuskan sendiri dengan kata-katamu: apa itu rotasi, dan apa saja yang menentukan hasilnya?"
            ],
            steps: [
                { caption: "Ini titik asal P dan titik pusat rotasi O.",
                  svg: `<circle cx="90" cy="60" r="2.5" fill="#fef3c7"/><text x="90" y="80" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><circle cx="170" cy="60" r="7" fill="#38bdf8"/><text x="170" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Tentukan sudut putarnya, misalnya 90° berlawanan jarum jam.",
                  svg: `<circle cx="90" cy="60" r="2.5" fill="#fef3c7"/><text x="90" y="80" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><path d="M 170 60 A 80 80 0 0 0 138 22" fill="none" stroke="#f59e42" stroke-width="1.5" stroke-dasharray="3 3"/><text x="150" y="30" fill="#f59e42" font-size="12">90°</text><circle cx="170" cy="60" r="7" fill="#38bdf8"/><text x="170" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Putar P mengelilingi O, jarak ke O selalu tetap sama.",
                  svg: `<circle cx="90" cy="60" r="2.5" fill="#fef3c7"/><text x="90" y="80" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><path d="M 170 60 A 80 80 0 0 0 100 -5" fill="none" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="3 3" transform="translate(0,60) scale(1,1)"/><line x1="90" y1="60" x2="170" y2="60" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2 2"/><circle cx="170" cy="60" r="7" fill="#38bdf8"/><text x="170" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Sampai membentuk sudut yang ditentukan dari posisi awal.",
                  svg: `<circle cx="90" cy="60" r="2.5" fill="#fef3c7"/><text x="90" y="80" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><line x1="90" y1="60" x2="170" y2="60" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2 2"/><line x1="90" y1="60" x2="90" y2="-20" stroke="#f59e42" stroke-width="1.5" stroke-dasharray="2 2" transform="translate(0,80)"/><circle cx="170" cy="60" r="7" fill="#38bdf8"/><text x="170" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><circle cx="90" cy="60" r="7" fill="none" stroke="#f59e42" stroke-width="2" stroke-dasharray="2 2" transform="translate(0,-80)"/>` },
                { caption: "Itulah bayangan P', hasil rotasi dari P.",
                  svg: `<circle cx="90" cy="60" r="2.5" fill="#fef3c7"/><text x="90" y="80" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><line x1="90" y1="60" x2="170" y2="60" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2 2"/><line x1="90" y1="60" x2="90" y2="10" stroke="#f59e42" stroke-width="1.5" stroke-dasharray="2 2"/><circle cx="170" cy="60" r="7" fill="#38bdf8"/><text x="170" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><circle cx="90" cy="10" r="7" fill="#f59e42"/><text x="90" y="-2" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P'</text>` }
            ]
        },
        dilatasi: {
            title: "Dilatasi (Penskalaan)",
            pemicu: [
                "Lihat lima gambar di samping. Kalau faktor skalanya k = 2, apa yang terjadi pada jarak titik ke pusat O?",
                "Bagaimana kalau k berada di antara 0 dan 1? Bangunnya jadi membesar atau mengecil?",
                "Apakah bentuk bangun (misalnya perbandingan sisi-sisinya) berubah setelah didilatasi, walau ukurannya berubah?",
                "Coba rumuskan sendiri dengan kata-katamu: apa itu dilatasi, dan apa peran faktor skala k?"
            ],
            steps: [
                { caption: "Ini titik asal P dan titik pusat dilatasi O.",
                  svg: `<circle cx="70" cy="90" r="2.5" fill="#fef3c7"/><text x="70" y="106" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><circle cx="120" cy="60" r="7" fill="#38bdf8"/><text x="120" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Tentukan faktor skalanya, misalnya k = 2.",
                  svg: `<circle cx="70" cy="90" r="2.5" fill="#fef3c7"/><text x="70" y="106" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><text x="150" y="25" fill="#f59e42" font-size="13" font-weight="600">k = 2</text><circle cx="120" cy="60" r="7" fill="#38bdf8"/><text x="120" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Tarik garis dari O melewati P.",
                  svg: `<circle cx="70" cy="90" r="2.5" fill="#fef3c7"/><text x="70" y="106" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><line x1="70" y1="90" x2="200" y2="10" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="120" cy="60" r="7" fill="#38bdf8"/><text x="120" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text>` },
                { caption: "Perpanjang sejauh k kali jarak OP.",
                  svg: `<circle cx="70" cy="90" r="2.5" fill="#fef3c7"/><text x="70" y="106" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><line x1="70" y1="90" x2="200" y2="10" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="70" y1="60" x2="70" y2="120" stroke="#38bdf8" stroke-width="1.5" opacity="0"/><circle cx="120" cy="60" r="7" fill="#38bdf8"/><text x="120" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><circle cx="170" cy="30" r="7" fill="none" stroke="#f59e42" stroke-width="2" stroke-dasharray="2 2"/>` },
                { caption: "Itulah bayangan P', hasil dilatasi dari P.",
                  svg: `<circle cx="70" cy="90" r="2.5" fill="#fef3c7"/><text x="70" y="106" fill="#fef3c7" font-size="13" text-anchor="middle">O</text><line x1="70" y1="90" x2="170" y2="30" stroke="#f59e42" stroke-width="2"/><circle cx="120" cy="60" r="7" fill="#38bdf8"/><text x="120" y="41" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P</text><circle cx="170" cy="30" r="7" fill="#f59e42"/><text x="170" y="16" fill="#fef3c7" font-size="16" font-family="Poppins" text-anchor="middle" font-weight="600">P'</text>` }
            ]
        }
    },

    render(target, moduleId) {
        const data = this.data[moduleId];
        if (!data) return;

        const stepsHTML = data.steps.map((s, i) => `
            <div class="proses-card">
                <svg viewBox="0 0 260 130" class="proses-svg">${s.svg}</svg>
                <p class="proses-caption"><strong>${i + 1}.</strong> ${s.caption}</p>
            </div>
        `).join('');

        const pemicuHTML = data.pemicu.map(q => `<li><span class="pemicu-text">${q}</span></li>`).join('');

        target.innerHTML = `
            <div class="materi-layout">
                <div class="materi-left">
                    <h2 style="color: var(--color-${moduleId}); margin-bottom: 18px; font-size: 1.9rem;">${data.title}</h2>
                    <ol class="materi-pemicu-list">${pemicuHTML}</ol>
                    <p class="materi-bridge">Sudah punya gambaran dari langkah-langkah di atas? Sambil memikirkan jawabannya, lanjutkan ke tab <strong>Eksplorasi &amp; Temuan</strong> untuk membuktikannya sendiri secara langsung, lalu tuliskan simpulanmu di sana.</p>
                </div>
                <div class="materi-right">
                    <div class="proses-box">
                        <div class="proses-box-title">Proses Terjadinya ${data.title.split(' ')[0]}</div>
                        ${stepsHTML}
                    </div>
                </div>
            </div>
        `;
    }
};
