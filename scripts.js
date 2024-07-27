document.addEventListener("DOMContentLoaded", function () {
    let slider = document.querySelector('.slider');
    let images = slider.querySelectorAll('img');
    let current = 0;

    function slideShow() {
        images[current].style.display = 'none';
        current = (current + 1) % images.length;
        images[current].style.display = 'block';
    }

    setInterval(slideShow, 3000);
});
