import { User } from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";
import httpStatus from "http-status";

// Add to history
export const addToActivity = async (req, res) => {
    try {
        const { token, meeting_code } = req.body;

        if (!token || !meeting_code) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Token and meeting code required"
            });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Invalid token"
            });
        }

        const newMeeting = await Meeting.create({
            user_id: user._id,
            meetingCode: meeting_code,
            date: new Date()
        });

        return res.status(httpStatus.OK).json({
            message: "Added to history",
            meeting: newMeeting
        });

    } catch (error) {
        console.error("Add activity error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


// Get all history
export const getAllActivity = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Token required"
            });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Invalid token"
            });
        }

        const meetings = await Meeting.find({ user_id: user._id }).sort({ date: -1 });

        return res.status(httpStatus.OK).json({
            history: meetings
        });

    } catch (error) {
        console.error("Get activity error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
