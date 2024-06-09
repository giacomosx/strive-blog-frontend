import React from 'react';

const InputField = ({labelTitle, onChange, label, name, variant, htmlFor, type, placeholder, error}) => {
    return (
        <div className={`input-field mb-8 `}>
            {label && <label htmlFor={htmlFor} className={'text-lg font-bold block mb-2'}>{labelTitle}</label>}
            <input
                onChange={onChange}
                name={name}
                className={`px-3 py-4 bg-gray-100 h-full flex-grow focus-visible:outline-zinc-800 ${error ? 'border border-red-600' : 'border-none'} ${variant}`}
                type={type}
                placeholder={placeholder}/>
        </div>
    );
};

export default InputField;
