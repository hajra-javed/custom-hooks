import { useEffect, useState } from 'react';
import useFetch from '../../hooks/use-fetch';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  const { isLoading, error, sendRequest: sendTask } = useFetch();

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }


  const enterTaskHandler = (taskText) => {
    sendTask({
      url: 'https://custom-hooks-42347-default-rtdb.firebaseio.com//tasks.json',
      method: 'POST',
      body: JSON.stringify({ text: taskText }),
      headers: {
        'Content-Type': 'application/json',
      },
    }, createTask.bind(null, taskText)
    );
};

return (
  <Section>
    <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
    {error && <p>{error}</p>}
  </Section>
);
};

export default NewTask;
