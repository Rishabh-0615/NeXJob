import Resume from "../models/Resume.js";

// Get resume by user ID
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update resume
export const saveResume = async (req, res) => {
  try {
    const resumeData = req.body;
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user._id },
      { ...resumeData, userId: req.user._id },
      { new: true, upsert: true }
    );
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
