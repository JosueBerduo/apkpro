// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state("inicio",{
    url: '/inicio',
    templateUrl:'templates/inicio.html'
  })
  .state("adn",{
    url: '/adn',
    templateUrl:'templates/adn.html'
  })
  .state("agua",{
    url: '/agua',
    templateUrl:'templates/agua.html'
  })
  .state("video",{
    url: '/video',
    templateUrl:'templates/video.html'
  })
  .state("login",{
    url: '/login',
    templateUrl:'templates/login.html'
  })
  .state("registro",{
    url: '/registro',
    templateUrl:'templates/registro.html'
  })
  .state("nutricion",{
    url: '/nutricion',
    templateUrl:'templates/nutricion.html'
  })
  .state("info",{
    url: '/info',
    templateUrl:'templates/info.html'
  })
  .state("memoria",{
    url: '/memoria',
    templateUrl:'templates/memoria.html'
    }) 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
const NUM_MAX_CARDS = 8
const NUM_TUPLE     = 2 

const Cards = [[1,
   {
    id:1,  
    source: "https://mejorconsalud.com/wp-content/uploads/2018/02/Qu%C3%A9-alimentos-tienen-mayor-porcentaje-de-vitaminas.jpg"
  }],[2,

  {
    id:2,             source:"http://2.bp.blogspot.com/-kQ2INU9YZ8w/VSaeCq871oI/AAAAAAAAGHA/A0JnaTkkZtw/s1600/biologia.jpg",
  }],[3,
  
  {
    id:3,   
 source:"https://www.kernpharma.com/sites/default/files/styles/blog_full/public/blog/Vitaminas%20esenciales%20A%2C%20C%20y%20E.jpg?itok=VEzRibN2",
  }],[4,
  
  {
    id:4,      source:"https://unisima.com/wp-content/uploads/2016/10/vitaminas-esenciales.jpg",
  }],[5,
  
  {
    id:5,      source:"https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/05/frutas01.jpg",
  }], [6,
  
  {
    id:6,      source:"https://thumb7.shutterstock.com/display_pic_with_logo/695143/357914384/stock-vector-set-of-vector-doodle-cute-cats-avatars-357914384.jpg",
  }  ]
]

class Card {
  constructor(id, sourceFront) {
    
    this.liCard = this.renderCard(id)
    
    this.back = this.liCard.querySelector(".card-back")
    this.front = this.liCard.querySelector(".card-front")
    this.sourceFront = sourceFront
    
    this.isBack = true
    this.enabled = true
  }  
  
  flip(){
    if(this.enabled == true) {
      this.front.src = this.sourceFront
      this.back.classList.toggle("card-back-flip")
      this.front.classList.toggle("card-front-flip")      
      this.enabled = false
      this.isBack = false
      return true;
    }
    return false;
  }
  
  cover(){
    this.enabled = true
    this.isBack = true
    this.back.classList.toggle("card-back-flip")
    this.front.classList.toggle("card-front-flip")            
    this.front.src = this.back.src
  }
  
  say(say){
    this.front.classList.toggle("card-front-" + say)
  }
  
  renderCard(id) {
    const src = "https://media.tenor.com/images/ef2b68306eec03a5b50e4b32d7429599/tenor.gif"
    let cardBack = document.createElement('img')
    cardBack.className = "card-back" 
    cardBack.src = src

    let cardFront = document.createElement('img')
    cardFront.className = "card-front"
    cardFront.src = src

    let divCard = document.createElement('div')
    divCard.className = "card"
    divCard.appendChild(cardBack)
    divCard.insertBefore(cardFront, cardBack)

    let li = document.createElement('li')
    li.id = "card" + id
    li.className = "flex-item"
    li.appendChild(divCard)  

    return li
  }  
}

class Game{  
  constructor(onEndGame, elCanvas) {
    this.cards = new Map()
    this.cardsSelected = new Array()
    this.onEndGame = onEndGame.bind(this)
    this.numTuplesOK = 0
    this.numClicks = 0
    this.resultArray = ["ʘ‿ʘ Excelent!", "(´･_･`) Not bad", "¯\\_(ツ)_/¯ Bad "]
    this.elCanvas = elCanvas
    this.shuffleNum = [];
  }
  
  init(){
    let cardsMap = new Map(Cards);
    this.shuffle()
    this.cleanCanvas()
    
    for(let i=0; i<this.shuffleNum.length; i++){
      let num = (this.shuffleNum[i] % (NUM_MAX_CARDS/NUM_TUPLE)) +1    
      let card = cardsMap.get(num)
      let cardg = new Card(i, card.source)
      this.addCard(i, cardg)    
    }    
  }
  
  addCard(id, card){
    card.liCard.addEventListener('click',  this.onClick.bind(this, card))
    this.cards.set(id, card)
    this.elCanvas.appendChild(card.liCard)
  }

  onClick(card){          
    let flip = false
    if(this.cardsSelected.length < NUM_TUPLE){
      if (card.flip()){
        this.cardsSelected.push(card)      
        this.numClicks++
      }
      if(this.cardsSelected.length == NUM_TUPLE ){          
        this.enabledCards(false)
        if(!this.checkTupla()){
          setTimeout(()=>this.coverCards(), 1700)
          this.cardsSay("no", 1500)
          setTimeout(()=>this.enabledCards(true), 2000)
          setTimeout(()=>{this.cardsSelected = new Array()}, 2000)            
        }
        else{
          setTimeout(()=>this.enabledCards(true), 800)
          this.cardsSay("yes", 600)          
          setTimeout(()=>{this.cardsSelected = new Array()}, 700)
          
          this.numTuplesOK++
          if(this.numTuplesOK === NUM_MAX_CARDS / NUM_TUPLE)
            setTimeout(()=>{this.endGame()}, 1000)                                  
        }
      }      
    }    
  }    
  
  checkTupla(){
    if(this.cardsSelected.length > 0){
      let srcFilter = this.cardsSelected[0].sourceFront 
      let ce = this.cardsSelected.filter(card=> card.sourceFront ===  srcFilter)
      return ce.length === this.cardsSelected.length
    }
    return false
  }
  
  
  cardsSay(say, delay){
    this.cardsSelected.forEach(function(card) {   
      setTimeout(()=> card.say(say), delay - 350)
      setTimeout(()=> card.say(say), delay)            
    })   
  }
  
  coverCards(){
    this.cardsSelected.forEach(function(card){        
      card.cover()
    })           
  }
  
  enabledCards(value){
    this.cards.forEach(function(card) {  
      if(card.isBack)
        card.enabled = value
    })       
  }
  
  endGame(){
    let numClicksMin = NUM_MAX_CARDS
    let resultIndex = this.resultArray.length - 1
    
    if(this.numClicks === numClicksMin)
      resultIndex = 0
    
    if(this.numClicks > numClicksMin && this.numClicks <= numClicksMin * 2 )
      resultIndex = 1
    
    if(this.numClicks >= numClicksMin * 2 )
      resultIndex = 2
        
    this.onEndGame( this.resultArray[resultIndex], this.numClicks)
  }
  
  cleanCanvas(){
    while (this.elCanvas.firstChild) {
      this.elCanvas.removeChild(this.elCanvas.firstChild);
    }    
  }
  
  randomNum(min, max) { return Math.round(Math.random() * (max - min) + min) }

  shuffle(){
    this.shuffleNum = [];
    for(var i=0; i<NUM_MAX_CARDS; i++) {
      var num = this.randomNum(1,NUM_MAX_CARDS);
      console.log(num)
      if(this.shuffleNum.indexOf(num) >= 0) {
          i = i-1;
      } else {
            this.shuffleNum[i] = num;
      }
    }
  }  
}


function startGame(){
  let cards = document.getElementById("cards");
  let game = new Game(endGame, cards)
  game.init()
}

function playNow(){
  land.classList.toggle("land-hide");
  startGame();
}

function playAgain(){
  result.classList.toggle("land-hide");
  startGame();
}

function endGame(resultGame, score){  
  document.getElementById('result-msg').innerHTML = resultGame + " - " + score + " Clicks";  
  result.classList.toggle("land-hide");  
}
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
}

let h, newY;

function draw() {
  //clean canvas
  background('#111');
  translate(-20, height / 2);
  
  
  for(let i = 0; i < width;) {
    strokeWeight(2);
    //set. color depending on i value
    h = floor(map(i * 5, 0, width, 0, 359));
    stroke(color('hsl(' + h + ', 100%, 50%)'));
    
    //newY = sin(i + asin(millis()/1000) / 0.5) * 100;
    newY = sin(i + millis()/200) * 100;
    
    //draw connectors
    beginShape();
      vertex(0, 0);
      translate(15, newY);
      vertex(15, -newY);
    endShape(CLOSE)
    
    //draw dots
    strokeWeight(30);
    point(0, 0);
    i += 3;
  }

}

/**
 *
 * @param {*} startPhase phase de début en x
 * @param {*} yPos position de l'helice en y
 */
function adn(startPhase, yPos, colorLink = '#FFFFFF') {
  const angleSin = Math.sin(angle + startPhase);
  const angleCos = Math.cos(angle + startPhase);
  const xPos1 = angleSin * xMax;
  const xPos2 = -angleSin * xMax;
  const yPos1 = angleCos * 10 + yPos;
  const yPos2 = -angleCos * 10 + yPos;
  // Création des liens entre les cercles
  ctx.beginPath();
  ctx.strokeStyle = colorLink;
  ctx.lineWidth = 3;
  ctx.moveTo(xPos1 + xCenter, yPos1 + yStart);
  ctx.lineTo(xPos2 + xCenter, yPos2 + yStart);
  ctx.stroke();
  // On fait passer le cercle le plus loin derrière
  if (angleCos < 0) {
    drawADN(xPos1, yPos1, angleCos, 11342935);
    drawADN(xPos2, yPos2, -angleCos, 1668818);
  } else {
    drawADN(xPos2, yPos2, -angleCos, 1668818);
    drawADN(xPos1, yPos1, angleCos, 11342935);
  }
  return {
    xPos1, yPos1, xPos2, yPos2,
  };
}
/**
 * @param {*} xAngle position en x du cercle
 * @param {*} yAngle position en y du cercle
 * @param {*} radius largeur du cercle
 * @param {*} color couleur du cercle
 */
function drawADN(xPos, yPos, radius, color) {
  ctx.fillStyle = `#${(color).toString(16)}`;
  ctx.beginPath();
  ctx.arc(
    xPos + xCenter,
    yPos + yStart,
    10 + (radius * 3),
    0,
    2 * Math.PI,
  );
  ctx.closePath();
  ctx.fill();
}

render();


