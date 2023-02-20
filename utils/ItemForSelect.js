
async function ItemForSelect(arr, itemDb, newData){
    function findData(val, arr){
        return arr.find(i => i[newData] === val)
    }
    let list = []
    const includeData = await arr?.map((item, index)=> {
        findData(item[itemDb], list) === undefined 
        ? list.push({key: index, [newData]: item[itemDb]}) : null})
    return list
}

module.exports = ItemForSelect