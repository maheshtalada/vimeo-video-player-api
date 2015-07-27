##Vimeo Video player API

           	      \|||/
	              (o o)
	+~~~~~~~ooO~~~~(_)~~~~~~~~~~~~~~+
	|	  Adding videos on demand	|
	|	  Track Event callbacks		|
	|	  Manual event triggers		|
	+~~~~~~~~~~~~~~~~~~~~~~~~Ooo~~~~+
	           	 |__|__|
	              || ||
	           	 ooO Ooo

## Features
	Adding videos on demand - no dependency to load video's in iframe on pageload
	Track Event Callbacks - Play , Pause , Finish
	Manual event triggers  - Play , Pause , Unload

![vimeo-video-player-api](https://github.com/maheshtalada/vimeoplayer-custom-API/blob/master/example/images/sample1.png)

![vimeo-video-player-api](https://github.com/maheshtalada/vimeoplayer-custom-API/blob/master/example/images/jumbosample.png)

## Player Initialisaiton

```html
<div id="player_1" data-video="76979871" data-type="video" data-autoplay="true"></div>
```

```js
var video = TWM.Videoplayer('#player_1' , {
                            video :'76979871' ,
                            playerWidth : 640 ,
                            playerHeight : 350,
                            autoPlay :true
                        });
//for later use
$('#player_1').data('videoObj' , video);

Example URL : https://player.vimeo.com/video/76979871?api=1&amp;player_id=player_1
```

## Trigger events manually
```js
video.trigger('play');
video.trigger('pause');
video.trigger('unload');
```

## Event callbacks
```js
video.ON('play' , function() {
	console.log('playing');
});
video.ON('pause' , function() {
	console.log('paused');
});
video.ON('playProgress' , function(data, id) {
  	console.log('percentdone:'+data.percent*100 , 'time:'+data.seconds)
});
video.ON('finish' , function() {
	console.log('finished');
});

```

## Event callbacks chain
```js
video.ON('play' , function() {
     	console.log('playing');
     }).ON('pause' , function() {
     	console.log('paused');
     }).ON('playProgress' , function(data, id) {
     	console.log('percentdone:'+data.percent*100 , 'time:'+data.seconds)
     }).ON('finish' , function() {
     	console.log('finished');
     });
```
