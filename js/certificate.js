window.TL = window.TL || {};

window.TL.Certificate = {
    render(target) {
        target.innerHTML = `
            <div class="flex-center" style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; height: 100vh; flex-direction: column; gap: 24px;">
                <h2 style="color: var(--color-accent-blue); font-size: 2.5rem; text-align: center;">Mengirim Sertifikat...</h2>
                <p style="color: var(--color-warm-light); font-size: 1.25rem;">Mohon tunggu, dokumen sedang diproses.</p>
            </div>
        `;

        setTimeout(() => {
            this.generatePDF(target);
        }, 1000);
    },

    generatePDF(target) {
        if (!window.jspdf) {
            alert("Library jsPDF belum dimuat.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const state = window.TL.State.data;
        const isLulus = state.skor >= 9;
        const nama = state.nama || "Siswa";
        const kelas = state.kelas || "Kelas";
        const skor = state.skor || 0;

        const bgImg = new Image();
        bgImg.src = 'assets/images/bg-sertifikat.jpg';
        
        bgImg.onload = () => {
            doc.addImage(bgImg, 'JPEG', 0, 0, 297, 210);
            this.drawText(doc, isLulus, nama, kelas, skor);
            this.finishPDF(doc, target, isLulus);
        };
        
        bgImg.onerror = () => {
            doc.setFillColor(15, 23, 41);
            doc.rect(0, 0, 297, 210, 'F');
            doc.setDrawColor(245, 158, 66);
            doc.setLineWidth(2);
            doc.rect(10, 10, 277, 190);
            this.drawText(doc, isLulus, nama, kelas, skor);
            this.finishPDF(doc, target, isLulus);
        };
    },

    drawText(doc, isLulus, nama, kelas, skor) {
        doc.setTextColor(245, 158, 66);
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        
        const title = isLulus ? "SERTIFIKAT ARSITEK MUDA" : "SERTIFIKAT PESERTA MAGANG";
        doc.text(title, 148.5, 40, { align: "center" });

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        doc.text("Diberikan kepada:", 148.5, 65, { align: "center" });

        doc.setTextColor(56, 189, 248);
        doc.setFontSize(32);
        doc.setFont("helvetica", "bold");
        doc.text(nama.toUpperCase(), 148.5, 85, { align: "center" });

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        doc.text(`Kelas: ${kelas}`, 148.5, 100, { align: "center" });
        doc.text(`Skor Uji Kompetensi: ${skor} / 12`, 148.5, 110, { align: "center" });

        doc.setFontSize(14);
        const bodyText = isLulus 
            ? "Telah berhasil menyelesaikan Program Magang TransforLab\ndan dinyatakan LULUS sebagai Arsitek Muda di Studio Arsitek Pola."
            : "Telah berpartisipasi dan mengikuti Program Magang TransforLab\ndi Studio Arsitek Pola.";
        
        doc.text(bodyText, 148.5, 135, { align: "center", lineHeightFactor: 1.5 });

        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.5);
        doc.line(110, 175, 187, 175);
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "italic");
        doc.text("Kepala Studio", 148.5, 170, { align: "center" });
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Kepala Studio Arsitek Pola", 148.5, 182, { align: "center" });
    },

    finishPDF(doc, target, isLulus) {
        const filename = isLulus ? "Sertifikat_Arsitek_Muda.pdf" : "Sertifikat_Magang.pdf";
        doc.save(filename);
        
        target.innerHTML = `
            <div class="flex-center" style="background: linear-gradient(135deg, var(--color-navy-deep) 0%, var(--color-navy) 100%); width: 100%; height: 100vh; flex-direction: column; gap: 24px;">
                <div style="background-color: var(--color-navy); padding: 40px; border-radius: 12px; text-align: center; border: 1px solid var(--color-accent-amber);">
                    <h2 style="color: var(--color-accent-amber); margin-bottom: 16px;">Selesai!</h2>
                    <p style="color: var(--color-warm-light); font-size: 1.1rem; margin-bottom: 24px;">Sertifikat Anda telah berhasil diunduh.</p>
                    <button class="btn btn-primary" id="btn-restart">Mulai Ulang Program</button>
                </div>
            </div>
        `;

        target.querySelector('#btn-restart').addEventListener('click', () => {
            window.TL.State.reset();
            window.TL.App.navigate('landing');
        });
    }
};