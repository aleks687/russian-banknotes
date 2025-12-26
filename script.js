/**
 * РУБЛЬ В ДЕТАЛЯХ
 * Основной JavaScript файл
 * Версия 1.0
 */

// ===== ОСНОВНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====
const BANKNOTE_DATA = {
    '5000': {
        color: '#4a6572',
        city: 'Хабаровск',
        year: '2006',
        size: '157 × 69 мм'
    },
    '2000': {
        color: '#5d8aa8',
        city: 'Владивосток',
        year: '2017',
        size: '157 × 69 мм'
    },
    '1000': {
        color: '#9c8c7a',
        city: 'Ярославль',
        year: '2001',
        size: '157 × 69 мм'
    },
    '500': {
        color: '#7c9d65',
        city: 'Архангельск',
        year: '1997',
        size: '150 × 65 мм'
    },
    '200': {
        color: '#a8c4a9',
        city: 'Севастополь',
        year: '2017',
        size: '150 × 65 мм'
    },
    '100': {
        color: '#c4d4e2',
        city: 'Москва',
        year: '1997',
        size: '150 × 65 мм'
    }
};

// ===== ОСНОВНЫЕ ФУНКЦИИ =====

/**
 * Инициализация мобильного меню
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Меняем иконку
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

/**
 * Анимация карточек банкнот при прокрутке
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками банкнот
    const banknoteCards = document.querySelectorAll('.banknote-card, .security-item, .biography-card');
    banknoteCards.forEach((card, index) => {
        card.style.setProperty('--order', index);
        observer.observe(card);
    });
}

/**
 * Инициализация вкладок на странице банкноты
 */
function initBanknoteTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок
            tabBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Скрываем все вкладки
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Показываем выбранную вкладку
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

/**
 * Эффект вращения для банкноты
 */
function initBanknoteRotation() {
    const rotateBtn = document.getElementById('rotate-btn');
    const banknoteImage = document.getElementById('banknote-image');
    
    if (!rotateBtn || !banknoteImage) return;
    
    let isRotated = false;
    
    rotateBtn.addEventListener('click', function() {
        if (isRotated) {
            banknoteImage.style.transform = 'rotateY(0deg)';
            rotateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Перевернуть';
        } else {
            banknoteImage.style.transform = 'rotateY(180deg)';
            rotateBtn.innerHTML = '<i class="fas fa-undo"></i> Вернуть';
        }
        isRotated = !isRotated;
    });
}

/**
 * Эффект увеличения банкноты
 */
function initBanknoteZoom() {
    const zoomBtn = document.getElementById('zoom-btn');
    const banknoteImage = document.getElementById('banknote-image');
    
    if (!zoomBtn || !banknoteImage) return;
    
    let isZoomed = false;
    
    zoomBtn.addEventListener('click', function() {
        if (isZoomed) {
            banknoteImage.style.transform = 'scale(1)';
            banknoteImage.style.zIndex = '1';
            zoomBtn.innerHTML = '<i class="fas fa-search-plus"></i> Увеличить';
        } else {
            banknoteImage.style.transform = 'scale(1.8)';
            banknoteImage.style.zIndex = '100';
            banknoteImage.style.boxShadow = '0 0 50px rgba(0,0,0,0.5)';
            zoomBtn.innerHTML = '<i class="fas fa-search-minus"></i> Уменьшить';
        }
        isZoomed = !isZoomed;
    });
}

/**
 * Подсветка элементов банкноты при наведении
 */
function initBanknoteTooltips() {
    const elements = document.querySelectorAll('.element[data-tooltip]');
    
    elements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        // Создаем тултип
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        // Показываем тултип при наведении
        element.addEventListener('mouseenter', function(e) {
            tooltip.style.display = 'block';
            element.style.transform = 'scale(1.2)';
        });
        
        // Двигаем тултип за курсором
        element.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.pageX + 15) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        });
        
        // Скрываем тултип
        element.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
            element.style.transform = 'scale(1)';
        });
    });
}

/**
 * Фильтрация карточек биографий
 */
function initBiographyFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const biographyCards = document.querySelectorAll('.biography-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтруем карточки
            biographyCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Инициализация викторины (если будет на сайте)
 */
function initQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    const quizData = [
        {
            question: "На какой банкноте изображён мост через Амур?",
            options: ["1000 рублей", "2000 рублей", "5000 рублей", "500 рублей"],
            correct: 2
        },
        {
            question: "Какой город изображён на банкноте 200 рублей?",
            options: ["Севастополь", "Москва", "Ярославль", "Архангельск"],
            correct: 0
        },
        {
            question: "Когда была выпущена банкнота 2000 рублей?",
            options: ["1997", "2001", "2006", "2017"],
            correct: 3
        }
    ];
    
    // Здесь будет код викторины
    console.log('Викторина инициализирована');
}

/**
 * Плавная прокрутка к якорям
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якорь "#" без id
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Динамическое обновление года в футере
 */
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement && yearElement.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}

/**
 * Эффект параллакса для фона
 */
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Изменение темы (светлая/тёмная)
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

/**
 * Анимация чисел (статистика)
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 секунды
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Валидация форм (если будут)
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Здесь можно отправить форму
                alert('Форма отправлена!');
                this.reset();
            }
        });
    });
}

/**
 * Инициализация всех функций при загрузке страницы
 */
function initAll() {
    console.log('🚀 Инициализация сайта "Рубль в деталях"');
    
    // Основные функции
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    
    // Функции для страницы банкноты
    initBanknoteTabs();
    initBanknoteRotation();
    initBanknoteZoom();
    initBanknoteTooltips();
    
    // Функции для страницы биографий
    initBiographyFilter();
    
    // Дополнительные функции
    updateFooterYear();
    initParallaxEffect();
    initThemeToggle();
    initCounterAnimation();
    initFormValidation();
    initQuiz();
    
    // Добавляем CSS для тултипов
    addTooltipStyles();
    
    console.log('✅ Все функции инициализированы');
}

/**
 * Добавление стилей для тултипов
 */
function addTooltipStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tooltip {
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            display: none;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .dark-theme {
            background-color: #1a1a2e;
            color: #e6e6e6;
        }
        
        .dark-theme .header,
        .dark-theme .banknote-hero,
        .dark-theme .security {
            background-color: rgba(30, 30, 46, 0.95);
        }
        
        .error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
        }
        
        /* Анимация для карточек */
        .banknote-card.animated,
        .security-item.animated,
        .biography-card.animated {
            animation: fadeInUp 0.6s ease forwards;
            animation-delay: calc(var(--order) * 0.1s);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =====

// Способ 1: Когда DOM полностью загружен
document.addEventListener('DOMContentLoaded', initAll);

// Способ 2: Когда страница полностью загружена (включая изображения)
window.addEventListener('load', function() {
    console.log('📄 Страница полностью загружена');
    
    // Добавляем класс для анимации
    document.body.classList.add('loaded');
    
    // Показываем лоадер 1 секунду, потом скрываем
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// Обработка нажатия клавиши Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Закрываем мобильное меню
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Убираем увеличение банкноты
        const banknoteImage = document.getElementById('banknote-image');
        const zoomBtn = document.getElementById('zoom-btn');
        if (banknoteImage && banknoteImage.style.transform.includes('scale(1.8)')) {
            banknoteImage.style.transform = 'scale(1)';
            banknoteImage.style.zIndex = '1';
            if (zoomBtn) {
                zoomBtn.innerHTML = '<i class="fas fa-search-plus"></i> Увеличить';
            }
        }
    }
});

// Изменение размера окна
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('🔄 Размер окна изменён');
        
        // Закрываем мобильное меню при изменении размера на десктоп
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }, 250);
});

// ===== ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ =====

/**
 * Форматирование чисел (например, 5000 -> "5 000")
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Копирование текста в буфер обмена
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Текст скопирован: ', text);
            showNotification('Текст скопирован!', 'success');
        })
        .catch(err => {
            console.error('Ошибка копирования: ', err);
            showNotification('Ошибка копирования', 'error');
        });
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем CSS для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

console.log('📜 Файл script.js загружен и готов к работе!');