const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghost");

const createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

let fps = 30;
let oneBlockSize = 20;
let wallColor = "#342DCA";
let wallSpaceWidth = oneBlockSize/1.5;
let wallOffSet = (oneBlockSize - wallSpaceWidth)/2;
let wallInnerColor = "black";
let pacman;

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

let map = [
    [1, 1, 1, 1, 1 ,1, 1, 1, 1, 1 ,1, 1, 1, 1, 1 ,1, 1, 1, 1, 1 ,1],
    [1, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,1, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,1],
    [1, 2, 1, 1, 1 ,2, 1, 1, 1, 2 ,1, 2, 1, 1, 1 ,2, 1, 1, 1, 2 ,1],
    [1, 2, 1, 1, 1 ,2, 1, 1, 1, 2 ,1, 2, 1, 1, 1 ,2, 1, 1, 1, 2 ,1],
    [1, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,1],
    [1, 2, 1, 1, 1 ,2, 1, 2, 1, 1 ,1, 1, 1, 2, 1 ,2, 1, 1, 1, 2 ,1],
    [1, 2, 2, 2, 2 ,2, 1, 2, 2, 2 ,1, 2, 2, 2, 1 ,2, 2, 2, 2, 2 ,1],
    [1, 1, 1, 1, 1 ,2, 1, 1, 1, 2 ,1, 2, 1, 1, 1 ,2, 1, 1, 1, 1 ,1],
    [0, 0, 0, 0, 1 ,2, 1, 2, 2, 2 ,2, 2, 2, 2, 1 ,2, 1, 0, 0, 0 ,0],
    [1, 1, 1, 1, 1 ,2, 1, 2, 1, 1 ,2, 1, 1, 2, 1 ,2, 1, 1, 1, 1 ,1],
    [2, 2, 2, 2, 2 ,2, 2, 2, 1, 2 ,2, 2, 1, 2, 2 ,2, 2, 2, 2, 2 ,2],
    [1, 1, 1, 1, 1 ,2, 1, 2, 1, 2 ,2, 2, 1, 2, 1 ,2, 1, 1, 1, 1 ,1],
    [0, 0, 0, 0, 1 ,2, 1, 2, 1, 1 ,1, 1, 1, 2, 1 ,2, 1, 0, 0, 0 ,0],
    [0, 0, 0, 0, 1 ,2, 1, 2, 2, 2 ,2, 2, 2, 2, 1 ,2, 1, 0, 0, 0 ,0],
    [1, 1, 1, 1, 1 ,2, 2, 2, 1, 1 ,1, 1, 1, 2, 2 ,2, 1, 1, 1, 1 ,1],
    [1, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,1, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,1],
    [1, 2, 1, 1, 1 ,2, 1, 1, 1, 2 ,1, 2, 1, 1, 1 ,2, 1, 1, 1, 2 ,1],
    [1, 2, 2, 2, 1 ,2, 2, 2, 2, 2 ,1, 2, 2, 2, 2 ,2, 1, 2, 2, 2 ,1],
    [1, 1, 2, 2, 1 ,2, 1, 2, 1, 1 ,1, 1, 1, 2, 1 ,2, 1, 2, 2, 1 ,1],
    [1, 2, 2, 2, 2 ,2, 1, 2, 2, 2 ,1, 2, 2, 2, 1 ,2, 2, 2, 2, 2 ,1],
    [1, 2, 1, 1, 1 ,1, 1, 1, 1, 2 ,1, 2, 1, 1, 1 ,1, 1, 1, 1, 2 ,1],
    [1, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,2, 2, 2, 2, 2 ,1],
    [1, 1, 1, 1, 1 ,1, 1, 1, 1, 1 ,1, 1, 1, 1, 1 ,1, 1, 1, 1, 1 ,1],
];

let gameLoop = () =>{
    update();
    draw();
};

let update = () => {
    pacman.moveProcess();
};

let draw = () =>{
    createRect(0,0,canvas.width,canvas.height,"black");
    drawWalls();
    pacman.draw();
};

let gameInterval = setInterval(gameLoop,1000/fps);

let drawWalls = () =>{
    for(let i =0;i<map.length;i++){
        for(let j=0;j<map[0].length;j++){
            if(map[i][j] === 1){
                createRect(j * oneBlockSize,i * oneBlockSize , oneBlockSize, oneBlockSize, wallColor);
            }
            if(j>0 && map[i][j-1] === 1){
                createRect(j* oneBlockSize,i*oneBlockSize + wallOffSet,wallSpaceWidth +wallOffSet,wallSpaceWidth,wallInnerColor );
            }
            if(j<map[0].length -1 && map[i][j+1] === 1){
                createRect(j* oneBlockSize + wallOffSet,i*oneBlockSize + wallOffSet,wallSpaceWidth +wallOffSet,wallSpaceWidth,wallInnerColor );
            }
            if(i>0 && map[i-1][j] === 1){
                createRect(j* oneBlockSize+wallOffSet,i*oneBlockSize ,wallSpaceWidth ,wallSpaceWidth + wallOffSet,wallInnerColor );
            }
            if(i<map.length -1 && map[i+1][j] === 1){
                createRect(j* oneBlockSize+wallOffSet,i*oneBlockSize +wallOffSet,wallSpaceWidth ,wallSpaceWidth+wallOffSet,wallInnerColor );
            }
        }
    }
};
let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize/5
    );
};

createNewPacman();
gameLoop();
