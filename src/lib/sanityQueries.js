import { clientNoCdn } from './sanity.js';

/**
 * Fetch app settings from Sanity (like weekly goal and title)
 * Returns settings object with default values
 */
export async function fetchAppSettings() {
  try {
    const query = `*[_type == "appSettings"][0] {
      weeklyGoal,
      title,
      subtitle
    }`;
    
    const data = await clientNoCdn.fetch(query);
    return {
      weeklyGoal: data?.weeklyGoal || 20,
      title: data?.title || 'Gut Health Tracker!!!',
      subtitle: data?.subtitle || 'Aim to eat {goal} different portions of fruits and vegetables each week.',
    };
  } catch (error) {
    console.error('Error fetching app settings from Sanity:', error);
    // Return defaults on error
    return {
      weeklyGoal: 20,
      title: 'Gut Health Tracker!!!',
      subtitle: 'Aim to eat {goal} different portions of fruits and vegetables each week.',
    };
  }
}

