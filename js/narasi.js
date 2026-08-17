window.TL = window.TL || {};

window.TL.Narasi = {

    _prevScene: {
        narasi3: 'narasi2',
        narasi4: 'narasi3',
        narasi5: 'narasi4',
        narasi6: 'narasi5'
    },

    renderChatBubbles(containerEl, dialogItems, onSelesai, defaultAvatar = "assets/images/avatar-netral.png", finalBtnText = "NEXT", options = {}) {
        const items = dialogItems.map(d => typeof d === 'string' ? { text: d } : d);
        let currentIndex = 0;
        let typeTimer = null;
        const prevScreen = options.sceneName ? this._prevScene[options.sceneName] : null;

        const chatWrapper = document.createElement('div');
        chatWrapper.className = 'chat-wrapper';
        containerEl.appendChild(chatWrapper);

        const bgEl = containerEl.querySelector('.bg-image, .bg-gradient');

        const typeText = (el, fullText, onDone) => {
            clearTimeout(typeTimer);
            el.innerText = '';
            let i = 0;
            window.TL.Audio.startTyping();
            const tick = () => {
                i++;
                el.innerText = fullText.slice(0, i);
                if (i < fullText.length) {
                    typeTimer = setTimeout(tick, 40);
                } else {
                    window.TL.Audio.stopTyping();
                    if (typeof onDone === 'function') onDone();
                }
            };
            tick();
        };

        const mountLine = (index) => {
            const item = items[index];
            const avatarUrl = item.avatar || defaultAvatar;
            const isLast = index === items.length - 1;
            const showButton = !item.hideButton;
            const btnClass = (isLast && options.finalBtnClass) ? ' ' + options.finalBtnClass : '';
            const showBack = index > 0 || !!prevScreen;

            chatWrapper.innerHTML = `
                <div class="chat-container">
                    <img class="chat-avatar" src="${avatarUrl}" alt="Avatar">
                    <div class="chat-content">
                        <div class="chat-bubble" id="chat-text"></div>
                        ${showButton ? `
                        <div class="chat-action">
                            ${showBack ? `<button class="btn btn-secondary" id="chat-back-btn">Kembali</button>` : ''}
                            <button class="btn btn-primary${btnClass}" id="chat-btn" disabled>${isLast ? finalBtnText : "NEXT"}</button>
                        </div>` : ''}
                    </div>
                </div>
            `;
            chatWrapper.classList.remove('chat-pop');
            void chatWrapper.offsetWidth;
            chatWrapper.classList.add('chat-pop');

            if (item.sfxOnStart) window.TL.Audio.playSFX(item.sfxOnStart);

            const textEl = chatWrapper.querySelector('#chat-text');
            const btn = chatWrapper.querySelector('#chat-btn');
            const backBtn = chatWrapper.querySelector('#chat-back-btn');

            typeText(textEl, item.text, () => {
                if (btn) btn.disabled = false;
                if (typeof item.onTyped === 'function') item.onTyped();
            });

            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        goToLine(currentIndex - 1);
                    } else if (prevScreen) {
                        this._transitionTo(prevScreen);
                    }
                }, { once: true });
            }

            if (btn) {
                btn.addEventListener('click', () => {
                    const nextIndex = currentIndex + 1;
                    if (nextIndex < items.length) {
                        goToLine(nextIndex);
                    } else {
                        clearTimeout(typeTimer);
                        window.TL.Audio.stopTyping();
                        chatWrapper.classList.remove('chat-pop');
                        chatWrapper.classList.add('chat-out');
                        chatWrapper.addEventListener('animationend', () => {
                            if (typeof onSelesai === 'function') onSelesai();
                        }, { once: true });
                    }
                }, { once: true });
            }
        };

        const goToLine = (index) => {
            const item = items[index];
            if (item.blackout) {
                clearTimeout(typeTimer);
                window.TL.Audio.stopTyping();
                chatWrapper.classList.remove('chat-pop');
                chatWrapper.style.opacity = '0';
                this._playScreenTransition(
                    () => {
                        if (!bgEl) return;
                        if (item.bgSwap) {
                            bgEl.style.backgroundImage = `url('${item.bgSwap}')`;
                            bgEl.classList.remove('bg-hidden');
                        } else {
                            bgEl.classList.add('bg-hidden');
                        }
                    },
                    undefined,
                    () => {
                        chatWrapper.style.opacity = '';
                        currentIndex = index;
                        mountLine(index);
                    }
                );
            } else {
                currentIndex = index;
                mountLine(index);
            }
        };

        if (options.startDelay) {
            setTimeout(() => goToLine(0), options.startDelay);
        } else {
            goToLine(0);
        }
    },

    _createSceneBase(target, bgType, noZoom = false) {
        target.innerHTML = '';
        const sceneContainer = document.createElement('div');
        sceneContainer.className = 'scene-container';

        const bg = document.createElement('div');
        if (bgType === 'gradient') {
            bg.className = 'bg-gradient';
        } else {
            bg.className = 'bg-image' + (noZoom ? ' no-zoom' : '');
            bg.style.backgroundImage = `url('${bgType}')`;
        }

        sceneContainer.appendChild(bg);

        const gear = document.createElement('button');
        gear.className = 'btn-settings-gear scene-gear';
        gear.title = 'Pengaturan';
        gear.innerHTML = '&#9881;';
        gear.addEventListener('click', () => window.TL.Settings.show());
        sceneContainer.appendChild(gear);

        target.appendChild(sceneContainer);
        return sceneContainer;
    },

    _playScreenTransition(atPeakCallback, holdMs = 800, onComplete) {
        const fadeMs = 600;
        const overlay = document.createElement('div');
        overlay.className = 'app-blackout';
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
        });

        setTimeout(() => {
            if (typeof atPeakCallback === 'function') atPeakCallback();
            setTimeout(() => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.remove();
                    if (typeof onComplete === 'function') onComplete();
                }, fadeMs);
            }, holdMs);
        }, fadeMs);
    },

    _transitionTo(screenName, param) {
        this._playScreenTransition(() => {
            this._viaTransition = true;
            window.TL.App.navigate(screenName, param);
            this._viaTransition = false;
        });
    },

    _mountClickableEmail(scene, options = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'email-notif-wrapper email-inline';

    if (options.disabled) {
        wrapper.style.pointerEvents = 'none';
        wrapper.style.opacity = '0.5';
        wrapper.style.filter = 'grayscale(0.7)';
    }

    wrapper.style.position = 'relative';
    wrapper.style.zIndex = '20';

    wrapper.innerHTML = `
        <div style="position:relative;">
            <img src="assets/images/email-icon.png" class="email-notif-icon" alt="Email" style="width:110px; aspect-ratio:2342/1792; object-fit:contain;">
            <div class="email-notif-badge" style="position:absolute; top:12px; right:0px;">1</div>
        </div>
        <div class="email-notif-hint" style="display:${options.disabled ? 'none' : 'block'};">Klik dan buka emailnya</div>
    `;
    scene.appendChild(wrapper);

    const hintEl = wrapper.querySelector('.email-notif-hint');

    const enable = () => {
        wrapper.style.pointerEvents = 'auto';
        wrapper.style.opacity = '1';
        wrapper.style.filter = 'none';
        wrapper.classList.add('email-enabled');
        if (hintEl) hintEl.style.display = 'block';
        wrapper.addEventListener('click', () => {
            wrapper.classList.add('opening');
            setTimeout(() => {
                this._transitionTo('narasi5');
            }, 500);
        }, { once: true });
    };

    wrapper._enableEmail = enable;

    if (!options.disabled) {
        enable();
    }

    return wrapper;
    },

    renderLanding(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-landing.jpg');

        const scrim = document.createElement('div');
        scrim.className = 'landing-scrim';
        scene.appendChild(scrim);

        const content = document.createElement('div');
        content.className = 'landing-content';
        content.innerHTML = `
            <svg viewBox="0 0 520 110" class="landing-curve-text" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path id="arcTop" d="M 15 100 A 875 875 0 0 1 505 100" fill="none"/>
                    <path id="arcBottom" d="M 55 108 A 1061 1061 0 0 1 465 108" fill="none"/>
                </defs>
                <text font-family="Poppins, sans-serif" font-size="19" font-weight="700" fill="var(--color-gold)" letter-spacing="2">
                    <textPath href="#arcTop" startOffset="50%" text-anchor="middle">MEDIA PEMBELAJARAN MATEMATIKA</textPath>
                </text>
                <text font-family="Poppins, sans-serif" font-size="14" font-weight="500" fill="var(--color-warm-light)" letter-spacing="1.5">
                    <textPath href="#arcBottom" startOffset="50%" text-anchor="middle">TRANSFORMASI GEOMETRI</textPath>
                </text>
            </svg>
            <h1 class="landing-title">NARAGEO</h1>
            <p class="landing-subtitle">Narasi dalam Geometri</p>
            <div class="landing-badges">
                <span class="landing-badge" style="border-color: var(--color-refleksi); color: var(--color-refleksi);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21" stroke-dasharray="2 2"/><path d="M4 8 L9 12 L4 16 Z"/><path d="M20 8 L15 12 L20 16 Z"/></svg>
                    Refleksi
                </span>
                <span class="landing-badge" style="border-color: var(--color-translasi); color: var(--color-translasi);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="6" height="6" opacity="0.4"/><rect x="15" y="9" width="6" height="6"/><path d="M9 12 L14 12 M14 12 L11.5 9.5 M14 12 L11.5 14.5"/></svg>
                    Translasi
                </span>
                <span class="landing-badge" style="border-color: var(--color-rotasi); color: var(--color-rotasi);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 3v5h-5"/></svg>
                    Rotasi
                </span>
                <span class="landing-badge" style="border-color: var(--color-dilatasi); color: var(--color-dilatasi);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="6" height="6" opacity="0.5"/><rect x="4" y="4" width="16" height="16"/></svg>
                    Dilatasi
                </span>
            </div>
            <button class="btn btn-primary" style="font-size: 1.1rem; padding: 13px 34px;" id="btn-start">MULAI</button>
        `;
        scene.appendChild(content);

        document.getElementById('btn-start').addEventListener('click', () => {
            this._transitionTo('narasi2');
        });
    },

    renderScene2(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-t2-mencari-kerja.jpg', true);
        const dialogs = [
            { text: "Haduh... sudah berminggu-minggu aku mencari pekerjaan, tapi belum ada yang cocok.", avatar: "assets/images/avatar-kecewa.png" },
            { text: "Setiap hari buka laptop, scroll lowongan, kirim lamaran... tapi tidak ada balasan. Kira-kira apa yang salah ya? huuumm....", avatar: "assets/images/avatar-kecewa.png" },
            { text: "Tapi aku tidak boleh menyerah. Ayo coba cari lagi!", avatar: "assets/images/avatar-netral.png" }
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            this._transitionTo('narasi3');
        }, "assets/images/avatar-netral.png", "NEXT", { sceneName: 'narasi2', startDelay: 1400 });
    },

    renderScene3(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-t3-lowongan.jpg');
        const dialogs = [
            "Hmm, banyak juga lowongan yang tersedia...",
            "Arsitek Pola Kreatif? Desainer Struktur? Kedengarannya menarik!",
            "Aku coba apply beberapa. Semoga kali ini ada yang merespons.",
            { text: "Selesai, aku sudah kirim semua lamaranku, semoga ada yang diterima.", blackout: true, bgSwap: "assets/images/bg-menunggu.jpg" }
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            this._transitionTo('jedaWaktu');
        }, "assets/images/avatar-netral.png", "NEXT", { sceneName: 'narasi3', startDelay: 1400 });
    },

    renderJedaWaktu(target) {
        const scene = this._createSceneBase(target, 'gradient');

        const dots = document.createElement('div');
        dots.className = 'waiting-dots';
        dots.innerHTML = `<span></span><span></span><span></span>`;
        scene.appendChild(dots);

        setTimeout(() => {
            window.TL.App.navigate('narasi4');
        }, 3000);
    },

    renderScene4(target) {
        const scene = this._createSceneBase(target, 'assets/images/bg-t4-email-masuk.jpg', true);

        const emailWrapper = this._mountClickableEmail(scene, { disabled: true });

        const dialogs = [
            {
                text: "Eh, ada email masuk! Jantungku berdebar nih...",
                avatar: "assets/images/avatar-antusias.jpg",
                sfxOnStart: "assets/audio/notif-email.mp3"
            },
            {
                text: "Hasil Seleksi Studio Arsitek Pola... ini dari yang kemarin!",
                avatar: "assets/images/avatar-antusias.jpg"
            },
            {
                text: "Semoga kabar baik. Ayo kita buka!",
                hideButton: true,
                onTyped: () => {
                    if (emailWrapper && typeof emailWrapper._enableEmail === 'function') {
                        emailWrapper._enableEmail();
                    }
                }
            }
        ];

        const opts = { sceneName: 'narasi4' };
        if (this._viaTransition) opts.startDelay = 1400;
        this.renderChatBubbles(scene, dialogs, null, "assets/images/avatar-netral.png", "NEXT", opts);
    },

    renderScene5(target) {
        window.TL.Audio.stop();
        const scene = this._createSceneBase(target, 'gradient');

        const letterWrapper = document.createElement('div');
        letterWrapper.className = 'letter-wrapper';
        letterWrapper.innerHTML = `
            <img src="assets/images/surat-diterima.jpg" alt="Surat Hasil Seleksi - Studio Arsitek Pola" class="letter-image">
        `;
        scene.appendChild(letterWrapper);

        const dialogs = [
            "AKU DITERIMA! Ya ampun, akhirnya...!",
            "Tapi tunggu, ada syaratnya. Aku harus ikut program magang dulu.",
            { text: "Refleksi, Translasi, Rotasi, Dilatasi... Apa itu semua?", avatar: "assets/images/avatar-netral.png" },
            { text: "Tapi ini kesempatanku satu-satunya. Aku harus bisa!", avatar: "assets/images/avatar-netral.png" }
        ];

        this.renderChatBubbles(scene, dialogs, () => {
            this._transitionTo('narasi6');
        }, "assets/images/avatar-senang.png", "NEXT", { sceneName: 'narasi5', startDelay: 1400 });
    },

    renderScene6(target) {
        const scene = this._createSceneBase(target, 'gradient');
        const dialogs = [
            "Ini kabar terbaik yang pernah aku terima! Aku tidak boleh menyia-nyiakan kesempatan ini. Empat skill itu harus aku kuasai, apapun caranya. Oke, aku siap. Saatnya mulai magang!"
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.Audio.playSingleLoop('assets/audio/stream-cafe.mp3');
            this._transitionTo('form');
        }, "assets/images/avatar-senang.png", "Mulai Magang", { sceneName: 'narasi6', finalBtnClass: 'btn-start-action', startDelay: 1400 });
    },

    renderTransition(target) {
        const scene = this._createSceneBase(target, 'gradient');
        const dialogs = [
            "Akhirnya... semua materi sudah aku pelajari!",
            "Refleksi, Translasi, Rotasi, Dilatasi, semuanya sudah aku kuasai.",
            "Sekarang tinggal satu langkah lagi: Uji Kompetensi. Aku harus buktikan bahwa aku layak jadi Arsitek Muda!"
        ];
        this.renderChatBubbles(scene, dialogs, () => {
            window.TL.App.navigate('assessment');
        }, "assets/images/avatar-netral.png", "Mulai Uji");
    }
};