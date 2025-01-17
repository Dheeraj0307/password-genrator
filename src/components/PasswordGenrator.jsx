import React, { useState } from 'react'
import './css/passGenerator.css'

const PasswordGenrator = () => {
    const [rangeValue, setRangeValue] = useState(4)
    const [password, setPassword] = useState('')
    const [options, setOptions] = useState({
        Uppercase: false,
        Lowercase: false,
        Number: true,
        Special: false
    })

    const [isCopied, setIsCopied] = useState(false)

    const handleChange = (key) => {
        setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const charSet = {
        Uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        Lowercase: 'abcdefghijklmnopqrstuvwxyz',
        Number: '1234567890',
        Special: '!@#$%^&*()'
    }

    const activeSets = Object.entries(charSet)
        .filter(([key]) => options[key])
        .map(([, value]) => [value]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (activeSets.length === 0) {
            alert('Please select at least one character type.');
            return;
        }
        if (rangeValue < 4) {
            alert('The minimum password length should be at least 4 characters.');
            return;
        }

        let value = '';
        let selected = Math.floor(rangeValue / activeSets.length);

        const random = (character) => {
            let ans = ''
            for (let i = 0; i < selected; i++) {
                let random = character.charAt(Math.floor(Math.random() * character.length))
                ans += random
            }
            return ans
        }

        const { Uppercase, Lowercase, Number, Special } = options;

        if (Uppercase) value += random(charSet.Uppercase)

        if (Lowercase) value += random(charSet.Lowercase)

        if (Number) value += random(charSet.Number)

        if (Special) value += random(charSet.Special)

        if (value.length < rangeValue) {
            let ans = '';
            let charFrom = activeSets.join('');
            for (let i = value.length; i < rangeValue; i++) {
                let random = charFrom.charAt(Math.floor(Math.random() * charFrom.length))
                ans += random
            }
            value += ans
        }

        const shuffle = (str) => ([...str].sort(() => Math.random() - 0.5).join(''));

        setPassword(shuffle(value))
    }

    const copyInput = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false)
            }, 3000);
        }
    }

    const strengthLevel = () => {
        let level = ''
        if (rangeValue <= 5) return 'Low'
        if (rangeValue <= 10) return 'Medium'
        if (rangeValue <= 15) return 'High'
        return level
    }

    return (
        < >
            <div className="pass-container">
                <div className="heading">
                    <div className="data">
                        {password}
                    </div>
                    <button className='btn' onClick={copyInput}>
                        {!isCopied ? "COPY" : "COPIED"}
                    </button>
                </div>
                <div className='heading'>
                    <span>Character Length</span>
                    <span>{rangeValue}</span>
                </div>
                <div className="range-container">
                    <input type="range" min={0} max={15} value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                </div>
                <div className="features">
                    {Object.keys(charSet).map((key) => <div key={key}>

                        <input type="checkbox" id={key} checked={options[key]} name={key} onChange={() => handleChange(key)} />
                        {/* <p>Include {key}</p> */}
                        <label htmlFor={key}> Include {key}</label>
                    </div>)}

                </div>
                <div className='heading' >
                    <span>Strength:</span> <span>{strengthLevel()}</span>
                </div>
                <button className='submit-btn btn' onClick={handleSubmit}>Generate Password</button>
            </div>

        </ >
    )
}

export default PasswordGenrator