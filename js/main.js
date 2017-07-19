  // Use your own token (this is just an example)
  var token = 'BQAsGg1C5fHOp1Ka7y1I84-RhiNNtG_e0V3tlspys7vPM7ikyKjwTidq-zITuHHA3v-Fx6XYxlRJ4q5xVAkgBbtyUzyfdlOcr-oASFlIwiR6dW83sbCXLHuiurzuGThhOurLJx272Vw'

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

      htmlSelect = aOptionsArtist.join('')
      $('#listArtist').html(htmlSelect)
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
        console.log(oData)
        var aOptionsAlbums = oData.items.map(function (artist) {
          console.log(artist.id)
          var albumId = artist.id
          var albumUrl = artist.url
          var albumImg = artist.images[1].url

          // $.ajax({
          //   url: 'https://api.spotify.com/v1/albums/' + albumId + '/tracks',
          //   headers: {
          //     Authorization: 'Bearer ' + token
          //   }
          // })

          // .then(function (oData) {
          //   console.log(oData)
          //   var songs = oData.items.map(function (song) {
          //     console.log(song.name)
          //     song += '<li>' + song.name + '</li>'
          //   })
          // })

          return '<div class="col-md-4"><div class="thumbnail"><img id="' + albumId + '" class="img-responsive" src="' + albumImg + '"><div class="caption"><h6>"' + artist.name + '"</h6></div></div></div>'
        })

        var htmlSelect = aOptionsAlbums
        $('#artistThumbnail').html(htmlSelect)
      })
    })

    $('#artistThumbnail').on('click', 'img', function (song) {
      e.preventDefault()
      var albumId = $(this).attr('id')
      console.log(albumId)
      $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId + '/tracks',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

          .then(function (oData) {
            console.log(oData)
            var aOptionsSongs = oData.items.map(function (song) {
              console.log(song.name)
              var songPreview = song.preview_url
              return '<div><li><a target="_blank" href="' + songPreview + '">' + song.name + '</a></li></div>'
            })

            htmlSelect = aOptionsSongs.join('')
            $('#songList').html(htmlSelect)
          })
    })
  })
