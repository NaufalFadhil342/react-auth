import React, { Fragment } from 'react';
import Navigation from './Mainnav/navigation';

function Layout(props) {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
