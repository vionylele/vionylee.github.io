const translations = {
    id: {
        navProfil: 'Profil',
        navKeahlian: 'Keahlian',
        navKarya: 'Karya',
        navKontak: 'Kontak',
        heroHi: 'Halo, saya',
        heroDesc: 'Eksplorasi algoritma, struktur data, dan pengembangan web. Saya memadukan logika pemrograman dengan kreativitas visual untuk membangun ekosistem digital.',
        heroContact: 'Hubungi Saya',
        profileHeading: 'Profil Profesional',
        education: 'Pendidikan',
        university: 'Universitas',
        major: 'Jurusan',
        status: 'Status',
        studentStatus: 'Mahasiswa Aktif',
        skillsHeading: 'Kompetensi Teknis',
        webDev: 'Pengembangan Web',
        tools: 'Alat Pengembangan',
        contactHeading: 'Jejak Digital',
        emailLabel: 'Email',
        githubLabel: 'GitHub',
        whatsappLabel: 'WhatsApp',
        phoneLabel: 'Telepon (TW)',
        lineLabel: 'Line ID',
        footerCopy: '© 2026 Viony Lee.',
        navBeranda: 'Beranda',
        navKaryaPage: 'Karya Website',
        galleryHeading: 'Galeri Proyek',
        galleryDesc: 'Kumpulan hasil karya eksplorasi pengembangan web yang telah saya buat.',
        projectTitle: 'Website HMJM IBBI',
        projectDesc: 'Pengembangan website organisasi himpunan mahasiswa. Menyajikan informasi profil, struktur, dan kegiatan dengan antarmuka yang modern serta responsif.',
        visitProject: 'Kunjungi Website'
    },
    en: {
        navProfil: 'Profile',
        navKeahlian: 'Skills',
        navKarya: 'Works',
        navKontak: 'Contact',
        heroHi: 'Hi, I am',
        heroDesc: 'Exploring algorithms, data structures, and web development. I blend programming logic with visual creativity to build digital experiences.',
        heroContact: 'Contact Me',
        profileHeading: 'Professional Profile',
        education: 'Education',
        university: 'University',
        major: 'Major',
        status: 'Status',
        studentStatus: 'Active Student',
        skillsHeading: 'Technical Skills',
        webDev: 'Web Development',
        tools: 'Development Tools',
        contactHeading: 'Digital Footprint',
        emailLabel: 'Email',
        githubLabel: 'GitHub',
        whatsappLabel: 'WhatsApp',
        phoneLabel: 'Phone (TW)',
        lineLabel: 'Line ID',
        footerCopy: '© 2026 Viony Lee.',
        navBeranda: 'Home',
        navKaryaPage: 'Portfolio',
        galleryHeading: 'Project Gallery',
        galleryDesc: 'A collection of web development projects I have built.',
        projectTitle: 'HMJM IBBI Website',
        projectDesc: 'Organization website built for a student association. It features profile, structure, and event pages with a modern responsive interface.',
        visitProject: 'Visit Website'
    }
};

function applyLanguage(lang) {
    const i18nNodes = document.querySelectorAll('[data-i18n]');
    i18nNodes.forEach((node) => {
        const key = node.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            node.textContent = translations[lang][key];
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('siteLanguage', lang);

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = localStorage.getItem('siteLanguage') || 'id';
    applyLanguage(defaultLang);

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    // 1. Animasi Smooth Scrolling untuk Navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Efek Scroll Reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => {
        observer.observe(el);
    });

    // 3. Efek Typing (Mengetik Otomatis di Beranda)
    const textElement = document.querySelector('.typing-text');
    if (textElement) {
        const texts = [
            'Mahasiswa Computer Science',
            'Web Developer Enthusiast',
            'UI/UX Explorer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            setTimeout(typeEffect, typingSpeed);
        }

        setTimeout(typeEffect, 1000);
    }
});