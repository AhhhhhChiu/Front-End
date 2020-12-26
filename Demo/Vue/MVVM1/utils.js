const isElemNode = (node) => {
  return node.nodeType === 1;
}

const update = {
  model(node, data) {

  }
}

const getValue = (exp, data) => {
  const [firstKey, ...keys] = exp.split('.');
  let val = data[firstKey];
  keys.forEach((key) => {
    val = val[key];
  })
  return val;
}
