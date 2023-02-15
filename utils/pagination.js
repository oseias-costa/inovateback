async function pagination(arr, page, itens) {
  const endItem = itens * page;
  const startItem = endItem - itens;
  const newPage = await arr.slice(startItem, endItem);
  return await newPage;
}

module.exports = pagination;
