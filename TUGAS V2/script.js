// ===================================================================
// SCRIPT.JS — INTERACTIVE PLAYGROUND CONTROLLER
// Topik Belajar JavaScript DOM untuk Mahasiswa:
// 1. Event 'DOMContentLoaded' (Waktu Eksekusi yang Tepat)
// 2. Seleksi Elemen DOM (getElementById, querySelectorAll)
// 3. Konsep State Management Sederhana (Objek JavaScript)
// 4. Penggunaan Data-Attribute HTML5 (data-prop & data-val)
// 5. Manipulasi Class CSS Dinamis (classList.add / remove)
// 6. Manipulasi Style Inline dan Template Literals String
// ===================================================================

/*
   LANGKAH 1: MENUNGGU DOKUMEN HTML SELESAI DIMUAT (DOMContentLoaded)
   Pelajaran Penting:
   Jika kode JavaScript dijalankan sebelum browser selesai membaca file HTML,
   perintah seperti document.getElementById("flexStage") akan menghasilkan 'null'
   dan memicu error "Cannot read properties of null".
   Event 'DOMContentLoaded' memastikan seluruh pohon DOM sudah siap di memori.
*/
document.addEventListener("DOMContentLoaded", () => {

  // =================================================================
  // LANGKAH 2: SELEKSI ELEMEN KUNCI (DOM SELECTION)
  // =================================================================
  
  // flexStage: Kotak wadah simulasi Flexbox tempat item A, B, dan C berada
  const flexStage = document.getElementById("flexStage");

  // flexCodeDisplay: Tag <code> tempat kita mencetak teks CSS aktif untuk mahasiswa
  const flexCodeDisplay = document.getElementById("flexCodeDisplay");


  // =================================================================
  // LANGKAH 3: MEMBUAT OBJEK STATE (DATA KONFIGURASI)
  // Pelajaran:
  // Jangan menyimpan status aplikasi secara acak. Satukan ke dalam 1 objek
  // agar mudah dilacak dan diperbarui secara terpusat (Single Source of Truth).
  // =================================================================
  const flexState = {
    flexDirection: "row",            // Default arah: mendatar (horizontal)
    justifyContent: "space-between", // Default sumbu utama: ruang terbagi rata
    alignItems: "center"             // Default sumbu silang: rata tengah vertikal
  };


  // =================================================================
  // LANGKAH 4: FUNGSI RENDER KE LAYAR (UPDATE TAMPILAN & KODE CSS)
  // Pelajaran:
  // Fungsi ini bertugas mengambil data terbaru dari 'flexState' lalu:
  // 1. Menerapkannya ke style CSS elemen 'flexStage'
  // 2. Menuliskan kembali teks kode CSS pada kotak preview
  // =================================================================
  function updateFlexDisplay() {
    // A. Manipulasi CSS inline langsung pada elemen kontainer
    flexStage.style.flexDirection = flexState.flexDirection;
    flexStage.style.justifyContent = flexState.justifyContent;
    flexStage.style.alignItems = flexState.alignItems;

    // B. Perbarui teks di dalam kotak preview <pre><code>
    // Menggunakan Template Literals (tanda backtick `...`) agar variabel dapat disisipkan dengan ${...}
    if (flexCodeDisplay) {
      flexCodeDisplay.textContent = `.flex-container {
  display: flex;
  flex-direction: ${flexState.flexDirection};
  justify-content: ${flexState.justifyContent};
  align-items: ${flexState.alignItems};
  gap: 16px;
}`;
    }
  }


  // =================================================================
  // LANGKAH 5: DAFTARKAN EVENT LISTENER KE SEMUA TOMBOL KONTROL
  // Pelajaran Best Practice:
  // Alih-alih membuat 10 fungsi terpisah untuk tiap tombol (onClickBtn1, onClickBtn2, dst),
  // kita cukup menyeleksi semua tombol sekaligus dengan class '.control-btn',
  // lalu memasang 'click' listener secara otomatis menggunakan perulangan forEach.
  // =================================================================
  const controlButtons = document.querySelectorAll(".control-btn");

  controlButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Baca atribut kustom HTML5: data-prop dan data-val yang ada pada tombol yang diklik
      // Contoh: data-prop="justifyContent" dan data-val="center"
      const prop = btn.getAttribute("data-prop");
      const val = btn.getAttribute("data-val");

      if (prop && val) {
        // 1. Perbarui nilai di dalam objek state
        // Sintaks bracket notation: flexState["justifyContent"] = "center"
        flexState[prop] = val;

        // 2. Atur status visual tombol aktif:
        // Ambil elemen induk grup tombol (div.btn-group)
        const parentGroup = btn.parentElement;
        if (parentGroup) {
          // Lepas class 'active' dari semua tombol saudara (siblings) dalam grup yang sama
          parentGroup.querySelectorAll(".control-btn").forEach((sibling) => {
            sibling.classList.remove("active");
          });
        }
        // Berikan class 'active' HANYA pada tombol yang baru saja diklik oleh pengguna
        btn.classList.add("active");

        // 3. Panggil fungsi render untuk memperbarui tampilan panggung & teks kode
        updateFlexDisplay();
      }
    });
  });


  // =================================================================
  // LANGKAH 6: INISIALISASI AWAL
  // Panggil fungsi updateFlexDisplay() sekali saat halaman pertama kali dibuka
  // agar teks kode CSS di awal sudah sinkron dengan nilai default flexState.
  // =================================================================
  updateFlexDisplay();
});