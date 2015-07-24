##Simple Vimeo Video player API

           	    \|||/
	            (o o)
	+~~~~~ooO~~~~(_)~~~~~~~~+
	|                     	|
	|    Vimeoplayer API 	|
	|   					|
	+~~~~~~~~~~~~~~~~~Ooo~~~+
	           |__|__|
	            || ||
	           ooO Ooo


## Features
	Adding videos on demand
	Event Callbacks to track (Play , Pause , Finish)
	Manual event triggers (Play , Pause , Unload)

## Player Initialisaiton

```js
var video = TWM.Videoplayer('#player_1' , {
                            playerID : 'video_player_1',
                            video :'76979871' ,
                            background : '#000',
                            playerWidth : 640 ,
                            playerHeight : 350,
                            autoPlay :false
                        });
```

