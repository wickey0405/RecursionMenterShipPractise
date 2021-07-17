function printField(field){
    let str = '';
    for(let i = 0; i < field.length; i++){
        for (let j = 0; j < field[i].length; j++){
            str += field[i][j] + " | ";
        }
        str += "\n";
    }
    console.log(str);
}

function printList(list){
    let str = '';
    for(let i = 0; i < list.length; i++){
        str += list[i] + " | ";
    }
    console.log(str);
}

function action(x,y,mark,field){
    if (!isOorX(x,y,field)){
        field[x][y] = mark;

        let position = `c${x}r${y}`;
        document.getElementById(position).innerHTML = mark;
        return true;
    }
    else{
        alert('input another position');
        return false;
    }

}

function isOorX(x,y,field){
    return field[x][y] === 'o' || field[x][y] === 'x';
}

function isFillOorX(field){
    for (let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if (field[i][j] === '-') return false;
        }
    }
    return true;
}

// 
function judgeListWinner(list){
    if (list.includes('-')) return;
    let circle = 0;
    let cross = 0;

    for (let i = 0; i < list.length; i++){
        if (list[i] === 'o') circle++;
        else if(list[i] === 'x') cross++;
    }

    if (circle === 3) return 'o';
    else if (cross === 3) return 'x';
    else return 'battling';
}

function judgeWinner(field){
    for (let i = 0; i < field.length; i++){
        if (judgeListWinner(makeRowListForJudgeWinner(field,i)) === 'o') return 'o';
        else if (judgeListWinner(makeRowListForJudgeWinner(field,i)) === 'x') return 'x';
    }
    for (let j = 0; j < field.length; j++){
        if (judgeListWinner(makeColumnListForJudgeWinner(field,j)) === 'o') return 'o';
        else if (judgeListWinner(makeColumnListForJudgeWinner(field,j)) === 'x') return 'x';
    }
    for (let k = 0; k < 1; k++){
        if (judgeListWinner(makeCrossListForJudgeWinner(field,k)) === 'o') return 'o';
        else if(judgeListWinner(makeCrossListForJudgeWinner(field,k)) === 'x') return 'x';
    }
    if (isFillOorX(field)) return 'draw'; 
    return 'battling';
}

// 行方向リスト
function makeRowListForJudgeWinner(field, i){
    return field[i];
}

// 列方向リスト
function makeColumnListForJudgeWinner(field, key){
    let result = [];
    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if ( j === key) result.push(field[i][j]);
        }
    }
    return result;
}

// 斜め方向のリストを出力 vec:1の時は左下がり方向、それ以外は右下がり方向
function makeCrossListForJudgeWinner(field, vec){
    let result = [];
    let adjust = 0;
    if (vec === 1) adjust = field.length-1;

    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if ( i === Math.abs(adjust-j)) result.push(field[i][j]);
        }
    }
    return result;
}

function refresh(field){
    for (let x = 0; x < field.length; x++){
        for(let y = 0; y < field[x].length; y++){
            let position = `c${x}r${y}`;
            document.getElementById(position).innerHTML = '';            
        }
    }

}

let field = [['-','-','-'],['-','-','-'],['-','-','-']];
let count = 0;


document.getElementById('nextTurn').addEventListener('click',()=>{
    if (judgeWinner(field) === 'battling'){
        let mark = '';
        mark = count % 2 === 0 ? 'o' : 'x'; 
        if (action(prompt('input column index'),prompt('input row index'),mark,field)) count++;
        document.getElementById("current").innerHTML = `current: ${count % 2 === 0 ? 'o' : 'x'}`;
        document.getElementById('resultMessage').innerHTML = judgeWinner(field) === 'battling' ? 'Winner: ' : "Winner: "+judgeWinner(field);
    } else {
        field = [['-','-','-'],['-','-','-'],['-','-','-']];
        count = 0;
        refresh(field);
        document.getElementById('resultMessage').innerHTML = 'Winner: ';
    }

})


