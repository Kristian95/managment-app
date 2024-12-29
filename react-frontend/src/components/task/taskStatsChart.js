// src/components/task/TaskStatus.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Import React-Bootstrap components
import { fetchTasksFromApi } from '../../api/taskApi'; // Assuming this is your fetch function

export function TaskStatsChart() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when component mounts
    const getTasks = async () => {
      const fetchedTasks = await fetchTasksFromApi();
      setTasks(fetchedTasks);
    };

    getTasks();
  }, []);

  // Calculate task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const notCompletedTasks = tasks.filter(task => !task.completed).length;

  return (
    <Container style={{ marginTop: '20px', marginLeft: 0, width: '30%' }}>
      <h3>{totalTasks} Tasks</h3>
      
      {/* Card for task status */}
      <Card>
        <Card.Body>
          {/* Completed Tasks Row */}
          <Row style={{ marginBottom: '10px' }}>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <strong>Completed</strong>
                <div
                  style={{
                    height: '30px',
                    width: '50%',  // Width set to 50% for the bar
                    color: 'white',
                    padding: '5px 0',
                    position: 'initial',
                  }}
                >
                  {/* Circle for completed task count */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#4caf50',
                      fontSize: "30px"
                    }}
                  >
                    {completedTasks}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Not Completed Tasks Row */}
          <Row style={{ marginBottom: '10px' }}>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <strong>Not Completed</strong>
                <div
                  style={{
                    height: '30px',
                    width: '50%',  // Width set to 50% for the bar
                    color: 'white',
                    padding: '5px 0',
                    position: 'initial',
                  }}
                >
                  {/* Circle for not completed task count */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#f44336',
                      fontSize: "30px"
                    }}
                  >
                    {notCompletedTasks}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TaskStatsChart;
