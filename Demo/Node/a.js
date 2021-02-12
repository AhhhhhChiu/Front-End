const obj = {
  a: 1,
};
const objChange = () => {
  obj.a = 2;
};
let count = 1;
const countChange = () => {
  count += 1;
};

module.exports = {
  obj,
  objChange,
  count,
  countChange,
};