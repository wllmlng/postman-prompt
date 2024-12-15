import React from 'react';
import classNames from 'classnames';
import styles from './ThrobberLoader.module.scss';

/* Props -  <ThrobberLoader />
============================================================================= */
type Props = {
  overlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/* <ThrobberLoader />
============================================================================= */
const ThrobberLoader: React.FC<Props> = ({ className, overlay, style }) => {
  return (
    <div className={classNames(className, { [styles.overlay]: overlay })} style={style}>
      <div className={styles.container}>
        <div className={styles.throbberLoader}>Loading</div>
      </div>
    </div>
  );
};

export default ThrobberLoader;
