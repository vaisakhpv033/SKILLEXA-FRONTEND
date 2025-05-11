"use server"
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "../firebase/admin";
import { feedbackSchema } from "@/constants/interview";

export async function getInterviewByUserId(userId) {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', String(userId))
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}


export async function getFeaturedInterviewByAdmin() {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', 'admin')
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}


export async function getInterviewById(id) {
    const interview = await db
        .collection('interviews')
        .doc(id)
        .get();

    return interview.data()
}


export async function createFeedback(params) {
    const {interviewId, userId, transcript, feedbackId} = params;

    try {
        const formattedTranscript = transcript.map((sentence) => (
            `- ${sentence.role}: ${sentence.content}\n`
        )).join('');

        const {object} = await generateObject({
            model: google("gemini-2.0-flash-001", {
                structuredOutputs: true,
            }),
            schema: feedbackSchema,
            prompt: `
                You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
                Transcript:
                ${formattedTranscript}

                Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
                - **Communication Skills**: Clarity, articulation, structured responses.
                - **Technical Knowledge**: Understanding of key concepts for the role.
                - **Problem-Solving**: Ability to analyze problems and propose solutions.
                - **Cultural & Role Fit**: Alignment with company values and job role.
                - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.

                After evaluating, return a structured JSON object with the following fields:
                    * totalScore (number)
                    * categoryScores (array of 5 objects with name, score, and comment)
                    * strengths (array of short strings)
                    * areasForImprovement (array of short strings)
                    * finalAssessment (string)

                Output only the structured JSON object. Do not include any explanation or text outside of it.
                `,
            system: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories"
        });

        const feedback = {
            interviewId: interviewId,
            userId: userId,
            totalScore: object.totalScore,
            categoryScores: object.categoryScores,
            strengths: object.strengths,
            areasForImprovement: object.areasForImprovement,
            finalAssessment: object.finalAssessment,
            createdAt: new Date().toISOString(),
        };

        let feedbackRef;
        if (feedbackId) {
            feedbackRef = db.collection("feedback").doc(feedbackId);
        } else {

            feedbackRef = db.collection("feedback").doc();
        }

        await feedbackRef.set(feedback);
          

        return {
            success: true,
            feedbackId: feedbackRef.id
        }
    } catch (e) {
        console.error('Error saving feedback', e);

        return {
            success: false
        }
    }
}


export async function getFeedbackByInterviewId(params) {
    const {interviewId, userId} = params;

    const feedback = await db
        .collection('feedback')
        .where('interviewId', '==', interviewId)
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();

    if (feedback.empty) return null;

    const feedbackDoc = feedback.docs[0];
    return {
        id: feedbackDoc.id,
        ...feedbackDoc.data()
    }
}


export async function getAllFeedbackByInterviewId(params) {
    const {interviewId, userId} = params;

    const feedback = await db
        .collection('feedback')
        .where('interviewId', '==', interviewId)
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    if (feedback.empty) return null;

    
    return feedback.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}



export async function getFeedBackByUserId(userId) {
    const interviews = await db
        .collection('feedback')
        .where('userId', '==', String(userId))
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}


export async function getFeedBackById(id) {
    const feedback = await db
        .collection('feedback')
        .doc(id)
        .get();

    return feedback.data()
}
