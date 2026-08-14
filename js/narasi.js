window.TL = window.TL || {};

window.TL.Narasi = {
    
    renderChatBubbles(containerEl, arrayDialog, onSelesai, avatarUrl = "assets/images/avatar-netral.png", finalBtnText = "NEXT") {
        let currentIndex = 0;

        const chatWrapper = document.createElement('div');
        chatWrapper.className = 'chat-wrapper';
        
        chatWrapper.innerHTML = `
            <div class="chat-container">
                <img class="chat-avatar" src="${avatarUrl}" alt="Avatar">
                <div class="chat-content">
                    <div class="chat-bubble" id="chat-text">${arrayDialog[0]}</div>
                    <div class="chat-action">
                        <button class="btn btn-primary" id="chat-btn">
                            ${arrayDialog.length === 1 ? finalBtnText : "NEXT"}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        containerEl.appendChild(chatWrapper);

        const btn = chatWrapper.querySelector('#chat-btn');
        const text = chatWrapper.querySelector('#chat-text');

        btn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex < arrayDialog.length) {
                text.innerText = arrayDialog[currentIndex];
                if (currentIndex === arrayDialog.length - 1) {
                    btn.innerText = finalBtnText;
                }
            } else {
                if (typeof onSelesai === 'function') {
                    onSelesai();
                }
            }
        });
    },

    _createSceneBase(target, bgType) {
        target.innerHTML = '';
        const sceneContainer = document.createElement('div');
        sceneContainer.className = 'scene-container';
        
        const bg = document.createElement('div');
        if (bgType === 'gradient') {
            bg.className = 'bg-gradient';
        } else {
            bg.className = 'bg-image';
            bg.style.backgroundImage = `url('${bgType}')`;
        }
        
        sceneContainer.appendChild(bg);
        target.appendChild(sceneContainer);
        return sceneContainer;
    },

    renderLanding(target) {
        const scene = this._createSceneBase(target, 'gradient');
        
        const content = document.createElement('div');
        content.className = 'landing-content';
        content.innerHTML = `
            <h1 class="landing-title">Media Pembelajaran</h1>
            <p class="landing-subtitle">Transformasi Geometri</p>
            <button class="btn btn-primary" style="font-size: 1.25rem; padding: 16px 40px;" id="btn-start">START</button>
        `;
        
        scene.appendChild(content);

        document.getElementById('btn-start').addEventListener('click', () => {
            window.TL.App.navigate('narasi2');
        });
    },

    renderScene2(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-t2-mencari-kerja.jpg');
        const dialogs = [
            "Haduh... sudah berminggu-minggu aku mencari pekerjaan, tapi belum ada yang cocok.",
            "Setiap hari buka laptop, scroll lowongan, kirim lamaran... tapi tidak ada balasan.",
            "Apa yang salah, ya? Mungkin aku kurang skill?",
            "Tapi aku tidak boleh menyerah. Ayo coba cari lagi!"
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('narasi3');
        }, "assets/images/avatar-netral.png", "NEXT");
    },

    renderScene3(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-t3-lowongan.jpg');
        const dialogs = [
            "Hmm, banyak juga lowongan yang tersedia...",
            "Arsitek Pola Kreatif? Desainer Struktur? Kedengarannya menarik!",
            "Aku coba apply beberapa. Semoga kali ini ada yang merespons.",
            "Ya sudah, kirim semua. Tinggal menunggu dan berdoa."
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('narasi4');
        }, "assets/images/avatar-netral.png", "NEXT");
    },

    renderScene4(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-t4-email-masuk.jpg');
        const dialogs = [
            "Eh, ada email masuk! Jantungku berdebar nih...",
            "'Hasil Seleksi — Studio Arsitek Pola'... ini dari yang kemarin!",
            "Semoga kabar baik. Ayo kita buka!"
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('narasi5');
        }, "assets/images/avatar-netral.png", "Buka Email");
    },

    renderScene5(target) {
        const scene = this._createSceneBase(target, 'gradient');

        const letterWrapper = document.createElement('div');
        letterWrapper.className = 'letter-wrapper';
        letterWrapper.innerHTML = `
            <div class="letter-document">
                <div class="letter-header">
                    <div class="letter-logo"></div>
                    <div>
                        <h2 class="letter-title">STUDIO ARSITEK POLA</h2>
                        <p class="letter-subtitle">Divisi Rekayasa Struktur & Geometri</p>
                    </div>
                </div>
                <div class="letter-body">
                    <p><strong>Yth. Calon Arsitek,</strong></p>
                    <p>Selamat! Anda telah <strong>DITERIMA</strong> untuk bergabung dengan tim kami. Namun, sebelum Anda secara resmi memegang proyek, Anda diwajibkan untuk menyelesaikan <strong>Program Magang TransforLab</strong>.</p>
                    <p>Dalam program magang ini, Anda harus menguasai empat pilar utama transformasi geometri: <strong>Refleksi, Translasi, Rotasi, dan Dilatasi</strong>.</p>
                    <p>Silakan selesaikan seluruh modul pembelajaran dan uji kompetensi. Kami menunggu Anda di studio kami.</p>
                </div>
                <div class="letter-footer">
                    <div class="letter-stamp">APPROVED</div>
                    <div class="letter-signature">
                        <div class="letter-signature-line">K. Studio</div>
                        <p>Kepala Studio Arsitek Pola</p>
                    </div>
                </div>
            </div>
        `;
        scene.appendChild(letterWrapper);

        const dialogs = [
            "AKU DITERIMA! Ya ampun, akhirnya...!",
            "Tapi tunggu — ada syaratnya. Aku harus ikut program magang dulu.",
            "Refleksi, Translasi, Rotasi, Dilatasi... Apa itu semua?",
            "Tapi ini kesempatanku satu-satunya. Aku harus bisa!"
        ];
        
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('narasi6');
        }, "assets/images/avatar-senang.png", "NEXT");
    },

    renderScene6(target) {
        const scene = this._createSceneBase(target, 'gradient');
        const dialogs = [
            "Ini kabar terbaik yang pernah aku terima!",
            "Aku tidak boleh menyia-nyiakan kesempatan ini.",
            "Empat skill itu harus aku kuasai — apapun caranya.",
            "Oke. Aku siap. Saatnya mulai magang!"
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('form');
        }, "assets/images/avatar-senang.png", "Mulai Magang");
    },

    renderTransition(target) {
        const scene = this._createSceneBase(target, 'gradient');
        const dialogs = [
            "Akhirnya... semua materi sudah aku pelajari!",
            "Refleksi, Translasi, Rotasi, Dilatasi — semuanya sudah aku kuasai.",
            "Sekarang tinggal satu langkah lagi: Uji Kompetensi.",
            "Aku harus buktikan bahwa aku layak jadi Arsitek Muda!"
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('assessment');
        }, "assets/images/avatar-netral.png", "Mulai Uji");
    }
};