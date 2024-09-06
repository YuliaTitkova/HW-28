function SliderPrototype(container, config) {
    this.container = container;
    this.slides = container.querySelector('.slides');
    this.slidesArray = Array.from(this.slides.children);
    this.currentSlide = 0;
    this.isPlaying = true;
    this.intervalTime = config.intervalTime || 3000;
    this.interval = null;

    this.init();
}

SliderPrototype.prototype.init = function() {
    this.setupControls();
    this.setupIndicators();
    this.updateSlide();
    this.startAutoPlay();
    this.addEventListeners();
};

SliderPrototype.prototype.setupControls = function() {
    // Создание и установка кнопок навигации и паузы/плей
    this.prevButton = document.createElement('button');
    this.prevButton.textContent = 'Prev';
    this.prevButton.className = 'prev';
    this.container.appendChild(this.prevButton);

    this.nextButton = document.createElement('button');
    this.nextButton.textContent = 'Next';
    this.nextButton.className = 'next';
    this.container.appendChild(this.nextButton);

    this.pausePlayButton = document.createElement('button');
    this.pausePlayButton.textContent = 'Pause';
    this.pausePlayButton.className = 'pause-play';
    this.container.appendChild(this.pausePlayButton);
};

SliderPrototype.prototype.setupIndicators = function() {
    // Создание индикаторов
    this.indicatorsContainer = document.createElement('div');
    this.indicatorsContainer.className = 'indicators';
    this.container.appendChild(this.indicatorsContainer);

    this.slidesArray.forEach((_, index) => {
        const button = document.createElement('button');
        button.addEventListener('click', () => this.goToSlide(index));
        this.indicatorsContainer.appendChild(button);
    });

    this.updateIndicators();
};

// Добавьте остальные методы аналогично вашему существующему коду

SliderPrototype.prototype.addEventListeners = function() {
    // Слушатели событий
    this.prevButton.addEventListener('click', () => this.prevSlide());
    this.nextButton.addEventListener('click', () => this.nextSlide());
    this.pausePlayButton.addEventListener('click', () => this.togglePlayPause());

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    this.slides.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    this.slides.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX > touchEndX + 50) this.nextSlide();
        if (touchStartX < touchEndX - 50) this.prevSlide();
    });

    let mouseStartX = 0;
    let mouseEndX = 0;

    this.slides.addEventListener('mousedown', e => mouseStartX = e.clientX);
    this.slides.addEventListener('mouseup', e => {
        mouseEndX = e.clientX;
        if (mouseStartX > mouseEndX + 50) this.nextSlide();
        if (mouseStartX < mouseEndX - 50) this.prevSlide();
    });
};

SliderPrototype.prototype.startAutoPlay = function() {
    this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
};

SliderPrototype.prototype.stopAutoPlay = function() {
    clearInterval(this.interval);
};

SliderPrototype.prototype.togglePlayPause = function() {
    if (this.isPlaying) {
        this.stopAutoPlay();
        this.pausePlayButton.textContent = 'Play';
    } else {
        this.startAutoPlay();
        this.pausePlayButton.textContent = 'Pause';
    }
    this.isPlaying = !this.isPlaying;
};

SliderPrototype.prototype.updateSlide = function() {
    const offset = -this.currentSlide * 100;
    this.slides.style.transform = `translateX(${offset}%)`;
    this.updateIndicators();
};

SliderPrototype.prototype.updateIndicators = function() {
    this.indicatorsContainer.querySelectorAll('button').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentSlide);
    });
};

SliderPrototype.prototype.goToSlide = function(index) {
    this.currentSlide = (index + this.slidesArray.length) % this.slidesArray.length;
    this.updateSlide();
};

SliderPrototype.prototype.prevSlide = function() {
    this.goToSlide(this.currentSlide - 1);
};

SliderPrototype.prototype.nextSlide = function() {
    this.goToSlide(this.currentSlide + 1);
};

// Инициализация слайдера с использованием прототипов
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider');
    const config = {
        intervalTime: 3000
    };
    new SliderPrototype(sliderContainer, config);
});
