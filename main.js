let canvas /** @type {HTMLCanvasElement} */= document.getElementById('canvas');
let context=canvas.getContext('2d');
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-25;
height=canvas.height;
width=canvas.width;

canvas.style.background="rgb(150,150,100)";


//This is for 10 circles that are spawned
class Circle{
    constructor(xpos,ypos,radius,bordercolor,innercolor,speedx,speedy,id){
        this.xpos=xpos;
        this.ypos=ypos;
        this.radius=radius;
        this.bordercolor=bordercolor;
        this.innercolor=innercolor;
        this.dx=speedx;
        this.dy=speedy;
        this.id=id;
    }

    draw(board)
    {
        board.beginPath();
        board.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2);
        board.strokeStyle=this.bordercolor;
        board.fillStyle=this.innercolor;
        board.stroke();
        board.fill();
        board.textBaseline='middle';
        board.textAlign="center"
        board.font='30px Arial black';
        board.fillStyle="black"
        board.fillText(this.id,this.xpos,this.ypos);

    }

    update()
    {

        this.draw(context);
        
        if((this.xpos+this.radius)>width||(this.xpos-this.radius)<0)
        {
            this.dx=-this.dx;
        }
        if((this.ypos+this.radius)>height||(this.ypos-this.radius)<0)
        {
            this.dy=-this.dy;
        }

        //If circle gets spawned near outside/canvas border then push it inside
        this.xpos=(this.xpos+this.radius>width)?width-this.radius:this.xpos;
        this.ypos=(this.ypos+this.radius>height)?height-this.radius:this.ypos;
        this.xpos+=(this.xpos-this.radius<0)?2:0;
        this.ypos+=(this.ypos-this.radius<0)?2:0;

        //
        this.xpos+=this.dx;
        this.ypos+=this.dy;

    }
}







let circles=[];

let createcircle=function(circle){
    circle.draw(context);
}

for(let i=0;i<10;i++)
{
    let randomy=Math.random()*height*1.2;
    let randomx=Math.random()*width*1.2;
    let circle1=new Circle(randomx,randomy,50,'red','blue',3,3,i);
    circles.push(circle1);
    createcircle(circles[i]);  
}



class collisiondetector{
    constructor(xpos,ypos,radius)
    {
        this.xpos=xpos;
        this.ypos=ypos;
        this.radius=radius;
        this.bordercolor='black';
        this.collisions=0;
    }
    draw(board)
    { 
        board.beginPath();
        board.arc(this.xpos,this.ypos,this.radius,0,2*Math.PI);
        board.strokeStyle='Black';
        board.stroke();

    }

    currentCollision(colliders,board)
    {
        let txt="";
        colliders.forEach(
            (x)=>{let distance=Math.sqrt(Math.pow(this.xpos-x.xpos,2)+Math.pow(this.ypos-x.ypos,2));
                txt+=distance<(this.radius+x.radius)?String(x.id):'';
                }
            );

        this.draw(board);
        board.textBaseline='middle';
        board.textAlign="center"
        board.font='30px Arial black';
        board.fillStyle="black"
        board.fillText(txt,this.xpos,this.ypos);

    }

totalCountstart(colliders){
    colliders.forEach((x)=>{colliderarray.push({'id':x.id, 'inside':0})});
}

totalCollisions(colliders)
    {
        let collisions=this.collisions;
        colliders.forEach(
            (x,i)=>{let distance=Math.sqrt(Math.pow(this.xpos-x.xpos,2)+Math.pow(this.ypos-x.ypos,2));

                if(distance<(this.radius+x.radius)&&(colliderarray[i].inside==0))
                {
                    console.log('hello');
                    colliderarray[i].inside=1;
                    collisions++;
                }
                }
            );
            this.collisions=collisions;
            context.fillText(this.collisions,this.xpos,this.ypos+40);
            colliders.forEach(
                (x,i)=>{let distance=Math.sqrt(Math.pow(this.xpos-x.xpos,2)+Math.pow(this.ypos-x.ypos,2));
                    if(distance>(this.radius+x.radius)&&colliderarray[i].inside==1)
                    {
                        colliderarray[i].inside=0;
                    }
                    });  
    }
}


let detector= new collisiondetector(100,100,100);
var colliderarray=[];
detector.totalCountstart(circles);

let updateScreen=function()
{
    context.clearRect(0,0,width,height);
    detector.totalCollisions(circles);
    detector.currentCollision(circles,context);

    circles.forEach((x)=>{x.update();});
    requestAnimationFrame(updateScreen);

}

updateScreen();
