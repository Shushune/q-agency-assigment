import { useState } from "react";

const Search = (props: {
    searchItems: (value: string) => void;
}) => {
    const { searchItems } = props;
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (value: string) => {
        searchItems(value);
        setSearchValue(value);
    }
    return (
        <input
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
            value={searchValue}
        />
    );
};

export default Search;
