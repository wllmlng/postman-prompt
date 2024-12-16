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
const ThrobberLoader: React.FC<Props> = ({ className, width=200, height=50 }) => {
  return (
    <span className={classNames(styles.skeletonLoader, className)} style={{ width, height }} />
  );
};

export default ThrobberLoader;

