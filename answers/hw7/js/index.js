//twitch api ID
var ClientID='qfj87a6v7p239o85ntks6zrow2nsex';
//Offset為API中,從第幾筆開始抓資料,初始值設為0
var Offset=0;
//一次只抓20筆
var Limit=20;
//因為scroll滾動時,在到底之前的高度都會觸發滾動效果,而導致一次做太多次AJAX請求.所以設置此來控制連續請求的bug
var IsLoading=false;
//取得id=title的html
var Title=document.getElementById('title');
//將原始語言設為台灣
var Lang='zh-tw';

function Ajax(Lang){
    //開始載入
    IsLoading=true;
    
    var XmlHttp;
    var Response;
    if(window.XMLHttpRequest){
        //IE7+
        XmlHttp=new XMLHttpRequest();
    }else{
        //IE6,IE5
        XmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
      //規定請求類型,URL,Async
      XmlHttp.open("GET","https://api.twitch.tv/kraken/streams/?client_id="+ClientID+"&game=League%20of%20Legends&limit="+Limit+"&offset="+Offset+"&language="+Lang,true);
      //服務器回應狀態
      XmlHttp.onreadystatechange=function(){
          
          if(XmlHttp.readyState == 4 && XmlHttp.status == 200){
              //將回傳檔案轉為JSON檔
              Response=JSON.parse(XmlHttp.responseText);
                  var Channel,ChannelBox,TwitchPic,HyperLink,TwitchPicImg,
                      Bottom,NamePic,NamePicImg,Text,ChannelName,OwnerName;
              
              
            for(var i=0;i<Response.streams.length;i++){
                  
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
                  HyperLink=document.createElement("a");
                  HyperLink.setAttribute("target","_blank");
                  HyperLink.setAttribute("href",Response.streams[i].channel.url);
                  TwitchPic.appendChild(HyperLink);
                    
                  //<img src="'+response.streams[i].preview.medium+'" onload="this.style.opacity=1" />
                  TwitchPicImg=document.createElement("img");
                  TwitchPicImg.setAttribute("src",Response.streams[i].preview.medium);
                  TwitchPicImg.setAttribute("onload","this.style.opacity=1");
                  HyperLink.appendChild(TwitchPicImg);
                  
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
                  NamePicImg.setAttribute("src",Response.streams[i].channel.logo);
                  NamePicImg.setAttribute("onload","this.style.opacity=1");
                  NamePic.appendChild(NamePicImg);
                
                  //<div class="text">
                  Text=document.createElement("div");
                  Text.classList.add("text");
                  Bottom.appendChild(Text);
                
                  //<div class="channel-name">
                  ChannelName=document.createElement("div");
                  ChannelName.classList.add("channel-name");
                  ChannelName.innerHTML+=Response.streams[i].channel.status;
                  Text.appendChild(ChannelName);
                  
                  //<div class="owner-name">
                  OwnerName=document.createElement("div");
                  OwnerName.classList.add("owner-name");
                  OwnerName.innerHTML +=Response.streams[i].channel.display_name;
                  Text.appendChild(OwnerName);
            }
              
              //載入結束
              IsLoading=false;
          }
      }
      
      //向服務器發送請求
      XmlHttp.send();
}
 
//文檔載入完成後觸發此函式
if(document.readyState === 'complete' || document.readyState !== 'loading'){
     
     
     Scroll();
     
}else{
    //DOMContentLoaded當document被完整的讀取跟解析後就會被觸發,不會等待 stylesheets, 圖片完成讀取
    document.addEventListener('DOMContentLoaded',Scroll);
}

 function Scroll(){
        //先執行一次Ajax
        Ajax(Lang);
        //觸發滾動效果
        window.onscroll=function(){
            //滾動後,上面所看不見的高度+網頁所看見的視窗整體高度>=整個網頁的高度
            //參考https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md#2.4   
            var WindowScrollTop=(document.documentElement && document.documentElement.scrollTop ) || document.body.scrollTop;
            //網頁有捲動過後的高度(WindowScrollTop)+視窗內整個的高度 >= 整個網頁的高度
            if( WindowScrollTop + window.innerHeight >= document.body.scrollHeight-300){
                //假如沒再載入時
                if(IsLoading==false){
                    //每次都多20筆資料
                    Offset+=Limit;
                    console.log(Offset);
                    //再次執行Ajax
                    Ajax(Lang);
                }
            }
    };
        
} 

//控制切換語言
function changeLang(lang){
    Lang=lang;
    //取得I18N所設定的TITLE
    Title.textContent=I18N[Lang].TITLE;
    //清空
    document.querySelector(".channel").innerHTML=' ';
    //切換語言後重頭開始抓取頻道
    Offset=0;
    //將所使用的語言帶進去Ajax中去抓取相關語言頻道
    Ajax(Lang);
}