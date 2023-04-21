import React, { useState, useEffect } from "react";

function TimerTask() {
  const [timers, setTimers] = useState([]);
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map((timer) => {
          const remainingTime = Math.max(timer.endTime - Date.now(), 0);
          return { ...timer, remainingTime };
        });
      });
    }, 10);
    return () => clearInterval(intervalId);
  }, []);

  function handleAddTimer(event) {
    event.preventDefault();
    const totalSeconds = parseInt(seconds);
    if (Number.isNaN(totalSeconds) || totalSeconds <= 0) {
      alert("Please enter a positive number of seconds!");
      return;
    }
    const startTime = new Date();
    const endTime = startTime.getTime() + totalSeconds * 1000;
    const newTimer = { id: Date.now(), startTime, endTime };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
    setSeconds("");
  }

  function handleDeleteTimer(id) {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  }

  return (
    <div className="container">
      
      <div class="row">
{/* left part */}
        <div class="col mt-4 ">
          <div className="left">
            <div className="timer-list">
              {timers.map((timer) => (
                <div className="timer bg-light rounded-3 mt-4 h-25 w-50 " key={timer.id}>
                <span style={{marginLeft:"259px" }} className=""><button className=" bg-white btn-close mt-2" onClick={() => handleDeleteTimer(timer.id)}>
                   
                  </button></span>
                <div className=" h1 ">
                    {(timer.remainingTime / 1000).toFixed(2)}
                  </div>
                  
                  <div className="">{timer.startTime.toLocaleString()}</div>
                 
                  
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div class="col mt-5">
          <div className="right">
            <h2 className="mb-3 ">New Timer</h2>
            <form onSubmit={handleAddTimer}>
              <label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(event) => setSeconds(event.target.value)}
                />
              </label>
             <div className="mt-3"> <button type="submit">Add</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerTask;
