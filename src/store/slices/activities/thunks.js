import { setActivities } from './activitiesSlice';

export const getActivities = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/activities');
    const activities = await response.json();
    dispatch(setActivities(activities));
  };
};

export const addActivity = (activity) => {
  return async (dispatch, getState) => {
    console.log('activity: ', activity);
    const { activities } = getState().activities;
    console.log('activities: ', activities);
    await fetch('http://localhost:3001/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });
  };
};
