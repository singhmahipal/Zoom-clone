import {Link} from 'react-router-dom'
import '../App.css'

const LandingPage = () => {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Zoom Video Call</h2>
        </div>
        <div className='navlist'>
          <p>Join as Guest</p>
          <p>register</p>
          <div role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{color: '#ff9839'}}>connect</span> with your loved ones</h1>
          <p>cover a distance by zoom video call</p>
          <div role='button'>
            <Link to={'/home'}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src='/mobile.png' alt='' />
        </div>
      </div>
    </div>
  )
}

export default LandingPage