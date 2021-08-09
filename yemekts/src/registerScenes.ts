import SceneKeys from "./consts/SceneKeys";

import Preload from "./scenes/Preload";
import Game from "./scenes/Game";
import EndScene from "./scenes/EndScene";
import Bootstrap from "./scenes/Bootstrap";
import TitleScreen from "./scenes/TitleScreen";

const registerScenes = (game: Phaser.Game)=>{
    const scene = game.scene
    scene.add(SceneKeys.Bootstrap, Bootstrap)
    scene.add(SceneKeys.Preload, Preload)
    scene.add(SceneKeys.TitleScreen, TitleScreen)
    scene.add(SceneKeys.Game, Game)
    scene.add(SceneKeys.EndScene, EndScene)
}

export default registerScenes;