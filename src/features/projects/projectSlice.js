import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8081/api/projects/user-projects", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user-specific projects");
      }
      const data = await response.json();
      return data; // retrieves the projects
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allProjects: [],
  selectedProjectId: null,
  tasks:[],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProjectId(state, action) {
      state.selectedProjectId = action.payload;
    },
    setTasks(state,action){
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
  setTasks,
  addProject,
  deleteProject,
  updateProject,
} = projectSlice.actions;

export default projectSlice.reducer;
