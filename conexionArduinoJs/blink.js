const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  console.log('Board is ready!');
  // Now you can interact with the board using Johnny-Five APIs
});