window.TL = window.TL || {};

window.TL.EksplorasiHub = {
    render(target) {
        const modules = [
            { id: 'refleksi', title: 'Refleksi' },
            { id: 'translasi', title: 'Translasi' },
            { id: 'rotasi', title: 'Rotasi' },
            { id: 'dilatasi', title: 'Dilatasi' }
        ];
        let currentModule = 'refleksi';

        target.innerHTML = `
            <div class="module-wrapper">
                <div class="module-sidebar">
                    <div class="module-sidebar-header">
                        <div class="sidebar-top-row">
                            <button class="btn-back" id="btn-back">&larr; Dashboard</button>
                        </div>
                        <h3 class="module-title" style="color: var(--color-teal);">Eksplorasi Bebas</h3>
                    </div>
                    <div class="sidebar-nav" id="hub-nav"></div>
                    <div class="sidebar-footer">
                        <button class="btn-settings-gear" id="btn-settings-gear-hub" title="Pengaturan">&#9881;</button>
                    </div>
                </div>
                <div class="module-content-area">
                    <div class="gabungan-layout">
                        <div class="gabungan-kiri" style="flex: 1;">
                            <div class="canvas-header">
                                <h3 style="color: var(--color-warm-light); font-size:0.95rem;">Eksplorasi: <span id="hub-title" style="text-transform: capitalize;">Refleksi</span></h3>
                                <div class="mode-toggle">
                                    <button class="mode-btn active" id="btn-mode-2d">2D</button>
                                    <button class="mode-btn" id="btn-mode-3d">3D</button>
                                </div>
                            </div>
                            <div class="canvas-container" id="canvas-container-2d"></div>
                            <div class="canvas-container" id="canvas-container-3d" style="display:none;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        target.querySelector('#btn-back').onclick = () => window.TL.App.navigate('dashboard');
        target.querySelector('#btn-settings-gear-hub').onclick = () => window.TL.Settings.show();

        const navContainer = target.querySelector('#hub-nav');
        const hubTitle = target.querySelector('#hub-title');
        const c2dContainer = target.querySelector('#canvas-container-2d');
        const c3dContainer = target.querySelector('#canvas-container-3d');

        const loadModule = (moduleId) => {
            currentModule = moduleId;
            hubTitle.innerText = moduleId;
            hubTitle.style.color = `var(--color-${moduleId})`;
            navContainer.querySelectorAll('.nav-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.mod === moduleId);
            });
            c3dContainer.dataset.loaded = '';
            window.TL.Canvas2D.render(c2dContainer, moduleId);
            c2dContainer.style.display = 'block';
            c3dContainer.style.display = 'none';
            target.querySelector('#btn-mode-2d').classList.add('active');
            target.querySelector('#btn-mode-3d').classList.remove('active');
        };

        modules.forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'nav-btn';
            btn.dataset.mod = m.id;
            btn.innerText = m.title;
            btn.onclick = () => loadModule(m.id);
            navContainer.appendChild(btn);
        });

        target.querySelector('#btn-mode-2d').addEventListener('click', () => {
            target.querySelector('#btn-mode-2d').classList.add('active');
            target.querySelector('#btn-mode-3d').classList.remove('active');
            c2dContainer.style.display = 'block';
            c3dContainer.style.display = 'none';
            window.dispatchEvent(new Event('resize'));
        });
        target.querySelector('#btn-mode-3d').addEventListener('click', () => {
            target.querySelector('#btn-mode-3d').classList.add('active');
            target.querySelector('#btn-mode-2d').classList.remove('active');
            c3dContainer.style.display = 'block';
            c2dContainer.style.display = 'none';
            if (!c3dContainer.dataset.loaded) {
                window.TL.Canvas3D.render(c3dContainer, currentModule);
                c3dContainer.dataset.loaded = '1';
            }
            setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
        });

        loadModule('refleksi');
    }
};
