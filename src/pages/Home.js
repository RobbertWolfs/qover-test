import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './Home.module.css';

import BackgroundImage from '../assets/images/coding.png';

import { addCars, getQuote } from '../store/action-creators/app';

function Home() {
    const dispatch = useDispatch();

    const cars = useSelector(state => state.cars);
    const quote = useSelector(state => state.quote)

    const history = useHistory();

    const [inputs, setInputs] = React.useState({
        age: '',
        price: '',
        car: '',
    });

    useEffect(() => {
        if (quote && quote.accepted) return history.push('/quote');
    }, [quote, history]);

    useEffect(() => {
        if (!cars.length) dispatch(addCars());
    }, [cars, dispatch]);

    async function getPrice () {
        dispatch(getQuote({
            car: inputs.car,
            age: inputs.age,
            price: inputs.price,
        }));
    }

    function handleInputChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setInputs({
            ...inputs,
            [name]: value
        });
    }

    return (
        <div className={styles.home}>
            <div className={styles.background} style={{ backgroundImage: `url(${BackgroundImage})` }}></div>
            
            <div className={styles.container}>
                
                <label className={`${styles.formControl} ${quote.errors.age ? styles.formControlError : ""}`}>
                    Age of the driver
                    <div className="flex flex-column">
                        <input type="number" name="age" className={styles.formInput} value={inputs.age} onChange={handleInputChange}
                        />
                        { quote.errors.age && <span className={styles.formError}> { quote.errors.age } </span> }
                    </div>
                </label>

                <label className={`${styles.formControl} ${quote.errors.car ? styles.formControlError : "" }`}>
                    Car
                    <div className="flex flex-column">
                        <select name="car" className={`${styles.formInput} ${styles.formInputSelect}`}
                            value={inputs.car} 
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="" hidden disabled></option>
                            { 
                                cars && cars.map(c => <option key={c.type} value={c.type}>{c.type}</option>)
                            }
                        </select>
                        { quote.errors.car && <span className={styles.formError}> { quote.errors.car } </span> }
                    </div>
                </label>

                <label className={`${styles.formControl} ${quote.errors.price ? styles.formControlError : "" }`}>
                    Purchase Price
                    <div className="flex flex-column">
                        <div className="flex align-items-center">
                            <input type="number" name="price" className={styles.formInput} value={inputs.price} onChange={handleInputChange} />
                            <span style={{marginLeft: "10px"}}>€</span>
                        </div>
                        { quote.errors.price && <span className={styles.formError}> { quote.errors.price } </span> }
                    </div>
                </label>

                { quote.errors.general && 
                        (
                            <div className={`${styles.formControl} ${quote.errors.general ? styles.formControlError : ""}`}>
                                <span className={`${styles.formGeneralError} ${styles.formError}`}>
                                    { quote.errors.general }
                                </span>
                            </div>
                        )
                }

                <div className={styles.formControl}>
                    <button 
                        className={`btn ${styles.formButton}`} 
                        onClick={getPrice}
                    >Get a price</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
