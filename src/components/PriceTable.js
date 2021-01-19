import React from 'react';

import styles from './PriceTable.module.css';

export const PriceMode = {
    MONTLY: 'montly',
    YEARLY: 'yearly'
};

function PriceTable({ title, quote, selected, mode, onSelect }) {

    function toPrice(value, addCurrency = true) {
        return value.toLocaleString('nl-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: addCurrency ? "currency" : "decimal", currency: "EUR" });
    }

    return (
        <div className={`${styles.tableItem} ${selected ? styles.tableItemSelected : "" }`}>
            <h4 className={styles.tableHeader}>{ title }</h4>

            <div className={styles.tablePrice}>
                { mode === PriceMode.YEARLY 
                    ?  (
                        <React.Fragment>
                            <strong className={styles.tablePriceHeader}>{ toPrice(quote.yearPrice, false) }</strong>
                            <span className={styles.tablePriceSubheader}>yearly incl.taxes</span>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <strong className={styles.tablePriceHeader}>{ toPrice(quote.monthPrice, false) }</strong>
                            <span className={styles.tablePriceSubheader}>montly incl.taxes</span>
                        </React.Fragment>
                    )
                }
            </div>

            <div className={styles.tableList}>
                <div className={styles.tableListItem}>
                    <strong>Maximum duration travel</strong> of <strong>{ quote.maxTravelDuration} days</strong>
                </div>
                <div className={styles.tableListItem}>
                    <strong>Medical expenses reimbursement</strong> up to <strong>{ toPrice(quote.medicalExpenseReimbursement) }</strong>
                </div>
                <div className={styles.tableListItem}>
                    <strong>Personal assistance abroad</strong> up to <strong>{ toPrice(quote.personalAssistance) }</strong>
                </div>
                <div className={styles.tableListItem}>
                    <strong>Travel assistance abroad</strong> up to <strong>{ toPrice(quote.travelAssistance) }</strong>
                </div>
                <div className={styles.tableListItem}>
                    <strong>Coverage duration: {quote.coverageDuration} year</strong>
                </div>
            </div>

            <div className={styles.tableFooter}>
                <button className={`btn ${selected ? 'btn--white' : ''} ${styles.tableFooterButton}`} onClick={onSelect}>
                    { selected &&  <i className="fas fa-check-circle"></i> }
                    { selected ? "Plan selected" : "Choose this plan" }
                </button>
            </div>
        </div>
    );
}

export default PriceTable;
