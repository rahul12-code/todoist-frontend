import React, { createContext, useContext, useEffect, useReducer } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

// Initial state
const initialState = {
  allProjects: [],
  selectedProjectId: null,
  projectsModalVisible: false,
  selectedColor: "charcoal",
  hoveredProjectId: null,
  editingProject: null,
  tasks: [],
};

// Reducer function
const projectReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, allProjects: action.payload };
    case "SET_SELECTED_PROJECT_ID":
      return { ...state, selectedProjectId: action.payload };
    case "TOGGLE_PROJECTS_MODAL":
      return { ...state, projectsModalVisible: !state.projectsModalVisible };
    case "SET_SELECTED_COLOR":
      return { ...state, selectedColor: action.payload };
    case "SET_HOVERED_PROJECT_ID":
      return { ...state, hoveredProjectId: action.payload };
    case "SET_EDITING_PROJECT":
      return { ...state, editingProject: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_PROJECT":
      return { ...state, allProjects: [...state.allProjects, action.payload] };
    case "DELETE_PROJECT":
      return {
        ...state,
        allProjects: state.allProjects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        allProjects: state.allProjects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    default:
      return state;
  }
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    api
      .getProjects()
      .then((fetchedProjects) => {
        dispatch({ type: "SET_PROJECTS", payload: fetchedProjects });
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Segregation logic
  const inbox = state.allProjects.find((project) => project.name === "Inbox");
  const favorites = state.allProjects.filter((project) => project.isFavorite);
  const projects = state.allProjects.filter(
    (project) => project.name !== "Inbox"
  );

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        inbox,
        favorites,
        projects,
        api,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
