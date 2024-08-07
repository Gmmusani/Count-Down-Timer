#! /usr/bin/env node

import { differenceInSeconds } from "date-fns";
import { input } from "@inquirer/prompts";

let res = await input({
    message: "Please enter the amount of seconds",
    validate: (input: string) => {
        let numInput = parseFloat(input)
        if (isNaN(numInput)){
            return "Please enter valid number";
        } else if(numInput > 60){
            return "Seconds must be in 60"
        } else {
            return true;
        }
    }
});

let input1 = parseFloat(res);

function startTime(val: number){
    let initTime = new Date().setSeconds(new Date().getSeconds() + val);
    let intervalTime = new Date(initTime);
    setInterval(()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if (timeDiff <= 0){
            console.log("Timer has Expired");
            process.exit();
        }
        const min = Math.floor(timeDiff / 60);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000)
};

startTime(input1);

