import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import { DataTable } from './components/DataTable';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const { userOne, userTwo } = location.state?.data || {};
  const [loading, setLoading] = useState(true); // Loading state
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!userOne || !userTwo) return; // Only run if users exist

    const getAnime = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.post("http://localhost:8000/getAnime", {
          name: userOne,
          name_two: userTwo
        });

        const resultData = res.data; 
        const user_one_results = resultData[0].completed;
        const user_two_results = resultData[1].completed;
        
        const newData = user_one_results.map((item, i) => ({
          title: item.media.title.english,
          user_one_score: item.score,
          user_two_score: user_two_results[i]?.score ?? "-", 
          id: item.media.id
        }));

        setTableData(newData);
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getAnime();
  }, [userOne, userTwo]); 

   return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2530] text-white">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00B0FF] mb-4"></div>
          <p className="text-[#00B0FF] text-lg">Loading Scores...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-2xl font-bold mb-6 text-[#00B0FF] text-center">Anime Scores</h1>
          <DataTable 
            data={tableData} 
            userOne={userOne} 
            userTwo={userTwo} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
