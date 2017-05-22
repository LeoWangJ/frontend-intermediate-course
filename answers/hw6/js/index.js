//twitch api ID
var clientID='qfj87a6v7p239o85ntks6zrow2nsex';
//Offset為API中,從第幾筆開始抓資料,初始值設為0
var Offset=0;
//一次只抓20筆
var Limit=20;
//因為scroll滾動時,在到底之前的高度(200px)都會觸發滾動效果,而導致一次做太多次AJAX請求.所以設置此來控制連續請求的bug
var isloading=false;
    
function Ajax(){
    //開始載入
    isloading=true;
    
    var xmlhttp;
    var response;
    if(window.XMLHttpRequest){
        //IE7+
        xmlhttp=new XMLHttpRequest();
    }else{
        //IE6,IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
      //規定請求類型,URL,Async
      xmlhttp.open("GET","https://api.twitch.tv/kraken/streams/?client_id="+clientID+"&game=League%20of%20Legends&limit="+Limit+"&offset="+Offset,true);
      //服務器回應狀態
      xmlhttp.onreadystatechange=function(){
          
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
              //將回傳檔案轉為JSON檔
              response=JSON.parse(xmlhttp.responseText);
                  var Channel,ChannelBox,TwitchPic,Hyperlink,TwitchPicImg,
                      Bottom,NamePic,NamePicImg,Text,ChannelName,OwnerName;
              
              
            for(var i=0;i<response.streams.length;i++){
                  
                  /*----------------HTML--------------------*/
                  //選取class=channel
                  Channel = document.querySelector(".channel");
                  //新增一個div
                  ChannelBox = document.createElement('div');
                  //在此div中添加class名稱
                  ChannelBox.classList.add("channel-box");
                  //將<div class="channel-box">添加進channel裡
                  Channel.appendChild(ChannelBox);

                  //<div class="twitch-pic">
                  TwitchPic =document.createElement('div');
                  TwitchPic.classList.add("twitch-pic");
                  ChannelBox.appendChild(TwitchPic);

                  //<a target="_blank" href="'+response.streams[i].channel.url+'">
                  Hyperlink=document.createElement("a");
                  Hyperlink.setAttribute("target","_blank");
                  Hyperlink.setAttribute("href",response.streams[i].channel.url);
                  TwitchPic.appendChild(Hyperlink);
                    
                  //<img src="'+response.streams[i].preview.medium+'" onload="this.style.opacity=1" />
                  TwitchPicImg=document.createElement("img");
                  TwitchPicImg.setAttribute("src",response.streams[i].preview.medium);
                  TwitchPicImg.setAttribute("onload","this.style.opacity=1");
                  Hyperlink.appendChild(TwitchPicImg);
                  
                  //<div class="bottom">
                  Bottom=document.createElement("div");
                  Bottom.classList.add("bottom");
                  ChannelBox.appendChild(Bottom);
                 
                  //<div class="Name-pic">
                  NamePic=document.createElement("div");
                  NamePic.classList.add("Name-pic");
                  Bottom.appendChild(NamePic);
                  
                  //<img src="'+response.streams[i].channel.logo+'" onload=" this.style.opacity=1"/>
                  NamePicImg=document.createElement("img");
                  NamePicImg.setAttribute("src",response.streams[i].channel.logo);
                  NamePicImg.setAttribute("onload","this.style.opacity=1");
                  NamePic.appendChild(NamePicImg);
                
                  //<div class="text">
                  Text=document.createElement("div");
                  Text.classList.add("text");
                  Bottom.appendChild(Text);
                
                  //<div class="channel-name">
                  ChannelName=document.createElement("div");
                  ChannelName.classList.add("channel-name");
                  ChannelName.innerHTML+=response.streams[i].channel.status;
                  Text.appendChild(ChannelName);
                  
                  //<div class="owner-name">
                  OwnerName=document.createElement("div");
                  OwnerName.classList.add("owner-name");
                  OwnerName.innerHTML +=response.streams[i].channel.display_name;
                  Text.appendChild(OwnerName);
            }
              
              //載入結束
              isloading=false;
          }
      }
      
      //向服務器發送請求
      xmlhttp.send();
}
 
//文檔載入完成後觸發此函式
if(document.readyState === 'complete' || document.readyState !== 'loading'){
     
     
     scroll();
     
}else{
    //DOMContentLoaded當document被完整的讀取跟解析後就會被觸發,不會等待 stylesheets, 圖片完成讀取
    document.addEventListener('DOMContentLoaded',scroll());
}

 function scroll(){
        //先執行一次Ajax
        Ajax();
        //觸發滾動效果
        window.onscroll=function(){
            //滾動後,上面所看不見的高度+網頁所看見的視窗整體高度>=整個網頁的高度
            //參考https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md#2.4   
            var WindowScrollTop=(document.documentElement && document.documentElement.scrollTop ) || document.body.scrollTop;
            //網頁有捲動過後的高度(WindowScrollTop)+視窗內整個的高度 >= 整個網頁的高度
            if( WindowScrollTop + window.innerHeight >= document.body.scrollHeight-300){
                //假如沒再載入時
                if(isloading==false){
                    //每次都多20筆資料
                    Offset+=Limit;
                    console.log(Offset);
                    //再次執行Ajax
                    Ajax();
                }
            }
    };
        
} 
