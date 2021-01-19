import React from 'react';
import styles from './Quote.module.css';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PriceTable, { PriceMode } from '../components/PriceTable';
import BackgroundImage from '../assets/images/background-travel.png';

function Quote() {
    const [showYearPrice, setShowYearPrice] = React.useState(true);
    const [selectedPlan, setSelectedPlan] = React.useState('global');

    const quote = useSelector(state => state.quote);

    function onChange(event) {
        setShowYearPrice(event.target.checked);
    };

    if (!quote.accepted) return <Redirect to="/" />

    return ( 
        <div className={styles.quote} style={{backgroundImage: `url(${BackgroundImage})` }}>

            <h1 className={styles.quoteHeader}>Select a plan</h1>

            <div className={styles.selector}>
                <span>Pay monthly</span>

                <div className={styles.onoffswitch}>
                    <input type="checkbox" name="onoffswitch" className={styles.onoffswitchCheckbox} id="myonoffswitch" tabIndex="0" value={showYearPrice} checked={showYearPrice} onChange={onChange} />
                    <label className={styles.onoffswitchLabel} htmlFor="myonoffswitch">
                        <span className={styles.onoffswitchInner}></span>
                        <span className={styles.onoffswitchSwitch}></span>
                    </label>
                </div>

                <span>Pay yearly</span>
            </div>

            <div className={styles.priceTable}>
                <PriceTable mode={showYearPrice ? PriceMode.YEARLY : PriceMode.MONTLY} title="Global" quote={quote.global} selected={selectedPlan === 'global'} onSelect={() => setSelectedPlan('global') }/>
                <PriceTable mode={showYearPrice ? PriceMode.YEARLY : PriceMode.MONTLY} title="Universal" quote={quote.universal} selected={selectedPlan === 'universal'} onSelect={() => setSelectedPlan('universal') } />
            </div>

            <div className="flex align-items-center justify-content-center">
                <button className="btn btn--as-link" style={{ width: "auto" }}>
                    <span className="underline">Show me the full comparisation table</span>
                    <i className="fas fa-table"></i>
                </button>
            </div>
        </div>
    );
}

export default Quote;
