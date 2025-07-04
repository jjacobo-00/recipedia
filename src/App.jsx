import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainContent from './pages/MainContent'
import RecipeDetail from './pages/RecipeDetail'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
    )
}

export default App
