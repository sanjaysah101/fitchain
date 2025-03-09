export const calculateDistance = (steps: number, strideLength: number = 0.762): number => {
  return Number((steps * strideLength / 1000).toFixed(2)); // Distance in kilometers
};

export const calculateCalories = (
  steps: number,
  weight: number = 70, // Default weight in kg
  height: number = 170, // Default height in cm
  age: number = 30, // Default age
  gender: 'male' | 'female' = 'male'
): number => {
  // Basic MET (Metabolic Equivalent of Task) calculation
  const met = 3.5; // Walking at moderate pace
  const duration = (steps / 100) * 1; // Approximate minutes (100 steps per minute)
  const weightInKg = weight;

  // Calories = MET × Weight (kg) × Duration (hours)
  const calories = (met * weightInKg * (duration / 60));
  
  return Number(calories.toFixed(2));
};

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateGoalProgress = (current: number, goal: number): number => {
  return Math.min(Math.round((current / goal) * 100), 100);
};

export const calculatePace = (steps: number, timeInMinutes: number): number => {
  return timeInMinutes > 0 ? Math.round(steps / timeInMinutes) : 0;
}; 