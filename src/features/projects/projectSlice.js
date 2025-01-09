import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await api.getProjects();
    return response;
  }
);

const initialState = {
  allProjects: [],
  selectedProjectId: null,
  projectsModalVisible: false,
  selectedColor: "charcoal",
  editingProject: null,
  tasks: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProjectId(state, action) {
      state.selectedProjectId = action.payload;
    },
    toggleProjectsModal(state) {
      state.projectsModalVisible = !state.projectsModalVisible;
    },
    setSelectedColor(state, action) {
      state.selectedColor = action.payload;
    },
    setEditingProject(state, action) {
      state.editingProject = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addProject(state, action) {
      state.allProjects.push(action.payload);
    },
    deleteProject(state, action) {
      state.allProjects = state.allProjects.filter(
        (project) => project.id !== action.payload
      );
    },
    updateProject(state, action) {
      const index = state.allProjects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.allProjects[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.allProjects = action.payload; // update the state when the action is fulfilled
    });
  },
});

export const {
  setSelectedProjectId,
  toggleProjectsModal,
  setSelectedColor,
  setEditingProject,
  setTasks,
  addProject,
  deleteProject,
  updateProject,
} = projectSlice.actions;

export default projectSlice.reducer;
