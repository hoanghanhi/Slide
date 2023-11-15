$(document).ready(function () {
    const createImage = (url) => `<img src="${url}" alt="" class="image"/>`;
    const imageURLs = [
        './assets/slide-1.jpg',
        './assets/slide-2.jpg',
        './assets/slide-3.jpg',
        './assets/slide-3.jpg',
    ];
    let slideIndex = 1;
    const transition = (time) => `all ${time}s linear`
    const firstImage = createImage(imageURLs[0]);
    const lastImage = createImage(imageURLs[imageURLs.length - 1]);
    const images = imageURLs.map((image) => createImage(image)).join('');
    $('.image-wrapper').html(`${lastImage} ${images} ${firstImage}`);
    const dots = imageURLs
        .map(
            (_, index) =>
            `<li class="select-item"><button class="btn select-btn ${
              index === slideIndex - 1 ? 'active' : ''
            }"></button></li>`
        )
        .join('');
    $('.selection-wrapper').html(dots);
    $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);

    $('.next-btn').click ( () => {
        if (slideIndex !== imageURLs.length + 1) {
            slideIndex++;
            $('.image-wrapper').css('transition', transition(0.4));
            $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);

            if (slideIndex === imageURLs.length + 1) {
                slideIndex = 1;
                setTimeout(() => {
                    $('.image-wrapper').css('transition', transition(0));
                    $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);
                }, 410);
            }
        }
        renderDot();
    });

    $('.prev-btn').click ( () => {
        if (slideIndex !== 0) {
            slideIndex--;
            $('.image-wrapper').css('transition', transition(0.4));
            $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);

            if (slideIndex === 0) {
                slideIndex = imageURLs.length;
                setTimeout(() => {
                    $('.image-wrapper').css('transition', transition(0));
                    $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);
                }, 410);
            }
        }

        renderDot();
    });

    const renderDot = () => {
        $('.select-btn.active').removeClass('active');
        if (slideIndex === 1 || slideIndex === imageURLs.length + 1) {
            $('.select-btn').eq(0).addClass('active');
            return;
        }
        $('.select-btn').eq(slideIndex - 1).addClass('active');
    };
})