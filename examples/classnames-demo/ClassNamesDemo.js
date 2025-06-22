import React, { useState } from 'react';
import { classNames } from '../../dist/index.mjs';

/**
 * Komponen contoh untuk menunjukkan fitur-fitur dari fungsi classNames yang ditingkatkan
 */
function ClassNamesDemo() {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  
  // Contoh penggunaan classNames dengan berbagai jenis input
  const examples = [
    {
      title: 'String Dasar',
      code: "classNames('button', 'primary')",
      result: classNames('button', 'primary')
    },
    {
      title: 'Menangani nilai falsy',
      code: "classNames('button', null, undefined, 0, false, 'primary')",
      result: classNames('button', null, undefined, 0, false, 'primary')
    },
    {
      title: 'Angka',
      code: "classNames('item-', 1, 'selected')",
      result: classNames('item-', 1, 'selected')
    },
    {
      title: 'Array',
      code: "classNames('button', ['primary', 'large'])",
      result: classNames('button', ['primary', 'large'])
    },
    {
      title: 'Array Bersarang',
      code: "classNames('button', ['primary', ['outlined', ['shadow']]])",
      result: classNames('button', ['primary', ['outlined', ['shadow']]])
    },
    {
      title: 'Object (kondisional)',
      code: "classNames('button', { 'active': true, 'disabled': false })",
      result: classNames('button', { 'active': true, 'disabled': false })
    }
  ];

  // Contoh praktis dengan state yang dapat berubah
  const buttonClasses = classNames(
    'button', // Kelas dasar
    {
      'button-active': isActive,
      'button-disabled': isDisabled,
      'button-error': isError,
      'button-large': isLarge,
    }
  );

  return (
    <div className="class-names-demo">
      <h2>Demo Fungsi classNames</h2>
      
      <div className="examples">
        <h3>Contoh Penggunaan:</h3>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Kode</th>
              <th>Hasil</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((example, index) => (
              <tr key={index}>
                <td>{example.title}</td>
                <td><code>{example.code}</code></td>
                <td><code>"{example.result}"</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="interactive-demo" style={{ marginTop: '30px' }}>
        <h3>Demo Interaktif:</h3>
        <div className="controls" style={{ marginBottom: '20px' }}>
          <label>
            <input 
              type="checkbox" 
              checked={isActive} 
              onChange={() => setIsActive(!isActive)}
            />
            Active
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input 
              type="checkbox" 
              checked={isDisabled} 
              onChange={() => setIsDisabled(!isDisabled)}
            />
            Disabled
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input 
              type="checkbox" 
              checked={isError} 
              onChange={() => setIsError(!isError)}
            />
            Error
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input 
              type="checkbox" 
              checked={isLarge} 
              onChange={() => setIsLarge(!isLarge)}
            />
            Large
          </label>
        </div>

        <div>
          <button 
            className={buttonClasses}
            disabled={isDisabled}
            style={{
              padding: isLarge ? '12px 24px' : '8px 16px',
              backgroundColor: isError ? '#f44336' : isActive ? '#2196f3' : '#e0e0e0',
              color: (isActive || isError) ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              opacity: isDisabled ? 0.6 : 1,
            }}
          >
            Demo Button
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <p>Kode di atas menghasilkan:</p>
          <code>className="{buttonClasses}"</code>
        </div>
      </div>
    </div>
  );
}

export default ClassNamesDemo;
