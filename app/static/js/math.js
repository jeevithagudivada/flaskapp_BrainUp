(function(){
  var game = {
    points: 0,
    question: false,
    answers: false,
    solution: false,
    init: function() {
      this.cache()
      this.bindEvents()
      this.generateQuestion()
      this.generateAnswers()
      this.render()
    },
    cache: function() {
      this.q = document.getElementsByClassName('question')[0]
      this.a = document.getElementsByClassName('answers')[0]
      this.li = this.a.getElementsByTagName('li')
      this.total = document.getElementsByClassName('points')[0]
    },
    bindEvents: function() {
     this.a.addEventListener('click', this.handleClicks.bind(this))
    },
    render: function() {
      this.q.textContent = this.question
      for (var i = 0; i < this.answers.length; i++) {
        this.li[i].textContent = this.answers[i]
      }
      this.total.textContent = this.points
    },
    handleClicks: function(event) {
      if (+event.target.textContent === this.solution) {
        this.points += 1
        for (var i = 0; i < this.li.length; i++) {
          this.li[i].classList.remove('wrong')
        }
        this.generateQuestion()
        this.generateAnswers()
        this.render()
      }
      else {
        event.target.classList.add('wrong')
        this.points -= 1
        this.render()
      }
    },
    // @todo: Add levels
    generateQuestion: function() {
      var a = this.random(0, 100)
      var b = this.random(0, 100)
      var op = ['+', '-', '*'][this.random(0, 2)]
      this.question = a + ' ' + op + ' ' + b + ' '
      this.solution = eval(this.question)
    },
    generateAnswers: function() {
      var answers = [
        this.solution,
        this.random(0, 10),
        this.random(75, 15),
        this.random(20, 90)
      ];
      this.answers = this.shuffle(answers)
    },
    shuffle: function(array) {
      return array.sort(function() {
        return 0.5 - Math.random()
      })
    },
    // updatePoints: function() {
    //   this.p.textContent = this.points
    // },
    // checkAnswer: function(event) {
    //   return 
    // },
    random: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
  game.init()
})()