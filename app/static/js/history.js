FastClick.attach(document.body);

var wordsToFind = $('#list li').length,
    colors = ['red', 'green', 'yellow', 'blue', 'purple'],
    found = 0,
    clicking = false;

$('#restart').click(function() {
  $('.box').attr('class', 'box');
  $('#list li').removeClass('found');
  $('#restart').hide();
  found = 0;
});

$('#grid').mousedown(function(){
    clicking = true;
});

$('#grid').mouseup(function(){
  clicking = false;
  $('.box').removeClass('highlight');
})

$('.box').mouseover().mouseout(function() {
  if(clicking){
  // Toggle highlight to box on click
  $(this).toggleClass('highlight');
  var word = $(this).attr('data-word'), // Get word attribute from clicked box.
    wordLen = word.length, // How long is the word.
    $box = $('.box[data-word="' + word + '"]'); // Get all box's with word attribute.
  if ($('.box[data-word="' + word + '"].highlight').length == wordLen) {
    // Word is fully highlighted, remove highlight and add class fount-colorArray
    $box.removeClass('highlight').addClass('found-' + colors[found]);
    // Add found class to the list item that contains "word"
    $('li:contains("' + word + '")').addClass('found');
    $('.box').removeClass('highlight');
    found++;
  }
  console.log(found + ' - ' + wordsToFind);
  if (found == wordsToFind) {
    alert('Winner!');
    $('#restart').show();
  }
  }
});