import {
  FaHome,
  FaBriefcase,
  FaUser,
  FaFileContract,
  FaStar,
} from "react-icons/fa";

export const clientNav = [
  {
    name: "Dashboard",
    path: "/client",
    icon: FaHome,
  },
  {
    name: "My Jobs",
    path: "/client/jobs",
    icon: FaBriefcase,
  },
  {
    name: "Profile",
    path: "/client/profile",
    icon: FaUser,
  },
  {
    name: "Agreements",
    path: "/client/agreements",
    icon: FaFileContract,
  },
  {
    name: "Reviews",
    path: "/client/reviews",
    icon: FaStar,
  },
];

export const workerNav = [
  {
    name: "Dashboard",
    path: "/worker",
    icon: FaHome,
  },
  {
    name: "Marketplace",
    path: "/worker/jobs",
    icon: FaBriefcase,
  },
  {
    name: "Profile",
    path: "/worker/profile",
    icon: FaUser,
  },
  {
    name: "Agreements",
    path: "/worker/agreements",
    icon: FaFileContract,
  },
  {
    name: "Reviews",
    path: "/worker/reviews",
    icon: FaStar,
  },
];
