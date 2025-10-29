// src/Routes.jsx
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import App from './App.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import InternshipsPage from './pages/InternshipsPage.jsx'
import InternshipDetail from './pages/InternshipDetail.jsx'
import JobsPage from './pages/JobsPage.jsx'
import JobDetail from './pages/JobDetail.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import CertificatesPage from './pages/CertificatesPage.jsx'

import { jobs } from './data/jobs'

function RouteWrapper({ children }) {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-cyan-400">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">LOADING...</div>
            <div className="w-48 h-2 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-cyan-400 animate-loading-bar"></div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}

export default function RootRoutes() {
  return (
    <RouteWrapper>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        {jobs.length > 0 ? (
          <>
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
          </>
        )
          : (
            <>
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/internships/:id" element={<InternshipDetail />} />
            </>
          )}
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RouteWrapper>
  )
}
