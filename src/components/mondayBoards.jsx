import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MondayApiCall = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your Monday.com API token
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ3MTgwMjU4NSwiYWFpIjoxMSwidWlkIjo3MDA1OTg4MiwiaWFkIjoiMjAyNS0wMi0xMlQyMDoyMzoyNS45NjhaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjEwOTY2MzAsInJnbiI6InVzZTEifQ.iY9N_5ovvubwUps-x2EHCR0YNunQk3sLkXVekapjArc';
  
  const fetchData = async () => {
    
    const query = `
    query {
        boards (ids: 8231164427){
          items_page (limit: 10) {
            cursor
            items {
              id 
              name 
              column_values {
                column {
                  id
                  title
                  type
                  
                }
          }
            }
            
          }
        }
      }
      
    `;

    try {
      const response = await axios.post(
        'https://api.monday.com/v2', 
        { query },
        {
          headers: {
            Authorization: API_TOKEN,
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data.data.boards);
  return (
    <div>
      <h1>Monday Boards</h1>
      <ul>
    {data.data.boards.map(board => (
      <div key={board.id}>
        
        <h3>{board.name}</h3>
        <ol>
          {board.items_page.items.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              {item.column_values
    .filter(column => column.column.title === "Status" || column.column.title === "Func Area/Feature") // Filter for "Status" column only
    .map(column => (
      <li key={column.id}>
        <strong>{column.column.title}</strong>: {column.column.value} :json- {JSON.stringify(column)}
      </li>
    ))}
              {/* {item.column_values.map(column => (
                <li key={column.id}>
                  <strong>{column.column.title}</strong>: {column.value}
                </li>
              ))} */}
            </li>
          ))}
        </ol>
      </div>
    ))}
  </ul>
    </div>
  );
};

export default MondayApiCall;
