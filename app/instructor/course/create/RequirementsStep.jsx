"use client";
import { useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function RequirementsStep() {
    const { courseData, updateCourseData } = useCourseStore();
    const [isModalOpen, setModalOpen] = useState(false);
    const [newRequirement, setNewRequirement] = useState("");
    
    const addRequirement = () => {
        if (newRequirement.trim() === "") return;
        if (courseData.requirements.length >= 10) return alert("You can only add up to 10 requirements.");
        
        updateCourseData( 
            "requirements", [...courseData.requirements, newRequirement] 
        );
        setNewRequirement("");
        setModalOpen(false);
    };
    
    return (
        <div className="pt-4">
            {courseData.requirements.length === 0 && (
                <p className="text-sm text-gray-500">At least one requirement is needed.</p>
            )}
            {courseData.requirements.map((req, index) => (
                <Card key={index} className="mt-2">
                    <CardHeader className="px-4 py-5 max-md:px-2 max-md:py-3">
                        {req}
                    </CardHeader>
                </Card>
            ))}
            <Button 
                className="mt-4" 
                onClick={() => setModalOpen(true)}
                disabled={courseData.requirements.length >= 10}
            >
                Add Requirement
            </Button>
            
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a Requirement</DialogTitle>
                    </DialogHeader>
                    <Input 
                        value={newRequirement} 
                        onChange={(e) => setNewRequirement(e.target.value)} 
                        placeholder="Enter requirement..."
                    />
                    <DialogFooter>
                        <Button onClick={addRequirement} disabled={!newRequirement.trim()}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
