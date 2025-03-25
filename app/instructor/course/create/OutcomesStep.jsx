"use client";
import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function OutcomeStep() {
    const { courseData, updateCourseData } = useCourseStore();
    const [isModalOpen, setModalOpen] = useState(false);
    const [newOutcome, setNewOutcome] = useState("");
    
    const addOutcome = () => {
        if (newOutcome.trim() === "") return;
        if (courseData.outcome.length >= 10) return alert("You can only add up to 10 outcome.");
        
        updateCourseData( 
            "outcome", [...courseData.outcome, newOutcome] 
        );
        setNewOutcome("");
        setModalOpen(false);
    };
    
    return (
        <div className="pt-4">
            {courseData.outcome.length === 0 && (
                <p className="text-sm text-gray-500">At least one Outcome is needed.</p>
            )}
            {courseData.outcome.map((req, index) => (
                <Card key={index} className="mt-2">
                    <CardHeader className="px-4 py-5 max-md:px-2 max-md:py-3">
                        {req}
                    </CardHeader>
                </Card>
            ))}
            <Button 
                className="mt-4" 
                onClick={() => setModalOpen(true)}
                disabled={courseData.outcome.length >= 10}
            >
                Add Outcome
            </Button>
            
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a Outcome</DialogTitle>
                    </DialogHeader>
                    <Input 
                        value={newOutcome} 
                        onChange={(e) => setNewOutcome(e.target.value)} 
                        placeholder="Enter Outcome..."
                    />
                    <DialogFooter>
                        <Button onClick={addOutcome} disabled={!newOutcome.trim()}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
