async function filterTasks(arr, args) {
  function argsVerify(arg) {
    return args[arg] || "";
  }

  const filtered = await arr.filter((item) => {
    const filterList =
      item.realizado.includes(argsVerify("status")) &&
      item.empresa.includes(argsVerify("company")) &&
      item.responsavel.includes(argsVerify("responsible")) &&
      item.mes.includes(argsVerify("month")) &&
      item.ano.toString().includes(argsVerify("year")) &&
      item.frequencia.includes(argsVerify("frequency"));
    return filterList;
  });
  return await filtered;
}

module.exports = filterTasks;
