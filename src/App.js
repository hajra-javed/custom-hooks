import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function App() {
  const {isLoading, error, sendRequest: fetchTasks} = useFetch();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const processData = (data) => {
      const loadedTasks = [];
  
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };
    
    fetchTasks({url: 'https://custom-hooks-42347-default-rtdb.firebaseio.com/tasks.json'}, processData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
