import Phaser from "phaser";

import playButton from '~/ui/PlayButton'
import SceneKeys from '~/consts/SceneKeys'
import TextureKeys from "~/consts/TextureKeys";
import { DarkColor } from '~/consts/Colors'
import { Subject } from 'rxjs'



const DPR = window.devicePixelRatio

export default class TitleScreen extends Phaser.Scene{

	private uiClickSubject = new Subject<void>()


    init(){

    }

    create(){
        const width = this.scale.width
		const height = this.scale.height

        const x = width * 0.5
		const y = height * 0.3

        this.add.image(x, height * 0.5, TextureKeys.Background)
			.setScale(DPR)
			.setTint(0x000000FF)

        const fontSize = Math.min(width * 0.095, 225)

        const title1 = this.add.text(x, y, 'Yemek Oyunu', {
			fontFamily: 'Nosifer',
			fontSize: fontSize+'',
			color: '#eb4034',
			align: 'center',
			stroke: DarkColor+'',
			strokeThickness: 8
		})
		.setOrigin(0.5, 0.5)


        this.add.text(x, title1.y + title1.height, 'Haydi Başla!', {
			fontFamily: 'Lemon',
			fontSize: (fontSize * 1.5)+ '',
			color: '#FEC81A',
			stroke: DarkColor+'',
			strokeThickness: 4
		})
        .setOrigin(0.5, 0.5)

        this.add.dom(x, height * 0.7, playButton('Play'))
			.addListener('click').on('click', () => {
				this.uiClickSubject.next()

				this.scene.start(SceneKeys.Game)
				
			})


    }


}