export default class jsFunctions{
    static prepareReportSum(obj){
    //Prepares sum data for report from obj dataset
        let reportObj = [];

        obj.forEach(obj => {
            let prepData = [];
            const picked = (({ orders }) => ({ orders }))(obj);
            const pickedFin = (({ orders }) => (Object.values(orders)))(picked);

            pickedFin.forEach(pic => {
                pic.data.forEach(fin => {
                    prepData.push(fin);
                })
            });

            const myData = prepData;

            // Calculate the sums and group data (while tracking count)
            const reduced = myData.reduce((m, d) => {
                if(!m[d.code]){
                    m[d.code] = {...d, count: 1};
                    return m;
                }
                    m[d.code].total += d.total;
                    return m;
            }, {});
            
            // Create new array from grouped data and compute the average
            const result = Object.keys(reduced).map((k) => {
                const item  = reduced[k];
                return {
                    code: item.code,
                    product: item.product,
                    total: item.total,
                }
            });
            
            let finObj = 
                {
                    "id" : obj.id,
                    "name" : obj.name,
                    dataSet : result
                };

            reportObj.push(finObj);
        });

        return reportObj;
    };

/* ******************************************************************************************* */
    static partnerOptions(dataSet, activePartners){
        let activePart = activePartners || false;
        let options = [];

        dataSet.forEach(data => {
            if (activePart == false || data.active == activePart) {
                options.push({id: data.id, name: data.name});
            };
        });

        return options;
    };
/* ******************************************************************************************* */
    static productOptions(dataSet){
        let optionsFull = [];
        let optionsUnique = [];

        dataSet.forEach(data => (
            data.orders.forEach(order => (
                order.data.forEach(product => (
                    optionsFull.push({code: product.code, product: product.product})
                ))
            ))
        ));

        optionsUnique = Array.from(
            new Set(optionsFull.map(prod => prod.code))
        ).map(code => {
            return {code: code, product: optionsFull.find(prod => prod.code === code).product};
        });
        
        return optionsUnique;
    };
    
/* ******************************************************************************************* */
    static productOptionsByPartner(allData, partnerId){
    // product filter by partner id
        let partnerProducts = allData.filter(data => data.id == partnerId);
        let productList = [];        
        
        partnerProducts[0].orders.forEach(order =>{
            order.data.forEach(product => {
                let productObj = { code: product.code, product: product.product }
                let newProduct = true;

                for (let i = 0; i < productList.length; i++) {
                    if (productList[i].code == product.code && productList.length !== 0) {
                        newProduct = false;
                        break;
                    };
                };

                if (newProduct) {
                    productList.push(productObj);
                };
            });
        });

        return productList;
    };
    
/* ******************************************************************************************* */
    static filterObj(data, filters){
    // filter logic for report dataset preparation
        let dataSet = [];

        data.forEach(partner => {
        //partner id filter
            if(filters.partner == null || partner.id == filters.partner.id){
                let partnerTemp = {
                    id: partner.id,
                    name: partner.name,
                    active: partner.active,
                    orders: []
                };
                
                partner.orders.forEach(order => {

                        let orderTemp = {
                            id_ord: order.id_ord,
                            date: order.date,
                            data: []
                        };

                        order.data.forEach(product => {
                        //product code filter
                            if (filters.product == null || product.code == filters.product.code) {
                                orderTemp.data.push(product);
                            }
                        });

                   partnerTemp.orders.push(orderTemp);
                });

                dataSet.push(partnerTemp);
            };
        });
        
        return dataSet;
    };
    
/* ******************************************************************************************* */
    isNullOrEmpty(val){
        let result = false;
        var acceptable = {"undefined": 1, "boolean": 1, "object": 1};
        
        if(!val && acceptable[typeof val]){
            result = !result;
        };

        return result;
    };
    
/* ******************************************************************************************* */
    static stringToDate(val, delimiter){
        if (val == null) {
            return;
        };

        let parts = val.split(delimiter);
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    };
    
/* ******************************************************************************************* */
    getInitials(name){
    // Function returns initials for partners
        var names = name.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
            if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }
    
/* ******************************************************************************************* */
    getNewPartnerId(dbObjAll){
        let partnerCount = (dbObjAll.length + 1).toString();
        let newId = "00000" + partnerCount;
        newId = newId.slice(partnerCount.length);
        return newId;
    }
};