(()=>{"use strict";var e={602:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(224)),r=s(i(30)),o=s(i(521)),n=s(i(853)),h=s(i(891)),l=s(i(195));class u{constructor(){}image(e,t,i,s,r){let n=a.default.SArrayImage.filter((e=>e.getNameImage()===r)),h=new o.default;if(n[0]){let a=n[0].getImage();return h.setNameImage(r),h.setPosition(e,t),h.setSize(i,s),h.setIsVisible(!0),h.setImage(a),u.SArrayDrawImage.push(h),h}return h}imageSprite(e,t,i,s,r,o){let h=new n.default,l=a.default.SArraySpriteSheet.filter((e=>e.getNameImage()===r));if(l[0]&&l[0].frameInSprite.length>0){let a=l[0].frameInSprite.filter((e=>e.key===o));a[0]&&(h.setFrameInSprite(a),h.setSourcePosition(a[0].sourcePosition.x,a[0].sourcePosition.y),h.setSourceSize(a[0].sourceSize.width,a[0].sourceSize.height),h.setSize(i,s),h.setPosition(e,t),h.setIsVisible(!0),h.setImage(l[0].image),u.SArrayDrawImageFromSprite.push(h))}return h}spriteSheet(e,t,i,s){let a=new l.default;return a.setPosition(e,t),a.setSize(i,s),u.SArrayDrawImageAnimation.push(a),a}text(e,t,i,s="Arial",a=13){let o=new r.default;return o.setPosition(e,t),o.setFontFamily(s),o.setFontSize(a),o.setText(i),u.SArrayText.push(o),o}rectangular(e,t,i,s,a){let r=new h.default;return r.setPosition(e,t),r.setSize(i,s),r.setColor(a),r.setIsVisible(!0),u.SArrayShape.push(r),r}}t.default=u,u.SArrayText=[],u.SArrayDrawImage=[],u.SArrayDrawImageFromSprite=[],u.SArrayShape=[],u.SArrayDrawImageAnimation=[]},468:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(224));class r{constructor(){this.nameAnimation="",this.key=Math.floor(Math.random()*Date.now()),this.imageAnimation={x:0,y:0,width:0,height:0,image:new Image,frameInSprite:[],frames:[]}}create(e){const{key:t,frames:i,frameRate:s}=e;if(a.default.SArraySpriteSheet.length>0){let e=a.default.SArraySpriteSheet.filter((e=>e.nameImage===i.nameImage));if(e[0]){let a=[],o=i.frames.length;o>0&&e[0].frameInSprite.forEach((e=>{for(let t=0;t<o;t++)e.key===i.frames[t]&&a.push(e)})),a.length>0&&r.SArrayConfigAnimation.push({key:t,frameRate:s,frameInSpriteOfAnimation:a,image:e[0].image})}}}}t.default=r,r.SArrayConfigAnimation=[]},967:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.position={x:0,y:0},this.size={width:0,height:0}}setSize(e,t){this.size={width:e,height:t}}getSize(){return this.size}setWidth(e){this.size.width=e}getWidth(){return this.size.width}setHeight(e){this.size.height=e}getHeight(){return this.size.height}setPosition(e,t){this.position={x:e,y:t}}getPosition(){return this.position}setPositionX(e){this.position.x=e}getPositionX(){return this.position.x}setPositionY(e){this.position.y=e}getPositionY(){return this.position.y}}},218:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(443));class r{constructor(e={}){this.renderer=new a.default;const{width:t,height:i,parent:s,scenes:o=[],fps:n}=e;r.SCanvas=document.querySelector(`#${s} canvas`),r.SCanvas.width=t,r.SCanvas.height=i,r.SCtx=r.SCanvas.getContext("2d"),o.length>0&&o.forEach((e=>r.SArrayScenes.push(new e))),this.init()}init(){r.SArrayScenes[0].active(),this.loop()}loop(){r.SArrayScenes[r.SIndexScenesVisible].update(),this.renderer.render(),window.requestAnimationFrame((()=>this.loop()))}}t.default=r,r.SFps=60,r.SArrayScenes=[],r.SIndexScenesVisible=0},195:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(602)),r=s(i(468)),o=s(i(967));class n extends o.default{constructor(){super(),this.isVisible=!1,this.nameAnimation="",this.key=Math.floor(Math.random()*Date.now()),this.indexFrame=0,this.timer=0,this.configAnimation={key:"",frameRate:60,frameInSpriteOfAnimation:[{key:"",sourcePosition:{x:0,y:0},sourceSize:{width:0,height:0}}],image:new Image}}getTimer(){return this.timer}setTimer(e){this.timer=e}getIndexFrame(){return this.indexFrame}setIndexFrame(e){this.configAnimation&&this.configAnimation.frameInSpriteOfAnimation.length>e&&(this.indexFrame=e)}getKey(){return this.key}setKey(e){this.key=e}getNameAnimation(){return this.nameAnimation}setNameAnimation(e){this.nameAnimation=e}setIsVisible(e){this.isVisible=e}getIsVisible(){return this.isVisible}play(e){if(this.nameAnimation!==e){this.isVisible=!1,this.indexFrame=0;let t=r.default.SArrayConfigAnimation.filter((t=>t.key===e));if(t[0]){let i=t[0].image;this.configAnimation=JSON.parse(JSON.stringify(t[0])),this.configAnimation.image=i,this.isVisible=!0,this.nameAnimation=e}}}destroy(){a.default.SArrayDrawImageAnimation=a.default.SArrayDrawImageAnimation.filter((e=>e.key!==this.key))}}t.default=n},521:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(602)),r=s(i(224)),o=s(i(967));class n extends o.default{constructor(){super(),this.key=Math.floor(Math.random()*Date.now()),this.nameImage="",this.image=new Image,this.isVisible=!1}setKey(e){this.key=e}getKey(){return this.key}setIsVisible(e){this.isVisible=e}getIsVisible(){return this.isVisible}setNameImage(e){this.nameImage=e}getNameImage(){return this.nameImage}setImage(e){"string"==typeof e?this.image.src=e:this.image=e}getImage(){return this.image}destroy(){a.default.SArrayDrawImage=a.default.SArrayDrawImage.filter((e=>e.key!==this.key))}changeImage(e){e!==this.nameImage&&r.default.SArrayImage.length>0&&r.default.SArrayImage.forEach((t=>{t.nameImage!==e||this.setImage(t.image)}))}}t.default=n},853:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(602)),r=s(i(224)),o=s(i(521));class n extends o.default{constructor(){super(),this.sourcePosition={x:0,y:0},this.sourceSize={width:0,height:0},this.frameInSprite=[]}setSourcePositionX(e){this.sourcePosition.x=e}changeImageSprite(e,t){r.default.SArraySpriteSheet.length>0&&r.default.SArraySpriteSheet.forEach((i=>{i.nameImage===e&&i.frameInSprite.forEach((e=>{e.key===t&&(this.setSourcePosition(e.sourcePosition.x,e.sourcePosition.y),this.setSourceSize(e.sourceSize.width,e.sourceSize.height),this.setImage(i.image))}))}))}setSourceHeight(e){this.sourceSize.height=e}getSourceHeight(){return this.sourceSize.height}setSourceWidth(e){this.sourceSize.width=e}getSourceWidth(){return this.sourceSize.width}setSourceSize(e,t){this.sourceSize={width:e,height:t}}getSourceSize(){return this.sourceSize}setSourcePosition(e,t){this.sourcePosition={x:e,y:t}}getSourcePosition(){return this.sourcePosition}getFrameInSprite(){return JSON.parse(JSON.stringify(this.frameInSprite))}setFrameInSprite(e){this.frameInSprite=JSON.parse(JSON.stringify(e))}destroy(){a.default.SArrayDrawImageFromSprite=a.default.SArrayDrawImageFromSprite.filter((e=>e.key!==this.key))}}t.default=n},311:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(218));t.default=class{constructor(){this.arrayEvent=[]}keydown(e,t){let i=i=>{i.key===e&&t()};window.document.addEventListener("keydown",i),this.arrayEvent.push({type:"keydown",function:i})}keyup(e,t){let i=i=>{i.key===e&&t()};window.document.addEventListener("keyup",i),this.arrayEvent.push({type:"keyup",function:i})}onClick(e){a.default.SCanvas.addEventListener("click",e),this.arrayEvent.push({type:"click",function:e})}destroy(){this.arrayEvent.length>0&&this.arrayEvent.forEach((e=>{"click"===e.type?a.default.SCanvas.removeEventListener(e.type,e.function,!1):window.document.removeEventListener(e.type,e.function,!1)}))}}},224:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(521)),r=s(i(853));class o{constructor(){}image(e,t){let i=new a.default;i.setNameImage(e),i.setImage(t),i.setKey(Math.floor(Math.random()*Date.now())),o.SArrayImage.push(i)}imageSprite(e,t,i){let s=new r.default;s.setNameImage(e),s.setImage(t),s.setFrameInSprite(i),s.setKey(Math.floor(Math.random()*Date.now())),o.SArraySpriteSheet.push(s)}addConfigImageSprite(e,t){o.SArraySpriteSheet.length>0&&o.SArraySpriteSheet.forEach((i=>{i.nameImage===e&&i.frameInSprite.push(...t)}))}}t.default=o,o.SArrayImage=[],o.SArraySpriteSheet=[]},443:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(218)),r=s(i(602)),o=s(i(891));t.default=class{constructor(){}render(){this.clearCtx(),this.drawImage(),this.drawImageFromSprite(),this.drawImageAnimation(),this.drawText(),this.drawShape()}drawImage(){r.default.SArrayDrawImage.length>0&&r.default.SArrayDrawImage.forEach((e=>{if(e.isVisible){let t=e.getImage(),{x:i,y:s}=e.getPosition(),r=e.getWidth(),o=e.getHeight();a.default.SCtx.beginPath(),a.default.SCtx.drawImage(t,i,s,r,o)}}))}drawImageFromSprite(){r.default.SArrayDrawImageFromSprite.length>0&&r.default.SArrayDrawImageFromSprite.forEach((e=>{if(e.isVisible){let t=e.getSourcePosition(),i=e.getSourceSize(),s=e.getPosition(),r=e.getSize(),o=e.getImage();a.default.SCtx.beginPath(),a.default.SCtx.drawImage(o,t.x,t.y,i.width,i.height,s.x,s.y,r.width,r.height)}}))}drawImageAnimation(){r.default.SArrayDrawImageAnimation.length>0&&r.default.SArrayDrawImageAnimation.forEach((e=>{if(e.isVisible){let t=e.getTimer(),i=e.getIndexFrame();t++,t>1e3/e.configAnimation.frameRate&&(t=0,e.configAnimation.frameInSpriteOfAnimation.length>1&&(i+1===e.configAnimation.frameInSpriteOfAnimation.length?e.setIndexFrame(0):e.setIndexFrame(i+1))),e.setTimer(t);let s=e.configAnimation.image,r=e.configAnimation.frameInSpriteOfAnimation[e.getIndexFrame()].sourcePosition,o=e.configAnimation.frameInSpriteOfAnimation[e.getIndexFrame()].sourceSize,n=e.getPosition(),h=e.getSize();a.default.SCtx.drawImage(s,r.x,r.y,o.width,o.height,n.x,n.y,h.width,h.height)}}))}drawText(){r.default.SArrayText.length>0&&r.default.SArrayText.forEach((e=>{let t=e.getText(),i=e.getFontSize(),s=e.getFontFamily(),{x:r,y:o}=e.getPosition();a.default.SCtx.beginPath(),a.default.SCtx.font=`${i}px ${s}`,a.default.SCtx.fillText(`${t}`,r,o)}))}drawShape(){r.default.SArrayShape.length>0&&r.default.SArrayShape.forEach((e=>{if(e instanceof o.default&&e.isVisible){let t=e.getPosition(),i=e.getSize();a.default.SCtx.beginPath(),a.default.SCtx.fillStyle=e.color,a.default.SCtx.fillRect(t.x,t.y,i.width,i.height),a.default.SCtx.fillStyle="#000"}}))}clearCtx(){a.default.SCtx.clearRect(0,0,a.default.SCanvas.width,a.default.SCanvas.height)}}},225:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(224)),r=s(i(602)),o=s(i(468)),n=s(i(311)),h=s(i(218));t.default=class{constructor(e=""){this.load=new a.default,this.add=new r.default,this.animation=new o.default,this.input=new n.default,this.idRequestAnimation=0,this.nameScenes=e,this.preload()}init(e){}active(){this.create()}preload(){}create(){}update(){}collectionDetection(e,t){if(e&&t){let i=e.getSize(),s=e.getPosition(),a=t.getSize(),r=t.getPosition();if(s.x<r.x+a.width&&s.x+i.width>r.x&&s.y<r.y+a.height&&s.y+i.height>r.y)return!0}return!1}changeScenes(e,t,i=!0){h.default.SArrayScenes.length>1&&h.default.SArrayScenes.forEach(((s,a)=>{if(s.nameScenes===e)return h.default.SIndexScenesVisible===a?void 0:(i&&(r.default.SArrayDrawImageAnimation=[],r.default.SArrayDrawImageFromSprite=[],r.default.SArrayDrawImage=[],r.default.SArrayShape=[],r.default.SArrayText=[],o.default.SArrayConfigAnimation=[]),h.default.SIndexScenesVisible=a,this.input.destroy(),t&&s.init(t),void s.active())}))}}},891:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(727));class r extends a.default{constructor(){super(),this.size={width:0,height:0},this.color="#fff",this.isFillReact=!1,this.isVisible=!1}setSize(e,t){this.size={width:e,height:t}}getSize(){return this.size}getColor(){return this.color}setColor(e){this.color=e}getIsFillReact(){return this.isFillReact}setIsFillReact(e){this.isFillReact=e}setIsVisible(e){this.isVisible=e}getIsVisible(){return this.isVisible}}t.default=r},727:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.position={x:0,y:0}}getPosition(){return this.position}setPosition(e,t){this.position={x:e,y:t}}setPositionX(e){this.position.x=e}getPositionX(){return this.position.x}setPositionY(e){this.position.y=e}getPositionY(){return this.position.y}}},30:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(602));t.default=class{constructor(){this.position={x:0,y:0},this.text="",this.fontFamily="Arial",this.fontSize=13,this.key=Math.floor(Math.random()*Date.now()),this.isVisible=!1}setKey(e){this.key=e}getKey(){return this.key}setPosition(e,t){this.position={x:e,y:t}}getPosition(){return this.position}setIsVisible(e){this.isVisible=e}getIsVisible(){return this.isVisible}setText(e){this.text=e}getText(){return this.text}setFontFamily(e){this.fontFamily=e}getFontFamily(){return this.fontFamily}setFontSize(e){this.fontSize=e}getFontSize(){return this.fontSize}destroy(){a.default.SArrayText=a.default.SArrayText.filter((e=>e.key===this.key))}}},384:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(853)),r=s(i(225)),o=s(i(891)),n=s(i(30));class h extends r.default{constructor(){super("over"),this.bgGameOver=new o.default,this.btnRestart=new a.default,this.txtGameOver=new a.default,this.textScore=new n.default,this.textHeightScore=new n.default,this.score=0,this.heightScore=0}init(e){this.score=e.score,this.heightScore=e.heightScore}preload(){this.load.addConfigImageSprite("mainSprite",[{key:"btnRestart",sourcePosition:{x:0,y:0},sourceSize:{width:75,height:70}},{key:"txtGameOver",sourcePosition:{x:955,y:25},sourceSize:{width:380,height:30}}])}create(){this.createBtnRestart(),this.txtGameOver=this.add.imageSprite(250,110,270,20,"mainSprite","txtGameOver"),this.createTextScore(),this.createTextHeightScore(),this.createEvent(),this.bgGameOver=this.add.rectangular(0,0,800,400,"rgba(0,0,0,.2)")}createBtnRestart(){this.btnRestart=this.add.imageSprite(350,150,70,60,"mainSprite","btnRestart")}createEvent(){this.input.onClick((e=>{e.offsetX>350&&e.offsetX<420&&e.offsetY>150&&e.offsetY<210&&this.changeScenes("start")}))}createTextScore(){this.textScore=this.add.text(300,250,`Score: ${this.score} `,"Arial",20)}createTextHeightScore(){this.textHeightScore=this.add.text(300,280,`Hight Score: ${this.heightScore}`,"Arial",20)}update(){}}t.default=h},819:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(225)),r=s(i(521)),o=s(i(30)),n=s(i(195));class h extends a.default{constructor(){super("play"),this.btnStart=new r.default,this.timer=0,this.velocity=-3,this.jumpVelocity=-13,this.textScore=new o.default,this.textHightScore=new o.default,this.heightScore=0,this.score=0,this.gameOver=!1,this.player=new n.default,this.maxCloud=6,this.arrCloud=[],this.obstaclesCactus=[],this.obstaclesPTerodactyl=[],this.arrGround=[],this.arrayUnitScore=[],this.arrayUnitHeightScore=[]}preload(){this.load.addConfigImageSprite("mainSprite",[{key:"run1",sourcePosition:{x:1511,y:0},sourceSize:{width:95,height:110}},{key:"run2",sourcePosition:{x:1599,y:0},sourceSize:{width:95,height:110}},{key:"duck1",sourcePosition:{x:1862,y:0},sourceSize:{width:120,height:90}},{key:"duck2",sourcePosition:{x:1982,y:0},sourceSize:{width:120,height:90}},{key:"jump",sourcePosition:{x:1335,y:0},sourceSize:{width:95,height:110}},{key:"die",sourcePosition:{x:1335,y:0},sourceSize:{width:95,height:110}}]),this.load.addConfigImageSprite("mainSprite",[{key:"cactusSmall",sourcePosition:{x:616,y:0},sourceSize:{width:34,height:70}},{key:"cactusLarge",sourcePosition:{x:650,y:0},sourceSize:{width:50,height:80}},{key:"PTerodactyl1",sourcePosition:{x:260,y:0},sourceSize:{width:90,height:70}},{key:"PTerodactyl2",sourcePosition:{x:350,y:0},sourceSize:{width:90,height:70}}]),this.load.addConfigImageSprite("mainSprite",[{key:"cloud",sourcePosition:{x:165,y:0},sourceSize:{width:100,height:30}}]),this.load.addConfigImageSprite("mainSprite",[{key:"numberZero",sourcePosition:{x:952,y:0},sourceSize:{width:20,height:25}},{key:"HI",sourcePosition:{x:1152,y:0},sourceSize:{width:40,height:25}}])}create(){this.createGround(),this.createPlayer(),this.createObstacles(),this.createHeightScore(),this.createScore(),this.createEvent()}createScore(){for(let e=0;e<5;e++)this.arrayUnitScore.push(this.add.imageSprite(700+20*e,20,15,15,"mainSprite","numberZero"))}createHeightScore(){console.log(this.heightScore),this.add.imageSprite(510,20,30,15,"mainSprite","HI");for(let e=0;e<5;e++)this.arrayUnitHeightScore.push(this.add.imageSprite(550+20*e,20,15,15,"mainSprite","numberZero"));this.updateUnit(this.heightScore,this.arrayUnitHeightScore)}createTextScore(){this.textScore=this.add.text(600,30,"Score: 0","Arial",20),this.textHightScore=this.add.text(600,60,`Hight Score: ${this.heightScore}`,"Arial",20)}createGround(){this.arrGround.push(this.add.imageSprite(0,320,1600,30,"mainSprite","ground")),this.arrGround.push(this.add.imageSprite(1600,320,1600,30,"mainSprite","ground"))}createPlayer(){this.player=this.add.spriteSheet(15,290,60,70),this.animation.create({key:"RunPlayer",frames:{nameImage:"mainSprite",frames:["run1","run2"]},frameRate:60}),this.animation.create({key:"DuckPlayer",frames:{nameImage:"mainSprite",frames:["duck1","duck2"]},frameRate:60}),this.animation.create({key:"JumpPlayer",frames:{nameImage:"mainSprite",frames:["jump"]},frameRate:60}),this.animation.create({key:"DiePlayer",frames:{nameImage:"mainSprite",frames:["die"]},frameRate:60}),this.player.play("RunPlayer")}createEvent(){this.input.keydown(" ",(()=>{"RunPlayer"===this.player.nameAnimation&&this.player.play("JumpPlayer")})),this.input.keydown("ArrowUp",(()=>{"RunPlayer"===this.player.nameAnimation&&this.player.play("JumpPlayer")})),this.input.keydown("ArrowDown",(()=>{"RunPlayer"===this.player.nameAnimation&&(this.player.getPosition().y=295,this.player.getSize().width=70,this.player.getSize().height=55,this.player.play("DuckPlayer"))})),this.input.keyup("ArrowDown",(()=>{"DuckPlayer"===this.player.nameAnimation&&(this.player.getPosition().y=290,this.player.getSize().width=60,this.player.getSize().height=70,this.player.play("RunPlayer"))}))}createObstacles(){this.animation.create({key:"PTerodactyl",frames:{nameImage:"mainSprite",frames:["PTerodactyl1","PTerodactyl2"]},frameRate:30}),this.animation.create({key:"PTerodactylOver",frames:{nameImage:"mainSprite",frames:["PTerodactyl1"]},frameRate:30})}update(){this.gameOver?this.updateOverGame():(this.updateGround(),this.updateObstacles(),this.updateCloud(),this.updatePlayerJump(),this.updateScoreValue(),this.updateUnit(this.score,this.arrayUnitScore),this.handleCollision())}updateHeightScore(){}updateUnit(e,t){let i=e.toString().split(""),s=i.length;for(let e=0;e<s-1;e++)t[e].setSourcePositionX(952);for(let e=5-s;e<5;e++)t[e].setSourcePositionX(952+20*parseInt(i[-5+e+s]))}updateOverGame(){this.updateHeightScoreValue(),this.changeScenes("over",{score:this.score,heightScore:this.heightScore},!1),this.gameOver=!1,this.arrCloud=[],this.arrGround=[],this.obstaclesPTerodactyl.length>0&&this.obstaclesPTerodactyl.forEach((e=>{e.play("PTerodactylOver")})),this.obstaclesPTerodactyl=[],this.obstaclesCactus=[],this.arrayUnitHeightScore=[],this.arrayUnitScore=[],this.score=0,this.timer=0}updateGround(){this.arrGround.length>0&&(this.arrGround[0].getPosition().x+=this.velocity,this.arrGround[1].getPosition().x+=this.velocity,this.arrGround[0].getPosition().x<-1600&&(this.arrGround[0].destroy(),this.arrGround.splice(0,1),this.arrGround.push(this.add.imageSprite(1600,320,1600,30,"mainSprite","ground"))))}updateHeightScoreValue(){this.heightScore=Math.max(this.heightScore,this.score),this.textHightScore.setText(`Hight Score: ${this.heightScore}`)}updateScoreValue(){this.timer++,this.timer>50&&(this.timer=0,this.score++,this.textScore.setText(`Score: ${this.score}`))}updateObstacles(){if(this.updatePositionObstacles(),this.getSumPositionAndWidthLastObstacles()+this.getRandom(300,600)<800)switch(this.getRandom(1,2)){case 1:1===this.getRandom(2,3)?this.obstaclesCactus.push(this.add.imageSprite(800,295,30,45,"mainSprite","cactusSmall")):this.obstaclesCactus.push(this.add.imageSprite(800,285,30,60,"mainSprite","cactusLarge"));break;case 2:let e=[290,265,240],t=this.getRandom(0,2);this.obstaclesPTerodactyl.push(this.add.spriteSheet(800,e[t],50,30)),this.obstaclesPTerodactyl[this.obstaclesPTerodactyl.length-1].play("PTerodactyl")}this.decreaseObstacles()}getSumPositionAndWidthLastObstacles(){let e=this.obstaclesCactus.length,t=this.obstaclesPTerodactyl.length;return e>0&&t>0?Math.max(this.obstaclesCactus[e-1].getPosition().x+this.obstaclesCactus[e-1].getSize().width,this.obstaclesPTerodactyl[t-1].getPosition().x+this.obstaclesPTerodactyl[t-1].getSize().width):e>0&&0===t?this.obstaclesCactus[e-1].getPosition().x+this.obstaclesCactus[e-1].getSize().width:0===e&&t>0?this.obstaclesPTerodactyl[t-1].getPosition().x+this.obstaclesPTerodactyl[t-1].getSize().width:0}decreaseObstacles(){this.obstaclesCactus.length>0&&this.obstaclesCactus[0].getPosition().x+this.obstaclesCactus[0].size.width<0&&(this.obstaclesCactus[0].destroy(),this.obstaclesCactus.splice(0,1)),this.obstaclesPTerodactyl.length>0&&this.obstaclesPTerodactyl[0].getPosition().x+this.obstaclesPTerodactyl[0].getSize().width<0&&(this.obstaclesPTerodactyl[0].destroy(),this.obstaclesPTerodactyl.splice(0,1))}updatePositionObstacles(){let e=this.obstaclesCactus.length,t=this.obstaclesPTerodactyl.length;e>0&&this.obstaclesCactus.forEach((e=>e.setPositionX(this.velocity+e.getPositionX()))),t>0&&this.obstaclesPTerodactyl.forEach((e=>e.setPositionX(this.velocity-1+e.getPositionX())))}updatePlayerJump(){"JumpPlayer"===this.player.getNameAnimation()&&(this.jumpVelocity+=.33,this.player.getPosition().y+=this.jumpVelocity,this.player.getPosition().y>290&&(this.jumpVelocity=-13,this.player.getPosition().y=290,this.player.play("RunPlayer")))}updateCloud(){if(this.arrCloud.length>0){if(this.arrCloud.forEach((e=>e.position.x+=this.velocity)),this.arrCloud.length<this.maxCloud&&this.arrCloud[this.arrCloud.length-1].position.x+this.arrCloud[this.arrCloud.length-1].size.width<this.getRandom(500,800)){let e=this.getRandom(40,100),t=this.getRandom(40,250),i=this.add.imageSprite(800,t,e,e/1.5,"mainSprite","cloud");this.arrCloud.push(i)}this.arrCloud[0].position.x+this.arrCloud[0].size.width<0&&(this.arrCloud[0].destroy(),this.arrCloud.splice(0,1))}else{let e=this.getRandom(40,100),t=this.getRandom(40,250),i=this.add.imageSprite(800,t,e,e/1.5,"mainSprite","cloud");this.arrCloud.push(i)}}handleCollision(){this.obstaclesCactus.length>0&&this.collectionDetection(this.player,this.obstaclesCactus[0])&&(this.gameOver=!0,this.player.play("DiePlayer")),this.obstaclesPTerodactyl.length>0&&this.collectionDetection(this.player,this.obstaclesPTerodactyl[0])&&(this.gameOver=!0,this.player.play("DiePlayer"))}getRandom(e,t){return Math.floor(Math.random()*(t-e+1))+e}}t.default=h},552:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(225));class r extends a.default{constructor(){super("start"),this.onClickStart=e=>this.handleClickStart(e)}preload(){this.load.image("btnStart","./assets/PlayButton.png"),this.load.imageSprite("mainSprite","./assets/sprite.png",[{key:"ground",sourcePosition:{x:0,y:100},sourceSize:{width:2400,height:30}},{key:"dinos",sourcePosition:{x:75,y:0},sourceSize:{width:100,height:110}}])}create(){this.add.image(350,150,100,100,"btnStart"),this.add.text(320,270,"Click to start","Arial",30),this.add.imageSprite(0,320,1600,30,"mainSprite","ground"),this.add.imageSprite(15,282,60,70,"mainSprite","dinos"),this.input.onClick(this.onClickStart)}handleClickStart(e){e.offsetX>350&&e.offsetX<450&&e.offsetY>150&&e.offsetY<250&&this.changeScenes("play")}}t.default=r},731:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0;const a=s(i(552)),r=s(i(819)),o=s(i(384));let n={width:800,height:400,parent:"parentCanvas",fps:60,scenes:[a.default,r.default,o.default]};t.config=n},607:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(i(218)),r=i(731);new a.default(r.config)}},t={};!function i(s){var a=t[s];if(void 0!==a)return a.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,i),r.exports}(607)})();