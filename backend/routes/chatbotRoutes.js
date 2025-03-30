import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post("/roadmap", async (req, res) => {
  try {
    let { careerGoal, currentSkills } = req.body;

    // Enhanced validation to prevent nonsensical requests
    if (!careerGoal || !currentSkills) {
      return res.status(400).json({ error: "Career goal and current skills are required." });
    }

    // Validate if inputs are meaningful (not just random characters)
    if (careerGoal.length < 3 || currentSkills.length < 3) {
      return res.status(400).json({ error: "Please provide meaningful career goals and skills." });
    }

    // Check if the career goal seems job-related (simple validation)
    const validCareerKeywords = ["developer", "engineer", "designer", "manager", "analyst", "specialist", "consultant", 
                                "technician", "administrator", "architect", "scientist", "professional"];
    
    const isLikelyValidCareer = validCareerKeywords.some(keyword => 
      careerGoal.toLowerCase().includes(keyword)) || 
      careerGoal.split(" ").length >= 2;
    
    if (!isLikelyValidCareer) {
      return res.status(400).json({ 
        error: "Please enter a valid career goal related to a professional field." 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Improved prompt with more specific structure that matches our frontend needs
    const prompt = `
      Generate a clear, detailed career roadmap for someone wanting to become a "${careerGoal}" who currently has skills in: "${currentSkills}".
      
      Return ONLY a JSON object with this exact structure (no markdown, no code blocks):
      {
        "careerGoal": "${careerGoal}",
        "steps": [
          {
            "title": "Step title with focus area",
            "description": "Brief overview of this step",
            "substeps": [
              {
                "title": "Specific skill or technology",
                "description": "What to learn about it"
              }
            ]
          }
        ],
        "resources": [
          {
            "name": "Resource Name",
            "url": "https://example.com"
          }
        ]
      }
      
      Include 3-5 main steps with 3-5 substeps each. Each step should represent a logical progression.
      For resources, provide 3-6 relevant websites, courses, or books with proper URLs.
      Ensure all JSON is properly formatted and valid. Do not include any text outside the JSON object.
    `;

    const result = await model.generateContent(prompt);
    let roadmapText = result.response.text();

    // Enhanced JSON cleaning to handle various formatting issues
    roadmapText = roadmapText
      .replace(/```json|```/g, "") // Remove code block markers
      .replace(/^\s*\{/m, "{")     // Ensure JSON starts cleanly
      .replace(/\}\s*$/m, "}")     // Ensure JSON ends cleanly
      .trim();

    try {
      // Parse the cleaned JSON
      const roadmap = JSON.parse(roadmapText);
      
      // Validate the structure of the returned JSON
      if (!roadmap.steps || !Array.isArray(roadmap.steps) || roadmap.steps.length === 0) {
        throw new Error("Invalid roadmap structure: missing steps array");
      }
      
      res.json(roadmap);
    } catch (jsonError) {
      console.error("❌ JSON Parsing Error:", jsonError, roadmapText);
      res.status(500).json({ 
        error: "Failed to generate a proper roadmap. Please try again with more specific career details." 
      });
    }
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    res.status(500).json({ 
      error: "Unable to generate roadmap. Please check your inputs and try again."
    });
  }
});

export default router;