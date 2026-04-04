const Loader = ({ message = "Loading...", subMessage = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-200 border-t-orange-600 mb-4"></div>
      <p className="text-base sm:text-lg font-semibold text-gray-800">
        {message}
      </p>
      {subMessage && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {subMessage}
        </p>
      )}
    </div>
  );
};

export default Loader;