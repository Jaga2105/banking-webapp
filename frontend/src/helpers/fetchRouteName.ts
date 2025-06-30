export const fetchRouteName = (path:string) =>{
    let formattedRouteName;
    if(path==="car-loan" || path==="home-loan"){
        formattedRouteName="loans"
    }else if(path==="electricityBill" || path==="mobileRecharge"){
        formattedRouteName="billPayments"
    }else{
        formattedRouteName=path;
    }
    return formattedRouteName;
}