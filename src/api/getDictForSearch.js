import {getAction} from "@api/manage";

let timeout;
let currentValue;

export function fetch(value1, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value1;
    let dataMsg = []

    function fake() {
        getAction("/sys/api/queryAllDict").then((res) => {
            for (let axiosResponseKey in res) {
                if ((res[axiosResponseKey].value).indexOf(currentValue) !== -1) {
                    dataMsg.push({
                        value: res[axiosResponseKey].value, text: res[axiosResponseKey].text
                    })
                }
            }
        });
        return dataMsg;
    }

    // timeout = setTimeout(fake, 300);
    return fake();
}


export function getDictDtl(dictName) {
    return getAction("/sys/api/queryEnableDictItemsByCode", {"code": dictName}).then(res => {
        return res
    })
}
