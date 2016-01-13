// Not That Tune Again v.1.2 - Ohai! - Michal Was here!
var blocked_artists = ['Justin Beiber'];
var blocked_tracks = [];
var change_stations = ['p3', 'p7mix', 'p6beat'];

var NotThatTuneAgain_cookie = getCookie('NotThatTuneAgain');
if (NotThatTuneAgain_cookie) {
    NotThatTuneAgain_cookie = NotThatTuneAgain_cookie.split('|');

    if (NotThatTuneAgain_cookie[0]) {
        blocked_artists = JSON.parse(NotThatTuneAgain_cookie[0]);
    }
    if (NotThatTuneAgain_cookie[1]) {
        blocked_tracks = JSON.parse(NotThatTuneAgain_cookie[1]);
    }
    if (NotThatTuneAgain_cookie[2]) {
        change_stations = JSON.parse(NotThatTuneAgain_cookie[2]);
    }
}

makeui();
setInterval(checkNumber, 3000);

function checkNumber() {
    var artist = jQuery('.playlist-items .track.now-playing .name[itemprop="byArtist"]').text();
    var track = jQuery('.playlist-items .track.now-playing .track').find('a').text();
    var current_station = jQuery('select[name="channels"]').val();
    if (jQuery.inArray(artist, blocked_artists) !== -1 || jQuery.inArray(track, blocked_tracks) !== -1) {
        stations_left = jQuery.grep(change_stations, function (value) {
            return value != current_station;
        });
        var random_station = stations_left[~~(Math.random() * stations_left.length)];
        if (random_station) {
            location.replace('http://www.dr.dk/radio/live/' + random_station);
        }
    }
}

function makeui() {
    // Make our stylesheet and attach it to the page!
    var sheet = document.createElement('style');
    sheet.innerHTML = "#notthattuneagain-ui {z-index: 9999; width: 200px; height: 250px; position: fixed; top: 150px; border-radius: 5px; border: 1px solid black; transition: left 0.5s; color: rgb(255, 255, 255); left: -200px; background-color: rgb(166, 161, 161);overflow-y: auto;}";
    sheet.innerHTML += "#buttons {margin-top: 15px; margin-left: 30px}";
    sheet.innerHTML += "#button .btn, #buttons .btn {background: #f51111; background-image: -webkit-linear-gradient(top, #f51111, #b82c2c); background-image: -moz-linear-gradient(top, #f51111, #b82c2c); background-image: -ms-linear-gradient(top, #f51111, #b82c2c); background-image: -o-linear-gradient(top, #f51111, #b82c2c); background-image: linear-gradient(to bottom, #f51111, #b82c2c); -webkit-border-radius: 20; -moz-border-radius: 20; border-radius: 20px; font-family: Arial; color: #ffffff; font-size: 12px; padding: 6px 10px 6px 10px; text-decoration: none;}";
    sheet.innerHTML += "#button .btn, #buttons .btn:hover {background: #e84c4c; background-image: -webkit-linear-gradient(top, #e84c4c, #e36262); background-image: -moz-linear-gradient(top, #e84c4c, #e36262); background-image: -ms-linear-gradient(top, #e84c4c, #e36262); background-image: -o-linear-gradient(top, #e84c4c, #e36262); background-image: linear-gradient(to bottom, #e84c4c, #e36262); text-decoration: none;}";
    sheet.innerHTML += "#no-lists {margin-left: 30px;margin-top: 10px;font-size: 13px;font-family: sans-serif;}";
    sheet.innerHTML += "#no-artists > span, #no-tracks > span, #allowed-stations > span {font-weight: 800;}";
    sheet.innerHTML += "#no-tracks, #allowed-stations {margin-top: 10px;}";
    sheet.innerHTML += "#no-lists {margin-top: 15px;margin-bottom: 15px;}";
    sheet.innerHTML += "#no-lists ul li {cursor: pointer;}";
    sheet.innerHTML += "#no-lists ul li:hover {text-decoration: line-through;}";
    sheet.innerHTML += "#button {position: absolute; right: 125px; width: 85px; top: 5px;}";
    document.body.appendChild(sheet);

    jQuery('#channel-selector').prepend('<div id="button"><a href="#" id="add-station" class="btn">+ station</a></div>');
    jQuery('body').append('<div id="notthattuneagain-ui"><div id="buttons"><a href="#" id="add-artist" class="btn">+ Artist</a>&nbsp;<a href="#" id="add-track" class="btn">+ Track</a></div><div id="no-lists"><div id="no-artists"><span>Blocked Artists</span><ul></ul></div><div id="no-tracks"><span>Blocked Tracks</span><ul></ul></div><div id="allowed-stations"><span>Allowed stations</span><ul></ul></div></div></div>');
    jQuery('#notthattuneagain-ui').unbind().hover(function () {
        jQuery(this).css('left', '-5px');
    }, function () {
        jQuery(this).css('left', '-200px');
    });
    jQuery('#add-artist').unbind().on('click', function () {
        var artist = jQuery('.playlist-items .track.now-playing .name[itemprop="byArtist"]').text();
        if (jQuery.inArray(artist, blocked_artists) !== -1) {
            alert(artist + ' is already blocked!');
        } else {
            blocked_artists.push(artist);
            updateui();
        }
    });
    jQuery('#add-track').unbind().on('click', function () {
        var track = jQuery('.playlist-items .track.now-playing .track').find('a').text();
        if (jQuery.inArray(track, blocked_tracks) !== -1) {
            alert(track + ' is already blocked!');
        } else {
            blocked_tracks.push(track);
            updateui();
        }
    });

    jQuery('#add-station').unbind().on('click', function () {
        var station = jQuery('select[name="channels"]').val();
        if (jQuery.inArray(station, change_stations) !== -1) {
            alert(station + ' is already added!');
        } else {
            change_stations.push(station);
            updateui();
        }
    });

    jQuery(document).on('click', '#no-artists > ul > li', function () {
        if (confirm('Remove "' + jQuery(this).text() + '" ?')) {
            var found = jQuery.inArray(jQuery(this).text(), blocked_artists);
            if (found !== -1) {
                blocked_artists.splice(found, 1);
                updateui();
            }
        }
    });

    jQuery(document).on('click', '#no-tracks > ul > li', function () {
        if (confirm('Remove "' + jQuery(this).text() + '" ?')) {
            var found = jQuery.inArray(jQuery(this).text(), blocked_tracks);
            if (found !== -1) {
                blocked_tracks.splice(found, 1);
                updateui();
            }
        }
    });

    jQuery(document).on('click', '#allowed-stations > ul > li', function () {
        if (confirm('Remove "' + jQuery(this).text() + '" ?')) {
            var found = jQuery.inArray(jQuery(this).text(), change_stations);
            if (found !== -1) {
                change_stations.splice(found, 1);
                updateui();
            }
        }
    });
    updateui();
}

function updateui() {
    blocked_artists.sort();
    blocked_tracks.sort();
    change_stations.sort();

    var combined = JSON.stringify(blocked_artists) + '|' + JSON.stringify(blocked_tracks) + '|' + JSON.stringify(change_stations);

    setCookie('NotThatTuneAgain', combined);

    var no_artists = jQuery('#no-artists > ul');
    var artist_list = '';
    jQuery.each(blocked_artists, function (index, value) {
        artist_list += '<li>' + value + '</li>';
    });
    no_artists.html(artist_list);

    var no_tracks = jQuery('#no-tracks > ul');
    var tracks_list = '';
    jQuery.each(blocked_tracks, function (index, value) {
        tracks_list += '<li>' + value + '</li>';
    });
    no_tracks.html(tracks_list);

    var allowed_stations = jQuery('#allowed-stations > ul');
    var stations_list = '';
    jQuery.each(change_stations, function (index, value) {
        stations_list += '<li>' + value + '</li>';
    });
    allowed_stations.html(stations_list);
}

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (60 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function delCookie(key) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
