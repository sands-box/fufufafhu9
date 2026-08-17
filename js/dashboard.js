window.TL = window.TL || {};

window.TL.Dashboard = {
    render(target) {
        const state = window.TL.State.data;
        let completedCount = 0;
        const modules = [
            { id: 'refleksi', title: 'Refleksi', icon: 'assets/images/icon-refleksi.png', color: 'var(--color-refleksi)' },
            { id: 'translasi', title: 'Translasi', icon: 'assets/images/icon-translasi.png', color: 'var(--color-translasi)' },
            { id: 'rotasi', title: 'Rotasi', icon: 'assets/images/icon-rotasi.png', color: 'var(--color-rotasi)' },
            { id: 'dilatasi', title: 'Dilatasi', icon: 'assets/images/icon-dilatasi.png', color: 'var(--color-dilatasi)' }
        ];

        let html = `
            <div style="position: relative; overflow: hidden; min-height: 100vh;">
                <div class="form-bg-image" style="position: absolute; inset: 0; z-index: 0;"></div>
                <div class="form-bg-scrim" style="position: absolute; inset: 0; z-index: 1;"></div>
                <div style="position: relative; z-index: 2; padding: 40px; width: 100%; max-width: 1000px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid rgba(254, 243, 199, 0.1); padding-bottom: 20px;">
                        <div>
                            <h2 style="color: var(--color-accent-amber); font-size: 2rem;">Studio Arsitek Pola</h2>
                            <p id="user-info" style="color: var(--color-warm-light); opacity: 0.8; font-size: 1.1rem; margin-top: 8px;">Selamat datang, ${state.nama} | Kelas: ${state.kelas}</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-size: 0.9rem; color: var(--color-accent-blue);">Progres Magang</span>
                            <h3 id="progress-text" style="font-size: 1.5rem; margin-top: 4px;">0/4</h3>
                        </div>
                    </div>
                    <p style="background: rgba(20,184,166,0.08); border-left: 4px solid var(--color-teal); padding: 12px 16px; border-radius: 4px; color: var(--color-warm-light); font-size: 0.9rem; margin-bottom: 28px;">
                        Selesaikan keempat modul di bawah ini terlebih dahulu sebelum bisa mengikuti Uji Kompetensi.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 24px;" id="folder-grid"></div>
                    <div style="margin-bottom: 40px;">
                        <button class="btn btn-secondary" id="btn-eksplorasi-hub" style="width:100%; padding: 16px;">Eksplorasi Transformasi Geometri</button>
                    </div>
                    <div id="action-container" style="text-align: center; margin-top: auto; padding-bottom: 40px; min-height: 80px;"></div>
                </div>
                <button class="btn-settings-gear scene-gear" id="btn-gear-dash" title="Pengaturan" style="position: absolute; bottom: 20px; left: 20px; z-index: 3;">&#9881;</button>
                <button class="btn btn-secondary" id="btn-profil" style="position: absolute; top: 20px; right: 20px; z-index: 3; padding: 8px 16px; font-size: 0.9rem;">Profil</button>
                <div id="modal-profil" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; align-items: center; justify-content: center;">
                    <div style="background: var(--color-navy); padding: 30px; border-radius: 12px; width: 90%; max-width: 400px; border: 1px solid var(--color-teal);">
                        <h3 style="color: var(--color-accent-amber); margin-bottom: 20px;">Edit Profil</h3>
                        <form id="form-profil">
                            <div class="form-group">
                                <label for="edit-nama">Nama Lengkap</label>
                                <input type="text" id="edit-nama" class="form-control" value="${state.nama}" required minlength="2">
                            </div>
                            <div class="form-group">
                                <label for="edit-kelas">Kelas</label>
                                <input type="text" id="edit-kelas" class="form-control" value="${state.kelas}" required>
                            </div>
                            <div style="display: flex; gap: 10px; margin-top: 20px;">
                                <button type="submit" class="btn btn-primary" style="flex: 1;">Simpan</button>
                                <button type="button" class="btn btn-secondary" id="btn-batal-profil" style="flex: 1;">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        target.innerHTML = html;

        target.querySelector('#btn-gear-dash').addEventListener('click', () => window.TL.Settings.show());
        target.querySelector('#btn-eksplorasi-hub').addEventListener('click', () => window.TL.App.navigate('eksplorasiHub'));
        target.querySelector('#btn-profil').addEventListener('click', () => {
            const modal = target.querySelector('#modal-profil');
            modal.style.display = 'flex';
            target.querySelector('#edit-nama').value = window.TL.State.data.nama;
            target.querySelector('#edit-kelas').value = window.TL.State.data.kelas;
        });
        target.querySelector('#btn-batal-profil').addEventListener('click', () => {
            target.querySelector('#modal-profil').style.display = 'none';
        });
        target.querySelector('#form-profil').addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = target.querySelector('#edit-nama').value.trim();
            const kelas = target.querySelector('#edit-kelas').value.trim();
            if (nama.length >= 2 && kelas.length > 0) {
                window.TL.State.data.nama = nama;
                window.TL.State.data.kelas = kelas;
                window.TL.State.save();
                target.querySelector('#user-info').innerText = `Selamat datang, ${nama} | Kelas: ${kelas}`;
                target.querySelector('#modal-profil').style.display = 'none';
            } else {
                alert('Nama minimal 2 karakter dan kelas tidak boleh kosong.');
            }
        });

        const grid = target.querySelector('#folder-grid');
        modules.forEach(m => {
            const isCompleted = state.progress[m.id];
            if (isCompleted) completedCount++;

            const card = document.createElement('div');
            card.style.cssText = `
                background-color: var(--color-navy);
                border: 1px solid ${isCompleted ? m.color : 'rgba(56, 189, 248, 0.2)'};
                border-radius: 12px;
                padding: 24px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: ${isCompleted ? `0 0 15px ${m.color}40` : 'none'};
            `;

            card.onmouseover = () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = `0 10px 20px ${isCompleted ? m.color + '60' : 'rgba(56, 189, 248, 0.2)'}`;
            };
            card.onmouseout = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = isCompleted ? `0 0 15px ${m.color}40` : 'none';
            };
            card.onclick = () => window.TL.App.navigate('module', m.id);

            card.innerHTML = `
                <img src="${m.icon}" alt="${m.title}" style="width: 80px; height: 80px; margin-bottom: 16px; object-fit: contain;">
                <h3 style="color: ${m.color}; margin-bottom: 12px;">${m.title}</h3>
                <div style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; background-color: ${isCompleted ? m.color + '20' : 'rgba(254, 243, 199, 0.1)'}; color: ${isCompleted ? m.color : 'var(--color-warm-light)'};">
                    ${isCompleted ? 'Selesai' : 'Belum Selesai'}
                </div>
            `;
            grid.appendChild(card);
        });

        target.querySelector('#progress-text').innerText = `${completedCount}/4`;

        const actionContainer = target.querySelector('#action-container');
        if (completedCount === 4) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-primary';
            btn.style.fontSize = '1.1rem';
            btn.style.padding = '14px 32px';
            btn.innerText = 'Mulai Uji Kompetensi';
            btn.onclick = () => window.TL.App.navigate('transition');
            actionContainer.appendChild(btn);
        }
    },

    openModule(target, moduleId) {
        const startTab = window.TL.State.data.progress[moduleId] ? 'eksplorasi' : 'pemantik';

        target.innerHTML = `
            <div class="module-wrapper">
                <div class="module-sidebar">
                    <div class="module-sidebar-header">
                        <div class="sidebar-top-row">
                            <button class="btn-back" id="btn-back">&larr; Dashboard</button>
                            <button class="btn-petunjuk" id="btn-petunjuk">&#128214; Petunjuk</button>
                        </div>
                        <h3 class="module-title" style="color: var(--color-${moduleId});">${moduleId}</h3>
                    </div>
                    <div class="sidebar-nav">
                        <button class="nav-btn${startTab === 'pemantik' ? ' active' : ''}" data-tab="pemantik">Pemantik</button>
                        <button class="nav-btn${startTab === 'eksplorasi' ? ' active' : ''}" data-tab="eksplorasi">Eksplorasi &amp; Temuan</button>
                    </div>
                    <div class="sidebar-footer">
                        <button class="btn-settings-gear" id="btn-settings-gear" title="Pengaturan" aria-label="Pengaturan">&#9881;</button>
                    </div>
                </div>
                <div class="module-content-area" id="module-content"></div>
            </div>
        `;

        target.querySelector('#btn-back').onclick = () => window.TL.App.navigate('dashboard');
        target.querySelector('#btn-petunjuk').onclick = () => window.TL.Petunjuk.show(moduleId);
        target.querySelector('#btn-settings-gear').onclick = () => window.TL.Settings.show();

        const menus = target.querySelectorAll('.nav-btn');
        const contentArea = target.querySelector('#module-content');

        const switchTab = (tabName) => {
            menus.forEach(m => m.classList.remove('active'));
            const activeMenu = target.querySelector(`.nav-btn[data-tab="${tabName}"]`);
            if (activeMenu) activeMenu.classList.add('active');

            contentArea.innerHTML = '';

            if (tabName === 'pemantik') {
                window.TL.Pemantik.render(contentArea, moduleId);
            } else if (tabName === 'eksplorasi') {
                window.TL.Gabungan.render(contentArea, moduleId);
            }
        };

        menus.forEach(btn => {
            btn.onclick = () => switchTab(btn.dataset.tab);
        });

        switchTab(startTab);
    }
};