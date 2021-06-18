$(document).ready(function() {
    const list = $('.music-list');
    var listblock;

    for (const key in songlist) {
        listblock = $('<div class="list-block"></div>');
        list.append(listblock);

        listblock.append('<span class="play"><i class="fas fa-play play-btn"></i><i class="fas fa-pause pause-btn"></i></span>');
        listblock.append(`<span class="song-beat"><ul><li></li><li></li><li></li><li></li><li></li></ul></span>`);
        listblock.append(`<span class="song-title">${songlist[key].title}</span>`);
        listblock.append(`<span class="song-duration">${songlist[key].duration}</span>`);
        listblock.append(`<span class="song-artist">${songlist[key].artist}</span>`);
        listblock.append(`<span class="song-genre">${songlist[key].genre}</span>`);
        listblock.append(`<span class="song-link"><a href="${songlist[key].link}"><i class="fab fa-spotify"></i></a></span>`);
        listblock.append(`<span class="song-track"><audio id="audio" controls><source src="./songs/${songlist[key].track}" type="audio/mp3"</audio></span>`);
    }

    $('.list-block .play .play-btn').on('click', function(current) {
        $(this).parent().find('.play-btn').css('display', 'none');
        $(this).parent().find('.pause-btn').css('display', 'inline-block');
        $('.play-btn').not(this).parent().find('.pause-btn').css('display', 'none');
        $('.play-btn').not(this).parent().find('.play-btn').css('display', 'inline-block');

        $(this).parent().parent().addClass('isPlaying');
        $('.play-btn').not(this).parent().parent().removeClass('isPlaying');

        $(this).parent().parent().find('.song-beat li').css('animation-play-state', 'running').css('opacity', '1');
        $('.play-btn').not(this).parent().parent().find('.song-beat li').css('animation-play-state', 'paused').css('opacity', '0');

        $('audio').each(function(e) {
            if (e !== current.currentTarget) {
                $(this)[0].pause();
            }
        });
        $(this).parent().parent().find('.song-track audio')[0].play();
    });

    $('.list-block .play .pause-btn').on('click', function(current) {
        $(this).parent().find('.pause-btn').css('display', 'none');
        $(this).parent().find('.play-btn').css('display', 'inline-block');

        $(this).parent().parent().find('.song-beat li').css('animation-play-state', 'paused');

        $(this).parent().parent().find('.song-track audio')[0].pause();
    });

    $('.autoplay-btn input').on('change', function() {
        if ($(this).is(':checked')) {
            $('audio').on('ended', function() {
                $(this).parent().parent().next().find('audio')[0].play();

                $('.list-block').removeClass('isPlaying');
                $(this).parent().parent().next().addClass('isPlaying');

                $(this).parent().parent().next().find('.song-beat li').css('animation-play-state', 'running').css('opacity', '1');

                $(this).parent().parent().next().find('.play-btn').css('display', 'none');
                $(this).parent().parent().next().find('.pause-btn').css('display', 'inline-block');
            });
        } else {
            $('audio').on('ended', function() { 
                $('.song-beat li').css('animation-play-state', 'paused').css('opacity', '0');

                $('.pause-btn').css('display', 'none');
                $('.play-btn').css('display', 'inline-block');

                $('.list-block').removeClass('isPlaying');
            });
        }
    }).change();
});