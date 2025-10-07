document.addEventListener('DOMContentLoaded', function() {
    const blackScreen = document.getElementById('blackScreen');
    const heartScene = document.getElementById('heartScene');
    const loveScene = document.getElementById('loveScene');
    const heart3d = document.getElementById('heart3d');
    const cursorDot = document.querySelector('.cursor-dot');
    const loveCanvas = document.getElementById('loveCanvas');
    const loveText = document.getElementById('loveText');
    const floatingHearts = document.querySelector('.floating-hearts');
    const loveSound = document.getElementById('loveSound');

    const ctx = loveCanvas.getContext('2d');
    let mouseX = 0, mouseY = 0;
    let particles = [];
    let isHeartHovered = false;

    // Настройка canvas
    function setupCanvas() {
        loveCanvas.width = window.innerWidth;
        loveCanvas.height = window.innerHeight;
    }

    // Кастомный курсор
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        if (!heartScene.classList.contains('hidden')) {
            updateHeartRotation();
        }
    });

    // 3D вращение сердца
    function updateHeartRotation() {
        const heartRect = heart3d.getBoundingClientRect();
        const heartX = heartRect.left + heartRect.width / 2;
        const heartY = heartRect.top + heartRect.height / 2;
        
        const rotateY = (mouseX - heartX) * 0.1;
        const rotateX = -(mouseY - heartY) * 0.1;
        
        heart3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        
        // Проверка наведения на сердце
        const distance = Math.sqrt(Math.pow(mouseX - heartX, 2) + Math.pow(mouseY - heartY, 2));
        isHeartHovered = distance < 100;
        
        if (isHeartHovered) {
            heart3d.classList.add('glow');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorDot.style.background = '#ff69b4';
        } else {
            heart3d.classList.remove('glow');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = '#ff0080';
        }
    }

    // Нажатие пробела
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !blackScreen.classList.contains('hidden')) {
            e.preventDefault();
            showHeartScene();
        }
    });

    // Клик по чёрному экрану
    blackScreen.addEventListener('click', showHeartScene);

    function showHeartScene() {
        blackScreen.classList.add('hidden');
        heartScene.classList.remove('hidden');
        heart3d.classList.add('pulse');
    }

    // Клик по сердцу
    heart3d.addEventListener('click', startLoveEffects);

    const loveMessages = [
        "Ксюша, ты моё всё 💖",
        "Каждая твоя улыбка - это солнце в моей жизни ☀️",
        "Ты делаешь этот мир прекраснее 🌸",
        "Моё сердце принадлежит тебе навсегда 💞",
        "В твоих глазах я вижу наше будущее ✨",
        "Ты самая лучшая девушка на свете 🌟",
        "Я счастлив, что ты в моей жизни 💫",
        "Любовь к тебе растёт с каждым днём 🌹",
        "Ты моя самая большая мечта 💝",
        "Вместе мы создаём нашу историю 💑",
        "Ты вдохновляешь меня становиться лучше 🌈",
        "Каждая минута с тобой - подарок 🎁",
        "Ты самая красивая 💐",
        "Моя любовь к тебе бесконечна ♾️",
        "Ты - причина моего счастья 😊"
    ];

    function startLoveEffects() {
        heartScene.classList.add('hidden');
        loveScene.classList.remove('hidden');
        
        setupCanvas();
        loveSound.play();
        
        startParticleSystem();
        showLoveMessages();
        createFloatingHearts();
    }

    // Система частиц
    function startParticleSystem() {
        particles = [];
        
        function createParticle() {
            particles.push({
                x: Math.random() * loveCanvas.width,
                y: Math.random() * loveCanvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`
            });
        }

        // Создаем начальные частицы
        for (let i = 0; i < 100; i++) {
            createParticle();
        }

        function animateParticles() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, loveCanvas.width, loveCanvas.height);
            
            particles.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Отскакивание от границ
                if (particle.x < 0 || particle.x > loveCanvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > loveCanvas.height) particle.speedY *= -1;
                
                // Иногда добавляем новые частицы
                if (Math.random() < 0.02) {
                    createParticle();
                }
                
                // Удаляем старые частицы
                if (particles.length > 200) {
                    particles.splice(index, 1);
                }
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

    // Показ сообщений
    function showLoveMessages() {
        let messageIndex = 0;
        
        function showNextMessage() {
            if (messageIndex < loveMessages.length) {
                loveText.textContent = loveMessages[messageIndex];
                loveText.style.opacity = '1';
                
                setTimeout(() => {
                    loveText.style.opacity = '0';
                    setTimeout(() => {
                        messageIndex++;
                        showNextMessage();
                    }, 500);
                }, 3000);
            } else {
                // Финальное сообщение
                loveText.innerHTML = "Ксюша, я тебя очень сильно люблю!<br>Ты самое дорогое, что есть в моей жизни 💖";
                loveText.style.opacity = '1';
                loveText.style.fontSize = '42px';
            }
        }
        
        showNextMessage();
    }

    // Плавающие сердца
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💖';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            floatingHearts.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }

    // Ресайз canvas
    window.addEventListener('resize', () => {
        if (!loveScene.classList.contains('hidden')) {
            setupCanvas();
        }
    });
});