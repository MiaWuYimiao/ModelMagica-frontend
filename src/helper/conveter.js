function getDispName(fullname) {
    var result;
    if (fullname) {
        result = fullname.split('-').map(string => (string.charAt(0).toUpperCase() + string.slice(1)))
        result = result.join(' ')
    }
    return result;
}

function getDispDate(date) {
    var result;
    if(date) {
        result = date.slice(0,10).split('-').join("/");
    }
    return result;
}

function nFormatter(num, digits = 1) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
  

export { getDispName, getDispDate, nFormatter }