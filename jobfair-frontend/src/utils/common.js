export const contains = (list, listCurrent) => {
  var result = false;
  list.forEach((e) => {
    if (listCurrent?.includes(e) === true) {
      result = true;
      return;
    }
  });
  return result;
};

export const transformToSelections = (data) => {
  if (!data) return null;
  if (Array.isArray(data) && !data.length) return null;

  if (Array.isArray(data)) {
    return data.map((item) => toSelection(item));
  }

  return [toSelection(data)];
};

const toSelection = (data) => {
  if (data?.user) {
    return { value: data.user?.id, label: data.user?.email };
  }

  return { value: data?.id, label: data?.name };
};
function parseNode(node) {
  function parse(node) {
    const object = {};
    object["geometry"] = node.attributes["geometry"]?.value;
    object["material"] = node.attributes["material"]?.value;
    object["position"] = eval(node.attributes["position"]?.value);
    object["rotation"] = eval(node.attributes["rotation"]?.value);
    object["scale"] = eval(node.attributes["scale"]?.value);
    return object;
  }

  if (node.children.length === 0) {
    const object = parse(node);
    object["children"] = null;
    return object;
  }
  const children = [];
  for (let childNode of node.children) {
    const result = parseNode(childNode);
    children.push(result);
  }
  const object = parse(node);
  object["children"] = children;
  return object;
}
export const parseText = (text) => {
  let pre_process_text = text.replaceAll("{", "'").replaceAll("}", "'");
  pre_process_text = `<root> ${pre_process_text} </root>`;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(pre_process_text, "text/xml");
  const result = [];
  for (let node of xmlDoc.children[0].children) {
    const nodeObject = parseNode(node);
    result.push(nodeObject);
  }
  console.log(result);
  return result;
};
