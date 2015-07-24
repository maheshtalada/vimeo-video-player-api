/* ================================================================================================
 * TWM Videoplayer API : videoplayer.js v1.0
 * Using Vimeo player
 * Dependencies - froogaloop.js API to access Vimeo player events using Postmessage API
 * Note : Changes made to the Original Froogaloop API , so link API from project folder
 * Change 1 : Sent Videoplayer scope to the Froogaloop when ever event attaches
 * Change 2 : Acessing the Videoplayer scope in callback when ever recieves message from main target
 * ================================================================================================== */
;(function( TWM , $ ){
    'use strict';

    TWM.Videoplayer = (function(){

        // sample player URL - https://player.vimeo.com/video/7100569?api=1&amp;player_id=single_player_1
        // default options for video player , add  more if needed
        var defaults = {
            playerWidth: '100%',
            playerHeight: '100%',
            pauseOthersOnPlay: true, //this happens by default from vimeo side
            autoplay: false,
            playerURL : 'https://player.vimeo.com/video/{{VID}}?api=1&amp;player_id={{PID}}',
            playerID : 'vimeo-video-player',
            isReady : false,

        };

        function Videoplayer ( ele , options ) {
            //enforce create object for the same instance
            if ( !(this instanceof Videoplayer) ) {
                return new Videoplayer(ele , options);
            }
            this.$element = $(ele);
            this.options = $.extend({} , defaults , options , this.$element.data());
            this.init();
        }


        Videoplayer.prototype.init = function(ele , options) {
            var self = this;
            self.$f=null;
            // load preloader untill video loads
            this.$element.append('<div class="vid-load" id=loader_'+this.options.playerID+'>Loading video...</div>');

            // lets create an iframe & add src
            $('<iframe />', {
                id: this.options.playerID,
                src: this._buildSrc(),
                width:this.options.playerWidth,
                height:this.options.playerHeight,
                frameborder:0,
            }).css('visibility','hidden').appendTo(this.$element).on('load' , function() {
                // create Froogaloop for current object
                self.$f = $f(self.options.playerID);
                //check if player is ready after adding the src
                // if ready goto callback
                    self.$f.addEvent('ready', self._ready ,  self);
            });

            return this;
        };

        /*
         * ready callback , triggers when ever player is ready
         */
        Videoplayer.prototype._ready = function() {
            console.log("Player : " , this.options.playerID , " is ready");
            this.options.isReady = true;
            this.$element.find('#loader_'+this.options.playerID).hide();
            $('#'+this.options.playerID).css({
                'visibility' : 'visible'
            });
            if(this.options.autoplay) {
                this.trigger('play');
            }
        };

        /*
         * handle callbacks
         */
        Videoplayer.prototype._callBack = function( fn , action ) {
            if(typeof fn === 'function'){
                fn.call(this);
            }else{
                throw("Argument expected to be function , sent is:" + typeof fn);
            }
        };

        /*
         * method to trigger event callbacks
         * @param {  String  } eventName
         * @param { function } callBack
         * @param { String } froogAPI
         */
        Videoplayer.prototype._events = function(eventName , callBack , froogAPI) {
            var self =this;
            if(this.options.isReady){
                this.$f[froogAPI]( eventName , callBack , this );
            }else {
                // this just incase if player is not yet ready , but still change the way i'm doin
                //do recursive with setTimeout , don't use arguments.callee
                //deprecated in strict mode
                setTimeout(function(){
                    self._events(eventName , callBack , froogAPI);
                },1000);
            }
        };

        /*
         * method to trigger event callbacks
         * @param {  String  } eventName
         * @param { function } callBack
         * @return { Object  } this
         */
        Videoplayer.prototype.ON = function(eventName , callBack) {
            this._events(eventName , callBack , 'addEvent' );
            return this;
        };

        /*
         * build src for iframe source  & return back
         * @return { string }
         */
        Videoplayer.prototype._buildSrc = function() {
            return this.options.playerURL.replace('{{VID}}' , this.options.video)
                                         .replace('{{PID}}',this.options.playerID);
        };

        /*
         * Custome event trigger - triggers play , pause , unload
         * @param { string } eventName
         * @return { Object } this
         */
        Videoplayer.prototype.trigger = function(eventName) {
            this._events(eventName ,'','api' );
            return this;
        };

        return Videoplayer;

    })();

})( window.TWM = window.TWM || {} , jQuery );

