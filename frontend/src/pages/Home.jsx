import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import '../App.css';

function Home() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            alert("Please enter a meeting code");
            return;
        }
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && meetingCode.trim()) {
            handleJoinVideoCall();
        }
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="nav-left">
                    <h2>Apna Video Call</h2>
                </div>

                <div className="nav-right">
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p onClick={() => navigate("/history")}>History</p>

                    <Button 
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            <div className="meet-container">
                <div className="left-panel">
                    <h2>Providing Quality Video Call Just Like Quality Education</h2>

                    <div className="join-section">
                        <TextField 
                            onChange={e => setMeetingCode(e.target.value)}
                            onKeyPress={handleKeyPress}
                            value={meetingCode}
                            id="outlined-basic" 
                            label="Meeting Code" 
                            variant="outlined"
                            fullWidth
                        />
                        <Button 
                            onClick={handleJoinVideoCall} 
                            variant='contained'
                            disabled={!meetingCode.trim()}
                        >
                            Join
                        </Button>
                    </div>
                </div>

                <div className='right-panel'>
                    <img src='/logo3.png' alt="Video Call" />
                </div>
            </div>
        </div>
    )
}

export default withAuth(Home)