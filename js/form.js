window.TL = window.TL || {};

window.TL.Form = {
    render(target) {
        target.innerHTML = `
            <div class="flex-center form-bg-wrapper" style="width: 100%; height: 100vh; position: relative; overflow: hidden;">
                <div class="form-bg-image"></div>
                <div class="form-bg-scrim"></div>
                <button class="btn-settings-gear scene-gear" id="btn-gear-form" title="Pengaturan" style="z-index:3;">&#9881;</button>
                <div class="form-container" style="position: relative; z-index: 2;">
                    <h2 class="text-center" style="margin-bottom: 24px; color: var(--color-accent-amber);">Identitas Magang</h2>
                    <form id="magang-form">
                        <div class="form-group">
                            <label for="nama">Nama Lengkap</label>
                            <input type="text" id="nama" class="form-control" placeholder="Masukkan nama" autocomplete="off" required minlength="2">
                        </div>
                        <div class="form-group">
                            <label for="kelas">Kelas</label>
                            <input type="text" id="kelas" class="form-control" placeholder="Contoh: IX A" autocomplete="off" required>
                        </div>
                        <div class="text-center mt-4">
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Mulai Magang</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        target.querySelector('#btn-gear-form').addEventListener('click', () => window.TL.Settings.show());

        const form = target.querySelector('#magang-form');
        const inputNama = target.querySelector('#nama');
        const inputKelas = target.querySelector('#kelas');

        if (window.TL.State.data.nama) {
            inputNama.value = window.TL.State.data.nama;
        }
        if (window.TL.State.data.kelas) {
            inputKelas.value = window.TL.State.data.kelas;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = inputNama.value.trim();
            const kelas = inputKelas.value.trim();

            if (nama.length >= 2 && kelas.length > 0) {
                window.TL.State.reset();
                window.TL.State.data.nama = nama;
                window.TL.State.data.kelas = kelas;
                window.TL.State.save();
                window.TL.App.navigate('dashboard');
            } else {
                alert("Pastikan nama (minimal 2 karakter) dan kelas sudah terisi dengan benar.");
            }
        });
    }
};
