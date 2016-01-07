// Currently only works with www.dr.dk/radio/live/
var blocked_artists = ['Justin Bieber'];
var blocked_tracks = [];
var change_stations = ['p7mix', 'p6beat', 'p3'];
setInterval(checkNumber, 3000);

function checkNumber(){
    var artist = jQuery('.playlist-items .track.now-playing .name[itemprop="byArtist"]').text();
    var track = jQuery('.playlist-items .track.now-playing .track').find('a').text();
    var current_station = jQuery('select[name="channels"]').val();
    if(jQuery.inArray(artist, blocked_artists) !== -1 || jQuery.inArray(track, blocked_tracks) !== -1){
        stations_left = jQuery.grep(change_stations, function(value) {
            return value != current_station;
        });
        var random_station = stations_left[~~(Math.random() * stations_left.length)];
        if(random_station){
            location.replace('http://www.dr.dk/radio/live/'+random_station);
        }
    }
}
