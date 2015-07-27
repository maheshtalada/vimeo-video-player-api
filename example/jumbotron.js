;(function(TWM , $){
    'use strict';

    TWM.Jumbotron = (function() {

        function Jumbotron( ele , options) {
            //enforce create object , if new operator not used when creating instance
            if ( !(this instanceof Jumbotron) ) {
                return new Jumbotron(ele , options);
            }
            // cache the container into jQuery var
            this.$element = $(ele);
            this.init();
        }

        Jumbotron.prototype.init = function() {
            this.currentId= 0;
            this.$mainContainer = this.$element.find('.jumbotron-main');
            // collect right rail items
            this.$itemsWrapper = this.$element.find('.jumbotron-right-rail ul');

            // check if the items in rightrail are more than 1
            // if not donot show RR & expand main container to full
            if(this.$itemsWrapper.find('li').length > 1) {
                this.$element.find('.jumbotron-right-rail').show();
            }else{
                this.$element.find('.jumbotron-right-rail').hide();
                this.$mainContainer.css( {
                    'width' : '100%',
                    'padding-right' : 0
                }); 
            }
            //reset all the data state..
			$("[data-video]").data('video-on',null);
			
            // check if first item is video
            // if yes add video player
            this.checkVideo( this.$itemsWrapper.find('li').eq(0) , this.currentId);
            this.registerEvents();
            return this;
        };

        Jumbotron.prototype.registerEvents =  function() {
            this.$itemsWrapper.on('click','li',$.proxy(this.onItemClick , this));
            return this;
        };

        Jumbotron.prototype.onItemClick =  function(evt) {
            evt.preventDefault();
            var $this = $(evt.currentTarget),
            index = $this.index();

            // early exit if clicked on current Item
            if(this.currentId === index ) {
                return;
            }
            // update class for current item
            this.$itemsWrapper.find('li').removeClass('active');
            $this.addClass('active');
            // pause if any video's are playing currently

            // check if its video or not && video is created are not
            this.checkVideo( $this , index );
            // updated currentID
            this.currentId = index;

            evt.stopPropagation();
        };

        Jumbotron.prototype.checkVideo = function ( $this , index ) {
            var self= this;
            this.$mainContainer.find(".jumbotron-taget-holder").addClass('absoluteHide');
                if(!$this.data('video-on')){
                    var cid = 'jumbotron-player'+index;
                    $('<div>', {
                        id : cid,
                        'class' : 'jumbotron-taget-holder'
                    }).appendTo(this.$mainContainer);
                    // add video player
                    this.addVideo( $this , cid);
                    this.$mainContainer.find('#jumbotron-player'+index).show();
                }else {
                    this.$mainContainer.find('#jumbotron-player'+index).removeClass('absoluteHide');
                    if($this.data('autoplay')) {
                        $this.data('videoObj').trigger('play');
                    }
                }
				//Set the video state..
				$this.data('video-on',"yes");


        }

        Jumbotron.prototype.addVideo =  function( $ele , cid ) {
            var video = null,
                id = '#'+cid;
            video = TWM.Videoplayer( id ,{
                        player_id : 'video-'+cid,
                        video : $ele.data('video'),
                        autoplay : $ele.data('autoplay'),
                        playerHeight :315
                    });
            //TWM.videoObj.push(video);
            var objVid = {
                    linkName : 'name',
                    videoId :  $ele.data('video'),
                    videoName : $ele.data('video')
                  };
                video.ON('play' , function() {
                    // write anything for tracking event
                    console.log('play');
                }).ON('pause' , function() {
                    // write anything for tracking event
                    console.log('pause');
			    }).ON('playProgress' , function(data, id) {
                    console.log('percentdone:'+data.percent*100 , 'time:'+data.seconds)
                }).ON('finish' , function() {
                    // write anything for tracking event
                    console.log('finish');
                });
            $ele.attr('data-video-on','yes').data('videoObj',video);
            
        };

        return Jumbotron;

    })();

    // jumbotron contructor
    $.fn.jumbotron = function(options) {
        return this.each(function(){
            TWM.Jumbotron(this , options);
        });
    }

    // calling jumbotron component
    $(document).ready(function(){
        $('[data-component="jumbotron"]').jumbotron();
	});

})(window.TWM = window.TWM || {} , jQuery);

