// src/components/task/TaskStatus.js
import React from 'react';
import { Container} from 'react-bootstrap'; // Import React-Bootstrap components
import TaskStatsChart from '../task/taskStatsChart';

export function Dashboard() {

  return (
    <Container>

        <TaskStatsChart/>
      
    </Container>
  );
}

export default Dashboard;
