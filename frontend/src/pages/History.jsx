import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Snackbar, Alert, CircularProgress, Box } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                console.log("🔍 Fetching history...");
                
                const history = await getHistoryOfUser();
                console.log("📊 Received history:", history);
                
                if (Array.isArray(history)) {
                    setMeetings(history);
                    console.log("✅ Set meetings:", history.length, "items");
                } else {
                    console.error("❌ History is not an array:", history);
                    setMeetings([]);
                    setSnackbarMessage("Invalid data format received");
                    setSnackbarSeverity("warning");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error("❌ Error fetching history:", error);
                console.error("Error details:", error.response?.data);
                
                const errorMsg = error.response?.data?.message || 
                                error.message || 
                                "Failed to fetch meeting history";
                
                setSnackbarMessage(errorMsg);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                setMeetings([]);
            } finally {
                setLoading(false);
            }
        };

        // Check if user is authenticated
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("⚠️ No token found, redirecting to auth");
            setSnackbarMessage("Please log in to view history");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            setTimeout(() => routeTo("/auth"), 2000);
            return;
        }

        fetchHistory();
    }, [getHistoryOfUser, routeTo]);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error("Date formatting error:", error);
            return "Invalid date";
        }
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress />
                <Typography color="text.secondary">Loading history...</Typography>
            </Box>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => routeTo("/home")} sx={{ mr: 2 }}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    Meeting History
                </Typography>
            </Box>

            {meetings.length > 0 ? (
                meetings.map((e, i) => {
                    const meetingCode = e.meetingCode || e.meeting_code || 'N/A';
                    const date = e.date || e.createdAt || new Date();
                    
                    return (
                        <Card key={e._id || i} variant="outlined" sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Code: <strong>{meetingCode}</strong>
                                </Typography>

                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Date: {formatDate(date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ color: "text.secondary", textAlign: 'center' }}>
                            No meeting history found.
                        </Typography>
                        <Typography sx={{ color: "text.secondary", textAlign: 'center', mt: 1, fontSize: '0.875rem' }}>
                            Join a meeting to see it appear here!
                        </Typography>
                    </CardContent>
                </Card>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setSnackbarOpen(false)} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}