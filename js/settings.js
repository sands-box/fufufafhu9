window.TL = window.TL || {};

window.TL.Settings = {
    show() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'modal-settings';
        overlay.innerHTML = `
            <div class="modal-box">
                <h3>Pengaturan</h3>
                <div class="settings-row">
                    <label class="checkbox-label"><input type="checkbox" id="set-musik" ${!window.TL.Audio.muted ? 'checked' : ''}> Musik Latar Menyala</label>
                </div>
                <div class="settings-row">
                    <label style="display:block; margin-bottom:6px; font-size:0.85rem; color: var(--color-teal);">Volume Musik</label>
                    <input type="range" id="set-volume" min="0" max="1" step="0.001" value="${window.TL.Audio.volume}" style="width:100%; accent-color: var(--color-teal);">
                </div>
                <div class="settings-row">
                    <label class="checkbox-label"><input type="checkbox" id="set-sfx" ${window.TL.Audio.sfxEnabled ? 'checked' : ''}> Suara Tombol / Game</label>
                </div>
                <div class="settings-row">
                    <label style="display:block; margin-bottom:6px; font-size:0.85rem; color: var(--color-teal);">Volume Suara Tombol / Game</label>
                    <input type="range" id="set-sfx-volume" min="0" max="1" step="0.001" value="${window.TL.Audio.sfxVolume}" style="width:100%; accent-color: var(--color-teal);">
                </div>
                <button class="btn btn-primary" id="btn-tutup-settings">Tutup</button>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#set-musik').addEventListener('change', (e) => window.TL.Audio.toggleMute(!e.target.checked));
        overlay.querySelector('#set-volume').addEventListener('input', (e) => window.TL.Audio.setVolume(parseFloat(e.target.value)));
        overlay.querySelector('#set-sfx').addEventListener('change', (e) => window.TL.Audio.setSfxEnabled(e.target.checked));
        overlay.querySelector('#set-sfx-volume').addEventListener('input', (e) => window.TL.Audio.setSfxVolume(parseFloat(e.target.value)));
        overlay.querySelector('#btn-tutup-settings').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }
};