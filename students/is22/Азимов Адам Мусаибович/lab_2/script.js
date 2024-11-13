const display = document.querySelector('.result');
let show_text = "";
let last_char_digit = false;
let show_text_is_string = false;
let array_operations = ["/","+","-","*"]
{
  var text = document.getElementById('btn_fone');
  var body = document.getElementById('fone');
  var calc_fone = document.getElementsByClassName('calc_fone')[0];

  var btn_active = false;
  text.onclick=function(e) 
  {
      if (btn_active)
      {
          btn_active = false;
          text.style.backgroundColor= 'rgb(207, 223, 255)';
          body.style.backgroundImage ='linear-gradient( to bottom right, rgb(67, 83, 225),rgb(142, 1, 1))';
          calc_fone.style.backgroundImage =  'linear-gradient( to bottom right, rgb(207, 223, 255),rgb(43, 113, 62))';
        }
      else
      {
          btn_active = true;
          text.style.backgroundColor= 'rgb(67, 83, 225)';
          body.style.backgroundImage =  'linear-gradient( to bottom right, rgb(207, 223, 255),rgb(43, 113, 62))';
          calc_fone.style.backgroundImage ='linear-gradient( to bottom right, rgb(67, 83, 225),rgb(142, 1, 1))';

        }
  }
}

{
  var btn_fone_display = document.getElementById('btn_fone_display');
  var display_result = document.getElementsByClassName('result')[0];

  var fone_display_active = false;
  btn_fone_display.onclick=function(e) 
  {
      if (fone_display_active)
      {
        fone_display_active = false;
          btn_fone_display.style.backgroundColor= 'rgb(67, 57, 57)';
          display_result.style.backgroundColor ='rgb(57, 81, 68)';
        }
      else
      {
        fone_display_active = true;
          btn_fone_display.style.backgroundColor= 'rgb(57, 81, 68)  ';
          display_result.style.backgroundColor =  'rgb(67, 57, 57)';

        }
  }
}
function addDigit(digit)
{
  if(digit === "." && (show_text.length===0))
  {
      show_text = "0"+digit;
      display.textContent=show_text;
  }
  else{

    show_text+=digit;
    display.textContent=show_text;
  }
  last_char_digit = true;
}
function addOperation(operation)
{
  if (last_char_digit)
  {
    show_text+=operation;
    last_char_digit=false;
    display.textContent=show_text;
  }
  else
  {
    if(show_text.length >1 || operation==="-")
    {
      show_text = show_text.slice(0,show_text.length-1)+ operation;
      display.textContent=show_text;
    }
  }
}
function clearDisplay()
{
  show_text = "";
  display.textContent="0";
}
function changeSign(number)
{
  if ( number[0] === "-")
    {
      show_text = show_text.slice(1,show_text.length);
    }
  else
  {
    show_text = "-" + show_text;
  }
  display.textContent=show_text;
  // let last_number = "";
  // let index_num = -1;
  // let znak = "";
  // console.log(show_text);
  // for (var i=0; i<show_text.length;i++)
  //   {
      
  //     if (array_operations.includes(show_text[i]))
  //     {
          
  //       znak=show_text[i];
  //       index_num=i;
  //       last_number = "";
        
        
  //     }
  //     else if (i===show_text.length-1)
  //       {
  //         // console.log(show_text);
  //         last_number += show_text[i];
  //       if (znak=="-")
  //       {
  //         last_number = "+"+last_number;
          
  //       }
  //       else
  //       {
  //         last_number = "-"+last_number;

  //       }
  //       show_text = show_text.slice(0,index_num)+last_number;
  //       // show_text = "asd";
  //       break;
  //       // sample_array.push(parseFloat(number));
        
  //     }
  //     else
  //     {
  //       last_number += show_text[i];
  //     }
  //     display.textContent=show_text;
    // }
}
function calculate(expression) {
  try {
    const result = eval(expression); 
    return result.toString();;
  } catch (error) {
    show_text_is_string=true;
    return "Ошибка в выражении";
  }
}
function square(expression) {
  try {
    const result = eval(expression); 
    return Math.sqrt(result);
  } catch (error) {
    show_text_is_string=true;
    return "Ошибка в выражении";

  }
}
function degree(expression) {
  try {
    const result = eval(expression); 
    return result**2;
  } catch (error) {
    show_text_is_string=true;
    return "Ошибка в выражении";
  }
}
function result(sample)
{
  let number = "";
  let last_num = 0;
  let len_list = 0;
  const sample_array = [];
  const sample_array_2 = [];
  const list_asd = [];
  for (var i=0; i<sample.length;i++)
  {
    
    if (array_operations.includes(sample[i]))
    {
        
      last_num = parseFloat(number);
      sample_array.push(parseFloat(number));
      sample_array.push(sample[i]);
      number = "";

    }
    else if (i===sample.length-1)
    {
      number += sample[i];
      sample_array.push(parseFloat(number));

    }
    else
    {
      number += sample[i];
    }
  }

  for (var i=1; i<sample_array.length;i++)
  {
    if (sample_array[i] === "*")
    {
      // console.log(sample_array[i]); 
      sample_array_2.push(parseFloat(sample_array[i-1])*parseFloat(sample[i-1]));
      i+=1;

    }
    else if (sample_array[i] ==="/")
    {
      sample_array_2.push(parseFloat(sample_array[i-1])/parseFloat(sample[i-1]));
      i+=1;

    }
    else{
        sample_array_2.push(sample_array[i]);
    }
  }

  for (var i=0; i<sample_array.length;i++)
{
  console.log(sample_array[i]); 

}

}
function backspace()
{
  // console.log(show_text.length);
  if (show_text.length ===1)
  {
    show_text = "0";
    display.textContent=show_text;
  }
  // else if (show_text.length >=18)
  // {
  //   show_text=show_text.slice(0,17);
  //   if (show_text.endsWith("-")||show_text.endsWith("+")||show_text.endsWith("*")||show_text.endsWith("/"))
  //     {
  //       last_char_digit=false;
  //     }
  //     else{
  //       last_char_digit=true; 
  //     }
  //     display.textContent=show_text;
  // }
  else{
    // show_text=show_text.toString();
    show_text=show_text.slice(0,show_text.length-1);
    if (show_text.endsWith("-")||show_text.endsWith("+")||show_text.endsWith("*")||show_text.endsWith("/"))
    {
      last_char_digit=false;
    }
    else{
      last_char_digit=true; 
    }
    display.textContent=show_text;

  }
}
function percent(expression)
{
  let len_str = expression.length;
  let number = "";
  let sign = "";
  let expression_part = "";
  for (var i=0; i<len_str;i++)
    {
      if (array_operations.includes(expression[len_str-i]))
        {
        sign=expression[len_str-i];
        number=expression.slice(len_str-i+1,len_str);
        expression_part=expression.slice(0,len_str-i);
        break;
      }
    }
  if (!sign.length)
  {
    return expression;
  }
  
    let result_ = calculate(expression_part);
    if (sign==="-")
      {
        var new_res = result_-result_/100*parseFloat(number);
        return new_res;
      }
    else if (sign==="+")
      {
        var new_res = result_+result_/100*parseFloat(number);
        // console.log(result_);
        return new_res;
      }
    else if (sign==="*")
      {
        var new_res = parseFloat(number)*(result_/100);
        return new_res;
      }
    else if (sign==="/")
      {
        var new_res = result_/parseFloat(number)*100;
        return new_res;
      }
    }
function factorial(n) {
  if (n < 0) return "Факториал не определён для отрицательных чисел";
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
{
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const { id } = button;
      if (id.startsWith('btn_digit_'))
      {
        addDigit(button.textContent);
      }
      else if (id === 'btn_op_equal')
      {
        if(last_char_digit)
        {
          let answer  = calculate(show_text);
          if (!show_text_is_string)
            { 
              show_text = answer;
            }
            console.log(show_text);
            display.textContent=answer;
        }
      }
      else if (id.startsWith('btn_op_'))
      {
        addOperation(button.textContent);
      }
      else if (id.startsWith('btn_ctrl_clear'))
      {
        clearDisplay();
      }
      else if (id.startsWith('btn_ctrl_sign'))
      {
        changeSign(show_text);
      }
      else if (id.startsWith('btn_ctrl_percent'))
      {
        let answer  = percent(show_text);
        if (!show_text_is_string)
        {
          show_text = answer;
        }
        display.textContent=answer;
      }
      else if (id.startsWith('btn_ctrl_backspace'))
      {
        backspace();
      }
      else if (id.startsWith('btn_ctrl_degree'))
      {
        let answer  = degree(show_text);
        if (!show_text_is_string)
        {
          show_text = answer;
        }
        display.textContent=answer;
      }
      else if (id.startsWith('btn_ctrl_factorial'))
      {

      let answer  = calculate(show_text);
      if (!show_text_is_string)
        {
          show_text = factorial(answer);
        }
        display.textContent=show_text;
      }
      else if (id.startsWith('btn_ctrl_square'))
      {
        let answer  = square(show_text); 
        if (!show_text_is_string)
        {
          show_text = answer;
        }
        display.textContent=answer;
      }
    });
  });
}