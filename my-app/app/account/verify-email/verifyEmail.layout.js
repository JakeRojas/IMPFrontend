'use client';

export default function VerifyEmailUI({ 
  loading, 
  message, 
  onRetry 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>

      {loading ? (
        <p className="text-gray-500">{message}</p>
      ) : (
        <>
          <p className="text-lg">{message}</p>
          {!message.includes('successfully') && (
            <button
              className="mt-4 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
              onClick={onRetry}
            >
              Retry Verification
            </button>
          )}
        </>
      )}
    </div>
  );
}