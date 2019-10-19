import React from 'react';
import axios from 'axios';
const recruitmentInfo = (props)=>{
    let Bufferdata;
    let blob;
    let url;
    async function handleClick(){
       await axios.get('http://localhost:3000/cloud/getPdfInfo').then(res=>{
        Bufferdata = res.data.bufferData;
        })
        console.log('sss');
        const buf = Buffer.from(Bufferdata,'binary');
        blob = new Blob([buf],{type:'application/doc'});    
        url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.innerHTML = '下载';
        a.href = url;
        a.download = 'test.doc';
    }

    return(
        <div>
            <button onClick={handleClick}>点击</button>
        </div>
    )
}
export default recruitmentInfo;