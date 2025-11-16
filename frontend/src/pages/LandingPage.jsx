import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Zoom Video Call</h2>
        </div>

        <div className='navlist'>
          <p
            className="navButton"
            onClick={() => navigate('/guest')}
          >
            Join as Guest
          </p>

          <p
            className="navButton"
            onClick={() => navigate('/auth')}
          >
            Register
          </p>

          <div
            role='button'
            className="navButton"
            onClick={() => navigate('/auth')}
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: '#ff9839' }}>connect</span> with your loved ones
          </h1>
          <p>cover a distance by zoom video call</p>

          <div
            className="getStartedButton"
            role='button'
            onClick={() => navigate('/home')}
          >
            <p>Get Started</p>
          </div>
        </div>

        <div>
          <img src='/mobile.png' alt='Mobile display' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
