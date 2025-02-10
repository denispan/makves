import * as React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const CustomLegend: React.FC = () => {
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <div className={cn(styles.legendLine, styles.legendLinePv)} />
        <span>pv</span>
      </div>
      <div className={styles.legendItem}>
        <div className={cn(styles.legendLine, styles.legendLineUv)} />
        <span>uv</span>
      </div>
      <div className={styles.legendItem}>
        <div className={cn(styles.legendLine, styles.legendLineScore)} />
        <span>|z-score| &gt; 1</span>
      </div>
    </div>
  );
};

export default CustomLegend;
