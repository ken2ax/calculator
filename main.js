let display = document.getElementById("display");
let equalCalc = false;
const operators =["+", "-", "×", "÷", ".", "%"]

function AC(){
  display.value= "0";
  equalCalc = false;
  console.log("AC");
}

function backspace(){
  const numbers =["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if(display.value.trim().length <2){ //表示されているのが2文字未満の場合
    if(display.value.endsWith(0)){ //1文字かつ0の場合
    //何もしない
    } else if(numbers.includes(display.value)){ //1文字かつ1〜9の場合
      display.value = "0";
    }
  } else {
    display.value = display.value.slice(0, -1);
  }
}

function number(val){
  console.log(val);

  if(equalCalc) display.value= "0";
  equalCalc = false;

  if(display.value == "0" && val == "0"){
    display.value = "0";
  } else if(display.value == "0" && val == "00"){
    display.value = "0";
  } else if(display.value == "0"){
    display.value = val;
  } else{
    display.value += val;
  }
}

function operation(val){
  console.log(val);

  if(equalCalc) equalCalc = false;

  if(operators.includes(val)){ //入力されたのが演算子か
    if(display.value.endsWith(val)){ //入力されたのが演算子だった場合最後に入力された演算子と同じものか
      //何もしない
    } else if(operators.includes(display.value.slice(-1))){ //最後に入力されたのがoperatorsに含まれているかどうか
      display.value = display.value.slice(0, -1) + val; //前の演算子、小数点、パーセントを上書きする
    }else{
      display.value += val; //上記全てに当てはまらないなら演算子or小数点orパーセントをそのまま追加する
    }
  } else {
    display.value += val; //最後に入力されたのが演算子や小数点やパーセントでないなら普通に演算子を追加する
  }
}

function equal(){
  if(operators.includes(display.value.slice(-1))){
    if(display.value.endsWith("%")){
      //%はそのまま残す
    }else {
      display.value =display.value.slice(0, -1);
    }
  }

  const result = new Function("return " + display.value.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "/100"))();

  if(result == Infinity || Number.isNaN(result)){
    display.value = "Error";
  } else{
    display.value = result;
    equalCalc = true;
  }
}