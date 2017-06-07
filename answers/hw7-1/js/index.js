//twitch api ID
const ClientID='qfj87a6v7p239o85ntks6zrow2nsex';
//Offset為API中,從第幾筆開始抓資料,初始值設為0
let Offset=0;
//一次抓10筆資料
let Limit=10;
//因為scroll滾動時,在到底之前的高度都會觸發滾動效果,而導致一次做太多次AJAX請求.所以設置此來控制連續請求的bug
let IsLoading=false;
//將原始語言設為台灣
let Lang='zh-tw';

function Ajax(Lang){
    //開始載入
    Isloading=true;
    
$.ajax({
   method:"GET",
   url:"https://api.twitch.tv/kraken/streams/?client_id="+ClientID+"&game=League%20of%20Legends&limit="+Limit+"&offset="+Offset+"&language="+Lang,
   success:function(response){
       //印20筆資料出來
       for(let i=0;i<response.streams.length;i++){
            $(".channel").append(
                    `<div class="channel-box">
                      <div class="twitch-pic" >
                       <a target="_blank" href="${response.streams[i].channel.url}">
                         <img src="${response.streams[i].preview.medium}" onload="this.style.opacity=1" />
                       </a>
                     </div>
                     <div class="bottom">
                       <div class="Name-pic">
                           <img src="${response.streams[i].channel.logo}" onload=" this.style.opacity=1"/>
                      </div>
                       <div class="text">
                           <div class="channel-name">${response.streams[i].channel.status}</div>
                           <div class="owner-name">${response.streams[i].channel.display_name}</div>
                       </div>
                     </div>     
                   </div>
                  `
           )
          
      } 
       //載入結束
       Isloading=false;
          
   }
});
}
 


 //文檔載入後觸發此函式
$(document).ready(function(){
          
          //先執行一次Ajax
            Ajax(Lang);
    
          //觸發滾動效果
            $(window).scroll(function(){
                //滾動後,上面所看不見的高度+網頁所看見的視窗整體高度>=整個網頁的高度
               if($(window).scrollTop()+$(window).height()>=$(document).height()-300){
                   //假如沒再載入時
                   if(Isloading==false){
                        //每次都多10筆資料
                        Offset+=Limit;
                        console.log(Offset);
                        //再次執行Ajax
                        Ajax(Lang);
                   }
               }
            });
        
}) 

//控制切換語言
function changeLang(lang){
    Lang=lang;
    //取得I18N所設定的TITLE
    $("#title").text(I18N[Lang].TITLE);
    //清空
    $(".channel").empty();
    //切換語言後重頭開始抓取頻道
    Offset=0;
    //將所使用的語言帶進去Ajax中去抓取相關語言頻道
    Ajax(Lang);
}