const { newData, updateData, removeData, getData } = require("../services/data");
const pagination = require("../utils/pagination");
const filterTasks = require("../utils/filterTasks");
const ItemForSelect = require("../utils/ItemForSelect")

let los = [];
getData("/lo").then((res) => (los = res));

module.exports = {
    Query: {
        los(_, args) {
            async function filterList() {
                const filter = await filterTasks(los, args);
                return pagination(filter, args.page, 5);
            }
            return filterList();
        },
        loItemsFilter(_, args){            
            async function listItemsFilter() {
                const arr = await filterTasks(los, args)
                const year = ItemForSelect(arr, "ano", "year")
                const responsible = ItemForSelect(arr, "responsavel", "responsible")
                const company = ItemForSelect(arr, "empresa", "company")
                const month = ItemForSelect(arr, "mes", "month")

               return (await year).concat(await responsible).concat(await company).concat(await month)
            }
            return listItemsFilter()
        }
    },
    Mutation: {
        newLo(_, args){
            return newData("/lo", args)
        },
        updateLo(_, args){
            return updateData("/lo", args)
        },
        removeLo(_, args){
            return removeData("/lo", args)
        }
    }
}
