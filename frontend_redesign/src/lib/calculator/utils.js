// src/utils/utils.js
import { SANCTIONED_JP_SHIPPING } from "./constants.js";


export const getRecyclingFee = (engineVolume, age, enginePower, isPersonal = true) => {
    
     if (engineVolume <= 2000) {
        if (enginePower < 160){
            return age === 'new' ? 3400 : 5200;
        }
        else if (enginePower <= 190) {
            return age === 'new' ? 750000 : 1244000;
        }
        else if (enginePower <= 220) {
            return age === 'new' ? 794000 : 1320000;
        }
        else if (enginePower <= 250) {
            return age === 'new' ? 842000 : 1398000;
        }
        else if (enginePower <= 280) {
            return age === 'new' ? 952000 : 1532000;
        }
        else if (enginePower <= 310) {
            return age === 'new' ? 1076000 : 1676000;
        }
        else if (enginePower <= 340) {
            return age === 'new' ? 1216000 : 1836000;
        }   
    }
    
     else if (engineVolume > 2000 && engineVolume <= 3000) {
        if (enginePower < 160){
            return age === 'new' ? 3400 : 5200;
        }
        else if (enginePower <= 190) {
            return age === 'new' ? 1922200 : 2880000;
        }
        else if (enginePower <= 220) {
            return age === 'new' ? 1970000 : 2940000;
        }
        else if (enginePower <= 250) {
            return age === 'new' ? 2002000 : 2960000;
        }
        else if (enginePower <= 280) {
            return age === 'new' ? 2120000 : 3050000;
        }
        else if (enginePower <= 310) {
            return age === 'new' ? 2184000 : 3120000;
        }
        else if (enginePower <= 340) {
            return age === 'new' ? 2272000 : 3228000;
        }   
        else if (enginePower <= 370) {
            return age === 'new' ? 2362000 : 3318000;
        }   
        else if (enginePower <= 400) {
            return age === 'new' ? 2452000 : 3412000;
        } 
        else if (enginePower <= 425) {
            return age === 'new' ? 2556000 : 3508000;
        }  
        else if (enginePower <= 455) {
            return age === 'new' ? 2658000 : 3606000;
        }  
        else if (enginePower <= 500) {
            return age === 'new' ? 2764000 : 3706000;
        }  
        else if (enginePower > 500) {
            return age === 'new' ? 2874000 : 3810000;
        }     
    }
    else if (engineVolume > 3000 && engineVolume <= 3500) {
        if (enginePower < 160){
            return age === 'new' ? 3400 : 5200;
        }
        else if (enginePower <= 190) {
            return age === 'new' ? 2196000 : 3334000;
        }
        else if (enginePower <= 220) {
            return age === 'new' ? 2240000 : 3370000;
        }
        else if (enginePower <= 250) {
            return age === 'new' ? 2286000 : 3406000;
        }
        else if (enginePower <= 280) {
            return age === 'new' ? 2342000 : 3456000;
        }
        else if (enginePower <= 310) {
            return age === 'new' ? 2420000 : 3540000;
        }
        else if (enginePower <= 340) {
            return age === 'new' ? 2532000 : 3630000;
        }   
        else if (enginePower <= 370) {
            return age === 'new' ? 2672000 : 3738000;
        }   
        else if (enginePower <= 400) {
            return age === 'new' ? 2820000 : 3850000;
        }  
        else if (enginePower <= 425) {
            return age === 'new' ? 2974000 : 3966000;
        }  
        else if (enginePower <= 455) {
            return age === 'new' ? 3138000 : 4084000;
        }  
        else if (enginePower <= 500) {
            return age === 'new' ? 3310000 : 4208000;
        }  
        else if (enginePower > 500) {
            return age === 'new' ? 3492000 : 4334000;
        }   
    }
    // больше 3.5 л
    else {
        if (enginePower < 160){
            return age === 'new' ? 3400 : 5200;
        }
        else if (enginePower <= 190) {
            return age === 'new' ? 2788000 : 3658000;
        }
        else if (enginePower <= 220) {
            return age === 'new' ? 2836000 : 3714000;
        }
        else if (enginePower <= 250) {
            return age === 'new' ? 2884000 : 3770000;
        }
        else if (enginePower <= 280) {
            return age === 'new' ? 2942000 : 3856000;
        }
        else if (enginePower <= 310) {
            return age === 'new' ? 3000000 : 3944000;
        }
        else if (enginePower <= 340) {
            return age === 'new' ? 3106000 : 4160000;
        }   
        else if (enginePower <= 370) {
            return age === 'new' ? 3214600 : 4390000;
        }   
        else if (enginePower <= 400) {
            return age === 'new' ? 3348000 : 4632000;
        }  
        else if (enginePower <= 425) {
            return age === 'new' ? 3444000 : 4886000;
        }  
        else if (enginePower <= 455) {
            return age === 'new' ? 3564000 : 5156000;
        }  
        else if (enginePower <= 500) {
            return age === 'new' ? 3688000 : 5440000;
        }  
        else if (enginePower > 500) {
            return age === 'new' ? 3818000 : 5738000;
        }   
    }

};


export const calculateSanctionedJPShipping = (priceJPY, rates) => {
    const entry = SANCTIONED_JP_SHIPPING.find(
        ({ priceRange }) => priceJPY >= priceRange[0] && priceJPY <= priceRange[1]
    );

    if (entry) {
        return { fob: entry.fob + 300, freight: entry.freight };
    }
    const fob = (priceJPY * (rates.JPY / rates.USD) * 0.03) + 1300;
    return { fob, freight: 2500 };
};


export const calculateShippingCost = (countryInfo, priceInCurrency, rates) => {
    if (countryInfo.sanctioned) {
        const { fob, freight } = calculateSanctionedJPShipping(priceInCurrency, rates);
        // console.log(priceInCurrency)
        const totalUSD = fob + freight;
        // const totalUSD = 100000000000;
        return {
            costRub: totalUSD * rates.USD,
            originalCost: { amount: totalUSD, currency: 'USD' }
        };
    }

    const { amount, currency } = countryInfo.shippingCosts;
    return {
        costRub: amount * rates[currency],
        originalCost: { amount, currency }
    };
};

export const calculateCustomsDuty = (priceEur, volumeCc, age) => {
    if (age === 'new') {
        if (priceEur <= 8500) {
            return Math.max(volumeCc * 2.5, priceEur * 0.54);
        } else if (priceEur <= 16700) {
            return Math.max(volumeCc * 3.5, priceEur * 0.48);
        } else if (priceEur <= 42300) {
            return Math.max(volumeCc * 5.5, priceEur * 0.48);
        } else if (priceEur <= 84500) {
            return Math.max(volumeCc * 7.5, priceEur * 0.48);
        } else if (priceEur <= 169000) {
            return Math.max(volumeCc * 15, priceEur * 0.48);
        } else {
            return Math.max(volumeCc * 20, priceEur * 0.48);
        }
    } else if (age === 'medium') {
        if (volumeCc <= 1000) {
            return volumeCc * 1.5;
        } else if (volumeCc <= 1500) {
            return volumeCc * 1.7;
        } else if (volumeCc <= 1800) {
            return volumeCc * 2.5;
        } else if (volumeCc <= 2300) {
            return volumeCc * 2.7;
        } else if (volumeCc <= 3000) {
            return volumeCc * 3;
        } else {
            return volumeCc * 3.6;
        }
    } else {
        if (volumeCc <= 1000) {
            return volumeCc * 3;
        } else if (volumeCc <= 1500) {
            return volumeCc * 3.2;
        } else if (volumeCc <= 1800) {
            return volumeCc * 3.5;
        } else if (volumeCc <= 2300) {
            return volumeCc * 4.8;
        } else if (volumeCc <= 3000) {
            return volumeCc * 5;
        } else {
            return volumeCc * 5.7;
        }
    }
};

export const getCustomsFee = (customsValue) => {
    if (customsValue <= 200000) return 775;
    if (customsValue <= 450000) return 1550;
    if (customsValue <= 1200000) return 3100;
    if (customsValue <= 2700000) return 8530;
    if (customsValue <= 4200000) return 12000;
    if (customsValue <= 5500000) return 15500;
    if (customsValue <= 7000000) return 20000;
    if (customsValue <= 8000000) return 23000;
    if (customsValue <= 9000000) return 25000;
    if (customsValue <= 10000000) return 27000;
    return 30000;
};