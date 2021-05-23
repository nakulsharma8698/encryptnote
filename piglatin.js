var emoj={
    a:"🍎",
    b:"🥎",
    c:"🐱",d:"🐶",e:"😍",f:"🦈", g:"🌿",h:"🤠",i:"😭",j:"🍺",k:"🪁", l:"🤙",m:"🙏",n:"👋",o:"😳",p:"🦜",q:"💧",r:"🌈",s:"🌎",t:"🌳",u:"☂️",v:"🚐",w:"🖐️",x:"😂",y:"😤",z:"🧢"
}
function isVowel(c)
{
    return (c == 'A' || c == 'E' || c == 'I' || 
            c == 'O' || c == 'U' || c == 'a' || 
            c == 'e' || c == 'i' || c == 'o' ||
            c == 'u');
}
 function emoji(s)
{
    var val="";
    var arr=s.split(' ');
    for (var j = 0; j < arr.length; j++) {
        var len = arr[j].length;
        str=arr[j];
        for (var i = 0; i < len; i++) {
            if(str[i]>='a' && str[i]<='z'){
                str[i]=emoj[str[i]];
                val+=emoj[str[i]];
            }
            else
                val+=str[i];
        }
        val+=" ";
    }
    return val;
}
function pigLatin(s)
{
    var ans="";
    var arr=s.split(' ');
    for (var j = 0; j < arr.length; j++) {
    var len = arr[j].length;
    var index = -1;
    str=arr[j];
    for (var i = 0; i < len; i++) {
        if (isVowel(str[i])) {
            index = i;
            break;
        }
    }
    if (index == -1)
        str+='yay';
    else
        str=str.substr(index) + str.substr(0, index) + "ay";

    ans+=str;
   ans+=" ";
}
    ans=ans.trim();
    return ans;
}


function scramble(s)
{
    var ans="";
    var val="";
    var arr=s.split(' ');
    for (var j = 0; j < arr.length; j++) {
    var len = arr[j].length;
    str=arr[j];
    for (var i = 0; i < len; i++) {
        if(str[i]>='a' && str[i]<='s'){
           val+=String.fromCharCode(str[i].charCodeAt(0) + 7);
        }
        else if(str[i]>='t' && str[i]<='z')
        {
            switch(str[i])
            {
                case 't':val+='a';
                            break;
                case 'u':val+='b';
                            break;
                case 'v':val+='c';
                            break;
                case 'w':val+='d';
                            break;
                case 'x':val+='e';
                            break;
                case 'y':val+='f';
                            break;
                case 'z':val+='g';
                            break;
            }
        }
        else
            val+=str[i];
    }
   val+=" ";
}
    return val;
}

module.exports={emoji, pigLatin, scramble};