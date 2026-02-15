// ========== ЗАГРУЗКА ==========
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');

// Список всех ресурсов для загрузки
const resources = [
    'envelope.png',
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'song.mp3'
];

let loadedCount = 0;

// Функция обновления прогресса
function updateProgress() {
    loadedCount++;
    const percent = (loadedCount / resources.length) * 100;
    loadingProgress.style.width = percent + '%';
    
    if (loadedCount === resources.length) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
}

// Загружаем каждое изображение
resources.forEach(resource => {
    if (resource.match(/\.(jpg|png|gif)$/)) {
        const img = new Image();
        img.src = resource;
        img.onload = updateProgress;
        img.onerror = updateProgress; // Даже если ошибка, идем дальше
    } else if (resource.match(/\.mp3$/)) {
        // Для музыки используем другой подход
        fetch(resource)
            .then(updateProgress)
            .catch(updateProgress);
    }
});

// Если что-то пошло не так, скрываем загрузку через 5 секунд
setTimeout(() => {
    loadingScreen.classList.add('hidden');
}, 5000);

const envelope = document.getElementById('envelope');
const message = document.getElementById('message');
const envelopeImg = document.getElementById('envelopeImg');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const nameTitle = document.getElementById('nameTitle');
const addReasonBtn = document.getElementById('addReason');
const reasonList = document.getElementById('reasonList');

const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
let isMusicPlaying = false;

// ========== НОВЫЙ КОД ДЛЯ ПРИЧИН ==========
// Массив со всеми возможными причинами
const allReasons = [
    'Потому что рядом с тобой мне спокойно',
        'Ты - мой лучший друг',
        'Мне хорошо с тобой в любом месте',
        'Мне нравится твой запах',
        'Мне с тобой никогда не скучно',
        'Ты знаешь как заставить меня улыбнуться',
        'У тебя самые красивые глаза',
        'Я могу на тебя положиться',
        'Я люблю твою улыбку',
        'Мне с тобой легко',
        'Ты всегда чувствуешь, если мне плохо',
        'Ты умеешь находить нужные слова',
        'Твои объятия особенные',
        'Твои лучшие шутки',
        'Твои интересные истории',
        'Твои волосы',
        'Твоя доброта',
        'Потому что ты настоящий',
        'Потому что ты умеешь быть нежным',
        'Ты умеешь быть сильным',
        'Потому что ты упрямый (иногда как козёл ахахаах)',
        'Потому что ты честный',
        'С тобой можно быть собой',
        'Твои руки - моё любимое место',
        'Потому что рядом с тобой я чувствую себя в безопасности',
        'Потому что ты думаешь глубже чем показываешь',
        'Потому что ты умеешь переживать по настоящему',
        'Потому что ты не равнодушный',
        'Ты смеешься искренне',
        'Ты настоящий',
        'Потому что ты стараешься',
        'Потому что ты красивый',
        'Твой смех я узнаю из тысячи',
        'Потому что ты мой человек',
        'Ты умеешь любить',
        'Потому что ты терпишь мои странности',
        'Потому что ты разделяешь мои радости',
        'Потому что ты остаёшься рядом',
        'Потому что ты заботишься о близких',
        'Потому что ты смотришь так, что я таю',
        'Потому что ты не сдаёшься',
        'Потому что ты умеешь быть уязвимым',
        'Потому что ты мой выбор',
        'Потому что ты — это ты',
        'Потому что рядом с тобой время летит иначе',
        'Потому что с тобой даже обычные дни особенные',
        'Потому что ты умеешь удивлять',
        'Потому что ты умеешь чувствовать',
        'Потому что ты умеешь мечтать',
        'Потому что ты умеешь бороться',
        'Потому что ты сильнее, чем думаешь',
        'Потому что ты красив не только внешне',
        'Потому что у тебя доброе сердце',
        'Потому что ты мой любимый голос',
        'Потому что ты мой любимый человек',
        'Потому что ты терпеливый',
        'Потому что ты смелый',
        'Потому что ты внимательный',
        'Потому что ты умеешь быть серьёзным, когда нужно',
        'Потому что ты умеешь быть мягким, когда это важно',
        'Потому что ты мой покой',
        'Потому что ты моя страсть',
        'Потому что ты мой уют',
        'Потому что ты мой хаос',
        'Потому что ты мой баланс',
        'Потому что ты веришь в меня',
        'Потому что ты даёшь мне чувствовать себя любимой',
        'Потому что ты — часть моей жизни',
        'Потому что ты — моя привычка',
        'Потому что ты — моё притяжение',
        'Потому что ты — моё тепло',
        'Потому что ты — моё «хочу быть рядом»',
        'Потому что ты — моё «никуда не уходи»',
        'Потому что ты — моё «останься»',
        'Потому что ты умеешь быть собой',
        'Потому что ты не играешь роли',
        'Потому что ты рядом в трудные дни',
        'Потому что ты выбрал меня',
        'Потому что я выбрала тебя',
        'Потому что ты мой дом',
        'Потому что с тобой я счастлива',
        'Ты как чашка чая с пледом в дождливую погоду',
        'Потому что просто люблю',
        'Ты милый',
        'Ты очаровательный',
        'Любить тебя - самое прекрасное чувство',
        'Хочу обнимать тебя вечно',
        'Твои щёчки',
        'Ты верный',
        'Ты особенный',
        'Я дорожу тобой',
        'Мне нравится тебя кусать',
        'Ты умный',
        'С тобой можно говорить обо всём и ни о чём',
        'За твою детскую натуру',
        'Мне нравится в тебе всё',
        'Твой характер',
        'Ты как медвежонок',
        'Ты как инь, а я твоя янь',
        'Люблю тебя на 360',
        'То как мы смотримся вместе'
];

// Копия массива для отслеживания оставшихся причин
let remainingReasons = [...allReasons];

// Функция для получения случайной причины (без повторов)
function getRandomReason() {
    // Если причины закончились
    if (remainingReasons.length === 0) {
        // Вариант 1: Показать сообщение и остановиться
        return null;
        
        // Вариант 2: Начать заново (раскомментируй если хочешь)
        // remainingReasons = [...allReasons];
        // alert('🎉 Ты перебрал все причины! Но я все равно тебя люблю! Начинаем заново!');
    }
    
    // Выбираем случайный индекс из оставшихся причин
    const randomIndex = Math.floor(Math.random() * remainingReasons.length);
    const reason = remainingReasons[randomIndex];
    
    // Удаляем выбранную причину из массива оставшихся
    remainingReasons.splice(randomIndex, 1);
    
    return reason;
}

// Обновляем обработчик кнопки
addReasonBtn.addEventListener('click', () => {
    const newReason = getRandomReason();
    
    if (newReason) {
        const li = document.createElement('li');
        li.textContent = `✨ ${newReason}`;
        li.style.animation = 'slideIn 0.5s ease';
        reasonList.appendChild(li);
        
        // Показываем сколько осталось (прикольная фишка)
        const remainingCount = remainingReasons.length;
        if (remainingCount > 0) {
            console.log(`Осталось причин: ${remainingCount}`); // В консоль
        }
    } else {
        // Когда причины закончились
        const li = document.createElement('li');
        li.textContent = '💖 Причины закончились, но любовь бесконечна! 💖';
        li.style.background = 'linear-gradient(45deg, #ff4da6, #ff9a9e)';
        li.style.color = 'white';
        li.style.fontWeight = 'bold';
        li.style.padding = '15px';
        li.style.animation = 'pulse 2s infinite';
        reasonList.appendChild(li);
        
        // Блокируем кнопку
        addReasonBtn.disabled = true;
        addReasonBtn.textContent = '✨ Все причины сказаны! ✨';
        addReasonBtn.style.opacity = '0.5';
        addReasonBtn.style.cursor = 'default';
    }
});

// Эффект при наведении на конверт
if (envelopeImg) {
    envelopeImg.addEventListener('mouseenter', () => {
        envelopeImg.style.animation = 'gentleWobble 0.5s ease-in-out infinite';
    });
    
    envelopeImg.addEventListener('mouseleave', () => {
        envelopeImg.style.animation = 'gentleWobble 4s ease-in-out infinite';
    });
}

// Открытие конверта с эффектом
envelope.addEventListener('click', () => {
    if (envelopeImg) {
        envelopeImg.style.transform = 'scale(0.8) rotate(-10deg)';
        envelopeImg.style.opacity = '0';
        
        setTimeout(() => {
            envelope.classList.add('hidden');
            message.classList.remove('hidden');
            
            const names = ['Любимый', 'Дорогой', 'Чыычаах', 'Милый', 'Родной'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            nameTitle.textContent = `С Днём Святого Валентина, ${randomName}!`;
        }, 300);
    } else {
        envelope.classList.add('hidden');
        message.classList.remove('hidden');
    }
    
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50);
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '🔇 Включить музыку';
    } else {
        bgMusic.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        musicBtn.innerHTML = '🔊 Выключить музыку';
    }
    isMusicPlaying = !isMusicPlaying;
});

function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

setInterval(() => {
    if (!message.classList.contains('hidden')) {
        showSlide(currentSlide + 1);
    }
}, 5000);

setInterval(createHeart, 300);

// ========== НОЧНОЙ РЕЖИМ ==========
const themeToggle = document.getElementById('themeToggle');
let isNightMode = false;

// Создаем элементы для эффектов
function createStars() {
    // Удаляем старые звезды
    document.querySelectorAll('.star, .moon, .cloud').forEach(el => el.remove());
    
    if (isNightMode) {
        // Создаем звезды
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDuration = Math.random() * 3 + 2 + 's';
            star.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(star);
        }
        
        // Создаем луну
        const moon = document.createElement('div');
        moon.className = 'moon';
        document.body.appendChild(moon);
        
        // Запускаем редкие падающие звезды
        startShootingStars();
        
    } else {
        // Создаем облачка для дневного режима
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = `cloud cloud${i+1}`;
            cloud.style.top = Math.random() * 50 + 20 + '%';
            cloud.style.animationDuration = Math.random() * 30 + 40 + 's';
            cloud.style.animationDelay = Math.random() * -20 + 's';
            document.body.appendChild(cloud);
        }
    }
}

// Падающие звезды
function startShootingStars() {
    setInterval(() => {
        if (isNightMode && Math.random() > 0.7) { // 30% шанс каждые 10 секунд
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.left = Math.random() * 60 + 20 + '%';
            star.style.top = Math.random() * 30 + '%';
            star.style.animationDuration = Math.random() * 2 + 1.5 + 's';
            document.body.appendChild(star);
            
            setTimeout(() => star.remove(), 3000);
        }
    }, 10000);
}

// Переключение темы
themeToggle.addEventListener('click', () => {
    isNightMode = !isNightMode;
    
    if (isNightMode) {
        document.body.classList.add('night-mode');
        themeToggle.innerHTML = '☀️ Дневной режим';
        
        // Меняем градиент фона
        document.body.style.background = 'linear-gradient(135deg, #0b0b2b, #1a1a3a, #2d1b4a)';
        
        // Создаем спецэффекты
        createStars();
        
    } else {
        document.body.classList.remove('night-mode');
        themeToggle.innerHTML = '🌙 Ночной режим';
        
        // Возвращаем дневной градиент
        document.body.style.background = 'linear-gradient(-45deg, #fd99bf, #ff6fa6, #80d2f8, #f891ff)';
        
        // Удаляем звезды и создаем облака
        createStars();
    }
    
    // Маленький взрыв сердечек при переключении
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 30);
    }
});

// Создаем начальные облака
setTimeout(() => {
    createStars();
}, 100);

// Добавляем эффект "падающих звезд" при клике на луну
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('moon') && isNightMode) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'shooting-star';
                star.style.left = e.clientX + (Math.random() * 100 - 50) + 'px';
                star.style.top = e.clientY + (Math.random() * 100 - 50) + 'px';
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 3000);
            }, i * 200);
        }
        
        // Меняем текст на луне
        alert('🌙 Ты загадал(а) желание? Оно обязательно сбудется! ✨');
    }

});

