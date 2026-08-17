window.TL = window.TL || {};
window.TL.SOAL_DATA = [
  {
    "id": 1,
    "tier": 1,
    "level": "C1",
    "materi": "refleksi",
    "soal": "Transformasi yang memindahkan setiap titik pada bidang dengan menggunakan sifat bayangan cermin disebut...",
    "opsi": ["Translasi", "Refleksi", "Rotasi", "Dilatasi"],
    "jawaban": 1,
    "penjelasan": "Jawaban yang tepat adalah Refleksi. Translasi memindahkan titik dengan cara digeser (tanpa cermin), Rotasi memutar titik terhadap suatu pusat, dan Dilatasi mengubah ukuran bangun. Hanya Refleksi yang bekerja dengan prinsip pencerminan: bayangan berada pada jarak yang sama dari garis cermin, di sisi seberangnya."
  },
  {
    "id": 2,
    "tier": 1,
    "level": "C2",
    "materi": "translasi",
    "soal": "Jika sebuah titik bergeser 3 satuan ke kanan dan 2 satuan ke atas, maka jenis transformasinya adalah...",
    "opsi": ["Refleksi", "Translasi", "Rotasi", "Dilatasi"],
    "jawaban": 1,
    "penjelasan": "Pergeseran murni ke arah dan sejauh jarak tertentu, tanpa memutar atau mengubah ukuran, adalah ciri khas Translasi. Gerakan '3 satuan ke kanan dan 2 satuan ke atas' ini bisa ditulis sebagai vektor translasi T(3, 2). Ini bukan Refleksi (tidak ada garis cermin), bukan Rotasi (tidak ada sudut putar), dan bukan Dilatasi (ukuran tidak berubah)."
  },
  {
    "id": 7,
    "tier": 1,
    "level": "C1",
    "materi": "rotasi",
    "soal": "Transformasi yang memindahkan titik dengan cara memutar sejauh sudut tertentu terhadap titik pusat disebut...",
    "opsi": ["Refleksi", "Translasi", "Rotasi", "Dilatasi"],
    "jawaban": 2,
    "penjelasan": "Jawaban yang tepat adalah Rotasi, karena melibatkan dua unsur khas: sudut putar dan titik pusat perputaran. Refleksi memakai garis cermin (bukan sudut), Translasi menggeser tanpa memutar, dan Dilatasi mengubah ukuran tanpa memutar."
  },
  {
    "id": 8,
    "tier": 1,
    "level": "C2",
    "materi": "dilatasi",
    "soal": "Jika sebuah segitiga didilatasikan dengan faktor skala k = 0,5, maka bayangan yang terjadi akan...",
    "opsi": ["Membesar", "Mengecil", "Tetap sama", "Berbalik arah"],
    "jawaban": 1,
    "penjelasan": "Faktor skala k = 0,5 berada di antara 0 dan 1 (0 < k < 1). Pada rentang ini, setiap jarak titik ke pusat dilatasi dikalikan 0,5, artinya diperkecil menjadi setengahnya. Karena itu bayangannya Mengecil. Jika k > 1 barulah bangun membesar, dan jika k negatif barulah bangun berbalik arah (posisinya menyeberang pusat)."
  },
  {
    "id": 3,
    "tier": 2,
    "level": "C3",
    "materi": "rotasi",
    "soal": "Titik A(2, 3) dirotasikan sebesar 90 derajat berlawanan arah jarum jam dengan pusat O(0,0). Koordinat bayangan A' adalah...",
    "opsi": ["(3, 2)", "(3, -2)", "(2, -3)", "(-3, 2)"],
    "jawaban": 3,
    "penjelasan": "Rotasi 90 derajat berlawanan arah jarum jam terhadap pusat O(0,0) mengikuti aturan (x, y) menjadi (-y, x). Untuk titik A(2, 3): x = 2 dan y = 3, sehingga bayangannya adalah (-3, 2). Jadi A'(-3, 2)."
  },
  {
    "id": 4,
    "tier": 2,
    "level": "C4",
    "materi": "dilatasi",
    "soal": "Sebuah persegi panjang dengan luas 10 satuan persegi didilatasikan dengan faktor skala k = 2. Berapa luas bayangan persegi panjang tersebut?",
    "opsi": ["20 satuan persegi", "40 satuan persegi", "10 satuan persegi", "5 satuan persegi"],
    "jawaban": 1,
    "penjelasan": "Pada dilatasi, panjang setiap sisi bangun dikalikan k, sehingga luasnya berubah sebanyak k² (kuadrat dari faktor skala), bukan hanya k. Dengan k = 2, luas bayangan = k² × luas awal = 2² × 10 = 4 × 10 = 40 satuan persegi."
  },
  {
    "id": 9,
    "tier": 2,
    "level": "C3",
    "materi": "refleksi",
    "soal": "Titik C(3, -2) direfleksikan terhadap sumbu Y. Koordinat bayangannya adalah...",
    "opsi": ["(3, 2)", "(-3, -2)", "(-3, 2)", "(-2, 3)"],
    "jawaban": 1,
    "penjelasan": "Refleksi terhadap sumbu Y mengikuti aturan (x, y) menjadi (-x, y): nilai x berubah tanda, nilai y tetap. Untuk titik C(3, -2): x = 3 menjadi -3, sedangkan y = -2 tetap -2. Jadi bayangannya adalah (-3, -2)."
  },
  {
    "id": 10,
    "tier": 2,
    "level": "C4",
    "materi": "translasi",
    "soal": "Titik D(x, y) ditranslasikan oleh T(2, 3) menghasilkan bayangan D'(5, 1). Koordinat awal D adalah...",
    "opsi": ["(7, 4)", "(3, 4)", "(-3, -2)", "(3, -2)"],
    "jawaban": 3,
    "penjelasan": "Aturan translasi T(2, 3) adalah (x, y) menjadi (x+2, y+3). Karena hasilnya D'(5, 1), berlaku x + 2 = 5 sehingga x = 3, dan y + 3 = 1 sehingga y = 1 - 3 = -2. Jadi koordinat awal D adalah (3, -2). Bisa dicek: (3+2, -2+3) = (5, 1), sesuai dengan D'."
  },
  {
    "id": 5,
    "tier": 3,
    "level": "C5",
    "materi": "refleksi",
    "soal": "Titik B(-4, 5) dicerminkan terhadap garis y = x. Hasil dari transformasi tersebut adalah...",
    "opsi": ["(5, -4)", "(-5, 4)", "(4, -5)", "(-4, -5)"],
    "jawaban": 0,
    "penjelasan": "Pencerminan terhadap garis y = x mengikuti aturan (x, y) menjadi (y, x): posisi x dan y saling bertukar tempat. Untuk titik B(-4, 5): x = -4 dan y = 5, setelah ditukar menjadi (5, -4). Jadi bayangannya adalah (5, -4)."
  },
  {
    "id": 6,
    "tier": 3,
    "level": "C6",
    "materi": "translasi",
    "soal": "Garis y = 2x + 3 ditranslasikan oleh vektor T(1, -2). Persamaan garis bayangannya adalah...",
    "opsi": ["y = 2x - 1", "y = 2x + 1", "y = 2x - 3", "y = 2x + 5"],
    "jawaban": 0,
    "penjelasan": "Misalkan bayangan titik (x, y) adalah (x', y'). Karena translasi T(1, -2), berlaku x' = x + 1 dan y' = y - 2, sehingga x = x' - 1 dan y = y' + 2. Substitusikan ke persamaan awal y = 2x + 3: (y' + 2) = 2(x' - 1) + 3 = 2x' - 2 + 3 = 2x' + 1. Maka y' = 2x' + 1 - 2 = 2x' - 1. Jadi persamaan bayangannya adalah y = 2x - 1."
  },
  {
    "id": 11,
    "tier": 3,
    "level": "C5",
    "materi": "rotasi",
    "soal": "Titik E(4, 2) dirotasi 180 derajat dengan pusat O(0,0), lalu hasilnya direfleksikan terhadap sumbu X. Koordinat akhir titik E adalah...",
    "opsi": ["(4, -2)", "(-4, 2)", "(4, 2)", "(-4, -2)"],
    "jawaban": 1,
    "penjelasan": "Langkah 1, rotasi 180° terhadap O(0,0) mengikuti aturan (x, y) menjadi (-x, -y): titik E(4, 2) menjadi (-4, -2). Langkah 2, hasil itu direfleksikan terhadap sumbu X dengan aturan (x, y) menjadi (x, -y): titik (-4, -2) menjadi (-4, 2). Jadi koordinat akhirnya adalah (-4, 2).",
    "gambar": "rotasi180-refleksiX"
  },
  {
    "id": 12,
    "tier": 3,
    "level": "C6",
    "materi": "dilatasi",
    "soal": "Titik F(-2, 4) didilatasi dengan pusat (0,0) dan faktor skala -2. Posisi kuadran F' dibandingkan F berubah dari...",
    "opsi": ["Kuadran I ke III", "Kuadran II ke IV", "Kuadran III ke I", "Tetap di Kuadran II"],
    "jawaban": 1,
    "penjelasan": "Titik F(-2, 4) memiliki x negatif dan y positif, sehingga berada di Kuadran II. Dilatasi dengan faktor skala k = -2 mengikuti aturan (x, y) menjadi (kx, ky): F'= (-2 × -2, -2 × 4) = (4, -8). Titik F'(4, -8) memiliki x positif dan y negatif, sehingga berada di Kuadran IV. Faktor skala negatif memang selalu memindahkan titik ke kuadran yang berseberangan (diagonal) dari kuadran asalnya.",
    "gambar": "dilatasi-kuadran"
  }
];
