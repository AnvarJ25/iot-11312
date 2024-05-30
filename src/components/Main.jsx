import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import TextToSpeech from './TextToSpeech';
import './Main.css';
import Circle from 'react-circle';

const DataDisplay = () => {
  const [temp, setTemp] = useState(null);
  const [humid, setHumid] = useState(null);
  const [ledStatus, setLedStatus] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [fanStatus, setFanStatus] = useState(null);

  useEffect(() => {
    // Set up Firebase listeners for real-time updates
    const tempRef = firebase.database().ref('temp');
    const humidRef = firebase.database().ref('humid');
    const ledRef = firebase.database().ref('LED');
    const soilMoisture = firebase.database().ref('soilMoisture');
    const fanRef = firebase.database().ref('fan');

    const handleTempChange = (snapshot) => {
      setTemp(snapshot.val());
    };

    const handleHumidChange = (snapshot) => {
      setHumid(snapshot.val());
    };

    const handleLedStatusChange = (snapshot) => {
      setLedStatus(snapshot.val());
    };

    const handleSoilMoistureChange = (snapshot) => {
      setSoilMoisture(snapshot.val());
    }

    const handleFanStatusChange = (snapshot) => {
      setFanStatus(snapshot.val());
    };

    tempRef.on('value', handleTempChange);
    humidRef.on('value', handleHumidChange);
    ledRef.on('value', handleLedStatusChange);
    soilMoisture.on('value', handleSoilMoistureChange);
    fanRef.on('value', handleFanStatusChange);

    return () => {
      tempRef.off('value', handleTempChange);
      humidRef.off('value', handleHumidChange);
      ledRef.off('value', handleLedStatusChange);
      soilMoisture.off('value', handleSoilMoistureChange);
      fanRef.off('value', handleFanStatusChange);
    };
  }, []);

  const toggleLed = () => {
    const newLedStatus = ledStatus === 0 ? 1 : 0;
    firebase.database().ref('LED').set(newLedStatus);
  };

  const toggleFan = () => {
    const newFanStatus = fanStatus === 0 ? 1 : 0;
    firebase.database().ref('fan').set(newFanStatus);
  };

  const convertSoilMoistureToPercentage = (value) => {
    // Convert 0-1024 to 0-100 with inversion
    return Math.max(0, Math.min(100, (1 - value / 1024) * 100));
  };

  return (
    <div className="main">
      <div className="header">
        <h1>00011312</h1>
      </div>
      <h2>Green house</h2>
      <div className="data-display">
        {/* First Line - Progress Bars */}
        <div className="progress-bars">
          {temp !== null && (
            <div className="data-item">
              <p>Temperature</p>
              {/* Use Circle component instead of CircularProgressbar */}
              <Circle
                animate={true}
                animationDuration="3s"
                progress={temp}
                progressColor={
                  temp < 20 ? 'blue' : 
                  temp >= 20 && temp <= 30 ? '#0a5c36' : 
                  temp > 30 ? 'orange' : 'red'
                }
                bgColor="#d6d6d6"
                textColor="#fff"
                size={200}
                lineCap="butt"
                lineWidth={50}
                roundedStroke={false}
                showPercentageSymbol={true}
              />
              {temp !== null && <TextToSpeech text={`The temperature is ${temp} degrees Celsius`} />}
            </div>
          )}
          {humid !== null && (
            <div className="data-item">
              <p>Humidity</p>
              <Circle
                animate={true}
                animationDuration="1s"
                progress={humid}
                progressColor={"#0a5c36"}
                bgColor="#d6d6d6"
                textColor="#fff"
                size={200}
                lineWidth={50}
                roundedStroke={false}
                showPercentageSymbol={true}
              />
              {humid !== null && <TextToSpeech text={`The humidity is ${humid} percent`} />}
            </div>
          )}
          {soilMoisture !== null && (
            <div className="data-item">
              <p>Soil Moisture</p>
              <Circle
                animate={true}
                animationDuration="1s"
                progress={convertSoilMoistureToPercentage(soilMoisture)}
                progressColor={"#0a5c36"}
                bgColor="#d6d6d6"
                textColor="#fff"
                size={200}
                lineWidth={50}
                roundedStroke={false}
                showPercentageSymbol={true}

              />
              {soilMoisture !== null && <TextToSpeech text={`The soil moisture is ${soilMoisture}`} />}
            </div>
          )}
        </div>

        {/* Second Line - Switches */}
        <div className="switches">
          {ledStatus !== null && (
            <div className="data-item">
              <p>LED Status</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={ledStatus === 1} onChange={toggleLed} />
                <span className="slider"></span>
              </label>
              {ledStatus !== null && <TextToSpeech text={`The LED is ${ledStatus === 1 ? 'On' : 'Off'}`} />}
            </div>
          )}
          {fanStatus !== null && (
            <div className="data-item">
              <p>Fan Status</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={fanStatus === 1} onChange={toggleFan} />
                <span className="slider"></span>
              </label>
              {fanStatus !== null && <TextToSpeech text={`The fan is ${fanStatus === 1 ? 'On' : 'Off'}`} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;