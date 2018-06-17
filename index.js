const v = _ => {
  console.log(`version 0.0.1`);
};
const create = function() {
  console.log(arguments);
};
const arg = process.argv;
create("arg");
console.log(arg);
module.exports = create;
