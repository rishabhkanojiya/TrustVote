// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const [hasVoted, setHasVoted] = useState(false); // Replace with logic to determine if user has voted
//   const navigate = useNavigate();

//   const scrollContainerStyle = {
//     display: 'flex',
//     overflowX: 'auto',
//     whiteSpace: 'nowrap',
//   };

//   return (
//     <div className="container-fluid vh-100 d-flex flex-column">
//       <header className="row">
//         <div className="col-12 bg-dark text-white text-center py-2">
//           <h1>TrustVote</h1>
//         </div>
//       </header>
//       <div className="row flex-grow-1" style={scrollContainerStyle}>
//         <button className="btn btn-secondary" onClick={() => {
//           document.querySelector('.row.flex-grow-1').scrollLeft -= 200;
//         }}>{"<"}</button>
//         <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white">
//           <h2>Donald Trump</h2>
//           {/* Placeholder for candidate image */}
//           <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
//           {/* Placeholder for candidate description */}
//           <p>Description of Donald Trump...</p>
//         </div>
//         <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-info text-white">
//           <h2>Joe Biden</h2>
//           {/* Placeholder for candidate image */}
//           <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
//           {/* Placeholder for candidate description */}
//           <p>Description of Joe Biden...</p>
//         </div>
//         <button className="btn btn-secondary" onClick={() => {
//           document.querySelector('.row.flex-grow-1').scrollLeft += 200;
//         }}>{">"}</button>
//       </div>
//       <footer className="row">
//         <div className="col-12 d-flex justify-content-around align-items-center bg-dark text-white py-3">
//           <button className="btn btn-light" onClick={() => navigate('/login')}>LOGOUT</button>
//           {hasVoted && (
//             <button className="btn btn-light" onClick={() => navigate('/trend')}>VIEW RESULT</button>
//           )}
//           {!hasVoted && (
//             <button className="btn btn-light" onClick={() => navigate('/voting')}>VOTE NOW</button>
//           )}
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [hasVoted, setHasVoted] = useState(false); // Replace with logic to determine if user has voted
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    const container = document.querySelector('.candidate-container');
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <header className="row align-items-center bg-dark text-white py-2">
        <div className="col-1 d-flex justify-content-center">
          <button className="btn btn-outline-light" onClick={() => handleScroll('left')}>{"<"}</button>
        </div>
        <div className="col-10 text-center">
          <h1>TrustVote</h1>
        </div>
        <div className="col-1 d-flex justify-content-center">
          <button className="btn btn-outline-light" onClick={() => handleScroll('right')}>{">"}</button>
        </div>
      </header>
      <div className="row flex-grow-1 candidate-container overflow-auto">
        <div className="col d-flex">
          <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white">
            <h2>Donald Trump</h2>
            <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
            <p>Description of Donald Trump...</p>
          </div>
          <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-info text-white">
            <h2>Joe Biden</h2>
            <div className="candidate-image bg-secondary mb-3" style={{ width: '200px', height: '300px' }}></div>
            <p>Description of Joe Biden...</p>
          </div>
        </div>
      </div>
      <footer className="row">
        <div className="col-12 d-flex justify-content-around align-items-center bg-dark text-white py-3">
          <button className="btn btn-light" onClick={() => navigate('/login')}>LOGOUT</button>
          {hasVoted && (
            <button className="btn btn-light" onClick={() => navigate('/trend')}>VIEW RESULT</button>
          )}
          {!hasVoted && (
            <button className="btn btn-light" onClick={() => navigate('/voting')}>VOTE NOW</button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
