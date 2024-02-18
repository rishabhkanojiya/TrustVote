// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Dummy data for candidates
// const candidates = [
//   {
//     name1: "Donald Trump",
//     description1: "Description of Donald Trump...",
//     name2: "Joe Biden",
//     description2: "Description of Joe Biden...",
//   },
//   {
//     name1: "Atharva",
//     description1: "Description for Atharva...",
//     name2: "Vishal",
//     description2: "Description for Vishal...",
//   },
//   {
//     name1: "Gaurav",
//     description1: "Description for Gaurav...",
//     name2: "Rishabh",
//     description2: "Description for Rishabh...",
//   },
// ];


// function Dashboard() {
//   const [currentPage, setCurrentPage] = useState(0); // 0, 1, or 2 for the three pairs of candidates
//   const [hasVoted, setHasVoted] = useState(false); // Set this based on whether the user has voted
//   const navigate = useNavigate();

//   const nextPage = () => {
//     setCurrentPage((prevPage) => (prevPage + 1) % candidates.length);
//   };

//   const previousPage = () => {
//     setCurrentPage((prevPage) => (prevPage - 1 + candidates.length) % candidates.length);
//   };

//   // Get the data for the current candidates
//   const { name1, description1, name2, description2 } = candidates[currentPage];

//   const handleLogout = () => {
//     // Here you would handle the logout logic
//     navigate('/login');
//   };

//   const handleVoteNow = () => {
//     // Navigate to the voting page for the current candidates
//     // This could be implemented differently based on your application logic
//     navigate(`/voting/${currentPage + 1}`);
//   };

//   const handleViewResult = () => {
//     // Navigate to the results page
//     navigate('/results');
//   };

//   return (
//     <div className="container-fluid vh-100 d-flex flex-column">
//       <header className="row align-items-center bg-dark text-white py-2">
//         <div className="col-1 d-flex justify-content-center">
//           <button className="btn btn-outline-light" onClick={previousPage} disabled={currentPage === 0}>{"<"}</button>
//         </div>
//         <div className="col-10 text-center">
//           <h1>TrustVote</h1>
//         </div>
//         <div className="col-1 d-flex justify-content-center">
//           <button className="btn btn-outline-light" onClick={nextPage} disabled={currentPage === candidates.length - 1}>{">"}</button>
//         </div>
//       </header>
//       <div className="row flex-grow-1">
//         <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white">
//           <h2>{name1}</h2>
//           <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
//           <p>{description1}</p>
//         </div>
//         <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-info text-white">
//           <h2>{name2}</h2>
//           <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
//           <p>{description2}</p>
//         </div>
//       </div>
//       <footer className="row">
//         <div className="col-12 d-flex justify-content-around align-items-center bg-dark text-white py-3">
//           <button className="btn btn-light" onClick={handleLogout}>LOGOUT</button>
//           {hasVoted && (
//             <button className="btn btn-light" onClick={handleViewResult}>VIEW RESULT</button>
//           )}
//           {!hasVoted && (
//             <button className="btn btn-light" onClick={handleVoteNow}>VOTE NOW</button>
//           )}
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

// Sentiment data for each candidate pair
const sentimentData = [
  {
    "Donald Trump": { pos: 1, neg: 2 },
    "Joe Biden": { pos: 5, neg: 1 },
  },
  {
    "Atharva": { pos: 1, neg: 2 },
    "Vishal": { pos: 5, neg: 1 },
  },
  {
    "Gaurav": { pos: 1, neg: 2 },
    "Rishabh": { pos: 5, neg: 1 },
  },
];

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasVoted, setHasVoted] = useState(false); // Replace with actual logic
  const navigate = useNavigate();

  const nextPage = () => setCurrentPage((currentPage + 1) % sentimentData.length);
  const previousPage = () => setCurrentPage((currentPage - 1 + sentimentData.length) % sentimentData.length);

  const currentPair = Object.entries(sentimentData[currentPage]);
  const chartData = currentPair.map(([candidate, { pos, neg }]) => ({
    label: candidate,
    backgroundColor: ['#4caf50', '#f44336'],
    data: [pos, neg],
  }));
  
  const chartOptions = {
    scales: {
      x: {
        // 'category' type is the default for the x-axis in a bar chart and does not need to be set explicitly
        beginAtZero: true,
      },
      y: {
        beginAtZero: true, // This makes sure the chart begins at 0 on the y-axis
      }
    },
    plugins: {
      legend: {
        display: true, // Display the legend
      },
    },
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false // Ensure the aspect ratio is not maintained, for better control over chart size
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <header className="row align-items-center bg-dark text-white py-2">
        <div className="col-1 d-flex justify-content-center">
          <button className="btn btn-outline-light" onClick={previousPage}>{"<"}</button>
        </div>
        <div className="col-10 text-center">
          <h1>TrustVote</h1>
        </div>
        <div className="col-1 d-flex justify-content-center">
          <button className="btn btn-outline-light" onClick={nextPage}>{">"}</button>
        </div>
      </header>
      <div className="row flex-grow-1">
        {currentPair.map(([name, sentiment], index) => (
          <div key={name} className="col-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white">
            <h2>{name}</h2>
            <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
            <p>{name === "Donald Trump" || name === "Joe Biden" ? sentimentData[0][name].description : name === "Atharva" || name === "Vishal" ? sentimentData[1][name].description : sentimentData[2][name].description}</p>
            <Bar 
              data={{
                labels: ['Positive', 'Negative'],
                datasets: [{
                  label: 'Sentiment',
                  data: [sentiment.pos, sentiment.neg],
                  backgroundColor: index % 2 === 0 ? ['#4caf50', '#f44336'] : ['#2196f3', '#ffeb3b'],
                }]
              }}
              options={chartOptions}
            />
          </div>
        ))}
      </div>
      <footer className="row">
        <div className="col-12 d-flex justify-content-around align-items-center bg-dark text-white py-3">
          <button className="btn btn-light" onClick={() => navigate('/login')}>LOGOUT</button>
          {hasVoted && (
            <button className="btn btn-light" onClick={() => navigate('/results')}>VIEW RESULT</button>
          )}
          {!hasVoted && (
            <button className="btn btn-light" onClick={() => navigate(`/voting/${currentPage + 1}`)}>VOTE NOW</button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;

