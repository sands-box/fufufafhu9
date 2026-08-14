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
            <div style="padding: 40px; width: 100%; max-width: 1000px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid rgba(254, 243, 199, 0.1); padding-bottom: 20px;">
                    <div>
                        <h2 style="color: var(--color-accent-amber); font-size: 2rem;">Studio Arsitek Pola</h2>
                        <p style="color: var(--color-warm-light); opacity: 0.8; font-size: 1.1rem; margin-top: 8px;">Selamat datang, ${state.nama} | Kelas: ${state.kelas}</p>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 0.9rem; color: var(--color-accent-blue);">Progres Magang</span>
                        <h3 id="progress-text" style="font-size: 1.5rem; margin-top: 4px;">0/4</h3>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 40px;" id="folder-grid"></div>
                <div id="action-container" style="text-align: center; margin-top: auto; padding-bottom: 40px; min-height: 80px;"></div>
            </div>
        `;
        target.innerHTML = html;

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
        target.innerHTML = `
            <div class="module-wrapper">
                <div class="module-sidebar">
                    <div class="module-sidebar-header">
                        <button class="btn btn-secondary btn-back" id="btn-back">⬅ Dashboard</button>
                        <h3 class="module-title" style="color: var(--color-${moduleId});">${moduleId}</h3>
                    </div>
                    <div class="sidebar-nav">
                        <button class="nav-btn active" data-tab="materi">Materi</button>
                        <button class="nav-btn" data-tab="eksplorasi">Eksplorasi</button>
                        <button class="nav-btn" data-tab="temuan">Temuan & Simpulan</button>
                    </div>
                </div>
                <div class="module-content-area" id="module-content"></div>
            </div>
        `;

        target.querySelector('#btn-back').onclick = () => window.TL.App.navigate('dashboard');
        
        const menus = target.querySelectorAll('.nav-btn');
        const contentArea = target.querySelector('#module-content');

        const switchTab = (tabName) => {
            menus.forEach(m => m.classList.remove('active'));
            const activeMenu = target.querySelector(`.nav-btn[data-tab="${tabName}"]`);
            if (activeMenu) activeMenu.classList.add('active');

            contentArea.innerHTML = '';
            
            if (tabName === 'materi') {
                window.TL.Materi.render(contentArea, moduleId);
            } else if (tabName === 'eksplorasi') {
                window.TL.Canvas2D.render(contentArea, moduleId);
            } else if (tabName === 'temuan') {
                window.TL.Temuan.render(contentArea, moduleId);
            }
        };

        menus.forEach(btn => {
            btn.onclick = () => switchTab(btn.dataset.tab);
        });

        switchTab('materi');
    }
};