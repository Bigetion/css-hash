# Demo Caching cssHash

Komponen ini menunjukkan bagaimana `cssHash` menangani pemanggilan berkali-kali:

## Fitur yang Ditunjukkan
- Caching CSS: CSS yang identik hanya memiliki satu style tag di DOM
- Konsistensi: CSS yang sama akan menghasilkan class name yang sama
- Efisiensi: CSS yang sama tidak akan diproses ulang

## Cara Menggunakan Demo
```jsx
import CacheExample from './CacheExample';

function App() {
  return <CacheExample />;
}
```

## Output yang Diharapkan
- Semua elemen dengan CSS yang sama akan mendapatkan class name yang sama
- Elemen dengan CSS yang berbeda akan mendapatkan class name yang berbeda
- Konsol browser akan menunjukkan bahwa hanya 6 style tag yang dibuat (1 untuk CSS yang sama dan 5 untuk CSS yang berbeda)
