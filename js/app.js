window.TL = window.TL || {};

window.TL.State = {
    data: {
        nama: "",
        kelas: "",
        progress: {
            refleksi: false,
            translasi: false,
            rotasi: false,
            dilatasi: false
        },
        answers: {},
        skor: 0
    },
    
    save() {
        localStorage.setItem("transforlab_state", JSON.stringify(this.data));
    },
    
    load() {
        const d = localStorage.getItem("transforlab_state");
        if (d) {
            try {
                this.data = JSON.parse(d);
            } catch (e) {
                console.error("Gagal membaca State dari localStorage", e);
            }
        }
    },
    
    reset() {
        this.data = {
            nama: "",
            kelas: "",
            progress: {
                refleksi: false,
                translasi: false,
                rotasi: false,
                dilatasi: false
            },
            answers: {},
            skor: 0
        };
        this.save();
    },

    isAllModulesCompleted() {
        return this.data.progress.refleksi && 
               this.data.progress.translasi && 
               this.data.progress.rotasi && 
               this.data.progress.dilatasi;
    }
};

window.TL.App = {
    currentScreen: "landing",
    
    navigate(screen, param = null) {
        this.currentScreen = screen;
        this.render(param);
    },
    
    render(param) {
        const target = document.getElementById("app");
        if (!target) return;
        
        target.innerHTML = "";
        
        switch(this.currentScreen) {
            case "landing":
                window.TL.Narasi.renderLanding(target);
                break;
            case "narasi2":
                window.TL.Narasi.renderScene2(target);
                break;
            case "narasi3":
                window.TL.Narasi.renderScene3(target);
                break;
            case "jedaWaktu":
                window.TL.Narasi.renderJedaWaktu(target);
                break;
            case "narasi4":
                window.TL.Narasi.renderScene4(target);
                break;
            case "narasi5":
                window.TL.Narasi.renderScene5(target);
                break;
            case "narasi6":
                window.TL.Narasi.renderScene6(target);
                break;
            case "form":
                window.TL.Form.render(target);
                break;
            case "dashboard":
                window.TL.Dashboard.render(target);
                break;
            case "module":
                window.TL.Dashboard.openModule(target, param);
                break;
            case "eksplorasiHub":
                window.TL.EksplorasiHub.render(target);
                break;
            case "transition":
                window.TL.Narasi.renderTransition(target);
                break;
            case "assessment":
                window.TL.Assessment.render(target);
                break;
            case "result":
                window.TL.Assessment.showResult(target);
                break;
            default:
                console.error("Navigasi gagal: Screen tidak dikenali ->", this.currentScreen);
        }
    }
};

window.addEventListener('load', () => {
    window.TL.State.load();
    window.TL.App.navigate('landing');
});