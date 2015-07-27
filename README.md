##Vimeo Video player API

           	      \|||/
	              (o o)
	+~~~~~~~ooO~~~~(_)~~~~~~~~~~~~~~+
	|	Vimeoplayer API				|
	|	  Adding videos on demand	|
	|	  Track Event callbacks		|
	|	  Manual event triggers		|
	+~~~~~~~~~~~~~~~~~~~~~~~~Ooo~~~~+
	           	 |__|__|
	              || ||
	           	 ooO Ooo


## Features
	Adding videos on demand - no dependency to load video's in iframe on pageload
	Event Callbacks to track - Play , Pause , Finish
	Manual event triggers  - Play , Pause , Unload

![vimeoplayer-custom-API](https://github.com/maheshtalada/vimeoplayer-custom-API/blob/master/example/images/sample1.png)

![vimeoplayer-custom-API](https://github.com/maheshtalada/vimeoplayer-custom-API/blob/master/example/images/jumbosample.png)

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
     }).ON('finish' , function() {
     	console.log('finished');
     });
```
