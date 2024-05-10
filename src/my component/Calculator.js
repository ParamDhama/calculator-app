import React, { useEffect, useState } from 'react';
import { RiDeleteBack2Line } from "react-icons/ri";
import sound from "./s1.mp3"
import "./calc.css"

function Calculator() {
    const [result, setResult] = useState('0');
    const [r2, setR2] = useState('0');

    

    function calc(operator, operand1, operand2=1) {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                if (operand2 === 0) {
                    throw new Error("Division by zero is not allowed.");
                }
                return operand1 / operand2;
            case '%':
                return (operand1 / 100) * operand2;
            default:
                throw new Error("Invalid operator");
        }
    }

    function check(prev,value)
    {
      let op = ['+' , '-' , '*' , '/' ,'%']
      if (op.includes(prev[prev.length-1])&&op.includes(value)) {
        let newV = prev.slice(0,-1);
         return newV+value
     }
     
     else if(prev === "Error")
      {
         return value
      }

   else if (prev === "0")
       {
           if ( op.includes(value)) {
               return prev
           }
           else {
               return value
           }
       }
       else {
           return prev + value
       }
    }

    function playAudio()
    {
      const audio = new Audio(sound);
      audio.volume = .3;
      audio.play();

    }

    const handleClick = (value) => {
      
      playAudio();
      let ans = check(result,value)

        setResult(ans);
        if (ans != "0") {
          calculate(ans);
        }
        };
        
        function calculate(ans) {
          const expression = ans.toString();
          const operators = ['+', '-', '*', '/', '%'];
          const precedence = {
              '+': 1,
              '-': 1,
              '*': 2,
              '/': 2,
              '%': 3,
          };
          let operandStack = [];
          let operatorStack = [];
      
          const tokens = expression.split(/(\+|\-|\*|\/|\%)/).map(token => token.trim());
          
          tokens.forEach(token => {
              if (operators.includes(token)) {
                  while (
                    operatorStack.length > 0 &&
                      precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]
                  ) {
                    const operator = operatorStack.pop();
                    const operand2 = operandStack.pop();
                    const operand1 = operandStack.pop();
                    operandStack.push(calc(operator, operand1, operand2));
                  }
                  operatorStack.push(token);
              } else {
                  operandStack.push(parseFloat(token));
              }
          });
      
          while (operatorStack.length > 0) {
              const operator = operatorStack.pop();
              const operand2 = operandStack.pop();
              const operand1 = operandStack.pop();
              operandStack.push(calc(operator, operand1, operand2));
          }
          
          if (operandStack.length !== 1 || operatorStack.length !== 0) {
              throw new Error("Invalid expression format.");
            }
      
            setR2(operandStack.pop() || "Error");
      };
  
      const clear = () => {
      playAudio();
      setResult('0');
      setR2('')
    };
    function del() {
      playAudio();
      let ans = result.length === 1?"0":result .slice(0,-1);
      setResult(ans)
      if(ans != "0"){
        calculate(ans);
      }
    }
  
    return (
        <>
        <div className='bg-img'></div>
        
      <div className="flex  items-center justify-center h-screen  backdrop-blur-xl ">
        <div className="bg-slate-800   h-[84vh] w-[21%] rounded-[50px]  flex flex-col items-center ">
          
          <input
            type="text"
            className="w-full h-3/6 px-7 pt-20 -mb-10 text-right  bg-slate-800  text-md font-extralight text-wrap text-slate-300 pointer-events-none"
            value={result}
            readOnly
          />
          <div className="grid grid-cols-4 gap-x-2 gap-y-3  h-5/6 w-full pb-10 px-5 py-7 bg-slate-800  rounded-b-lg text-lg z-10">
            <button onClick={clear} className="btn-s  ">
              C
            </button>
            <button onClick={del} className="btn-s flex items-center justify-center">
            <RiDeleteBack2Line/>
            </button>
            <button onClick={() => handleClick('%')} className="btn-s">
              %
            </button>
            <button onClick={() => handleClick('/')} className="btn-s">
              /
            </button>
            <button onClick={() => handleClick('7')} className="btn">
              7
            </button>
            <button onClick={() => handleClick('8')} className="btn">
              8
            </button>
            <button onClick={() => handleClick('9')} className="btn">
              9
            </button>
            <button onClick={() => handleClick('*')} className="btn-s">
              *
            </button>
            <button onClick={() => handleClick('4')} className="btn">
              4
            </button>
            <button onClick={() => handleClick('5')} className="btn">
              5
            </button>
            <button onClick={() => handleClick('6')} className="btn">
              6
            </button>
            <button onClick={() => handleClick('-')} className="btn-s">
              -
            </button>
            <button onClick={() => handleClick('1')} className="btn">
              1
            </button>
            <button onClick={() => handleClick('2')} className="btn">
              2
            </button>
            <button onClick={() => handleClick('3')} className="btn">
              3
            </button>
            <button onClick={() => handleClick('+')} className="btn-s">
              +
            </button>
            <button onClick={() => handleClick('0')} className="btn ">
              0
            </button>
            <button onClick={() => handleClick('.')} className="btn">
              .
            </button>
            <button onClick={() => {setResult(r2); playAudio();}} className=" btn-w col-span-2  ">
              =
            </button>
          </div>
        </div>
      </div>
      <div className='phone'  ></div>
      <div className='absolute top-32 font-bold text-[2.6rem] text-slate-50 text-right left-[30%] w-96 '>{r2}</div>
      <div className='absolute top-[10%] font-semibold text-lg text-orange-600 text-right left-[30%] w-96 '>PD</div>
      </>
    );
  }
  
  export default Calculator;