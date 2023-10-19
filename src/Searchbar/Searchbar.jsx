import { HeaderBlock, Forma, FormButton, FormInput } from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({ toSubmit }) => {
    const [inputQuery, setInputQuery] = useState('');

    const handleChange = (evt) => {
        setInputQuery(evt.target.value.toLowerCase());
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (inputQuery.trim() !== "") {
            toSubmit(inputQuery);
            setInputQuery('');
        }
    }

    return (
        <HeaderBlock>
            <Forma onSubmit={handleSubmit}>
                <FormButton type="submit">
                    <span>Search</span>
                </FormButton>

                <FormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={inputQuery}
                    onChange={handleChange}
                />
            </Forma>
        </HeaderBlock>
    );
}

