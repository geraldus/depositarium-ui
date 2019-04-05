import React from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import Title from 'antd/lib/typography/Title';

import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";


export default function() {
  return (
    <Title>{formatMessage({id: 'pageTitle.home'})}</Title>
  )
}

