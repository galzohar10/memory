import React, { useState } from 'react';

const LoginStep = ({ onLogin, onForgotPassword }) => {
    const [user, setUser] = useState('user2010');
    const [pass, setPass] = useState('123456');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', textAlign: 'right' }}>
            <div>
                <label>שם משתמש:</label>
                <input 
                    type="text" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }} 
                />
            </div>
            <div>
                <label>סיסמה:</label>
                <input 
                    type="password" 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box' }} 
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <a onClick={onForgotPassword}>שכחתי סיסמה</a>
                <button onClick={() => onLogin(user, pass)}>כניסה</button>
            </div>
        </div>
    );
};

export default LoginStep;
