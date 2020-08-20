
//判断手机号
export var isMobileNumber = (rule, value, callback) => {
  if (!value) {
      return new Error("请输入电话号码");
    } else {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      const isPhone = reg.test(value);
      value = Number(value); //转换为数字
      if (typeof value === "number" && !isNaN(value)) {//判断是否为数字
      value = value.toString(); //转换成字符串
        if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
          callback(new Error());
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入电话号码"));
      }
    }
}

//判断身份证
export var isCardId = (rule, value, callback) => {
  if (!value) {
    return new Error("请输入身份证号)"); 
  } else {
   const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/;
    const card = reg.test(value);
    if (!card) {
      callback(new Error("身份证格式如:423024xxxx0216xxxx"));
    } else {
      callback();
    }
  }
}

//判断车牌
export var isCarId = (rule, value, callback) => {
  if (!value) {
    return new Error("请输入车牌号)"); 
  } else {
    const reg = /[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新使]{1}[A-Z]{1}[0-9a-zA-Z]{5}$/u;
    const reg1 = /[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{4}[挂警学领港澳]{1}$/u;
    const card = reg.test(value);
    const card1 = reg1.test(value);
    if (!card && !card1) {
      callback(new Error("车牌号格式错误"));
    } else {
      callback();
    }
  }
}
