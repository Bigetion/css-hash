import React from 'react';
import { cssHash, classNames } from '../../dist/index.mjs';

/**
 * Contoh component yang menunjukkan bagaimana cssHash menangani 
 * pemanggilan berkali-kali dengan CSS yang sama
 */
function CacheExample() {
  // CSS yang sama dipanggil berkali-kali
  const sameStyles = () => {
    const results = [];
    // Memanggil dengan CSS yang sama 5 kali
    for (let i = 0; i < 5; i++) {
      const className = cssHash(
        (id) => `
          .${id} {
            color: red;
            background-color: #f5f5f5;
            padding: 10px;
          }
        `
      );
      results.push(className);
    }
    return results;
  };

  // CSS yang berbeda dipanggil berkali-kali
  const differentStyles = () => {
    const results = [];
    // Memanggil dengan CSS yang berbeda 5 kali
    for (let i = 0; i < 5; i++) {
      const className = cssHash(
        (id) => `
          .${id} {
            color: ${['red', 'blue', 'green', 'purple', 'orange'][i]};
            background-color: #f5f5f5;
            padding: 10px;
          }
        `
      );
      results.push(className);
    }
    return results;
  };

  // Panggil fungsi-fungsi tersebut
  const sameClassNames = sameStyles();
  const differentClassNames = differentStyles();

  return (
    <div>
      <h2>Contoh Cache cssHash</h2>
      
      <div>
        <h3>Dengan CSS yang sama:</h3>
        <p>
          Hash yang sama dari 5 pemanggilan: <br />
          {sameClassNames.map((className, i) => (
            <code key={i} style={{display: 'block'}}>{i+1}. {className}</code>
          ))}
        </p>
        <div>
          {/* Menampilkan elemen dengan 5 class name yang sama */}
          {sameClassNames.map((className, i) => (
            <div key={i} className={className}>
              Element {i+1} dengan class yang sama
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop: '20px'}}>
        <h3>Dengan CSS yang berbeda:</h3>
        <p>
          Hash yang berbeda dari 5 pemanggilan: <br />
          {differentClassNames.map((className, i) => (
            <code key={i} style={{display: 'block'}}>{i+1}. {className}</code>
          ))}
        </p>
        <div>
          {/* Menampilkan elemen dengan 5 class name yang berbeda */}
          {differentClassNames.map((className, i) => (
            <div key={i} className={className}>
              Element {i+1} dengan warna yang berbeda
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CacheExample;
