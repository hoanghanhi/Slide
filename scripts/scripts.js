$(document).ready(function(){
    let activeIndex = 0,
        imgW = 770;
    const size = $(".image-wrapper img").length
    {
        let dotStr = ""
        for(let i=0; i<size; i++ ) 
            dotStr += `<li class="select-item"><button class="btn select-btn ${i === 0 ? 'active' : ''}"></button></li>`
        $(".selection-wrapper").html(dotStr);
    }
    const changeSlide = (index, direc) => {
        $(".image-wrapper img[class!=active]").hide();
        $(".image-wrapper").css('left', 0)
        let leftPos = 0;
        if (direc) {
            leftPos = -1 * imgW;
            if(index > activeIndex) {
                for(let j=activeIndex+1; j<=index; j++)
                    $(".image-wrapper").append($(".image-wrapper img[alt=img"+j+"]").show())
                leftPos = (activeIndex-index) * imgW;
            } else $(".image-wrapper").append($(".image-wrapper img[alt=img"+index+"]").show())
        } else {
            let noSteps = 1;
            if(index < activeIndex) {
                for(let j=activeIndex-1; j>=index; j--)
                    $(".image-wrapper").prepend($(".image-wrapper img[alt=img"+j+"]").show())
                noSteps = activeIndex - index;
            } else $(".image-wrapper").prepend($(".image-wrapper img[alt=img"+index+"]").show())
            
            $(".image-wrapper").css('left', `${-(noSteps * imgW)}px`)
        }
        $('.image-wrapper').animate({left: leftPos},1000);
        
        $(".selection-wrapper li:eq("+activeIndex+") button").removeClass('active');
        $(".selection-wrapper li:eq("+index+") button").addClass('active');

        $(".image-wrapper img[alt=img"+activeIndex+"]").removeClass('active');
        $(".image-wrapper img[alt=img"+index+"]").addClass('active');

        activeIndex = index;
    };

    $('.select-item').click ( function () {
        let newIndex = $('.selection-wrapper .select-item').index(this);
        let direc = (newIndex > activeIndex);
        changeSlide(newIndex, direc);
    });
    
    $(".prev-btn").click( () => {
        const indexChange = activeIndex - 1 < 0 ? size - 1 : activeIndex - 1;
        changeSlide(indexChange, false);
    });

    $(".next-btn").click( () => {
        const indexChange = activeIndex + 1 > size - 1 ? 0 : activeIndex + 1;
        changeSlide(indexChange, true);
    });
})