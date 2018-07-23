$(function () {

    var topics = ['Hans Gruber',
        'Edna Mode',
        'Thulsa Doom',
        'Liz Lemon',
        'Gimli',
        'Imperator Furiosa',
        'Inigo Montoya',
        'Sansa Stark',
        'Ferris Bueller',
        'Buffy Summers',
        'Indiana Jones',
        'Daenerys Targaryen',
    ];

    $('.info').empty();

    //function to loop the topics array and create a button for each one
    function createButtons() {

        $('.buttons').empty(); 
        // makes sure the container for the topic buttons is clear prior to creating buttons, also a style choice to showcase the animated css
        // each time the user adds a topics

        for (i = 0; i < topics.length; i++) {
            var btn = $('<button>')
                if(i%2 == 0) { // the full list of classes are listed for both because Bootstraps seems to want them in specific order
                    btn.attr('class', 'btn btn-primary btn-lg btn-block text-white border-black animated rotateIn'); // if the number is odd
                }
                else {
                    btn.attr('class', "btn btn-danger btn-lg btn-block text-white border-black animated bounceInDown"); // if the number is even
                }
                btn.attr('data-name', topics[i]).text(topics[i]);
            $('.buttons').append(btn) 
        }
    }

    function displayImg() {
        // apikey = RRW5LlwvGSa5l0XfxF8gGMnBL4Xcb2ej
        var all = $(this).attr('data-name') 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + all + "&limit=10&api_key=RRW5LlwvGSa5l0XfxF8gGMnBL4Xcb2ej";
        $('.info').empty() //empty the div / remove any gifs that might be there
        $.ajax({
            url: queryURL,
            Method: "GET"
        }).then(function (response) {
            console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {

                var rating = response.data[i].rating 
                var title = response.data[i].title  

                var $div = $('<div class="gifs">')
                var $image = $('<img>').addClass('images') 
                var $p = $('<p class="rating">Rating: ' + rating + '</p>')
                var $t = $('<p class="title">Title: ' + title + '</p>')

                $div.addClass('gifs animated jackInTheBox') 
                $div.append($image, $p, $t)
                $image.attr('src', response.data[i].images.fixed_height_still.url) 
                    .attr('data-still', response.data[i].images.fixed_height_still.url)
                    .attr('data-animate', response.data[i].images.fixed_height.url)
                $('.info').append($div) 
            }
        })
    }
    //switch between still and animated
    function stillAnimate() {
        var src = $(this).attr('src')
        switch (src) {
            case $(this).attr('data-still'): 
                $(this).attr('src', $(this).attr('data-animate'))
                break;
            case $(this).attr('data-animate'):
                $(this).attr('src', $(this).attr('data-still'))
                break;
            default:
                break;
        }
    }

    //click event for form submission
    $('.submit').on('click', function () {
        var input = $('.user-input').val().trim()
        form.reset()
        topics.push(input);
        createButtons();

        return false
    })

    createButtons();
    $(document).on('click', '.btn', displayImg)
    $(document).on('click', '.images', stillAnimate)
});