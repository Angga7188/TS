// ============================================
// 1. MENU NAVIGASI SMOOTH SCROLL
// ============================================
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// 2. TOMBOL SAPA (Notifikasi Interaktif)
// ============================================
const greetBtn = document.getElementById('greetBtn');
if (greetBtn) {
    greetBtn.addEventListener('click', () => {
        const jam = new Date().getHours();
        let sapaan = 'Halo';
        if (jam < 11) sapaan = 'Selamat pagi';
        else if (jam < 15) sapaan = 'Selamat siang';
        else if (jam < 19) sapaan = 'Selamat sore';
        else sapaan = 'Selamat malam';

        alert(`${sapaan}! Terima kasih sudah mengunjungi portofolio saya. 😊`);
    });
}

// ============================================
// 3. TOGGLE TEMA GELAP / TERANG
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Cek tema tersimpan di localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ============================================
// 4. VALIDASI FORMULIR KONTAK
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset error
        clearErrors();

        // Ambil nilai input
        const nama = document.getElementById('nama').value.trim();
        const email = document.getElementById('email').value.trim();
        const topik = document.getElementById('topik').value;
        const pesan = document.getElementById('pesan').value.trim();
        const setuju = document.getElementById('setuju').checked;

        let isValid = true;

        // Validasi Nama
        if (nama === '') {
            showError('nama', 'Nama tidak boleh kosong.');
            isValid = false;
        } else if (nama.length < 3) {
            showError('nama', 'Nama minimal 3 karakter.');
            isValid = false;
        }

        // Validasi Email (regex sederhana)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Email tidak boleh kosong.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Format email tidak valid.');
            isValid = false;
        }

        // Validasi Topik
        if (topik === '') {
            showError('topik', 'Silakan pilih topik keperluan.');
            isValid = false;
        }

        // Validasi Pesan
        if (pesan === '') {
            showError('pesan', 'Pesan tidak boleh kosong.');
            isValid = false;
        } else if (pesan.length < 10) {
            showError('pesan', 'Pesan minimal 10 karakter.');
            isValid = false;
        }

        // Validasi Checkbox
        if (!setuju) {
            showError('setuju', 'Anda harus menyetujui pernyataan.');
            isValid = false;
        }

        // Jika valid
        if (isValid) {
            formStatus.textContent = `Terima kasih, ${nama}! Pesan Anda berhasil dikirim. ✅`;
            formStatus.className = 'form-status success';
            contactForm.reset();

            // Hilangkan pesan sukses setelah 5 detik
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        } else {
            formStatus.textContent = '⚠️ Mohon periksa kembali isian formulir Anda.';
            formStatus.className = 'form-status error';
        }
    });
}

// Fungsi menampilkan error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById('error' + capitalize(fieldId));
    if (field) field.classList.add('input-error');
    if (errorEl) errorEl.textContent = message;
}

// Fungsi menghapus semua error
function clearErrors() {
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    formStatus.textContent = '';
    formStatus.className = 'form-status';
}

// Kapitalisasi huruf pertama
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// 5. VALIDASI REAL-TIME (saat mengetik)
// ============================================
const inputsToWatch = ['nama', 'email', 'topik', 'pesan'];
inputsToWatch.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => {
            el.classList.remove('input-error');
            const errorEl = document.getElementById('error' + capitalize(id));
            if (errorEl) errorEl.textContent = '';
        });
    }
});

// ============================================
// 6. ANIMASI MUNCUL SAAT SCROLL (Intersection Observer)
// ============================================
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});