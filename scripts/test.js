$(document).ready(function(){
    let slideIndex = 1
    const size = $(".image-wrapper img").length
    const createImage = (url) => `<img src="${url}" alt="" class="image"/>`;
    const listImages = []
    for(let i=0; i<size; i++ ) {
        listImages.push($(".image-wrapper img").eq(i).attr('src'))
    };
    const firstImage = createImage($(".image-wrapper img").eq(size-1).attr('src'))
    const lastImages = createImage($(".image-wrapper img").eq(0).attr('src'))
    const images = listImages.map((image)=>createImage(image)).join('')
    $(".image-wrapper img").css('display','none')
    $(".image-wrapper").html(`${firstImage} ${images} ${lastImages}`)
    for(let i=0; i<size; i++ ) {
        $(".selection-wrapper").append(`<li class="select-item"><button class="btn select-btn ${i === 0 ? 'active' : ''}"></button></li>`);
    };
    const transition = (time) => `all ${time}s linear`
    $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);
    console.log(size);
    $('.next-btn').click ( () => {
        if (slideIndex !== size + 1) {
            slideIndex++;
            $('.image-wrapper').css('transition', transition(0.4));
            $('.image-wrapper').css('transform', `translateX(${-(slideIndex * 770)}px)`);

            if (slideIndex === size + 1) {
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
                slideIndex = size;
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
        if (slideIndex === 1 || slideIndex === size + 1) {
            $('.select-btn').eq(0).addClass('active');
            return;
        }
        $('.select-btn').eq(slideIndex - 1).addClass('active');
    };
})