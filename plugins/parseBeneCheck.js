import Decimal from 'decimal.js';


export class BeneCheckEntity {
    static TYPE_GLU = 1; // 血糖
    static TYPE_UA = 2; // 尿酸
    static TYPE_CHOL = 3; // 总胆固醇

    constructor() {
        this.type = null; // 类型
        this.category = null; // 分类
        this.time = null; // 时间
        this.value = 0.0; // 值
    }

    static formatArray(value) {
	
        const entity = new BeneCheckEntity();
        if (value.length !== 20) return entity;

        entity.time = `${value[12]}-${value[13]}-${value[14]} ${value[15]}:${value[16]}`;
        const v = ((value[18] & 0xFF) << 8) + (value[17] & 0xFF);
		console.log(v,1111)

        switch (value[4]) {
            case 65:
                entity.type = BeneCheckEntity.TYPE_GLU;
                entity.value = mul(v, div(1, 18));
                entity.value = parseFloat(entity.value.toFixed(1)); // 保留1位小数
				
                break;
            case 81:
                entity.type = BeneCheckEntity.TYPE_UA;
                entity.value = Math.round(v * 0.1 / 16.81 * 1000);
                break;
            case 97:
                entity.type = BeneCheckEntity.TYPE_CHOL;
                entity.value = mul(v, div(1, 38.66));
                entity.value = parseFloat(entity.value.toFixed(2)); // 保留2位小数
                break;
        }
        return entity;
    }

    static formatJk(value) {
        const entity = new BeneCheckEntity();
        if (value.length !== 24 && value[23] !== -2) return entity;

        entity.time = `${value[14]}-${value[12]}-${value[13]} ${value[15]}:${value[16]}`;
        const v = ((value[10] & 0xFF) << 8) + (value[11] & 0xFF);
        const divide = new Decimal(v).dividedBy(new Decimal(18)).toDecimalPlaces(1, Decimal.ROUND_DOWN);
        entity.value = parseFloat(divide.toString());
        entity.type = BeneCheckEntity.TYPE_GLU;
        return entity;
    }
}

export function mul(v1, v2) {
    const b1 = new Decimal(v1);
    const b2 = new Decimal(v2);
    return parseFloat(b1.times(b2).toString());
}

export function div(v1, v2) {
    const b1 = new Decimal(v1);
    const b2 = new Decimal(v2);
    return parseFloat(b1.dividedBy(b2, 20).toString());
}
