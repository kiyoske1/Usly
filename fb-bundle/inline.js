const fs=require('fs');
const p=process.argv[2],s=fs.readFileSync(p,'utf8'),fb=fs.readFileSync('fb.js','utf8');
const re=/<script>([\s\S]*?)<\/script>/g;let m,hit=[];
while((m=re.exec(s))){if(m[1].includes('window.FB='))hit.push(m)}
if(hit.length!==1){console.error('Не найден скрипт с window.FB');process.exit(1)}
const i=hit[0].index+'<script>'.length;
fs.writeFileSync(p,s.slice(0,i)+fb+s.slice(i+hit[0][1].length));console.log('Firebase-бандл встроен');
