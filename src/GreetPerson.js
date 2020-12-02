import React, { useState } from "react";

export default function GreetPerson({ initialFirst, initialLast }) {
    const [values, setValues] = useState({
        first: initialFirst,
        last: initialLast,
    });

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);

        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(true);
    };

    return (
        <React.Fragment>
            <h1>
                Hello {values.first} {values.last}
            </h1>
            {error && <p>OH NO A ERROR</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first"
                    onChange={handleChange}
                    value={values.first}
                />
                <input
                    type="text"
                    name="last"
                    onChange={handleChange}
                    value={values.last}
                />
                <button type="submit">GO</button>
            </form>
        </React.Fragment>
    );
}
