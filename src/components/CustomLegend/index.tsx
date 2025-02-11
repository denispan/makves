import * as React from 'react';
import styles from './styles.module.scss';
import {COLORS} from '../../constants.ts';

const CustomLegend: React.FC = () => {
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <div
          className={styles.legendLine}
          style={{backgroundColor: COLORS.purple}}
        />
        <span>pv</span>
      </div>
      <div className={styles.legendItem}>
        <div
          className={styles.legendLine}
          style={{backgroundColor: COLORS.blue}}
        />
        <span>uv</span>
      </div>
      <div className={styles.legendItem}>
        <div
          className={styles.legendLine}
          style={{backgroundColor: COLORS.red}}
        />
        <span>|z-score| &gt; 1</span>
      </div>
    </div>
  );
};

export default CustomLegend;
