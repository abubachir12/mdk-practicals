import React from 'react';
import BasicHooks from './components/BasicHooks';
import AdvancedHooks from './components/AdvancedHooks';
import CustomHooks from './components/CustomHooks';
import HooksTests from './components/HooksTests';

export default function App() {
  return <div>
    <header className="app-header">
      <h1>Практическая работа №16: React Hooks</h1>
      <p>Студент: Анушенко Артём | Группа: 418</p>
      <p>useState, useEffect, useReducer, useContext, useCallback, useMemo, useRef</p>
    </header>
    <main className="app-main"><BasicHooks /><AdvancedHooks /><CustomHooks /><HooksTests /></main>
  </div>;
}
