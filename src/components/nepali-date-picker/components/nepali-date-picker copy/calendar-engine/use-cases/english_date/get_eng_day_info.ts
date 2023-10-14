import {BSToAD} from "bikram-sambat-js";

export const get_eng_day_info = (nepYearn: number, nepMonth: number, nepDay: number) => {
    const implodedDate = [nepYearn, nepMonth, nepDay].join('-') as string;
    const adConverted = BSToAD(implodedDate);

    const explodedDate = adConverted.split('-');

    return {
        engYear: parseInt(explodedDate[0]),
        engMonth: parseInt(explodedDate[1]),
        engDay: parseInt(explodedDate[2]),
    };
};