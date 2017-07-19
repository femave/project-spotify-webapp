  // Use your own token (this is just an example)
  var token = 'BQDZ1njih0LAUoeVZNH1_FAlkyUF8vCTay2EOdleJqUWrb9mvT0LuiI6hsrqv1F-_ktQPxQBaiRONzIcSHHDwn0bBEVfGIyg5cdEPSWrBUizUOiNVGtIdUNc34TLBoayzBz-x34MSvE'

  $('button').on('click', function (e) {
    e.preventDefault()
    var artist = $('input').val()

    $.ajax({
      url: 'https://api.spotify.com/v1/search?type=artist&query=' + artist,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

          .then(function (oData) {
            var aOptionsArtist = oData.artists.items.map(function (artist) {
                  // console.log(artist.name)
              return '<option value="' + artist.id + '">' + artist.name + '</option>'
            })

            $('#listArtist').removeClass('hidden')
            htmlSelect = aOptionsArtist.join('')
            $('#listArtist').html('<option disabled selected>Select an artist</option>' + htmlSelect)
          })

    $('select').on('change', function (artists) {
      var inputSelect = $(this).val()
          // console.log(inputSelect)

      $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + inputSelect + '/albums',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

              .then(function (oData) {
                // console.log(oData)
                var aOptionsAlbums = oData.items.map(function (artist) {
                  // console.log(artist.id)
                  var albumId = artist.id
                  var albumUrl = artist.url
                  var albumImg = artist.images[1].url

                  return '<div class="col-md-3"><div class="thumbnail"><img value="' + artist.name + '" id="' + albumId + '" class="img-responsive" src="' + albumImg + '"><div class="caption"><h6>"' + artist.name + '"</h6></div></div></div>'
                })

                var htmlSelect = aOptionsAlbums
                $('#artistThumbnail').html(htmlSelect)
              })
    })

    $('#artistThumbnail').on('click', 'img', function (song) {
      e.preventDefault()
      var albumId = $(this).attr('id')
      var songListTitle = $(this).attr('value')
      console.log(songListTitle)
      // console.log(albumId)
      $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId + '/tracks',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

              .then(function (oData) {
                // console.log(oData)
                var aOptionsSongs = oData.items.map(function (song) {
                  // console.log(song.name)
                  var songPreview = song.preview_url
                  return '<div><li><a value="' + song.name + '" id="' + songPreview + '">' + song.name + '</a></li></div>'
                })

                $('#songList').removeClass('hidden')
                htmlSelect = aOptionsSongs.join('')
                $('#songList').html('<h4>' + songListTitle + '</h4>' + htmlSelect + '<div class="embed" id="embed"></div>')
              })
    })

    $('#songList').on('click', 'a', function (play) {
      e.preventDefault()
      debugger
      var songEmbed = $(this).attr('id')
      var songName = $(this).attr('value')
      console.log(songName)
      $('#embed').html('<p>' + songName + '</p><embed height="50px" width="100px" src="' + songEmbed + '" />')
    })
  })
