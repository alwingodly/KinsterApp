import React from 'react';
import './Sheet.css';

function Sheet() {
  return (
    <div>
      <div className="sheetSection" style={{ height: '85vh' , margin:'20px' , display:'flex' , justifyContent:'center'}}>
        <iframe
          src="https://docs.google.com/spreadsheets/d/1yI3N6p3i8FZO7uQbNvgZgjg7UknnSiRqzOVJwscwVTg/edit?usp=sharing"
          style={{ width: '90%', height: '100%' }}
          title="Embedded Spreadsheet"
        ></iframe>
      </div>
    </div>
  );
}

export default Sheet;
