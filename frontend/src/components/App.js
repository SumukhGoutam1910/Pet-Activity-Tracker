import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import ChatbotButton from './ChatbotButton';
import PetCareChatbot from './PetCareChatbot';
import { Heart, Clock, Utensils, Pill, Send, Trophy, Star, CheckCircle, AlertCircle } from 'lucide-react';

const PetActivityTracker = () => {
  const [goalCelebrated, setGoalCelebrated] = useState(false);
  const [activities, setActivities] = useState([]);
  const [summary, setSummary] = useState({ walkTime: 0, meals: 0, meds: 0 });
  // For progress bar: assume daily walk goal is 60 minutes
  const walkGoal = 60;
  const walkProgress = Math.min((summary.walkTime / walkGoal) * 100, 100);
  const [showPrompt, setShowPrompt] = useState(true);
  const [lastPet, setLastPet] = useState('Buddy');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I\'m here to help with your pet care questions. How can I assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showWalkAlert, setShowWalkAlert] = useState(false);
  const [alertShownToday, setAlertShownToday] = useState(() => {
    const today = new Date().toDateString();
    return localStorage.getItem('walkAlertShown') === today;
  });
  const [petName, setPetName] = useState('');
  const [activityType, setActivityType] = useState('walk');
  const [durationOrQuantity, setDurationOrQuantity] = useState('');
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - tzOffset).toISOString().slice(0,16);
    return localISOTime;
  });

  // Check for walk alert at 6 PM
  useEffect(() => {
    const checkWalkAlert = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const today = new Date().toDateString();
      
      // Check if it's 6 PM or later and no walk has been logged today
      if (currentHour >= 18 && !alertShownToday) {
        const todayWalks = activities.filter(activity => {
          const activityDate = new Date(activity.dateTime);
          return activity.activityType === 'walk' && 
                 activityDate.toDateString() === today;
        });

        if (todayWalks.length === 0) {
          setShowWalkAlert(true);
          setAlertShownToday(true);
          localStorage.setItem('walkAlertShown', today);
        }
      }
    };

    // Check immediately
    checkWalkAlert();
    
    // Set up interval to check every minute
    const interval = setInterval(checkWalkAlert, 60000);
    
    return () => clearInterval(interval);
  }, [activities, alertShownToday]);

  // Reset alert shown status at midnight
  useEffect(() => {
    const resetAlert = () => {
      const today = new Date().toDateString();
      if (localStorage.getItem('walkAlertShown') !== today) {
        setAlertShownToday(false);
      }
    };

    // Check at component mount
    resetAlert();
    
    // Set up interval to check every hour
    const interval = setInterval(resetAlert, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLog = (e) => {
    e.preventDefault();
    const newActivity = { 
      petName, 
      activityType, 
      durationOrQuantity: Number(durationOrQuantity), 
      dateTime,
      id: Date.now()
    };
    setActivities(prev => [...prev, newActivity]);
    setLastPet(petName);
    setSummary(prev => ({
      walkTime: activityType === 'walk' ? prev.walkTime + Number(durationOrQuantity) : prev.walkTime,
      meals: activityType === 'meal' ? prev.meals + Number(durationOrQuantity) : prev.meals,
      meds: activityType === 'medication' ? prev.meds + Number(durationOrQuantity) : prev.meds
    }));
    setPetName('');
    setActivityType('walk');
    setDurationOrQuantity('');
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - tzOffset).toISOString().slice(0,16);
    setDateTime(localISOTime);
    if (activityType === 'walk') setShowPrompt(false);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const messageToSend = chatInput.trim(); // Store the message before clearing
    const userMsg = { sender: 'user', text: messageToSend };
    setMessages(prev => [...prev, userMsg]);
    setChatInput(''); // Clear input immediately for better UX

    try {
      console.log('Sending message to API:', messageToSend); // Debug log
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      console.log('API Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('API Response data:', data); // Debug log
      
      if (response.ok) {
        const botMsg = { sender: 'bot', text: data.reply };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const errorMsg = { sender: 'bot', text: data.reply || 'Sorry, I encountered an error. Please try again.' };
        setMessages(prev => [...prev, errorMsg]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = { sender: 'bot', text: 'Sorry, I\'m having trouble connecting. Please try again later.' };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'walk': return <Clock />;
      case 'meal': return <Utensils />;
      case 'medication': return <Pill />;
      default: return <Heart />;
    }
  };

  return (
    <div className="app-bg">
      <div className="container">
        {/* Walk Alert Notification */}
        {showWalkAlert && (
          <div style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: '#FF6B6B',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(255,107,107,0.3)',
            zIndex: 1001,
            maxWidth: '300px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertCircle size={24} />
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Exercise Reminder!</div>
              <div>{lastPet || 'Your pet'} still needs exercise today!</div>
            </div>
            <button
              onClick={() => setShowWalkAlert(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px',
                marginLeft: 'auto'
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="header" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Loader />
          <h1 className="title">Pet Activity Tracker</h1>
          <p className="subtitle">Keep your furry friend happy and healthy! 🐕✨</p>
        </div
        >

        <div className="main-grid">
          {/* Activity Form */}
          <div className="activity-form">
            <div className="activity-form-header">
              <span className="activity-form-icon"><Star /></span>
              <span className="activity-form-title">Log Activity</span>
            </div>
            <form className="activity-form-fields" onSubmit={handleLog}>
              <div>
                <label className="label">Pet Name</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="input"
                  placeholder="Enter your pet's name"
                  required
                />
              </div>
              <div>
                <label className="label">Activity Type</label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="input"
                >
                  <option value="walk">🚶 Walk</option>
                  <option value="meal">🍽️ Meal</option>
                  <option value="medication">💊 Medication</option>
                </select>
              </div>
              <div>
                <label className="label">{activityType === 'walk' ? 'Duration (minutes)' : 'Quantity'}</label>
                <input
                  type="number"
                  value={durationOrQuantity}
                  onChange={(e) => setDurationOrQuantity(e.target.value)}
                  className="input"
                  placeholder={activityType === 'walk' ? '30' : '1'}
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="label">Date & Time</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <button type="submit" className="button" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={20} />
                Log Activity
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="summary">
            <div className="summary-header">
              <span className="summary-icon"><Trophy /></span>
              <span className="summary-title">Today's Summary</span>
            </div>
            {/* Confetti and notification when goal reached */}
            {walkProgress >= 100 && !goalCelebrated && (
              <>
                <div className="goal-notification">
                  🎉 <b>Daily walk goal reached!</b> Great job!
                </div>
              </>
            )}
            <div className="summary-bars">
              <div className="stat">
                <Clock />
                <div className="stat-value">{summary.walkTime}</div>
                <div className="stat-label">minutes</div>
                {/* Progress Bar */}
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `${walkProgress}%`}}></div>
                </div>
                <div className="progress-bar-label">{walkProgress}% of daily goal (60 mins)</div>
              </div>
              <div className="stat"><Utensils /><div className="stat-value">{summary.meals}</div><div className="stat-label">meals</div></div>
              <div className="stat"><Pill /><div className="stat-value">{summary.meds}</div><div className="stat-label">meds</div></div>
            </div>
          </div>
        </div>

        {/* Floating Chatbot Button and Modal */}
        <ChatbotButton onClick={() => setShowChatbot(true)} />
        {showChatbot && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} onClick={() => setShowChatbot(false)}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              minWidth: '320px',
              maxWidth: '90vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
            }} onClick={e => e.stopPropagation()}>
              <PetCareChatbot
                messages={messages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                sendMessage={sendMessage}
                loading={false}
                onClose={() => setShowChatbot(false)}
              />
            </div>
          </div>
        )}

        {/* Recent Activities grouped by date */}
        {activities.length > 0 && (
          <div className="recent-activities">
            <h3 className="recent-activities-title">
              <span className="recent-activities-icon"><Star /></span>
              Recent Activities
            </h3>
            <div className="recent-activities-list">
              {/* Group activities by date */}
              {Object.entries(
                activities
                  .slice(-20)
                  .reverse()
                  .reduce((acc, activity) => {
                    const dateStr = new Date(activity.dateTime).toLocaleDateString();
                    if (!acc[dateStr]) acc[dateStr] = [];
                    acc[dateStr].push(activity);
                    return acc;
                  }, {})
              ).map(([date, acts]) => (
                <div key={date}>
                  <div className="recent-activity-date">{
                    (() => {
                      const [month, day, year] = date.split('/');
                      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
                    })()
                  }</div>
                  <table className="recent-activity-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Activity</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {acts.map((activity) => (
                        <tr key={activity.id} className="recent-activity-row">
                          <td className="recent-activity-pet">{activity.petName}</td>
                          <td className="recent-activity-type">{activity.activityType}{activity.activityType === 'walk' ? ` - ${activity.durationOrQuantity} min` : activity.activityType === 'meal' || activity.activityType === 'medication' ? ` - ${activity.durationOrQuantity}` : ''}</td>
                          <td className="recent-activity-time">{new Date(activity.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetActivityTracker;