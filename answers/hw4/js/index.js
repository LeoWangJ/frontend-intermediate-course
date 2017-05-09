$.ajax({
   method:"GET",
   url:"https://api.twitch.tv/kraken/streams/?client_id=qfj87a6v7p239o85ntks6zrow2nsex&game=League%20of%20Legends",
   success:function(response){
       for(var i=0;i<20;i++){
       $(".channel").append(
                '<div class="channel-box">'+
                '<div class="twitch-pic">' +
                  '<a target="_blank" href="'+response.streams[i].channel.url+'">'+
                    '<img src="'+response.streams[i].preview.medium+'"/>'+
                  '</a>'+
                '</div>'+
                '<div class="bottom">'+
                  '<div class="Name-pic">'+
                      '<img src="'+response.streams[i].channel.logo+'"/>'+
                 '</div>'+
                  '<div class="text">'+
                      '<div class="channel-name">'+response.streams[i].channel.status+'</div>'+
                      '<div class="owner-name">'+response.streams[i].channel.display_name+'</div>'+
                  '</div>'+
                '</div>'+      
              '</div>'
       )
      } 
      $(".channel").append(
           '<div class="channel-box empty-box"></div>'+
           '<div class="channel-box empty-box"></div>'+ 
           '<div class="channel-box empty-box"></div>'+  
           '<div class="channel-box empty-box"></div>'+  
           '<div class="channel-box empty-box"></div>' 
      )
   },
   error:function(){
       alert('失敗');
   }
});