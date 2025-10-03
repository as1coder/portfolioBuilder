// src/app/[userid]/page.js - CORRECTED VERSION
"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // ✅ Correct import path
import templates from '../components/templates';

export default function PortfolioPage() {
  const params = useParams();
  const userid = params.userid; // ✅ Now it's userid (not username)
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, [userid]); // ✅ userid as dependency

  const fetchPortfolioData = async () => {
    try {
      // ✅ Directly find user by UID (simple approach)
      const userDoc = await getDoc(doc(db, 'users', userid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);

        // Fetch user's projects
        const projectsQuery = query(
          collection(db, 'projects'), 
          where('userId', '==', userid) // ✅ Use the same userid
        );
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectsData = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } else {
        // User not found
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading portfolio...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-2">Portfolio Not Found</h1>
          <p>The portfolio you're looking for doesn't exist.</p>
          <p className="text-gray-400 mt-2">User ID: {userid}</p>
        </div>
      </div>
    );
  }

  // Get selected template or default to minimal
  const SelectedTemplate = templates[userData.template] || templates.minimal;

  return <SelectedTemplate userData={userData} projects={projects} />;
}