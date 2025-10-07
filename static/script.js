document.addEventListener('DOMContentLoaded', function() {
    const blackScreen = document.getElementById('blackScreen');
    const heartContainer = document.getElementById('heartContainer');
    const effectsContainer = document.getElementById('effectsContainer');
    const mainHeart = document.getElementById('mainHeart');
    const loveMessages = document.getElementById('loveMessages');
    const particles = document.getElementById('particles');
    const fireworks = document.getElementById('fireworks');
    const loveSound = document.getElementById('loveSound');

    let mouseX = 0;
    let mouseY = 0;

    // Следим за движением мыши для 3D эффекта
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!heartContainer.classList.contains('hidden')) {
            updateHeartPosition();
        }
    });

    function updateHeartPosition() {
        const heartRect = mainHeart.getBoundingClientRect();
        const heartX = heartRect.left + heartRect.width / 2;
        const heartY = heartRect.top + heartRect.height / 2;
        
        const deltaX = (mouseX - heartX) * 0.02;
        const deltaY = (mouseY - heartY) * 0.02;
        
        mainHeart.style.transform = `translate(-50%, -50%) perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.1)`;
    }

    // Обработка нажатия пробела
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && blackScreen.style.display !== 'none') {
            e.preventDefault();
            showHeart();
        }
    });

    function showHeart() {
        blackScreen.classList.add('hidden');
        heartContainer.classList.remove('hidden');
        
        // Запускаем отслеживание положения мыши
        setInterval(updateHeartPosition, 16);
    }

    // Обработка клика на сердечко
    mainHeart.addEventListener('click', startLoveEffects);

    function startLoveEffects() {
        heartContainer.classList.add('hidden');
        effectsContainer.classList.remove('hidden');
        
        // Запускаем звук
        loveSound.play();
        
        // Запускаем все эффекты
        showLoveMessages();
        createParticles();
        createFireworks();
        showFinalMessage();
    }

    const messages = [
        "Ксюша, ты моё солнце! ☀️",
        "Я люблю тебя больше всего! 💖",
        "Ты самая красивая! 🌸",
        "Моё сердце бьётся для тебя! 💓",
        "Ты делаешь меня счастливым! 😊",
        "Вместе навсегда! 🌟",
        "Ты моя мечта! 💫",
        "Любовь моя бесконечна! ∞",
        "Каждый день с тобой - праздник! 🎉",
        "Ты самое лучшее что со мной случилось! 💕"
    ];

    function showLoveMessages() {
        messages.forEach((message, index) => {
            setTimeout(() => {
                const messageElement = document.createElement('div');
                messageElement.textContent = message;
                messageElement.className = 'love-message';
                messageElement.style.left = Math.random() * 80 + 10 + '%';
                messageElement.style.animationDelay = Math.random() * 2 + 's';
                loveMessages.appendChild(messageElement);
                
                // Удаляем сообщение после анимации
                setTimeout(() => {
                    messageElement.remove();
                }, 4000);
            }, index * 800);
        });
    }

    function createParticles() {
        for (let i = 0; i < 200; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.background = getRandomColor();
                particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
                particle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
                particles.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 20);
        }
    }

    function createFireworks() {
        setInterval(() => {
            const fireworkCount = 50;
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * window.innerHeight;
            
            for (let i = 0; i < fireworkCount; i++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = centerX + 'px';
                firework.style.top = centerY + 'px';
                firework.style.background = getRandomColor();
                firework.style.setProperty('--fx', (Math.random() - 0.5) * 300 + 'px');
                firework.style.setProperty('--fy', (Math.random() - 0.5) * 300 + 'px');
                fireworks.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1500);
            }
        }, 1000);
    }

    function showFinalMessage() {
        setTimeout(() => {
            const finalMessage = document.createElement('div');
            finalMessage.innerHTML = "Ксюша, я тебя люблю!<br>Ты самое дорогое что у меня есть! 💝";
            finalMessage.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 48px;
                color: #ff69b4;
                text-align: center;
                text-shadow: 0 0 20px #ff0080;
                animation: pulse 2s infinite;
            `;
            effectsContainer.appendChild(finalMessage);
        }, messages.length * 800 + 1000);
    }

    function getRandomColor() {
        const colors = ['#ff0080', '#ff69b4', '#ff1493', '#dc143c', '#ff0066'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Добавляем клик по черному экрану как альтернативу пробелу
    blackScreen.addEventListener('click', showHeart);
});