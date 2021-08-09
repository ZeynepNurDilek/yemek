import Phaser from 'phaser'
import SceneKeys from '~/consts/SceneKeys';
import playButton from '~/ui/PlayButton';
const DPR = window.devicePixelRatio

enum GameState{
    Preperation,
    Cooking
}

export default class Game extends Phaser.Scene{

    private state = GameState.Preperation
    private yumurta:Phaser.Physics.Arcade.Sprite;
    private tava:Phaser.Physics.Arcade.Sprite;
    private yumurtatava:Phaser.Physics.Arcade.Sprite;
    
    init(){
        this.state = GameState.Preperation
        
    }


    create(){
        const width = this.scale.width
		const height = this.scale.height

        this.add.image(width * 0.5, height * 0.5, 'board')
            .setScale(DPR);
        
        this.physics.world.setBounds(0, 0, width, height)
        this.physics.world.setBoundsCollision(true, true, false, false)

        this.yumurta = this.physics.add.sprite(width*0.5, height*0.5, 'yumurta').setScale(0.1);
        this.yumurta.setInteractive({draggable:true});

        this.tava = this.physics.add.sprite(width*0.5+(100*DPR), height*0.5 + (100*DPR), 'tava').setScale(0.2);
        this.tava.setInteractive({draggable:true});
    

        this.yumurta.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true).setGravityY(0);
        this.physics.add.collider(this.yumurta, this.tava, this.handleCollide, undefined, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });


    }

    handleCollide(yumurta, tava){
        this.createNewObject(tava.x, tava.y);
        this.removeOverlappedObjects(yumurta, tava);

        this.createNextButtonWithDelay();
    }


    update(){
        // if(this.yumurta.active && this.checkOverlap(this.yumurta , this.tava)){
        //     console.log("dokundu");
        //     this.createNewObject(this.tava.x, this.tava.y);
        //     this.removeOverlappedObjects(this.yumurta, this.tava);

        //     this.createNextButtonWithDelay();
        // }
    }

    checkOverlap(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);

    }

    createNewObject(x, y) {
        this.yumurtatava = this.physics.add.sprite(x, y, 'yumurtatava').setScale(0.2);
        this.yumurtatava.setInteractive({draggable:true});
        
    }
    
    removeOverlappedObjects(yumurta, tava) {
        yumurta.destroy(true);
        tava.destroy(true);
    }

    createNextButton(width, height){
        
        this.add.dom(width*0.5, height*0.5, playButton('Next'))
			.addListener('click').on('click', () => {

				this.scene.start(SceneKeys.EndScene)
				
			})

    }

    createNextButtonWithDelay(){
        const width = this.scale.width
		const height = this.scale.height

        this.time.addEvent({
            delay: 500, 
            callback: ()=>{
                this.createNextButton(width, height)
            }, 
            loop: true
        })
    }
}