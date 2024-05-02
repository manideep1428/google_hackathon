
import Link from 'next/link';

const MainPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="max-w-md mx-auto p-6 bg-opacity-50 rounded-lg shadow-lg text-white text-center">
        <h1 className="text-3xl font-bold">Welcome to My Project</h1>
        <p className="text-gray-300 mt-2">Explore the links below to learn more</p>
        <div className="text-lg text-white mb-2">
          <p>About ChatBot</p>
          <p>
            The ChatBot here is very similar to Gemini. It takes input and images and provides responses.What makes it different? In this project, I have  implemented roles in the Gemini, which allows for more specific and contextual responses.
          </p>
        </div>
        <div className="text-lg text-white mb-2">
          <p>Explore Chat-Bot</p>
          <Link href="/chat"
             className="block py-3 px-4 bg-blue-500 text-white rounded-lg text-center font-semibold hover:bg-blue-700 transition duration-300">
              Chat-Bot
          </Link>
        </div>
        <div className="text-lg text-white mb-2">
          <p>Find What You See</p>
          <p className="text-gray-300 mb-2">Click below to start exploring and experiencing the magic!</p>
          <Link href="/video"
            className="block py-3 px-4 bg-blue-500 text-white rounded-lg text-center font-semibold hover:bg-blue-700 transition duration-300"
             > Find What You See 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
