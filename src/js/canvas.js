
import platform from '../../src/img/platform.png'
import background from '../../src/img/background.png'
import hills from '../../src/img/hills.png'
// import { init } from 'browser-sync';

console.log(platform);
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(c);
console.log(typeof (c));
     canvas.width =1024
    canvas.height = 576

const gravity = 1.5
class Player {
    constructor() {

        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100,
            this.height = 100

    }
    draw() {
        c.fillStyle='red'
        c.fillRect(this.position.x, this.position.y, this.width
            , this.height)
    }


    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }

        //else this.velocity.y = 0


    }
}

// platform creation
  class Platform{

    constructor({x,y,image}){
         this.position={
            x,
            y
         }
         this.image=image
         this.width=image.width
         this.height=image.height
         
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  class GenericObject{

    constructor({x,y,image}){
         this.position={
            x,
            y
         }
         this.image=image
         this.width=image.width
         this.height=image.height
         
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
  }
 
 
function createImage(imgSrc){
    const image = new Image()
    image.src=imgSrc
    return image    
}

function init() {
platformImg=createImage(platform)
 player = new Player()


 genericObject= [
    new GenericObject({
        x:0,
        y:0,
        image:createImage(background)
        
    }),
    new GenericObject({
        x:0,
        y:0,
        image:createImage(hills)
        
    }),
 ]
  platforms = [new Platform({x:-3, y:470,image:platformImg}),
     new Platform({x:platformImg.width-6, y:470,image:platformImg }),
    new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width *2 +100, y:470,image:platformImg }),
    new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width *4  +400, y:470,image:platformImg }),
    new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width *2 +800, y:470,image:platformImg }),
    
]
 scrollOfSet=0
 
}

let platformImg=createImage(platform)
let player = new Player()
let platforms = [new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width-6, y:470,image:platformImg }),
    new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width *2 +100, y:470,image:platformImg }),
    new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width *4  +400, y:470,image:platformImg }),
    new Platform({x:-3, y:470,image:platformImg}), 
    new Platform({x:platformImg.width *2 +800, y:470,image:platformImg }),
    
]

let genericObject= [
    new GenericObject({
        x:0,
        y:0,
        image:createImage(background)
        
    }),
    new GenericObject({
        x:0,
        y:0,
        image:createImage(hills)
        
    }),
 ]

 const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
 }

let scrollOfSet=0

player.update()

//console.log(platform.draw());
// animation phase 


function animate() {
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObject.forEach(
        genericObject=>{
       genericObject.draw()
    })
    platforms.forEach(platform=>{
        platform.draw()
    })
    player.update()
     if (keys.right.pressed && player.position.x <400) {
        player.velocity.x = 5
     }
     else if(keys.left.pressed && player.position.x>100){
        player.velocity.x = -5
     }
     else {player.velocity.x = 0






        
          if (keys.right.pressed) {
            scrollOfSet +=5
            platforms.forEach(platform=>{
                platform.position.x -= 5
            })
            genericObject.forEach((genericObject)=>{
                genericObject.position.x -=3
            })
            
          }
         
          else if(keys.left.pressed){
            scrollOfSet -=5
            platforms.forEach(platform=>{
                platform.position.x += 5
            })
            genericObject.forEach((genericObject)=>{
                genericObject.position.x +=3
            })
            
          }       
 
          console.log(scrollOfSet);
               }
      
               platforms.forEach(platform=>{
            
          
                   
     if (player.position.y + player.height <= platform.position.y && 
        player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width>=platform.position.x
        && player.position.x <=platform.position.x +platform.width        ) {
        player.velocity.y=0
     }
    })
    // console.log(player.update());
    if (scrollOfSet>1000) {
        console.log('you won');
    }
    if (player.position.y>canvas.height) {
       init()
        console.log('you lose');
    }
}
animate()


window.addEventListener('keydown', ({ keyCode }) => {

    // console.log(Event.keyCode);
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = true
            break;
        case 87:
            console.log('top');
            player.velocity.y -= 20
            break;


    }
    console.log(keys.right.pressed);
})


window.addEventListener('keyup', ({ keyCode }) => {

    // console.log(Event.keyCode);
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = false
            break;
        case 87:
            console.log('top');
            player.velocity.y -= 20
            break;


    }

})