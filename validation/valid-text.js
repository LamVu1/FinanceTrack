// const validText = function(str){
//     return typeof str === 'string' && str.trim().length>0;
// }

// module.exports = validText();

const validText = str => {
    return typeof str === 'string' && str.trim().length > 0;
  }
  
  module.exports = validText;