import React from 'react';
import Card from '../components/ui/Card';
import Alerts from '../components/alerts/Alerts';

const AlertsView = ({ alerts, onClearAlerts, onDeleteAlert }) => (
    <Card title="Recent Alerts">
        <Alerts 
            alerts={alerts} 
            onClearAlerts={onClearAlerts} 
            onDeleteAlert={onDeleteAlert}
        />
    </Card>
);

export default AlertsView;
