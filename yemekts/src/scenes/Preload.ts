import Phaser from 'phaser'
import GameEvents from '~/consts/GameEvents';

export default class Preload extends Phaser.Scene{

    preload(){
        this.load.image('yumurta', 'assets/item/yumurta.jpg');
        this.load.image('tava', 'assets/tools/tava.jpg');
        this.load.image('yumurtatava', 'assets/cooking/yumurtatava.jpg');
        this.load.image('board', 'assets/tahta.PNG');
    }

    create(){
		this.game.events.emit(GameEvents.PreloadFinished)
    }
}