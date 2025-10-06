"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    liveLink: '',
    githubLink: '',
  });
  const [editingProject, setEditingProject] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: '',
    bio: '',
    tagline: '',
    skills: '',
    photoURL: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: ''
  });
  const [activeSection, setActiveSection] = useState('projects'); // ✅ Navigation state

  // Dashboard component mein
  // Dashboard mein yeh functions add karo

  // Dashboard mein - Base64 data handle karna
  const updateProfileImage = async (base64Image) => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        photoURL: base64Image, // Base64 string save karo
        updatedAt: new Date()
      }, { merge: true });

      refreshUserData(); // UI update karo
      showToast('Profile image updated successfully!');
    } catch (error) {
      console.error('Error updating profile image:', error);
      showToast('Error saving profile image', 'error');
    }
  };

  // 2. Refresh user data function
  const refreshUserData = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchProjects();
      fetchUserData();
    }
  }, [user, loading, router]);

  // Fetch user's data from Firestore
  const fetchUserData = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setProfileForm({
          name: data.name || '',
          bio: data.bio || '',
          tagline: data.tagline || '',
          skills: data.skills?.join(', ') || '',
          photoURL: data.photoURL || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
          instagram: data.instagram || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user's projects
  const fetchProjects = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'projects'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Update user profile
  const updateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        name: profileForm.name,
        bio: profileForm.bio,
        tagline: profileForm.tagline,
        skills: profileForm.skills.split(',').map(skill => skill.trim()),
        photoURL: profileForm.photoURL,
        github: profileForm.github,
        linkedin: profileForm.linkedin,
        twitter: profileForm.twitter,
        instagram: profileForm.instagram,
        tagline: profileForm.tagline,
        updatedAt: new Date()
      }, { merge: true });

      refreshUserData();
      showToast('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Error updating profile: ' + error.message, 'error');
    }
  };

  // Add new project
  const addProject = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, 'projects'), {
        ...newProject,
        userId: user.uid,
        createdAt: new Date()
      });

      setNewProject({ title: '', description: '', technologies: '', liveLink: '', githubLink: '' });
      fetchProjects();
      showToast('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      showToast('Error adding project: ' + error.message, 'error');
    }
  };

  // Edit project function
  const updateProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      await updateDoc(doc(db, 'projects', editingProject.id), {
        title: editingProject.title,
        description: editingProject.description,
        technologies: editingProject.technologies,
        liveLink: editingProject.liveLink,
        githubLink: editingProject.githubLink,
        updatedAt: new Date()
      });

      setEditingProject(null);
      fetchProjects();
      showToast('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      showToast('Error updating project: ' + error.message, 'error');
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      fetchProjects();
      showToast('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast('Error deleting project: ' + error.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ✅ Responsive Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-4">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Portfolio Builder</h1>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => router.push("/select-template")}
                className={`px-4 py-2 rounded-lg transition ${activeSection === 'templates'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                Templates
              </button>
              <button
                onClick={() => setActiveSection('profile')}
                className={`px-4 py-2 rounded-lg transition ${activeSection === 'profile'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveSection('projects')}
                className={`px-4 py-2 rounded-lg transition ${activeSection === 'projects'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                Projects ({projects.length})
              </button>
              <Link
                href={`/${user.uid}`}
                target="_blank"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
              >
                View Portfolio
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 md:p-8">
        {/* Welcome Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {userData?.name || user.email}!
          </h2>
          <p className="text-gray-400">
            {activeSection === 'profile'
              ? 'Manage your profile information'
              : 'Manage your portfolio projects'
            }
          </p>
        </div>

        {/* ✅ Profile Section */}
        {activeSection === 'profile' && (
          <div className="space-y-6">
            {/* Profile Form */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={updateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className='block text-gray-300 mb-2'>Tag Line </label>
                    <input
                      type="text"
                      placeholder="e.g. Full Stack Developer"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                 </div>
                  <div>
                    <ImageUpload
                      onImageUpload={updateProfileImage} // Base64 data receive karo
                      onUploadComplete={() => console.log('Upload complete')}
                      currentImage={userData?.photoURL}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea
                    placeholder="Tell something about yourself..."
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Skills</label>
                  <input
                    type="text"
                    placeholder="JavaScript, React, Node.js"
                    value={profileForm.skills}
                    onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <p className="text-gray-400 text-sm mt-1">Separate skills with commas</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">GitHub</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Twitter</label>
                    <input
                      type="url"
                      placeholder="https://twitter.com/username"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className='block text-gray-300 mb-2'>Instagram</label>
                    <input
                      type='url'
                      placeholder='https://instagram.com/username'
                      value={profileForm.instagram}
                      onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      className='w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white'
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Update Profile
                </button>
              </form>
            </div>
            {/* Current Profile Info */}
            {userData && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Current Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <strong className="text-gray-300">Name</strong>
                    <p className="mt-1">{userData.name || 'Not set'}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <strong className="text-gray-300">Skills</strong>
                    <p className="mt-1">{userData.skills?.join(', ') || 'Not set'}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <strong className="text-gray-300">Template</strong>
                    <p className="mt-1 capitalize">{userData.template || 'Not set'}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <strong className="text-gray-300">Portfolio URL</strong>
                    <p className="mt-1 truncate">
                      <Link
                        href={`/${userData.name || user.uid}`}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View Portfolio
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ✅ Projects Section */}
        {activeSection === 'projects' && (
          <div className="space-y-6">
            {/* Add Project Form */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
              <form onSubmit={addProject} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Project Title</label>
                    <input
                      type="text"
                      placeholder="Amazing Project"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    placeholder="Describe your project..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    rows="3"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      placeholder="https://your-project.com"
                      value={newProject.liveLink}
                      onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={newProject.githubLink}
                      onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Add Project
                </button>
              </form>
            </div>
            {/* Projects List */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Your Projects ({projects.length})</h2>
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-lg">No projects added yet.</p>
                  <p className="text-gray-500">Start by adding your first project above!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-ellipsis gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-700 p-4 rounded-lg hover:border-gray-600 transition">
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-wrap mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition">
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm transition">
                            GitHub
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition flex-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition flex-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Project</h3>
            <form onSubmit={updateProject} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Project Title</label>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Project Description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Technologies</label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={editingProject.technologies}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Live Demo URL</label>
                <input
                  type="url"
                  placeholder="https://your-project.com"
                  value={editingProject.liveLink}
                  onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  placeholder="your GitHub link"
                  value={editingProject.githubLink}
                  onChange={(e) => setEditingProject({ ...editingProject, githubLink: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex-1 transition">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex-1 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}