window.TL = window.TL || {};

window.TL.Form = {
    render(target) {
        target.innerHTML = `
            <div class="flex-center" style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; height: 100vh;">
                <div class="form-container">
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