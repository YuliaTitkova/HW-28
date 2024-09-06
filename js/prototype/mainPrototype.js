// Инициализация слайдера и конфигурации
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider');
    const config = {
        intervalTime: 3000 // Пример конфигурации
    };
    new SliderPrototype(sliderContainer, config);
});
