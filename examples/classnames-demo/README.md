# Demo Fungsi classNames

Komponen ini menunjukkan berbagai cara untuk menggunakan fungsi `classNames` yang ditingkatkan, termasuk kemampuan barunya untuk menangani:

## Fitur yang Ditunjukkan
- Kombinasi string dasar
- Menangani nilai falsy (null, undefined, false, 0, "")
- Dukungan untuk angka sebagai nilai class
- Dukungan untuk array dan array bersarang
- Dukungan untuk objek dengan nilai boolean (kondisional)

## Cara Menggunakan Demo
```jsx
import ClassNamesDemo from './ClassNamesDemo';

function App() {
  return <ClassNamesDemo />;
}
```

## Contoh Penggunaan Umum

```jsx
// Penggunaan dasar
classNames('button', 'primary'); // 'button primary'

// Kondisional dengan ternary
classNames('button', isActive ? 'active' : ''); // 'button active' or 'button'

// Kondisional dengan objek
classNames('button', { 'active': isActive, 'disabled': isDisabled });

// Menggabungkan beberapa jenis
classNames(
  'button',
  isError && 'error',
  ['large', isOutlined && 'outlined'],
  { 'active': isActive }
);
```
