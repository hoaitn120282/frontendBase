import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import appRoutes from 'routes/appRoutes';

export default () => {
    return (
        <Router basename="/" hasType="slash">
            {appRoutes}
        </Router>
    );
};
