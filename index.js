let column_size=9;
let row_size=9;
let grid=[];
let bomb=[];
let score=0;

const StartGame=()=>{
    let count=0;
    while(count<10){
        let random=String(Math.ceil(Math.random()*8))+String(Math.ceil(Math.random()*8));
        if(!bomb.includes(random)){
            count++;
            bomb.push(random);
        }
    }
    console.log(bomb);
    for(let i=0;i<column_size;i++){
        let arr=[];
        for(let j=0;j<row_size;j++){
            let a=String(i)+String(j);
            if(bomb.includes(a)){
                arr.push(-1);
            }
            else{
                arr.push(Math.ceil(Math.random()*9));
            }
        }
        grid.unshift(arr);
    }
    const butt=document.getElementById("start");
    butt.remove();
    console.log(grid);
    creategrid();
}
const creategrid=()=>{
    const grid_container=document.getElementById("grid");
    for(let i=0;i<column_size;i++){
        const row=document.createElement("div");
        row.classList.add("row");
        for(let j=0;j<row_size;j++){
            const cell=document.createElement("div");
            cell.classList.add("cell");
            cell.id=String(j)+String(i);
            row.appendChild(cell);
            cell.addEventListener("click",(event)=>handleclick(i,j),{once:true});
            cell.addEventListener("mousedown",(event)=>Mousedown(event,i,j));
        }
        grid_container.appendChild(row);
    }
}
const Mousedown=(event,i,j)=>{
    event=event||window.event;
    if(event.which==3){
        const ex=document.getElementById(String(j)+String(i));
        ex.innerHTML="❗";
    }

}

const handleclick=(i,j)=>{
    const display_cell=document.getElementById(String(j)+String(i));
    //console.log(el.id);
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const remove_red=document.getElementById(String(j)+String(i));
            if(remove_red.innerHTML!=="" && remove_red.innerHTML!=="❗"){
                remove_red.innerHTML="";
                remove_red.style.backgroundColor="lightGrey";
                
            }
            remove_red.classList.remove("cell_red");
        }
    }
    if(grid[j][i]===-1){
        for(let k=0;k<column_size;k++){
            for(let l=0;l<row_size;l++){
                const b=document.getElementById(String(l)+String(k));
                if(grid[l][k]===-1){
                    b.innerHTML="💣";
                    b.style.background="red";
                }
            }
        }
        const popup_score=document.getElementById("score-popup");
        popup_score.innerHTML=score;
        const popup=document.getElementById("popup-1");
        popup.classList.toggle("active");
        //alert("Game Over");
    }
    else{
        display_cell.style.background="lightgreen";
        let NumberOfBombs=getBombs(j,i);
        console.log(NumberOfBombs);
        display_cell.innerHTML=NumberOfBombs;
        score++;
        UpdateScore();
    }
    //display_cell.setAttribute("disabled",true);
    // event.target.removeEventListener(event.type);

}
const UpdateScore=()=>{
    const display_score=document.getElementById("score");
    display_score.innerHTML=`Moves: ${ score}`;
}

const getBombs=(j,i)=>{
    let arr=[];
    let BombAround=0;
    if(j-1>=0 && j-1<=8 && i-1>=0 && i-1<=8){
        arr.push(grid[j-1][i-1]);
        const cell=document.getElementById(String(j-1)+String(i-1));
        cell.classList.add("cell_red");
    }
    if(j-1>=0 && j-1<=8 && i>=0 && i<=8){
        arr.push(grid[j-1][i]);
        const cell=document.getElementById(String(j-1)+String(i));
        cell.classList.add("cell_red");
    }
    if(j-1>=0 && j-1<=8 && i+1>=0 && i+1<=8){
        arr.push(grid[j-1][i+1]);
        const cell=document.getElementById(String(j-1)+String(i+1));
        cell.classList.add("cell_red");
    }
    if(j>=0 && j<=8 && i-1>=0 && i-1<=8){
        arr.push(grid[j][i-1]);
        const cell=document.getElementById(String(j)+String(i-1));
        cell.classList.add("cell_red");
    }
    if(j>=0 && j<=8 && i+1>=0 && i+1<=8){
        arr.push(grid[j][i+1]);
        const cell=document.getElementById(String(j)+String(i+1));
        cell.classList.add("cell_red");
    }
    if(j+1>=0 && j+1<=8 && i-1>=0 && i-1<=8){
        arr.push(grid[j+1][i-1]);
        const cell=document.getElementById(String(j+1)+String(i-1));
        cell.classList.add("cell_red");
    }
    if(j+1>=0 && j+1<=8 && i>=0 && i<=8){
        arr.push(grid[j+1][i]);
        const cell=document.getElementById(String(j+1)+String(i));
        cell.classList.add("cell_red");
    }
    if(j+1>=0 && j+1<=8 && i+1>=0 && i+1<=8){
        arr.push(grid[j+1][i+1]);
        const cell=document.getElementById(String(j+1)+String(i+1));
        cell.classList.add("cell_red");
    }
    console.log(arr);
    arr.forEach(function(ele){
        if(ele===-1){
            BombAround++;
        }
    });
    return BombAround;
}