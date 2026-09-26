import { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Edit3,
  Briefcase,
  Code2,
  Award,
  FolderGit2,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../Components/common/Card";
import Button from "../Components/common/Button";
import Badge from "../Components/common/Badge";
import Modal from "../Components/common/Modal";
import api from "../services/api";

function Profile() {
    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/me");

        setProfile((previous) => ({
          ...previous,
          name: response.data.name || "",
          email: response.data.email || "",
        }));
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);
  const getSavedUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  };

  const savedUser = getSavedUser();

  const [profile, setProfile] = useState({
    name: savedUser.name || "Alex Johnson",
    email: savedUser.email || "alex@example.com",
    role: "Software Engineer",
    location: "Hyderabad, India",
    phone: "+91 98765 43210",

    about:
      "Passionate software engineer focused on building scalable applications and AI-powered solutions. Currently improving my skills in Java, React, Python and system design.",

    skills: [
      "Java",
      "React",
      "JavaScript",
      "Python",
      "SQL",
      "Spring Boot",
      "Git",
      "REST APIs",
    ],

    experience: [
      {
        id: 1,
        company: "Tech Solutions",
        role: "Software Engineering Intern",
        duration: "Jan 2026 - Jun 2026",
        description:
          "Worked on web applications, REST APIs and frontend features using React and Java.",
      },
    ],

    projects: [
      {
        id: 1,
        name: "Career Prep AI",
        description:
          "AI-powered platform for resume analysis and interview preparation.",
        technologies: [
          "React",
          "Java",
          "Spring Boot",
          "Gemini AI",
        ],
      },
      {
        id: 2,
        name: "Task Management App",
        description:
          "Responsive task management application with authentication and CRUD functionality.",
        technologies: [
          "React",
          "JavaScript",
          "REST API",
        ],
      },
    ],

    achievements: [
      "Completed 150+ DSA problems",
      "Built multiple full-stack projects",
      "Participated in technical hackathons",
    ],

    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    portfolio: "https://example.com/",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editData, setEditData] = useState({
    name: profile.name,
    email: profile.email,
    role: profile.role,
    location: profile.location,
    phone: profile.phone,
    about: profile.about,
  });

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openEditModal = () => {
    setEditData({
      name: profile.name,
      email: profile.email,
      role: profile.role,
      location: profile.location,
      phone: profile.phone,
      about: profile.about,
    });

    setIsEditOpen(true);
  };

  const handleSaveProfile = async () => {
  if (!editData.name.trim()) {
    toast.error("Name is required.");
    return;
  }

  if (!editData.email.trim()) {
    toast.error("Email is required.");
    return;
  }

  try {
    const response = await api.put("/users/me", {
      name: editData.name.trim(),
      location: editData.location.trim(),
      phone: editData.phone.trim(),
      about: editData.about.trim(),
      skills: profile.skills.join(", "),
      experience: profile.experience.join(", "),
      projects: profile.projects.join(", "),
      achievements: profile.achievements.join(", "),
      github: profile.github,
      linkedin: profile.linkedin,
      portfolio: profile.portfolio,
    });

    const updatedProfile = response.data;

    const data = response.data;

const skills = data.skills
  ? data.skills.split(",").map((item) => item.trim()).filter(Boolean)
  : [];

const achievements = data.achievements
  ? data.achievements.split(",").map((item) => item.trim()).filter(Boolean)
  : [];

const experience = data.experience
  ? data.experience
      .split(",")
      .map((item, index) => ({
        id: index + 1,
        company: "",
        role: item.trim(),
        duration: "",
        description: "",
      }))
      .filter((item) => item.role)
  : [];

const projects = data.projects
  ? data.projects
      .split(",")
      .map((item, index) => ({
        id: index + 1,
        name: item.trim(),
        description: "",
        technologies: [],
      }))
      .filter((item) => item.name)
  : [];

setProfile((previous) => ({
  ...previous,
  name: data.name || "",
  email: data.email || "",
  role: data.role || "",
  location: data.location || "",
  phone: data.phone || "",
  about: data.about || "",
  skills,
  experience,
  projects,
  achievements,
  github: data.github || "",
  linkedin: data.linkedin || "",
  portfolio: data.portfolio || "",
}));

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...getSavedUser(),
        name: updatedProfile.name || editData.name.trim(),
        email: updatedProfile.email || editData.email.trim(),
      })
    );

    setEditOpen(false);
    toast.success("Profile updated successfully!");
  } catch (error) {
    console.error("Failed to update profile:", error);

    const message =
      error.response?.data?.message ||
      "Failed to update profile.";

    toast.error(message);
  }
};

  

  const profileCompletion = 92;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Manage your personal information and career details.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={openEditModal}
          icon={<Edit3 size={17} />}
        >
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="overflow-hidden p-0">
        <div className="h-32 bg-zinc-800" />

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-zinc-950 bg-zinc-700 text-3xl font-bold text-white">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <div className="pb-1">
                <h2 className="text-2xl font-bold text-white">
                  {profile.name}
                </h2>

                <p className="mt-1 text-zinc-400">
                  {profile.role}
                </p>

                <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Mail size={15} />
                    {profile.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <Briefcase size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Interviews
              </p>

              <p className="text-2xl font-bold text-white">
                24
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <Code2 size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Skills
              </p>

              <p className="text-2xl font-bold text-white">
                {profile.skills.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <FolderGit2 size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Projects
              </p>

              <p className="text-2xl font-bold text-white">
                {profile.projects.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <Award size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Achievements
              </p>

              <p className="text-2xl font-bold text-white">
                {profile.achievements.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Profile Completion
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Complete your profile to improve your career
              recommendations.
            </p>
          </div>

          <span className="text-xl font-bold text-white">
            {profileCompletion}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-white"
            style={{
              width: `${profileCompletion}%`,
            }}
          />
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* About */}
          <Card>
            <h3 className="text-lg font-semibold text-white">
              About
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              {profile.about}
            </p>
          </Card>

          {/* Skills */}
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Skills
              </h3>

              <button
                type="button"
                className="flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card>
            <h3 className="text-lg font-semibold text-white">
              Experience
            </h3>

            <div className="mt-5 space-y-6">
              {profile.experience.map((item) => (
                <div
                  key={item.id}
                  className="border-l-2 border-zinc-700 pl-5"
                >
                  <h4 className="font-semibold text-white">
                    {item.role}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-400">
                    {item.company}
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    {item.duration}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Projects */}
          <Card>
            <h3 className="text-lg font-semibold text-white">
              Projects
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {profile.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="flex items-start justify-between">
                    <FolderGit2
                      size={22}
                      className="text-zinc-400"
                    />

                    <span className="text-xs text-zinc-600">
                      Project
                    </span>
                  </div>

                  <h4 className="mt-4 font-semibold text-white">
                    {project.name}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Contact */}
          <Card>
            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-zinc-500"
                />

                <div>
                  <p className="text-xs text-zinc-600">
                    Email
                  </p>

                  <p className="text-sm text-zinc-300">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-zinc-500"
                />

                <div>
                  <p className="text-xs text-zinc-600">
                    Phone
                  </p>

                  <p className="text-sm text-zinc-300">
                    {profile.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-zinc-500"
                />

                <div>
                  <p className="text-xs text-zinc-600">
                    Location
                  </p>

                  <p className="text-sm text-zinc-300">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="text-lg font-semibold text-white">
              Achievements
            </h3>

            <div className="mt-5 space-y-4">
              {profile.achievements.map(
                (achievement) => (
                  <div
                    key={achievement}
                    className="flex gap-3"
                  >
                    <div className="mt-0.5 rounded-lg bg-zinc-800 p-2">
                      <Award size={16} />
                    </div>

                    <p className="text-sm leading-6 text-zinc-400">
                      {achievement}
                    </p>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Social Links */}
          <Card>
            <h3 className="text-lg font-semibold text-white">
              Social Links
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 font-bold text-white">
                  GH
                </span>

                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 font-bold text-white">
                  in
                </span>

                LinkedIn
              </a>

              <a
                href={profile.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 font-bold text-white">
                  ↗
                </span>

                Portfolio
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile"
      >
        <form
          onSubmit={handleSaveProfile}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Role
            </label>

            <input
              type="text"
              name="role"
              value={editData.role}
              onChange={handleEditChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              placeholder="Software Engineer"
            />
          </div>

          {/* Location + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
                placeholder="Your location"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
                placeholder="Your phone"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              About
            </label>

            <textarea
              name="about"
              value={editData.about}
              onChange={handleEditChange}
              rows={5}
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;