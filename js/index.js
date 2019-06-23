
const battlefield = document.getElementById('battlefield');
const plane = document.getElementById('myplane');

// 战场到左边的距离
const battlefieldLeft = battlefield.offsetLeft;
const battlefieldTop = battlefield.offsetTop;

// 控制我的飞机的位置
const mousemove = function(event){
    const _event = event || window.event;

    const mouseLeft = _event.clientX;
    const planeLeft = mouseLeft - battlefieldLeft;

    const mouseTop = _event.clientY;
    const planeTop = mouseTop-battlefieldTop;

    if(planeLeft <=367 && 
        planeTop <=620 &&
        planeTop >=40 &&
        planeLeft >=33
        ){
        plane.style.left = planeLeft + 'px';
        plane.style.top = planeTop + 'px';
        plane.style.marginTop = '-40px';
        plane.style.marginLeft = '-33px';
    }
}

battlefield.addEventListener('mousemove',mousemove);

const bullets=[];// 子弹数组

// 创建子弹
setInterval(function(){
    const bullet=  document.createElement('div');
    bullet.classList.add('bullet');
    battlefield.appendChild(bullet);

    const planeLeft = plane.offsetLeft;
    const planeTop = plane.offsetTop;
    bullet.style.left = planeLeft + 31 +'px';
    bullet.style.top = planeTop -14+ 'px';

    bullets.push(bullet);
},500);

// 子弹移动
setInterval(function(){
    for(let i = 0; i<bullets.length;i++){
        let bulletTop = bullets[i].offsetTop;
        let bulletLeft = bullets[i].offsetLeft;
        if(bulletTop<0){// 超出屏幕外了
            battlefield.removeChild(bullets[i]);
            bullets.splice(i,1);
        }else{
            bullets[i].style.top = --bulletTop + 'px';

            for(let j=0;j<enemys.length;j++){
                // 命中敌机
                let flag = false;
                if(enemys[j].classList[0]==='small-enemy'){
                    if(enemys[j].offsetTop+24>=bulletTop &&
                        enemys[j].offsetLeft<=bulletLeft &&
                        enemys[j].offsetLeft+34>=bulletLeft){
                            flag=true;
                            enemys[j].style.backgroundImage = "url(./img/small_boom.gif)";
                        }
                }
                else if(enemys[j].classList[0]==='middle-enemy'){
                        if(enemys[j].offsetTop+60>=bulletTop &&
                            enemys[j].offsetLeft<=bulletLeft &&
                            enemys[j].offsetLeft+46>=bulletLeft){
                                flag=true;
                                enemys[j].style.backgroundImage = "url(./img/middle_boom.gif)";
                        }
                }
                else{
                    if(enemys[j].offsetTop+164>=bulletTop &&
                            enemys[j].offsetLeft<=bulletLeft &&
                            enemys[j].offsetLeft+110>=bulletLeft){
                                flag=true;
                                enemys[j].style.backgroundImage = "url(./img/big_boom.gif)";
                    }
                }

                 if(flag){
                    battlefield.removeChild(bullets[i]);
                    bullets.splice(i,1);

                    const enemyID='enemy'+randomNum(1000,9999);
                    enemys[j].setAttribute('id',enemyID);
                    displayDown(enemyID);
                }  
            }
        }
    }
},10);

// 击落之后延迟消失
function displayDown(enemyID){
    setTimeout(()=>{
        const enemy = document.getElementById(enemyID);
        if(!enemy)return;
        battlefield.removeChild(enemy);
        for(let i=0;i<enemys.length;i++){
            if(enemys[i].getAttribute('id')===enemyID){
                enemys.splice(i,1);
                break;
            }
        }
    },700);
}

const enemys = [];// 敌机数组

const rate = [60,90,100];// 小中大敌机出现的概率

// 随机数
function randomNum(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

// 创建敌机
setInterval(function(){
    const enemy = document.createElement('div');

    const random = Math.floor((Math.random()*100)+1);
    if(random <= rate[0]){
        enemy.classList.add('small-enemy');

        const left = randomNum(0,400-34);
        enemy.style.left = left + 'px';
        enemy.style.top = '-24px';

    }else if (random > rate[0] && random<=rate[1]){
        enemy.classList.add('middle-enemy');

        const left = randomNum(0,400-46);
        enemy.style.left = left + 'px';
        enemy.style.top = '-60px';

    }else {
        enemy.classList.add('big-enemy');

        const left = randomNum(0,400-110);
        enemy.style.left = left + 'px';
        enemy.style.top = '-164px';
    }
   
    battlefield.appendChild(enemy);

    enemys.push(enemy);
},5000);

// 敌机移动
setInterval(function(){
    for(let i=0 ;i < enemys.length;i++){
        let enemyTop = enemys[i].offsetTop;
        if(enemyTop>660 ){// 超出屏幕外了
            battlefield.removeChild(enemys[i]);
            enemys.splice(i,1);
        }else{
            enemys[i].style.top = ++enemyTop + 'px';
        }
    }
},10);
