import React from 'react';
import Card from '../ui/Card';
import MetricDisplay from '../ui/MetricDisplay';

const SensorMonitoring = ({ data }) => (
  <Card title="Real-time Sensor Monitoring">
    <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 auto-rows-min sm:grid-cols-3 lg:grid-cols-5">
      <MetricDisplay label="Temperature" value={data.temperature} unit="°C" icon="🌡️" />
      <MetricDisplay label="Speed" value={data.speed} unit="m/min" icon="⚡" />
      <MetricDisplay label="Energy Cons." value={data.energyConsumption} unit="kWh" icon="💡" />
      <MetricDisplay label="Accuracy" value={data.accuracy} unit="%" icon="🎯" />
      <MetricDisplay label="Faults" value={data.faults} unit="" icon="⚠️" />
    </div>
  </Card>
);

export default SensorMonitoring;
