const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4">
      {message}
    </div>
  );
};

export default ErrorMessage;