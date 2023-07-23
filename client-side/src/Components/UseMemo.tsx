import React, { useMemo, useState } from 'react'

function UseMemo() {
    const [counterOne, setCounterOne] = useState<number>(0);
    const [countertwo, setCountertwo] = useState<number>(0);

    const inCreeseCounterOne = () => {
        setCounterOne(counterOne+1);
    }
    const inCreeseCountertwo = () => {
        setCountertwo(countertwo+1);
    }
    const isEven = useMemo(() => {
        let i = 0;
        while(i < 1000000000) i++;
        return counterOne % 2 ===0;
    },[counterOne]);
  return (
    <div>
        <title> UseMemo </title>
        <div>{counterOne}</div>
        <button onClick={inCreeseCounterOne}>Increese Counter One</button>
        <span>{isEven? "Even" : "Odd"}</span>
        <div>{countertwo}</div>
        <button onClick={inCreeseCountertwo}>Increese Counter two</button>
    </div>
  )
}

export default UseMemo