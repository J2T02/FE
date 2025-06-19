export const initialState = {
  doctors: [],
  schedules: [],
  certificates: [],
};

const doctorReducer = (state, action) => {
  switch (action.type) {
    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };

    case "ADD_DOCTOR":
      return { ...state, doctors: [...state.doctors, action.payload] };

    case "UPDATE_DOCTOR":
      return {
        ...state,
        doctors: state.doctors.map((d) =>
          d.doctorId === action.payload.doctorId ? action.payload : d
        ),
      };

    case "SET_SCHEDULES":
      return { ...state, schedules: action.payload };

    case "ADD_SCHEDULE":
      return { ...state, schedules: [...state.schedules, action.payload] };

    case "UPDATE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.map((s) =>
          s.doctorId === action.payload.doctorId &&
          s.date === action.payload.date
            ? //   &&
              // s.slotId === action.payload.slotId
              action.payload
            : s
        ),
      };

    case "REMOVE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.filter((s) => !action.payload(s)),
      };
    case "SET_CERTIFICATES":
      return { ...state, certificates: action.payload };
    default:
      return state;
  }
};

export default doctorReducer;
