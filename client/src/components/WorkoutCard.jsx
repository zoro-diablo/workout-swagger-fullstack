const WorkoutCard = ({ workout }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{workout.title}</h2>
      <p className="text-gray-600 mt-2">Reps: <span className="font-medium">{workout.reps}</span></p>
      <p className="text-gray-600">Load: <span className="font-medium">{workout.load} kg</span></p>
    </div>
  );
};

export default WorkoutCard;
