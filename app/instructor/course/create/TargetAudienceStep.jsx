"use client";
import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function TargetAudienceStep() {
    const { courseData, updateCourseData } = useCourseStore();
    const [isModalOpen, setModalOpen] = useState(false);
    const [newTargetAudience, setnewTargetAudience] = useState("");
    
    const addtargetAudience = () => {
        if (newTargetAudience.trim() === "") return;
        if (courseData.targetAudience.length >= 10) return alert("You can only add up to 10 targetAudience.");
        
        updateCourseData( 
            "targetAudience", [...courseData.targetAudience, newTargetAudience] 
        );
        setnewTargetAudience("");
        setModalOpen(false);
    };
    
    return (
        <div className="pt-4">
            {courseData.targetAudience.length === 0 && (
                <p className="text-sm text-gray-500">At least one targetAudience details is needed.</p>
            )}
            {courseData.targetAudience.map((req, index) => (
                <Card key={index} className="mt-2">
                    <CardHeader className="px-4 py-5 max-md:px-2 max-md:py-3">
                        {req}
                    </CardHeader>
                </Card>
            ))}
            <Button 
                className="mt-4" 
                onClick={() => setModalOpen(true)}
                disabled={courseData.targetAudience.length >= 10}
            >
                Add targetAudience
            </Button>
            
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a targetAudience</DialogTitle>
                    </DialogHeader>
                    <Input 
                        value={newTargetAudience} 
                        onChange={(e) => setnewTargetAudience(e.target.value)} 
                        placeholder="Enter targetAudience..."
                    />
                    <DialogFooter>
                        <Button onClick={addtargetAudience} disabled={!newTargetAudience.trim()}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
